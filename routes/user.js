const express = require("express");
const userRouter = express.Router();
const { FoodModel } = require("../models/food");
const user = require("../middlewares/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/user");

//search for query
foodRouter.get("/api/food/:query", userMidWare, async (req, res) => {
  try {
    const query = req.params.query;
    const regex = new RegExp(query, "i"); // 'i' means case-insensitive
    FoodModel.find({
      $or: [{ name: { $regex: regex } }, { category: { $regex: regex } }],
    })
      .hint({ name: 1, category: 1 })
      .exec((err, foodItems) => {
        if (err) {
          console.error(err);
          throw err;
        }
        res.json(foodItems);
      });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

userRouter.get("api/user/recommended", user, async (req, res) => {
  try {
    const token = req.header("auth-token");
    const userId = jwt.verify(token, process.env.securityKey)._id;
    User.findOne({ _id: userId }, function (err, user) {
      if (err) throw err;

      const searchHistory = user.search_history || [];
      const orderHistory = user.order_history || [];

      // Construct a filter that matches products with tags in the search and purchase history
      const filter = {
        tags: { $in: [...searchHistory, ...orderHistory] },
        recommended: true,
      };

      // Find all recommended products that match the filter
      FoodModel.find(filter, (err, fooditems) => {
        if (err) throw err;
        res.json(fooditems);
      });
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
