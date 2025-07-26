const rideModel = require('../models/ride.model');
const { subscribeToQueue, publishToQueue } = require('../service/rabbit.js')

module.exports.createRide = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'Request body is required' });
        }

        const { pickup, destination } = req.body;

        if (!pickup || !destination) {
            return res.status(400).json({
                message: 'Pickup and destination are required',
                received: { pickup, destination }
            });
        }

        const newRide = new rideModel({
            user: req.user._id,
            pickup,
            destination
        });

        await newRide.save();
        publishToQueue("new-ride", JSON.stringify(newRide));
        res.json(newRide);

    } catch (error) {
        console.error('Error creating ride:', error);
        res.status(500).json({ message: error.message });
    }
}

module.exports.acceptRide = async (req, res, next) => {
    const { rideId } = req.query;
    const ride = await rideModel.findById(rideId);
    if (!ride) {
        return res.status(404).json({ message: 'Ride not found' });
    }

    ride.status = 'accepted';
    await ride.save();
    publishToQueue("ride-accepted", JSON.stringify(ride))
    res.send(ride);
}