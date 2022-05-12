const express = require("express");

const { register, addToCart, deletFromCart } = require("../controllers/users");
const { authentication } = require("../middleware/Authentication");
// define router
const usersRouter = express.Router();
usersRouter.put("/addToCart/:id", authentication, addToCart);
usersRouter.delete("/deletefromcart/:id", authentication, deletFromCart);
usersRouter.post("/", register);
// useid ->
//get -> /profile-> name,..,userId:req.token.
//put -> /profile {name,age...}

module.exports = usersRouter;
