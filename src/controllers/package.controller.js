const PackageModel = require('../models/package.model.js');

const getAllPackages = async (req, res) => {
    try {
        const packages = await PackageModel.find()
            .select(
                "title images duration location basePrice categories"
            );

        return res.status(200).json({
            success: true,
            count: packages.length,
            data: packages
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch packages",
            error: error.message
        });
    }

};

module.exports = { getAllPackages }