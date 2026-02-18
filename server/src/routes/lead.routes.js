const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const { authenticate, authorize } = require('../middleware/auth');

// Public route to submit interest
router.post('/', leadController.createLead);

// Admin routes
router.get('/', authenticate, authorize(['ADMIN']), leadController.getLeads);
router.put('/:id', authenticate, authorize(['ADMIN']), leadController.updateLeadStatus);
router.delete('/:id', authenticate, authorize(['ADMIN']), leadController.deleteLead);

module.exports = router;
