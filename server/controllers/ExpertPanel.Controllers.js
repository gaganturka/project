const User = require("../models/User");
const borhanUser = require("../models/Borhan_User");
const expertUser = require("../models/Expert_User");
const appointmentModel=require("../models/Appointment");
const expertTimeAvailable =require("../models/ExpertTimeSlot");
const otpModel = require("../models/Otp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
import Mongoose from "mongoose";
import jwtFunction from '../utils/jwtFunction';

const APP_CONSTANTS = require("../appConstants");
// const User = require("../models/User");
import responseMessages from "../resources/response.json";
const { Config } = require("../config");

const Boom = require("boom");
import universalFunctions from "../utils/universalFunctions";

module.exports = {
  sendOtpExpertUser: async (req, res) => {
    try {
      const schema = Joi.object({
        mobileNo: Joi.string().required(),
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
    const schema = Joi.object({
      mobileNo: Joi.number().required(),
      otp: Joi.number().required(),
    });
    await universalFunctions.validateRequestPayload(req.body, res, schema);
    // let userLogin = await User.findOne({ mobile: req.body.mobileNo });
    let { otp, mobileNo } = req.body;
    let loginData = await otpModel.findOne({
      mobileNo: mobileNo,
      otp: otp,
    });
    if (!loginData) {
      universalFunctions.sendError(
        {
          statusCode: 404,
          message: responseMessages.Otp_Not_Match,
        },
        res
      );
      // throw Boom.badRequest(responseMessages.USER_NOT_FOUND);
    }

    let userData = await User.findOne({ mobileNo: mobileNo });
    // const token = jwt.sign({ user_id: userData._id }, Config.jwtsecret);
    const token=await jwtFunction.jwtGenerator(userData._id);
    let userDetails = {
      token: token,
      _id: userData._id,
    };

    universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: responseMessages.SUCCESS,
        data: userDetails,
      },
      res
    );
  },
  getExportUserDetail: async (req, res) => {
    try{
    let { id } = req.query;
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
    }
    catch(error)
    {
      universalFunctions.sendError(error, res);
    }
  },

  getExpertUser: async (req, res) => {
    try{
    let id = req.user.id;
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
    }
    catch(error)
    {
      universalFunctions.sendError(error, res);
    
    }
  },
  updateExpertUser: async (req, res) => {
    try{
    let {
      firstName,
      lastName,
      email,
      bio,
      expertId,
      getAudioFilePath,
      getVideoFilePath,
    } = req.body;
    let { id } = req.query;
    let payload = {
      firstName,
      lastName,
      email,
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
    }
    catch(error)
    {
      universalFunctions.sendError(error, res);
    
    }
  },
  getExpertUserInfoUsingUserModel: async (req, res) => {
    try{
    let id = req.user.id;
    const expert = await User
      .findOne({ _id: id })
      .populate({ path: "userData.data" });
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
  
}
catch(error)
{
      universalFunctions.sendError(error, res);   
}
},
getExpertAppointment: async (req, res) => {
  try{
  let id = req.user.expertId;
  console.log(req.user.expertId)
  const Appointment = await appointmentModel
    .find({expertId:id})
    .populate({ path: "userId" }).sort({"appointmentDate": -1});
  if (!Appointment) {
    throw Boom.badRequest("invalid id or token");
  }
  universalFunctions.sendSuccess(
    {
      statusCode: 200,
      message: "Appointment found",
      data: Appointment,
    },
    res
  );
}
catch(error)
{
    universalFunctions.sendError(error, res);   
}
},
updateAppointment:async (req, res) => {
  try{
    let appointmentId=req.body.id
    let payload=req.body.payload;
    console.log(payload,"here is body ")
    const Appointment = await appointmentModel.findByIdAndUpdate(
      { _id:appointmentId },
     { $set:payload},
    { new: true }
    );
    if (!Appointment) {
      throw Boom.badRequest("invalid id or token");
    }
    universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: "Appointment found",
        data: Appointment,
      },
      res
    );
  }
  catch(error)
  {
    console.log(error)
      universalFunctions.sendError(error, res);   
  }
},
setAvailableByExpert:async (req,res)=>{
try{ 
  // expertId:id,
  // appointmentDate:appointmentDate,
  // startAppointmentTime: {
  //     $gte: start,
  //     $lt: end
  // }
  let id = req.user.expertId;
  let payload=req.body;
  payload.expertId=id;
  console.log(payload,"here is body ")
  let start=payload.startAppointmentTime,end= payload.endAppointmentTime,appointmentDate=payload.appointmentDate;
  let data= await expertTimeAvailable.find({
$and: [
  {
    "expertId":id
  },
  {
      "appointmentDate": new Date(appointmentDate)
  }, {
      $or: [
          {
            $and: [
              {
                  "startAppointmentTime": {
                      $gt: new Date(start)
                  }
              }, {
                  "startAppointmentTime": {
                      $lte: new Date(end)
                  }
              }
          ]
          }, {
            $and: [
              {
                  "endAppointmentTime": {
                      $gt: new Date(start)
                  }
              }, {
                  "endAppointmentTime": {
                      $lte: new Date(end)
                  }
              }
          ]
          },{
            $and: [
              {
                  "startAppointmentTime": {
                      $lt: new Date(start)
                  }
              }, {
                  "endAppointmentTime": {
                      $gt: new Date(end)
                  }
              }
          ]
          }
          ]
  }

  ]
  }
)
console.log(data,"jhhjh")
if(data.length>0){
  universalFunctions.sendSuccess(
    {
      statusCode: 200,
      message: "expert is busy at is time ",
      data: data,
    },
    res
  );
}else{
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

}catch(error){
  console.log(error)
  universalFunctions.sendError(error, res);  
}
},
getAvailableTimeForUser:async (req,res)=>{
  try{ 
    let payload=req.body;
    console.log(payload,"here is body ")
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
  
  }catch(err){
    console.log(error)
    universalFunctions.sendError(error, res);  
  }
  },

};


