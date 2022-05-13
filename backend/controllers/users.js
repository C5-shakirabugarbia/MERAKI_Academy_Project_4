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
  const _id = req.params.id;
  const userId = req.token.userId;

  usersModle
    .updateOne(
      { _id: userId },
      {
        $push: {
          cart: _id,
        },
      }
    )
    .then((result) => {
      if (result) {
        // const newQuntity =
        products
          .findByIdAndUpdate({ _id }, { $inc: { quantity: -1 } })
          .then((result) => {
            console.log(result);
            res.status(200).json({
              success: true,
              message: "added to cart",
            });
          })
          .catch((err) => {
            console.log("firsterr", err);
            res.status(500).json({
              success: false,
              message: "Server Error",
              err: err.message,
            });
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
  const _id = req.params.id;
  const userId = req.token.userId;

  usersModle
    .updateOne(
      { _id: userId },
      {
        $pull: {
          cart: _id,
        },
      }
    )
    .then((result) => {
      if (result && result.modifiedCount === 1) {
        products
          .findByIdAndUpdate({ _id }, { $inc: { quantity: +1 } })
          .then((result) => {
            res
              .status(200)
              .json({
                success: true,
                message: "deleteted",
              })
              .catch((err) => {
                res.status(500).json({
                  success: false,
                  message: "Server Error",
                  err: err.message,
                });
              });
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
const viewCart = (req, res) => {
  const _id = req.token.userId;
  console.log("user id", _id);
  usersModle
    .find({ _id })
    .populate("cart")
    .exec()
    .then((result) => {
      if (result) {
        console.log(result.cart);
        res.status(200).json({
          success: true,
          message: "here is the cart",
          cart: result[0].cart,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "no such user",
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
const viewProfile = (req, res) => {
  const _id = req.token.userId;
  console.log("user id", _id);
  usersModle
    .find({ _id })
    .populate("cart")
    .exec()
    .then((result) => {
      if (result) {
        console.log(result.cart);
        res.status(200).json({
          success: true,
          message: "here is the cart",
          user: result,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "no such user",
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
  viewCart,
  viewProfile,
};
