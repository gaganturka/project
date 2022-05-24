const User = require("../models/User");
const borhanUser = require("../models/Borhan_User");
const Newsletter = require('../models/NewsletterSubscribed')
const expertUser = require("../models/Expert_User");
const practiceArea = require("../models/Practice_Area");
const appointment = require("../models/Appointment")
const otpModel = require("../models/Otp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const APP_CONSTANTS = require("../appConstants");
const responseMessages = require("../resources/response.json");
const universalFunctions = require("../utils/universalFunctions");
const { Config } = require("../config");
const Testimony = require('../models/Testimony');
const chatappointment = require('../models/ChatAppointment');
const Boom = require("boom");
const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const ChatGrant = AccessToken.ChatGrant;
const accountSid = Config.twilioAccountSid;
const authToken = Config.authToken;
const twilio = require('twilio');
const client = new twilio(accountSid, authToken);
const favExpertModel = require("../models/Fav_Expert");
const expertTimeAvailable = require("../models/ExpertTimeSlot");
module.exports = {
  showOnlineExperts: async (req, res) => {
    try {
      const schema = Joi.object({
        limit: Joi.number(),
        page: Joi.number(),
        search: Joi.string().allow(""),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);


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
      
      let id = req.user.id;
      
      const borhanuser = await User.findOne({ _id: id }).populate(
        "userData.data"
      );
      if (!borhanuser) {
        throw Boom.badRequest("cannot find any user");
      }

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "User details are",
          data: borhanuser,
        },
        res
      );
    } catch (error) {
      console.log("error:",error)
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
     let id = req.user.id;
     let payload={
      path: "userId"
     }
     if(id){
      payload={
         path: "expertlisting", match:{
          userId: id
         },
      }
     }
      const schema = Joi.object({
        limit: Joi.number(),
        page: Joi.number(),
        category: Joi.string().allow(""),
        practiceArea: Joi.string().allow(""),
        sortBy: Joi.string(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);

     
      let expert,total;
      if (req.body.sortBy == "1") {
        if (req.body.category !== "" && req.body.practiceArea === "") {
      
          expert = await expertUser
            .find({
              category: req.body.category,
              isApprovedByAdmin: true,
              status: APP_CONSTANTS.activityStatus.active,
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
              isApprovedByAdmin: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("practiceArea").countDocuments();
        } else if (req.body.category === "" && req.body.practiceArea !== "") {
      
          expert = await expertUser
            .find({
              practiceArea: req.body.practiceArea,
              isApprovedByAdmin: true,
              status: APP_CONSTANTS.activityStatus.active,
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
              status: APP_CONSTANTS.activityStatus.active,
            }).countDocuments();
        } else if (req.body.category !== "" && req.body.practiceArea !== "") {
      
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
            .populate(payload)
            .sort({ "rating.avgRating": -1 })
            .skip(parseInt((req.body.page - 1) * req.body.limit))
            .limit(parseInt(req.body.limit));
            total = await expertUser
            .find({
              practiceArea: req.body.practiceArea,
              category: req.body.category,
              isApprovedByAdmin: true,
              status: APP_CONSTANTS.activityStatus.active,
            }).countDocuments();
        } else {
          expert = await expertUser
            .find({
              isApprovedByAdmin: true,
              status: APP_CONSTANTS.activityStatus.active,
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
              isApprovedByAdmin: true,
              status: APP_CONSTANTS.activityStatus.active,
            }).countDocuments();
        }
      } else if (req.body.sortBy == "2") {
        if (req.body.category !== "" && req.body.practiceArea === "") {
      
          expert = await expertUser
            .find({
              category: req.body.category,
              isApprovedByAdmin: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("category")
            .populate("practiceArea")
            .populate("userId")
            .populate(payload)
            .sort({ noOfHoursOfSessionsDone: -1 })
            .skip(parseInt((req.body.page - 1) * req.body.limit))
            .limit(parseInt(req.body.limit));
            total = await expertUser
            .find({
              category: req.body.category,
              isApprovedByAdmin: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
           .countDocuments();
        } else if (req.body.category === "" && req.body.practiceArea !== "") {
      
          expert = await expertUser
            .find({
              practiceArea: req.body.practiceArea,
              isApprovedByAdmin: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("category")
            .populate("practiceArea")
            .populate("userId")
            .populate(payload)
            .sort({ noOfHoursOfSessionsDone: -1 })
            .skip(parseInt((req.body.page - 1) * req.body.limit))
            .limit(parseInt(req.body.limit));
            total = await expertUser
            .find({
              practiceArea: req.body.practiceArea,
              isApprovedByAdmin: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .countDocuments();
        } else if (req.body.category !== "" && req.body.practiceArea !== "") {
      
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
            .populate(payload)
            .sort({ noOfHoursOfSessionsDone: -1 })
            .skip(parseInt((req.body.page - 1) * req.body.limit))
            .limit(parseInt(req.body.limit));
            total = await expertUser
            .find({
              practiceArea: req.body.practiceArea,
              category: req.body.category,
              isApprovedByAdmin: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .countDocuments();
        } else {
          expert = await expertUser
            .find({
              isApprovedByAdmin: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("category")
            .populate("practiceArea")
            .populate("userId")
            .populate(payload)
            .sort({ noOfHoursOfSessionsDone: -1 })
            .skip(parseInt((req.body.page - 1) * req.body.limit))
            .limit(parseInt(req.body.limit));
            total = await expertUser
            .find({
              isApprovedByAdmin: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
           .countDocuments();
        }
      }

      if (!expert) {
        throw Boom.badRequest("cannot find any expert");
      }
      let tempobj = JSON.parse(JSON.stringify(expert));
      if(id){
      tempobj.map((ele)=>{
        if(ele.expertlisting.length>0&&ele.expertlisting){
          ele.isFavorite=true;
        }else{
          ele.isFavorite=false;
        }
      })
    }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "All experts online and filtered are",
          data: {
            list: tempobj,
            count: total,
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
      let id = req.user.id;
      let payload={
       path: "userId"
      }
      if(id){
       payload={
          path: "expertlisting", match:{
           userId: id,
          },
       }
      }
      const schema = Joi.object({
        limit: Joi.number(),
        page: Joi.number(),
        category: Joi.string().allow(""),
        practiceArea: Joi.string().allow(""),
        sortBy: Joi.string(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);

      let aggregationQuery;
      let expert;
      if (req.body.sortBy == "1") {
        if (req.body.category !== "" && req.body.practiceArea === "") {
       
          expert = await expertUser
            .find({
              category: req.body.category,
              isApprovedByAdmin: true,
              isSubscribed: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("practiceArea")
            .populate(payload)
            .populate("category")
            .populate("userId")
            .sort({ "rating.avgRating": -1 })
            .skip(parseInt((req.body.page - 1) * req.body.limit))
            .limit(parseInt(req.body.limit));;
        } else if (req.body.category === "" && req.body.practiceArea !== "") {
      
          expert = await expertUser
            .find({
              practiceArea: req.body.practiceArea,
              isApprovedByAdmin: true,
              isSubscribed: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("practiceArea")
            .populate(payload)
            .populate("category")
            .populate("userId")
            .sort({ "rating.avgRating": -1 })
            .skip(parseInt((req.body.page - 1) * req.body.limit))
            .limit(parseInt(req.body.limit));;
        } else if (req.body.category !== "" && req.body.practiceArea !== "") {
      
          expert = await expertUser
            .find({
              practiceArea: req.body.practiceArea,
              category: req.body.category,
              isApprovedByAdmin: true,
              isSubscribed: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("practiceArea")
            .populate(payload)
            .populate("category")
            .populate("userId")
            .sort({ "rating.avgRating": -1 })
            .skip(parseInt((req.body.page - 1) * req.body.limit))
            .limit(parseInt(req.body.limit));;
        } else {
          expert = await expertUser
            .find({
              isApprovedByAdmin: true,
              isSubscribed: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("practiceArea")
            .populate(payload)
            .populate("category")
            .populate("userId")
            .sort({ "rating.avgRating": -1 })
            .skip(parseInt((req.body.page - 1) * req.body.limit))
            .limit(parseInt(req.body.limit));;
        }
      } else if (req.body.sortBy == "2") {
        if (req.body.category !== "" && req.body.practiceArea === "") {
      
          expert = await expertUser
            .find({
              category: req.body.category,
              isApprovedByAdmin: true,
              isSubscribed: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("category")
            .populate("practiceArea")
            .populate(payload)
            .populate("userId")
            .sort({ noOfHoursOfSessionsDone: -1 })
            .skip(parseInt((req.body.page - 1) * req.body.limit))
            .limit(parseInt(req.body.limit));;
        } else if (req.body.category === "" && req.body.practiceArea !== "") {

          expert = await expertUser
            .find({
              practiceArea: req.body.practiceArea,
              isApprovedByAdmin: true,
              isSubscribed: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("category")
            .populate("practiceArea")
            .populate(payload)
            .populate("userId")
            .sort({ noOfHoursOfSessionsDone: -1 })
            .skip(parseInt((req.body.page - 1) * req.body.limit))
            .limit(parseInt(req.body.limit));;
        } else if (req.body.category !== "" && req.body.practiceArea !== "") {
 
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
            .populate(payload)
            .populate("userId")
            .sort({ noOfHoursOfSessionsDone: -1 })
            .skip(parseInt((req.body.page - 1) * req.body.limit))
            .limit(parseInt(req.body.limit));;
        } else {
          expert = await expertUser
            .find({
              isApprovedByAdmin: true,
              isSubscribed: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("category")
            .populate("practiceArea")
            .populate(payload)
            .populate("userId")
            .sort({ noOfHoursOfSessionsDone: -1 })
            .skip(parseInt((req.body.page - 1) * req.body.limit))
            .limit(parseInt(req.body.limit));;
        }
      }

      if (!expert) {
        throw Boom.badRequest("cannot find any expert");
      }
      let count= await expertUser.find({ status: APP_CONSTANTS.activityStatus.active, isSubscribed: true }).countDocuments();
      let tempobj = JSON.parse(JSON.stringify(expert));
      if(id){
      tempobj.map((ele)=>{
        if(ele.expertlisting.length>0&&ele.expertlisting){
          ele.isFavorite=true;
        }else{
          ele.isFavorite=false;
        }
      })
    }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "All experts online and filtered are",
          data: {
            list: tempobj,
            count: count,
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
 
      let aggregationQuery;
      let expert;


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

      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let start = req.body.startAppointmentTime, end = req.body.endAppointmentTime;
      let data = await appointment.find({
        startAppointmentTime: {
          $gte: start,
          $lt: end
        }
      })
      payload.userId = userId;
      
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
      let userId = req.user.id;
      let filterType = req.body.filterType;
      const schema = Joi.object({
        filterType: Joi.string(),
        limit: Joi.number(),
        page: Joi.number(),

      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let data;
      let count;
      let expert;

      // let start=req.body.startAppointmentTime,end= req.body.endAppointmentTime;
      if (filterType == "All") {
        data = await appointment.find({ userId: userId }).populate('userId').populate({ path: 'expertId', populate: { path: "userId practiceArea" } })
          .skip(parseInt((req.body.page - 1) * req.body.limit))
          .limit(parseInt(req.body.limit));
        //  expert=await expert.find({_id:data.expertId._id});
        count = await appointment.find({ userId: userId }).populate('userId').populate({ path: 'expertId', populate: { path: "userId practiceArea" } }).countDocuments()
      }
      else if (filterType == "Upcoming") {
        data = await appointment.find({ userId: userId, status: APP_CONSTANTS.appointmentStatus.confirmed }).populate('userId').populate({ path: 'expertId', populate: { path: "userId practiceArea" } }).populate('expertId.userId')
          .skip(parseInt((req.body.page - 1) * req.body.limit))
          .limit(parseInt(req.body.limit));
        count = await appointment.find({ userId: userId, status: APP_CONSTANTS.appointmentStatus.confirmed }).countDocuments();
      }
      else if (filterType == 'Reschedule') {
        data = await appointment.find({ userId: userId, status: APP_CONSTANTS.appointmentStatus.rescheduled }).populate('userId').populate({ path: 'expertId', populate: { path: "userId practiceArea" } })
          .skip(parseInt((req.body.page - 1) * req.body.limit))
          .limit(parseInt(req.body.limit));
        //  expert=await expert.find({_id:data.expertId._id});
        count = await appointment.find({ userId: userId, status: APP_CONSTANTS.appointmentStatus.rescheduled }).countDocuments()

      }
      else if (filterType == "Completed") {
        data = await appointment.find({
          userId: userId,
          status: APP_CONSTANTS.appointmentStatus.completed,

        }).populate('userId').populate({ path: 'expertId', populate: { path: "userId practiceArea" } })
          .skip(parseInt((req.body.page - 1) * req.body.limit))
          .limit(parseInt(req.body.limit));
        count = await appointment.find({
          userId: userId,
          status: APP_CONSTANTS.appointmentStatus.completed,

        }).countDocuments();
      }
      else if (filterType == "Cancelled") {
        data = await appointment.find({
          userId: userId, status: APP_CONSTANTS.appointmentStatus.cancelled,

        }).populate('userId').populate({ path: 'expertId', populate: { path: "userId practiceArea" } })
          .skip(parseInt((req.body.page - 1) * req.body.limit))
          .limit(parseInt(req.body.limit));

        count = await appointment.find({
          userId: userId,
          status: APP_CONSTANTS.appointmentStatus.cancelled,

        }).countDocuments()
      }

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Success",
          data: { list: data, count: count },
        },
        res
      );

    } catch (error) {
      return universalFunctions.sendError(error, res);
    }
  },
  cancelAppointment: async (req, res) => {
    try {
      let userId = req.user.id;

      let data;
      let expert;
      let deletedAppointment = await appointment.findByIdAndUpdate(req.params.id, { status: APP_CONSTANTS.appointmentStatus.cancelled })
  
      if (!deletedAppointment) {
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
      let userId = req.user.id;
  
      let data;
      let expert;
      let rescheduledAppointment = await appointment.findByIdAndUpdate(req.params.id, { status: APP_CONSTANTS.appointmentStatus.rescheduled })
 
      if (!rescheduledAppointment) {
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
  updateAppointment: async (req, res) => {

  },
  getTopExperts: async (req, res) => {
    try {
      let expert;

      expert = await expertUser
        .find({
          isApprovedByAdmin: true,

        })
        .populate("practiceArea")
        .populate("category")
        .populate("userId")
        .sort({ "rating.avgRating": -1 });

      if (!expert) {
        throw Boom.badRequest("cannot find any expert");
      }

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

  createTestimony: async (req, res) => {
    try {
      const schema = Joi.object({

        feedback: Joi.string(),
        name: Joi.string(),
        image: Joi.string().allow(""),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);

      let feedback = await Testimony.create({ feedback: req.body.feedback, name: req.body.name, image: req.body.image });
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
  getTestimonies: async (req, res) => {
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

      let feedback = await Testimony.find();
      if (!feedback) {
        throw Boom.badRequest("cannot find any testimony");
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "All testimonies are",
          data: feedback,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }


  },
  subscribeNewsletter: async (req, res) => {
    try {
      const schema = Joi.object({
        email: Joi.string().email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        }),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let subscribed = await Newsletter.findOneAndUpdate({ email: req.body.email },
        { $set: { email: req.body.email } },
        { upsert: true })
      if (!subscribed) {
        throw Boom.badRequest("cannot subscribe to newsletter");
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "newsletter subscribed",
          data: subscribed,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  getAvailableTimeForUser: async (req, res) => {
    try {

      let { expertId, appointmentDate, duration } = req.query;
      const expertTime = await expertTimeAvailable.find({
        $and: [
          {
            "expertId": expertId
          }, {
            "appointmentDate": appointmentDate,

          }, {
            "duration": duration
          }
        ]
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
        })
        if (data.length > 0) {
          e.avialble = false;
        } else {
          e.avialble = true;
        }
      })

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "expertTime found",
          data: tempobj,
        },
        res
      );

    } catch (error) {
      console.log(error)
      universalFunctions.sendError(error, res);
    }
  },
  bookChatAppointment: async (req, res) => {
    try {
      let userId = req.user.id;
      let payload = req.body;

      const schema = Joi.object({
        expertId: Joi.string().length(24).required(),
        question: Joi.string().allow("")
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      payload.userId = userId;
      let data = chatappointment.create(payload);
      if (!data) {
        throw Boom.badRequest("something is wrong ");
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
      console.log(error)
      universalFunctions.sendError(error, res);
    }
  },

  twilioVideoChatTokenUser: async (req, res) => {
  

    try {
      const schema = Joi.object({
        appointmentId: Joi.string().required(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let appointments = await appointment.findOne({ _id: req.body.appointmentId }).populate('userId');
    
      if (!appointments.videoChatId) {
    let     roomId = appointments.appointDateandTime + req.body.appointmentId;
      
        appointments = await appointment.findByIdAndUpdate({ _id: req.body.appointmentId }, { videoChatId: roomId }, { new: true }).populate('userId')
      }
    

      let videoGrant, chatGrant;
      videoGrant = new VideoGrant({room:appointments.videoChatId}  );
      chatGrant = new ChatGrant({
        serviceSid: Config.serviceSid,
      })
      let sid, participantId, convoId;
      
      const convo = await client.conversations.conversations.list();
      
      convo.forEach(con => {
        if (con.uniqueName == appointments.videoChatId)
          sid = con.sid;
      })
      if (!sid) {
        await client.conversations.v1.conversations.create({ friendlyName: appointments.videoChatId, uniqueName: appointments.videoChatId })
          .then(conversation => { console.log(conversation.sid); sid = conversation.sid; })
          .catch(error => { console.log(error, 'error') });
        if (!sid) {
          throw Boom.badRequest('Internal Server Error');
        }
      }

      convoId = sid;
      await client.conversations.conversations(convoId)
        .participants
        .create({ identity: appointments?.userId?.firstName+" "+appointments?.userId?.lastName})
        .then(participant => { console.log(participant.sid); participantId = participant.sid; })
        .catch(error => { console.log(error); });
        const token = new AccessToken(
          Config.twilioAccountSid,
          Config.twilioApiKey,
          Config.twilioApiSecret,
        );
      token.addGrant(videoGrant);
      token.addGrant(chatGrant);
      token.identity = appointments?.userId?.firstName+" "+appointments?.userId?.lastName;
   if(!token){
     throw Boom.badRequest("token not found")
    }
    
    universalFunctions.sendSuccess(
      {
        statusCode: 200,
  
        message: "Room successfully joined",
        data:{token:token.toJwt(),roomId:appointments.videoChatId,identity:appointments?.userId?.firstName+" "+appointments?.userId?.lastName}
      },
      res
    );

    }
    catch (error) {
      universalFunctions.sendError(error, res);
    }
  },

  twilioVideoChatTokenExpert: async (req, res) => {
  

    try {
      const schema = Joi.object({
        appointmentId: Joi.string().required(),
      
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let appointments = await appointment.findOne({ _id: req.body.appointmentId }).populate({path:'expertId',populate:{
      path:"userId"
    }
  });
      
      if (!appointments.videoChatId) {
        let roomId = appointments.appointDateandTime + req.body.appointmentId;
       
        appointments = await appointment.findByIdAndUpdate({ _id: req.body.appointmentId }, { videoChatId: roomId }, { new: true }).populate('expertId')
      }
      
     
      await universalFunctions.validateRequestPayload(req.body, res, schema);
  
      let videoGrant, chatGrant;
      videoGrant = new VideoGrant({room:appointments.videoChatId}  );
      chatGrant = new ChatGrant({
        serviceSid: Config.serviceSid,
      })
      let sid, participantId, convoId;
 
      const convo = await client.conversations.conversations.list();
      convo.forEach(con => {
        if (con.uniqueName == appointments.videoChatId)
          sid = con.sid;
      })
      if (!sid) {
        await client.conversations.v1.conversations.create({ friendlyName: appointments.videoChatId, uniqueName: appointments.videoChatId })
          .then(conversation => { console.log(conversation.sid); sid = conversation.sid; })
          .catch(error => { console.log(error, 'error') });
        if (!sid) {
          throw Boom.badRequest('Internal Server Error');
        }
      }
   
      convoId = sid;
      
      await client.conversations.conversations(convoId)
        .participants
        .create({ identity: appointments?.expertId?.userId?.firstName+" "+appointments?.expertId?.userId?.lastName })
        .then(participant => { console.log(participant.sid); participantId = participant.sid; })
        .catch(error => { console.log(error); });
        const token = new AccessToken(
          Config.twilioAccountSid,
          Config.twilioApiKey,
          Config.twilioApiSecret,
        );
      token.addGrant(videoGrant);
      token.addGrant(chatGrant);
      token.identity = appointments?.expertId?.userId?.firstName+" "+appointments?.expertId?.userId?.lastName;
   if(!token){
     throw Boom.badRequest("token not found")
    }
    
    universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: "Room successfully joined",
        data:{token:token.toJwt(),roomId:appointments.videoChatId,identity:appointments?.expertId?.userId?.firstName+" "+appointments?.expertId?.userId?.lastName}
      },
      res
    );

    }
    catch (error) {
      universalFunctions.sendError(error, res);
    }
  }, 
   getChatAppointment:async (req,res)=>{
    try{ 
      let id = req.user.id;
      let payload={
        userId:id
      }
      const chatappointmentdata = await chatappointment.find(payload).populate({ path: "userId expertId userId" });
      if (!chatappointmentdata) {
        throw Boom.badRequest("invalid id or token");
      }
      let tempobj = JSON.parse(JSON.stringify(chatappointmentdata));
      await universalFunctions.asyncForEach(tempobj,async ( e,index)=>{
        
        let expertData=await User.findOne({_id:e.expertId.userId});
        e.expertData=expertData;
    
      })
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Successfull get appointment",
          data: tempobj,
        },
        res
      );
    
    }catch(err){
      console.log(err)
      universalFunctions.sendError(err, res);  
    }
    },
   getFavExpert:async (req,res)=>{
    try{ 
      let id = req.user.id;
      let data =await expertUser.find().populate({ path: "expertlisting", 
         match:{
               userId: id,
  
         },
              });
   
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Successfull get ",
          data: data,
        },
        res
      );
    }catch(err){
      console.log(err)
      universalFunctions.sendError(err, res); 
    }
  },
  setFavExpert:async (req,res)=>{
    try {
      let userId = req.user.id;
      let {expertId,favourite } = req.body;
      let payload = {
        userId,
        expertId,
      };
      if (favourite===APP_CONSTANTS.checkfavExpert) {
        await favExpertModel.create(payload);
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
       let removeFavouriteExpert= await favExpertModel.deleteOne(payload)
        if (!removeFavouriteExpert)
        {
          throw Boom.badRequest("Expert Is Not Found"); 
        }
        universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Expert Remove To Favourite",
          data:removeFavouriteExpert
        },
        res
      );
      }
     
    }catch(err){
      console.log(err)
      universalFunctions.sendError(err, res); 
    }
  }

};



