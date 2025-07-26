const jwt = require('jsonwebtoken');
const AdminModel = require('../models/admin.model');
const BlacklistTokenModel = require('../models/blacklistToken.model');


module.exports.adminAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const isBlacklisted = await BlacklistTokenModel.find({ token });

        if (isBlacklisted.length) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const admin = await AdminModel.findById(decoded.id);

        if (!admin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.admin = admin;

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}