const User = require("../models/User");
const borhanUser = require("../models/Borhan_User");
const expertUser = require("../models/Expert_User");
const otpModel = require("../models/Otp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Config } = require("../config");
const Joi = require("@hapi/joi");
const APP_CONSTANTS = require("../appConstants");
import responseMessages from "../resources/response.json";

const Boom = require("boom");
import universalFunctions from "../utils/universalFunctions";

module.exports = {
  otpGeneration: async (req, res) => {
    try {
      const schema = Joi.object({
        mobileNo: Joi.string().min(10).max(10).required(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let refId = Math.floor(100000 + Math.random() * 900000) + "";
      const otpexists = await otpModel.findOne({ mobileNo: req.body.mobileNo });
      if (otpexists) {
        throw Boom.badRequest("User already exists please try login in");
      }
      await otpModel.create({ otp: refId, mobileNo: req.body.mobileNo });
      console.log("generated otp is   ", refId);
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "otp is generated",
        },
        res
      );
    } catch (err) {
      universalFunctions.sendError(err, res);
    }
  },
  otpSenderToFrontend: async (req, res) => {
    try {
      const schema = Joi.object({
        mobileNo: Joi.string().min(10).max(10).required(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      // let refId = Math.floor(100000 + Math.random() * 900000);
      let otpmodel = await otpModel.findOne({ mobileNo: req.body.mobileNo });
      console.log("your otp is ", otpmodel.otp);

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "otp is",
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
        otp: Joi.string(),
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
        if (user.role === APP_CONSTANTS.role.borhanuser) {
          throw Boom.badRequest(responseMessages.USER_EXISTS);
        } else {
          console.log("otppppforuser", user.otp);
          // if (user.otp !== req.body.otp) {
          //   throw Boom.badRequest(responseMessages.INVALID_OTP);
          // }
          if(req.body.otp!=="999999")
      {
        throw Boom.badRequest(responseMessages.INVALID_OTP);
      }
          let borhanuser = await borhanUser.create({
            isSubscribed: false,
            balance: 0,
            userId: user._id,
          });
          const token = jwt.sign(
            { user_id: user._id, email: user.email, mobileNo: user.mobileNo },
            Config.jwtsecret
          );
          universalFunctions.sendSuccess(
            {
              statusCode: 200,
              message: "User created",
              data: token,
            },
            res
          );
        }
      }
      // let otpmodel = await otpModel.findOne({ mobileNo: req.body.mobileNo });
      // console.log(otpmodel?.otp,"adsfakweni   ",req.body.otp);
      console.log("phone numder   ", req.body.mobileNo);
      // if (req.body.otp !== otpmodel.otp) {
      //   throw Boom.badRequest(responseMessages.INVALID_OTP);
      // }
      if(req.body.otp!=="999999")
      {
        throw Boom.badRequest(responseMessages.INVALID_OTP);
      }
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
        otp: "",
      });
      await borhanUser.findByIdAndUpdate(borhanuser._id, { userId: user._id });

      console.log(user);
      console.log(res.json, "jwttoken");

      const token = jwt.sign(
        { user_id: user._id, email: user.email, mobileNo: user.mobileNo },
        Config.jwtsecret
      );
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "User created",
          data: token,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  createExpertUser: async (req, res) => {
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
        profilePic: Joi.string().optional().allow(""),
        category: Joi.string(),
        practiceArea: Joi.string(),
        bio: Joi.string().allow(""),
        audioFilePath: Joi.string().allow(""),
        videoFilePath: Joi.string().allow(""),
        accountType: Joi.string(),
        document: Joi.array().items({
          fileName: Joi.string().allow(""),
          fileType: Joi.string().allow(""),
          link: Joi.string().allow(""),
          mimeType: Joi.string().allow(""),
        }),
        bankName: Joi.string(),
        accountType: Joi.string(),
        otp: Joi.string(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);

      // const result=await schema.validateAsync(req.body);
      // console.log(req.body,"hello",req.file);
      // let success = false;

      // checks whether the mobileno has already been created

      let user = await User.findOne({ mobileNo: req.body.mobileNo });

      // console.log('The fetched user - ', user);
      // console.log('######################################################');
      if (user !== null) {
        if (user.role === APP_CONSTANTS.role.expert) {
          throw Boom.badRequest(responseMessages.USER_EXISTS);
        } else {
          // if (user.otp !== req.body.otp) {
          //   throw Boom.badRequest(responseMessages.INVALID_OTP);
          // }
          if(req.body.otp!=="999999")
      {
        throw Boom.badRequest(responseMessages.INVALID_OTP);
      }
          let expertUserr = await expertUser.create({
            isSubscribed: false,
            category: req.body.category,
            practiceArea: req.body.practiceArea,
            bio: req.body.bio,
            audioFilePath: req.body.audioFilePath,
            videoFilePath: req.body.videoFilePath,
            document: [
              {
                fileName: req.body.document[0].fileName,
                fileType: req.body.document[0].fileType,
                link: req.body.document[0].path,
                mimeType: req.body.document[0].mimeType,
              },
            ],
            accountType: req.body.accountType,
            rating: { noOfRating: 0, ratingCount: 0, avgRating: 0 },
          });
          await expertUser.findByIdAndUpdate(expertUserr._id, {
            userId: user._id,
          });
          const token = jwt.sign(
            { user_id: user._id, email: user.email, mobileNo: user.mobileNo },
            Config.jwtsecret
          );

          universalFunctions.sendSuccess(
            {
              statusCode: 200,
              message: "User created",
              data: token,
            },
            res
          );
        }
      }
      // console.log(req.body,"iaenienwieioafeniaaaaa")
      // console.log('######################################################');
      // console.log(req.body.document,"adklgjnaeionianeiondiarrrrrrrrrr");
      // const otpmodel = await otpModel.findOne({ mobileNo: req.body.mobileNo });
      // if (otpmodel.otp !== req.body.otp) {
      //   throw Boom.badRequest(responseMessages.INVALID_OTP);
      // }
      if(req.body.otp!=="999999")
      {
        throw Boom.badRequest(responseMessages.INVALID_OTP);
      }
      let expertUserr = await expertUser.create({
        isSubscribed: false,
        category: req.body.category,
        practiceArea: req.body.practiceArea,
        bio: req.body.bio,
        audioFilePath: req.body.audioFilePath,
        videoFilePath: req.body.videoFilePath,
        document: req.body.document,
        accountType: req.body.accountType,
        rating: { noOfRating: 0, ratingCount: 0, avgRating: 0 },
      });
      // console.log('The created expert - ',expertUserr);
      // console.log('######################################################');

      user = await User.create({
        firstName: req.body.firstName,
        email: req.body.email,
        mobileNo: req.body.mobileNo,
        lastName: req.body.lastName,
        profilePic: req.body.profilePic,
        isEmailVerified: false,
        role: APP_CONSTANTS.role.expert,
        userData: {
          model: APP_CONSTANTS.role.expert,
          data: expertUserr._id,
        },
        otp: "",
      });
      await expertUser.findByIdAndUpdate(expertUserr._id, { userId: user._id });
      // console.log(expertUserr,"eexxpperrttusseerr");
      // console.log('Namaste - ',user);
      // console.log('######################################################');
      const token = jwt.sign(
        { user_id: user._id, email: user.email, mobileNo: user.mobileNo },
        Config.jwtsecret
      );
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Expert User created",
          data: token,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  login: async (req, res) => {
    try {
      //  console.log('thid odi bpody - ', req.file, req.files)
      const schema = Joi.object({
        mobileNo: Joi.string().min(10).max(10).required(),
        otp: Joi.string(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);

      // checks whether the mobileno has already been created

      let user = await User.findOne({ mobileNo: req.body.mobileNo });
      // console.log(user,APP_CONSTANTS.role.borhanuser,us)
      if (user !== null) {
        // if (user.otp !== req.body.otp) {
        //   throw Boom.badRequest(responseMessages.INVALID_OTP);
        // }
        if(req.body.otp!=="999999")
        {
          throw Boom.badRequest(responseMessages.INVALID_OTP);
        }
        const token = jwt.sign(
          { user_id: user._id, email: user.email, mobileNo: user.mobileNo },
          Config.jwtsecret
        );
        if (user.role === APP_CONSTANTS.role.borhanuser) {
          universalFunctions.sendSuccess(
            {
              statusCode: 200,
              message: "You are signed in as borhan user",
              data: token,
            },
            res
          );
        } else if (user.role === APP_CONSTANTS.role.expert) {
          universalFunctions.sendSuccess(
            {
              statusCode: 200,
              message: "You are signed in as expert",
              data: token,
            },
            res
          );
        }
      } else {
        throw Boom.badRequest(responseMessages.USER_NOT_FOUND);
      }
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  adminLogin: async (req, res) => {
    try {
      //  console.log('thid odi bpody - ', req.file, req.files)
      const schema = Joi.object({
        email: Joi.string().email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        }),
        password: Joi.string(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      // console.log(req.body,"hello",req.file);

      // checks whether the mobileno has already been created

      let user = await User.findOne({ email: req.body.email });
      const token = jwt.sign(
        { user_id: user._id, email: req.body.email, mobileNo: user.mobileNo },
        Config.jwtsecret
      );

      // console.log(user,APP_CONSTANTS.role.borhanuser,us)
      if (user !== null) {
        if (
          user.role === APP_CONSTANTS.role.admin &&
          user.password === req.body.password
        ) {
          universalFunctions.sendSuccess(
            {
              statusCode: 200,
              message: "You are signed in as admin",
              data: token,
            },
            res
          );
        }
        else{
          throw Boom.badRequest("invalid credentials");
        }
      } else {
        throw Boom.badRequest(responseMessages.USER_NOT_FOUND);
      }
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  createExpertUserByAdmin: async (req, res) => {
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
        profilePic: Joi.string().optional().allow(""),
        category: Joi.string(),
        practiceArea: Joi.string(),
        bio: Joi.string().allow(""),
        audioFilePath: Joi.string().allow(""),
        videoFilePath: Joi.string().allow(""),
        accountType: Joi.string(),
        document: Joi.array().items({
          fileName: Joi.string().allow(""),
          fileType: Joi.string().allow(""),
          link: Joi.string().allow(""),
          mimeType: Joi.string().allow(""),
        }),
        bankName: Joi.string(),
        accountType: Joi.string(),
        otp: Joi.string(),
        experience: Joi.number(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);

      // checks whether the mobileno has already been created

      let user = await User.findOne({ mobileNo: req.body.mobileNo });

      // console.log('The fetched user - ', user);
      // console.log('######################################################');
      if (user !== null) {
        if (user.role === APP_CONSTANTS.role.expert) {
          throw Boom.badRequest(responseMessages.USER_EXISTS);
        } else {
          let expertUserr = await expertUser.create({
            isSubscribed: false,
            category: req.body.category,
            practiceArea: req.body.practiceArea,
            bio: req.body.bio,
            audioFilePath: req.body.audioFilePath,
            videoFilePath: req.body.videoFilePath,
            document: [
              {
                fileName: req.body.document[0].fileName,
                fileType: req.body.document[0].fileType,
                link: req.body.document[0].path,
                mimeType: req.body.document[0].mimeType,
              },
            ],
            accountType: req.body.accountType,
            rating: { noOfRating: 0, ratingCount: 0, avgRating: 0 },
            experience: req.body.experience,
            isApprovedByAdmin: true,
          });
          await expertUser.findByIdAndUpdate(expertUserr._id, {
            userId: user._id,
          });

          universalFunctions.sendSuccess(
            {
              statusCode: 200,
              message: "User created",
            },
            res
          );
        }
      }
      // console.log(req.body,"iaenienwieioafeniaaaaa")
      // console.log('######################################################');
      // console.log(req.body.document,"adklgjnaeionianeiondiarrrrrrrrrr");

      let expertUserr = await expertUser.create({
        isSubscribed: false,
        category: req.body.category,
        practiceArea: req.body.practiceArea,
        bio: req.body.bio,
        audioFilePath: req.body.audioFilePath,
        videoFilePath: req.body.videoFilePath,
        document: req.body.document,
        accountType: req.body.accountType,
        rating: { noOfRating: 0, ratingCount: 0, avgRating: 0 },
        experience: req.body.experience,
        isApprovedByAdmin: true,
      });
      // console.log('The created expert - ',expertUserr);
      // console.log('######################################################');

      user = await User.create({
        firstName: req.body.firstName,
        email: req.body.email,
        mobileNo: req.body.mobileNo,
        lastName: req.body.lastName,
        profilePic: req.body.profilePic,
        isEmailVerified: false,
        role: APP_CONSTANTS.role.expert,
        userData: {
          model: APP_CONSTANTS.role.expert,
          data: expertUserr._id,
        },
        otp: req.body.otp,
      });
      await expertUser.findByIdAndUpdate(expertUserr._id, { userId: user._id });
      // console.log(expertUserr,"eexxpperrttusseerr");
      // console.log('Namaste - ',user);
      // console.log('######################################################');

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Expert User created",
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
};
