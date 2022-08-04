const User = require("../models/User");
const borhanUser = require("../models/Borhan_User");
const expertUser = require("../models/Expert_User");
const appointmentModel = require("../models/Appointment");
const expertTimeAvailable = require("../models/ExpertTimeSlot");
const category = require("../models/Categories");
const appointment = require("../models/Appointment");
const practiceModel = require("../models/Practice_Area");
const favouriteExport = require("../models/Fav_Expert");
const UserRequest = require("../models/UserRequests");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const Expert_Rating = require("../models/Expert_Rating");
// const moment = require("moment");
var moment = require("moment-timezone");
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
const ChatAppointment = require("../models/ChatAppointment");
const Testimony = require("../models/Testimony");
const { tooManyRequests } = require("boom");
// import universalFunctions from "../utils/universalFunctions";

module.exports = {
  userLoginOtp: async (req, res) => {
    try {
      const schema = Joi.object({
        mobileNo: Joi.string().min(10).required(),
        deviceType: Joi.string(),
        deviceToken: Joi.string().allow(""),
        firebaseUid: Joi.string(),

        // .allow("")
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      const exportUser = await User.findOne({
        mobileNo: req.body.mobileNo,
        role: APP_CONSTANTS.role.expert,
      }).populate("userData.data");
      if (exportUser) {
        return res.status(404).send({
          message: responseMessages.MOBILE_NUMBER_REGISTERD_EXPERT_USER,
        });
        // throw Boom.badRequest(responseMessages.MOBILE_NUMBER_REGISTERD_EXPERT_USER);
      }
      const user = await User.findOne({
        mobileNo: req.body.mobileNo,
        role: APP_CONSTANTS.role.borhanuser,
      }).populate("userData.data");
      if (!user) {
        throw Boom.badRequest(responseMessages.USER_NOT_FOUND);
      }
      const newToken = [
        ...user.token,
        { deviceType: req.body.deviceType, deviceToken: req.body.deviceToken },
      ];
      let finalUser = await User.findByIdAndUpdate(
        { _id: user._id, role: APP_CONSTANTS.role.borhanuser },
        { token: newToken, mobileFirebaseUid: req.body.firebaseUid }
      );
      let updatedUser = await User.findOne({
        _id: finalUser._id,
        role: APP_CONSTANTS.role.borhanuser,
      }).populate("userData.data");
      const token = await jwtFunction.jwtGeneratorApp(
        user._id,
        req.body.deviceType,
        req.body.deviceToken
      );
      console.log("this is login ",updatedUser)
      let userData = JSON.parse(JSON.stringify(updatedUser));
      delete userData.token;
      
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: responseMessages.SUCCESS,
          data: { token, user: userData },
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  createBorhanUser: async (req, res) => {
    try {
      const schema = Joi.object({
        firstName: Joi.string().alphanum().min(2).max(30).required(),
        lastName: Joi.string().alphanum().min(2).max(30).required(),
        email: Joi.string().email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        }),
        mobileNo: Joi.string().min(10).required(),
        profilePic: Joi.string().allow(""),
        deviceType: Joi.string(),
        deviceToken: Joi.string().allow(""),
        firebaseUid: Joi.string(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let success = false;
      let user = await User.findOne({ mobileNo: req.body.mobileNo });
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
      let borhanuser = await borhanUser.create({
        isSubscribed: false,
        balance: 0,
      });

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
      let finalUser = await User.findOne({ _id: user._id }).populate(
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
      let id = req.user.id;
      let payload = {
        path: "expertlisting",
        match: {
          userId: id,
        },
      };

      expert = await expertUser
        .find({
          isApprovedByAdmin: true,
          // isSubscribed: true,
          // status: APP_CONSTANTS.activityStatus.active,
        })
        .populate("practiceArea")
        .populate("category")
        .populate("userId")
        .populate(payload)
        .sort({ "rating.avgRating": -1 });

      let expertData = JSON.parse(JSON.stringify(expert));
      // console.log("this is expertData" , expertData)

      expertData.map((ele) => {
        console.log("ele", ele);
        delete ele.__v;
        delete ele.category.__v;
        // if (
        //   ele &&
        //   ele.userId &&
        //   ele.userId.isEmailVerified &&
        //   ele.userId.password &&
        //   ele.userId.__v &&
        //   ele.userId.userData &&
        //   ele.userId.token
        // ) {
          delete ele.userId.isEmailVerified;
          delete ele.userId.password;
          delete ele.userId.__v;
          delete ele.userId.userData;
          delete ele.userId.token;
        // }
        if (ele.expertlisting.length > 0 && ele.expertlisting != null)
          ele.isFavorite = true;
        else ele.isFavorite = false;

        delete ele.expertlisting;
      });
      let topOnlineExperts = await expertUser
        .find({
          isApprovedByAdmin: true,
          status: APP_CONSTANTS.activityStatus.active,
        })
        .populate("practiceArea")
        .populate("category")
        .populate("userId")
        .populate(payload)
        .sort({ "rating.avgRating": -1 });

      // if (!topOnlineExperts) {
      //   throw Boom.badRequest("cannot find any online expert");
      // }
      let topOnlineExpertsData = JSON.parse(JSON.stringify(topOnlineExperts));
      topOnlineExpertsData.map((ele) => {
        delete ele.__v;
        delete ele.category.__v;
        delete ele.userId.isEmailVerified;
          delete ele.userId.password;
          delete ele.userId.__v;
          delete ele.userId.userData;
          delete ele.userId.token;
        // if (
        //   ele &&
        //   ele.userId &&
        //   ele.userId.isEmailVerified &&
        //   ele.userId.password &&
        //   ele.userId.__v &&
        //   ele.userId.userData
        // ) {
        //   delete ele.userId.isEmailVerified;
        //   delete ele.userId.password;
        //   delete ele.userId.__v;
        //   delete ele.userId.userData;
        //   delete ele.userId.token;
        // }
        if (ele.expertlisting.length > 0 && ele.expertlisting != null)
          ele.isFavorite = true;
        else ele.isFavorite = false;

        delete ele.expertlisting;
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
        .populate(payload)
        .sort({ "rating.avgRating": -1 });
      let topOnlinePremiumExpertsData = JSON.parse(
        JSON.stringify(topOnlinePremiumExperts)
      );
      topOnlinePremiumExpertsData.map((ele) => {
        delete ele.__v;
        delete ele.category.__v;
        if (
          ele &&
          ele.userId &&
          ele.userId.isEmailVerified &&
          ele.userId.password &&
          ele.userId.__v &&
          ele.userId.userData
        ) {
          delete ele.userId.isEmailVerified;
          delete ele.userId.password;
          delete ele.userId.__v;
          delete ele.userId.userData;
          // delete ele.userId.token;
        }
        if (ele.expertlisting.length > 0 && ele.expertlisting != null)
          ele.isFavorite = true;
        else ele.isFavorite = false;

        delete ele.expertlisting;
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
        // throw Boom.badRequest(responseMessages.APPOINTMENT_DATA_NOT_FOUND);
      } else {
        var upcomingAppointmentData = JSON.parse(
          JSON.stringify(upcomingAppointmentDatas)
        );
        console.log("this is upcoming appointmet", upcomingAppointmentData);
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
      }
      let topExpertsList = [],
        topOnlineExpertsList = [],
        topOnlinePremiumExpertsList = [];

      let i;
      if (expertData.length < 5) {
        for (i = 0; i < expertData.length; i++) {
          topExpertsList.push(expertData[i]);
        }
      } else {
        for (i = 0; i < 5; i++) {
          topExpertsList.push(expertData[i]);
        }
      }
      if (topOnlineExpertsData.length < 5) {
        for (i = 0; i < topOnlineExpertsData.length; i++) {
          topOnlineExpertsList.push(topOnlineExpertsData[i]);
        }
      } else {
        for (i = 0; i < 5; i++) {
          topOnlineExpertsList.push(topOnlineExpertsData[i]);
        }
      }
      if (topOnlinePremiumExpertsData.length < 5) {
        for (i = 0; i < topOnlinePremiumExpertsData.length; i++) {
          topOnlinePremiumExpertsList.push(topOnlinePremiumExpertsData[i]);
        }
      } else {
        for (i = 0; i < 5; i++) {
          topOnlinePremiumExpertsList.push(topOnlinePremiumExpertsData[i]);
        }
      }
      let timeZone = req.query.timeZone;

      if (!upcomingAppointmentDatas)
        universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "Desktop page successfully fetched",
            data: {
              topExpertsList,
              topOnlineExpertsList,
              topOnlinePremiumExpertsList,
              categoryList: categoryData,
              practiceList: practiceData,
              upcomingAppointmentList: upcomingAppointmentDatas,
            },
          },
          res
        );
      else
        var startAppointmentTimeLocal,
          appointmentEndLocalTime,
          appointDateandTimeLocal;
      upcomingAppointmentData.map((ele) => {
        let localTime = moment.tz(ele.startAppointmentTime, timeZone);
        startAppointmentTimeLocal = moment(localTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        let endTime = moment.tz(ele.endAppointmentTime, timeZone);
        appointmentEndLocalTime = moment(endTime).format("YYYY-MM-DD HH:mm:ss");
        let dateAndTime = moment.tz(ele.appointDateandTime, timeZone);
        appointDateandTimeLocal = moment(dateAndTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );

        return (
          (ele.startAppointmentTimeLocal = startAppointmentTimeLocal),
          (ele.endAppointmentTimeLocal = appointmentEndLocalTime),
          (ele.appointDateandTimeLocal = appointDateandTimeLocal)
        );
      });
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Desktop page successfully fetched",
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
      const userData = await User.findOne({ _id: id }).populate(
        "userData.data"
      );
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
          delete ele.userId.token;

        }
        if (ele && ele.expertId && ele.expertId.userId) {
          delete ele.expertId.userId.isEmailVerified;
          delete ele.expertId.userId.password;
          delete ele.expertId.userId.__v;
          delete ele.expertId.userId.userData;
          delete ele.expertId.userId.token;
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
      let payload = {
        path: "expertlisting",
        match: {
          userId: id,
        },
      };

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
        if (
          ele &&
          ele.userId &&
          ele.userId.isEmailVerified &&
          ele.userId.password &&
          ele.userId.__v &&
          ele.userId.userData
        ) {
          delete ele.userId.isEmailVerified;
          delete ele.userId.password;
          delete ele.userId.__v;
          delete ele.userId.userData;
        }
        if (ele.expertlisting.length > 0 && ele.expertlisting) {
          ele.isFavorite = true;
          delete ele.expertlisting;
        } else {
          ele.isFavorite = false;
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
      let payload = {
        path: "expertlisting",
        match: {
          userId: id,
        },
      };
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
        if (
          ele &&
          ele.userId &&
          ele.userId.isEmailVerified &&
          ele.userId.password &&
          ele.userId.__v &&
          ele.userId.userData
        ) {
          delete ele.userId.isEmailVerified;
          delete ele.userId.password;
          delete ele.userId.__v;
          delete ele.userId.userData;
        }
        if (ele.expertlisting.length > 0 && ele.expertlisting)
          ele.isFavorite = true;
        else {
          ele.isFavorite = false;
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
      let payload = {
        path: "expertlisting",
        match: {
          userId: id,
        },
      };

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
        if (ele.expertlisting.length > 0 && ele.expertlisting) {
          ele.isFavorite = true;
          delete ele.expertlisting;
        } else {
          ele.isFavorite = false;
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
        console.log("this is logout Token", user);
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
      let payload = {
        path: "expertlisting",
        match: {
          userId: id,
        },
      };
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
        if (ele.expertlisting.length > 0 && ele.expertlisting) {
          ele.isFavorite = true;
          delete ele.expertlisting;
        } else {
          ele.isFavorite = false;
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
        mobileNo: Joi.string().min(10),
        profilePic: Joi.string().allow(""),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let payload = req.body;
     const token = req.headers["x-access-token"] || req.query["x-access-token"] || req.headers["authorization"];
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
      let userData = JSON.parse(JSON.stringify(user));
      delete userData.token;
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "updated User",
          data: { token: token, user: userData },
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  getAppointmentDetails: async (req, res) => {
    try {
      let timeZone = req.body.timezone;
      let userId = req.user.id;
      let filterType = req.body.filterType;
      const schema = Joi.object({
        filterType: Joi.string(),
        limit: Joi.number(),
        page: Joi.number(),
        timezone: Joi.string(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let data;
      let count;
      let currentTime = new Date();
      let expert;
      let pendingAppointment = await appointment.updateMany(
        {
          userId: userId,
          status: APP_CONSTANTS.appointmentStatus.pending,
          endAppointmentTime: {
            $lt: currentTime.getTime(),
          },
        },
        { status: APP_CONSTANTS.appointmentStatus.cancelled }
      );

      let confirmedAppointment = await appointment.updateMany(
        {
          userId: userId,
          status: APP_CONSTANTS.appointmentStatus.confirmed,
          endAppointmentTime: {
            $lt: currentTime.getTime(),
          },
        },
        { status: APP_CONSTANTS.appointmentStatus.cancelled }
      );

      if (filterType == "All") {
        data = await appointment
          .find({ userId: userId })
          .populate("userId")
          .populate({
            path: "expertId",
            populate: { path: "userId practiceArea" },
          })
          .populate("practiceArea")
          .skip(parseInt((req.body.page - 1) * req.body.limit))
          .limit(parseInt(req.body.limit))
          .sort({ startAppointmentTime: -1 });
        //  expert=await expert.find({_id:data.expertId._id});
        count = await appointment
          .find({ userId: userId })
          .populate("userId")
          .populate({
            path: "expertId",
            populate: { path: "userId practiceArea" },
          })
          .countDocuments();
      } else if (filterType == "Upcoming") {
        let now = new Date();
        data = await appointment
          .find({
            userId: userId,
            status: APP_CONSTANTS.appointmentStatus.confirmed,
            endAppointmentTime: {
              $gte: now.getTime(),
            },
          })
          .populate("userId")
          .populate({
            path: "expertId",
            populate: { path: "userId practiceArea" },
          })
          .populate("expertId.userId")
          .populate("practiceArea")
          .skip(parseInt((req.body.page - 1) * req.body.limit))
          .limit(parseInt(req.body.limit))
          .sort({ startAppointmentTime: -1 });
        count = await appointment
          .find({
            userId: userId,
            status: APP_CONSTANTS.appointmentStatus.confirmed,
            endAppointmentTime: {
              $gte: now.getTime(),
            },
          })
          .countDocuments();
      } else if (filterType == "Rescheduled") {
        let now = new Date();
        data = await appointment
          .find({ userId: userId, isRescheduled: true })
          .populate("userId")
          .populate({
            path: "expertId",
            populate: { path: "userId practiceArea" },
          })
          .populate("practiceArea")
          .skip(parseInt((req.body.page - 1) * req.body.limit))
          .limit(parseInt(req.body.limit))
          .sort({ startAppointmentTime: -1 });
        //  expert=await expert.find({_id:data.expertId._id});
        count = await appointment
          .find({
            userId: userId,
            isRescheduled: true,
          })
          .countDocuments();
      } else if (filterType == "Completed") {
        data = await appointment
          .find({
            userId: userId,
            status: APP_CONSTANTS.appointmentStatus.completed,
          })
          .populate("userId")
          .populate({
            path: "expertId",
            populate: { path: "userId practiceArea" },
          })
          .populate("practiceArea")
          .skip(parseInt((req.body.page - 1) * req.body.limit))
          .limit(parseInt(req.body.limit))
          .sort({ startAppointmentTime: -1 });
        count = await appointment
          .find({
            userId: userId,
            status: APP_CONSTANTS.appointmentStatus.completed,
          })
          .countDocuments();
      } else if (filterType == "Cancelled") {
        data = await appointment
          .find({
            userId: userId,
            status: APP_CONSTANTS.appointmentStatus.cancelled,
          })
          .populate("userId")
          .populate({
            path: "expertId",
            populate: { path: "userId practiceArea" },
          })
          .populate("practiceArea")
          .skip(parseInt((req.body.page - 1) * req.body.limit))
          .limit(parseInt(req.body.limit))
          .sort({ startAppointmentTime: -1 });
        count = await appointment
          .find({
            userId: userId,
            status: APP_CONSTANTS.appointmentStatus.cancelled,
          })
          .countDocuments();
      }
      let appointmentAllData = JSON.parse(JSON.stringify(data));
      appointmentAllData.map((ele) => {
        if (ele && ele.expertId && ele.expertId.userId) {
          delete ele.__v;
          delete ele.practiceArea;
          delete ele.expertId.__v;
          delete ele.expertId.userId.userData;
          delete ele.expertId.userId.isEmailVerified;
          delete ele.expertId.userId.password;
          delete ele.expertId.userId.mobileFirebaseUid;
          delete ele.expertId.userId.token;
          delete ele.expertId.userId.__v;
          delete ele.__v;
          delete ele.userId.__v;
          delete ele.userId.userData;
          delete ele.userId.isEmailVerified;
          delete ele.userId.password;
          delete ele.userId.mobileFirebaseUid;
          delete ele.userId.token;
        }
      });

      var startAppointmentTimeLocal,
        appointmentEndLocalTime,
        appointDateandTimeLocal;
      appointmentAllData.map((ele) => {
        let localTime = moment.tz(ele.startAppointmentTime, timeZone);
        startAppointmentTimeLocal = moment(localTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        let endTime = moment.tz(ele.endAppointmentTime, timeZone);
        appointmentEndLocalTime = moment(endTime).format("YYYY-MM-DD HH:mm:ss");
        let dateAndTime = moment.tz(ele.appointDateandTime, timeZone);
        appointDateandTimeLocal = moment(dateAndTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );

        // appointmentEndLocalTime = moment.utc(ele.endAppointmentTime).toDate();
        // appointmentEndLocalTime = moment(appointmentEndLocalTime).format('YYYY-MM-DD HH:mm:ss');
        // appointDateandTimeLocal = moment.utc(ele.appointDateandTime).toDate();
        // appointDateandTimeLocal = moment(appointDateandTimeLocal).format('YYYY-MM-DD HH:mm:ss');

        return (
          (ele.startAppointmentTimeLocal = startAppointmentTimeLocal),
          (ele.endAppointmentTimeLocal = appointmentEndLocalTime),
          (ele.appointDateandTimeLocal = appointDateandTimeLocal)
        );
        // return { ...ele, startAppointmentTimes : localTime}
      });

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Success",
          data: {
            list: appointmentAllData,
            count: count,
            currentPage: req.body.page,
          },
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
      let userId = req.user.id;
      let payload = req.body;
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
        appointmentId: Joi.string(),
        timeZone: Joi.string(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let start = req.body.startAppointmentTime,
        end = req.body.endAppointmentTime;
      let data = await appointment.find({
        startAppointmentTime: {
          $gte: start,
          $lt: end,
        },
      });
      payload.userId = userId;
      let expert;
      let rescheduledAppointment = await appointment.findByIdAndUpdate(
        req.body.appointmentId,
        payload,
        { new: true }
      );

      if (!rescheduledAppointment) {
        throw Boom.badRequest("cannot find any appointment to reschedule");
      }
      //   let timeZone=req.body.timeZone;
      //   let rescheduledAppointments = JSON.parse(JSON.stringify(rescheduledAppointment))
      //   //   let createAppointments=JSON.stringify(createAppointment)
      //     let localTime = moment.tz(rescheduledAppointments.startAppointmentTime, timeZone);
      //    let startAppointmentTimeLocal= moment(localTime).format('YYYY-MM-DD HH:mm:ss')
      //     let endTime = moment.tz(rescheduledAppointments.endAppointmentTime, timeZone);
      //   let   appointmentEndLocalTime= moment(endTime).format('YYYY-MM-DD HH:mm:ss')
      //      let dateAndTime = moment.tz(rescheduledAppointments.appointDateandTime, timeZone);
      //    let  appointDateandTimeLocal= moment(dateAndTime).format('YYYY-MM-DD HH:mm:ss')
      //    rescheduledAppointments.startAppointmentTimeLocal=startAppointmentTimeLocal;
      //    rescheduledAppointments.appointmentEndLocalTime=appointmentEndLocalTime;
      //    rescheduledAppointments.appointDateandTimeLocal=appointDateandTimeLocal;

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Success",
          data: rescheduledAppointment,
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
      let { expertId, favourite, expertUserId } = req.body;
      let payload = {
        userId,
        expertId,
        expertUserId,
      };
      if (favourite == APP_CONSTANTS.checkfavExpert) {
        await favouriteExport.create(payload);
        universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "Expert Added To Favourite",
          },
          res
        );
      } else {
        let removeFavouriteExpert = await favouriteExport.deleteOne(payload);
        if (!removeFavouriteExpert) {
          throw Boom.badRequest("Expert Is Not Found");
        }
        universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "Expert Remove To Favourite",
            data: removeFavouriteExpert,
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
      const schema = Joi.object({
        limit: Joi.string().required(),
        page: Joi.string().required(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);

      let id = req.user.id;
      let payload = {
        path: "expertlisting",
        match: {
          userId: id,
        },
      };
      let { page, limit } = req.body;
      let favouriteExportData = await favouriteExport
        .find({ userId: id })
        .populate({ path: "userId", select: "firstName lastName profilePic" })
        .populate({
          path: "expertId",
          populate: { path: "userId practiceArea category" },
        })

        .skip(parseInt((page - 1) * limit))
        .limit(parseInt(limit));
      let count = await favouriteExport.find({ userId: id }).countDocuments();

      let finalResult = [];
      console.log("before", favouriteExportData);
      let getfavExportData = JSON.parse(JSON.stringify(favouriteExportData));
      console.log("after", getfavExportData);
      getfavExportData.map((ele) => {
        delete ele.__v;
        if (ele && ele.userId && ele.userId != null) {
          delete ele.userId;
        }
        const expertDetails = ele?.expertId;
        if (
          ele &&
          ele.expertId &&
          ele.expertId.userId &&
          ele.expertId.userId != null
        ) {
          delete ele.expertId.__v;
          delete ele.expertId.category.__v;
          delete ele.expertId.userId.isEmailVerified;
          delete ele.expertId.userId.password;
          delete ele.expertId.userId.__v;
          delete ele.expertId.userId.userData;
          delete ele.expertUserId;
          delete ele.expertId;
        }
        const Result = { ...ele, ...expertDetails };
        let intResult = { ...Result, isFavorite: true };
        finalResult = [...finalResult, intResult];
      });
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Success",
          data: {
            list: finalResult,
            currentPage: req.body.page,
            total: count,
          },
        },
        res
      );
    } catch (error) {
      return universalFunctions.sendError(error, res);
    }
  },

  getChatAppointmentUser: async (req, res) => {
    try {
      let id = req.user.id;
      let payload = {
        userId: id,
      };
      const chatappointmentdata = await ChatAppointment.find(payload)
        .populate({ path: "userId", populate: { path: "userData.data" } })
        .populate({
          path: "expertId",
          populate: { path: "userId practiceArea category" },
        });
      if (!chatappointmentdata) {
        throw Boom.badRequest("invalid id or token");
      }
      let tempobj = JSON.parse(JSON.stringify(chatappointmentdata));
      await universalFunctions.asyncForEach(tempobj, async (e, index) => {
        let expertData = await User.findOne({ _id: e.expertId.userId });
        e.expertData = expertData;
      });
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Successfull get appointment",
          data: tempobj,
        },
        res
      );
    } catch (err) {
      console.log(err);
      universalFunctions.sendError(err, res);
    }
  },
  bookChatAppointment: async (req, res) => {
    try {
      let userId = req.user.id;
      let payload = req.body;
      payload = { ...payload, chatRoomId: "" };
      const schema = Joi.object({
        expertId: Joi.string().length(24).required(),
        question: Joi.string().allow(""),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      payload.userId = userId;
      let chats = await ChatAppointment.findOne({
        expertId: req.body.expertId,
        userId,
      });
      if (!chats) {
        let data = await ChatAppointment.create(payload);
        if (!data) {
          throw Boom.badRequest("something is wrong ");
        }
        universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "Success send an request",
            data: data,
          },
          res
        );
      } else {
        universalFunctions.sendSuccess(
          {
            statusCode: 400,
            message: "You already have a chat room",
            data: chats,
          },
          res
        );
      }
    } catch (error) {
      console.log(error);
      universalFunctions.sendError(error, res);
    }
  },
  getExpertDetails: async (req, res) => {
    try {
      // let userId
      let payload = req.body;

      let expPayload = {
        path: "expertlisting",
        match: {
          userId: req.user.id,
        },
      };
      const expert = await expertUser
        .findOne({ _id: payload.expertId })
        .populate("userId")
        .populate("category")
        .populate(expPayload)
        .populate("practiceArea");
      if (!expert) {
        throw Boom.badRequest("Expert not found");
      }
      let expertDetails = JSON.parse(JSON.stringify(expert));
      if (expertDetails?.expertlisting.length > 0)
        expertDetails.isFavorite = true;
      else expertDetails.isFavorite = false;
      delete expertDetails.expertlisting;
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Expert details fetched successfully",
          data: expertDetails,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  createTestimony: async (req, res) => {
    try {
      const schema = Joi.object({
        feedback: Joi.string(),
      });
      let id = req.user.id;
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      const userDetails = await User.findOne({ _id: id });
      let name = userDetails.firstName + " " + userDetails.lastName;
      let image = userDetails.profilePic;
      let feedback = await Testimony.create({
        feedback: req.body.feedback,
        name: name,
        image: image,
        isDeleted: false,
      });
      if (!feedback) {
        throw Boom.badRequest("cannot create a testimony");
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Created testimony",
          data: feedback,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },

  addTestimonyByAdmin: async (req, res) => {
    try {
      const schema = Joi.object({
        feedback: Joi.string().required(),
        name: Joi.string().allow(""),
        image: Joi.string().allow(""),
      });

      await universalFunctions.validateRequestPayload(req.body, res, schema);
      req.body.isDeleted = false;
      let feedback = await Testimony.create(req.body);
      if (!feedback) {
        throw Boom.badRequest("cannot create a testimony");
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Created testimony",
          data: {},
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },

  editTestimonyByAdmin: async (req, res) => {
    try {
      const schema = Joi.object({
        id: Joi.string().required(),
        feedback: Joi.string().required(),
        name: Joi.string().allow(""),
        image: Joi.string().allow(""),
      });

      await universalFunctions.validateRequestPayload(req.body, res, schema);

      let feedback = await Testimony.findOneAndUpdate(
        { _id: req.body.id, isDeleted: false },
        req.body
      );
      if (!feedback) {
        throw Boom.badRequest("Cannot edit a Testimony");
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Testimony Edited Successfully",
          data: {},
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },

  deleteTestimonyByAdmin: async (req, res) => {
    try {
      const schema = Joi.object({
        id: Joi.string().required(),
      });

      await universalFunctions.validateRequestPayload(req.body, res, schema);

      let feedback = await Testimony.findOneAndUpdate(
        { _id: req.body.id, isDeleted: false },
        { isDeleted: true }
      );
      if (!feedback) {
        throw Boom.badRequest("Cannot delete testimony");
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Testimony Deleted Successfully",
          data: {},
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  getTestimonies: async (req, res) => {
    try {
      let { skip, limit = 10 } = req.query;
      let feedback = await Testimony.find({ isDeleted: false })
        .select({ feedback: 1, name: 1 })
        .sort({ createdAt: -1 })
        .skip(parseInt(skip))
        .limit(parseInt(limit));
      let count = await Testimony.count({ isDeleted: false });
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "All testimonies are",
          data: {
            feedback,
            pages: count ? Math.ceil(count / parseInt(limit)) : 0,
          },
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },

  getTestimonyByIdForAdmin: async (req, res) => {
    try {
      let { id } = req.query;
      let feedback = await Testimony.findOne({ _id: id });

      if (!feedback) {
        throw Boom.notFound(responseMessages.TESTIMONY_NOT_FOUND);
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: responseMessages.SUCCESS,
          data: feedback,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  giveExpertRating: async (req, res) => {
    try {
      let id = req.user.id;
      const schema = Joi.object({
        rating: Joi.number(),
        expertId: Joi.string(),
      });
      // let id=req.user.id;
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      const isRated = await Expert_Rating.findOne({
        userId: id,
        expertId: req.body.expertId,
      });
      if (!isRated) {
        throw Boom.badRequest("User has already rated the expert");
      }
      const expert = await expertUser.findOne({ _id: req.body.expertId });
      let rating = {
        noOfRating: expert.rating.noOfRating + 1,
        ratingCount: expert.rating.ratingCount + req.body.rating,
        avgRating:
          (expert.rating.ratingCount + req.body.rating) /
          (expert.rating.noOfRating + 1),
      };
      if (!expert) {
        throw Boom.badRequest("Wrong credentials");
      }

      const expertDetails = await expertUser.findOneAndUpdate(
        { _id: req.body.expertId },
        { $set: { rating: rating } },
        { new: true }
      );
      if (!expertDetails) {
        throw Boom.badRequest("Could not update");
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "thank you for rating",
          data: expertDetails,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  getAvailableTimeForUser: async (req, res) => {
    try {
      let { expertId, appointmentDate, duration, timeZone } = req.query;
      let curentdate = new Date();

      const expertTime = await expertTimeAvailable.find({
        $and: [
          {
            expertId: expertId,
          },
          {
            appointmentDate: appointmentDate,
          },
          {
            duration: duration,
          },
          {
            startAppointmentTime: {
              $gte: curentdate,
            },
          },
        ],
      });

      if (!expertTime) {
        throw Boom.badRequest("invalid id or token");
      }
      let tempobj = JSON.parse(JSON.stringify(expertTime));
      await universalFunctions.asyncForEach(tempobj, async (e, index) => {
        let data = await appointment.find({
          expertId: expertId,
          appointmentDate: appointmentDate,
          timeSlotId: e._id ? e._id : "",
        });
        if (data.length > 0) {
          e.avialble = false;
        } else {
          e.avialble = true;
        }
      });
      var startAppointmentTimeLocal,
        appointmentEndLocalTime,
        appointDateandTimeLocal;

      tempobj.map((ele) => {
        let localTime = moment.tz(ele.startAppointmentTime, timeZone);
        startAppointmentTimeLocal = moment(localTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        let endTime = moment.tz(ele.endAppointmentTime, timeZone);
        appointmentEndLocalTime = moment(endTime).format("YYYY-MM-DD HH:mm:ss");
        let dateAndTime = moment.tz(ele.appointDateandTime, timeZone);
        appointDateandTimeLocal = moment(dateAndTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        return (
          (ele.startAppointmentTimeLocal = startAppointmentTimeLocal),
          (ele.endAppointmentTimeLocal = appointmentEndLocalTime),
          (ele.appointDateandTimeLocal = appointDateandTimeLocal)
        );
      });

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "expertTime found",
          data: tempobj,
        },
        res
      );
    } catch (error) {
      console.log(error);
      universalFunctions.sendError(error, res);
    }
  },
  bookAppointment: async (req, res) => {
    try {
      let userId = req.user.id;
      let payload = req.body;
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
        timeZone: Joi.string(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let start = req.body.startAppointmentTime,
        end = req.body.endAppointmentTime;
      let data = await appointment.find({
        startAppointmentTime: {
          $gte: start,
          $lte: end,
        },
        expertId: payload.expertId,
        appointmentDate: payload.appointmentDate,
      });
      payload.userId = userId;
      console.log(data, "daaaaattaa");
      if (data.length > 0) {
        throw Boom.badRequest("already an appointment at this time");
      }
      let timeZone = req.body.timeZone;
      let createAppointment = await appointment.create(payload);
      let createAppointments = JSON.parse(JSON.stringify(createAppointment));
      //   let createAppointments=JSON.stringify(createAppointment)
      let localTime = moment.tz(
        createAppointments.startAppointmentTime,
        timeZone
      );
      let startAppointmentTimeLocal = moment(localTime).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      let endTime = moment.tz(createAppointments.endAppointmentTime, timeZone);
      let appointmentEndLocalTime = moment(endTime).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      let dateAndTime = moment.tz(
        createAppointments.appointDateandTime,
        timeZone
      );
      let appointDateandTimeLocal = moment(dateAndTime).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      createAppointments.startAppointmentTimeLocal = startAppointmentTimeLocal;
      createAppointments.appointmentEndLocalTime = appointmentEndLocalTime;
      createAppointments.appointDateandTimeLocal = appointDateandTimeLocal;

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Success",
          data: createAppointments,
        },
        res
      );
    } catch (error) {
      return universalFunctions.sendError(error, res);
    }
  },
  addUserRequest: async (req, res) => {
    try {
      const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().allow(""),
        email: Joi.string().email().required(),
        firmName: Joi.string().allow(""),
        phoneNo: Joi.string().min(10).required(),
      });

      await universalFunctions.validateRequestPayload(req.body, res, schema);
      req.body.isDeleted = false;
      req.body.isContacted = false;

      let submittedRequest = await UserRequest.create(req.body);
      if (!submittedRequest) {
        throw Boom.badRequest("Cannot Submit Your Request");
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Success! Acknowledgement Sent To Submitted EmailId",
          data: {},
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  editUserRequestByAdmin: async (req, res) => {
    try {
      const schema = Joi.object({
        isContacted: Joi.boolean().required(),
        id: Joi.string().required(),
      });

      await universalFunctions.validateRequestPayload(req.body, res, schema);

      let submittedRequest = await UserRequest.findOneAndUpdate(
        { _id: req.body.id, isDeleted: false },
        { isContacted: req.body.isContacted }
      );
      if (!submittedRequest) {
        throw Boom.badRequest("Cannot Edit Request");
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Request Edited Successfully",
          data: {},
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  deleteUserRequestByAdmin: async (req, res) => {
    try {
      const schema = Joi.object({
        id: Joi.string().required(),
      });

      await universalFunctions.validateRequestPayload(req.body, res, schema);

      let submittedRequest = await UserRequest.findOneAndUpdate(
        { _id: req.body.id, isDeleted: false },
        { isDeleted: true }
      );
      if (!submittedRequest) {
        throw Boom.badRequest("Cannot Delete Request");
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Request Deleted Successfully",
          data: {},
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  getAllUserRequestsForAdmin: async (req, res) => {
    try {
      let { skip, limit = 10, option } = req.query;

      let filter = { isDeleted: false };
      if (option === "contacted") {
        filter.isContacted = true;
      } else if (option === "unContacted") {
        filter.isContacted = false;
      }

      let submittedRequestData = await UserRequest.find(filter)
        .sort({ createdAt: -1 })
        .skip(parseInt(skip))
        .limit(parseInt(limit));
      let count = await UserRequest.count(filter);

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Request Deleted Successfully",
          data: {
            submittedRequestData,
            pages: count ? Math.ceil(count / parseInt(limit)) : 0,
          },
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  getUserRequestById: async (req, res) => {
    try {
      let { id } = req.query;

      let submittedRequestData = await UserRequest.findOne({
        _id: id,
        isDeleted: false,
      });
      if (!submittedRequestData) {
        throw Boom.badRequest("Cannot Find Request");
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Success",
          data: submittedRequestData,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
};
