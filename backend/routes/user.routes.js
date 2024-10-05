const express = require('express');
const User = require('../models/users.models');
const router = new express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Registering a user
router.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Validate if all fields exist
        if (!(username && email && password)) {
            return res.status(400).send("All fields should be filled");
        }

        // Check if the user already exists
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).send("User already exists");
        }

        // Generate a hash for password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create the user
        const user = await User.create({ username, email, password: hash });

        // Send a token
        const token = jwt.sign(
            { id: user._id,
                name: user.username

            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "2h" }
        );

        user.password = undefined;

        return res.status(201).json({ token, user });

    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

// Login
router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate inputs
    if (!(email && password)) {
        return res.status(400).send("All fields should be filled");
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send("User does not exist");
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Incorrect email or password");
        }

        // Generate token if credentials are valid
        const token = jwt.sign(
            { id: user._id,
                name: user.username

            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "2h" });

        // Remove password from user object
        user.password = undefined;

        // Send response with token
        return res.json({ user, token });

    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

module.exports = router;
