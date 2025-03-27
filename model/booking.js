const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookingSchema = new Schema({
  bookBy: {
    type: String,
  },
  transactionIds: {
    type: String,
  },
  title: { type: String },
  time: { type: String },
  category: { type: String },
  location: { type: String },
  price: { type: String },
  totalPrice: { type: String },
  bookedDate: { type: String },
  numbers: { type: String },
  checkIn: { type: String },
  checkOut: { type: String },
});

module.exports = mongoose.model("Book", BookingSchema);
