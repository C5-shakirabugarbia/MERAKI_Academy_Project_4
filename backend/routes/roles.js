const express = require("express");
const { createNewRole } = require("../controllers/roles");
// create roles router
const rolesRouter = express.Router();

rolesRouter.post("/", createNewRole);

module.exports = rolesRouter;
