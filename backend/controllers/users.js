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
  const userId = req.token.userId;
  console.log("userId", userId);
  console.log("productId", productId);

  usersModle
    .updateOne(
      { _id: userId },
      {
        $push: {
          cart: productId,
        },
      }
    )
    .then((result) => {
      if (result) {
        console.log(result);
        res.status(200).json({
          success: true,
          message: "added to cart",
          user: result,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "you need to login befor adding to cart",
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
const deletFromCart = (req, res) => {
  const productId = req.params.id;
  const userId = req.token.userId;
  console.log("userId", userId);
  console.log("productId", productId);

  usersModle
    .updateOne(
      { _id: userId },
      {
        $pull: {
          cart: productId,
        },
      }
    )
    .then((result) => {
      if (result && result.modifiedCount === 1) {
        console.log(result);
        res.status(200).json({
          success: true,
          message: "deleteted",
          user: result,
        });
      } else if (result.modifiedCount === 0) {
        res.status(200).json({
          success: false,
          message: "no such item",
        });
      } else {
        res.status(200).json({
          success: false,
          message: "you need to login befor deleteing from cart",
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
  deletFromCart,
};
