const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Firm = require("../models/Firm");
const APP_CONSTANTS = require("../appConstants");
const responseMessages = require("../resources/response.json");
const universalFunctions = require("../utils/universalFunctions");
const Boom = require("boom");
const {Config} = require("../config");

const mongoose = require("mongoose");

//mongoose.set('debug', true);

module.exports = async (req, res, next) => {
    try {
        const token = req.header("auth-token") || req.headers["x-access-token"] || req.query["x-access-token"] || req.headers["authorization"];
        console.log('AUTH TOKEN == ', token);
        if (!token) {
            throw Boom.badRequest(responseMessages.INVALID_CREDENTIALS);
        }
        const data = jwt.verify(token, Config.jwtsecret);
        if (!data) {
            throw Boom.badRequest(responseMessages.INVALID_TOKEN);
        }
        const user = await User.findOne({_id: data.userId});
        if (user === null) {
            throw Boom.badRequest(responseMessages.INVALID_CREDENTIALS);
        } else {
            req.user = user;
            req.user.id = user._id;
            next();
        }
    } catch (error) {
        universalFunctions.sendError(error, res);
    }
};
