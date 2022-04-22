const User = require("../models/User");
const borhanUser = require("../models/Borhan_User");
const expertUser = require("../models/Expert_User");
const fqModel = require("../models/frequentlyQuestions");

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
  addQuesAndAns:async (req,res)=>{
    try{
      let payload=req.body;
      console.log(req.body)
      const schema = {
        question: Joi.string().required(),
        answer: Joi.string().required(),

      };
      await universalFunctions.validateRequestPayload(req.body, res, schema);

      let QuesAndAns = await fqModel.create(payload);
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "QuesAndAns  are",
          data: QuesAndAns,
        },
        res
      );
    }catch(error){
      universalFunctions.sendError(error, res);
    }
  },
  editQuesAndAns:async (req,res)=>{
    try{
      let payload={
        question: req.body.question,
        answer: req.body.answer,
      }
      let id=req.body.id;
      console.log(req.body)

      let QuesAndAns = await fqModel.findOneAndUpdate({
        _id: id,
      },
        payload,
        {
          new: true,
        });
  
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "editQuesAndAns  are",
          data: QuesAndAns,
        },
        res
      );
    }catch(error){
      universalFunctions.sendError(error, res);
    }
  },
  getQuesAndAns:async (req,res)=>{
    try{
      // let payload=req.body;
      // console.log(req.body)
      // const schema = {
      //   question: Joi.string().required(),
      //   answer: Joi.string().required(),

      // };
      // await universalFunctions.validateRequestPayload(req.body, res, schema);

      let QuesAndAns = await fqModel.find().sort({createdAt: -1});
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "QuesAndAns  are",
          data: QuesAndAns,
        },
        res
      );
    }catch(error){
      universalFunctions.sendError(error, res);
    }
  },
  deleteQuesAndAns: async (req, res) => {
    console.log(req.body)
    const QuesAndAns = await fqModel.findByIdAndDelete(req.body);
    if (!QuesAndAns) {
      throw Boom.badRequest("invalid id user couldnt be deleted");
    }
    console.log(QuesAndAns,"sdjdkjcdskjb")
    universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: "QuesAndAns  are",
        data: QuesAndAns,
      },
      res
    );
  },
  getQuesAndAnsById: async (req, res) => {
    let id=req.body.id;
    console.log(req.body)
    const data = await fqModel.findOne({ _id: id });
    console.log(data)
    if (!data) {
      throw Boom.badRequest("couldnt be deleted");
    }
  
  
    universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: "completely deleted user",
        data:data
      },
      res
    );
  },
};
