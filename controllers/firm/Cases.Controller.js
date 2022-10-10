const Firm = require("../../models/Firm");
const User = require("../../models/User");
const FirmCases = require("../../models/FirmCases");
const FirmCaseContacts = require("../../models/FirmCaseContacts");
const FirmCaseEmployees = require("../../models/FirmCaseEmployees");
const universalFunctions = require("../../utils/universalFunctions");
const Joi = require("@hapi/joi");
const Boom = require("boom");
const APP_CONSTANTS = require("../../appConstants");
const responseMessages = require("../../resources/response.json");
const mongoose = require("mongoose");

const index = async (req, res) => {
    let models = await FirmCases.paginate({
        firmId: req.firm._id,
        name: {$regex: req.query.search ? req.query.search : '', $options: "i"},
    }, {
        sort: {
            updatedAt: 'desc'
        },
        // populate: universalFunctions.getPopulateData(req),
        populate: 'billingContactId',
        page: req.query.page ? req.query.page : 1,
        limit: req.query.limit ? req.query.limit : APP_CONSTANTS.PER_PAGE,
    });
    universalFunctions.sendSuccess({
        data: models,
    }, res);
};

const create = async (req, res) => {
    try {
        const {caseName} = req.body;

        const schema = Joi.object({
            caseName: Joi.string().required(),
        }).unknown(true);

        await universalFunctions.validateRequestPayload(req.body, res, schema);

        let model = null;
        if (caseName != null) {
            model = await FirmCases.findOne({
                caseName: caseName,
                firmId: req.firm.id
            });
        }

        if (model) {
            throw Boom.badRequest(responseMessages.CASE_ALREADY_EXIST);
        }

        model = new FirmCases();
        Object.assign(model, req.body);

        model.firmId = req.firm._id;
        model.createdBy = req.user._id;
        model.updatedBy = req.user._id;

        model.firmCaseContactIds = [];
        model.firmCaseEmployeeIds = [];

        model._id = new mongoose.Types.ObjectId();

        if (req.body.clients && req.body.clients.length > 0) {
            for (let contact of req.body.clients) {
                let caseContacts = new FirmCaseContacts();
                caseContacts.firmId = req.firm._id;
                caseContacts.firmCaseId = model._id;
                caseContacts.firmContactId = contact;
                await caseContacts.save();
                model.firmCaseContactIds.push(caseContacts._id);
            }
        }

        if (req.body.employees && Object.keys(req.body.employees).length > 0) {
            for (let employeeId in req.body.employees) {
                let employeeData = req.body.employees[employeeId];
                let caseEmployees = new FirmCaseEmployees();
                caseEmployees.firmId = req.firm._id;
                caseEmployees.firmCaseId = model._id;
                caseEmployees.firmEmployeeId = employeeId;
                caseEmployees.ratePerHour = employeeData.ratePerHour;
                await caseEmployees.save();
                model.firmCaseEmployeeIds.push(caseEmployees._id);
            }
        }

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
        let populate = [];
        if (req.query.extra && req.query.extra.length > 0) {
            for (let extraField of req.query.extra) {
                switch (extraField) {
                    case 'clients':
                        populate.push({
                            path: 'firmCaseContactIds',
                            populate: {path: 'firmContactId'}
                        });
                        break;
                    case 'employees':
                        populate.push({
                            path: 'firmCaseEmployeeIds',
                            populate: {path: 'firmEmployeeId'}
                        });
                        break;
                }
            }
        }
        let singlePopulate = universalFunctions.getPopulateData(req);
        populate = populate.concat(singlePopulate);
        let model = await FirmCases.findOne({
            _id: req.params.id,
            firmId: req.firm.id
        }).populate(populate);
        if (model != null) {
            return universalFunctions.sendSuccess({
                data: model
            }, res);
        } else {
            throw new Error(responseMessages.PRACTICE_AREA_NOT_FOUND);
        }
    } catch (err) {
        universalFunctions.sendError(err, res);
    }
};

const update = async (req, res) => {
    try {
        const {caseName} = req.body;

        const schema = Joi.object({
            caseName: Joi.string().required(),
        }).unknown(true);

        await universalFunctions.validateRequestPayload(req.body, res, schema);

        const model = await FirmCases.findOne({
            _id: req.params.id,
            firmId: req.firm.id
        });
        if (model != null) {

            if (caseName != null) {
                let modelWithSame = await FirmCases.findOne({
                    caseName: caseName,
                    firmId: req.firm.id,
                    _id: {$ne: model._id}
                });
                if (modelWithSame != null) {
                    throw Boom.badRequest(responseMessages.CASE_ALREADY_EXIST);
                }
            }

            Object.assign(model, req.body);
            model.updatedBy = req.user.id;

            let firmCaseContactIds = model.firmCaseContactIds;
            let firmCaseEmployeeIds = model.firmCaseEmployeeIds;

            model.firmCaseContactIds = [];
            model.firmCaseEmployeeIds = [];

            if (req.body.clients && req.body.clients.length > 0) {
                for (let contact of req.body.clients) {
                    let caseContact = await FirmCaseContacts.findOne({
                        firmId: req.firm._id,
                        firmCaseId: model._id,
                        firmContactId: contact
                    });
                    if (!caseContact) {
                        caseContact = new FirmCaseContacts();
                        caseContact.firmId = req.firm._id;
                        caseContact.firmCaseId = model._id;
                        caseContact.firmContactId = contact;
                        await caseContact.save();
                        model.firmCaseContactIds.push(caseContact._id);
                    } else {
                        model.firmCaseContactIds.push(caseContact._id);
                    }
                    if (firmCaseContactIds.includes(caseContact._id)) {
                        firmCaseContactIds.splice(firmCaseContactIds.indexOf(caseContact._id), 1);
                    }
                }
            }

            for (let firmCaseContactId of firmCaseContactIds) {
                FirmCaseContacts.delete({_id: firmCaseContactId}, function (err, result) {
                });
            }

            if (req.body.employees && Object.keys(req.body.employees).length > 0) {
                for (let employeeId in req.body.employees) {
                    let employeeData = req.body.employees[employeeId];
                    let caseEmployee = await FirmCaseEmployees.findOne({
                        firmId: req.firm._id,
                        firmCaseId: model._id,
                        firmEmployeeId: employeeId
                    });
                    if (!caseEmployee) {
                        caseEmployee = new FirmCaseEmployees();
                        caseEmployee.firmId = req.firm._id;
                        caseEmployee.firmCaseId = model._id;
                        caseEmployee.firmEmployeeId = employeeId;
                        caseEmployee.ratePerHour = employeeData.ratePerHour;
                        await caseEmployee.save();
                        model.firmCaseEmployeeIds.push(caseEmployee._id);
                    } else {
                        await FirmCaseEmployees.updateOne(
                            {_id: caseEmployee._id},
                            {
                                $set: {
                                    ratePerHour: employeeData.ratePerHour
                                },
                            },
                            {upsert: true}
                        );
                        model.firmCaseEmployeeIds.push(caseEmployee._id);
                    }
                    if (firmCaseEmployeeIds.includes(caseEmployee._id)) {
                        firmCaseEmployeeIds.splice(firmCaseEmployeeIds.indexOf(caseEmployee._id), 1);
                    }
                }
            }

            for (let firmCaseEmployeeId of firmCaseEmployeeIds) {
                FirmCaseEmployees.delete({_id: firmCaseEmployeeId}, function (err, result) {
                });
            }

            console.log(req.body);
            console.log(model);

            await model.save();

            return universalFunctions.sendSuccess({
                data: model,
            }, res);
        } else {
            throw new Error(responseMessages.CASE_NOT_FOUND);
        }
    } catch (err) {
        universalFunctions.handleError(err, res);
    }
};


const caseEmployees = async (req, res) => {
    let models = await FirmCaseEmployees.find({
        firmId: req.firm._id,
        firmCaseId: req.params.id
    }).populate([
        'firmEmployeeId',
        {
            path: 'firmEmployeeId',
            populate: {path: 'userId'}
        },
        {
            path: 'firmEmployeeId',
            populate: {path: 'firmEmployeeRoleId'}
        },
        {
            path: 'firmEmployeeId',
            populate: {path: 'firmEmployeeTypeId'}
        }
    ]);
    universalFunctions.sendSuccess({
        data: models,
    }, res);
};


module.exports = {index, create, view, update, caseEmployees};
