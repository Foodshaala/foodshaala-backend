const express = require("express");
const foodRouter = express.Router();
const userMidWare = require("../middlewares/user");
const { FoodModel } = require("../models/food");

foodRouter.post("/api/food/trending", userMidWare, async (res, req) => {
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
//search for query
foodRouter.get("/api/food/:query", userMidWare, async (req, res) => {
  try {
    const query = req.params.query;
    const regex = new RegExp(query, "i"); // 'i' means case-insensitive
    FoodModel.find({
      $or: [{ name: { $regex: regex } }, { category: { $regex: regex } }],
    })
      .hint({ name: 1, category: 1 })
      .exec((err, users) => {
        if (err) {
          console.error(err);
          throw err;
        }
        console.log(users);
      });
    FoodModel.find({
      $or: [{ name: { $regex: regex } }, { email: "john@example.com" }],
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
