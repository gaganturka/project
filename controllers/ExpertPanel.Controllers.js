const User = require("../models/User");
const borhanUser = require("../models/Borhan_User");
const expertUser = require("../models/Expert_User");
const appointmentModel = require("../models/Appointment");
const expertTimeAvailable = require("../models/ExpertTimeSlot");
const otpModel = require("../models/Otp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const Mongoose = require("mongoose");
const jwtFunction = require("../utils/jwtFunction");
const moment = require("moment");
const APP_CONSTANTS = require("../appConstants");
const AccessToken = require("twilio").jwt.AccessToken;
const { Config } = require("../config");
const VoiceResponse = require("twilio").twiml.VoiceResponse;
const { v4: uuidv4 } = require("uuid");
// const { admin } =require("../utils/pushNotification");
const VoiceGrant = AccessToken.VoiceGrant;
// const ThawaniClient = require("thawani-node");

// const api = new ThawaniClient({
//   secretKey: APP_CONSTANTS.thwani.testing_secret_key,
//   publishableKey: APP_CONSTANTS.thwani.testing_publishable_key,
//   dev: true,
// });
const thawaniHeader = {
  headers: { "thawani-api-key": APP_CONSTANTS.thwani.testing_secret_key },
};

const axios = require("axios");

const VideoGrant = AccessToken.VideoGrant;
const ChatGrant = AccessToken.ChatGrant;
const accountSid = Config.twilioAccountSid;
const authToken = Config.authToken;
const twilio = require("twilio");
const client = new twilio(accountSid, authToken);

// const User = require("../models/User");
const responseMessages = require("../resources/response.json");
const universalFunctions = require("../utils/universalFunctions");
const chatappointment = require("../models/ChatAppointment");

const Boom = require("boom");
const Appointment = require("../models/Appointment");
const { admin } = require("../utils/pushNotificationFirebase");
const { sendNotification } = require("../utils/sendNotification");

module.exports = {
  sendOtpExpertUser: async (req, res) => {
    try {
      const schema = Joi.object({
        mobileNo: Joi.string().min(10).required(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let mobileNo = req.body.mobileNo;
      let userLogin = await User.findOne({
        mobileNo: mobileNo,
        role: APP_CONSTANTS.role.expert,
      });
      if (!userLogin) {
        throw Boom.badRequest(responseMessages.USER_NOT_FOUND);
        // universalFunctions.sendError(
        //   {
        //     statusCode: 404,
        //     message: responseMessages.USER_NOT_FOUND,
        //   },
        //   res
        // );
        // throw Boom.badRequest(responseMessages.USER_NOT_FOUND);
      }
      let createOtp = Math.floor(100000 + Math.random() * 900000) + "";
      let isExits = await otpModel.findOne({ mobileNo: mobileNo });
      let otp;
      if (isExits) {
        otp = await otpModel.updateOne(
          {
            mobileNo: mobileNo,
          },
          { $set: { otp: createOtp } }
        );
      } else {
        otp = await otpModel.create({
          otp: createOtp,
          mobileNo: mobileNo,
        });
      }
      console.log("this is otp", createOtp);
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: responseMessages.SUCCESS,
          // data: otp,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },

  exportLogin: async (req, res) => {
    try {
      const schema = Joi.object({
        mobileNo: Joi.string().min(10).required(),
        token: Joi.string().allow(""),
        deviceType: Joi.string().allow(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let { mobileNo } = req.body;

      let users = await User.findOne({ mobileNo: mobileNo }).populate(
        "userData.data"
      );

      if (!users) {
        throw Boom.badRequest("expert not found");
      }
      if (
        users !== null &&
        users?.userData?.model !== APP_CONSTANTS.role.expert
      ) {
        throw Boom.badRequest("Invalid Credentials");
      }
      let newToken = [
        { deviceType: req.body.deviceType, deviceToken: req.body.token },
      ];

      // if (
      //   !users.customerId ||
      //   users.customerId === "" ||
      //   users.customerId === null
      // ) {
      //   const thawaniCustomer = await axios.post(
      //     `${APP_CONSTANTS.thwani.testing_url}/customers`,
      //     { client_customer_id: user._id },
      //     thawaniHeader
      //   );
  
      //   await User.findOneAndUpdate(
      //     { _id: user._id },
      //     { customerId: thawaniCustomer.data.data.id }
      //   );
      // }

      await User.findByIdAndUpdate(
        { _id: users._id },
        { $push: { token: newToken } }
      );

      const token = await jwtFunction.jwtGenerator(users._id);
      let userDetails = {
        token: token,
        _id: users._id,
      };

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: responseMessages.SUCCESS,
          data: userDetails,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  getExportUserDetail: async (req, res) => {
    try {
      let id = req.user.id;
      console.log("this is id ", id);
      const expert = await User.findOne({
        _id: id,
        // userId: Mongoose.Types.ObjectId(id),
      }).populate({ path: "userData.data" });
      if (!expert) {
        throw Boom.badRequest("invalid id or token");
      }

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "expert found",
          data: expert,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },

  getExpertUser: async (req, res) => {
    try {
      let id = req.expertId.id;
      const expert = await expertUser
        .findOne({ _id: id })
        .populate({ path: "category practiceArea" });
      if (!expert) {
        throw Boom.badRequest("invalid id or token");
      }

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "expert found",
          data: expert,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  updateExpertUser: async (req, res) => {
    try {
      console.log(req.user);
      let expertId = req.user.expertId;
      let {
        firstName,
        lastName,
        email,
        bio,
        getAudioFilePath,
        getVideoFilePath,
        profilePic,
      } = req.body;
      const schema = Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        }),
        expertId: Joi.string(),
        bio: Joi.string(),
        getAudioFilePath: Joi.string().allow(""),
        getVideoFilePath: Joi.string().allow(""),
        profilePic: Joi.string().allow(""),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);

      let id = req.user.id;
      let payload = {
        firstName,
        lastName,
        email,
        profilePic,
      };

      const expert = await User.findOneAndUpdate(
        {
          _id: id,
        },
        payload,
        {
          new: true,
        }
      );
      // console.log("this is expert id", bio);
      await expertUser.findOneAndUpdate(
        {
          _id: expertId,
        },
        {
          $set: {
            bio: bio,
            audioFilePath: getAudioFilePath,
            videoFilePath: getVideoFilePath,
          },
        },
        {
          new: true,
        }
      );
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "completely updateExpertUser expert",
          data: expert,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  getExpertUserInfoUsingUserModel: async (req, res) => {
    try {
      let id = req.user.id;
      const expert = await User.findOne({ _id: id }).populate({
        path: "userData.data",
        populate: { path: "category practiceArea" },
      });
      if (!expert) {
        throw Boom.badRequest("invalid id or token");
      }

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "expert found",
          data: expert,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  getExpertAppointment: async (req, res) => {
    try {
      let id = req.user.expertId;
      console.log(req.user.expertId);
      let currentTime = new Date();
      let pendingAppointment = await appointmentModel.updateMany(
        {
          expertId: id,
          status: APP_CONSTANTS.appointmentStatus.pending,
          endAppointmentTime: {
            $lt: currentTime.getTime(),
          },
        },
        { status: APP_CONSTANTS.appointmentStatus.cancelled }
      );

      let confirmedAppointment = await appointmentModel.updateMany(
        {
          expertId: id,
          status: APP_CONSTANTS.appointmentStatus.confirmed,
          endAppointmentTime: {
            $lt: currentTime.getTime(),
          },
        },
        { status: APP_CONSTANTS.appointmentStatus.cancelled }
      );

      const Appointment = await appointmentModel
        .find({ expertId: id })
        .populate({ path: "userId" })
        .skip(parseInt((req.body.page - 1) * req.body.limit))
        .limit(parseInt(req.body.limit))
        .sort({ startAppointmentTime: -1 });
      let count = await appointmentModel
        .find({ expertId: id })
        .countDocuments();
      if (!Appointment) {
        throw Boom.badRequest("invalid id or token");
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Appointment found",
          data: { list: Appointment, count: count },
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  getExpertAppointmentByFilter: async (req, res) => {
    try {
      let userId = req.user.id;
      let expertId = req.user.expertId;
      let filterType = req.body.filterType;
      const schema = Joi.object({
        filterType: Joi.string(),
        limit: Joi.number(),
        page: Joi.number(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let data;
      let count;
      let currentTime = new Date();
      let expert;
      let pendingAppointment = await appointmentModel.updateMany(
        {
          expertId,
          status: APP_CONSTANTS.appointmentStatus.pending,
          endAppointmentTime: {
            $lt: currentTime.getTime(),
          },
        },
        { status: APP_CONSTANTS.appointmentStatus.cancelled }
      );

      let confirmedAppointment = await appointmentModel.updateMany(
        {
          expertId,
          status: APP_CONSTANTS.appointmentStatus.confirmed,
          endAppointmentTime: {
            $lt: currentTime.getTime(),
          },
        },
        { status: APP_CONSTANTS.appointmentStatus.cancelled }
      );

      if (filterType == "Pending") {
        data = await appointmentModel
          .find({ expertId, status: APP_CONSTANTS.appointmentStatus.pending })
          .populate("userId")
          .populate({
            path: "expertId",
            populate: { path: "userId practiceArea" },
          })
          .skip(parseInt((req.body.page - 1) * req.body.limit))
          .limit(parseInt(req.body.limit))
          .sort({ startAppointmentTime: -1 });
        count = await appointmentModel
          .find({ expertId, status: APP_CONSTANTS.appointmentStatus.pending })
          .populate("userId")
          .populate({
            path: "expertId",
            populate: { path: "userId practiceArea" },
          })
          .countDocuments();
      } else if (filterType == "Upcoming") {
        let now = new Date();
        data = await appointmentModel
          .find({
            expertId,
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
          .skip(parseInt((req.body.page - 1) * req.body.limit))
          .limit(parseInt(req.body.limit))
          .sort({ startAppointmentTime: -1 });
        count = await appointmentModel
          .find({
            expertId,
            status: APP_CONSTANTS.appointmentStatus.confirmed,
            endAppointmentTime: {
              $gte: now.getTime(),
            },
          })
          .countDocuments();
      } else if (filterType == "Cancelled") {
        data = await appointmentModel
          .find({
            expertId,
            status: APP_CONSTANTS.appointmentStatus.cancelled,
          })
          .populate("userId")
          .populate({
            path: "expertId",
            populate: { path: "userId practiceArea" },
          })
          .skip(parseInt((req.body.page - 1) * req.body.limit))
          .limit(parseInt(req.body.limit))
          .sort({ startAppointmentTime: -1 });

        count = await appointmentModel
          .find({
            expertId,
            status: APP_CONSTANTS.appointmentStatus.cancelled,
          })
          .countDocuments();
      } else if (filterType == "rejected") {
        data = await appointmentModel
          .find({
            expertId,
            status: APP_CONSTANTS.appointmentStatus.rejected,
          })
          .populate("userId")
          .populate({
            path: "expertId",
            populate: { path: "userId practiceArea" },
          })
          .skip(parseInt((req.body.page - 1) * req.body.limit))
          .limit(parseInt(req.body.limit))
          .sort({ startAppointmentTime: -1 });

        count = await appointmentModel
          .find({
            expertId,
            status: APP_CONSTANTS.appointmentStatus.rejected,
          })
          .countDocuments();
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
      universalFunctions.sendError(error, res);
    }
  },
  updateAppointment: async (req, res) => {
    try {
      let appointmentId = req.body.id;
      let payload = req.body.payload;
      const Appointment = await appointmentModel.findByIdAndUpdate(
        { _id: appointmentId },
        { $set: payload },
        { new: true }
      );
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: responseMessages.SUCCESS,
          data: Appointment,
        },
        res
      );

      let userDetails = await User.findOne({ _id: Appointment.userId });

      if (payload.status == "confirmed") {
        await expertTimeAvailable.findOneAndUpdate(
          { _id: Appointment.timeSlotId },
          { isAvailable: false }
        );
        await sendNotification(userDetails, payload.status);
      } else {
        await sendNotification(userDetails, payload.status);

        await expertTimeAvailable.findOneAndUpdate(
          { _id: Appointment.timeSlotId },
          { isAvailable: true }
        );
      }
    } catch (error) {
      console.log(error);
      universalFunctions.sendError(error, res);
    }
  },
  cancelAppointmentByExpert: async (req, res) => {
    try {
      let appointmentId = req.body.id;
      let payload = req.body.payload;
      const Appointment = await appointmentModel.findByIdAndUpdate(
        { _id: appointmentId },
        { $set: { status: payload.status, isRejectedByExpert: true } },
        { new: true }
      );
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: responseMessages.SUCCESS,
          data: Appointment,
        },
        res
      );
      if (payload.status == "cancelled") {
        let userDetails = await User.findOne({ _id: Appointment.userId });
        await expertTimeAvailable.findOneAndUpdate(
          { _id: Appointment.timeSlotId },
          { isAvailable: true }
        );
        await sendNotification(userDetails, payload.status);
      }
    } catch (error) {
      console.log(error);
      universalFunctions.sendError(error, res);
    }
  },
  setAvailableByExpert: async (req, res) => {
    try {
      let id = req.user.expertId;
      let payload = req.body;
      payload.expertId = id;

      // console.log(payload,"here is body ")
      let start = payload.startAppointmentTime,
        end = payload.endAppointmentTime,
        appointmentDate = payload.appointmentDate;

      //  start =new Date(appointmentDate+' '+start);
      // console.log(localdate,"here is ");
      // console.log(moment.utc(moment(localdate)).format(),'start time 11')
      // start=moment.utc(moment(localdate)).format();

      // end =new Date(appointmentDate+' '+end);
      // console.log(end,'endddd',start,'starrtttt');
      // console.log(localdate ,new Date(localdate),"here is ");
      // console.log(moment.utc(moment(localdate)).format(),'start time')
      // end=moment.utc(moment(localdate)).format();

      let data = await expertTimeAvailable.find({
        $and: [
          {
            expertId: id,
          },
          {
            appointmentDate: new Date(appointmentDate),
          },
          {
            $or: [
              {
                $and: [
                  {
                    startAppointmentTime: {
                      $gt: new Date(start),
                    },
                  },
                  {
                    startAppointmentTime: {
                      $lte: new Date(end),
                    },
                  },
                ],
              },
              {
                $and: [
                  {
                    endAppointmentTime: {
                      $gt: new Date(start),
                    },
                  },
                  {
                    endAppointmentTime: {
                      $lte: new Date(end),
                    },
                  },
                ],
              },
              {
                $and: [
                  {
                    startAppointmentTime: {
                      $lt: new Date(start),
                    },
                  },
                  {
                    endAppointmentTime: {
                      $gt: new Date(end),
                    },
                  },
                ],
              },
            ],
          },
        ],
      });

      // console.log(data,"jhhjh")
      if (data.length > 0) {
        universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "expert is busy at is time ",
            data: data,
          },
          res
        );
      } else {
        payload.startAppointmentTime = start;
        payload.endAppointmentTime = end;
        const expertTime = await expertTimeAvailable.create(payload);
        if (!expertTime) {
          throw Boom.badRequest("invalid id or token");
        }
        universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "expertTime create",
            data: expertTime,
          },
          res
        );
      }
    } catch (error) {
      console.log(error);
      universalFunctions.sendError(error, res);
    }
  },
  getAvailableTimeForUser: async (req, res) => {
    try {
      let payload = req.body;
      console.log(payload, "here is body ");
      const expertTime = await expertTimeAvailable.find(payload);
      if (!expertTime) {
        throw Boom.badRequest("invalid id or token");
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "expertTime found",
          data: expertTime,
        },
        res
      );
    } catch (err) {
      console.log(error);
      universalFunctions.sendError(error, res);
    }
  },
  getChatAppointment: async (req, res) => {
    try {
      let id = req.user.expertId;
      let payload = {
        expertId: id,
      };
      const chatappointmentdata = await chatappointment
        .find(payload)
        .populate({ path: "userId expertId" });
      if (!chatappointmentdata) {
        throw Boom.badRequest("invalid id or token");
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Successfull get appointment",
          data: chatappointmentdata,
        },
        res
      );
    } catch (err) {
      console.log(err);
      universalFunctions.sendError(err, res);
    }
  },
  updateChatAppointment: async (req, res) => {
    try {
      let appointmentId = req.body.id;
      let payload = req.body.payload;
      console.log(payload, "here is body ");
      const updateChatAppointment = await chatappointment.findByIdAndUpdate(
        { _id: appointmentId },
        { $set: payload },
        { new: true }
      );
      if (!updateChatAppointment) {
        throw Boom.badRequest("invalid id or token");
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Appointment found",
          data: updateChatAppointment,
        },
        res
      );
    } catch (error) {
      console.log(error);
      universalFunctions.sendError(error, res);
    }
  },
  getChatAppointmentById: async (req, res) => {
    try {
      let id = req.query.id;
      // console.log(req.user ,'sscs');
      // console.log(req.query,'kjk');
      const chatappointmentdata = await chatappointment
        .findOne({ _id: id })
        .populate({ path: "userId expertId" });
      const expertProfileData = await User.findOne({
        _id: chatappointmentdata.expertId.userId,
      });
      if (!chatappointmentdata) {
        throw Boom.badRequest("invalid id or token");
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Successfull get appointment",
          data: { chatappointmentdata, expertProfileData },
        },
        res
      );
    } catch (err) {
      console.log(err);
      universalFunctions.sendError(err, res);
    }
  },

  setExpertStatus: async (req, res) => {
    try {
      let id = req.user.expertId;
      const schema = Joi.object({
        status: Joi.string(),
      });
      let { status } = req.body;
      let newStatus;
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      if (status === "Unavailable")
        newStatus = APP_CONSTANTS.activityStatus.unavailable;
      else if (status === "Active")
        newStatus = APP_CONSTANTS.activityStatus.active;
      else if (status === "Busy") newStatus = APP_CONSTANTS.activityStatus.busy;
      let expert = await expertUser.findByIdAndUpdate(
        { _id: id },
        { status: newStatus }
      );

      if (!expert) {
        throw Boom.badRequest("Expert not found");
      }

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Successfully changed status",
          data: { expert },
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  twilioVideoChatTokenExpert: async (req, res) => {
    try {
      const schema = Joi.object({
        appointmentId: Joi.string().required(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let appointments = await Appointment.findOne({
        _id: req.body.appointmentId,
      }).populate({
        path: "expertId",
        populate: {
          path: "userId",
        },
      });

      if (!appointments.videoChatId) {
        let roomId = appointments.appointDateandTime + req.body.appointmentId;

        appointments = await Appointment.findByIdAndUpdate(
          { _id: req.body.appointmentId },
          { videoChatId: roomId },
          { new: true }
        ).populate({ path: "expertId", populate: { path: "userId" } });
      }

      await universalFunctions.validateRequestPayload(req.body, res, schema);

      let videoGrant, chatGrant;
      videoGrant = new VideoGrant({ room: appointments.videoChatId });
      chatGrant = new ChatGrant({
        serviceSid: Config.serviceSid,
      });
      let sid, participantId, convoId;

      const convo = await client.conversations.conversations.list();
      convo.forEach((con) => {
        if (con.uniqueName == appointments.videoChatId) sid = con.sid;
      });
      if (!sid) {
        await client.conversations.v1.conversations
          .create({
            friendlyName: appointments.videoChatId,
            uniqueName: appointments.videoChatId,
          })
          .then((conversation) => {
            console.log(conversation.sid);
            sid = conversation.sid;
          })
          .catch((error) => {
            console.log(error, "error");
          });
        if (!sid) {
          throw Boom.badRequest("Internal Server Error");
        }
      }

      convoId = sid;

      await client.conversations
        .conversations(convoId)
        .participants.create({
          identity:
            "Expert " +
            appointments?.expertId?.userId?.firstName +
            " " +
            appointments?.expertId?.userId?.lastName +
            " ",
        })
        .then((participant) => {
          console.log(participant.sid);
          participantId = participant.sid;
        })
        .catch((error) => {
          console.log(error);
        });
      const token = new AccessToken(
        Config.twilioAccountSid,
        Config.twilioApiKey,
        Config.twilioApiSecret
      );
      token.addGrant(videoGrant);
      token.addGrant(chatGrant);
      token.identity =
        "Expert " +
        appointments?.expertId?.userId?.firstName +
        " " +
        appointments?.expertId?.userId?.lastName +
        " ";
      if (!token) {
        throw Boom.badRequest("token not found");
      }

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Room successfully joined",
          data: {
            token: token.toJwt(),
            roomId: appointments.videoChatId,
            identity:
              appointments?.expertId?.userId?.firstName +
              " " +
              appointments?.expertId?.userId?.lastName,
          },
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  sendPushNotificationChatRequest: async (req, res) => {
    try {
      // const schema = {
      // token:Joi.string(),
      // };
      // await universalFunctions.validateRequestPayload(req.body, res, schema);
      // let payload = req.body;
      let message;
      req.body.token.map(async (obj, index) => {
        if (obj.deviceType == "2") {
          message = {
            data: {
              title: "Expert accepted your chat request",
              body: `your request for chat room with our expert has been ${
                req.body.messageType == "1" ? "accepted" : "rejected"
              }`,
              type: "addProperty",
              // propertyId: payload.id,
              sound: "default",
            },
          };
        } else if (obj.deviceType == "3") {
          message = {
            notification: {
              title: "Expert accepted your chat request",
              body: `your request for chat room with our expert has been ${
                req.body.messageType == "1" ? "accepted" : "rejected"
              }`,
              type: "addProperty",
              // propertyId: payload.id,
              sound: "default",
              badge: "0",
            },
          };
        }

        var options = { priority: "high" };
        const firebaseFunction = await admin
          .messaging()
          .sendToDevice([obj.deviceToken], message, options);
        console.log("firebaseFunction", firebaseFunction);
      });

      return universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: `successfully send ${
            req.body.messageType == "1" ? "admission" : "rejection"
          } notification`,
          // data: firebaseFunction,
        },
        res
      );
    } catch (err) {
      console.log("+++++++++++++", err);
      return universalFunctions.sendError(err, res);
    }
  },

  twlioVoiceCallExpert: async (req, res) => {
    try {
      let id = req.user.expertId;
      const expert = await Expert_User.findOne({ _id: id }).populate({
        path: "userId",
      });

      let reqdAppointment = await appointmentModel
        .findOne({ _id: req.body.appointmentId })
        .populate({ path: "expertId", populate: { path: "userId" } })
        .populate("userId");
      let userIdentity =
        req.body.appointmentId +
        reqdAppointment.userId.firstName +
        reqdAppointment.userId.lastName +
        reqdAppointment.userId._id;
      let identity =
        req.body.appointmentId +
        reqdAppointment.expertId.userId.firstName +
        reqdAppointment.expertId.userId._id;

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
          statusCode: 200,
          message: "success",
          data: {
            identity: identity,
            token: accessToken.toJwt(),
            userIdentity,
          },
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },

  twilioVideoMarkComplete: async (req, res) => {
    try {
      let appointments = await appointmentModel.findByIdAndUpdate(
        { _id: req.body.appointmentId },
        {
          status: APP_CONSTANTS.appointmentStatus.completed,
        },
        { new: true }
      );

      if (!appointments) {
        throw Boom.badRequest("could not complete");
      }

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "success",
          data: {
            appointmentDetails: appointments,
          },
        },
        res
      );
    } catch (error) {
      throw universalFunctions.sendError(error, res);
    }
  },
  twilioAudioMarkComplete: async (req, res) => {
    try {
      let appointments = await appointmentModel.findByIdAndUpdate(
        { _id: req.body.appointmentId },
        {
          status: APP_CONSTANTS.appointmentStatus.completed,
        },
        { new: true }
      );

      if (!appointments) {
        throw Boom.badRequest("could not complete");
      }

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "success",
          data: {
            appointmentDetails: appointments,
          },
        },
        res
      );
    } catch (error) {
      throw universalFunctions.sendError(error, res);
    }
  },
  getSingleAppointment: async (req, res) => {
    try {
      let appointments = await appointmentModel.findOne({
        _id: req.body.appointmentId,
      });

      if (!appointments) {
        throw Boom.badRequest("no such appointment");
      }

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "success",
          data: {
            appointmentDetails: appointments,
          },
        },
        res
      );
    } catch (error) {
      throw universalFunctions.sendError(error, res);
    }
  },

  timeSlotsOfUserSingleDay: async (req, res) => {
    try {
      let { expertId, appointmentDate, duration } = req.query;
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
        ],
      });

      if (!expertTime) {
        throw Boom.badRequest("invalid id or token");
      }
      let tempobj = JSON.parse(JSON.stringify(expertTime));
      await universalFunctions.asyncForEach(tempobj, async (e, index) => {
        let data = await appointmentModel.find({
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
  deleteTimeSlot: async (req, res) => {
    try {
      // console.log("this is id"  , req.body.payload)
      let deleteTmeSlot = await expertTimeAvailable.deleteOne({
        _id: req.body.id,
      });
      return universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Delete Time Slot Success",
          data: deleteTmeSlot,
        },
        res
      );
    } catch (err) {
      return universalFunctions.sendError(err, res);
    }
  },
  setExpertPriceDetails: async (req, res) => {
    try {
      const schema = {
        priceDetails: Joi.array().items(
          Joi.object({
            pricePerMinuteOrSms: Joi.number(),
            discountPerMinuteOrSms: Joi.number(),
            callType: Joi.string().valid(
              APP_CONSTANTS.callType.audio.value,
              APP_CONSTANTS.callType.video.value,
              APP_CONSTANTS.callType.chat.value
            ),
          })
        ),
      };
      await universalFunctions.validateRequestPayload(req.body, res, schema);

      let expertData = await expertUser.findOneAndUpdate(
        { _id: req.user.expertId },
        { priceDetails: req.body.priceDetails }
      );
      console.log("expertDatahfjhfjfhfhfjfhf", expertData);
      if (!expertData) {
        throw Boom.notFound("Expert Not Found");
      }
      return universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Success",
          data: {},
        },
        res
      );
    } catch (err) {
      return universalFunctions.sendError(err, res);
    }
  },
  getExpertPriceDetails: async (req, res) => {
    try {
      let expertData = await expertUser
        .findOne({ _id: req.user.expertId })
        .select({ priceDetails: 1, _id: 0 });

      if (!expertData) {
        throw Boom.notFound("Expert Not Found");
      }
      return universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Success",
          data: expertData,
        },
        res
      );
    } catch (err) {
      return universalFunctions.sendError(err, res);
    }
  },
};
