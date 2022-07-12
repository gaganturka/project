const User = require("../models/User");
const borhanUser = require("../models/Borhan_User");
const expertUser = require("../models/Expert_User");
const adminUser=require('../models/Admin_User');
const otpModel = require("../models/Otp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const APP_CONSTANTS = require("../appConstants");
const responseMessages= require( "../resources/response.json");
const { Config } = require("../config");
const favExpertModel=require('../models/Fav_Expert');
const Boom = require("boom");
const universalFunctions = require("../utils/universalFunctions");
const { isBuffer } = require("lodash");


module.exports = {
  getExpertApprovedByAdmin: async (req, res) => {
    try{
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
    }
    catch(error)
    {
      universalFunctions.sendError(error,res);
    }
  },
  getExpertRejectedByAdmin: async (req, res) => {
    try{
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
    }
    catch(error)
    {
      universalFunctions.sendError(error,res);
    }
  },
  showExperts: async (req, res) => {
    try {
      const schema = Joi.object({
        limit: Joi.number(),
        page: Joi.number(),
        search: Joi.string().allow(""),
        filterType:Joi.string(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      let filterType
      let expert = [];
      let count=0;
      let finalExperts=[];
      let page = req.body.page;
      let limit = req.body.limit;
      let filter = {};
      if(req.body.filterType=="1" && req.body.search=='')
      {
        finalExperts = await expertUser
          .find({ isApprovedByAdmin: true })
          .populate("userId")
          .populate("practiceArea")
          .populate("category")
          .skip(parseInt((page - 1) * limit))
          .limit(parseInt(limit));
        count = await expertUser.find({ isApprovedByAdmin: true }).countDocuments();
        // console.log("this is expoert" ,finalExperts )
      }
      else if(req.body.filterType =='3')
      {
        finalExperts = await expertUser
          .find({ isApprovedByAdmin: true,accountType:APP_CONSTANTS.accountType.freelancer })
          .populate("userId")
          .populate("practiceArea")
          .populate("category")
          .skip(parseInt((page - 1) * limit))
          .limit(parseInt(limit));
        count = await expertUser.find({ isApprovedByAdmin: true,accountType:APP_CONSTANTS.accountType.freelancer }).countDocuments();
      // filterType=APP_CONSTANTS.accountType.freelancer;
      }
      else if(req.body.filterType =='2')
      {
        finalExperts = await expertUser
          .find({ isApprovedByAdmin: true,accountType:APP_CONSTANTS.accountType.expert })
          .populate("userId")
          .populate("practiceArea")
          .populate("category")
          .skip(parseInt((page - 1) * limit))
          .limit(parseInt(limit));
        count = await expertUser.find({ isApprovedByAdmin: true,accountType:APP_CONSTANTS.accountType.expert }).countDocuments();
        
      }
      else if(req.body.search)
      {
        filter["$or"] = [
          { firstName: { $regex: req.body.search, $options: "i" } },
          {
            email: { $regex: req.body.search, $options: "i" },
          },
        ];
        let expertData = await expertUser
          .find({ isApprovedByAdmin: true })
          .populate({ path: "userId", match: filter })
          .populate("practiceArea")
          .populate("category")
          // .skip(parseInt((page - 1) * limit))
          // .limit(parseInt(limit));
        expertData.map((ele) => {
          if(ele !=null)
          {
          if (ele.userId != null) {
            expert.push(ele);
          }
        }
        });
        count = expert.length;
        let i;
        for(i=parseInt((page - 1) * limit);i<parseInt((page - 1) * limit)+limit;i++)
        {
          if(expert[i]!=null)
            finalExperts.push(expert[i]);
        }

      }
      else{
        throw Boom.badRequest(responseMessages.INVALID_CREDENTIALS);
      }
      
      // console.log("searchhhhi", req.body.search, "search mai kya hai");
      // if (req.body.search) {
      //   filter["$or"] = [
      //     { firstName: { $regex: req.body.search, $options: "i" } },
      //     {
      //       email: { $regex: req.body.search, $options: "i" },
      //     },
      //   ];
      //   let expertData = await expertUser
      //     .find({ isApprovedByAdmin: true })
      //     .populate({ path: "userId", match: filter })
      //     .populate("practiceArea")
      //     .populate("category")
      //     // .skip(parseInt((page - 1) * limit))
      //     // .limit(parseInt(limit));
      //   expertData.map((ele) => {
      //     if(ele !=null)
      //     {
      //     if (ele.userId != null) {
      //       expert.push(ele);
      //     }
      //   }
      //   });
      //   count = expert.length;
      //   let i;
      //   for(i=parseInt((page - 1) * limit);i<parseInt((page - 1) * limit)+limit;i++)
      //   {
      //     if(expert[i]!=null)
      //       finalExperts.push(expert[i]);
      //   }
      // }
     
       
      // if (req.body.search) {
      //   let expertData = await expertUser
      //     .find({ isApprovedByAdmin: true,accountType:filterType })
      //     .populate({ path: "userId", match: filter })
      //     .populate("practiceArea")
      //     .populate("category")
      //     // .skip(parseInt((page - 1) * limit))
      //     // .limit(parseInt(limit));
      //   expertData.map((ele) => {
      //     if(ele !=null)
      //     {
      //     if (ele.userId != null) {
      //       expert.push(ele);
      //     }
      //   }
      //   });
      //   count = expert.length;
      //   let i;
      //   for(i=parseInt((page - 1) * limit);i<parseInt((page - 1) * limit)+limit;i++)
      //   {
      //     if(expert[i]!=null)
      //       finalExperts.push(expert[i]);
      //   }
      // }
      // } else {
      //   finalExperts = await expertUser
      //     .find({ isApprovedByAdmin: true })
      //     .populate("userId")
      //     .populate("practiceArea")
      //     .populate("category")
      //     .skip(parseInt((page - 1) * limit))
      //     .limit(parseInt(limit));
      //   count = await expertUser.find({ isApprovedByAdmin: true }).countDocuments();
      // }
      if (!expert) {
        throw Boom.badRequest("cannot find any expert");
      }
      console.log("expertrequest", expert, "expertrequests");
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "All experts requests are",
          data: {
            list: finalExperts,
            count: count,
          },
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
  // showExpertsAccountTypeExpert: async (req, res) => {
  //   try {
  //     const schema = Joi.object({
  //       limit: Joi.number(),
  //       page: Joi.number(),
  //     });
  //     await universalFunctions.validateRequestPayload(req.body, res, schema);
  //     let page = req.body.page;
  //     let limit = req.body.limit;

  //     const expertuser = await expertUser
  //       .find({
  //         accountType: APP_CONSTANTS.accountType.expert,
  //         isApprovedByAdmin: true,
  //       })
  //       .populate("userId")
  //       .populate("practiceArea")
  //       .populate("category")
  //       .skip(parseInt((page - 1) * limit))
  //       .limit(parseInt(limit));
  //     if (!expertuser) {
  //       throw Boom.badRequest("cannot find any expert");
  //     }
  //     // console.log("type request",expertuser,"type expert")
  //     universalFunctions.sendSuccess(
  //       {
  //         statusCode: 200,
  //         message: "All experts type are",
  //         data: {
  //           list: expertuser,
  //           count: await expertUser
  //             .find({
  //               accountType: APP_CONSTANTS.accountType.expert,
  //               isApprovedByAdmin: true,
  //             })
  //             .countDocuments(),
  //         },
  //       },
  //       res
  //     );
  //   } catch (error) {
  //     universalFunctions.sendError(error, res);
  //   }
  // },
  // showExpertsAccountTypeFreelancer: async (req, res) => {
  //   try {
  //     const schema = Joi.object({
  //       limit: Joi.number(),
  //       page: Joi.number(),
  //     });
  //     await universalFunctions.validateRequestPayload(req.body, res, schema);
  //     let page = req.body.page;
  //     let limit = req.body.limit;

  //     const expertuser = await expertUser
  //       .find({
  //         accountType: APP_CONSTANTS.accountType.freelancer,
  //         isApprovedByAdmin: true,
  //       })
  //       .populate("userId")
  //       .populate("practiceArea")
  //       .populate("category")
  //       .skip(parseInt((page - 1) * limit))
  //       .limit(parseInt(limit));
  //     if (!expertuser) {
  //       throw Boom.badRequest("cannot find any freelancer");
  //     }
  //     // console.log("freelancers",expertuser,"freelancers")
  //     universalFunctions.sendSuccess(
  //       {
  //         statusCode: 200,
  //         message: "All freelancers are",
  //         data: {
  //           list: expertuser,
  //           count: await expertUser
  //             .find({ accountType: APP_CONSTANTS.accountType.freelancer })
  //             .countDocuments(),
  //         },
  //       },
  //       res
  //     );
  //   } catch (error) {
  //     universalFunctions.sendError(error, res);
  //   }
  // },

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
        email: Joi.string().optional().allow(""),
        // .email({
        //   minDomainSegments: 2,
        //   tlds: { allow: ["com", "net"] },
        // }),
        mobileNo: Joi.string().min(10).required(),
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
    try{
    const expert = await expertUser.findByIdAndDelete({ _id: req.params._id });
    if (!expert) {
      throw Boom.badRequest("invalid id expert couldnt be deleted");
    }
    console.log("deleted expert is", expert);
    const user = await User.findByIdAndDelete({ _id: expert.userId });

    if (!user) {
      throw Boom.badRequest("invalid id expert couldnt be deleted");
    }

    const favExp=await favExpertModel.deleteMany({expertId: req.params._id})
    // if (!favExp) {
    //   throw Boom.badRequest("invalid id expert couldnt be deleted");
    // }

    console.log("deleted user is", user);

    universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: "completely deleted expert",
      },
      res
    );
    }
    catch(err)
    {
      universalFunctions.sendError(err,res);
    }
  },
  
  getAdminDetails: async (req,res)=>{
    try{
      let  id=req.user.id
      console.log(req.user,'req.user',id);
      let admin=await User.findOne({_id:id}).populate('userData.data');
      if(!admin)
      {
        throw Boom.badRequest(responseMessages.INVALID_CREDENTIALS);
      }
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "completely deleted expert",
          data:admin
        },
        res
      );
    }
    catch(error)
    {
      universalFunctions.sendError(error,res);
    }
  }
};
