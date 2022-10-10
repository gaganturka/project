const Firm = require("../../models/Firm");
const User = require("../../models/User");

const FirmCases = require("../../models/FirmCases");
const FirmCaseContacts = require("../../models/FirmCaseContacts");
const FirmCaseEmployees = require("../../models/FirmCaseEmployees");
const FirmInvoicesItems = require("../../models/FirmInvoicesItems");
const FirmCaseTimeEntries = require("../../models/FirmCaseTimeEntries");
const FirmCaseExpenses = require("../../models/FirmCaseExpenses");

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
            throw new Error(responseMessages.CASE_NOT_FOUND);
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

const invoiceAbleItems = async (req, res) => {
    try {
        let caseModel = await FirmCases.findOne({
            _id: req.params.id,
            firmId: req.firm.id
        });
        if (caseModel != null) {
            let invoiceAbleItems = [];

            //flat fee
            let pendingCaseFee = 0;
            if (caseModel.flatFee > 0) {
                pendingCaseFee = caseModel.flatFee;
            }

            let totalPaid = await FirmInvoicesItems.aggregate([
                {
                    $match: {
                        itemType: APP_CONSTANTS.invoiceItemTypes.flatFee,
                        referenceId: caseModel._id.toString()
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$total"
                        }
                    }
                }
            ]);

            if (totalPaid != null && totalPaid.length > 0) {
                pendingCaseFee = pendingCaseFee - totalPaid[0]['total'];
            }

            if (pendingCaseFee > 0) {
                invoiceAbleItems.push({
                    referenceId: caseModel._id,
                    itemType: APP_CONSTANTS.invoiceItemTypes.flatFee,
                    item: 'Flat Fee',
                    notes: 'Case Flat Fee',
                    total: pendingCaseFee
                });
            }

            //time entries
            let timeEntries = await FirmCaseTimeEntries.find({
                firmCaseId: caseModel._id,
                isBillable: true,
                firmInvoiceItemId: {$eq: null}
            }).populate(['firmActivityTypeId']);

            if (timeEntries != null && timeEntries.length > 0) {
                for (let timeEntryModel of timeEntries) {
                    invoiceAbleItems.push({
                        referenceId: timeEntryModel._id,
                        itemType: APP_CONSTANTS.invoiceItemTypes.timeEntries,
                        item: timeEntryModel.firmActivityTypeId?.name,
                        date: timeEntryModel.date,
                        notes: timeEntryModel.description,
                        rate: timeEntryModel.rate,
                        duration: timeEntryModel.duration,
                        rateType: timeEntryModel.rateType,
                        total: timeEntryModel.amount,
                    });
                }
            }

            //expenses
            let expenses = await FirmCaseExpenses.find({
                firmCaseId: caseModel._id,
                isBillable: true,
                firmInvoiceItemId: {$eq: null}
            }).populate(['firmActivityTypeId']);

            if (expenses != null && expenses.length > 0) {
                for (let expenseModel of expenses) {
                    invoiceAbleItems.push({
                        referenceId: expenseModel._id,
                        itemType: APP_CONSTANTS.invoiceItemTypes.expenses,
                        item: expenseModel.firmActivityTypeId?.name,
                        date: expenseModel.date,
                        notes: expenseModel.description,
                        rate: expenseModel.cost,
                        quantity: expenseModel.quantity,
                        total: expenseModel.amount,
                    });
                }
            }

            return universalFunctions.sendSuccess({
                data: {
                    case: caseModel,
                    invoiceAbleItems
                }
            }, res);
        } else {
            throw new Error(responseMessages.CASE_NOT_FOUND);
        }
    } catch (err) {
        universalFunctions.sendError(err, res);
    }
};


module.exports = {index, create, view, update, caseEmployees, invoiceAbleItems};
