require('dotenv').config();
const mongoose = require('mongoose');
const seedDatabase = require('./mockData');

const runSeed = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL);
        console.log('🔌 Connected to MongoDB');

        // Run seeder
        await seedDatabase();

        // Close connection
        await mongoose.connection.close();
        console.log('🔌 Disconnected from MongoDB');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

runSeed();