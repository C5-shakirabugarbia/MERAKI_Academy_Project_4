const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  phoneNumber: { type: Number, required: true },
  address: { type: String, required: true, unique: true },
  cart: [{ type: String }],
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

module.exports = mongoose.model("User", userSchema);
