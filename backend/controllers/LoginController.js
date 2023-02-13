const User = require('../models/UserModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginUser =
    async (req, res) => {
        console.log(req.body)
        var password = req.body.password;
        var username = req.body.username

        const tempuser = await User.find({ username: username })
        if (!tempuser.length) // user not found
            res.status(400).json({ success: false, error: "User Not Found" })
        else {
            // console.log(tempuser[0])
            var truth = await bcrypt.compareSync(password, tempuser[0].password); // To Check Password
            // console.log(tempuser[0])
            if (!truth)
                res.status(400).json({ success: false, error:"  Incorrect Password"})
            else {
                let token = jwt.sign({ id: tempuser[0]._id, firstname: tempuser[0].firstname, lastname: tempuser[0].lastname, username: tempuser[0].username, email: tempuser[0].email, contactno: tempuser[0].contactno, age: tempuser[0].age, numfollowers: tempuser[0].numfollowers, numfollowing: tempuser[0].numfollowing }, 'jwtsecret');
                res.status(200).json({ success: true, token: token });
                console.log(tempuser[0])
            }
        }
    };

module.exports = { loginUser }