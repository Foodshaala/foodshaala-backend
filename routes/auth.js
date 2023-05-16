const express = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authRouter = express.Router();
const controller = require("../controllers/auth_controller");

authRouter.post("/api/signup", controller.signup);

//signin
authRouter.post("/api/signin", controller.signin);

// check if token is valid
authRouter.post("/api/isValidToken", controller.isValidToken);

//get user details
authRouter.post("/api/user", controller.getUser);

module.exports = authRouter;
