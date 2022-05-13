const express = require("express");
const { authentication } = require("../middleware/Authentication");
const {
  createNewProduct,
  getAllProducts,
  getProductByname,
  deleteproductByName,
} = require("../controllers/products");
const productsRouter = express.Router();
productsRouter.delete("/delete/:productName", deleteproductByName);
productsRouter.post("/create", createNewProduct);
productsRouter.get("/", authentication, getAllProducts);
productsRouter.get("/search", authentication, getProductByname);
module.exports = productsRouter;
