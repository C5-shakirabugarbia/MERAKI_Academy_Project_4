const express = require("express");
const { authentication } = require("../middleware/Authentication");
const { createNewProduct, getAllProducts } = require("../controllers/products");
const productsRouter = express.Router();

productsRouter.post("/create", createNewProduct);
productsRouter.get("/", authentication, getAllProducts);
module.exports = productsRouter;
