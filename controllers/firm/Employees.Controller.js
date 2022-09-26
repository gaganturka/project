const Firm = require("../../models/Firm");
const User = require("../../models/User");
const FirmEmployees = require("../../models/FirmEmployees");
const universalFunctions = require("../../utils/universalFunctions");
const Joi = require("@hapi/joi");
const Boom = require("boom");
const APP_CONSTANTS = require("../../appConstants");
const responseMessages = require("../../resources/response.json");

const index = async (req, res) => {
    let models = await FirmEmployees.paginate({
        firmId: req.firm._id,
        name: {$regex: req.query.search ? req.query.search : '', $options: "i"},
    }, {
        sort: {
            updatedAt: 'desc'
        },
        page: req.query.page ? req.query.page : 1,
        populate: universalFunctions.getPopulateData(req),
        limit: req.query.limit ? req.query.limit : APP_CONSTANTS.PER_PAGE,
    });
    universalFunctions.sendSuccess({
        data: models,
    }, res);
};

const create = async (req, res) => {
    try {
        const {email, password} = req.body;

        const schema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
        }).unknown(true);

        await universalFunctions.validateRequestPayload(req.body, res, schema);

        let user = await User.findOne({
            email: email
        });

        if (user == null) {
            const hashedPassword = await bcrypt.hash(password, 12);
            user = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                isEmailVerified: true,
                role: APP_CONSTANTS.role.firmadmin,
                userData: {
                    model: APP_CONSTANTS.role.firmadmin,
                    data: firmAdmin._id,
                },
            });
        }

        let model = null;
        if (email != null) {
            model = await FirmEmployees.findOne({
                email: email,
                firmId: req.firm.id
            });
        }

        if (model) {
            throw Boom.badRequest(responseMessages.EMPLOYEE_ALREADY_EXIST);
        }

        model = new FirmEmployees();
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
        const model = await FirmEmployees.findOne({
            _id: req.params.id,
            firmId: req.firm.id
        });
        if (model != null) {
            return universalFunctions.sendSuccess({
                data: model,
            }, res);
        } else {
            throw new Error(responseMessages.EMPLOYEE_NOT_FOUND);
        }
    } catch (err) {
        universalFunctions.sendError(err, res);
    }
};

const update = async (req, res) => {
    try {
        const {email} = req.body;

        const schema = Joi.object({
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().required()
        }).unknown(true);

        await universalFunctions.validateRequestPayload(req.body, res, schema);

        const model = await FirmEmployees.findOne({
            _id: req.params.id,
            firmId: req.firm.id
        });
        if (model != null) {

            if (name != null) {
                let modelWithSame = await FirmEmployees.findOne({
                    email: email,
                    firmId: req.firm.id,
                    _id: {$ne: model._id}
                });
                if (modelWithSame != null) {
                    throw Boom.badRequest(responseMessages.EMPLOYEE_ALREADY_EXIST);
                }
            }

            Object.assign(model, req.body);
            model.updatedBy = req.user.id;

            await model.save()
            return universalFunctions.sendSuccess({
                data: model,
            }, res);
        } else {
            throw new Error(responseMessages.EMPLOYEE_NOT_FOUND);
        }
    } catch (err) {
        universalFunctions.handleError(err, res);
    }
};


module.exports = {index, create, view, update};
