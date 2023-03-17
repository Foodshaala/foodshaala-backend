const mongoose = require("mongoose");
const { addressSchema } = require("./address.js");

const userSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  email: {
    lowercase: true,
    required: true,
    type: String,
    trim: true,
    validate: {
      validator: (value) => {
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return value.match(re);
      },
      message: "Please enter a valid email address",
    },
  },
  phoneNo: {
    required: true,
    type: Number,
    validate: {
      validator: (value) => {
        return value.toString().length == 10;
      },
      message: "Please enter a valid Phone no.",
    },
  },
  password: {
    required: true,
    type: String,
  },
  addressBook: [
    {
      address: addressSchema,
    },
  ],
  type: {
    type: String,
    default: "user",
  },
  search_history: [{ query: String, date: Date }],
  order_history: [
    {
      orderedItems: [
        {
          foodItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FoodModel",
          },
          quantity: Number,
        },
      ],
      date: Date,
    },
  ],
  cart: [
    {
      foodItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodModel",
      },
      quantity: Number,
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
