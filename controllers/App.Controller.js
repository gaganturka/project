const User = require("../models/User");
const borhanUser = require("../models/Borhan_User");
const expertUser = require("../models/Expert_User");
const appointmentModel = require("../models/Appointment");
const expertTimeAvailable = require("../models/ExpertTimeSlot");
const category = require("../models/Categories");
const appointment = require("../models/Appointment");
const practiceModel = require("../models/Practice_Area");
const favouriteExport = require("../models/Fav_Expert");
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
const { join, truncate, stubFalse } = require("lodash");
// import universalFunctions from "../utils/universalFunctions";

module.exports = {
  userLoginOtp: async (req, res) => {
    try {
      const schema = Joi.object({
        mobileNo: Joi.string().min(10).max(10).required(),
        deviceType: Joi.string(),
        deviceToken: Joi.string().allow(""),
        firebaseUid: Joi.string(),

        // .allow("")
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      const user = await User.findOne({ mobileNo: req.body.mobileNo }).populate(
        "userData.data"
      );
      if (!user) {
        throw Boom.badRequest(responseMessages.USER_NOT_FOUND);
      }
      const newToken = [
        ...user.token,
        { deviceType: req.body.deviceType, deviceToken: req.body.deviceToken },
      ];
      let finalUser = await User.findByIdAndUpdate(
        { _id: user._id },
        { token: newToken, mobileFirebaseUid: req.body.firebaseUid }
      );
      let updatedUser = await User.findOne({ _id: finalUser._id }).populate(
        "userData.data"
      );
      const token = await jwtFunction.jwtGeneratorApp(
        user._id,
        req.body.deviceType,
        req.body.deviceToken
      );
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: responseMessages.SUCCESS,
          data: { token, user: updatedUser },
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
        deviceType: Joi.string(),
        deviceToken: Joi.string().allow(""),
        firebaseUid: Joi.string(),

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
          let newToken = [
            ...user.token,
            {
              deviceType: req.body.deviceType,
              deviceToken: req.body.deviceToken,
            },
          ];
          let finalUser = await User.findByIdAndUpdate(
            { _id: user._id },
            { token: newToken, mobileFirebaseUid: req.body.firebaseUid }
          ).populate("userData.data");
          const token = await jwtFunction.jwtGeneratorApp(
            user._id,
            req.body.deviceType,
            req.body.deviceToken
          );
          universalFunctions.sendSuccess(
            {
              statusCode: 200,
              message: "User created",
              data: { token: token, user: finalUser },
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
        token: [
          {
            deviceType: req.body.deviceType,
            deviceToken: req.body.deviceToken,
          },
        ],
        mobileFirebaseUid: req.body.firebaseUid,
      });
      await borhanUser.findByIdAndUpdate(borhanuser._id, { userId: user._id });
      // const finalUser=await User.findOne({_id:user._id})
      // let newToken=[...user.token,]
      // let finalUser= await User.findByIdAndUpdate({_id:user._id},{token:newToken,mobileFirebaseUid:firebaseUid}).populate('userData.data');

      console.log(user);
      // console.log(res.json, "jwttoken");
      let finalUser = await User.findOne({ _id: user._id }).populate(
        "userData.data"
      );
      // const token = jwt.sign(
      //   { user_id: user._id, email: user.email, mobileNo: user.mobileNo },
      //   Config.jwtsecret
      // );
      const token = await jwtFunction.jwtGeneratorApp(
        user._id,
        req.body.deviceType,
        req.body.deviceToken
      );

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: responseMessages.USER_CREATED,
          data: { token, user: finalUser },
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
     let id=req
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
      let expertData = JSON.parse(JSON.stringify(expert));

      expertData.map((ele) => {
        delete ele.__v;
        delete ele.category.__v;
        delete ele.userId.isEmailVerified;
        delete ele.userId.password;
        delete ele.userId.__v;
        delete ele.userId.userData;
      });
      let topOnlineExperts = await expertUser
        .find({
          isApprovedByAdmin: true,
          status: APP_CONSTANTS.activityStatus.active,
        })
        .populate("practiceArea")
        .populate("category")
        .populate("userId")
        .sort({ "rating.avgRating": -1 });

      if (!topOnlineExperts) {
        throw Boom.badRequest("cannot find any online expert");
      }
      let topOnlineExpertsData = JSON.parse(JSON.stringify(topOnlineExperts));
      topOnlineExpertsData.map((ele) => {
        delete ele.__v;
        delete ele.category.__v;
        delete ele.userId.isEmailVerified;
        delete ele.userId.password;
        delete ele.userId.__v;
        delete ele.userId.userData;
      });
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
      let topOnlinePremiumExpertsData = JSON.parse(
        JSON.stringify(topOnlinePremiumExperts)
      );
      topOnlinePremiumExpertsData.map((ele) => {
        delete ele.__v;
        delete ele.category.__v;
        delete ele.userId.isEmailVerified;
        delete ele.userId.password;
        delete ele.userId.__v;
        delete ele.userId.userData;
      });

      let categoryData = await category.find();
      if (!categoryData) {
        throw Boom.badRequest(responseMessages.CATEGORY_NOT_FOUND);
      }
      let practiceData = await practiceModel.find();
      if (!practiceData) {
        throw Boom.badRequest(responseMessages.CATEGORY_NOT_FOUND);
      }
      let userId = req.user.id;

      let upcomingAppointmentDatas = await appointmentModel
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
      if (!upcomingAppointmentDatas) {
        throw Boom.badRequest(responseMessages.APPOINTMENT_DATA_NOT_FOUND);
      }
      let upcomingAppointmentData = JSON.parse(
        JSON.stringify(upcomingAppointmentDatas)
      );
      upcomingAppointmentData.map((ele) => {
        delete ele.__v;
        if (ele && ele.userId) {
          delete ele.userId.isEmailVerified;
          delete ele.userId.password;
          delete ele.userId.__v;
          delete ele.userId.userData;
        }
        if (ele && ele.expertId && ele.expertId.userId) {
          delete ele.expertId.userId.isEmailVerified;
          delete ele.expertId.userId.password;
          delete ele.expertId.userId.__v;
          delete ele.expertId.userId.userData;
        }
      });
      let topExpertsList = [],
        topOnlineExpertsList = [],
        topOnlinePremiumExpertsList = [];

      let i;
      for (i = 0; i < 5; i++) {
        topExpertsList.push(expertData[i]);
        topOnlineExpertsList.push(topOnlineExpertsData[i]);
        topOnlinePremiumExpertsList.push(topOnlinePremiumExpertsData[i]);
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
        limit: Joi.number(),
        page: Joi.number(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let userId = req.user.id;

      let page = req.body.page;
      let limit = req.body.limit;

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
        .skip(parseInt((page - 1) * limit))
        .limit(parseInt(limit));
      if (!upcomingAppointmentData) {
        throw Boom.badRequest("Appointment Data Not Found");
      }
      let getAllUpcomingAppointmentData = JSON.parse(
        JSON.stringify(upcomingAppointmentData)
      );
      getAllUpcomingAppointmentData.map((ele) => {
        delete ele.__v;
        if (ele && ele.userId) {
          delete ele.userId.isEmailVerified;
          delete ele.userId.password;
          delete ele.userId.__v;
          delete ele.userId.userData;
        }
        if (ele && ele.expertId && ele.expertId.userId) {
          delete ele.expertId.userId.isEmailVerified;
          delete ele.expertId.userId.password;
          delete ele.expertId.userId.__v;
          delete ele.expertId.userId.userData;
        }
      });

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "All top experts ",
          data: {
            list: getAllUpcomingAppointmentData,
            currentPage: page,
            total: await appointmentModel
              .find({
                userId: userId,
                status: APP_CONSTANTS.appointmentStatus.confirmed,
              })
              .countDocuments(),
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
      let id = req.user.id;
      let payload={
          path: "expertlisting",
           match:{
           userId: id
          },
       }
    
      const schema = Joi.object({
        limit: Joi.number(),
        page: Joi.number(),
        search: Joi.string().allow(""),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);

      let page = req.body.page;
      let limit = req.body.limit;
      let filter = {};
      if (req.body.search) {
        filter["$or"] = [
          { firstName: { $regex: req.body.search, $options: "i" } },
          { lastName: { $regex: req.body.search, $options: "i" } },
        ];
      }
      let allExportData = [],
        total;
      if (req.body.search) {
        let allExportDatas = await expertUser
          .find({ isApprovedByAdmin: true })
          .populate("practiceArea")
          .populate("category")
          .populate({ path: "userId", match: filter })
          .populate(payload)
          .sort({ "rating.avgRating": -1 })
          .skip(parseInt((page - 1) * limit))
          .limit(parseInt(limit));
        if (!allExportDatas) {
          throw Boom.badRequest(responseMessages.DATA_NOT_FOUND);
        }
        allExportDatas.map((ele) => {
          if (ele.userId != null) {
            allExportData.push(ele);
          }
        });
        total = allExportData.length;
      } else {
        allExportData = await expertUser
          .find({ isApprovedByAdmin: true })
          .populate("practiceArea")
          .populate("category")
          .populate("userId")
          .populate(payload)
          .sort({ "rating.avgRating": -1 })
          .skip(parseInt((page - 1) * limit))
          .limit(parseInt(limit));
        total = await expertUser
          .find({ isApprovedByAdmin: true })
          .countDocuments();
      }
      if (!allExportData) {
        throw Boom.badRequest(responseMessages.DATA_NOT_FOUND);
      }
      let getAllExportData = JSON.parse(JSON.stringify(allExportData));

      getAllExportData.map((ele) => {
        delete ele.__v;
        // delete ele.category.__v;
        delete ele.userId.isEmailVerified;
        delete ele.userId.password;
        delete ele.userId.__v;
        delete ele.userId.userData;
        if(ele.expertlisting.length>0&&ele.expertlisting){
          ele.isFavorite=true;
          delete ele.expertlisting;
        }else{
          ele.isFavorite=false;
          delete ele.expertlisting;
        }
      });
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: responseMessages.SUCCESS,
          data: {
            list: getAllExportData,
            currentPage: page,
            total: total,
          },
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  getActiveExportData: async (req, res) => {
    try {
      
      let id = req.user.id;
      let payload={
          path: "expertlisting",
           match:{
           userId: id
          },
       }
    

      const schema = Joi.object({
        limit: Joi.number(),
        page: Joi.number(),
        search: Joi.string().allow(""),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);

      let filter = {};
      if (req.body.search) {
        filter["$or"] = [
          { firstName: { $regex: req.body.search, $options: "i" } },
          { lastName: { $regex: req.body.search, $options: "i" } },
        ];
      }
      let page = req.body.page;
      let limit = req.body.limit;
      let activeExportData = [];
      let total = {};
      if (req.body.search) {
        let activeExportDatas = await expertUser
          .find({
            isApprovedByAdmin: true,
            status: APP_CONSTANTS.activityStatus.active,
          })
          .populate("practiceArea")
          .populate("category")
          .populate({ path: "userId", match: filter })
          .populate(payload)
          .sort({ "rating.avgRating": -1 })
          .skip(parseInt((page - 1) * limit))
          .limit(parseInt(limit));
        if (!activeExportDatas) {
          throw Boom.badRequest(responseMessages.DATA_NOT_FOUND);
        }
        activeExportDatas.map((ele) => {
          if (ele.userId != null) {
            activeExportData.push(ele);
          }
        });
        total = activeExportData.length;
      } else {
        activeExportData = await expertUser
          .find({
            isApprovedByAdmin: true,
            // isSubscribed: true,
            status: APP_CONSTANTS.activityStatus.active,
          })
          .populate("practiceArea")
          .populate("category")
          .populate("userId")
          .populate(payload)
          .sort({ "rating.avgRating": -1 })
          .skip(parseInt((page - 1) * limit))
          .limit(parseInt(limit));
        total = await expertUser
          .find({
            isApprovedByAdmin: true,
            status: APP_CONSTANTS.activityStatus.active,
          })
          .countDocuments();
      }

      if (!activeExportData) {
        throw Boom.badRequest(responseMessages.DATA_NOT_FOUND);
      }
      let getActiveExportData = JSON.parse(JSON.stringify(activeExportData));

      getActiveExportData.map((ele) => {
        delete ele.__v;
        delete ele.category.__v;
        delete ele.userId.isEmailVerified;
        delete ele.userId.password;
        delete ele.userId.__v;
        delete ele.userId.userData;
        if(ele.expertlisting.length>0&&ele.expertlisting)
        ele.isFavorite=true;
        else{
          ele.isFavorite=false;
        }
        delete ele.expertlisting;
      });

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: responseMessages.SUCCESS,
          data: {
            list: getActiveExportData,
            currentPage: page,
            total: total,
          },
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  getAllOnlinePremiumExpertsData: async (req, res) => {
    try {
      let id = req.user.id;
      let payload={
          path: "expertlisting", match:{
           userId: id
          },
       }
    
      const schema = Joi.object({
        limit: Joi.number(),
        page: Joi.number(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);

      let page = req.body.page;
      let limit = req.body.limit;
      let activeExportData = await expertUser
        .find({
          isApprovedByAdmin: true,
          isSubscribed: true,
          status: APP_CONSTANTS.activityStatus.active,
        })
        .populate("practiceArea")
        .populate("category")
        .populate("userId")
        .populate(payload)
        .sort({ "rating.avgRating": -1 })
        .skip(parseInt((page - 1) * limit))
        .limit(parseInt(limit));
      if (!activeExportData) {
        throw Boom.badRequest(responseMessages.DATA_NOT_FOUND);
      }
      let getActiveExportData = JSON.parse(JSON.stringify(activeExportData));
      getActiveExportData.map((ele) => {
        delete ele.__v;
        // delete ele.category.__v;
        if (ele && ele.userId && ele.userId != null) {
          delete ele.userId.isEmailVerified;
          delete ele.userId.password;
          delete ele.userId.__v;
          delete ele.userId.userData;
        }
        if(ele.expertlisting.length>0&&ele.expertlisting){
          ele.isFavorite=true;
          delete ele.expertlisting;
        }else{
          ele.isFavorite=false;
          delete ele.expertlisting;
        }
      });
     
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: responseMessages.SUCCESS,
          data: {
            list: getActiveExportData,
            currentPage: req.body.page,
            total: await expertUser
              .find({
                isApprovedByAdmin: true,
                isSubscribed: true,
                status: APP_CONSTANTS.activityStatus.active,
              })
              .countDocuments(),
          },
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  logoutUser: async (req, res) => {
    try {
      const token =
        req.headers["x-access-token"] ||
        req.query["x-access-token"] ||
        req.headers["authorization"];
      if (token) {
        const decoded = jwt.verify(token, Config.jwtsecret);
        let user = await User.findOne({ _id: decoded.user_id });
        if (!user) {
          throw Boom.badRequest(responseMessages.INVALID_TOKEN);
        }
        let deviceToken = decoded.deviceToken;
        // console.log(deviceToken,"deviceToken")
        let newToken = user.token;
        const filteredToken = newToken.filter(
          (obj) => obj.deviceToken !== deviceToken
        );
        // console.log(newToken,"tokeneee")
        // console.log(filteredToken,"filteredToken");
        let finalUser = await User.findByIdAndUpdate(
          { _id: user._id },
          { token: filteredToken }
        );
        let updatedUser = await User.findOne({ _id: finalUser._id }).populate(
          "userData.data"
        );
        if (!updatedUser) {
          throw Boom.badRequest(responseMessages.INVALID_TOKEN);
        }
        universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: responseMessages.SUCCESS,
            data: { user: updatedUser },
          },
          res
        );
      } else {
        throw Boom.badRequest(responseMessages.TOKEN_NOT_PROVIDED);
      }
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },

  getFilteredExperts: async (req, res) => {
    try {
      let id = req.user.id;
      let payload={
          path: "expertlisting",
           match:{
           userId: id
          },
       }
    
      const schema = Joi.object({
        category: Joi.string().allow(""),
        practiceArea: Joi.string().allow(""),
        limit: Joi.number(),
        page: Joi.number(),
        search: Joi.string().allow(""),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);

      let aggregationQuery;
      let filter = {};
      if (req.body.search) {
        filter["$or"] = [
          { firstName: { $regex: req.body.search, $options: "i" } },
          { lastName: { $regex: req.body.search, $options: "i" } },
        ];
      }
      let expert = [],
        total;
      if (req.body.category !== "" && req.body.practiceArea === "") {

        expert = await expertUser
          .find({
            category: req.body.category,
            isApprovedByAdmin: true,
          })
          .populate("practiceArea")
          .populate("category")
          .populate("userId")
          .populate(payload)
          .sort({ "rating.avgRating": -1 })
          .skip(parseInt((req.body.page - 1) * req.body.limit))
          .limit(parseInt(req.body.limit));
        total = await expertUser
          .find({ category: req.body.category, isApprovedByAdmin: true })
          .countDocuments();
      } else if (req.body.category === "" && req.body.practiceArea !== "") {
     
        expert = await expertUser
          .find({
            practiceArea: req.body.practiceArea,
            isApprovedByAdmin: true,
          })
          .populate("practiceArea")
          .populate("category")
          .populate("userId")
          .populate(payload)
          .sort({ "rating.avgRating": -1 })
          .skip(parseInt((req.body.page - 1) * req.body.limit))
          .limit(parseInt(req.body.limit));

        total = await expertUser
          .find({
            practiceArea: req.body.practiceArea,
            isApprovedByAdmin: true,
          })
          .countDocuments();
      } else if (req.body.category !== "" && req.body.practiceArea !== "") {
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
          .populate(payload)
          .sort({ "rating.avgRating": -1 })
          .skip(parseInt((req.body.page - 1) * req.body.limit))
          .limit(parseInt(req.body.limit));
        total = await expertUser
          .find({
            category: req.body.category,
            practiceArea: req.body.practiceArea,
            isApprovedByAdmin: true,
          })
          .countDocuments();
      } else if (req.body.search) {
        let expertData = await expertUser
          .find({
            isApprovedByAdmin: true,
          })
          .populate("practiceArea")
          .populate("category")
          .populate(payload)
          .populate({
            path: "userId",
            match: filter,
          })
          .sort({ "rating.avgRating": -1 })
          .skip(parseInt((req.body.page - 1) * req.body.limit))
          .limit(parseInt(req.body.limit));

        if (!expertData) {
          throw Boom.badRequest("cannot find any expert");
        }
        expertData.map((ele) => {
          if (ele.userId != null) {
            expert.push(ele);
          }
        });
        total = expert.length;
      } else {
        expert = await expertUser
          .find({
            isApprovedByAdmin: true,
            
          })
          .populate("practiceArea")
          .populate("category")
          .populate("userId")
          .populate(payload)
          .sort({ "rating.avgRating": -1 })
          .skip(parseInt((req.body.page - 1) * req.body.limit))
          .limit(parseInt(req.body.limit));
        total = await expertUser
          .find({ isApprovedByAdmin: true })
          .countDocuments();
      }

      if (!expert) {
        throw Boom.badRequest("cannot find any expert");
      }
      let expertData = JSON.parse(JSON.stringify(expert));


      expertData.map((ele) => {
        if (ele && ele.userId && ele.userId != null) {
          delete ele.__v;
          delete ele.category.__v;
          delete ele.userId.isEmailVerified;
          delete ele.userId.password;
          delete ele.userId.__v;
          delete ele.userId.userData;
        }
        if(ele.expertlisting.length>0&&ele.expertlisting){
          ele.isFavorite=true;
          delete ele.expertlisting;
        }else{
          ele.isFavorite=false;
          delete ele.expertlisting;
        }
      });

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "All experts online and filtered are",
          data: {
            list: expertData,
            currentPage: req.body.page,
            total: total,
          },
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  updateProfileUser: async (req, res) => {
    try {
      console.log("sssssss");
      const schema = Joi.object({
        firstName: Joi.string().alphanum().min(2).max(30).required(),
        lastName: Joi.string().alphanum().min(2).max(30).required(),
        email: Joi.string().email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        }),
        mobileNo: Joi.string().min(10).max(10).required(),
        profilePic: Joi.string().allow(""),
        // firebaseUid:Joi.string(),
        // otp: Joi.string(),
        // .allow("")
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let payload = req.body;
      console.log(payload, "payload");
      let userId = req.user.id;
      console.log("userId", userId);
      let user = await User.findByIdAndUpdate(
        { _id: userId },
        { ...payload },
        { new: true }
      );
      console.log(user, "updatedUser");
      if (!user) {
        throw Boom.badRequest(responseMessages.USER_NOT_FOUND);
      }

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "updated User",
          data: {
            user,
          },
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  getAppointmentDetails: async (req, res) => {
    try {
      let userId = req.user.id;
      const schema = Joi.object({
        limit: Joi.number(),
        page: Joi.number(),
        status: Joi.string().allow(""),
      });
      await universalFunctions.validateRequestPayload(req.query, res, schema);
      let appointmentData = {}
      if (req.body.status) {
        appointmentData = await appointment
          .find({
            userId: userId,
            status: req.body.status,
          })
          .populate({
            path: "userId",
            select: "firstName lastName profilePic role",
          })
          .populate({
            path: "expertId",
            populate: { path: "userId practiceArea" },
          })
          .skip(parseInt((req.body.page - 1) * req.body.limit))
          .limit(parseInt(req.body.limit));
      } else {
        appointmentData = await appointment
          .find({
            status: {
              $nin: [APP_CONSTANTS.appointmentStatus.cancelled],
            },
            userId: userId,
          })
          .populate({
            path: "userId",
            select: "firstName lastName profilePic role",
          })
          .populate({
            path: "expertId",
            populate: { path: "userId practiceArea" },
          })
          .skip(parseInt((req.body.page - 1) * req.body.limit))
          .limit(parseInt(req.body.limit));
      }

      if (!appointmentData) {
        universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "Appointment Data Not Found",
            data: [],
          },
          res
        );
      }
      let appointmentAllData = JSON.parse(JSON.stringify(appointmentData));
      // console.log("this is all data ", appointmentAllData);
      appointmentAllData.map((ele) => {
        if (ele && ele.expertId && ele.expertId.userId) {
          delete ele.__v;
          delete ele.expertId.__v;
          delete ele.expertId.userId.userData;
          delete ele.expertId.userId.isEmailVerified;
          delete ele.expertId.userId.password;
          delete ele.expertId.userId.mobileFirebaseUid;
          delete ele.expertId.userId.token;
          delete ele.expertId.userId.__v;
          // delete ele.exportId.availableForVideo;
          // delete ele.expertId.bankName;
          // delete ele.exportId.bankAccountNo;
          // delete ele.expertId.noOfHoursSessionDone;
          // delete ele.expertId.noOfViews;
          // delete ele.exportId.userId.mobileNo;
          // delete ele.exportId &&
          //   ele.expertId.userId &&
          //   ele.expertId.userId.email;
          // delete ele.exportId.userId.role;
          // delete ele.userId.userData;
        }
      });

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Success",
          data: appointmentAllData,
        },
        res
      );
    } catch (error) {
      return universalFunctions.sendError(error, res);
    }
  },
  appointmentCancel: async (req, res) => {
    try {
      let appointmentCancelData = await appointment.findByIdAndUpdate(
        req.body.id,
        { status: APP_CONSTANTS.appointmentStatus.cancelled }
      );
      if (!appointmentCancelData) {
        throw Boom.badRequest("cannot find any appointment to cancel");
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Appointment Cancelled",
        },
        res
      );
    } catch (error) {
      return universalFunctions.sendError(error, res);
    }
  },
  rescheduleAppointment: async (req, res) => {
    try {
      const schema = Joi.object({
        timeSlotId: Joi.string().length(24).required(),
        expertId: Joi.string().length(24).required(),
        appointmentType: Joi.string().allow(""),
        duration: Joi.string().allow(""),
        appointmentDate: Joi.date().required(),
        endAppointmentTime: Joi.date().required(),
        startAppointmentTime: Joi.date().required(),
        appointmentTime: Joi.string().allow(""),
        appointDateandTime: Joi.date().required(),
        status: Joi.string().allow(""),
        practiceArea: Joi.string().length(24).required(),
      });
      let {
        id,
        appointDateandTime,
        appointmentDate,
        appointmentTime,
        appointmentType,
        duration,
        endAppointmentTime,
        practiceArea,
        startAppointmentTime,
        timeSlotId,
        status,
      } = req.body;
      let rescheduledAppointment = await appointment.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            appointDateandTime: appointDateandTime,
            appointmentDate: appointmentDate,
            appointmentTime: appointmentTime,
            appointmentType: appointmentType,
            duration: duration,
            endAppointmentTime: endAppointmentTime,
            practiceArea: practiceArea,
            startAppointmentTime: startAppointmentTime,
            timeSlotId: timeSlotId,
            status: status,
            isRescheduled: true,
          },
        }
      );
      // console.log("this is update data", rescheduledAppointment);
      if (!rescheduledAppointment) {
        throw Boom.badRequest("cannot find any appointment to reschedule");
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Success",
        },
        res
      );
    } catch (error) {
      return universalFunctions.sendError(error, res);
    }
  },
  createFavouriteExpert: async (req, res) => {
    try {
      let userId = req.user.id;
      let {expertId,favourite } = req.body;
      let payload = {
        userId,
        expertId,
      };
      if (favourite===APP_CONSTANTS.checkfavExpert) {
        await favouriteExport.create(payload);
        universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Expert Added To Favourite",
        },
        res
      );
      }
      else
      {
       let removeFavouriteExpert= await favouriteExport.deleteOne(payload)
        if (!removeFavouriteExpert)
        {
          throw Boom.badRequest("Expert Is Not Found"); 
        }
        universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Expert Remove To Favourite",
        },
        res
      );
      }
     
    } catch (error) {
      return universalFunctions.sendError(error, res);
    }
  },
  getFavouriteExpert: async (req, res) => {
    try {
      let favouriteExportData = await favouriteExport
        .find()
        .populate({ path: "userId", select: "firstName lastName profilePic" })
        // .populate({
        //   path: "borhanUserId",
        //   populate: {
        //     path: "userId",
        //     select: "firstName lastName profilePic",
        //   },
        // })
        // .populate("expertUserId")
        .populate({
          path: "expertId",
          select: "firstName lastName profilePic",
        });
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Success",
          data: favouriteExportData,
        },
        res
      );
    } catch (error) {
      return universalFunctions.sendError(error, res);
    }
  },
};
