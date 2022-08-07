const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    nickName : {
        type : String,
        required : true,
        trim : true
    },
    struggleTime : {
        type : String,
        enum : ['Less than 2 weeks', '2 to 8 weeks', 'More than 8 weeks'],
        required : true,
        trim : true
    },
    bedTime : {
        type : String,
        required : true,
        trim : true
    },
    wakeUpTime : {
        type : String,
        required : true,
        trim : true
    },
    sleepHours : {
        type : Number,
        required : true,
        trim : true
    }

}, {timestamps : true})

module.exports = mongoose.model("users", userSchema)