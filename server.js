const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/academia');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use('/user', require('./routes/user'));

app.listen(process.env.port || 4100, function(){
    console.log('now listening for requests');
});