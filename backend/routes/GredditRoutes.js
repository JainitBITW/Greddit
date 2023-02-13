const express = require('express');
const router = express.Router(); 
const {createUser} = require('../controllers/signupController');
const {loginUser} = require('../controllers/LoginController');
const {EditProfile , AllUsers ,UnfollowUser, Getfollowings,Getfollowers,  FollowUser} = require('../controllers/ProfileController');

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
module.exports = router 