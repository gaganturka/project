const User = require("../models/User");
const borhanUser = require("../models/Borhan_User");
const expertUser = require("../models/Expert_User");
const otpModel = require("../models/Otp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const APP_CONSTANTS = require("../appConstants");
import responseMessages from "../resources/response.json";
const { Config } = require("../config");

const Boom = require("boom");
import universalFunctions from "../utils/universalFunctions";

module.exports = {
  getExpertApprovedByAdmin: async (req, res) => {
    const expert = await expertUser.findByIdAndUpdate(
      { _id: req.params._id },
      { isApprovedByAdmin: true }
    );
    if (!expert) {
      throw Boom.badRequest("invalid id");
    }

    universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: "approval completed",
        data: expert,
      },
      res
    );
  },
  getExpertRejectedByAdmin: async (req, res) => {
    const expert = await expertUser.findByIdAndDelete({ _id: req.params._id });
    if (!expert) {
      throw Boom.badRequest("invalid id expert couldnt be deleted");
    }

    universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: "completely deleted expert",
        data: expert,
      },
      res
    );
  },
  showExperts: async (req, res) => {
    try {
      const schema = Joi.object({
        limit: Joi.number(),
        page: Joi.number(),
        search: Joi.string().allow(""),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);

      let page = req.body.page;
      let limit = req.body.limit;
      let filter = {
        isApprovedByAdmin: true,
      };
      // console.log("searchhhhi", req.body.search, "search mai kya hai");
      if (req.body.search) {
        filter["$or"] = [
          { "userId.firstName": { $regex: req.body.search, $options: "i" } },
          {
            "userId.email": { $regex: req.body.search, $options: "i" },
          },
        ];
      }
      //   const expert=await expertUser.aggregate([

      //   //   {
      //   //   $project: {
      //   //     userId: 1,
      //   //   },
      //   // },
      //   {
      //     $match:{
      //       isApprovedByAdmin: true,
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: "users",
      //       localField: "userId",
      //       foreignField: "_id",

      //       as:"userId",

      //     },

      //   },
      //   {
      //     $unwind:"$userId"
      //   },

      //  { $filter:{
      //     input:"$userId",
      //     as:"userId",
      //     cond:{
      //        firstName: { $regex: req.query.text, $options: "i" } ,
      //        email: { $regex: req.query.text, $options: "i" } ,

      //     }

      //   }
      // },
      //   {
      //     $lookup: {
      //       from: "categories",
      //       localField: "category",
      //       foreignField: "_id",
      //       as:"category",
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: "practiceareas",
      //       localField: "practiceArea",
      //       foreignField: "_id",
      //       as:"practiceArea",
      //     },

      //   },
      //   // { $sort: { dayOfMonth: 1 } },
      // ])

      //  console.log(expert)

      const expert = await expertUser
        .find({ isApprovedByAdmin: true })
        .populate("userId")
        .populate("practiceArea")
        .populate("category")
        .skip(parseInt((page - 1) * limit))
        .limit(parseInt(limit));
      if (!expert) {
        throw Boom.badRequest("cannot find any expert");
      }
      console.log("expertrequest", expert, "expertrequests");
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "All experts requests are",
          data: {
            list: expert,
            count: await expertUser.find().countDocuments(),
          },
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  showExpertsAccountTypeExpert: async (req, res) => {
    try {
      const schema = Joi.object({
        limit: Joi.number(),
        page: Joi.number(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let page = req.body.page;
      let limit = req.body.limit;

      const expertuser = await expertUser
        .find({
          accountType: APP_CONSTANTS.accountType.expert,
          isApprovedByAdmin: true,
        })
        .populate("userId")
        .populate("practiceArea")
        .populate("category")
        .skip(parseInt((page - 1) * limit))
        .limit(parseInt(limit));
      if (!expertuser) {
        throw Boom.badRequest("cannot find any expert");
      }
      // console.log("type request",expertuser,"type expert")
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "All experts type are",
          data: {
            list: expertuser,
            count: await expertUser
              .find({
                accountType: APP_CONSTANTS.accountType.expert,
                isApprovedByAdmin: true,
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
  showExpertsAccountTypeFreelancer: async (req, res) => {
    try {
      const schema = Joi.object({
        limit: Joi.number(),
        page: Joi.number(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let page = req.body.page;
      let limit = req.body.limit;

      const expertuser = await expertUser
        .find({
          accountType: APP_CONSTANTS.accountType.freelancer,
          isApprovedByAdmin: true,
        })
        .populate("userId")
        .populate("practiceArea")
        .populate("category")
        .skip(parseInt((page - 1) * limit))
        .limit(parseInt(limit));
      if (!expertuser) {
        throw Boom.badRequest("cannot find any freelancer");
      }
      // console.log("freelancers",expertuser,"freelancers")
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "All freelancers are",
          data: {
            list: expertuser,
            count: await expertUser
              .find({ accountType: APP_CONSTANTS.accountType.freelancer })
              .countDocuments(),
          },
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },

  showExpertsRequests: async (req, res) => {
    try {
      const schema = Joi.object({
        limit: Joi.number(),
        page: Joi.number(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let page = req.body.page;
      let limit = req.body.limit;

      const expertuser = await expertUser
        .find({ isApprovedByAdmin: false })
        .populate("userId")
        .populate("practiceArea")
        .populate("category")
        .skip(parseInt((page - 1) * limit))
        .limit(parseInt(limit));
      if (!expertuser) {
        throw Boom.badRequest("cannot find any expert");
      }
      console.log("expertrequest", expertuser, "expertrequests");
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "All experts requests are",
          data: {
            list: expertuser,
            count: await expertUser
              .find({ isApprovedByAdmin: false })
              .countDocuments(),
          },
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  showExpertDetails: async (req, res) => {
    try {
      const expertuser = await expertUser
        .findOne({ _id: req.params.id })
        .populate("userId");
      if (!expertuser) {
        throw Boom.badRequest("cannot find any expert");
      }

      console.log("expertdetails", expertuser, "expertdetails");
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Expert details are",
          data: expertuser,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  editExpertByAdmin: async (req, res) => {
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
      };
      await universalFunctions.validateRequestPayload(req.body, res, schema);

      let expert = await expertUser.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
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
                link: req.body.document[0].link,
                mimeType: req.body.document[0].mimeType,
              },
            ],
            experience: req.body.experience,
            accountType: req.body.accountType,
            rating: { noOfRating: 0, ratingCount: 0, avgRating: 0 },
          },
        },
        { new: true }
      );

      if (!expert) {
        throw Boom.badRequest("could not update expert");
      }
      console.log("updatedexpert", expert);
      let user = await User.findByIdAndUpdate(
        { _id: expert.userId },
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
        throw Boom.badRequest("could not update expert");
      }
      console.log("newupdated user", user);
      return universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "expert has been updated",
        },
        res
      );
    } catch (err) {
      return universalFunctions.sendError(err, res);
    }
  },
  deleteExpertByAdmin: async (req, res) => {
    const expert = await expertUser.findByIdAndDelete({ _id: req.params._id });
    if (!expert) {
      throw Boom.badRequest("invalid id expert couldnt be deleted");
    }
    console.log("deleted expert is", expert);
    const user = await User.findByIdAndDelete({ _id: expert.userId });
    if (!user) {
      throw Boom.badRequest("invalid id expert couldnt be deleted");
    }
    console.log("deleted user is", user);

    universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: "completely deleted expert",
      },
      res
    );
  },
  showBorhanUsers: async (req, res) => {
    try {
      const schema = Joi.object({
        limit: Joi.number(),
        page: Joi.number(),
        search: Joi.string().allow(""),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);

      let page = req.body.page;
      let limit = req.body.limit;
      // let filter = {
      //   isApprovedByAdmin: true,
      // };
      // console.log("searchhhhi", req.body.search, "search mai kya hai");
      // if (req.body.search) {
      //   filter["$or"] = [
      //     {"userId.firstName": { $regex: req.body.search, $options: "i" } },
      //     {
      //       "userId.email": { $regex: req.body.search, $options: "i" } },
      //   ];
      // }
      const user = await borhanUser
        .find({ role: APP_CONSTANTS.role.borhanuser })
        .populate("userId")
        .skip(parseInt((page - 1) * limit))
        .limit(parseInt(limit));
      if (user === null) {
        throw Boom.badRequest("cannot find any user");
      }
      console.log("userrrr", user, "useerrrrr");
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "All users are",
          data: {
            list: user,
            count: await User.find({
              role: APP_CONSTANTS.role.borhanuser,
            }).countDocuments(),
          },
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  deleteBorhanUserByAdmin: async (req, res) => {
    const borhan = await borhanUser.findByIdAndDelete({ _id: req.params._id });
    if (!borhan) {
      throw Boom.badRequest("invalid id user couldnt be deleted");
    }
    // console.log("deleted borhanuser is", borhan);
    const user = await User.findByIdAndDelete({ _id: borhan.userId });
    if (!user) {
      throw Boom.badRequest("invalid id user couldnt be deleted");
    }
    // console.log("deleted user is", user);

    universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: "completely deleted user",
      },
      res
    );
  },
  getUserDetails: async (req, res) => {
    try {
      const schema = Joi.object({
        mobileNo: Joi.string().min(10).max(10).required(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);

      const user = await User.findOne({ _id: req.body.mobileNo }).populate(
        "userData.data"
      );
      if (!user) {
        throw Boom.badRequest("cannot find any user");
      }

      console.log("userdetails", user, "userdetails");
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "user details are",
          data: user,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
};
