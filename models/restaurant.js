const mongoose = require("mongoose");
const { addressSchema } = require("./address.js");
const restaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  categories: [
    {
      type: String,
    },
  ],
  phoneNo: {
    type: Number,
    validate: {
      validator: (value) => {
        return value.toString().length == 10;
      },
      message: "Please enter a valid Phone no.",
    },
  },
  menu: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodModel",
    },
  ],
  owner: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
  address: addressSchema,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = { Restaurant, restaurantSchema };
