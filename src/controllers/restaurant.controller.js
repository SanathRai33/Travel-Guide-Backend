const RestaurantModel = require('../models/restaurant.model.js');

console.log('✅ Restaurant model schema defined');
console.log('RestaurantModel created:', !!RestaurantModel);

const getAllRestaurants = async (req, res) => {
    try {
        console.log('Fetching restaurants.....');
        const restaurants = await RestaurantModel.find()

        console.log('Found restaurants:', restaurants.length);

        return res.status(200).json({
            success: true,
            count: restaurants.length,
            data: restaurants
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch restaurants",
            error: error.message
        });
    }

};

module.exports = { getAllRestaurants }