const APP_CONSTANTS = require("../appConstants");
const { Config } = require("../config");
const Jwt = require("jsonwebtoken");
const responseMessages=  require("../resources/response.json");
const universalFunctions = require( "../utils/universalFunctions");
const Boom = require("boom");
const User=require("../models/User")
const checkAuth2 =  async(req, res, next) => {
    const token = req.headers["x-access-token"] || req.query["x-access-token"] || req.headers["authorization"];
    
      if (token) {
        const decoded =  Jwt.verify(token, Config.jwtsecret);
            console.log(Config.jwtsecret,"jwt");
        
          try {
           
              
              
              let user = await User.findOne({ _id: decoded.user_id,role: APP_CONSTANTS.role.borhanuser});
              if (!user) {
                throw Boom.unauthorized(responseMessages.USER_NOT_FOUND);
              }
              
 
              
                let userInfo = {
                  id: user._id,
            
                };
                req.user = userInfo;
                next();
          } catch (error) {
            return universalFunctions.sendError(error, res);
          }
         
      } else {
        let userInfo = {
            id: null,
      
          };
          req.user = userInfo;
        next();
      }
  };


  module.exports={
    checkAuth2
  }