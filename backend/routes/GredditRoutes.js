const express = require('express');
const router = express.Router(); 
const {createUser} = require('../controllers/signupController');
const {loginUser} = require('../controllers/LoginController');
const {EditProfile , AllUsers ,UnfollowUser,RemoveFollower, Getfollowings,Getfollowers,  FollowUser} = require('../controllers/ProfileController');
const {CreateSubGreddit,CommentPost,RemoveSavedPost,BlockUser,GetsavedPosts,SavePost,IgnoreReport,DeletePost,CreateReport,GetReports,PostDownvote,PostUpvote,GetPosts,RejectPending,CreatePost,AcceptPending,GetPending,UnblockFollower,GetFollowersSG,BlockFollower ,FollowSubGreddit,ShowAllSubGreddits,DeleteSubGreddit, GetSubGreddit,GetMySubgreddits} = require('../controllers/SubGredditController');
router.get('/signup',(req,res) => {
    res.json({message: "connected to signup backend"});
    
});

router.get('/login',(req,res) => {
    res.json({message: "connected to login backend"});
});

router.post('/signup',createUser);
router.post('/login',loginUser);

router.post('/editprofile', EditProfile);
router.post('/allusers', AllUsers);
router.post('/followuser', FollowUser);
router.post('/getfollowers', Getfollowers);
router.post('/getfollowings', Getfollowings);
router.post('/unfollowuser', UnfollowUser);
router.post('/removefollower', RemoveFollower);
router.post('/createsubgreddit', CreateSubGreddit);
router.post('/getmysubgreddits', GetMySubgreddits);
router.post('/getsubgredditpage', GetSubGreddit);
router.post('/deletesubgreddit', DeleteSubGreddit);
router.post('/allsubgreddits', ShowAllSubGreddits);
router.post('/followsubgreddit', FollowSubGreddit);
router.post('/sg/getfollowers', GetFollowersSG);
router.post('/blockfollower', BlockFollower);
router.post('/unblockfollower', UnblockFollower);
router.post('/getpending', GetPending);
router.post('/acceptpending', AcceptPending);
router.post('/delpending', RejectPending);
router.post('/makepost', CreatePost);
router.post('/getposts', GetPosts);
router.post('/upvote',PostUpvote);
router.post('/downvote',PostDownvote);
router.post('/report', CreateReport);
router.post('/getreports', GetReports);
router.post('/blockuser', BlockUser);
router.post('/ignorereport', IgnoreReport);
router.post('/deletepost', DeletePost);
router.post('/savepost', SavePost);
router.post('/getsavedposts', GetsavedPosts);
router.post('/removesavedpost', RemoveSavedPost);
router.get('/commentpost', (req,res) => {
    res.json({message: "connected to comment backend"});
    }
        )
router.post('/commentpost', CommentPost);
module.exports = router 