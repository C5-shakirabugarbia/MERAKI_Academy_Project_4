const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  let token = req.headers.authorization;
  if (token === undefined) {
    res.status(403).json({
      success: false,
      message: "Forbidden",
    });
  }
  jwt.verify(token, process.env.SECRET, (err, result) => {
    if (err) {
      if (token) {
        res.status(403).json({
          success: false,
          message: "The token is invalid or expired",
        });
      } else {
        res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }
    }
    if (result) {
      req.token = result;

      next();
    }
  });
};
module.exports = {
  authentication,
};
