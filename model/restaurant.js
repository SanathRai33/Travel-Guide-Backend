const mongoose = require("mongoose");
const { Schema } = mongoose;

const RestaurantSchema = new Schema({
  name: {
    type: String,
  },
  cuisine: {
    type: String,
  },
  location: {
    type: String,
  },
  price: {
    type: String,
  },
  rating: {
    type: String,
  },
  reviews: {
    type: String,
  },
  timings: {
    type: String,
  },
  facilities: {
    type: String,
  },
  image: {
    type: String,
  },
  food1: {
    type: String,
  },
  food2: {
    type: String,
  },
  food3: {
    type: String,
  },
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
