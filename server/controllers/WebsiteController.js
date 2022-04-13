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
      editBorhanUserDetails:async(req,res)=>{
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
      }
};
