const User = require("../models/User");
const borhanUser = require("../models/Borhan_User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsecret = "satyamtomar";
const Joi= require("joi");
const APP_CONSTANTS = require("../appConstants");
import responseMessages from "../resources/response.json";

const Boom =require( "boom");
import universalFunctions from '../utils/universalFunctions'

module.exports = {
  createBorhanUser: async (req, res) => {
    try {
  //  console.log('thid odi bpody - ', req.file, req.files)
    const schema=Joi.object({
      firstName: Joi.string()
      .alphanum()
      .min(2)
      .max(30)
      .required(),
      lastName: Joi.string()
      .alphanum()
      .min(2)
      .max(30)
      .required(),
       email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      ,mobileNo: Joi.string().min(10).max(10).required(),
      
    })
    await universalFunctions.validateRequestPayload(req.body, res, schema)
    // const result=await schema.validateAsync(req.body);
    // console.log(req.body,"hello",req.file);
    let success = false;
   
    // checks whether the mobileno has already been created
    
      let user = await User.findOne({ mobileNo: req.body.mobileNo });
      // console.log(user,APP_CONSTANTS.role.borhanuser,us)
      if(user!==null){
      if (user.role===APP_CONSTANTS.role.borhanuser) {
       
        throw Boom.badRequest(responseMessages.USER_EXISTS);

      }}
      
      let borhanuser=await borhanUser.create({ isSubscribed: false,balance:0}) 
      console.log(borhanuser)
      
      user = await User.create({
        
        firstName: req.body.firstName,
        email: req.body.email,
        mobileNo:req.body.mobileNo,
        lastName:req.body.lastName,
        profilePic:req.file.filename,
        isEmailVerified:false,
        role:APP_CONSTANTS.role.borhanuser,
        userData:{
          model:APP_CONSTANTS.role.user,
          data:borhanuser._id
        }
      });
      console.log(user)
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "User created",
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error,res)
    }
  },
  createExpertUser: async (req, res) => {
    try {
  //  console.log('thid odi bpody - ', req.file, req.files)
    const schema=Joi.object({
      firstName: Joi.string()
      .alphanum()
      .min(2)
      .max(30)
      .required(),
      lastName: Joi.string()
      .alphanum()
      .min(2)
      .max(30)
      .required(),
       email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      ,mobileNo: Joi.string().min(10).max(10).required(),
      profilePic:Joi.string(),
    })
    await universalFunctions.validateRequestPayload(req.body, res, schema)
    // const result=await schema.validateAsync(req.body);
    // console.log(req.body,"hello",req.file);
    let success = false;
   
    // checks whether the mobileno has already been created
    
      let user = await User.findOne({ mobileNo: req.body.mobileNo });
      // console.log(user,APP_CONSTANTS.role.borhanuser,us)
      if(user!==null){
      if (user.role===APP_CONSTANTS.role.borhanuser) {
       
        throw Boom.badRequest(responseMessages.USER_EXISTS);

      }}
      
      let borhanuser=await borhanUser.create({ isSubscribed: false,balance:0}) 
      console.log(borhanuser)
      
      user = await User.create({
        
        firstName: req.body.firstName,
        email: req.body.email,
        mobileNo:req.body.mobileNo,
        lastName:req.body.lastName,
        profilePic:req.file.filename,
        isEmailVerified:false,
        role:APP_CONSTANTS.role.borhanuser,
        userData:{
          model:APP_CONSTANTS.role.user,
          data:borhanuser._id
        }
      });
      console.log(user)
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "User created",
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error,res)
    }
  },
}