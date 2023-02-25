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
  imageUrl: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  addOns: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  restaurant: mongoose.Schema.Types.ObjectId,
  rating: [ratingSchema],
});

const FoodModel = mongoose.model("FoodItems", foodSchema);

module.exports = { FoodModel, foodSchema };
