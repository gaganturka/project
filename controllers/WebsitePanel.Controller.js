const User = require("../models/User");
const borhanUser = require("../models/Borhan_User");
const Newsletter = require('../models/NewsletterSubscribed')
const expertUser = require("../models/Expert_User");
const practiceArea = require("../models/Practice_Area");
const appointment = require("../models/Appointment")
// const expertTimeAvailable=require("../models/ExpertTimeSlot");
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
const VoiceResponse = require("twilio").twiml.VoiceResponse;
const { v4: uuidv4 } = require('uuid');
// const webpush = require('web-push');
const AccessToken = require("twilio").jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

const VideoGrant = AccessToken.VideoGrant;
const ChatGrant = AccessToken.ChatGrant;
const accountSid = Config.twilioAccountSid;
const authToken = Config.authToken;
const twilio = require('twilio');
const client = new twilio(accountSid, authToken);
const favExpertModel = require("../models/Fav_Expert");
const expertTimeAvailable = require("../models/ExpertTimeSlot");
const { isAValidPhoneNumber } = require("../utils/twilioFunctions");
const twilioFunctions=require('../utils/twilioFunctions');
const Expert_Rating = require("../models/Expert_Rating");
const publicVapidKey = 'BKjkBjs0NF8cLaPAYNKFWiGSBcau-q3poapqeXZhbPUfBacozebEplWJBFIes8FioqhMbdpIzYmUzxTdgdrLxXk';
const privateVapidKey = '_7Xt1bP-K_ckzykka6TX536RB6pX0v8i0SeaLO7W-iw';
const {admin}=require("../utils/pushNotificationFirebase")
// const {admin}=require("../config");
// var admin = require("firebase-admin");
// var serviceAccount = require('../borhan-33e53-firebase-adminsdk-rf954-937a2c2dd8.json');
const Expert_User = require("../models/Expert_User");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   // databaseURL: Config.get("db.firebaseDatabaseUrl"),
// });
// var admin = require("firebase-admin");
// var serviceAccount = require('../borhan-33e53-firebase-adminsdk-rf954-937a2c2dd8.json');
// const Expert_User = require("../models/Expert_User");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   // databaseURL: Config.get("db.firebaseDatabaseUrl"),
// });
// const privateVapidKey = ;

// Replace with your email
// webpush.setVapidDetails('mailto:test.seraphic15@gmail.com', 'BKjkBjs0NF8cLaPAYNKFWiGSBcau-q3poapqeXZhbPUfBacozebEplWJBFIes8FioqhMbdpIzYmUzxTdgdrLxXk','_7Xt1bP-K_ckzykka6TX536RB6pX0v8i0SeaLO7W-iw');
module.exports = {
  sendNotificaton:async (req, res) => {
    const subscription = await registration.pushManager.
    subscribe({
      userVisibleOnly: true,
      // The `urlBase64ToUint8Array()` function is the same as in
      // https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
  //  const subscription = "hello";
    res.status(201).json({});
    // const payload = JSON.stringify({ title: 'test' });
    const payload="Test";
    // console.log(subscription);
  
    webpush.sendNotification(subscription, payload).catch(error => {
      console.error(error.stack);
    });
  },
  
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
        mobileNo: Joi.string().min(10).required(),
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
      console.log(req.body.search)
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
        search:  Joi.string().allow("").optional(""),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let expert=[],total;
      let filter={};        
      if (req.body.sortBy == "1") {
        if (req.body.practiceArea !== "") {
      
          expert = await expertUser
            .find({
              // category: req.body.category,
              isApprovedByAdmin: true,
              status: APP_CONSTANTS.activityStatus.active,
              practiceArea: req.body.practiceArea,

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
              category: req.body.practiceArea,
              isApprovedByAdmin: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
           .countDocuments();
        } 
        else
        {   
          if (req.body.search) {
         
            filter["$or"] = [
              { firstName: { $regex: req.body.search, $options: "i" } }
            ];
           } 
         let allExportDatas = await expertUser
          .find({ isApprovedByAdmin: true })
          .populate("practiceArea")
          .populate("category")
          .populate(payload)
          .populate({ path: "userId", match: filter })
          .sort({ "rating.avgRating": -1 })
          let expertArray=[];
          allExportDatas.map((ele)=>{
            if(ele.userId !==null)
            {
              expertArray.push(ele);
            }
          })
            let i;
              for(i=parseInt((req.body.page - 1) * req.body.limit);i<parseInt((req.body.page - 1) * req.body.limit)+req.body.limit;i++)
              {
                if(expertArray[i]!=null)
                expert.push(expertArray[i]);
              }
            }
            
      }     
      else if (req.body.sortBy == "2") {
        if (req.body.practiceArea !== "") {
      
          expert = await expertUser
            .find({
              // category: req.body.category,
              isApprovedByAdmin: true,
              status: APP_CONSTANTS.activityStatus.active,
              practiceArea: req.body.practiceArea,
              // category:req.body.category,

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
              category: req.body.practiceArea,
              isApprovedByAdmin: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
           .countDocuments();
        }     
         else {
          
          expert = await expertUser
            .find({
              isApprovedByAdmin: true,
              status: APP_CONSTANTS.activityStatus.active,
            })
            .populate("category")
            .populate("practiceArea")
            .populate({path:"userId",match: filter})
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
      // console.log("this is temp" , tempobj)

      if(id){
      tempobj.map((ele)=>{
        if(ele.expertlisting && ele.expertlisting.length>0&&ele.expertlisting){
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
      console.log("this is practice area" , practiceAreaData)
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
        status:{$nin:[ APP_CONSTANTS.appointmentStatus.rejected, APP_CONSTANTS.appointmentStatus.cancelled]},
        startAppointmentTime: {
          $gte: start,
          $lte: end
        },
        expertId:payload.expertId,
        appointmentDate:payload.appointmentDate
      })
      payload.userId = userId;
      // console.log(data,'daaaaattaa')
      if(data.length>0)
      {
        throw Boom.badRequest('already an appointment at this time');
      }
      let createAppointment = await appointment.create(payload);
      await expertTimeAvailable.findOneAndUpdate({_id:createAppointment.timeSlotId},{isAvailable:false});
       let expertDetail=await  expertUser.findOne({_id:req.body.expertId}).populate("userId") 
     let  message = {
      notification: {
          title:  APP_CONSTANTS.pushNotificationMessage.title,
          body: APP_CONSTANTS.pushNotificationMessage.bookAppointementsMessage,
        },
      }
       let registrationTokens = [];
       expertDetail &&expertDetail.userId&&
       expertDetail.userId.token &&
       expertDetail.userId.token.map((val1) => {
           registrationTokens.push(val1.deviceToken);
         });
          admin
           .messaging()
           .sendToDevice(registrationTokens, message)
           .then((response) => {
            console.log("this is response" , response)
             return universalFunctions.sendSuccess(
               {
                 statusCode: 200,
                 message: responseMessages.SUCCESS,
                 data: response,
               },
               res
             );
           })
           .catch((error) => {
             console.log("Error sending message:", error);
           });
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
      let currentTime =new Date();
      let expert;
        let pendingAppointment=await appointment.updateMany({userId:userId,status: APP_CONSTANTS.appointmentStatus.pending,endAppointmentTime: {
          $lt: currentTime.getTime()
        }},{status: APP_CONSTANTS.appointmentStatus.cancelled});

        let confirmedAppointment=await appointment.updateMany({userId:userId,status: APP_CONSTANTS.appointmentStatus.confirmed,endAppointmentTime: {
          $lt: currentTime.getTime()
        }},{status: APP_CONSTANTS.appointmentStatus.cancelled});
        
      // let start=req.body.startAppointmentTime,end= req.body.endAppointmentTime;
      if (filterType == "All") {
        data = await appointment.find({ userId: userId }).populate('userId').populate({ path: 'expertId', populate: { path: "userId practiceArea" } })
          .skip(parseInt((req.body.page - 1) * req.body.limit))
          .limit(parseInt(req.body.limit))
          .sort({'startAppointmentTime':-1});
        //  expert=await expert.find({_id:data.expertId._id});
        count = await appointment.find({ userId: userId }).populate('userId').populate({ path: 'expertId', populate: { path: "userId practiceArea" } }).countDocuments()
      }
      else if (filterType == "Upcoming") {
        let now =new Date();
        data = await appointment.find({ userId: userId, status: APP_CONSTANTS.appointmentStatus.confirmed,endAppointmentTime: {
          $gte: now.getTime()
        } }).populate('userId').populate({ path: 'expertId', populate: { path: "userId practiceArea" } }).populate('expertId.userId')
          .skip(parseInt((req.body.page - 1) * req.body.limit))
          .limit(parseInt(req.body.limit))
          .sort({'startAppointmentTime':-1});
        count = await appointment.find({ userId: userId, status: APP_CONSTANTS.appointmentStatus.confirmed,endAppointmentTime: {
          $gte: now.getTime()
        } }).countDocuments();
      }
      else if (filterType == 'Reschedule') {
        let now=new Date();
        data = await appointment.find({ userId: userId, isRescheduled:true }).populate('userId').populate({ path: 'expertId', populate: { path: "userId practiceArea" } })
          .skip(parseInt((req.body.page - 1) * req.body.limit))
          .limit(parseInt(req.body.limit))
          .sort({'startAppointmentTime':-1});
        //  expert=await expert.find({_id:data.expertId._id});
        count = await appointment.find({ userId: userId, isRescheduled:true
       }).countDocuments()

      }
      else if (filterType == "Completed") {
        data = await appointment.find({
          userId: userId,
          status: APP_CONSTANTS.appointmentStatus.completed,

        }).populate('userId').populate({ path: 'expertId', populate: { path: "userId practiceArea" } })
          .skip(parseInt((req.body.page - 1) * req.body.limit))
          .limit(parseInt(req.body.limit))
          .sort({'startAppointmentTime':-1});
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
          .limit(parseInt(req.body.limit))
          .sort({'startAppointmentTime':-1});

        count = await appointment.find({
          userId: userId,
          status: APP_CONSTANTS.appointmentStatus.cancelled,

        }).countDocuments()
      }
      else if (filterType == "rejected") {
        data = await appointment.find({
          userId: userId, status: APP_CONSTANTS.appointmentStatus.rejected,

        }).populate('userId').populate({ path: 'expertId', populate: { path: "userId practiceArea" } })
          .skip(parseInt((req.body.page - 1) * req.body.limit))
          .limit(parseInt(req.body.limit))
          .sort({'startAppointmentTime':-1});

        count = await appointment.find({
          userId: userId,
          status: APP_CONSTANTS.appointmentStatus.rejected,

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
      let deletedAppointment = await appointment.findByIdAndUpdate(req.params.id, { status: APP_CONSTANTS.appointmentStatus.cancelled ,isRejectedByUser:true})
      if (!deletedAppointment) {
        throw Boom.badRequest("cannot find any appointment to delete");
      }
    //  console.log("this is delete appoi" ,deletedAppointment )
     let expertDetail=await  expertUser.findOne({_id:deletedAppointment.expertId}).populate("userId") 
     let  message = {
      notification: {
          title:  APP_CONSTANTS.pushNotificationMessage.title,
          body: APP_CONSTANTS.pushNotificationMessage.WhenUserCancelsAnAppointment,
        },
      }
      // console.log("this is cancel appoints" ,message )
       let registrationTokens = [];
       expertDetail &&expertDetail.userId&&
       expertDetail.userId.token &&
       expertDetail.userId.token.map((val1) => {
           registrationTokens.push(val1.deviceToken);
         });
          admin
           .messaging()
           .sendToDevice(registrationTokens, message)
           .then((response) => {
            console.log("this is response" , response)
             return universalFunctions.sendSuccess(
               {
                 statusCode: 200,
                 message: responseMessages.SUCCESS,
                 data: response,
               },
               res
             );
           })
           .catch((error) => {
             console.log("Error sending message:", error);
           });

      // universalFunctions.sendSuccess(
      //   {
      //     statusCode: 200,
      //     message: "Success",
      //     data: data,
      //   },
      //   res
      // );

    } catch (error) {
      return universalFunctions.sendError(error, res);
    }
  },
  rescheduleAppointment: async (req, res) => {
    try {
      let userId = req.user.id;
      // let userId = req.user.id;
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
        isRescheduled: Joi.boolean(),
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
      let expert;
      let rescheduledAppointment = await appointment.findByIdAndUpdate(req.body.appointmentId, payload,{new:true} );
 
      if (!rescheduledAppointment) {
        throw Boom.badRequest("cannot find any appointment to reschedule");
      }
      let expertDetail=await  expertUser.findOne({_id:req.body.expertId}).populate("userId") 
     let  message = {
      notification: {
          title:  APP_CONSTANTS.pushNotificationMessage.title,
          body: APP_CONSTANTS.pushNotificationMessage. WhenUserRequestsToRescheduleAnAppointment,
        },
      }
       let registrationTokens = [];
       expertDetail &&expertDetail.userId&&
       expertDetail.userId.token &&
       expertDetail.userId.token.map((val1) => {
           registrationTokens.push(val1.deviceToken);
         });
          admin
           .messaging()
           .sendToDevice(registrationTokens, message)
           .then((response) => {
            console.log("this is response" , response)
             return universalFunctions.sendSuccess(
               {
                 statusCode: 200,
                 message: responseMessages.SUCCESS,
                 data: response,
               },
               res
             );
           })
           .catch((error) => {
             console.log("Error sending message:", error);
           });


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
  // updateAppointment: async (req, res) => {

  // },
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
      let curentdate=new Date();
    
      const expertTime = await expertTimeAvailable.find({
        $and: [
          {
            "expertId": expertId
          }, {
            "appointmentDate": appointmentDate,

          }, {
            "duration": duration
          },
          {
          startAppointmentTime: {
            $gte: curentdate,
            
          }
        },
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
          
          
        });
        // if (data.length > 0) {
        //   e.avialble = false;
        // } else {
        //   e.avialble = true;
        // }
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
      let chats=await chatappointment.findOne({expertId:req.body.expertId,userId});
      if(!chats)
      {
      let data =await chatappointment.create(payload);
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
      }
      else
      {
          
            universalFunctions.sendSuccess(
              {
                statusCode: 200,
                message: "You already have a chat room",
                data: chats,
              },
              res
            );
            
          
          
         
      }
      

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
      let roomSid;
      client.video.rooms(appointments.videoChatId)
            .fetch()
            .then(room =>{ console.log(room, 'videoroom');roomSid=room.sid});

      let sid, participantId, convoId;
      
      const convo = await client.conversations.conversations.list();
      
      convo.forEach(con => {
        if (con.uniqueName == appointments.videoChatId)
          {sid = con.sid;
          // console.log('room sid',sid);
          }
      })
      if (!sid) {
        await client.conversations.v1.conversations.create({ friendlyName: appointments.videoChatId, uniqueName: appointments.videoChatId })
          .then(conversation => { console.log(conversation.sid,'csid'); sid = conversation.sid; })
          .catch(error => { console.log(error, 'error') });
        if (!sid) {
          throw Boom.badRequest('Internal Server Error');
        }
      }

      convoId = sid;
      await client.conversations.conversations(convoId)
        .participants
        .create({ identity: appointments?.userId?.firstName+" "+appointments?.userId?.lastName})
        .then(participant => { console.log(participant.sid,'psid'); participantId = participant.sid; })
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
        data:{token:token.toJwt(),roomSid:roomSid,roomId:appointments.videoChatId,identity:appointments?.userId?.firstName+" "+appointments?.userId?.lastName,expertId:appointments.expertId}
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
      let data =await expertUser.find({isApprovedByAdmin:true}).populate({ path: "expertlisting", 
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
      let {expertId,favourite,expertUserId } = req.body;
      let payload = {
        userId,
        expertId, 
        expertUserId,
      };
      if (favourite===APP_CONSTANTS.checkfavExpert) {
     let isExist= await favExpertModel.findOne({userId:userId,expertId:expertId})
     if(isExist)
     {
      await favExpertModel.deleteOne({userId:userId,expertId:expertId}) 
     }
    else
     {
        await favExpertModel.create(payload);
         
     }
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
  },


  getUsersFavoriteExperts:async (req,res)=>{
    try{ 
      let id = req.user.id;
      let data =await favExpertModel.find({userId:id})
      .populate( "expertUserId").populate('expertId');
   
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Successfully got your fav experts ",
          data: data,
        },
        res
      );
    }catch(err){
      console.log(err)
      universalFunctions.sendError(err, res); 
    }
  },

  twlioVoiceCallUser: async (req,res)=>{
    try{
      let id=req.user.id;
      const user=await User.findOne({_id:id});

    let  identity =req.body.appointmentId+ user.firstName+user.lastName+user._id;
    let reqdAppointment=await appointment.findOne({_id:req.body.appointmentId}).populate({path:'expertId', populate: { path: "userId" }});
    let expertIdentity=
    // uuidv4();
    req.body.appointmentId+ reqdAppointment.expertId.userId.firstName +reqdAppointment.expertId.userId._id;
  const accessToken = new AccessToken(
    accountSid,
    Config.twilioApiKey,
    Config.twilioApiSecret
  );
  accessToken.identity = identity;
  const grant = new VoiceGrant({
    outgoingApplicationSid: Config.twiMLSID,
    incomingAllow: true,
  });
  accessToken.addGrant(grant);

  // Include identity and token in a JSON response
   universalFunctions.sendSuccess(
     {
         statusCode:200,
         message:'success',
         data:{
          identity: identity,
          token: accessToken.toJwt(),
          expertIdentity,
          expertId:reqdAppointment.expertId._id
         }
     },
     res
   )
    
    }
    catch(error)
    {
      universalFunctions.sendError(error,res);
    }
  },
  
  twilioVoiceResponse:async(req,res)=>{

    try{

      const toNumberOrClientName = req.body.To;
      const callerId = Config.callerId;
      let twiml = new VoiceResponse();
      //  console.log(req.body,'ssadfdsasdfasadfdsfa');
      // If the request to the /voice endpoint is TO your Twilio Number, 
      // then it is an incoming call towards your Twilio.Device.
      if (toNumberOrClientName == callerId) {
        let dial = twiml.dial();
    
        // This will connect the caller with your Twilio.Device/client 
        dial.client(identity);
    
      } else if (req.body.To) {
        // This is an outgoing call
    
        // set the callerId
        let dial = twiml.dial({ callerId });
    
        // Check if the 'To' parameter is a Phone Number or Client Name
        // in order to use the appropriate TwiML noun 
        const attr = twilioFunctions.isAValidPhoneNumber(toNumberOrClientName)
          ? "number"
          : "client";
        dial[attr]({}, toNumberOrClientName);
      } else {
        twiml.say("Thanks for calling!");
      }
    
  res.set("Content-Type", "text/xml");
  res.send(twiml.toString());
    
    }
    catch(error)
    {
      universalFunctions.sendError(error,res);
    }
  },
  twilioVideoCallback: async (req,res)=>{
    try{
     
      console.log(req.body,'req.body from twilio Video');
    }
    catch(error)
    {
      universalFunctions.sendError(error,res);
    }
  },
  CheckExpertIsAlreadyRated:async (req,res)=>{
    try{
let id=req.user.id;
     let rating= Expert_Rating.findOne({userId:id,expertId:req.body.expertId});
     let isRated=false;
     if(rating)
     {
       isRated=true;
     }

     universalFunctions.sendSuccess({
      statusCode:200,
      message:'success',
      data:{
       isRated:isRated
      }
  },
  res
     )
    }
    catch(error)
    {
      universalFunctions.sendError(error,res);
    }
  },
  
  

};



