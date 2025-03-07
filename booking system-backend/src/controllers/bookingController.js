const { bookAppointment, getAllBookings, isValidBookingDate } = require('../services/bookingService');
const { validationResult } = require('express-validator');

const book = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { date, time_slot } = req.body;
    const userId = req.user.id; 

    const validDate = isValidBookingDate(date);
    if (validDate.error) {
        return res.status(400).json({ message: validDate.error });
    }

    const result = await bookAppointment(userId, date, time_slot);

    if (result.error) {
        return res.status(400).json({ message: result.error });
    }

    res.status(201).json({ message: result.message });
};

const getBookings = async (req, res) => {
    const result = await getAllBookings();

    if (result.error) {
        return res.status(400).json({ message: result.error });
    }

    res.status(200).json({ bookings: result });
};

module.exports = { book, getBookings };
