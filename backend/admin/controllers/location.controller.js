const Location = require('../models/location.model');

module.exports.getAllLocations = async (req, res) => {
    try {
        const locations = await Location.find().sort({ name: 1 });
        res.json({
            success: true,
            message: 'Locations fetched successfully',
            data: locations
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports.getActiveLocations = async (req, res) => {
    try {
        const locations = await Location.find({ isActive: true }).sort({ name: 1 });
        res.json({
            success: true,
            message: 'Active locations fetched successfully',
            data: locations
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports.getLocationById = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) {
            return res.status(404).json({
                success: false,
                message: 'Location not found'
            });
        }
        res.json({
            success: true,
            message: 'Location fetched successfully',
            data: location
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};