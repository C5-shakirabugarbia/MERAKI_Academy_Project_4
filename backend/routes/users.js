const express = require("express");

const {
  register,
  addToCart,
  deletFromCart,
  viewCart,
  viewProfile,
} = require("../controllers/users");
const { authentication } = require("../middleware/Authentication");
// define router
const usersRouter = express.Router();
usersRouter.get("/viewProfile", authentication, viewProfile);
usersRouter.put("/addToCart/:id", authentication, addToCart);
usersRouter.delete("/deletefromcart/:id", authentication, deletFromCart);
usersRouter.post("/", register);
usersRouter.get("/viewcart", authentication, viewCart);
// useid ->
//get -> /profile-> name,..,userId:req.token.
//put -> /profile {name,age...}

module.exports = usersRouter;
