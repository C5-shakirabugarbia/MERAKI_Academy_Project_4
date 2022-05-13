const express = require("express");
const { authentication } = require("../middleware/Authentication");
const {
  createNewProduct,
  getAllProducts,
  getProductByname,
  deleteproductByName,
  updateProductByName,
} = require("../controllers/products");
const productsRouter = express.Router();
productsRouter.put("/update/:productName", updateProductByName);
productsRouter.delete("/delete/:productName", deleteproductByName);
productsRouter.post("/create", createNewProduct);
productsRouter.get("/", authentication, getAllProducts);
productsRouter.get("/search", authentication, getProductByname);
module.exports = productsRouter;
