const jwt = require("jsonwebtoken");
const User = require("../models/User");
const APP_CONSTANTS = require("../appConstants");
const responseMessages=  require("../resources/response.json");
const universalFunctions = require( "../utils/universalFunctions");const Boom = require("boom");
const { Config } = require("../config");
module.exports = {
  isAdmin: async (req, res, next) => {
    try {
      const token = req.header("auth-token")|| req.headers["x-access-token"] || req.query["x-access-token"] || req.headers["authorization"];
      if (!token) {
        // res
        //   .status(403)
        //   .send({ error: "Please authenticate using valid token" });
        throw Boom.badRequest('Please Authenticate using valid token')
      }
      const data = jwt.verify(token, Config.jwtsecret);
      console.log(data, "jwttokenbyadmin");
      if (!data) {
        throw Boom.badRequest(responseMessages.INVALID_TOKEN);
      }
      const user = await User.findOne({_id: data.user_id });
      console.log(user, "userinisadmin");
      if (user === null) {
        throw Boom.badRequest("invalid credentials no such admin exists");
      } else if (user.role === APP_CONSTANTS.role.admin) {
        console.log(
          'adminuser')
        let userInfo = {
          id: user._id,
    
        };
        req.user = userInfo;
      
        next();
      } else {
        throw Boom.badRequest("invalid credentials of admin");
      }
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },
};
