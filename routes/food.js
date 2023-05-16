const express = require("express");
const foodRouter = express.Router();
const userMidWare = require("../middlewares/user");
const { FoodModel } = require("../models/food");
const { Restaurant } = require("../models/restaurant");
foodRouter.get("/api/food/trending", userMidWare, async (req, res) => {
  try {
    const foodList = await FoodModel.find({});
    foodList.sort((a, b) => {
      let aSum = 0;
      let bSum = 0;

      for (let i = 0; i < a.ratings.length; i++) {
        aSum += a.ratings[i].rating;
      }

      for (let i = 0; i < b.ratings.length; i++) {
        bSum += b.ratings[i].rating;
      }
      return aSum < bSum ? 1 : -1;
    });
    res.json();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

foodRouter.post("/api/restaurant/menu", userMidWare, async (req, res) => {
  try {
    const restaurantId = await req.body.restaurantId;
    Restaurant.findById(restaurantId)
      .populate("menu")
      .exec((err, restaurant) => {
        if (err) throw err;
        res.json(restaurant.menu);
      });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = foodRouter;
