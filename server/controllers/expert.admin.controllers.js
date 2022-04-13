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
    loginexpertpanel: async (req, res) =>{
    
    },
  getExpertUser: async (req, res) => {
      let id=req.user.id;
    const expert = await expertUser.findOne({_id:id}).populate({ path: "category practiceArea"})
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
  },
  updateExpertUser: async (req, res) => {
      let payload=req.body.payload;

    const expert = await expertUser.findOneAndUpdate({
      _id: req.users.id,
    },
      payload,
      {
        new: true,
      });
      if(expert){
          console.log(expert,"updated data is here expert");
      }
    universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: "completely updateExpertUser expert",
        data: expert,
      },
      res
    );
  },
 
};
