const RestaurantModel = require('../models/restaurant.model.js');

const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await RestaurantModel.find()
            .select(
                "title images duration location basePrice categories discount"
            );

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

module.exports = {getAllRestaurants}