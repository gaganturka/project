const User = require("../models/User");
const borhanUser = require("../models/Borhan_User");
const expertUser = require("../models/Expert_User");
const appointmentModel=require("../models/Appointment");
const expertTimeAvailable =require("../models/ExpertTimeSlot");
const category = require("../models/Categories");
const practiceModel = require("../models/Practice_Area");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
import Mongoose from "mongoose";
import jwtFunction from '../utils/jwtFunction';

const APP_CONSTANTS = require("../appConstants");
// const User = require("../models/User");
import responseMessages from "../resources/response.json";
const { Config } = require("../config");

const Boom = require("boom");
import universalFunctions from "../utils/universalFunctions";

module.exports = {
  userLogin:async (req,res)=>{
  try{
    const schema = Joi.object({
      mobileNo: Joi.string().min(10).max(10).required(),
      // .allow("")
    });
    await universalFunctions.validateRequestPayload(req.body, res, schema);
   const user=await User.findOne({mobileNo:req.body.mobileNo});
   
   if(!user)
   {
     throw Boom.badRequest(responseMessages.USER_NOT_FOUND);
   }

   const token=await jwtFunction.jwtGenerator(user._id);
       
   universalFunctions.sendSuccess(
    {
      statusCode: 200,
      message: responseMessages.SUCCESS,
      data: token,
    },
    res
  );


  }catch(error)

  { 
  universalFunctions.sendError(error, res);
}
  },
  createBorhanUser: async (req, res) => {
    try {
      //  console.log('thid odi bpody - ', req.file, req.files)
      const schema = Joi.object({
        firstName: Joi.string().alphanum().min(2).max(30).required(),
        lastName: Joi.string().alphanum().min(2).max(30).required(),
        email: Joi.string().email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        }),
        mobileNo: Joi.string().min(10).max(10).required(),
        profilePic: Joi.string().allow(""),
        // .allow("")
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      // const result=await schema.validateAsync(req.body);
      console.log(req.body, "hello", req.file);
      let success = false;

      // checks whether the mobileno has already been created

      let user = await User.findOne({ mobileNo: req.body.mobileNo });
      // console.log(user,APP_CONSTANTS.role.borhanuser,us)
      if (user !== null) {
        // if (user.role === APP_CONSTANTS.role.borhanuser) {
          throw Boom.badRequest(responseMessages.USER_EXISTS);
        // } else {
        //   console.log("otppppforuser", user.otp);
        //   if (req.body.otp !== "999999") {
        //     throw Boom.badRequest(responseMessages.INVALID_OTP);
        //   }
        //   let borhanuser = await borhanUser.create({
        //     isSubscribed: false,
        //     balance: 0,
        //     userId: user._id,
        //   });
        //  const token=await jwtFunction.jwtGenerator(user._id);
        //   universalFunctions.sendSuccess(
        //     {
        //       statusCode: 200,
        //       message: "User created",
        //       data: token,
        //     },
        //     res
        //   );
        // }
      }
      console.log("phone number   ", req.body.mobileNo);
      
      let borhanuser = await borhanUser.create({
        isSubscribed: false,
        balance: 0,
      });
      // console.log(borhanuser);

      user = await User.create({
        firstName: req.body.firstName,
        email: req.body.email,
        mobileNo: req.body.mobileNo,
        lastName: req.body.lastName,
        profilePic: req.body.profilePic,
        isEmailVerified: false,
        role: APP_CONSTANTS.role.borhanuser,
        userData: {
          model: APP_CONSTANTS.role.borhanuser,
          data: borhanuser._id,
        },
      });
      await borhanUser.findByIdAndUpdate(borhanuser._id, { userId: user._id });

      console.log(user);
      console.log(res.json, "jwttoken");

      // const token = jwt.sign(
      //   { user_id: user._id, email: user.email, mobileNo: user.mobileNo },
      //   Config.jwtsecret
      // );
      const token=await jwtFunction.jwtGenerator(user._id);
          
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: responseMessages.USER_CREATED,
          data: token,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  desktopPage: async (req, res) => {
    try {
      let expert;
      
      expert = await expertUser
        .find({
          isApprovedByAdmin: true,
          // isSubscribed: true,
          
          // status: APP_CONSTANTS.activityStatus.active,
        })
        .populate("practiceArea")
        .populate("category")
        .populate("userId")
        .sort({ "rating.avgRating": -1 });

      if (!expert) {
        throw Boom.badRequest("cannot find any expert");
      }

      // console.log(
      //   "expert top are",
      //   expert,
      //   "top expert "
      // );
      
       
      let topOnlineExperts = await expertUser
      .find({
        isApprovedByAdmin: true,
        // isSubscribed: true,
        status: APP_CONSTANTS.activityStatus.active,
      })
      .populate("practiceArea")
      .populate("category")
      .populate("userId")
      .sort({ "rating.avgRating": -1 });

    if (!topOnlineExperts) {
      throw Boom.badRequest("cannot find any online expert");
    }

    let topOnlinePremiumExperts = await expertUser
    .find({
      isApprovedByAdmin: true,
      isSubscribed: true,
      status: APP_CONSTANTS.activityStatus.active,
    })
    .populate("practiceArea")
    .populate("category")
    .populate("userId")
    .sort({ "rating.avgRating": -1 });

  if (!topOnlinePremiumExperts) {
    throw Boom.badRequest("cannot find any premium online expert");
  }

  let categoryData = await category.find();
  if (!categoryData) {
    throw Boom.badRequest(responseMessages.CATEGORY_NOT_FOUND);
  }
  let practiceData = await practiceModel.find();
  if (!practiceData) {
    throw Boom.badRequest(responseMessages.CATEGORY_NOT_FOUND);
  }
  let userId=req.user.id;
     
  let upcomingAppointmentData=await appointmentModel.find({userId:userId,status:APP_CONSTANTS.appointmentStatus.confirmed}).populate('userId').populate({path:'expertId', populate:{path:"userId practiceArea"}}).populate('expertId.userId')
  .limit(parseInt(5));


  let topExpertsList=[],topOnlineExpertsList=[],topOnlinePremiumExpertsList=[];
  

  let i;
  for(i=0;i<5;i++)
  {
    topExpertsList.push(expert[i]);
    topOnlineExpertsList.push(topOnlineExperts[i]);
    topOnlinePremiumExpertsList.push(topOnlinePremiumExperts[i]);
  }
  


  
  universalFunctions.sendSuccess(
    {
      statusCode: 200,
      message: "All top experts ",
      data:{ topExpertsList,topOnlineExpertsList,topOnlinePremiumExpertsList,
        categoryList:categoryData,practiceList:practiceData,
        upcomingAppointmentList:upcomingAppointmentData,
      }
    },
    res
  );


    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },


};


