const prisma = require('../utils/prisma');

// Get all articles
const getArticles = async (req, res) => {
    try {
        const articles = await prisma.article.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching articles' });
    }
};

// Get article by ID
const getArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await prisma.article.findUnique({ where: { id: parseInt(id) } });
        if (!article) return res.status(404).json({ error: 'Article not found' });
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching article' });
    }
};

// Create article (Admin only)
const createArticle = async (req, res) => {
    try {
        const { title, content, imageUrl, authorId } = req.body;
        const newArticle = await prisma.article.create({
            data: {
                title,
                content,
                imageUrl,
                authorId: authorId ? parseInt(authorId) : 1
            }
        });
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(500).json({ error: 'Error creating article' });
    }
};

// Update article (Admin only)
const updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, imageUrl } = req.body;
        const updated = await prisma.article.update({
            where: { id: parseInt(id) },
            data: { title, content, imageUrl }
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Error updating article' });
    }
};

// Delete article (Admin only)
const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.article.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Article deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting article' });
    }
};

module.exports = {
    getArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
};
