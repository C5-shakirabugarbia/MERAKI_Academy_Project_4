const express = require("express");

const { register } = require("../controllers/users");
// define router
const usersRouter = express.Router();

usersRouter.post("/", register);
// useid -> 
//get -> /profile-> name,..,userId:req.token.
//put -> /profile {name,age...}

module.exports = usersRouter;
