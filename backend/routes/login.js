const express = require("express");
const {login}=require("../controllers/login")


// login router
const loginRouter = express.Router();



loginRouter.post("/", login);


module.exports = loginRouter;