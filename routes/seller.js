const express = require("express");
const sellerRouter = express.Router();
const { FoodModel } = require("../models/food");
const seller = require("../middlewares/seller");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Restaurant } = require("../models/restaurant");

sellerRouter.post("/api/restaurant/add", seller, async (req, res) => {
  try {
    const token = req.header("auth-token");
    const { name, categories, phoneNo, address } = await req.body;
    const sellerId = jwt.verify(token, process.env.securityKey)._id;
    let restaurant = Restaurant({
      name,
      categories,
      phoneNo,
      address,
      owner: sellerId,
    });
    restaurant = await restaurant.save();
    res.status(200).json(restaurant);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

sellerRouter.post("/api/restaurant/add-food", seller, async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      label,
      image,
      quantity,
      rating,
      category,
      addOns,
    } = await req.body;
    let food = FoodModel({
      name,
      price,
      description,
      label,
      image,
      quantity,
      rating,
      category,
      addOns,
    });
    product = await food.save();
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = sellerRouter;
