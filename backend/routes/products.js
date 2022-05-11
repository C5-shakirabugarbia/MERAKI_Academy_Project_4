const express = require("express");
const { authentication } = require("../middleware/Authentication");
const {
  createNewProduct,
  getAllProducts,
  getProductByname,
} = require("../controllers/products");
const productsRouter = express.Router();

productsRouter.post("/create", createNewProduct);
productsRouter.get("/", authentication, getAllProducts);
productsRouter.get("/search", authentication, getProductByname);
module.exports = productsRouter;
