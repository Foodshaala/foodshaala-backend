const express = require("express");
const userRouter = express.Router();
const { FoodModel } = require("../models/food");
const user = require("../middlewares/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/user");

userRouter.post("api/user/search", user, async (req, res) => {
  User.findByIdAndUpdate(
    userId,
    {
      $push: { search_history: { query: searchQuery, date: new Date() } },
      $push: {
        order_history: { product_id: orderedProductId, date: new Date() },
      },
    },
    { new: true },
    function (err, user) {
      if (err) throw err;

      console.log(user);
      mongoose.disconnect();
    }
  );
});

userRouter.get("api/user/recommended", user, async (req, res) => {
  User.findOne({ _id: userId }, function (err, user) {
    if (err) throw err;

    const searchHistory = user.search_history || [];
    const purchaseHistory = user.purchase_history || [];

    // Construct a filter that matches products with tags in the search and purchase history
    const filter = {
      tags: { $in: [...searchHistory, ...purchaseHistory] },
      recommended: true,
    };

    // Find all recommended products that match the filter
    Product.find(filter, function (err, products) {
      if (err) throw err;

      console.log(products);
      mongoose.disconnect();
    });
  });
});
