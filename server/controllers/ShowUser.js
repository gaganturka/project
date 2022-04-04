const User = require("../models/User");
const borhanUser = require("../models/Borhan_User");
const expertUser = require("../models/Expert_User");
const otpModel=require("../models/Otp")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsecret = "satyamtomar";
const Joi = require("@hapi/joi");
const APP_CONSTANTS = require("../appConstants");
import responseMessages from "../resources/response.json";

const Boom = require("boom");
import universalFunctions from "../utils/universalFunctions";

module.exports = {

 showExperts:async(req,res)=>{
  try{
    const user=await User.find({role:"expert"})
    .populate({path: 'userData.data'});
    // user.map((ele)=>{
    //     console.log(ele.role,"rollesss");
    // })
    console.log("myuserrrrrrrrssss",user,"myuserrrrsss")
    universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "All experts are",
          data:user
        },
        res
      );
    if(!user  )
    {
     throw Boom.badRequest("cannot find any user")
    }
    

  }catch(error){
    universalFunctions.sendError(error,res)
  }
 },
  
}
