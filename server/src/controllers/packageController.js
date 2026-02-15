const prisma = require('../utils/prisma');

// Get all packages
const getPackages = async (req, res) => {
    try {
        const { type } = req.query;
        const filter = type ? { where: { type } } : {};
        const packages = await prisma.package.findMany(filter);
        res.json(packages);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching packages' });
    }
};

// Get package by ID
const getPackageById = async (req, res) => {
    try {
        const { id } = req.params;
        const pkg = await prisma.package.findUnique({ where: { id: parseInt(id) } });
        if (!pkg) return res.status(404).json({ error: 'Package not found' });
        res.json(pkg);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching package' });
    }
};

// Create new package (Admin only)
const createPackage = async (req, res) => {
    try {
        const { title, description, price, type, duration, startDate, endDate, availableSlots, image, flyerImage, hotelStars } = req.body;

        const newPackage = await prisma.package.create({
            data: {
                title,
                description,
                price,
                type,
                duration,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                availableSlots: parseInt(availableSlots),
                image,
                flyerImage,
                hotelStars: hotelStars ? parseInt(hotelStars) : 3
            }
        });

        res.status(201).json(newPackage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating package' });
    }
};

// Update package (Admin only)
const updatePackage = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        // Handle date conversion if present
        if (data.startDate) data.startDate = new Date(data.startDate);
        if (data.endDate) data.endDate = new Date(data.endDate);
        if (data.availableSlots) data.availableSlots = parseInt(data.availableSlots);

        const updatedPackage = await prisma.package.update({
            where: { id: parseInt(id) },
            data
        });

        res.json(updatedPackage);
    } catch (error) {
        res.status(500).json({ error: 'Error updating package' });
    }
};

// Delete package (Admin only)
const deletePackage = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.package.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Package deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting package' });
    }
};

module.exports = {
    getPackages,
    getPackageById,
    createPackage,
    updatePackage,
    deletePackage
};
