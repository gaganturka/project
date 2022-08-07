const express = require('express');
const route = require('./route/route.js');
const app = express()


app.use('/', route)

app.listen(process.env.PORT || 3000, function (){
    console.log('Express app running on port' + (process.env.PORT || 300));
});

