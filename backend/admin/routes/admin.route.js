const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location.controller');
const routePriceController = require('../controllers/routePrice.controller');

// Public location APIs - for user and ride services
router.get('/locations', locationController.getAllLocations);
router.get('/locations/active', locationController.getActiveLocations);
router.get('/locations/:id', locationController.getLocationById);

// Public route price APIs - for user and ride services
router.get('/routes/prices', routePriceController.getAllRoutePrices);
router.get('/routes/price', routePriceController.getRoutePrice);

module.exports = router;