const db = require('../config/db');
const moment = require('moment');

const isValidTimeSlot = (timeSlot) => {
    const validTimeSlots = [
        '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
        '16:00', '16:30', '17:00'
    ];
    return validTimeSlots.includes(timeSlot);
};

const isValidBookingDate = (date) => {
    const currentDate = moment().startOf('day'); 
    const selectedDate = moment(date, 'YYYY-MM-DD').startOf('day'); 

    console.log(`Selected Date: ${selectedDate.format('YYYY-MM-DD')}, Weekday: ${selectedDate.isoWeekday()}`); 

    if (selectedDate.month() !== currentDate.month()) {
        return { error: 'Bookings can only be made for the current month.' };
    }

    if (selectedDate.isoWeekday() < 1 || selectedDate.isoWeekday() > 5) {  
        return { error: 'Bookings can only be made for weekdays (Monday to Friday).' };
    }

    return { valid: true };
};


const bookAppointment = async (userId, date, timeSlot) => {
    try {
        if (!isValidTimeSlot(timeSlot)) {
            return { error: 'Invalid time slot. Please choose a time between 8:00 AM and 5:00 PM.' };
        }

        const validDate = isValidBookingDate(date);
        if (validDate.error) {
            return { error: validDate.error };
        }

        const [existingBooking] = await db.query('SELECT * FROM bookings WHERE date = ? AND time_slot = ?', [date, timeSlot]);
        if (existingBooking.length > 0) {
            return { error: 'Time slot already booked' };
        }


        await db.query('INSERT INTO bookings (user_id, date, time_slot) VALUES (?, ?, ?)', [userId, date, timeSlot]);

        return { message: 'Booking successfully created' };
    } catch (err) {
        console.error(err);
        return { error: 'Database error' };
    }
};

const getAllBookings = async () => {
    try {
        const [bookings] = await db.query(`
            SELECT bookings.id, bookings.user_id, bookings.date, bookings.time_slot, 
                   users.name, users.email 
            FROM bookings
            JOIN users ON bookings.user_id = users.id
        `);
        return bookings;
    } catch (err) {
        console.error(err);
        return { error: 'Database error' };
    }
};

const getAvailableTimeSlots = async (date) => {
    try {
        const validDate = isValidBookingDate(date);
        if (validDate.error) {
            return { error: validDate.error };
        }

        const allTimeSlots = [
            '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
            '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
            '16:00', '16:30', '17:00'
        ];

        const [bookedSlots] = await db.query(
            'SELECT time_slot FROM bookings WHERE date = ?',
            [date]
        );

        const bookedTimes = bookedSlots.map(slot => slot.time_slot);

        const availableSlots = allTimeSlots.filter(slot => !bookedTimes.includes(slot));

        return { availableSlots };
    } catch (err) {
        console.error(err);
        return { error: 'Database error' };
    }
};



module.exports = { bookAppointment, getAllBookings, isValidBookingDate, getAvailableTimeSlots };
