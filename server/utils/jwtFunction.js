import Boom from "boom";
import Joi from "@hapi/joi";
import responseMessages from "../resources/response.json";
import {Config} from '../config'
import jwt from 'jsonwebtoken'
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