const mongoose = require("mongoose");
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const APP_CONSTANTS = require("../appConstants");
const FirmInvoicesItems = require("./FirmInvoicesItems");
const FirmCaseTimeEntries = require("./FirmCaseTimeEntries");
const FirmCaseExpenses = require("./FirmCaseExpenses");

const universalFunctions = require("./../utils/universalFunctions");

const FirmInvoicesSchema = new Schema({
        firmId: {type: Schema.Types.ObjectId, ref: "Firm", required: true},
        firmContactId: {type: Schema.Types.ObjectId, ref: "FirmContacts", required: true},
        firmCaseId: {type: Schema.Types.ObjectId, ref: "FirmCases"},
        invoiceNumber: {type: Number},
        invoiceDate: {type: Date},
        dueDate: {type: Date},
        paymentTerm: {
            type: String,
            enum: ['dueDate', 'dueOnReceipt', 'net15', 'net30', 'net60'],
            default: APP_CONSTANTS.invoicePaymentTerms.dueOnReceipt
        },
        automatedReminders: {type: Boolean, default: false},
        status: {
            type: String,
            enum: ['draft', 'sent', 'unsent', 'forwarded', 'paid', 'partialPaid', 'overdue'],
            default: APP_CONSTANTS.invoiceStatus.draft
        },
        receiptName: {type: String, required: true},
        receiptAddress: {type: String, required: true},
        terms: {type: String},
        notes: {type: String},
        flatFeeTotal: {type: Number, required: true},
        timeEntriesTotal: {type: Number, required: true},
        expensesTotal: {type: Number, required: true},
        forwardedBalance: {type: Number, required: true},
        subTotal: {type: Number, required: true},
        discounts: {type: Number, required: true},
        interests: {type: Number, required: true},
        taxes: {type: Number, required: true},
        additions: {type: Number, required: true},
        payableAmount: {type: Number, required: true},
        paidAmount: {type: Number, required: true, default: 0},
        createdBy: {type: Schema.Types.ObjectId, ref: "user", required: true},
        updatedBy: {type: Schema.Types.ObjectId, ref: "user", default: null},
        firmInvoiceId: {type: Schema.Types.ObjectId, ref: "FirmInvoices", default: null},
        firmInvoiceItemId: {type: Schema.Types.ObjectId, ref: "FirmInvoiceItems", default: null},
    },
    {timestamps: true}
);

FirmInvoicesSchema.plugin(mongoosePaginate);

FirmInvoicesSchema.pre('validate', async function (next) {
    let invoiceItems = await FirmInvoicesItems.find({
        firmInvoiceId: this._id
    });
    for (let invoiceItem of invoiceItems) {

        let subTotal = 0;
        let flatFeeTotal = 0;
        let timeEntriesTotal = 0;
        let expensesTotal = 0;
        let balanceForwardedTotal = 0;
        let additions = 0;
        let interests = 0;
        let taxes = 0;
        let discounts = 0;

        for (let invoiceItem of invoiceItems) {
            let invoiceTotal = invoiceItem.total;
            invoiceTotal = invoiceTotal * 1;
            if (!invoiceItem.isNonBillable) {
                if (invoiceItem.itemType === 'adjustments') {
                    switch (invoiceItem.item) {
                        case "discount":
                            discounts = discounts + invoiceTotal;
                            break;
                        case "interest":
                            interests = interests + invoiceTotal;
                            break;
                        case "tax":
                            taxes = taxes + invoiceTotal;
                            break;
                        case "addition":
                            additions = additions + invoiceTotal;
                            break;
                    }
                } else {
                    subTotal = subTotal + invoiceTotal;
                    switch (invoiceItem.itemType) {
                        case "flatFee":
                            flatFeeTotal = flatFeeTotal + invoiceTotal;
                            break;
                        case "timeEntries":
                            timeEntriesTotal = timeEntriesTotal + invoiceTotal;
                            break;
                        case "expenses":
                            expensesTotal = expensesTotal + invoiceTotal;
                            break;
                        case "unpaidInvoiceForwarded":
                            balanceForwardedTotal = balanceForwardedTotal + invoiceTotal;
                            break;
                    }
                }
            }
        }

        let grandTotal = ((subTotal + (additions + interests + taxes)) - discounts);

        this.flatFeeTotal = flatFeeTotal;
        this.timeEntriesTotal = timeEntriesTotal;
        this.expensesTotal = expensesTotal;
        this.forwardedBalance = balanceForwardedTotal;

        this.additions = additions;
        this.interests = interests;
        this.taxes = taxes;
        this.discounts = discounts;

        this.subTotal = subTotal;
        this.payableAmount = grandTotal;

    }
    next();
});

FirmInvoicesSchema.methods.linkInvoiceItems = function (invoiceItems) {
    return new Promise(async (resolve) => {
        let invoiceItems = await FirmInvoicesItems.find({
            firmInvoiceId: this._id
        });
        for (let invoiceItem of invoiceItems) {
            if (invoiceItem.referenceId != null) {
                switch (invoiceItem.itemType) {
                    case "timeEntries":
                        await FirmCaseTimeEntries.findOneAndUpdate({
                            _id: invoiceItem.referenceId
                        }, {
                            firmInvoiceId: this._id,
                            firmInvoiceItemId: invoiceItem._id,
                        });
                        break;
                    case "expenses":
                        await FirmCaseExpenses.findOneAndUpdate({
                            _id: invoiceItem.referenceId
                        }, {
                            firmInvoiceId: this._id,
                            firmInvoiceItemId: invoiceItem._id,
                        });
                        break;
                    case "unpaidInvoiceForwarded":
                        await self.findOneAndUpdate({
                            _id: invoiceItem.referenceId
                        }, {
                            firmInvoiceId: this._id,
                            firmInvoiceItemId: invoiceItem._id,
                        });
                        break;
                }
            }
        }
        return resolve(true);
    });
};

FirmInvoicesSchema.methods.unLinkInvoiceItems = function (invoiceItems) {
    return new Promise(async (resolve) => {
        let invoiceItems = await FirmInvoicesItems.find({
            firmInvoiceId: this._id
        });
        for (let invoiceItem of invoiceItems) {
            if (invoiceItem.referenceId != null) {
                switch (invoiceItem.itemType) {
                    case "timeEntries":
                        await FirmCaseTimeEntries.findOneAndUpdate({
                            _id: invoiceItem.referenceId,
                            firmInvoiceItemId: invoiceItem._id
                        }, {
                            firmInvoiceId: null,
                            firmInvoiceItemId: null
                        });
                        break;
                    case "expenses":
                        await FirmCaseExpenses.findOneAndUpdate({
                            _id: invoiceItem.referenceId,
                            firmInvoiceItemId: invoiceItem._id
                        }, {
                            firmInvoiceId: null,
                            firmInvoiceItemId: null
                        });
                        break;
                    case "unpaidInvoiceForwarded":
                        await self.findOneAndUpdate({
                            _id: invoiceItem.referenceId,
                            firmInvoiceItemId: invoiceItem._id
                        }, {
                            firmInvoiceId: null,
                            firmInvoiceItemId: null
                        });
                        break;
                }
            }
        }
        return resolve(true);
    });
};

FirmInvoicesSchema.methods.saveInvoiceItems = function (invoiceItems) {
    return new Promise(async (resolve, reject) => {
        let invoiceItemIds = [];
        try {
            for (let invoiceItem of invoiceItems) {

                let allowToAdd = true;

                if (universalFunctions.isEmptyData(invoiceItem?.item)) {
                    allowToAdd = false;
                } else {
                    if (invoiceItem.itemType === 'adjustments') {
                        if (universalFunctions.isEmptyData(invoiceItem?.amountType)) {
                            allowToAdd = false;
                        } else {
                            if (invoiceItem.amountType === 'flat') {
                                if (universalFunctions.isEmptyData(invoiceItem?.total)) {
                                    allowToAdd = false;
                                }
                            } else if (invoiceItem.amountType === 'percentage') {
                                if (
                                    universalFunctions.isEmptyData(invoiceItem?.basis) ||
                                    universalFunctions.isEmptyData(invoiceItem?.percentage)
                                ) {
                                    allowToAdd = false;
                                }
                            }
                        }
                    } else {
                        if (universalFunctions.isEmptyData(invoiceItem?.total)) {
                            allowToAdd = false;
                        }
                    }
                }

                if (allowToAdd) {
                    let invoiceItemModal = new FirmInvoicesItems();
                    invoiceItemModal.firmId = this.firmId;
                    invoiceItemModal.firmInvoiceId = this._id;

                    invoiceItemModal.itemType = invoiceItem?.itemType;
                    invoiceItemModal.date = invoiceItem?.date;
                    invoiceItemModal.item = invoiceItem?.item;
                    invoiceItemModal.notes = invoiceItem?.notes;
                    invoiceItemModal.item = invoiceItem?.item;

                    invoiceItemModal.appliedTo = invoiceItem?.appliedTo;
                    invoiceItemModal.amountType = invoiceItem?.amountType;

                    invoiceItemModal.referenceId = invoiceItem?.referenceId;

                    if (invoiceItem.itemType === 'adjustments' && invoiceItem.amountType === 'percentage') {
                        invoiceItemModal.basis = invoiceItem?.basis;
                        invoiceItemModal.percentage = invoiceItem?.percentage;
                        let total = ((invoiceItemModal.basis * invoiceItemModal.percentage) / 100);
                        invoiceItemModal.total = total.toFixed(2);
                    } else {
                        if (invoiceItem.itemType === 'timeEntries') {
                            invoiceItemModal.rate = invoiceItem?.rate;
                            invoiceItemModal.duration = invoiceItem?.duration;
                            let total = (invoiceItemModal.rate * invoiceItemModal.duration);
                            invoiceItemModal.total = total.toFixed(2);
                        } else if (invoiceItem.itemType === 'expenses') {
                            invoiceItemModal.rate = invoiceItem?.rate;
                            invoiceItemModal.quantity = invoiceItem?.quantity;
                            let total = (invoiceItemModal.rate * invoiceItemModal.quantity);
                            invoiceItemModal.total = total.toFixed(2);
                        } else {
                            invoiceItemModal.total = invoiceItem?.total;
                        }
                    }

                    invoiceItemModal.isNonBillable = false;
                    if (invoiceItem.nonBillAble && invoiceItem.nonBillAble == '1') {
                        invoiceItemModal.isNonBillable = true;
                    }

                    invoiceItemModal._id = mongoose.Types.ObjectId();
                    await invoiceItemModal.save();

                    invoiceItemIds.push(invoiceItemModal._id);
                }
            }
            return resolve(invoiceItemIds);
        } catch (error) {
            return reject(error);
        }
    });
}

module.exports = mongoose.model("FirmInvoices", FirmInvoicesSchema);
