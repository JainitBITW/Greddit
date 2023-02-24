require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const gredditRoutes = require('./routes/GredditRoutes');
// const bodyParser = require('body-parser');
const cors = require('cors');

const app = express(); 
app.use(express.json())

app.use(cors());
// app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})
app.use('/api', gredditRoutes);


mongoose.connect('mongodb+srv://qwerty:1234@loginregister.xybm0eg.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    app.listen(4000, () => {
        console.log('connected to db & Server is running on port ', 4000);
    });
}).catch((error) => { console.log(error) });

