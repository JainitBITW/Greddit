const mongoose = require('mongoose');

const Schema = mongoose.Schema

const report = new Schema({
    reportedBy: String,
    reportedPost: String,
    reportedConcern: String,
    reportedText: String,
    reportedSubGreddit: String,
    reportIgnore: { type: Boolean, default: false },
    reportUser: String,
    reportCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Report', report);