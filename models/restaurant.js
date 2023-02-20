const mongoose = require("mongoose");
const { addressSchema } = require("address.js");
const restaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categories: [
    {
      name: {
        type: String,
        required: true,
      },
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
  menu: [mongoose.Schema.Types.ObjectId],
  owner: mongoose.Schema.Types.ObjectId,
  address: addressSchema,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = { Restaurant, restaurantSchema };
