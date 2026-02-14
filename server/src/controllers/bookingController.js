const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a booking
const createBooking = async (req, res) => {
    try {
        const { packageId } = req.body;
        const userId = req.user.id;

        const pkg = await prisma.package.findUnique({ where: { id: parseInt(packageId) } });
        if (!pkg) return res.status(404).json({ error: 'Package not found' });

        if (pkg.availableSlots <= 0) {
            return res.status(400).json({ error: 'No slots available' });
        }

        const booking = await prisma.booking.create({
            data: {
                userId,
                packageId: parseInt(packageId),
                totalAmount: pkg.price,
                status: 'PENDING'
            }
        });

        // Decrease slots
        await prisma.package.update({
            where: { id: parseInt(packageId) },
            data: { availableSlots: { decrement: 1 } }
        });

        res.status(201).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating booking' });
    }
};

// Get user bookings
const getUserBookings = async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany({
            where: { userId: req.user.id },
            include: { package: true }
        });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching bookings' });
    }
};

// Get all bookings (Admin/Agent)
const getAllBookings = async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany({
            include: { user: { select: { name: true, email: true } }, package: true }
        });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching all bookings' });
    }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const booking = await prisma.booking.update({
            where: { id: parseInt(id) },
            data: { status }
        });

        // If cancelled, return slot? Logic for another day.

        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: 'Error updating booking status' });
    }
};

module.exports = { createBooking, getUserBookings, getAllBookings, updateBookingStatus };
