const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  phoneNumber: { type: Number, required: true },
  address: { type: String, required: true },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  //[{productId,quantity}]{ type: mongoose.Schema.Types.Mixed },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);
