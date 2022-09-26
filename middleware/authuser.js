const APP_CONSTANTS = require("../appConstants");
const { Config } = require("../config");
const Jwt = require("jsonwebtoken");
const responseMessages = require("../resources/response.json");
const universalFunctions = require("../utils/universalFunctions");
const Boom = require("boom");
const User = require("../models/User");
const checkAuth = async (req, res, next) => {
  const token =
    req.headers["x-access-token"] ||
    req.query["x-access-token"] ||
    req.headers["authorization"] ||
    req.headers["token"];

  if (token) {
    const decoded = Jwt.verify(token, Config.jwtsecret);

    try {
      let user = await User.findOne({
        _id: decoded.user_id,
        role: APP_CONSTANTS.role.borhanuser,
      });
      if (!user) {
        throw Boom.unauthorized(responseMessages.USER_NOT_FOUND);
      }
      // let userInfo = {
      //   id: user._id,
      // };
      req.user = user;
      req.user.id = user._id;
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

module.exports = {
  checkAuth,
};
