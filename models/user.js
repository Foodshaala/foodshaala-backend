const mongoose = require("mongoose");
const Address = require("./address.js");

const userSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  email: {
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
      address: Address,
    },
  ],
  type: {
    type: String,
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
