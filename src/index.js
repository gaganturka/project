const express = require('express');
const route = require('./route/route');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
mongoose.connect("mongodb+srv://group13:UEEqzwKeluhyT2uM@cluster0.hkvjs.mongodb.net/WysaProject?retryWrites=true&w=majority",{
    useNewUrlParser: true
})

    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))
app.use('/', route)

app.listen(process.env.PORT || 3000, function (){
    console.log('Express app running on port' + (process.env.PORT || 300));
});

