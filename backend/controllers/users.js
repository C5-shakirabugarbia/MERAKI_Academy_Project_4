const products = require("../models/products");
const usersModle = require("../models/users");

const register = (req, res) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    address,
    cart,
    email,
    password,
    role,
  } = req.body;
  const user = new usersModle({
    firstName,
    lastName,
    phoneNumber,
    address,
    cart,
    email,
    password,
    role,
  });
  user
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Account Created Successfully`,
        user: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const addToCart = (req, res) => {
  const productId = req.params.id;
  const userId =  req.token.userId 
  console.log("userId", userId);
  console.log("productId", productId);


  
  usersModle
    .updateOne(
      { _id:userId},
      {
        $push: {
          cart: productId,
        },
      }
    )
    .then((result) => {
      if (result) {
        // products.findByIdAndUpdate({_id: productId}, $add (aggregation))
        // { $project: { item: 1, total: { $add: [ "$price", "$fee" ] } } }
        console.log(result);
        res.status(200).json({
          success: true,
          message: "added to cart",
          user: result
        });
      } else {
        res.status(200).json({
          success: false,
          message: "you need to log in befor adding to cart",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};

module.exports = {
  register,
  addToCart,
};
