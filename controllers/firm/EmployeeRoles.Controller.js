const Firm = require("../../models/Firm");
const User = require("../../models/User");
const FirmEmployeeRoles = require("../../models/FirmEmployeeRoles");
const universalFunctions = require("../../utils/universalFunctions");
const Joi = require("@hapi/joi");
const Boom = require("boom");
const APP_CONSTANTS = require("../../appConstants");
const responseMessages = require("../../resources/response.json");

const index = async (req, res) => {
    let models = await FirmEmployeeRoles.paginate({
        firmId: req.firm._id
    });
    universalFunctions.sendSuccess({
        data: models,
    }, res);
};

const create = async (req, res) => {
    try {
        const {name} = req.body;

        const schema = Joi.object({
            name: Joi.string().required(),
        }).unknown(true);

        await universalFunctions.validateRequestPayload(req.body, res, schema);

        let model = null;
        if (name != null) {
            model = await FirmEmployeeRoles.findOne({
                name: name,
                firmId: req.firm.id
            });
        }

        if (model) {
            throw Boom.badRequest(responseMessages.EMPLOYEE_TYPE_ALREADY_EXIST);
        }

        model = new FirmEmployeeRoles();
        Object.assign(model, req.body);

        model.firmId = req.firm._id;
        model.createdBy = req.user._id;
        model.updatedBy = req.user._id;

        await model.save();
        return universalFunctions.sendSuccess({
            data: model,
        }, res);
    } catch (err) {
        universalFunctions.handleError(err, res);
    }
};

const view = async (req, res) => {
    try {
        const model = await FirmEmployeeRoles.findOne({
            _id: req.params.id,
            firmId: req.firm.id
        });
        if (model != null) {
            return universalFunctions.sendSuccess({
                data: model,
            }, res);
        } else {
            throw new Error(responseMessages.EMPLOYEE_TYPE_NOT_FOUND);
        }
    } catch (err) {
        universalFunctions.sendError(err, res);
    }
};

const update = async (req, res) => {
    try {
        const {name} = req.body;

        const schema = Joi.object({
            name: Joi.string().required(),
        }).unknown(true);

        await universalFunctions.validateRequestPayload(req.body, res, schema);

        const model = await FirmEmployeeRoles.findOne({
            _id: req.params.id,
            firmId: req.firm.id
        });
        if (model != null) {

            if (name != null) {
                let modelWithSame = await FirmEmployeeRoles.findOne({
                    name: name,
                    firmId: req.firm.id,
                    _id: {$ne: model._id}
                });
                if (modelWithSame != null) {
                    throw Boom.badRequest(responseMessages.EMPLOYEE_TYPE_ALREADY_EXIST);
                }
            }

            Object.assign(model, req.body);
            model.updatedBy = req.user.id;

            await model.save()
            return universalFunctions.sendSuccess({
                data: model,
            }, res);
        } else {
            throw new Error(responseMessages.EMPLOYEE_TYPE_NOT_FOUND);
        }
    } catch (err) {
        universalFunctions.handleError(err, res);
    }
};


module.exports = {index, create, view, update};
