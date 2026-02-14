const express = require('express');
const {
    getPackages,
    getPackageById,
    createPackage,
    updatePackage,
    deletePackage
} = require('../controllers/packageController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getPackages);
router.get('/:id', getPackageById);

// Admin only routes
router.post('/', authenticate, authorize(['ADMIN']), createPackage);
router.put('/:id', authenticate, authorize(['ADMIN']), updatePackage);
router.delete('/:id', authenticate, authorize(['ADMIN']), deletePackage);

module.exports = router;
