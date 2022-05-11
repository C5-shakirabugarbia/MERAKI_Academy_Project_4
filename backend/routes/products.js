const express = require("express");
const { createNewProduct } = require("../controllers/products");
const productsRouter = express.Router();

productsRouter.post("/create", createNewProduct);

module.exports = productsRouter;
