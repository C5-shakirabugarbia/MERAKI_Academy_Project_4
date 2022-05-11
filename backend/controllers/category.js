
const categoryModel = require("../models/category");
const createCategory = (req, res) => {
  const { category } = req.body;
  const newCategory = new categoryModel({
    category,
  });
  newCategory
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "category created",
        category: result,
      });
    })
    .catch((err) => {
      res.status(201).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};

module.exports = {
  createCategory,
};
