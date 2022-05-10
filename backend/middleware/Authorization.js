module.exports = (permissions) => {
  return (req, res, next) => {
    if (req.token.role.permissions.includes(permissions)) {
      next();
    } else {
      res.status(403).json({
        success: false,
        massage: "Unauthorized",
      });
    }
  };
};
