const mongoose = require('mongoose');

const Schema = mongoose.Schema
const userSchema = new Schema({
    firstname: String,
    lastname: String,
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    contactno: { type: String, unique: true },
    age: Number,
    password: String,
});

module.exports = mongoose.model('User', userSchema);

