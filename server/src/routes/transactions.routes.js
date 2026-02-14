const express = require('express');
const { createBooking, getUserBookings, getAllBookings, updateBookingStatus } = require('../controllers/bookingController');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticate, createBooking);
router.get('/my-bookings', authenticate, getUserBookings);
router.get('/', authenticate, authorize(['ADMIN', 'AGENT']), getAllBookings);
router.put('/:id/status', authenticate, authorize(['ADMIN', 'AGENT']), updateBookingStatus);

module.exports = router;
