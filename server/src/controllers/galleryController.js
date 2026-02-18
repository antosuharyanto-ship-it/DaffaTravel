const prisma = require('../utils/prisma');

// Get all gallery items
const getGalleryItems = async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category ? { where: { category } } : {};
        const items = await prisma.gallery.findMany(filter);
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching gallery items' });
    }
};

// Create gallery item (Admin only)
const createGalleryItem = async (req, res) => {
    try {
        const { imageUrl, caption, category } = req.body;
        const newItem = await prisma.gallery.create({
            data: { imageUrl, caption, category }
        });
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: 'Error creating gallery item' });
    }
};

// Delete gallery item (Admin only)
const deleteGalleryItem = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.gallery.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Gallery item deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting gallery item' });
    }
};

module.exports = {
    getGalleryItems,
    createGalleryItem,
    deleteGalleryItem
};
