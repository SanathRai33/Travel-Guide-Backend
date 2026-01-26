const HotelModel = require('../models/hotel.model.js');

const getAllHotels = async (req, res) => {
    try {
        const hotels = await HotelModel.find()
            .select(
                "name featuredImage location roomPricing category popularAmenities"
            );

        return res.status(200).json({
            success: true,
            count: hotels.length,
            data: hotels
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch hotels",
            error: error.message
        });
    }

};

module.exports = { getAllHotels }