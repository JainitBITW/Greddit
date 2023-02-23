const User = require('../models/UserModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


var removeByAttr = function (arr, attr, value) {
    var i = arr.length;
    while (i--) {
        if (arr[i]
            && arr[i].hasOwnProperty(attr)
            && (arguments.length > 2 && arr[i][attr] === value)) {

            arr.splice(i, 1);

        }
    }
    return arr;
}

const EditProfile =
    async (req, res) => {


        const tempuser = await User.find({ _id: req.body.newdata.id })

        if (!tempuser.length) // user not found
        {
            res.status(400).json({ success: false, error: "User Not Found", tempuser: tempuser })
            console.log(req.body)
        }
        else {
            // console.log(tempuser[0])
            var truth = await bcrypt.compareSync(req.body.password, tempuser[0].password); // To Check Password
            // console.log(tempuser[0])
            if (!truth)
                res.status(400).json({ success: false, error: "  Incorrect Password" })
            else {
                tempuser[0].firstname = req.body.newdata.firstname;
                tempuser[0].lastname = req.body.newdata.lastname;
                tempuser[0].username = req.body.newdata.username;
                tempuser[0].email = req.body.newdata.email;
                tempuser[0].contactno = req.body.newdata.contactno;
                tempuser[0].age = req.body.newdata.age;
                newdatauser = {
                    id: req.body.newdata.id,
                    firstname: req.body.newdata.firstname,
                    lastname: req.body.newdata.lastname,
                    username: req.body.newdata.username,
                    email: req.body.newdata.email,
                    contactno: req.body.newdata.contactno,
                    age: req.body.newdata.age,
                    numfollowers: tempuser[0].numfollowers,
                    numfollowing: tempuser[0].numfollowing
                }
                await tempuser[0].save();
                let token = jwt.sign(newdatauser, 'jws_secret');

                res.status(200).json({ success: true, token: token });
                console.log(tempuser[0])
            }
        }
    };



const AllUsers = async (req, res) => {
    const users = await User.find({}).select("username");
    // console.log(users)
    res.status(200).json({ AllUsers: users });

}

const FollowUser = async (req, res) => {
    const usernameToFollow = req.body.usernameToFollow;
    const usertoFollow = await User.find({ username: usernameToFollow });
    const currentUser = await User.find({ username: req.body.currentUser });
    const Following = req.body.Following;
    // console.log(usertoFollow)
    if (!usertoFollow.length)  // user not found
    {
        res.status(400).json({ success: false, error: "User Not Found" })
        console.log({ error: "User Not Found" })
    }
    else if (Following.includes(usernameToFollow)) {
        res.status(400).json({ success: false, error: "Already Following" })
        console.log({ error: "Already Following", Following: Following , usernameToFollow: usernameToFollow})
    }
    else if (usernameToFollow == req.body.currentUser) {
        res.status(400).json({ success: false, error: "Cannot Follow Yourself" })
        console.log({ error: "Cannot Follow Yourself" })
    }
    else {
        usertoFollow[0].Followers.push({
            firstname: currentUser[0].firstname,
            lastname: currentUser[0].lastname,
            fusername: currentUser[0].username
        });
        currentUser[0].Following.push({
            firstname: usertoFollow[0].firstname,
            lastname: usertoFollow[0].lastname,
            fusername: usertoFollow[0].username
        });


        currentUser[0].numfollowing = currentUser[0].Following.length;
        usertoFollow[0].numfollowers = usertoFollow[0].Followers.length;
        console.log(currentUser[0].Following.length)

        await usertoFollow[0].save();
        await currentUser[0].save();
        let token = jwt.sign({ id: currentUser[0]._id, firstname: currentUser[0].firstname, lastname: currentUser[0].lastname, username: currentUser[0].username, email: currentUser[0].email, contactno: currentUser[0].contactno, age: currentUser[0].age, numfollowers: currentUser[0].numfollowers, numfollowing: currentUser[0].numfollowing }, 'jwtsecret');
        res.status(200).json({ success: true, error: "User Followed", token: token })

    }

}

const UnfollowUser = async (req, res) => {
    const usernameToUnfollow = req.body.usernameToUnfollow;
    const userToUnfollow = await User.find({ username: usernameToUnfollow });

    if ( usernameToUnfollow == req.body.currentUser) {
        res.status(400).json({ success: false, error: "Cannot Unfollow Yourself" })
        console.log({ error: "Cannot Unfollow Yourself" })
    }
    
    console.log(usernameToUnfollow + "       fasdfasdf")
    const currentUser = req.body.currentUser;
    const Followings = req.body.Followings;
    // if (userToUnfollow[0].Followers.length != 0) 
    { userToUnfollow[0].Followers = userToUnfollow[0].Followers.filter((item) => item.fusername !== currentUser); }
    // userToUnfollow[0].numfollowers = userToUnfollow[0].Followers.length;

    const tempuser1 = await User.find({ username: currentUser });
    if (tempuser1[0].Following.length != 0) { tempuser1[0].Following = tempuser1[0].Following.filter((item) => item.fusername !== usernameToUnfollow); }
    // console.log("tempuser1[0].Following" + tempuser1[0].Following)
    // console.log("tempuser1[0].Following.length" + tempuser1[0].Following.length)
    // console.log("userToUnfollow[0].Followers.length" + userToUnfollow[0].Followers.length)
    // console.log("userToUnfollow[0].Followers" + userToUnfollow[0].Followers)
    tempuser1[0].numfollowing = tempuser1[0].Following.length;
    await tempuser1[0].save()
    await userToUnfollow[0].save()
    // console.log(tempuser1[0].numfollowing)
    let token = jwt.sign({ id: tempuser1[0]._id, firstname: tempuser1[0].firstname, lastname: tempuser1[0].lastname, username: tempuser1[0].username, email: tempuser1[0].email, contactno: tempuser1[0].contactno, age: tempuser1[0].age, numfollowers: tempuser1[0].numfollowers, numfollowing: tempuser1[0].numfollowing }, 'jwtsecret');
    console.log(tempuser1[0].Following)
    res.status(200).json({ Follower: tempuser1[0].Following, token: token, success: true })



}
const RemoveFollower = async (req, res) => {
    const usernameToRemove = req.body.follower;
    const currentUser = req.body.currentUser;

    try {
        var Cuser = await User.find({ username: currentUser });
        // Cuser[0].Followers.pull({ fusername: usernameToRemove });
        Cuser[0].Followers = Cuser[0].Followers.filter((item) => item.fusername !== usernameToRemove);
        Cuser[0].numfollowers = Cuser[0].Followers.length;
        await Cuser[0].save()

        var follower = await User.find({ username: usernameToRemove });

        follower[0].Following = follower[0].Following.filter((item) => item.fusername !== currentUser);
        follower[0].numfollowing = follower[0].Following.length;
        await follower[0].save()
        console.log('removed');
        let token = jwt.sign({ id: Cuser[0]._id, firstname: Cuser[0].firstname, lastname: Cuser[0].lastname, username: Cuser[0].username, email: Cuser[0].email, contactno: Cuser[0].contactno, age: Cuser[0].age, numfollowers: Cuser[0].numfollowers, numfollowing: Cuser[0].numfollowing }, 'jwtsecret');

        res.status(200).json({ success: true, token: token, error: "User Removed" })
    }
    catch (err) {
        res.status(400).json({ success: false, error: "User Not Found" })
    }




}

const Getfollowers = async (req, res) => {
    const username = req.body.currentUser;
    const followers = await User.find({ username: username }).select("Followers");
    const newfollowers = []
    const Followers = followers[0].Followers


    Followers.forEach((element) => {
        newfollowers.push(element.fusername)
    });
    console.log(newfollowers)
    res.status(200).json({ Followers: newfollowers });


}
const Getfollowings = async (req, res) => {
    const username = req.body.username;
    const followings = await User.find({ username: username }).select("Following");

    const newfollowings = []
    const Followings = followings[0].Following


    Followings.forEach((element) => {
        newfollowings.push(element.fusername)
    });
    console.log(newfollowings)
    console.log(followings)

    res.status(200).json({ Following: newfollowings });
}
//   firstname: String,
//             lastname: String,
//             fusername: { type: String },
module.exports = { EditProfile, AllUsers, RemoveFollower, Getfollowers, Getfollowings, FollowUser, UnfollowUser }