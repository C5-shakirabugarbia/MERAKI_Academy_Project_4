const express = require("express");

const { register, addToCart } = require("../controllers/users");
const { authentication } = require("../middleware/Authentication");
// define router
const usersRouter = express.Router();
usersRouter.put("/addToCart/:id", authentication, addToCart);
usersRouter.post("/", register);
// useid ->
//get -> /profile-> name,..,userId:req.token.
//put -> /profile {name,age...}

module.exports = usersRouter;
