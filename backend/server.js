require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const gredditRoutes = require('./routes/GredditRoutes');

const app = express(); 
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})
app.use('/api', gredditRoutes);


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(4001, () => {
        console.log('connected to db & Server is running on port ', process.env.PORT);
    });
}).catch((error) => { console.log(error) });

