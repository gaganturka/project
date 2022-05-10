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
const { join } = require("lodash");
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
      const schema = Joi.object({
        limit:Joi.number(),
        page:Joi.number(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let userId = req.user.id;
   
      let page=req.body.page;
      let limit=req.body.limit;

      let upcomingAppointmentData = await appointmentModel
        .find({
          userId: userId,
          status: APP_CONSTANTS.appointmentStatus.confirmed,
        })
        .populate("userId")
        .populate({
          path: "expertId",
          populate: { path: "userId practiceArea" },
        }).skip(parseInt((page - 1) * limit))
        .limit(parseInt(limit));;

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "All top experts ",
          data: {
            list: upcomingAppointmentData,
            currentPage:page,
            total:await appointmentModel
            .find({
              userId: userId,
              status: APP_CONSTANTS.appointmentStatus.confirmed,
            }).countDocuments()
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
      const schema = Joi.object({
        limit:Joi.number(),
        page:Joi.number(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);

      let page=req.body.page;
      let limit=req.body.limit;

      let allExportData = await expertUser
        .find({ isApprovedByAdmin: true })
        .populate("practiceArea")
        .populate("category")
        .populate("userId")
        .sort({ "rating.avgRating": -1 })
        .skip(parseInt((page - 1) * limit))
        .limit(parseInt(limit));
//         let total=await expertUser.find({isApprovedByAdmin : true}).countDocuments();
// console.log(total,"total galat kyu aara",total);
      if (!allExportData) {
        throw Boom.badRequest(responseMessages.DATA_NOT_FOUND);
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: responseMessages.SUCCESS,
          data: {list:allExportData,currentPage:page,total:await expertUser.find({ isApprovedByAdmin : true}).countDocuments()}
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  getActiveExportData: async (req, res) => {
    try {
      const schema = Joi.object({
        limit:Joi.number(),
        page:Joi.number(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);

      let page=req.body.page;
      let limit=req.body.limit;
      let activeExportData = await expertUser
        .find({
          isApprovedByAdmin: true,
          // isSubscribed: true,
          status: APP_CONSTANTS.activityStatus.active,
        })
        .populate("practiceArea")
        .populate("category")
        .populate("userId")
          .sort({ "rating.avgRating": -1 }).skip(parseInt((page - 1) * limit))
          .limit(parseInt(limit));
        if (!activeExportData) {
        throw Boom.badRequest(responseMessages.DATA_NOT_FOUND);
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: responseMessages.SUCCESS,
          data: {list:activeExportData,currentPage:page,total:await expertUser.find({isApprovedByAdmin:true,status:APP_CONSTANTS.activityStatus.active}).countDocuments()}
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  getAllOnlinePremiumExpertsData: async (req, res) => {
    try {
      const schema = Joi.object({
        limit:Joi.number(),
        page:Joi.number(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);

      let page=req.body.page;
      let limit=req.body.limit;
      let activeExportData = await expertUser
        .find({
          isApprovedByAdmin: true,
          isSubscribed: true,
          status: APP_CONSTANTS.activityStatus.active,
        })
        .populate("practiceArea")
        .populate("category")
        .populate("userId")
        .sort({ "rating.avgRating": -1 })
        .skip(parseInt((page - 1) * limit))
        .limit(parseInt(limit));
      if (!activeExportData) {
        throw Boom.badRequest(responseMessages.DATA_NOT_FOUND);
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: responseMessages.SUCCESS,
          data: {list:activeExportData,currentPage:req.body.page,total:await expertUser.find({isApprovedByAdmin:true,isSubscribed:true,status:APP_CONSTANTS.activityStatus.active}).countDocuments()},
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
  },


  getFilteredExperts: async (req, res) => {
    try {
      const schema = Joi.object({
        category: Joi.string().allow(""),
        practiceArea: Joi.string().allow(""),
        limit:Joi.number(),
        page:Joi.number(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);

      //   let page = req.body.page;
      //   let limit = req.body.limit;
      //   let filter = {
      //     isApprovedByAdmin: true,
      //   };
      //   // console.log("searchhhhi", req.body.search, "search mai kya hai");
      //   if (req.body.search) {
      //     filter["$or"] = [
      //       { "userId.firstName": { $regex: req.body.search, $options: "i" } },
      //       {
      //         "userId.email": { $regex: req.body.search, $options: "i" },
      //       },
      //     ];
      //   }

      //   const expert = await expertUser
      //     .find({ isApprovedByAdmin: true, status:APP_CONSTANTS.activityStatus.active })
      //     .populate("userId")
      //     .populate("practiceArea")
      //     .populate("category")
      //     .skip(parseInt((req.body.page - 1) * req.body.limit))
      // .limit(parseInt(req.body.limit));
      let aggregationQuery;
      let expert,total;
        if (req.body.category !== "" && req.body.practiceArea === "") {
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          expert = await expertUser
            .find({
              category: req.body.category,
              isApprovedByAdmin: true,
              // status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("practiceArea")
            .populate("category")
            .populate("userId")
            .sort({ "rating.avgRating": -1 })
            .skip(parseInt((req.body.page - 1) * req.body.limit))
        .limit(parseInt(req.body.limit));
        total=await expertUser.find({category:req.body.category,isApprovedByAdmin:true}).countDocuments();
        } else if (req.body.category === "" && req.body.practiceArea !== "") {
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          expert = await expertUser
            .find({
              practiceArea: req.body.practiceArea,
              isApprovedByAdmin: true,
              // status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("practiceArea")
            .populate("category")
            .populate("userId")
            .sort({ "rating.avgRating": -1 })
            .skip(parseInt((req.body.page - 1) * req.body.limit))
        .limit(parseInt(req.body.limit));

        total=await expertUser.find({practiceArea:req.body.practiceArea,isApprovedByAdmin:true}).countDocuments();

        } else if (req.body.category !== "" && req.body.practiceArea !== "") {
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          expert = await expertUser
            .find({
              practiceArea: req.body.practiceArea,
              category: req.body.category,
              isApprovedByAdmin: true,
              // status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("practiceArea")
            .populate("category")
            .populate("userId")
            .sort({ "rating.avgRating": -1 })
            .skip(parseInt((req.body.page - 1) * req.body.limit))
        .limit(parseInt(req.body.limit));
        total=await expertUser.find({category:req.body.category,practiceArea:req.body.practiceArea,isApprovedByAdmin:true}).countDocuments();

        } else {
          expert = await expertUser
            .find({
              isApprovedByAdmin: true,
              // status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("practiceArea")
            .populate("category")
            .populate("userId")
            .sort({ "rating.avgRating": -1 })
            .skip(parseInt((req.body.page - 1) * req.body.limit))
        .limit(parseInt(req.body.limit));
        total=await expertUser.find({isApprovedByAdmin:true}).countDocuments();

        }
     

      if (!expert) {
        throw Boom.badRequest("cannot find any expert");
      }
      console.log(
        "expert online filtered are",
        expert,
        "expert online filtered"
      );
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "All experts online and filtered are",
          data: {
            list: expert,
            currentPage:req.body.page,
            total:total
          },
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  updateProfileUser:async (req,res)=>{
    try{
    console.log("sssssss")
  const schema = Joi.object({
    firstName: Joi.string().alphanum().min(2).max(30).required(),
    lastName: Joi.string().alphanum().min(2).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    mobileNo: Joi.string().min(10).max(10).required(),
    profilePic: Joi.string().allow(""),
    firebaseUid:Joi.string(),
    // otp: Joi.string(),
    // .allow("")
  });
  await universalFunctions.validateRequestPayload(req.body, res, schema);
  let payload=req.body;
  console.log(payload,"payload")
  let userId=req.user.id;
  console.log('userId',userId);
  let user=await User.findByIdAndUpdate({_id:userId},{...payload}
    , {new:true}
    );
  console.log(user,"updatedUser")
  if(!user){
    throw Boom.badRequest(responseMessages.USER_NOT_FOUND);
  }

  universalFunctions.sendSuccess(
    {
      statusCode: 200,
      message: "updated User",
      data: {
        user
      },
    },
    res
  );
  }
  catch(error)
  {
    universalFunctions.sendError(error,res);
  }

 }
};
