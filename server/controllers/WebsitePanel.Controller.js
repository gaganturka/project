const User = require("../models/User");
const borhanUser = require("../models/Borhan_User");
const Newsletter=require('../models/NewsletterSubscribed')
const expertUser = require("../models/Expert_User");
const practiceArea = require("../models/Practice_Area");
const appointment =require("../models/Appointment")
const otpModel = require("../models/Otp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const APP_CONSTANTS = require("../appConstants");
import responseMessages from "../resources/response.json";
const { Config } = require("../config");
const Testimony =require('../models/Testimony');
const Boom = require("boom");
import universalFunctions from "../utils/universalFunctions";
const expertTimeAvailable=require("../models/ExpertTimeSlot");
module.exports = {
  showOnlineExperts: async (req, res) => {
    try {
      const schema = Joi.object({
        limit: Joi.number(),
        page: Joi.number(),
        search: Joi.string().allow(""),
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

      const expert = await expertUser
        .find({
          isApprovedByAdmin: true,
          status: APP_CONSTANTS.activityStatus.active,
        })
        .populate("userId")
        .populate("practiceArea")
        .populate("category")
        .limit(parseInt(20));
      if (!expert) {
        throw Boom.badRequest("cannot find any expert");
      }
      console.log("expert online", expert, "expert online");
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "All experts online are",
          data: expert,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  showBorhanUserDetails: async (req, res) => {
    try {
      console.log(req.user.id, "kya req.user mai");
      let id = req.user.id;
      console.log("id of user", id);
      const borhanuser = await User.findOne({ _id: id }).populate(
        "userData.data"
      );
      if (!borhanuser) {
        throw Boom.badRequest("cannot find any user");
      }

      console.log("userdetails", borhanuser, "user details");
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "User details are",
          data: borhanuser,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  editBorhanUserDetails: async (req, res) => {
    try {
      const schema = {
        firstName: Joi.string().alphanum().min(2).max(30).required(),
        lastName: Joi.string().alphanum().min(2).max(30).required(),
        email: Joi.string().email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        }),
        mobileNo: Joi.string().min(10).max(10).required(),
        profilePic: Joi.string().optional().allow(""),
      };
      await universalFunctions.validateRequestPayload(req.body, res, schema);

      let user = await User.findByIdAndUpdate(
        { _id: req.user.id },
        {
          $set: {
            firstName: req.body.firstName,
            email: req.body.email,
            mobileNo: req.body.mobileNo,
            lastName: req.body.lastName,
            profilePic: req.body.profilePic,
            isEmailVerified: false,

            otp: req.body.otp,
          },
        }
      );
      if (!user) {
        throw Boom.badRequest("could not update user");
      }

      let borhan = await borhanUser.findByIdAndUpdate(
        { _id: user.userData.data },
        {
          $set: {
            isSubscribed: false,
          },
        },
        { new: true }
      );

      if (!borhan) {
        throw Boom.badRequest("could not update user");
      }
      console.log("updated borhan", borhan);
      console.log("newupdated user", user);
      return universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "user has been updated",
        },
        res
      );
    } catch (err) {
      return universalFunctions.sendError(err, res);
    }
  },
  getFilteredOnlineExperts: async (req, res) => {
    try {
      const schema = Joi.object({
        limit: Joi.number(),
        page: Joi.number(),
        category: Joi.string().allow(""),
        practiceArea: Joi.string().allow(""),
        sortBy: Joi.string(),
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
      let expert;
      if (req.body.sortBy == "1") {
        if (req.body.category !== "" && req.body.practiceArea === "") {
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          expert = await expertUser
            .find({
              category: req.body.category,
              isApprovedByAdmin: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("practiceArea")
            .populate("category")
            .populate("userId")
            .sort({ "rating.avgRating": -1 });
        } else if (req.body.category === "" && req.body.practiceArea !== "") {
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          expert = await expertUser
            .find({
              practiceArea: req.body.practiceArea,
              isApprovedByAdmin: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("practiceArea")
            .populate("category")
            .populate("userId")
            .sort({ "rating.avgRating": -1 });
        } else if (req.body.category !== "" && req.body.practiceArea !== "") {
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          expert = await expertUser
            .find({
              practiceArea: req.body.practiceArea,
              category: req.body.category,
              isApprovedByAdmin: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("practiceArea")
            .populate("category")
            .populate("userId")
            .sort({ "rating.avgRating": -1 });
        } else {
          expert = await expertUser
            .find({
              isApprovedByAdmin: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("practiceArea")
            .populate("category")
            .populate("userId")
            .sort({ "rating.avgRating": -1 });
        }
      } else if (req.body.sortBy == "2") {
        if (req.body.category !== "" && req.body.practiceArea === "") {
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          expert = await expertUser
            .find({
              category: req.body.category,
              isApprovedByAdmin: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("category")
            .populate("practiceArea")
            .populate("userId")
            .sort({ noOfHoursOfSessionsDone: -1 });
        } else if (req.body.category === "" && req.body.practiceArea !== "") {
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          expert = await expertUser
            .find({
              practiceArea: req.body.practiceArea,
              isApprovedByAdmin: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("category")
            .populate("practiceArea")
            .populate("userId")
            .sort({ noOfHoursOfSessionsDone: -1 });
        } else if (req.body.category !== "" && req.body.practiceArea !== "") {
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          expert = await expertUser
            .find({
              practiceArea: req.body.practiceArea,
              category: req.body.category,
              isApprovedByAdmin: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("category")
            .populate("practiceArea")
            .populate("userId")
            .sort({ noOfHoursOfSessionsDone: -1 });
        } else {
          expert = await expertUser
            .find({
              isApprovedByAdmin: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("category")
            .populate("practiceArea")
            .populate("userId")
            .sort({ noOfHoursOfSessionsDone: -1 });
        }
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
            count: await expertUser
              .find({ status: APP_CONSTANTS.activityStatus.active })
              .countDocuments(),
          },
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  getPracticeAreaDataSearched: async (req, res) => {
    try {
      const schema = Joi.object({
        searchedTerm: Joi.string().allow(""),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let filter = {
        isDeleted: false,
      };
      if (req.body.searchedTerm !== "") {
        filter["$or"] = [
          { name: { $regex: req.body.searchedTerm, $options: "i" } },
        ];
      }
      let practiceAreaData = await practiceArea.find(filter);
      if (!practiceAreaData) {
        throw Boom.badRequest(responseMessages.CATEGORY_NOT_FOUND);
      }
      return universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "fetched practice areas are",
          data: practiceAreaData,
        },
        res
      );
    } catch (err) {
      return universalFunctions.sendError(err, res);
    }
  },
  getFilteredOnlinePremiumExperts: async (req, res) => {
    try {
      const schema = Joi.object({
        limit: Joi.number(),
        page: Joi.number(),
        category: Joi.string().allow(""),
        practiceArea: Joi.string().allow(""),
        sortBy: Joi.string(),
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
      let expert;
      if (req.body.sortBy == "1") {
        if (req.body.category !== "" && req.body.practiceArea === "") {
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          expert = await expertUser
            .find({
              category: req.body.category,
              isApprovedByAdmin: true,
              isSubscribed: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("practiceArea")
            .populate("category")
            .populate("userId")
            .sort({ "rating.avgRating": -1 });
        } else if (req.body.category === "" && req.body.practiceArea !== "") {
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          expert = await expertUser
            .find({
              practiceArea: req.body.practiceArea,
              isApprovedByAdmin: true,
              isSubscribed: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("practiceArea")
            .populate("category")
            .populate("userId")
            .sort({ "rating.avgRating": -1 });
        } else if (req.body.category !== "" && req.body.practiceArea !== "") {
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          expert = await expertUser
            .find({
              practiceArea: req.body.practiceArea,
              category: req.body.category,
              isApprovedByAdmin: true,
              isSubscribed: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("practiceArea")
            .populate("category")
            .populate("userId")
            .sort({ "rating.avgRating": -1 });
        } else {
          expert = await expertUser
            .find({
              isApprovedByAdmin: true,
              isSubscribed: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("practiceArea")
            .populate("category")
            .populate("userId")
            .sort({ "rating.avgRating": -1 });
        }
      } else if (req.body.sortBy == "2") {
        if (req.body.category !== "" && req.body.practiceArea === "") {
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          expert = await expertUser
            .find({
              category: req.body.category,
              isApprovedByAdmin: true,
              isSubscribed: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("category")
            .populate("practiceArea")
            .populate("userId")
            .sort({ noOfHoursOfSessionsDone: -1 });
        } else if (req.body.category === "" && req.body.practiceArea !== "") {
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          expert = await expertUser
            .find({
              practiceArea: req.body.practiceArea,
              isApprovedByAdmin: true,
              isSubscribed: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("category")
            .populate("practiceArea")
            .populate("userId")
            .sort({ noOfHoursOfSessionsDone: -1 });
        } else if (req.body.category !== "" && req.body.practiceArea !== "") {
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
          expert = await expertUser
            .find({
              practiceArea: req.body.practiceArea,
              category: req.body.category,
              isApprovedByAdmin: true,
              isSubscribed: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("category")
            .populate("practiceArea")
            .populate("userId")
            .sort({ noOfHoursOfSessionsDone: -1 });
        } else {
          expert = await expertUser
            .find({
              isApprovedByAdmin: true,
              isSubscribed: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("category")
            .populate("practiceArea")
            .populate("userId")
            .sort({ noOfHoursOfSessionsDone: -1 });
        }
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
            count: await expertUser
              .find({ status: APP_CONSTANTS.activityStatus.active })
              .countDocuments(),
          },
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  getOnlinePremiumExperts: async (req, res) => {
    try {
      // const schema = Joi.object({
      //   limit: Joi.number(),
      //   page: Joi.number(),
      //  category:Joi.string().allow(""),
      //  practiceArea:Joi.string().allow(""),
      //  sortBy:Joi.string(),
      // });
      // await universalFunctions.validateRequestPayload(req.body, res, schema);

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
      let expert;
      //    if(req.body.sortBy=="1")
      //   {if ( req.body.category !== "" &&req.body.practiceArea === "") {
      //     // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
      //     // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
      //          expert = await expertUser.find({category: req.body.category,isApprovedByAdmin: true,isSubscribed:true, status:APP_CONSTANTS.activityStatus.active}).populate('practiceArea').populate('category').populate('userId').sort({"rating.avgRating":-1})

      //   }
      //   else  if ( req.body.category === "" &&req.body.practiceArea !== "") {
      //     // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
      //     // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
      //          expert = await expertUser.find({practiceArea: req.body.practiceArea,isApprovedByAdmin: true,isSubscribed:true, status:APP_CONSTANTS.activityStatus.active}).populate('practiceArea').populate('category').populate('userId').sort({"rating.avgRating":-1});

      //   }
      //   else  if ( req.body.category !== "" &&req.body.practiceArea !== "") {
      //     // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
      //     // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
      //          expert = await expertUser.find({practiceArea: req.body.practiceArea, category:req.body.category,isApprovedByAdmin: true,isSubscribed:true, status:APP_CONSTANTS.activityStatus.active}).populate('practiceArea').populate('category').populate('userId').sort({"rating.avgRating":-1});

      //   }
      //   else
      //   {
      //     expert = await expertUser.find({isApprovedByAdmin: true,isSubscribed:true, status:APP_CONSTANTS.activityStatus.active}).populate('practiceArea').populate('category').populate('userId').sort({"rating.avgRating":-1})

      //   }

      // }

      // else if(req.body.sortBy=="2")
      //   {if ( req.body.category !== "" &&req.body.practiceArea === "") {
      //     // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
      //     // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
      //          expert = await expertUser.find({category: req.body.category,isApprovedByAdmin: true,isSubscribed:true, status:APP_CONSTANTS.activityStatus.active}).populate('category').populate('practiceArea').populate('userId').sort({"noOfHoursOfSessionsDone":-1})

      //   }
      //   else  if ( req.body.category === "" &&req.body.practiceArea !== "") {
      //     // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
      //     // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
      //          expert = await expertUser.find({practiceArea: req.body.practiceArea,isApprovedByAdmin: true,isSubscribed:true, status:APP_CONSTANTS.activityStatus.active}).populate('category').populate('practiceArea').populate('userId').sort({"noOfHoursOfSessionsDone":-1})

      //   }
      //   else  if ( req.body.category !== "" &&req.body.practiceArea !== "") {
      //     // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
      //     // console.log("console mai kya hai practiceArea ke",req.body.practiceArea);
      //          expert = await expertUser.find({practiceArea: req.body.practiceArea, category:req.body.category,isApprovedByAdmin: true,isSubscribed:true, status:APP_CONSTANTS.activityStatus.active}).populate('category').populate('practiceArea').populate('userId').sort({"noOfHoursOfSessionsDone":-1});

      //   }
      //   else
      //   {
      //     expert = await expertUser.find({isApprovedByAdmin: true,isSubscribed:true, status:APP_CONSTANTS.activityStatus.active}).populate('category').populate('practiceArea').populate('userId').sort({"noOfHoursOfSessionsDone":-1})

      //   }}

      expert = await expertUser
        .find({
          isApprovedByAdmin: true,
          isSubscribed: true,
          status: APP_CONSTANTS.activityStatus.active,
        })
        .populate("practiceArea")
        .populate("category")
        .populate("userId")
        .sort({ "rating.avgRating": -1 });

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
            count: await expertUser
              .find({ status: APP_CONSTANTS.activityStatus.active })
              .countDocuments(),
          },
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  getSingleExpert: async (req, res) => {
    try {
      let id = req.query.id;
      console.log(id,"sdlndcsjnkjdsscdkjsdkjndskj")
      const expertData = await expertUser
        .findOne({ _id: id })
        .populate({ path: "category practiceArea userId" });
      if (!expertData) {
        throw Boom.badRequest("Data Not Found");
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "expert found",
          data: expertData,
        },
        res
      );
    } catch (err) {
      return universalFunctions.sendError(err, res);
    }
  },
  bookAppointment: async (req, res) => {
    try {
      let userId=req.user.id;
      let payload=req.body;
      const schema = Joi.object({
        // userId: Joi.string().length(24).required(),
        expertId: Joi.string().length(24).required(),
        appointmentType: Joi.string().allow(""),
        duration: Joi.string().allow(""),
        appointmentDate: Joi.date().required(),
        endAppointmentTime: Joi.date().required(),
        startAppointmentTime: Joi.date().required(),
        appointmentTime: Joi.string().allow(""),
        appointDateandTime: Joi.date().required(),
        question:Joi.string().allow("").optional(""),
        status: Joi.string().allow(""),
        practiceArea: Joi.string().length(24).required(),

      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let start=req.body.startAppointmentTime,end= req.body.endAppointmentTime;
    let data= await appointment.find({
        startAppointmentTime: {
            $gte: start,
            $lt: end
        }
    })
    payload.userId=userId;
    console.log(data,"heolll  kjnsdnkjccsjsdjkj")
      let createAppointment = await appointment.create(payload);

        universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "Success",
            data: createAppointment,
          },
          res
        );

    } catch (error) {
      return universalFunctions.sendError(error, res);
    }
  },
  getAppointments: async (req, res) => {
    try {
      let userId=req.user.id;
      let filterType=req.body.filterType;
      const schema = Joi.object({
        filterType:Joi.string(),
        limit: Joi.number(),
        page: Joi.number(),
        
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let data;
      let count;
      let expert;
      
      // let start=req.body.startAppointmentTime,end= req.body.endAppointmentTime;
      if(filterType=="All")
      {
     data= await appointment.find({userId:userId}).populate('userId').populate({path:'expertId', populate:{path:"userId practiceArea"}})
     .skip(parseInt((req.body.page - 1) * req.body.limit))
 .limit(parseInt(req.body.limit));
    //  expert=await expert.find({_id:data.expertId._id});
    count= await appointment.find({userId:userId}).populate('userId').populate({path:'expertId', populate:{path:"userId practiceArea"}}).countDocuments()
      }
      else if(filterType=="Upcoming")
      {
        data=await appointment.find({userId:userId,status:APP_CONSTANTS.appointmentStatus.confirmed}).populate('userId').populate({path:'expertId', populate:{path:"userId practiceArea"}}).populate('expertId.userId')
        .skip(parseInt((req.body.page - 1) * req.body.limit))
    .limit(parseInt(req.body.limit));
      count =await appointment.find({userId:userId,status:APP_CONSTANTS.appointmentStatus.confirmed}).countDocuments();
      }
      else if(filterType=='Reschedule')
      {
        data= await appointment.find({userId:userId,status:APP_CONSTANTS.appointmentStatus.rescheduled}).populate('userId').populate({path:'expertId', populate:{path:"userId practiceArea"}})
        .skip(parseInt((req.body.page - 1) * req.body.limit))
    .limit(parseInt(req.body.limit));
        //  expert=await expert.find({_id:data.expertId._id});
        count= await appointment.find({userId:userId,status:APP_CONSTANTS.appointmentStatus.rescheduled}).countDocuments()
        
      }
      else if(filterType=="Completed")
      {
        data=await appointment.find({userId:userId,
        status:APP_CONSTANTS.appointmentStatus.completed,

      }).populate('userId').populate({path:'expertId', populate:{path:"userId practiceArea"}})
      .skip(parseInt((req.body.page - 1) * req.body.limit))
  .limit(parseInt(req.body.limit));
      count=await appointment.find({userId:userId,
      status:APP_CONSTANTS.appointmentStatus.completed,

    }).countDocuments();
    }
    else if(filterType=="Cancelled")
      {
        data=await appointment.find({userId:userId, status:APP_CONSTANTS.appointmentStatus.cancelled,
        
      }).populate('userId').populate({path:'expertId', populate:{path:"userId practiceArea"}})
      .skip(parseInt((req.body.page - 1) * req.body.limit))
  .limit(parseInt(req.body.limit));

      count=await appointment.find({userId:userId,
        status:APP_CONSTANTS.appointmentStatus.cancelled,
      
    }).countDocuments()
      }
    // payload.userId=userId;
    // console.log(data,"heolll  kjnsdnkjccsjsdjkj")
              universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "Success",
            data: {list:data,count:count},
          },
          res
        );

    } catch (error) {
      return universalFunctions.sendError(error, res);
    }
  },
  cancelAppointment: async (req, res) => {
    try {
      let userId=req.user.id;
      // const schema = Joi.object({
      //   filterType:Joi.string(),
      // });
      // await universalFunctions.validateRequestPayload(req.body, res, schema);
      let data;
      let expert;
      console.log("iddd kya aai",req.params.id);
      let deletedAppointment=await appointment.findByIdAndUpdate(req.params.id,{status:APP_CONSTANTS.appointmentStatus.cancelled})
      // let start=req.body.startAppointmentTime,end= req.body.endAppointmentTime;
      
        // data=await appointment.find({userId:userId,startAppointmentTime: {
        //   $lt: new Date()},
        //   status:APP_CONSTANTS.appointmentStatus.confirmed,
        
        // }),
    // payload.userId=userId;
    // console.log(data,"heolll  kjnsdnkjccsjsdjkj")
    if(!deletedAppointment)
    {
      throw Boom.badRequest("cannot find any appointment to delete");
     
    }
              universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "Success",
            data: data,
          },
          res
        );

    } catch (error) {
      return universalFunctions.sendError(error, res);
    }
  },
  rescheduleAppointment: async (req, res) => {
    try {
      let userId=req.user.id;
      // const schema = Joi.object({
      //   filterType:Joi.string(),
      // });
      // await universalFunctions.validateRequestPayload(req.body, res, schema);
      let data;
      let expert;
      // console.log("iddd kya aai",req.params.id);
      let rescheduledAppointment=await appointment.findByIdAndUpdate(req.params.id,{status:APP_CONSTANTS.appointmentStatus.rescheduled})
      // let start=req.body.startAppointmentTime,end= req.body.endAppointmentTime;
      
        // data=await appointment.find({userId:userId,startAppointmentTime: {
        //   $lt: new Date()},
        //   status:APP_CONSTANTS.appointmentStatus.confirmed,
        
        // }),
    // payload.userId=userId;
    // console.log(data,"heolll  kjnsdnkjccsjsdjkj")
    if(!rescheduledAppointment)
    {
      throw Boom.badRequest("cannot find any appointment to delete");
     
    }
              universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "Success",
            data: data,
          },
          res
        );

    } catch (error) {
      return universalFunctions.sendError(error, res);
    }
  },
  updateAppointment:async (req, res) => {

  },
  getTopExperts: async (req, res) => {
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
      console.log(
        "expert top are",
        expert,
        "top expert "
      );
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "All top experts ",
          data: {
            list: expert,
            count: await expertUser
              .find({ status: APP_CONSTANTS.activityStatus.active })
              .countDocuments(),
          },
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },

  createTestimony:async(req,res)=>
  {
    try {
      const schema = Joi.object({
        // limit: Joi.number(),
        // page: Joi.number(),
        // category: Joi.string().allow(""),
        // practiceArea: Joi.string().allow(""),
        // sortBy: Joi.string(),
        feedback: Joi.string(),
        name: Joi.string(),
        image: Joi.string().allow(""),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
         
      let feedback=await Testimony.create({feedback:req.body.feedback,name:req.body.name,image:req.body.image});
      if(!feedback)
      {
        throw Boom.badRequest("cannot create a testimony");
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Created testimony",
          data:feedback,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }


    
    


  },
  getTestimonies:async(req,res)=>
  {
    try {
      // const schema = Joi.object({
      //   // limit: Joi.number(),
      //   // page: Joi.number(),
      //   // category: Joi.string().allow(""),
      //   // practiceArea: Joi.string().allow(""),
      //   // sortBy: Joi.string(),
      //   feedback: Joi.string(),
      //   name: Joi.string(),
      //   image: Joi.string().allow(""),
      // });
      // await universalFunctions.validateRequestPayload(req.body, res, schema);
         
      let feedback=await Testimony.find();
      if(!feedback)
      {
        throw Boom.badRequest("cannot find any testimony");
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "All testimonies are",
          data:feedback,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }


  },
  subscribeNewsletter:async(req,res)=>
  {
    try {
      const schema = Joi.object({
        email:  Joi.string().email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        }),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let subscribed=await Newsletter.findOneAndUpdate( {email:req.body.email}, 
      {$set:{email:req.body.email}},
      {upsert:true})
      if(!subscribed)
      {
        throw Boom.badRequest("cannot subscribe to newsletter");
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "newsletter subscribed",
          data:subscribed,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }  
  },
  getAvailableTimeForUser:async (req,res)=>{
    try{ 
      let payload=req.body;
      let {expertId,appointmentDate}=req.body.payload;
      console.log(payload,"here is body ")
      const expertTime = await expertTimeAvailable.find(payload);
      if (!expertTime) {
        throw Boom.badRequest("invalid id or token");
      }
      
      // await helperFunction.asyncForEach(data,async ( e,index)=>{
      universalFunctions.asyncForEach(expertTime,async (e,index)=>{
        let start=e.startAppointmentTime,end= e.endAppointmentTime;

        let data= await appointment.find({
          expertId:expertId,
          appointmentDate:appointmentDate,
          startAppointmentTime: {
              $gte: start,
              $lt: end
          }
      })
      if(data){
        e.avialble=false;
      }else{
        e.avialble=true;
      }
      })

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "expertTime found",
          data: expertTime,
        },
        res
      );
    
    }catch(err){
      console.log(error)
      universalFunctions.sendError(error, res);  
    }
    },
};


  