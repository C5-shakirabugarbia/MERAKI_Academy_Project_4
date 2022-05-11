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
module.exports = { createNewProduct };
