const PackageModel = require('../models/package.model.js');

const getAllPackages = async (req, res) => {
    try {
        const packages = await PackageModel.find()
            .select(
                "title images duration location basePrice categories discount"
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

const getPackageById = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(404).json({
                message: "Package not found.",
                success: false
            })
        }

        const pkg = await PackageModel.findById(id);
        if (!pkg) {
            return res.status(404).json({
                message: "Package not found.",
                success: false
            })
        }

        return res.status(200).json({
            success: true,
            message: "Package found successfully",
            data: pkg
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch packages",
            error: error.message
        });
    }
}

module.exports = { getAllPackages, getPackageById }