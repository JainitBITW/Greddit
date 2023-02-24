const mongoose = require('mongoose');

const Schema = mongoose.Schema

const subGredditSchema = new Schema({
    subGredditName: { type: String, unique: true },
    subGredditDescription: String,
    subGredditCreator: String,
    subGredditCreatorId: String,
    subGredditCreatedDate: { type: Date, default: Date.now },
    subGredditBannedWords : {
        type: [{
            bannedWord: String,
        }], sparse: true
    },
    subGredditTags : {
        type: [{
            tag: String,
        }], sparse: true
    },
  
    
    subGredditPendingFollowers: {
        type: [{
            username: { type: String },
        }], sparse: true
    },

    subGredditFollowers: {
        type: [{
            username: { type: String },
            blocked:{type : Boolean, default: false},
        }], sparse: true
    },
    subGredditPosts: {
        type: [{
            postId: { type: String },
            
        }], sparse: true
    },
    subGredditBlockedUsers: {
        type: [],sparse: true
    },
    subGredditCreated: { type: Date, default: Date.now },


});


module.exports = mongoose.model('SubGreddit', subGredditSchema);
