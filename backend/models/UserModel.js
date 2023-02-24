const mongoose = require('mongoose');

const Schema = mongoose.Schema
const userSchema = new Schema({
    firstname: String,
    lastname: String,
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    contactno: { type: Number, unique: true },
    age: Number,
    password: String,
    numfollowers: { type: Number, default: 0 },
    numfollowing: { type: Number, default: 0 },
    Followers: {
        type: [{
            firstname: String,
            lastname: String,
            fusername: { type: String },
        }], sparse: true
    },
    Following: {
        type: [{
            firstname: String,
            lastname: String,
            fusername: { type: String },
        }], sparse: true
    },
    SavedPosts : {
        type: []
    },
    
    
});

module.exports = mongoose.model('User', userSchema);

