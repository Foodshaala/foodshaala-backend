const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  houseNo: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  completeAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = { Address, addressSchema };
