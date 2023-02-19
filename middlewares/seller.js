const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const seller = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token)
      return res.status(401).json({ msg: "No auth token, access denied" });

    const verified = jwt.verify(token, process.env.securityKey);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });
    const user = await User.findById(verified.id);
    if (user.type != "seller") {
      return res.status(401).json({ msg: "You are not a seller!" });
    }
    req.user = verified.id;
    req.token = token;
    next();
  } catch (err) {
    console.log("error in seller middleware");
    res.status(500).json({ error: err.message });
  }
};

module.exports = seller;
