const express = require('express');
const { getArticles, getArticleById, createArticle, updateArticle, deleteArticle } = require('../controllers/articleController');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

router.get('/', getArticles);
router.get('/:id', getArticleById);
router.post('/', authenticate, authorize(['ADMIN']), createArticle);
router.put('/:id', authenticate, authorize(['ADMIN']), updateArticle);
router.delete('/:id', authenticate, authorize(['ADMIN']), deleteArticle);

module.exports = router;
