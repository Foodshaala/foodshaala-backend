const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  email: {
    required: true,
    type: String,
    validate: {
      validator: (value) => {
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return value.match(re);
      },
      message: "Enter a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Minimum password length must be 6 characters"],
  },
  addressBook: {
    type: [
      {
        //address model
      },
    ],
    default: [],
  },
  type: {
    type: String,
    default: "User",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
