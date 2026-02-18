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

// Create testimony (Admin or Logged in User)
const createTestimony = async (req, res) => {
    try {
        const { name, content, rating, imageUrl, packageId } = req.body;
        const userId = req.user.id;
        const userName = name || req.user.name; // Use provided name or logged in user's name

        const newTestimony = await prisma.testimony.create({
            data: {
                name: userName,
                content,
                rating: rating ? parseInt(rating) : 5,
                imageUrl,
                userId: userId,
                packageId: packageId ? parseInt(packageId) : null
            }
        });
        res.status(201).json(newTestimony);
    } catch (error) {
        console.error("Error creating testimony", error);
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
