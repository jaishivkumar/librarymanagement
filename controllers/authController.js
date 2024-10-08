const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByUsername } = require('../models/userModel');
const dotenv = require('dotenv');
dotenv.config();

const signup = async (req, res) => {
    const { username, password, role } = req.body;
    console.log('signup', username, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const result = await createUser(username, hashedPassword, role);
        res.status(201).json({ message: 'User created', userId: result.insertId });
    } catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await findUserByUsername(username);

    if (!user) return res.status(400).json({ message: 'Invalid username or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: user.role });
};

module.exports = { signup, login };
