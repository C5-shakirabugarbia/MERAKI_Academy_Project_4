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

module.exports = {
  register,
};
