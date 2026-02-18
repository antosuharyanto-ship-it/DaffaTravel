const express = require('express');
const { register, login, getUsers, updateUserRole, adminResetPassword, forceChangePassword } = require('../controllers/authController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', authenticate, authorize(['ADMIN']), getUsers);
router.put('/users/:id', authenticate, authorize(['ADMIN']), updateUserRole);
router.put('/users/:id/reset-password', authenticate, authorize(['ADMIN']), adminResetPassword);
router.put('/force-change-password', authenticate, forceChangePassword);

module.exports = router;
