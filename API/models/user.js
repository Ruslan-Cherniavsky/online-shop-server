const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true, min: 5, max: 30 },
    lastName: { type: String, required: true, min: 5, max: 30 },
    email: { type: String, required: true, lowercase: true, unique: true, match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ },
    password: { type: String, required: true, min: 5, max: 30 },
    city: { type: String },
    street: { type: String },
    role: { type: String, default: 'user', required: true }
});

module.exports = mongoose.model('User', userSchema)