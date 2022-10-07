const Firm = require("../../models/Firm");
const User = require("../../models/User");
const FirmInvoices = require("../../models/FirmInvoices");
const FirmContacts = require("../../models/FirmContacts");
const FirmInvoicesItems = require("../../models/FirmInvoicesItems");
const universalFunctions = require("../../utils/universalFunctions");
const Joi = require("@hapi/joi");
const Boom = require("boom");
const APP_CONSTANTS = require("../../appConstants");
const responseMessages = require("../../resources/response.json");
const mongoose = require('mongoose');

const index = async (req, res) => {
    let queryFields = {
        firmId: req.firm._id
    };

    if (req.query.search) {
        queryFields['$expr'] = {
            $regexMatch: {
                input: {$toString: "$invoiceNumber"},
                regex: req.query.search,
                options: "i"
            }
        };
    }

    if (req.query.status) {
        queryFields['status'] = req.query.status;
    }

    let models = await FirmInvoices.paginate(queryFields, {
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
    let invoiceItemIds = [];
    try {
        const {invoiceNumber, invoiceItems, firmContactId} = req.body;

        const schema = Joi.object({
            firmContactId: Joi.string().required().label("Client"),
            firmCaseId: Joi.string().required().label("Case"),
            receiptAddress: Joi.string().required().label("Address"),
            invoiceNumber: Joi.string().required().label("Invoice Number"),
            invoiceDate: Joi.string().required().label("Invoice Date"),
            dueDate: Joi.string().required().label("Due Date"),
            paymentTerm: Joi.string().required().label("Payment Term"),
            status: Joi.string().required(),
        }).unknown(true);

        await universalFunctions.validateRequestPayload(req.body, res, schema);

        if (invoiceItems === undefined || invoiceItems === "undefined" || invoiceItems == null || invoiceItems.length <= 0) {
            throw Boom.badRequest(responseMessages.INVOICE_ITEMS_MISSING);
        }

        let model = await FirmInvoices.findOne({
            invoiceNumber: invoiceNumber,
            firmId: req.firm.id
        });

        if (model) {
            throw Boom.badRequest(responseMessages.INVOICE_ALREADY_EXIST);
        }

        let contact = await FirmContacts.findOne({
            _id: firmContactId,
            firmId: req.firm.id
        });

        if (contact == null) {
            throw Boom.badRequest(responseMessages.CONTACT_NOT_FOUND);
        }

        model = new FirmInvoices();
        Object.assign(model, req.body);

        model._id = mongoose.Types.ObjectId();
        model.firmId = req.firm._id;
        model.createdBy = req.user._id;
        model.updatedBy = req.user._id;

        model.receiptName = universalFunctions.concatStrings(
            ' ',
            contact.firstName,
            contact.middleName,
            contact.lastName,
        );

        model.saveInvoiceItems(invoiceItems).then(async (ids) => {
            invoiceItemIds = ids;
            await model.save();
            await model.linkInvoiceItems();
            return universalFunctions.sendSuccess({
                data: model,
            }, res);
        }).catch(error => {
            throw error;
        });

    } catch (err) {
        if (invoiceItemIds.length > 0) {
            for (let invoiceItemId of invoiceItemIds) {
                const model = await FirmInvoicesItems.findOne({
                    _id: invoiceItemId
                });
                if (model != null) {
                    await model.delete();
                }
            }
        }
        universalFunctions.handleError(err, res);
    }
};

const view = async (req, res) => {
    try {
        let model = await FirmInvoices.findOne({
            _id: req.params.id,
            firmId: req.firm.id
        }).populate(["firmId", "firmCaseId"]);
        if (model != null) { 
            model = JSON.parse(JSON.stringify(model));
            model.invoiceItems = await FirmInvoicesItems.find({
                firmInvoiceId: model._id
            });
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

        const model = await FirmInvoices.findOne({
            _id: req.params.id,
            firmId: req.firm.id
        });
        if (model != null) {

            if (email != null) {
                let modelWithSame = await FirmInvoices.findOne({
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


const deleteRecord = async (req, res) => {
    try {
        const model = await FirmInvoices.findOne({
            _id: req.params.id,
            firmId: req.firm.id
        });
        if (model != null) {
            if (model.paidAmount > 0) {
                throw new Error(responseMessages.INVOICE_NO_DELETE_PAYMENTS);
            } else {
                await model.unLinkInvoiceItems();
                await FirmInvoicesItems.deleteMany({
                    firmInvoiceId: model._id
                });
                await model.delete();
                return universalFunctions.sendSuccess({
                    success: true,
                }, res);
            }
        } else {
            throw new Error(responseMessages.ACTIVITY_TYPE_NOT_FOUND);
        }
    } catch (err) {
        universalFunctions.sendError(err, res);
    }
};

const stats = async (req, res) => {
    let status = {};
    let statsData = await FirmInvoices.aggregate([
        {
            $match: {
                firmId: req.firm._id
            }
        },
        {
            $group: {
                _id: "$status",
                totalPayAbleAmount: {
                    $sum: "$payableAmount"
                }
            }
        }
    ]);
    for (let statData of statsData) {
        status[statData._id] = statData.totalPayAbleAmount;
    }
    return universalFunctions.sendSuccess({
        data: status,
    }, res);
};


const nextInvoiceNumber = async (req, res) => {
    let nextInvoiceNumber = 1000000;
    let lastInvoice = await FirmInvoices.findOne({
        firmId: req.firm.id
    }, {}, {sort: {'created_at': -1}});
    if (lastInvoice != null) {
        nextInvoiceNumber = lastInvoice.invoiceNumber;
        nextInvoiceNumber = nextInvoiceNumber * 1;
        nextInvoiceNumber++;
    }
    return universalFunctions.sendSuccess({
        data: nextInvoiceNumber,
    }, res);
}

module.exports = {index, create, view, update, deleteRecord, stats, nextInvoiceNumber};
