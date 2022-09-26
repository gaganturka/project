const Firm = require("../../models/Firm");
const User = require("../../models/User");
const FirmContacts = require("../../models/FirmContacts");
const universalFunctions = require("../../utils/universalFunctions");
const Joi = require("@hapi/joi");
const Boom = require("boom");
const APP_CONSTANTS = require("../../appConstants");
const responseMessages = require("../../resources/response.json");

const index = async (req, res) => {
    let queryFields = {
        firmId: req.firm._id
    };

    if (req.query.search) {
        queryFields['$expr'] = {
            $regexMatch: {
                input: {
                    $concat: [
                        {$ifNull: ["$firstName", ""]},
                        " ",
                        {$ifNull: ["$middleName", ""]},
                        " ",
                        {$ifNull: ["$lastName", ""]}
                    ]
                },
                regex: req.query.search,
                options: "i"
            }
        };
    }

    if (req.query.contactGroupId) {
        queryFields['firmContactGroupId'] = req.query.contactGroupId;
    }

    if (req.query.contactType) {
        queryFields['contactType'] = req.query.contactType;
    }

    console.log(queryFields);

    let models = await FirmContacts.paginate(queryFields, {
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
        const {email} = req.body;

        const schema = Joi.object({
            email: Joi.string().email(),
        }).unknown(true);

        await universalFunctions.validateRequestPayload(req.body, res, schema);

        let model = null;
        if (email != null) {
            model = await FirmContacts.findOne({
                email: email,
                firmId: req.firm.id
            });
        }

        if (model) {
            throw Boom.badRequest(responseMessages.CONTACT_EMAIL_ALREADY_EXIST);
        }

        model = new FirmContacts();
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
        const model = await FirmContacts.findOne({
            _id: req.params.id,
            firmId: req.firm.id
        });
        if (model != null) {
            return universalFunctions.sendSuccess({
                data: model,
            }, res);
        } else {
            throw new Error(responseMessages.CONTACT_NOT_FOUND);
        }
    } catch (err) {
        universalFunctions.sendError(err, res);
    }
};

const update = async (req, res) => {
    try {
        const {email} = req.body;

        const schema = Joi.object({
            email: Joi.string().email(),
        }).unknown(true);

        await universalFunctions.validateRequestPayload(req.body, res, schema);

        const model = await FirmContacts.findOne({
            _id: req.params.id,
            firmId: req.firm.id
        });
        if (model != null) {

            if (email != null) {
                let modelWithSame = await FirmContacts.findOne({
                    email: email,
                    firmId: req.firm.id,
                    _id: {$ne: model._id}
                });
                if (modelWithSame != null) {
                    throw Boom.badRequest(responseMessages.CONTACT_EMAIL_ALREADY_EXIST);
                }
            }

            Object.assign(model, req.body);
            model.updatedBy = req.user.id;

            await model.save()
            return universalFunctions.sendSuccess({
                data: model,
            }, res);
        } else {
            throw new Error(responseMessages.CONTACT_NOT_FOUND);
        }
    } catch (err) {
        universalFunctions.handleError(err, res);
    }
};


module.exports = {index, create, view, update};
