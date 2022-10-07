const Boom = require("boom");
const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const {Config} = require('../config')
const jwt = require('jsonwebtoken')
const responseMessages = require("../resources/response.json");

const validateRequestPayload = async (requestObj, res, schema) => {
    return new Promise((resolve, reject) => {
        const {error} = Joi.validate(requestObj, schema);
        if (error) {
            let message = sendBadRequestError(error, res);
            reject(Boom.badRequest(message));
        } else {
            resolve();
        }
    });
};

const handleDuplicateField = (err) => {
    let message;
    console.log('duplicate error kind');
    console.log(err);
    console.log(err.keyValue);
    const keys = Object.keys(err.keyValue);
    if (keys.includes('email')) message = 'User already exists';
    return message;
}

const handleValidationError = (err) => {
    let message;
    const key = Object.keys(err.errors);
    message = `Invalid ${err.errors[key[0]].path}: ${err.errors[key[0]].value}.`;
    if (err.errors[key[0]] && err.errors[key[0]].properties) {
        message = err.errors[key[0]].properties.message;
        message = message.replace('Path', 'Field');
    }
    return message;
}

const handleError = (err, res) => {
    let message = null;
    if (err.code === 11000) {
        message = handleDuplicateField(err);
    } else if (err.name === 'ValidationError') {
        message = handleValidationError(err);
    }
    if (message != null) {
        return sendError(message, res);
    } else {
        return sendError(err, res);
    }
}

const sendError = (data, res) => {
    let error;
    console.log("ERROR OCCURRED IN SEND ERROR FUNCTION", data);
    let message = null;

    if (typeof data == "object" && !data.isBoom) {
        if (data.name == "MongoError") {
            // Check Mongo Error
            message = responseMessages.DB_ERROR;
            if (data.code == 11000) {
                if (data.message.split(" ").indexOf("email_1") > -1) {
                    const conflictError = Boom.conflict(
                        responseMessages.EMAIL_ALREADY_EXISTS
                    );
                    return res.json(conflictError.output.payload);
                } else {
                    message = responseMessages.DUPLICATE;
                }
            }
        } else if (data.name == "ApplicationError") {
            message = responseMessages.APP_ERROR;
        } else if (data.name == "ValidationError") {
            message = responseMessages.APP_ERROR;
        } else if (data.name == "CastError") {
            message = responseMessages.INVALID_OBJECT_ID;
        } else if (data.response) {
            message = data.response.message;
        } else if (data.message) {
            message = data.message;
        } else {
            message = responseMessages.DEFAULT;
        }
        if (message !== null) {
            error = new Boom(message, {
                statusCode: 400,
            });
            return res.json(error.output.payload);
        }
    } else if (typeof data == "object" && data.isBoom) {
        if (data.data && data.data.code) {
            data.output.payload.code = data.data.code;
        }
        return res.json(data.output.payload);
    } else {
        error = new Boom(data, {
            statusCode: 400,
        });
        return res.json(error.output.payload);
    }
};

/*-------------------------------------------------------------------------------
 * send success
 * -----------------------------------------------------------------------------*/

const sendSuccess = (response, res) => {
    const statusCode =
        response && response.statusCode ? response.statusCode : 200;
    const message = response && response.message ? response.message : "Success";
    const data = response.data ? response.data : {};
    data.password && delete data.password;

    return res.json({
        statusCode,
        message,
        data,
    });
};

/*-------------------------------------------------------------------------------
 * Joi error handle
 * -----------------------------------------------------------------------------*/
const sendBadRequestError = (error, res) => {
    let message = error.details[0].message;
    message = message.replace(/"/g, "");
    message = message.replace("[", "");
    message = message.replace("]", "");

    return message;
};
const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};

const getPopulateData = (req) => {
    let populateRef = [];
    let referencesAsked = req.query.with;
    if (referencesAsked !== undefined && referencesAsked !== null) {
        for (let reference of referencesAsked) {
            populateRef.push(reference);
        }
    }
    return populateRef;
}

const isEmptyData = (data) => {
    if (data !== undefined && data !== "undefined" && data !== '' && data !== null) {
        return false;
    }else{
        return true;
    }
}

const concatStrings = (separator, ...strings) => {
    let finalString = '';
    for (let string of strings) {
        if (string !== null && string !== undefined) {
            string = string.toString().trim();
            finalString += string + separator;
        }
    }
    finalString = finalString.trim();
    return finalString;
}

module.exports = {
    concatStrings,
    isEmptyData,
    validateRequestPayload,
    sendSuccess,
    sendError,
    asyncForEach,
    getPopulateData,
    handleError,
};
