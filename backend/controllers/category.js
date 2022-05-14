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

const getAllCategories = (req, res) => {
  const userId = req.token.userId;
  categoryModel
    .find({})
    .then((result) => {
      if (result.length) {
        res.status(201).json({
          success: true,
          userId: userId,
          message: "all categories ready to render",
          categories: result,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "no categories yet",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};
module.exports = {
  createCategory,
  getAllCategories
};
