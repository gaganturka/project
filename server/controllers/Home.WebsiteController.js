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
            .find({ isApprovedByAdmin: true, status:APP_CONSTANTS.activityStatus.active })
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
              data: expert
            },
            res
          );
        } catch (error) {
          universalFunctions.sendError(error, res);
        }
      },
      showBorhanUserDetails: async (req, res) => {
        try {
            console.log(req.user.id,"kya req.user mai")
            let id=req.user.id;
            console.log("id of user",id)
          const borhanuser = await User
            .findOne({ _id: id })
            .populate("userData.data");
          if (!borhanuser) {
            throw Boom.badRequest("cannot find any user");
          }
    
          console.log("userdetails",borhanuser, "user details");
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
    
};
