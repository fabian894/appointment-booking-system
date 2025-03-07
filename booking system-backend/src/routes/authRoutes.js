const express = require('express');
const { register, login, getUsers } = require('../controllers/authController');
const { body } = require('express-validator');
const { isAdmin, verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').isIn(['user', 'admin']).withMessage('Invalid role')
], register);

router.post('/login', [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').notEmpty().withMessage('Password is required')
], login);

router.get('/users', verifyToken, isAdmin, getUsers);

module.exports = router;
