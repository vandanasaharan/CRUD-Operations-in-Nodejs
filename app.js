const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json()); //Middleware to parse JSON requests

let users = []; //List of the users

const createUserFunction = (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).send(user);
}

// Create a new user
// Endpoint, High Order function
app.post('/users', createUserFunction);

const getUserFunction = function(req, res){
    console.log(users);
    res.send(users);
}

// Get all users
app.get('/users', getUserFunction);

// Get a user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});

// Update a user by ID
app.put('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === req.params.id);
    if (userIndex !== -1) {
        users[userIndex] = req.body;
        res.send(users[userIndex]);
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});

// Delete a user by ID
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === req.params.id);
    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1);
        res.send(deletedUser[0]);
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});

app.listen(port, () => {
    console.log(`Hello, Server is running on http://localhost:${port}`);
});
