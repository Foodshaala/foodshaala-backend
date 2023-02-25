const express = require("express");
const sellerRouter = express.Router();
const { FoodModel } = require("../models/food");
const seller = require("../middlewares/seller");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Restaurant } = require("../models/restaurant");

sellerRouter.get("/api/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.status(200).json(restaurants);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

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
    console.log(sellerId);
    const restaurants = await Restaurant.findOne({ owner: sellerId });
    console.log(restaurants);
    const {
      name,
      price,
      description,
      label,
      imageUrl,
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
      imageUrl,
      quantity,
      rating,
      category,
      addOns,
      restaurant: restaurants._id,
    });
    food = await food.save();
    await Restaurant.updateOne(
      { _id: restaurants._id },
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
    const restaurant = await Restaurant.findOne({ owner: seller._id });
    const food = await FoodModel.find({ restaurant: restaurant._id });
    res.status(200).json(food);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = sellerRouter;
