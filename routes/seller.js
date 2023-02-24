const express = require("express");
const sellerRouter = express.Router();
const { FoodModel } = require("../models/food");
const seller = require("../middlewares/seller");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Restaurant } = require("../models/restaurant");
const { default: mongoose } = require("mongoose");

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

sellerRouter.post("/api/food/add", seller, async (req, res) => {
  try {
    const token = req.header("auth-token");
    const sellerId = jwt.verify(token, process.env.securityKey)._id;
    const restaurant = Restaurant.findOne({ owner: sellerId });
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
      restaurant: restaurant._id,
    });
    food = await food.save();
    Restaurant.updateOne(
      { _id: restaurant._id },
      { $push: { menu: food._id } }
    );
    res.json(food);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

sellerRouter.get("/api/food", seller, async (req, res) => {
  try {
    const token = req.header("auth-token");
    const seller = jwt.verify(token, process.env.securityKey);
    const restaurant = Restaurant.find({ owner: sellerId });
    const food = FoodModel.find({ restaurant: restaurant._id });
    res.status(200).json(food);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = sellerRouter;
