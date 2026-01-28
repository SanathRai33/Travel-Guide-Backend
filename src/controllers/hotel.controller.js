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


const getHotelById = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(404).json({
                message: "Hotel not found.",
                success: false
            })
        }

        const pkg = await HotelModel.findById(id);
        if (!pkg) {
            return res.status(404).json({
                message: "Hotel not found.",
                success: false
            })
        }

        return res.status(200).json({
            success: true,
            message: "Hotel found successfully",
            data: pkg
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch Hotels",
            error: error.message
        });
    }
}


module.exports = { getAllHotels, getHotelById }