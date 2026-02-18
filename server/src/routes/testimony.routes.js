const express = require('express');
const { getTestimonials, createTestimony, updateTestimony, deleteTestimony } = require('../controllers/testimonyController');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

router.get('/', getTestimonials);
router.post('/', authenticate, createTestimony);
router.put('/:id', authenticate, authorize(['ADMIN']), updateTestimony);
router.delete('/:id', authenticate, authorize(['ADMIN']), deleteTestimony);

module.exports = router;
