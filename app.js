const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.json()); //Middleware to parse JSON requests

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userDB', {});

// Define User schema and model
const User = mongoose.model('User', {
    id: { type: String, unique: true, required: true }, // String,
    name: String,
    class: String,
});

// Create a new user
app.post('/users', async (req, res) => {
    const user = new User(req.body);
    console.log(user);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get a user by ID
app.get('/users/:id', async (req, res) => {
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
app.put('/users/:id', async (req, res) => {
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
app.delete('/users/:id', async (req, res) => {
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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
