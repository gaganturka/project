const { Config } = require("../config");
const Jwt = require("jsonwebtoken");
import universalFunctions from "../utils/universalFunctions";
const Boom = require("boom");
const User=require("../models/User")
const checkAuth =  async(req, res, next) => {
    const token = req.headers["x-access-token"] || req.query["x-access-token"] || req.headers["authorization"];
    console.log("token:",token);
      if (token) {
        const decoded =  Jwt.verify(token, Config.jwtsecret);
        // let decoded = jwt_decode(token);
            console.log(Config.jwtsecret,"jwt");
        // Jwt.verify(token, Config.jwtsecret, async function (err,decoded) {
          try {
            console.log("decoded inside borhan user",decoded);
              
              // let user = await borhanUser.findOne({ firebaseUserId: decoded.user_id });
              let user = await User.findOne({ _id: decoded.user_id });
              if (!user) {
                throw Boom.unauthorized(responseMessage.USER_NOT_FOUND);
              }
              console.log(user,"hererererlnkjsnvknsfdvjs")
 
              //   user = user.toJSON();
              // console.log("decoded" , user);
            //   if (user.isDeleted) {
            //     throw Boom.badRequest(responseMessage.USER_NOT_FOUND);
            //   }
            //   if (user.userSuspend) {
            //     throw Boom.badRequest(responseMessage.userSuspend);
            //   }
                let userInfo = {
                  id: user._id,
                //   name: user.name,
                //   email: user.email ? user.email : "",
                //   isPhoneVerified:user.isPhoneVerified,
                //   // phoneNumber: user.phoneNumber ? user.phoneNumber : "",
                };
                req.user = userInfo;
                next();
          } catch (error) {
            return universalFunctions.sendError(error, res);
          }
         
      } else {
        return universalFunctions.sendError(
          Boom.forbidden(responseMessage.TOKEN_NOT_PROVIDED),
          res
        );
      }
  };


  module.exports={
    checkAuth
  }