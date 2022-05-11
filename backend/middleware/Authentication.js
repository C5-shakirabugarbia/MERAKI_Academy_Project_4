const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  let token = req.headers.authorization;
  if (token === undefined) {
    console.log(token);
    res.status(403).json({
      success: false,
      message: "Forbidden",
    });
  } else {
    token = req.headers.authorization.split(" ")[1];
  }
  jwt.verify(token, process.env.SECRET, (err, result) => {
    if (err) {
      if (token) {
        console.log(err.message);
        res.status(403).json({
          success: false,
          message: "The token is invalid or expired",
        });
      } else {
        console.log(token);
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
