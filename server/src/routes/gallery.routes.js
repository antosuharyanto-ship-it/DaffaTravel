const express = require('express');
const { getGalleryItems, createGalleryItem, deleteGalleryItem } = require('../controllers/galleryController');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

router.get('/', getGalleryItems);
router.post('/', authenticate, authorize(['ADMIN']), createGalleryItem);
router.delete('/:id', authenticate, authorize(['ADMIN']), deleteGalleryItem);

module.exports = router;
