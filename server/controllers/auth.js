const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsecret = "satyamtomar";
const Joi= require("joi");
// const universalFunctions = require('../utils/universalFunctions');
const Boom =require( "boom");
import {universalFunctions} from '../utils/universalFunctions'

module.exports = {
  // createuser: async (req, res) => {
  //   try {
  // //  console.log('thid odi bpody - ', req.file, req.files)
  //   const schema=Joi.object({
  //     firstname: Joi.string()
  //     .alphanum()
  //     .min(2)
  //     .max(30)
  //     .required(),
  //     lastname: Joi.string()
  //     .alphanum()
  //     .min(2)
  //     .max(30)
  //     .required(),
  //      email: Joi.string()
  //     .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  //     ,mobileno: Joi.string().min(10).max(10).required(),
  //     profilepic:Joi.string(),
  //   })
  //   await userversalFunctions.request
  //   // const result=await schema.validateAsync(req.body);
  //   console.log(req.body,"hello",req.file);
  //   let success = false;
   
  //   // checks whether the mobileno has already been created
    
  //     let user = await User.findOne({ mobileno: req.body.mobileno });
  //     if (user) {
  //       return res.status(400).json({
  //         success,
  //         error: "Sorry a user with this mobile number already exists",
  //       });
  //     }
      

  //     user = await User.create({
        
  //       firstname: req.body.firstname,
  //       email: req.body.email,
  //       mobileno:req.body.mobileno,
  //       lastname:req.body.lastname,
  //       profilepic:req.file.filename,
  //     });
  //     // console.log(user);
  //     //   .then(user => res.json(user))
  //     //   .catch(err=>{console.log(err)
  //     // res.json({error:'Please enter a unique value for email '})
  //    res.json({success:"user createed"})
  //   } catch (error) {
  //     if(error.isJoi)
  //     {
  //       res.status(400).send("Joi server error");
  //     }
  //     console.error(error.message);
  //     res.status(500).send("Internal server error");
  //   }
  // },

}