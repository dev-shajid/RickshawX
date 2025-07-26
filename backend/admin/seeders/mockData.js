const mongoose = require('mongoose');
const Location = require('../models/location.model');
const RoutePrice = require('../models/routePrice.model');

// CUET Campus Locations
const locations = [
    {
        name: "Main Gate",
        description: "Main entrance of CUET campus",
        coordinates: { latitude: 22.4609, longitude: 91.9656 },
        landmark: "University main entrance"
    },
    {
        name: "Academic Building 1",
        description: "Central academic building with lecture halls",
        coordinates: { latitude: 22.4615, longitude: 91.9662 },
        landmark: "Near admin building"
    },
    {
        name: "Library",
        description: "Central library and study area",
        coordinates: { latitude: 22.4620, longitude: 91.9670 },
        landmark: "Behind academic building"
    },
    {
        name: "Cafeteria",
        description: "Main dining hall and food court",
        coordinates: { latitude: 22.4612, longitude: 91.9658 },
        landmark: "Near sports complex"
    },
    {
        name: "Dormitory A",
        description: "Student residential hall A",
        coordinates: { latitude: 22.4625, longitude: 91.9675 },
        landmark: "North side of campus"
    },
    {
        name: "Dormitory B",
        description: "Student residential hall B",
        coordinates: { latitude: 22.4630, longitude: 91.9680 },
        landmark: "East side of campus"
    },
    {
        name: "Medical Center",
        description: "Campus health center",
        coordinates: { latitude: 22.4605, longitude: 91.9650 },
        landmark: "Near main gate"
    },
    {
        name: "Sports Complex",
        description: "Gymnasium and sports facilities",
        coordinates: { latitude: 22.4618, longitude: 91.9665 },
        landmark: "Central campus area"
    }
];

// Route prices between locations (in Taka)
const routePrices = [
    // From Main Gate
    { from: "Main Gate", to: "Academic Building 1", price: 15, distance: 0.3, estimatedTime: 3 },
    { from: "Main Gate", to: "Library", price: 25, distance: 0.5, estimatedTime: 5 },
    { from: "Main Gate", to: "Cafeteria", price: 20, distance: 0.4, estimatedTime: 4 },
    { from: "Main Gate", to: "Dormitory A", price: 35, distance: 0.8, estimatedTime: 7 },
    { from: "Main Gate", to: "Dormitory B", price: 40, distance: 1.0, estimatedTime: 8 },
    { from: "Main Gate", to: "Medical Center", price: 10, distance: 0.2, estimatedTime: 2 },
    { from: "Main Gate", to: "Sports Complex", price: 25, distance: 0.5, estimatedTime: 5 },

    // From Academic Building 1
    { from: "Academic Building 1", to: "Library", price: 15, distance: 0.3, estimatedTime: 3 },
    { from: "Academic Building 1", to: "Cafeteria", price: 20, distance: 0.4, estimatedTime: 4 },
    { from: "Academic Building 1", to: "Dormitory A", price: 30, distance: 0.6, estimatedTime: 6 },
    { from: "Academic Building 1", to: "Dormitory B", price: 35, distance: 0.8, estimatedTime: 7 },
    { from: "Academic Building 1", to: "Medical Center", price: 20, distance: 0.4, estimatedTime: 4 },
    { from: "Academic Building 1", to: "Sports Complex", price: 15, distance: 0.3, estimatedTime: 3 },

    // From Library
    { from: "Library", to: "Cafeteria", price: 25, distance: 0.5, estimatedTime: 5 },
    { from: "Library", to: "Dormitory A", price: 20, distance: 0.4, estimatedTime: 4 },
    { from: "Library", to: "Dormitory B", price: 25, distance: 0.5, estimatedTime: 5 },
    { from: "Library", to: "Medical Center", price: 30, distance: 0.6, estimatedTime: 6 },
    { from: "Library", to: "Sports Complex", price: 20, distance: 0.4, estimatedTime: 4 },

    // From Cafeteria
    { from: "Cafeteria", to: "Dormitory A", price: 30, distance: 0.6, estimatedTime: 6 },
    { from: "Cafeteria", to: "Dormitory B", price: 35, distance: 0.8, estimatedTime: 7 },
    { from: "Cafeteria", to: "Medical Center", price: 25, distance: 0.5, estimatedTime: 5 },
    { from: "Cafeteria", to: "Sports Complex", price: 15, distance: 0.3, estimatedTime: 3 },

    // From Dormitory A
    { from: "Dormitory A", to: "Dormitory B", price: 20, distance: 0.4, estimatedTime: 4 },
    { from: "Dormitory A", to: "Medical Center", price: 40, distance: 1.0, estimatedTime: 8 },
    { from: "Dormitory A", to: "Sports Complex", price: 25, distance: 0.5, estimatedTime: 5 },

    // From Dormitory B
    { from: "Dormitory B", to: "Medical Center", price: 45, distance: 1.2, estimatedTime: 10 },
    { from: "Dormitory B", to: "Sports Complex", price: 30, distance: 0.6, estimatedTime: 6 },

    // From Medical Center
    { from: "Medical Center", to: "Sports Complex", price: 20, distance: 0.4, estimatedTime: 4 }
];

const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seeding...');

        // Clear existing data
        await Location.deleteMany({});
        await RoutePrice.deleteMany({});
        console.log('📝 Cleared existing data');

        // Create locations
        const createdLocations = await Location.insertMany(locations);
        console.log(`📍 Created ${createdLocations.length} locations`);

        // Create a map of location names to IDs
        const locationMap = {};
        createdLocations.forEach(location => {
            locationMap[location.name] = location._id;
        });

        // Create route prices with proper location IDs
        const routePriceData = routePrices.map(route => ({
            fromLocation: locationMap[route.from],
            toLocation: locationMap[route.to],
            price: route.price,
            distance: route.distance,
            estimatedTime: route.estimatedTime // Fixed: Use estimatedTime instead of time
        }));

        // Create reverse routes (both directions)
        const reverseRoutes = routePriceData.map(route => ({
            fromLocation: route.toLocation,
            toLocation: route.fromLocation,
            price: route.price,
            distance: route.distance,
            estimatedTime: route.estimatedTime
        }));

        // Combine original and reverse routes
        const allRoutes = [...routePriceData, ...reverseRoutes];

        const createdRoutes = await RoutePrice.insertMany(allRoutes);
        console.log(`💰 Created ${createdRoutes.length} route prices (bidirectional)`);

        console.log('✅ Database seeding completed successfully!');
        
        // Display summary
        console.log('\n📊 Summary:');
        console.log(`Locations: ${createdLocations.length}`);
        console.log(`Route combinations: ${createdRoutes.length}`);
        
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    }
};

module.exports = seedDatabase;