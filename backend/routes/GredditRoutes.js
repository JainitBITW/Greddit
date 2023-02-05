const express = require('express');
const router = express.Router(); 
const {createUser} = require('../controllers/signupController');


router.get('/signup',(req,res) => {
    res.json({message: "connected to signup backend"});
    
});

router.post('/signup',createUser);
module.exports = router 