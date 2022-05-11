const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: { type: String, unique: true, required: true },
  img: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

module.exports = mongoose.model("Product", productSchema);
