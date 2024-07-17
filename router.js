const express = require('express');
const User = require('./user.model');
const router = express.Router();

// Create a new usernode 
router.post('/', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id });
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ id: req.params.id });
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
