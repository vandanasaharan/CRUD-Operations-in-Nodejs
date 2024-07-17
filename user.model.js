// user.model.js
const mongoose = require('mongoose');

const User = mongoose.model('User', {
    id: { type: String, unique: true, required: true },
    name: String,
    email: { type: String, unique: true, required: true },
});

module.exports = User;
