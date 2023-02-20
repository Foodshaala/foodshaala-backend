const express = require("express");
const sellerRouter = express.Router();
const { FoodModel } = require("../models/food");
const seller = require("../middlewares/seller");

sellerRouter.post("/api/add-food", seller, async (req, res) => {
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
