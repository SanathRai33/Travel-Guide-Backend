const RestaurantModel = require('../models/restaurant.model.js');

const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await RestaurantModel.find()
        .select('name location rating priceTier facilities featuredImage amenities primaryCuisine')
        .lean();

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


const getRestaurantById = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(404).json({
                message: "Restaurant not found.",
                success: false
            })
        }

        const resto = await RestaurantModel.findById(id)
        .select('name location rating priceTier facilities featuredImage amenities primaryCuisine description images operatingHours contact chef menu')
        .lean();

        if (!resto) {
            return res.status(404).json({
                message: "Restaurant not found.",
                success: false
            })
        }

        return res.status(200).json({
            success: true,
            message: "Restaurant found successfully",
            data: resto
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch restaurants",
            error: error.message
        });
    }
}


module.exports = { getAllRestaurants, getRestaurantById }