const universalFunctions = require("../utils/universalFunctions");
const Firm = require("../models/Firm");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const { Config } = require("../config");
const Boom = require("boom")

const addFirm = async (req, res) => {
    try {
        const schema = Joi.object({
            contactNo: Joi.string().required(),
            firmName: Joi.string().required(),
            firmEmail: Joi.string().email().required(),
            contactPerson: Joi.string().required(),
            companyRegNo: Joi.string().allow(""),
            password: Joi.string().required()
        });
        await universalFunctions.validateRequestPayload(req.body, res, schema);
        let payload = req.body

        const password = await jwt.sign(payload.password, Config.jwtsecret);

        payload.password = password
        await Firm.create(payload)
        universalFunctions.sendSuccess(
            {
                statusCode: 200,
                message: "Firm Added Successfully",
                data: {},
            },
            res
        );
    } catch (err) {
        universalFunctions.sendError(err, res);
    }

}


const getAllFirms = async (req, res) => {
    try {
        let filter = {}
        let firmData = await Firm.find(filter)
        universalFunctions.sendSuccess(
            {
                statusCode: 200,
                message: "Success",
                data: firmData,
            },
            res
        );
    } catch (err) {
        universalFunctions.sendError(err, res);
    }

}

const getFirmById = async (req, res) => {
    try {
        let { firmId } = req.query

        let firmData = await Firm.findOne({ _id: firmId }).select({ contactNo: 1, firmName: 1, firmEmail: 1, contactPerson: 1, password: 1, companyRegNo: 1 })
        if (!firmData) {
            throw Boom.notFound("No Such Firm")
        }
        const password = await jwt.verify(firmData.password, Config.jwtsecret);

        firmData = JSON.parse(JSON.stringify(firmData))
        firmData.password = password

        universalFunctions.sendSuccess(
            {
                statusCode: 200,
                message: "Success",
                data: { firmData },
            },
            res
        );
    } catch (err) {
        universalFunctions.sendError(err, res);
    }

}

const editFirm = async (req, res) => {
    try {
        const schema = Joi.object({
            firmId: Joi.string().required(),
            contactNo: Joi.string().required(),
            firmName: Joi.string().required(),
            firmEmail: Joi.string().email().required(),
            contactPerson: Joi.string().required(),
            companyRegNo: Joi.string().allow(""),
            password: Joi.string().required()
        });
        await universalFunctions.validateRequestPayload(req.body, res, schema);
        let payload = req.body

        const password = await jwt.sign(payload.password, Config.jwtsecret);

        payload.password = password
        await Firm.findOneAndUpdate({ _id: payload.firmId }, payload)
        universalFunctions.sendSuccess(
            {
                statusCode: 200,
                message: "Firm Edited Successfully",
                data: {},
            },
            res
        );
    } catch (err) {
        universalFunctions.sendError(err, res);
    }

}


module.exports = { addFirm, getAllFirms, getFirmById, editFirm }