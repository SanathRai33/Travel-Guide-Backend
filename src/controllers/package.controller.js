const PackageModel = require('../models/package.model.js');

const getAllPackages = async (req, res) => {
    try {
        const packages = await PackageModel.find();

        return res.status(200).json({
            success: true,
            count: packages.length,
            data: packages
        });

        console.log(packages)
    } catch (error) {
        console.error("Error fetching package data:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch package data",
            error: error.message
        });
    }
};

module.exports = { getAllPackages }