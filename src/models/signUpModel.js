const mongoose = require('mongoose')

const signUpSchema = new mongoose.Schema({
    nickName: {
        type: String,
        required: 'nickName is required',
        trim: true,
        unique : true
    },

    password: {
        type: String,
        required: 'password is required',
        trim : true
        // minlength : [8,'password must not be less then 8 digits'],
        // maxlength : [15, 'password must not be greater then 15 digits']
    },

}, { timestamps: true })

module.exports = new mongoose.model("registration", signUpSchema)