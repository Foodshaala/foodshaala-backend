const mongoose = require("mongoose");
const ratingSchema = require("./rating");

const foodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  label: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: [
    mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    }),
  ],
  rating: [ratingSchema],
});

const FoodModel = mongoose.model("FoodModel", foodSchema);

module.exports = { FoodModel, foodSchema };
