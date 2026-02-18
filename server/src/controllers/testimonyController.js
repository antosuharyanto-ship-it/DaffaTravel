const prisma = require('../utils/prisma');

// Get all testimonials
const getTestimonials = async (req, res) => {
    try {
        const testimonials = await prisma.testimony.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching testimonials' });
    }
};

// Create testimony (Admin or Logged in User - for now Admin only for simplicity)
const createTestimony = async (req, res) => {
    try {
        const { name, content, rating, imageUrl, packageId } = req.body;
        const newTestimony = await prisma.testimony.create({
            data: {
                name,
                content,
                rating: rating ? parseInt(rating) : 5,
                imageUrl,
                packageId: packageId ? parseInt(packageId) : null
            }
        });
        res.status(201).json(newTestimony);
    } catch (error) {
        res.status(500).json({ error: 'Error creating testimony' });
    }
};

// Update testimony (Admin only)
const updateTestimony = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, content, rating, imageUrl } = req.body;
        const updated = await prisma.testimony.update({
            where: { id: parseInt(id) },
            data: {
                name,
                content,
                rating: rating ? parseInt(rating) : undefined,
                imageUrl
            }
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Error updating testimony' });
    }
};

// Delete testimony (Admin only)
const deleteTestimony = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.testimony.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Testimony deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting testimony' });
    }
};

module.exports = {
    getTestimonials,
    createTestimony,
    updateTestimony,
    deleteTestimony
};
