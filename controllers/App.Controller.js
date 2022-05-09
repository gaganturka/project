const User = require("../models/User");
const borhanUser = require("../models/Borhan_User");
const expertUser = require("../models/Expert_User");
const appointmentModel = require("../models/Appointment");
const expertTimeAvailable = require("../models/ExpertTimeSlot");
const category = require("../models/Categories");
const practiceModel = require("../models/Practice_Area");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
// const Mongoose = require("mongoose");
const jwtFunction = require("../utils/jwtFunction");
// import Mongoose from "mongoose";
// import jwtFunction from '../utils/jwtFunction';

const APP_CONSTANTS = require("../appConstants");
// const User=require("../models/User")
// const User = require("../models/User");
const responseMessages = require("../resources/response.json");
// import responseMessages from "../resources/response.json";
const { Config } = require("../config");

const Boom = require("boom");
const universalFunctions = require("../utils/universalFunctions");
// import universalFunctions from "../utils/universalFunctions";

module.exports = {
  userLoginOtp: async (req, res) => {
    try {
      const schema = Joi.object({
        mobileNo: Joi.string().min(10).max(10).required(),
        deviceType:Joi.string(),
        deviceToken:Joi.string().allow(""),
        firebaseUid:Joi.string(),
      
        // .allow("")
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      const user = await User.findOne({ mobileNo: req.body.mobileNo }).populate('userData.data');
      if (!user) {
        throw Boom.badRequest(responseMessages.USER_NOT_FOUND);
      }
      const newToken=[...user.token,{deviceType:req.body.deviceType,deviceToken:req.body.deviceToken}];
     let finalUser= await User.findByIdAndUpdate({_id:user._id},{token:newToken,mobileFirebaseUid:req.body.firebaseUid})
     let updatedUser=await User.findOne({_id:finalUser._id}).populate('userData.data')
      const token = await jwtFunction.jwtGeneratorApp(user._id,req.body.deviceType,req.body.deviceToken);
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: responseMessages.SUCCESS,
          data: {token,
            user:updatedUser}
        },
        res
      );
    } catch (error) {
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
        deviceType:Joi.string(),
        deviceToken:Joi.string().allow(""),
        firebaseUid:Joi.string(),
      
        // .allow("")
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      // const result=await schema.validateAsync(req.body);
      // console.log(req.body, "hello", req.file);
      let success = false;

      // checks whether the mobileno has already been created

      let user = await User.findOne({ mobileNo: req.body.mobileNo });
      // console.log(user,APP_CONSTANTS.role.borhanuser,us)
      if (user !== null) {
        if (user.role === APP_CONSTANTS.role.borhanuser) {
        throw Boom.badRequest(responseMessages.USER_EXISTS);
        } else {
         
          let borhanuser = await borhanUser.create({
            isSubscribed: false,
            balance: 0,
            userId: user._id,
          });
          let newToken=[...user.token,{deviceType:req.body.deviceType,deviceToken:req.body.deviceToken}]
         let finalUser= await User.findByIdAndUpdate({_id:user._id},{token:newToken,mobileFirebaseUid:req.body.firebaseUid}).populate('userData.data');
         const token=await jwtFunction.jwtGeneratorApp(user._id,req.body.deviceType,req.body.deviceToken);
          universalFunctions.sendSuccess(
            {
              statusCode: 200,
              message: "User created",
              data: {token:token,
                user:finalUser
              },
            },
            res
          );
        }
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
        token:[{deviceType:req.body.deviceType,deviceToken:req.body.deviceToken}],
        mobileFirebaseUid:req.body.firebaseUid

      });
      await borhanUser.findByIdAndUpdate(borhanuser._id, { userId: user._id });
      // const finalUser=await User.findOne({_id:user._id})
      // let newToken=[...user.token,]
      // let finalUser= await User.findByIdAndUpdate({_id:user._id},{token:newToken,mobileFirebaseUid:firebaseUid}).populate('userData.data');
      
      console.log(user);
      // console.log(res.json, "jwttoken");
let finalUser=await User.findOne({_id:user._id}).populate('userData.data')
      // const token = jwt.sign(
      //   { user_id: user._id, email: user.email, mobileNo: user.mobileNo },
      //   Config.jwtsecret
      // );
      const token = await jwtFunction.jwtGeneratorApp(user._id
        ,req.body.deviceType,req.body.deviceToken
        );

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: responseMessages.USER_CREATED,
          data: {token,
            user:finalUser}
        },
        res
        );
    } 
    catch (error) {
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
      let userId = req.user.id;

      let upcomingAppointmentData = await appointmentModel
        .find({
          userId: userId,
          status: APP_CONSTANTS.appointmentStatus.confirmed,
        })
        .populate("userId")
        .populate({
          path: "expertId",
          populate: { path: "userId practiceArea" },
        })
        .populate("expertId.userId")
        .limit(parseInt(5));

      let topExpertsList = [],
        topOnlineExpertsList = [],
        topOnlinePremiumExpertsList = [];

      let i;
      for (i = 0; i < 5; i++) {
        topExpertsList.push(expert[i]);
        topOnlineExpertsList.push(topOnlineExperts[i]);
        topOnlinePremiumExpertsList.push(topOnlinePremiumExperts[i]);
      }

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "All top experts ",
          data: {
            topExpertsList,
            topOnlineExpertsList,
            topOnlinePremiumExpertsList,
            categoryList: categoryData,
            practiceList: practiceData,
            upcomingAppointmentList: upcomingAppointmentData,
          },
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  getUserDetails: async (req, res) => {
    try {
      let id = req.user.id;
      const userData = await User.findOne({ _id: id });
      if (!userData) {
        throw Boom.badRequest(responseMessages.USER_NOT_FOUND);
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: responseMessages.SUCCESS,
          data: userData,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  getAllUpcomingAppointments: async (req, res) => {
    try {
      let userId = req.user.id;

      let upcomingAppointmentData = await appointmentModel
        .find({
          userId: userId,
          status: APP_CONSTANTS.appointmentStatus.confirmed,
        })
        .populate("userId")
        .populate({
          path: "expertId",
          populate: { path: "userId practiceArea" },
        });

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "All top experts ",
          data: {
            upcomingAppointmentList: upcomingAppointmentData,
          },
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  getAllExpertData: async (req, res) => {
    try {
      let allExportData = await expertUser
        .find({ isApprovedByAdmin: true })
        .populate("practiceArea")
        .populate("category")
        .populate("userId")
        .sort({ "rating.avgRating": -1 });

      if (!allExportData) {
        throw Boom.badRequest(responseMessages.DATA_NOT_FOUND);
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: responseMessages.SUCCESS,
          data: allExportData,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  getActiveExportData: async (req, res) => {
    try {
      let activeExportData = await expertUser
        .find({
          isApprovedByAdmin: true,
          // isSubscribed: true,
          status: APP_CONSTANTS.activityStatus.active,
        })
        .populate("practiceArea")
        .populate("category")
        .populate("userId")
        .sort({ "rating.avgRating": -1 });
      if (!activeExportData) {
        throw Boom.badRequest(responseMessages.DATA_NOT_FOUND);
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: responseMessages.SUCCESS,
          data: activeExportData,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },

  logoutUser:async(req,res)=>{
try{ 
    const token = req.headers["x-access-token"] || req.query["x-access-token"] || req.headers["authorization"];
    if (token) {
      const decoded =  jwt.verify(token, Config.jwtsecret);
      let user=await User.findOne({_id:decoded.user_id});
      if(!user)
      {
        throw Boom.badRequest(responseMessages.INVALID_TOKEN);
      }
      let deviceToken=decoded.deviceToken
      // console.log(deviceToken,"deviceToken")
      let newToken=user.token;
      const filteredToken=newToken.filter((obj)=>obj.deviceToken !==deviceToken)
      // console.log(newToken,"tokeneee")
      // console.log(filteredToken,"filteredToken");
      let finalUser=await User.findByIdAndUpdate({_id:user._id},{token:filteredToken})
      let updatedUser=await User.findOne({_id:finalUser._id}).populate('userData.data')
      if(!updatedUser)
      {
        throw Boom.badRequest(responseMessages.INVALID_TOKEN);
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: responseMessages.SUCCESS,
          data: {user:updatedUser},
        },
        res
      );
    }
    else {
      throw Boom.badRequest(responseMessages.TOKEN_NOT_PROVIDED);
    }
} 
catch(error)
{
  universalFunctions.sendError(error,res);
}  
  }
};
