const { registerUser, loginUser, getAllUsers } = require('../services/authService');
const { validationResult } = require('express-validator');

const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;
    const result = await registerUser(name, email, password, role);

    if (result.error) {
        return res.status(400).json({ message: result.error });
    }

    res.status(201).json({ message: result.message });
};

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const result = await loginUser(email, password);

    if (result.error) {
        return res.status(400).json({ message: result.error });
    }

    res.json({ message: 'Login successful', token: result.token, role: result.role });
};

const getUsers = async (req, res) => {
    const users = await getAllUsers();
    if (users.error) {
        return res.status(500).json({ message: users.error });
    }
    res.json(users);
};

module.exports = { register, login, getUsers };
