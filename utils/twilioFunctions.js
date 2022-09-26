const Boom = require("boom");
const Joi = require("@hapi/joi");
const { Config } = require("../config");
const jwt = require("jsonwebtoken");
const isAValidPhoneNumber =  (number) => {
    return /^[\d\+\-\(\) ]+$/.test(number);
};
module.exports = {
  isAValidPhoneNumber
};


