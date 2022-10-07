const universalFunctions = require("../utils/universalFunctions");
const Joi = require("@hapi/joi");
const Boom = require("boom");
const Country = require('country-state-city').Country;
const State = require('country-state-city').State;
const City = require('country-state-city').City;
const APP_CONSTANTS = require("../appConstants");

const countries = async (req, res) => {
    universalFunctions.sendSuccess({
        data: Country.getAllCountries(),
    }, res);
};

const states = async (req, res) => {
    if (req.query.countryCode !== undefined) {
        universalFunctions.sendSuccess({
            data: State.getStatesOfCountry(req.query.countryCode),
        }, res);
    } else {
        universalFunctions.sendError({
            message: 'Field countryCode is required'
        }, res);
    }
};

const cities = async (req, res) => {
    if (req.query.countryCode != undefined) {
        if (req.query.stateCode != undefined) {
            universalFunctions.sendSuccess({
                data: City.getCitiesOfState(req.query.countryCode, req.query.stateCode),
            }, res);
        } else {
            universalFunctions.sendError({
                message: 'Field stateCode is required'
            }, res);
        }
    } else {
        universalFunctions.sendError({
            message: 'Field countryCode is required'
        }, res);
    }
};

const contactTypes = async (req, res) => {
    universalFunctions.sendSuccess({
        data: APP_CONSTANTS.contactTypes,
    }, res);
};

const courtTypes = async (req, res) => {
    universalFunctions.sendSuccess({
        data: APP_CONSTANTS.courtTypes,
    }, res);
};

const officeTypes = async (req, res) => {
    universalFunctions.sendSuccess({
        data: APP_CONSTANTS.officeTypes,
    }, res);
};

const caseBillingMethods = async (req, res) => {
    universalFunctions.sendSuccess({
        data: APP_CONSTANTS.caseBillingMethods,
    }, res);
};

const invoiceStatues = async (req, res) => {
    universalFunctions.sendSuccess({
        data: APP_CONSTANTS.invoiceStatus,
    }, res);
};

const invoicePaymentTerms = async (req, res) => {
    universalFunctions.sendSuccess({
        data: APP_CONSTANTS.invoicePaymentTerms,
    }, res);
};

module.exports = {
    countries,
    states,
    cities,
    contactTypes,
    courtTypes,
    officeTypes,
    caseBillingMethods,
    invoiceStatues,
    invoicePaymentTerms,
};
