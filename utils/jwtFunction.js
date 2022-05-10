const Boom = require("boom");
const Joi = require("@hapi/joi");
const { Config } = require("../config");
const jwt = require("jsonwebtoken");
const jwtGenerator = async (userId) => {
  const token = jwt.sign({ user_id: userId,deviceType:'1',deviceToken:"" }, Config.jwtsecret);
  return token;
};
const jwtGeneratorApp = async (userId,deviceType,deviceToken) => {
  const token = jwt.sign({ user_id: userId,deviceType,deviceToken }, Config.jwtsecret);
  return token;
};
module.exports = {
  jwtGenerator,
  jwtGeneratorApp
};
