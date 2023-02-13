const User = require('../models/UserModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const createUser =  async (req, res) => {
    console.log(req.body)
    var password = req.body.password;
    var salt = await bcrypt.genSaltSync(10);
    var encryptedpassword = await bcrypt.hashSync(password, salt);
    data = {
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "username": req.body.username,
        "email": req.body.email,
        "contactno": req.body.contactno,
        "age": req.body.age,
        "password": encryptedpassword,

    }

    try {
        const user = await User.create(data);

        res.status(200).json(user)

    } catch (error) {
        res.status(400).json({ error: error.message});
    }
};


module.exports= {createUser}