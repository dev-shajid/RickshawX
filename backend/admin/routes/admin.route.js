const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth.middleware');


router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.get('/logout', adminController.logout);
router.get('/profile', authMiddleware.adminAuth, adminController.profile);
router.get('/accepted-ride', authMiddleware.adminAuth, adminController.acceptedRide);

module.exports = router;