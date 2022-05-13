const productsModel = require("../models/products");

const createNewProduct = (req, res) => {
  const { productName, description, category, img, price, quantity } = req.body;

  const newProduct = new productsModel({
    productName,
    description,
    category,
    img,
    price,
    quantity,
  });
  newProduct
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "product created",
        product: result,
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
const getAllProducts = (req, res) => {
  const userId = req.token.userId;
  productsModel
    .find({})
    .populate("category", "category -_id ")
    .exec()
    .then((result) => {
      if (result.length) {
        res.status(201).json({
          success: true,
          userId: userId,
          message: "all product ready to render",
          product: result,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "no product yet",
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
const getProductByname = (req, res) => {
  const productName = req.query.productName;

  productsModel
    .find({})
    .populate("category", "category -_id ")
    .exec()
    .then((result) => {
      if (result.length) {
        result = result.filter((element) => {
          return element.productName.includes(productName);
        });
        res.status(201).json({
          success: true,
          message: "search done",
          product: result,
        });
      } else {
        console.log(result);
        res.status(404).json({
          success: false,
          message: "The product is not found",
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

const deleteproductByName = (req, res) => {
  const productName = req.params.productName;
  productsModel
    .findOneAndDelete({ productName: productName })
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "product deleted",
        deletedProduct: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};

// .find({$text: {$search: req.query.Productname}})

module.exports = {
  createNewProduct,
  getAllProducts,
  getProductByname,
  deleteproductByName,
};
