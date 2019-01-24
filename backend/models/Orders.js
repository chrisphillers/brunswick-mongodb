const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema for todo
const OrderSchema = new Schema({
  action: {
    type: String,
    required: [true, "The order text field is required"]
  }
});

//create model for todo
const Orders = mongoose.model("orders", OrderSchema);

module.exports = Orders;
