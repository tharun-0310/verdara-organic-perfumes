const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validateRegister, validateLogin } = require('../middleware/validators');

// POST /api/auth/register
router.post('/register', validateRegister, register);

// POST /api/auth/login
router.post('/login', validateLogin, login);

// GET /api/auth/profile  (protected)
router.get('/profile', protect, getProfile);

// PUT /api/auth/profile  (protected)
router.put('/profile', protect, updateProfile);

module.exports = router;
