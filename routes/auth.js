const express = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { findOne } = require("../models/user");
const authRouter = express.Router();

authRouter.post("/api/signup", async (req, res) => {
  try {
    const { name, email, phoneNo, password } = await req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with same email already exists!" });
    }

    const hashedPassword = await bcryptjs.hash(password, 8);

    let user = new User({
      name,
      email,
      phoneNo,
      password: hashedPassword,
    });
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//signin
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = await req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email does not exists" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password." });
    }
    const token = await jwt.sign({ _id: user._id }, process.env.securityKey);
    res.json({ token, ...user._doc });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// check if token is valid
authRouter.post("/api/isValidToken", async (req, res) => {
  try {
    const token = req.header("auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.securityKey);
    if (!verified) return res.json(false);

    const user = await User.findById(verified._id);
    if (!user) return res.json(false);
    res.json(true);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = authRouter;
