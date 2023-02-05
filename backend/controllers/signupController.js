const User = require('../models/UserModel');
const mongoose = require('mongoose');

const createUser =  async (req, res) => {
    console.log(req.body)
 
    data = {
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "username": req.body.username,
        "email": req.body.email,
        "contactno": req.body.contactno,
        "age": req.body.age,
        "password": req.body.password,

    }

    try {
        const user = await User.create(data);

        res.status(200).json(user)

    } catch (error) {
        res.status(400).json({ error: error.message});
    }
};
module.exports= {createUser}