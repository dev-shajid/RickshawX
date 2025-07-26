const Admin = require('../models/admin.model');
const blacklisttokenModel = require('../models/blacklistToken.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { subscribeToQueue } = require('../service/rabbit')
const EventEmitter = require('events');
const rideEventEmitter = new EventEmitter();

module.exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (admin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hash = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ name, email, password: hash });

        await newAdmin.save();

        const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token);

        delete newAdmin._doc.password;

        res.send({ token, newAdmin });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin
            .findOne({ email })
            .select('+password');

        if (!admin) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }


        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        delete admin._doc.password;

        res.cookie('token', token);

        res.send({ token, admin });

    } catch (error) {

        res.status(400).json({ message: error.message });
    }

}

module.exports.logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        await blacklisttokenModel.create({ token });
        res.clearCookie('token');
        res.send({ message: 'Admin logged out successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.profile = async (req, res) => {
    try {
        res.send(req.admin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.acceptedRide = async (req, res) => {
    // Long polling: wait for 'ride-accepted' event
    rideEventEmitter.once('ride-accepted', (data) => {
        res.send(data);
    });

    // Set timeout for long polling (e.g., 30 seconds)
    setTimeout(() => {
        res.status(204).send();
    }, 30000);
}

subscribeToQueue('ride-accepted', async (msg) => {
    const data = JSON.parse(msg);
    rideEventEmitter.emit('ride-accepted', data);
});