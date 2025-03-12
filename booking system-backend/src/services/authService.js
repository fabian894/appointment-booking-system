const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (name, email, password, role) => {
    try {
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return { error: 'User already exists' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', 
            [name, email, hashedPassword, role]);

        return { message: 'User registered successfully' };
    } catch (err) {
        console.error(err);
        return { error: 'Database error' };
    }
};

const loginUser = async (email, password) => {
    try {
        const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length === 0) {
            return { error: 'Invalid credentials' };
        }

        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return { error: 'Invalid credentials' };
        }

        const token = jwt.sign(
            { id: user[0].id, role: user[0].role, name: user[0].name },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return { token, role: user[0].role };
    } catch (err) {
        console.error(err);
        return { error: 'Database error' };
    }
};

const getAllUsers = async () => {
    try {
        const [users] = await db.query('SELECT name, email, role FROM users');
        return users;
    } catch (err) {
        console.error(err);
        return { error: 'Database error' };
    }
};

module.exports = { registerUser, loginUser, getAllUsers };
