const express = require("express");

// create login router
const rolesRouter = express.Router();
const { createNewRole } = require("../controllers/roles");
rolesRouter.post("/", createNewRole);

module.exports = rolesRouter;
