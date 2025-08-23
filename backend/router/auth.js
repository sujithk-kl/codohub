const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

// Registration endpoint
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, cpassword } = req.body;

        // Validation
        if (!username || !email || !password || !cpassword) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password !== cpassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        // Create new user
        const user = new User({
            username,
            email,
            password,
            cpassword
        });

        await user.save();

        // Generate token
        const token = await user.generateAuthToken();

        // Set cookie
        res.cookie('jwtoken', token, {
            expires: new Date(Date.now() + 25892000000), // 30 days
            httpOnly: true
        });

        res.status(201).json({ message: "User registered successfully", user: { username, email } });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Find user
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate token
        const token = await user.generateAuthToken();

        // Set cookie
        res.cookie('jwtoken', token, {
            expires: new Date(Date.now() + 25892000000), // 30 days
            httpOnly: true
        });

        res.json({ message: "Login successful", user: { username: user.username, email: user.email } });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Logout endpoint
router.get('/logout', async (req, res) => {
    try {
        res.clearCookie('jwtoken', { path: '/' });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get user profile
router.get('/profile', async (req, res) => {
    try {
        const token = req.cookies.jwtoken;
        if (!token) {
            return res.status(401).json({ error: "Access denied" });
        }

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({ _id: verifyToken._id, "tokens.token": token });

        if (!user) {
            return res.status(401).json({ error: "Access denied" });
        }

        res.json({ user: { username: user.username, email: user.email, role: user.role } });

    } catch (error) {
        console.error('Profile error:', error);
        res.status(401).json({ error: "Access denied" });
    }
});

module.exports = router;
