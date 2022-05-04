const Boom = require("boom");
const Joi = require("@hapi/joi");
const {Config} = require('../config')
const jwt = require('jsonwebtoken')
const jwtGenerator=async(userId)=>{
    const token = jwt.sign(
        { user_id: userId },
        Config.jwtsecret
      );
     return token;
}

module.exports={
    jwtGenerator
}