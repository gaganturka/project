const User = require("../models/User");
const borhanUser = require("../models/Borhan_User");
const expertUser = require("../models/Expert_User");
const appointmentModel=require("../models/Appointment");
const expertTimeAvailable =require("../models/ExpertTimeSlot");
const otpModel = require("../models/Otp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const Mongoose= require("mongoose");
const jwtFunction = require('../utils/jwtFunction');
const moment =require("moment");
const APP_CONSTANTS = require("../appConstants");
const AccessToken = require("twilio").jwt.AccessToken;
const { Config } = require("../config");


const VideoGrant = AccessToken.VideoGrant;
const ChatGrant = AccessToken.ChatGrant;
const accountSid = Config.twilioAccountSid;
const authToken = Config.authToken;
const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

// const User = require("../models/User");
const responseMessages=  require("../resources/response.json");
const universalFunctions = require( "../utils/universalFunctions");
const chatappointment =require('../models/ChatAppointment');

const Boom = require("boom");
const Appointment = require("../models/Appointment");
var admin = require("firebase-admin");
var serviceAccount = require('../borhan-33e53-firebase-adminsdk-rf954-937a2c2dd8.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: Config.get("db.firebaseDatabaseUrl"),
});
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
    try{
    const schema = Joi.object({
      mobileNo: Joi.string().min(10).required()    
    });
    await universalFunctions.validateRequestPayload(req.body, res, schema);
    // let userLogin = await User.findOne({ mobile: req.body.mobileNo });
    let {mobileNo } = req.body;
 
      // throw Boom.badRequest(responseMessages.USER_NOT_FOUND);
    
    console.log('usesdf',mobileNo)
    let users = await User.findOne({ mobileNo: mobileNo }).populate('userData.data');
    console.log(users,'sfae');
    if(!users)
    {
      throw Boom.badRequest('expert not found');
    }
    if((users!==null && users?.userData?.model !== APP_CONSTANTS.role.expert )|| users?.userData?.data?.isApprovedByAdmin===false)
    {
      // console.log(users?.userData?.model,'eddddd',mobileNo)
      throw Boom.badRequest('Invalid Credentials');
    }
   
    // const token = jwt.sign({ user_id: userData._id }, Config.jwtsecret);
    const token=await jwtFunction.jwtGenerator(users._id);
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
    }
    catch(error)
    {
      universalFunctions.sendError(error,res);
    }
  },
  getExportUserDetail: async (req, res) => {
    try{
    let id =req.user.id;
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
    }
    catch(error)
    {
      universalFunctions.sendError(error, res);
    
    }
  },
  updateExpertUser: async (req, res) => {
    try{
      console.log(req.user)
      let expertId=req.user.expertId
    let {
      firstName,
      lastName,
      email,
      bio,
      getAudioFilePath,
      getVideoFilePath,
      profilePic
    } = req.body;
    const schema = Joi.object({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      expertId:Joi.string(),
      bio: Joi.string(),
      getAudioFilePath: Joi.string().allow(''),
      getVideoFilePath: Joi.string().allow(''),
      profilePic:Joi.string().allow('')
    });
    await universalFunctions.validateRequestPayload(req.body, res, schema);

    let  id  =req.user.id;
    let payload = {
      firstName,
      lastName,
      email,
      profilePic
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
  let id = req.user.expertId;
  let payload=req.body;
  payload.expertId=id;

  // console.log(payload,"here is body ")
  let start=payload.startAppointmentTime,end= payload.endAppointmentTime,appointmentDate=payload.appointmentDate;

   start =new Date(appointmentDate+' '+start); 
  // console.log(localdate,"here is ");
  // console.log(moment.utc(moment(localdate)).format(),'start time 11')
  // start=moment.utc(moment(localdate)).format();

  end =new Date(appointmentDate+' '+end); 
  // console.log(localdate ,new Date(localdate),"here is ");
  // console.log(moment.utc(moment(localdate)).format(),'start time')
  // end=moment.utc(moment(localdate)).format();

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

// console.log(data,"jhhjh")
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
  payload.startAppointmentTime=start;
  payload.endAppointmentTime=end;
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
getChatAppointment:async (req,res)=>{
    try{ 
      let id = req.user.expertId;
      let payload={
        expertId:id
      }
      const chatappointmentdata = await chatappointment.find(payload).populate({ path: "userId expertId" });
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
    
    }catch(err){
      console.log(err)
      universalFunctions.sendError(err, res);  
    }
    },
    updateChatAppointment:async (req, res) => {
      try{
        let appointmentId=req.body.id
        let payload=req.body.payload;
        console.log(payload,"here is body ")
        const updateChatAppointment = await chatappointment.findByIdAndUpdate(
          { _id:appointmentId },
         { $set:payload},
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
      }
      catch(error)
      {
        console.log(error)
          universalFunctions.sendError(error, res);   
      }
    },
    getChatAppointmentById:async (req,res)=>{
      try{ 
        let id = req.query.id;
        // console.log(req.user ,'sscs');
        // console.log(req.query,'kjk');
        const chatappointmentdata = await chatappointment.findOne({_id:id}).populate({ path: "userId expertId" });
        const expertProfileData=await User.findOne({_id:chatappointmentdata.expertId.userId});
        if (!chatappointmentdata) {
          throw Boom.badRequest("invalid id or token");
        }
        universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "Successfull get appointment",
            data: {chatappointmentdata,expertProfileData},
          },
          res
        );
      
      }catch(err){
        console.log(err)
        universalFunctions.sendError(err, res);  
      }
      },


      setExpertStatus:async (req,res)=>{
        try{
          let id=req.user.expertId;
          const schema = Joi.object({
    
          status:Joi.string(),
      });
      let {status}=req.body;
      let newStatus;
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      if(status==='Unavailable')
        newStatus=APP_CONSTANTS.activityStatus.unavailable;
      else if(status==='Active')
      newStatus=APP_CONSTANTS.activityStatus.active;
      else if(status==='Busy')
      newStatus=APP_CONSTANTS.activityStatus.busy;
       let expert=await expertUser.findByIdAndUpdate({_id:id},{status:newStatus});
       
       if(!expert)
       {
         throw Boom.badRequest('Expert not found');
       }
       
       universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Successfully changed status",
          data: {expert},
        },
        res
       )
        }
        catch(error)
        {
         universalFunctions.sendError(error,res);
        }
      }
      ,
      twilioVideoChatTokenExpert: async (req, res) => {
  

        try {
          const schema = Joi.object({
            appointmentId: Joi.string().required(),
          
          });
          await universalFunctions.validateRequestPayload(req.body, res, schema);
          let appointments = await Appointment.findOne({ _id: req.body.appointmentId }).populate({path:'expertId',populate:{
          path:"userId"
        }
      });
          
          if (!appointments.videoChatId) {
            let roomId = appointments.appointDateandTime + req.body.appointmentId;
           
            appointments = await Appointment.findByIdAndUpdate({ _id: req.body.appointmentId }, { videoChatId: roomId }, { new: true }).populate('expertId')
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
            .create({ identity:" "+ appointments?.expertId?.userId?.firstName+" "+appointments?.expertId?.userId?.lastName+" " })
            .then(participant => { console.log(participant.sid); participantId = participant.sid; })
            .catch(error => { console.log(error); });
            const token = new AccessToken(
              Config.twilioAccountSid,
              Config.twilioApiKey,
              Config.twilioApiSecret,
            );
          token.addGrant(videoGrant);
          token.addGrant(chatGrant);
          token.identity =" "+appointments?.expertId?.userId?.firstName+" "+appointments?.expertId?.userId?.lastName+" ";
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
      sendPushNotificationChatRequest : async (req, res) => {
        try {
          // const schema = {
          // token:Joi.string(),
          // };
          // await universalFunctions.validateRequestPayload(req.body, res, schema);
          // let payload = req.body;
          let message;
          req.body.token.map(async (obj,index)=>{
            if(obj.deviceType== '2')
            {
              message = {
                data: {
                  title: 'Expert accepted your chat request',
                  body: `your request for chat room with our expert has been ${req.body.messageType=='1'?'accepted':'rejected'}`,
                  type: "addProperty",
                  // propertyId: payload.id,
                  sound: 'default',
                },
              };
            }
            else if(obj.deviceType=='3')
            {
              message = {
                notification: {
                  title: 'Expert accepted your chat request',
                  body: `your request for chat room with our expert has been ${req.body.messageType=='1'?'accepted':'rejected'}`,
                  type: "addProperty",
                  // propertyId: payload.id,
                  sound: 'default',
                  badge: "0",
                },
              };
            }
    
             
          var options = { priority: "high" };
          const firebaseFunction = await admin
            .messaging()
            .sendToDevice([obj.deviceToken], message, options);
          console.log("firebaseFunction", firebaseFunction);
          })
         
          return universalFunctions.sendSuccess(
            {
              statusCode: 200,
              message: `successfully send ${req.body.messageType=='1'?'admission':'rejection'} notification`,
              // data: firebaseFunction,
            },
            res
          );
        } catch (err) {
          console.log("+++++++++++++", err);
          return universalFunctions.sendError(err, res);
        }
      }
};


