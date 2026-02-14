const express = require('express');
const { getBranches, createBranch, updateBranch, deleteBranch } = require('../controllers/branchController');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

router.get('/', getBranches);
router.post('/', authenticate, authorize(['ADMIN']), createBranch);
router.put('/:id', authenticate, authorize(['ADMIN']), updateBranch);
router.delete('/:id', authenticate, authorize(['ADMIN']), deleteBranch);

module.exports = router;
