const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


app.use(bodyparser.json());

// CONNECT TO DATABASE
mongoose.Promise= global.Promise;

mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost:27017/hoteldb', {
    useNewUrlParser: true ,useUnifiedTopology: true
}).then(() => {
    console.log(' Connected to DataBase');
}).catch(err => {
    console.log(' NOT CONNECTED TO DATABASE');
    process.exit();
});

// TO HANDLE STATIC FILES
app.use(express.static('public'));

// Routes
app.use('/',require('./routes/api'));

//Listening to port
app.listen(process.env.PORT || 2000, function() {
    console.log(" Listening");
});