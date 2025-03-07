const express = require('express');
const { body } = require('express-validator');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const { book, getBookings } = require('../controllers/bookingController');
const router = express.Router();

router.post('/book', verifyToken, [
    body('date').notEmpty().withMessage('Date is required'),
    body('time_slot').notEmpty().withMessage('Time slot is required'),
], book);

router.get('/admin/bookings', verifyToken, isAdmin, getBookings);

module.exports = router;
