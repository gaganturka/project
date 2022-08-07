const express = require('express');
const route = require('./route/route');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

mongoose.connect("mongodb+srv://sonu517825:m0ww1dng9uqrz0ge@cluster0.wgtiy.mongodb.net/Wysa_Project?retryWrites=true&w=majority",{
    useNewUrlParser: true
})

    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))
app.use('/', route)

app.listen(process.env.PORT || 3000, function (){
    console.log('Express app running on port' + (process.env.PORT || 300));
});

