const express = require('express');
const { register, login, getUsers, updateUserRole } = require('../controllers/authController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', authenticate, authorize(['ADMIN']), getUsers);
router.put('/users/:id', authenticate, authorize(['ADMIN']), updateUserRole);

module.exports = router;
