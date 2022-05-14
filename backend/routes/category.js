const express = require("express");
const { createCategory, getAllCategories } = require("../controllers/category");
const { authentication } = require("../middleware/Authentication");
const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);
categoryRouter.get("/", authentication, getAllCategories);
module.exports = categoryRouter;
