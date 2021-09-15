const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  id: {
    type: String,
    required: [true, "id is required"],
  },
  message: {
    type: String,
    required: [true, "message is required"],
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
