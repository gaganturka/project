const APP_CONSTANTS = require("../appConstants");
const { Config } = require("../config");
const Jwt = require("jsonwebtoken");
import universalFunctions from "../utils/universalFunctions";
import responseMessages from "../resources/response.json";
const Boom = require("boom");
const User=require("../models/User")
const isExpert =  async(req, res, next) => {
    const token = req.headers["x-access-token"] || req.query["x-access-token"] || req.headers["authorization"];
    console.log("token:",token);
      if (token) {
        const decoded =  Jwt.verify(token, Config.jwtsecret);
            console.log(Config.jwtsecret,"jwt");
        // Jwt.verify(token, Config.jwtsecret, async function (err,decoded) {
          try {
            console.log("decoded inside isexpert",decoded);
              
              // let user = await borhanUser.findOne({ firebaseUserId: decoded.user_id });
              let user = await User.findOne({ _id: decoded.user_id,role: APP_CONSTANTS.role.expert});
              if (!user) {
                throw Boom.unauthorized(responseMessages.USER_NOT_FOUND);
              }
              console.log(user,"hererererlnkjsnvknsfdvjs")
 
              
                let userInfo = {
                  id: user._id,
            
                };
                req.user = userInfo;
                next();
          } catch (error) {
            return universalFunctions.sendError(error, res);
          }
         
      } else {
        return universalFunctions.sendError(
          Boom.forbidden(responseMessages.TOKEN_NOT_PROVIDED),
          res
        );
      }
  };


  module.exports={
    isExpert
  }