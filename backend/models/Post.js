const mongoose = require('mongoose');

const Schema = mongoose.Schema

const post = new Schema({
    postTitle: String,
    postContent: String,
    postCreator: String ,
    postSubGreddit: String,
    postUpvotes: {  type: [], sparse: true },
    postDownvotes: {  type: [], sparse: true },
    postReports: {  type: [], sparse: true },
    postCreated: { type: Date, default: Date.now },
    postComments: {  type: [{
        user: String,
        comment: String,
    }], sparse: true },


});

module.exports = mongoose.model('Post', post);
