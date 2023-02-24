const User = require('../models/UserModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SubGreddit = require('../models/SubGreddit');
const Post = require('../models/Post');
const Report = require('../models/Report');



const BlockUser = async (req, res) => {
    const reportId = req.body.reportId;
    // console.log(reportId)
    
    const report = await Report.findOne({ _id: reportId });
    
        // console.log(report)
    try {
        const report = await Report.findOne({ _id: reportId });
        const SubGredditName = report.reportedSubGreddit;
        var SG = await SubGreddit.findOne({ subGredditName: SubGredditName });
        var blockedUsers = SG.subGredditBlockedUsers;
        if( !blockedUsers.includes(report.reportUser) )
       { blockedUsers.push(report.reportUser);}
        SG.subGredditBlockedUsers = blockedUsers;
        SG.subGredditFollowers.forEach((follower) => {
            if (follower.username == report.reportUser) {
               follower.blocked = true;
            }
        })
        console.log(SG.subGredditFollowers)
        console.log(SG.subGredditBlockedUsers)

        await SG.save();
    }
    catch (error) {
        // console.log(error)
        res.status(400).json({ success: false, error: error.message });
    }
}

const IgnoreReport = async (req, res) => {
    const reportId = req.body.reportId;
    // console.log(reportId)
    try {
    var report = await Report.findOne({ _id: reportId });
    report.reportIgnore = true;
    await report.save();
    res.status(200).json({ success: true, report: report });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

const DeletePost = async (req, res) => {
    const reportId = req.body.reportId;
    
    // console.log(reportId)
    console.log("delete post")
    try {
        var report = await Report.findOne({ _id: reportId });

        var post = await Post.deleteOne({ _id: report.reportedPost });

        var SG = await SubGreddit.findOne({ subGredditName: report.reportedSubGreddit });
        
        
        var posts = SG.subGredditPosts;
        var newposts = [];
        posts.forEach((post) => {
            if (post.postId !== report.reportedPost) {
                newposts.push(post);
            }
        })
        SG.subGredditPosts = newposts;
        var reportt = await Report.deleteMany({ reportedPost: report.reportedPost });
        // console.log(SG.subGredditPosts)
        await SG.save();
        res.status(200).json({ success: true, post: post });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}





const GetReports = async (req, res) => {
    const subGredditName = req.body.subGredditName;
    try {
        const reports = await Report.find({ reportedSubGreddit: subGredditName });
        // console.log(reports)
        res.status(200).json({ success: true, reports: reports });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}


const CreateReport = async (req, res) => {
    const reportedBy = req.body.reportedBy;
    const reportedPost = req.body.reportedPost;
    const reportedConcern = req.body.reportedConcern;
    const reportedSubGreddit = req.body.reportedSubGreddit;

    const post = await Post.findOne({ _id: reportedPost });

    const reportedText = post.postContent;
    // console.log(reportedText, reportedBy, reportedPost, reportedConcern, reportedSubGreddit)

    try {

        const report = ({
            "reportedBy": reportedBy,
            "reportedPost": reportedPost,
            "reportedConcern": reportedConcern,
            "reportedSubGreddit": reportedSubGreddit,
            "reportedText": reportedText,
            "reportUser": post.postCreator,
        });
        var reportt = await Report.create(report);
        // console.log(reportt)
        post.postReports.push(reportt._id);
        await post.save();



        res.status(200).json({ success: true, report: report });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

const PostUpvote = async (req, res) => {
    const postId = req.body.postId;
    const username = req.body.Username;
    // console.log(postId)
    // console.log(username)
    try {
        var post = await Post.findOne({ _id: postId });
        var upvotes = post.postUpvotes;
        var downvotes = post.postDownvotes;
        if (upvotes.includes(username)) {
            upvotes = upvotes.filter((upvote) => upvote !== username);
            post.postUpvotes = upvotes;
            await post.save();
            res.status(200).json({ success: true, post: post, message: "removed Upvote" });
            return;
        }
        else {
            upvotes.push(username);
            downvotes = downvotes.filter((downvote) => downvote !== username);
        }
        post.postUpvotes = upvotes;
        post.postDownvotes = downvotes;
        await post.save();
        res.status(200).json({ success: true, post: post, message: "Upvoted" });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}
const PostDownvote = async (req, res) => {
    const postId = req.body.postId;
    const username = req.body.Username;
    console.log(postId)
    console.log(username)
    try {
        var post = await Post.findOne({ _id: postId });
        var upvotes = post.postUpvotes;
        var downvotes = post.postDownvotes;
        if (downvotes.includes(username)) {
            downvotes = downvotes.filter((downvote) => downvote !== username);
            post.postUpvotes = upvotes;
            post.postDownvotes = downvotes;
            await post.save();
            res.status(200).json({ success: true, post: post, message: "removed Downvote" });
            return;
        }
        else {

            downvotes.push(username);
            upvotes = upvotes.filter((upvote) => upvote !== username);
        }
        post.postUpvotes = upvotes;
        post.postDownvotes = downvotes;
        await post.save();

        res.status(200).json({ success: true, post: post, message: "Downvoted" });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}



const GetPosts = async (req, res) => {
    const subGredditName = req.body.subGredditName;
    console.log(subGredditName)
    try {
        SG = await SubGreddit.findOne({ subGredditName: subGredditName });
        // console.log(SG)
        var posts = SG.subGredditPosts;
        // console.log(posts)
        var Posts = [];
        for (var i = 0; i < posts.length; i++) {
            var post = await Post.findOne({ _id: posts[i].postId });
            Posts.push(post);
        }


        res.status(200).json({ success: true, posts: Posts });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}





const BlockFollower = async (req, res) => {
    const subGredditName = req.body.subGredditName;
    const username = req.body.username;
    const currname = req.body.currname;
    var SG = await SubGreddit.findOne({ subGredditName: subGredditName });
    if(SG.subGredditCreator != currname &&  currname != null ){
        res.status(400).json({ success: false, error: "You are not the creator of this subGreddit" });
        return;
    }

    // console.log(subGredditName)
    // console.log(username)
    // console.log(SG[0])
    try {
        var followers = SG.subGredditFollowers;
        console.log(followers + "followers")
        followers.forEach((follower) => {
            console.log(follower + "follower")
            if (follower.username == username) {
                // console.log(follower)
                follower.blocked = true;
            }
        })
        let blocks = []
        followers.forEach((follower) => {
            if (follower.blocked == true) {
                blocks.push(follower.username)
            }
        })
        // console.log(blocks)
        SG.subGredditBlockedUsers = blocks;
        SG.subGredditFollowers = followers;
        await SG.save();
        res.status(200).json({ success: true, followers: SG.subGredditFollowers });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}
const UnblockFollower = async (req, res) => {
    const subGredditName = req.body.subGredditName;
    const username = req.body.username;
    const currname = req.body.currname;
    // console.log(subGredditName)
    // console.log(username)
    try {
        var SG = await SubGreddit.findOne({ subGredditName: subGredditName });
        if(SG.subGredditCreator != currname){
            res.status(400).json({ success: false, error: "You are not the creator of this subGreddit" });
            return;
        }
        
        var followers = SG.subGredditFollowers;
        followers.forEach((follower) => {
            if (follower.username == username) {
                follower.blocked = false;
            }
        })
        let blocks = []
        followers.forEach((follower) => {
            if (follower.blocked == true) {
                blocks.push(follower.username)
            }
        })
        // console.log(blocks)
        SG.subGredditBlockedUsers = blocks;
        
        SG.subGredditFollowers = followers;
        await SG.save();
        res.status(200).json({ success: true, followers: followers });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}


const GetFollowersSG = async (req, res) => {
    const subGredditName = req.body.subGredditName;
    // console.log(subGredditName)

    try {
        const subGreddit = await SubGreddit.findOne({ subGredditName: subGredditName });
        res.status(200).json({ success: true, followers: subGreddit.subGredditFollowers, creator: subGreddit.subGredditCreator });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }


}
const CreateSubGreddit = async (req, res) => {


    // console.log(req.body)
    var BannedWords = req.body.subGredditBannedWords.split(' ');
    var BannedWordsObject = [];
    BannedWords.forEach((word) => {
        BannedWordsObject.push({ bannedWord: word.trim() })
    })
    var Tags = req.body.subGredditTags.split(' ');
    var TagsObject = [];
    Tags.forEach((tag) => {
        TagsObject.push({ tag: tag.trim() })
    })

    var subGredditFollowers = [{
        username: req.body.subGredditCreator
    }];


    data = {
        "subGredditName": req.body.subGredditName.trim(),
        "subGredditDescription": req.body.subGredditDescription.trim(),
        "subGredditCreator": req.body.subGredditCreator,
        "subGredditCreatedDate": req.body.subGredditCreatedDate,
        "subGredditBannedWords": BannedWordsObject,
        "subGredditTags": TagsObject,
        "subGredditFollowers": subGredditFollowers

    }
    try {
        const subGreddit = await SubGreddit.create(data);
        res.status(200).json({ success: true, subGreddit: subGreddit })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}
const GetMySubgreddits = async (req, res) => {
    const username = req.body.username;
    try {
        const subGreddits = await SubGreddit.find({ subGredditCreator: username });
        SubGredditsCompact = [];
        subGreddits.forEach((subGreddit) => {
            SubGredditsCompact.push({
                subGredditName: subGreddit.subGredditName,
                subGredditDescription: subGreddit.subGredditDescription,
                subGredditBannedWords: subGreddit.subGredditBannedWords,
                subGredditTags: subGreddit.subGredditTags,
                subGredditnumfollowers: subGreddit.subGredditFollowers.length,
                subGredditnumposts: subGreddit.subGredditPosts.length,
                subGredditnumPendingFollowers: subGreddit.subGredditPendingFollowers.length,
                subGredditdate: subGreddit.subGredditCreatedDate,

            })
            // console.log(subGreddit.subGredditPendingFollowers.length)
        })

        res.status(200).json({ SubGreddits: SubGredditsCompact })
        // console.log(SubGredditsCompact)
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const AcceptPending = async (req, res) => {
    const subGredditName = req.body.subGredditName;
    const username = req.body.username;
    // console.log(subGredditName)
    // console.log(username)
    try {
        var SG = await SubGreddit.findOne({ subGredditName: subGredditName });
        var pendingFollowers = SG.subGredditPendingFollowers;
        var followers = SG.subGredditFollowers;
        pendingFollowers.forEach((pendingFollower) => {
            if (pendingFollower.username == username) {
                followers.push(pendingFollower);
            }
        })
        pendingFollowers = pendingFollowers.filter((pendingFollower) => {
            return pendingFollower.username != username;
        })
        SG.subGredditPendingFollowers = pendingFollowers;
        SG.subGredditFollowers = followers;
        await SG.save();
        res.status(200).json({ success: true, followers: followers, pendingFollowers: pendingFollowers });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}
const RejectPending = async (req, res) => {
    const subGredditName = req.body.subGredditName;
    const username = req.body.username;
    // console.log(subGredditName)
    // console.log(username)
    try {
        var Sg = await SubGreddit.findOne({ subGredditName: subGredditName });
        var pendingFollowers = Sg.subGredditPendingFollowers;
        pendingFollowers = pendingFollowers.filter((pendingFollower) => {
            return pendingFollower.username != username;
        })
        Sg.subGredditPendingFollowers = pendingFollowers;
        await Sg.save();
        console.log(Sg)
        res.status(200).json({ success: true, pendingFollowers: pendingFollowers });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}


const GetSubGreddit = async (req, res) => {
    const subGredditName = req.body.subGredditName;
    // console.log(subGredditName)
    try {
        const subGreddit = await SubGreddit.find({ subGredditName: subGredditName });
        let blockedUsers = subGreddit[0].subGredditBlockedUsers;
        subGreddit[0].subGredditFollowers.forEach((follower) => {
            if (follower.blocked == true) {
                blockedUsers.push(follower.username)
            }
        })
        console.log(blockedUsers)


        SubGredditsCompact = ({
            subGredditName: subGreddit[0].subGredditName,
            subGredditDescription: subGreddit[0].subGredditDescription,
            subGredditBannedWords: subGreddit[0].subGredditBannedWords,
            subGredditTags: subGreddit[0].subGredditTags,
            subGredditCreator: subGreddit[0].subGredditCreator,
            subGredditnumfollowers: subGreddit[0].subGredditFollowers.length,
            subGredditnumposts: subGreddit[0].subGredditPosts.length,
            subGredditnumPendingFollowers: subGreddit[0].subGredditPendingFollowers.length,
            subGredditBlockedUsers: blockedUsers

        })
        console.log(SubGredditsCompact)

        res.status(200).json({ SubGreddit: SubGredditsCompact })
    }
    catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message + 'DFSDF' });
    }
}

const GetPending = async (req, res) => {
    const subGredditName = req.body.subGredditName;
    // console.log(subGredditName)
    try {
        const subGreddit = await SubGreddit.find({ subGredditName: subGredditName });
        SubGredditsCompact = [];
        subGreddit[0].subGredditPendingFollowers.forEach((follower) => {
            SubGredditsCompact.push({
                username: follower.username
            })
            // console.log(follower.username)
        })
        res.status(200).json({ success: true, SubGreddit: SubGredditsCompact })
    }
    catch (error) {
        res.status(400).json({ error: error.message + 'DFSDF' });
    }
}



const DeleteSubGreddit = async (req, res) => {
    const subGredditName = req.body.subGredditName;
    console.log(subGredditName)
    try {
        var SG = await SubGreddit.findOne({ subGredditName: subGredditName })
        var reports = await Report.find({ reportedSubGreddit: subGredditName })
        reports.forEach(async (report) => {
            await Report.deleteOne({ _id: report._id })
        })

        var postids = []
        SG.subGredditPosts.forEach(post => {
            postids.push(post.postId)
        });
        console.log(postids)
        for (let i = 0; i < postids.length; i++) {
            try {
                var post = await Post.deleteOne({ _id: postids[i] })
            }
            catch (error) {
                console.log(error)
            }

            console.log(post)
        }

        const subGreddit = await SubGreddit.deleteOne({ subGredditName: subGredditName });
        console.log(subGreddit)
        res.status(200).json({ success: true })
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message + 'DFSDF' });
    }
}
const ShowAllSubGreddits = async (req, res) => {
    // console.log('here')
    var username = req.body.username;
    try {
        const subGreddits = await SubGreddit.find();


        SubGredditsCompact = [];
        subGreddits.forEach((subGreddit) => {
            let followerslength = 0 
            let followers = [];
            let pendingFollowers = [];
            subGreddit.subGredditFollowers.forEach((follower) => {
                if (follower.blocked == false) {
                    followerslength = followerslength + 1
                }
                
                if(follower.blocked == false){
                    followers.push(follower.username)
                }
            })
            subGreddit.subGredditPendingFollowers.forEach((pendingFollower) => {
                pendingFollowers.push(pendingFollower.username)
            })


            SubGredditsCompact.push({
                subGredditName: subGreddit.subGredditName,
                subGredditDescription: subGreddit.subGredditDescription,
                subGredditBannedWords: subGreddit.subGredditBannedWords,
                subGredditTags: subGreddit.subGredditTags,
                subGredditnumfollowers: followerslength,
                subGredditnumposts: subGreddit.subGredditPosts.length,
                subGredditCreator: (subGreddit.subGredditCreator == username ? true : false),
                subGredditBlockedUsers: subGreddit.subGredditBlockedUsers,
                subGredditFollowers: followers,
                subGredditPendingFollowers: pendingFollowers,
                subGredditnumPendingFollowers: subGreddit.subGredditPendingFollowers.length,
                subGredditdate: subGreddit.subGredditCreated,
                
                
            })
        }
        )
        // console.log(SubGredditsCompact)

        res.status(200).json({ allSubgreddits: SubGredditsCompact })
    }
    catch (error) {
        // console.log(error.message)
        res.status(400).json({ error: error.message });
    }
}


const FollowSubGreddit = async (req, res) => {
    const subGredditName = req.body.subGredditName;
    const username = req.body.UserName;
    // console.log(subGredditName, username)
    try {
        const subGreddit = await SubGreddit.find({ subGredditName: subGredditName });
        var subGredditPendingFollowers = subGreddit[0].subGredditPendingFollowers;
        var subGredditFollowers = subGreddit[0].subGredditFollowers;

        var Followers = []
        subGredditPendingFollowers.forEach((follower) => {
            Followers.push(follower.username)
        })
        if (Followers.includes(username)) {
            res.status(400).json({ error: 'Already Pending' });
            return;
        }

        subGredditFollowers.forEach((follower) => {
            Followers.push(follower.username)
        })
        if (Followers.includes(username)) {
            res.status(400).json({ error: 'Already Following' });
            return;
        }
        console.log(Followers)


        subGreddit[0].subGredditPendingFollowers.push({ username: username });
        await subGreddit[0].save();
        console.log(subGreddit[0].subGredditPendingFollowers)
        res.status(200).json({ success: true })

    }
    catch (error) {

        res.status(400).json({ error: "error" });
        return;
    }

}

const CreatePost = async (req, res) => {
    const subGredditName = req.body.subGredditName;
    var usernamee = req.body.Username;
    const postTitle = req.body.postTitle;
    const postBody = req.body.postBody;

    console.log(subGredditName, usernamee, postTitle, postBody)
    try {
        var subGreddit = await SubGreddit.findOne({ subGredditName: subGredditName });
        // var subGredditPosts = subGreddit[0].subGredditPosts;
        var Ppost = {
            "postTitle": postTitle,
            "postContent": postBody,
            "postCreator": usernamee,
            "postSubGreddit": subGredditName,
        }
        var post = await Post.create(Ppost);
        subGreddit.subGredditPosts.push({
            "postId": post._id,
            "postTitle": postTitle,
        });
        console.log(subGreddit.subGredditPosts)
        console.log(post._id)
        await subGreddit.save();
        res.status(200).json({ success: true })

    }
    catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
}

const SavePost = async (req, res) => {
    const postid = req.body.postID;
    const username = req.body.username;
    try {
        var user = await User.find({ username: username });
        
        if(user[0].SavedPosts.includes(postid)){
            res.status(400).json({ error: 'Already Saved' });
            return;
        }
        user[0].SavedPosts.push( postid );
        await user[0].save();
        res.status(200).json({ success: true })

    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const GetsavedPosts = async (req, res) => {
    const username = req.body.username;
    var posts = [];
    try {
        const user = await User.findOne({ username: username });
        console.log(user.SavedPosts)
        var savedPosts = user.SavedPosts;
        for(var i=0;i<savedPosts.length;i++){
            let post = await Post.findOne({ _id: savedPosts[i] });
            posts.push(post);
        }
        res.status(200).json({ success:true, posts: posts })

    
   
    }   
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const RemoveSavedPost = async (req, res) => {
    const postid = req.body.postID;
    const username = req.body.username;
    try {
    // remove the post from the user's saved posts
    let user = await User.findOne({ username: username });
    var savedPosts = user.SavedPosts;
    var newSavedPosts = [];
    for(var i=0;i<savedPosts.length;i++){
        if(savedPosts[i] != postid){
            newSavedPosts.push(savedPosts[i]);
        }
    }
    user.SavedPosts = newSavedPosts;
    await user.save();
    res.status(200).json({ success: true })
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const CommentPost = async (req, res) => {
    // console.log(req.body)
    const postid = req.body.postId;
    const username = req.body.username;
    const comment = req.body.comment;
    console.log(postid, username, comment.length)
    if (!(comment.length)) {
        res.status(400).json({ error: "Comment cannot be empty" });
        return;
    }

    try {
        let post  = await Post.findOne({ _id: postid });
        post.postComments.push({user: username, comment: comment});
        await post.save();
        res.status(200).json({ success: true })
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}





module.exports = { RemoveSavedPost,CommentPost,CreateSubGreddit,GetsavedPosts, SavePost,BlockUser,IgnoreReport, DeletePost, CreateReport, GetReports, PostDownvote, PostUpvote, GetPosts, RejectPending, AcceptPending, UnblockFollower, GetPending, BlockFollower, GetFollowersSG, GetSubGreddit, FollowSubGreddit, CreatePost, ShowAllSubGreddits, GetMySubgreddits, DeleteSubGreddit } 