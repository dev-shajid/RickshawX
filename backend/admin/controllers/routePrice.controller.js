const RoutePrice = require('../models/routePrice.model');

module.exports.getAllRoutePrices = async (req, res) => {
    try {
        const routePrices = await RoutePrice.find({ isActive: true })
            .populate('fromLocation toLocation', 'name description coordinates')
            .sort({ 'fromLocation.name': 1 });

        res.json({
            success: true,
            message: 'Route prices fetched successfully',
            data: routePrices
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports.getRoutePrice = async (req, res) => {
    try {
        const { from, to } = req.query;

        if (!from || !to) {
            return res.status(400).json({
                success: false,
                message: 'Both from and to location IDs are required',
                example: '/routes/price?from=locationId1&to=locationId2'
            });
        }

        const routePrice = await RoutePrice.findOne({
            fromLocation: from,
            toLocation: to,
            isActive: true
        }).populate('fromLocation toLocation', 'name description coordinates');

        if (!routePrice) {
            return res.status(404).json({
                success: false,
                message: 'Route price not found for this location pair',
                data: { from, to }
            });
        }

        res.json({
            success: true,
            message: 'Route price fetched successfully',
            data: routePrice
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};