const mongoose = require("mongoose");
const {Schema} = mongoose;
const APP_CONSTANTS = require("../appConstants");
const FirmCaseTimeEntries = require("./FirmCaseTimeEntries");
const FirmCaseExpenses = require("./FirmCaseExpenses");

const FirmInvoicesItemsSchema = new Schema({
        firmId: {type: Schema.Types.ObjectId, ref: "Firm", required: true},
        firmInvoiceId: {type: Schema.Types.ObjectId, ref: "FirmInvoices", required: true},
        itemType: {
            type: String,
            enum: [
                APP_CONSTANTS.invoiceItemTypes.flatFee,
                APP_CONSTANTS.invoiceItemTypes.timeEntries,
                APP_CONSTANTS.invoiceItemTypes.expenses,
                APP_CONSTANTS.invoiceItemTypes.unpaidInvoiceForwarded,
                APP_CONSTANTS.invoiceItemTypes.adjustments,
            ],
            required: true
        },
        date: {type: Date},
        item: {type: String, required: true},
        appliedTo: {type: String, default: null},
        amountType: {type: String, default: null},
        notes: {type: String},
        rate: {type: Number},
        duration: {type: Number},
        quantity: {type: Number},
        basis: {type: Number},
        percentage: {type: Number},
        total: {type: Number, required: true},
        isNonBillable: {type: Boolean, default: false},
        referenceId: {type: String, default: null},
    },
    {timestamps: true}
);

FirmInvoicesItemsSchema.methods.linkToInvoice = function () {
    return new Promise(async (resolve) => {
        if (this.referenceId != null) {
            switch (this.itemType) {
                case "timeEntries":
                    await FirmCaseTimeEntries.findOneAndUpdate({
                        _id: this.referenceId
                    }, {
                        firmInvoiceId: this.firmInvoiceId,
                        firmInvoiceItemId: this._id,
                    });
                    return resolve(true);
                    break;
                case "expenses":
                    await FirmCaseExpenses.findOneAndUpdate({
                        _id: this.referenceId
                    }, {
                        firmInvoiceId: this.firmInvoiceId,
                        firmInvoiceItemId: this._id,
                    });
                    return resolve(true);
                    break;
                case "unpaidInvoiceForwarded":
                    await self.findOneAndUpdate({
                        _id: this.referenceId
                    }, {
                        firmInvoiceId: this.firmInvoiceId,
                        firmInvoiceItemId: this._id,
                    });
                    return resolve(true);
                    break;
                default:
                    return resolve(false);
                    break;
            }
        }else{
            return resolve(false);
        }
    });
};

FirmInvoicesItemsSchema.methods.unLinkFromInvoice = function () {
    return new Promise(async (resolve) => {
        if (this.referenceId != null) {
            switch (this.itemType) {
                case "timeEntries":
                    await FirmCaseTimeEntries.findOneAndUpdate({
                        _id: this.referenceId,
                        firmInvoiceItemId: this._id
                    }, {
                        firmInvoiceId: null,
                        firmInvoiceItemId: null,
                    });
                    return resolve(true);
                    break;
                case "expenses":
                    await FirmCaseExpenses.findOneAndUpdate({
                        _id: this.referenceId,
                        firmInvoiceItemId: this._id
                    }, {
                        firmInvoiceId: null,
                        firmInvoiceItemId: null,
                    });
                    return resolve(true);
                    break;
                case "unpaidInvoiceForwarded":
                    await self.findOneAndUpdate({
                        _id: this.referenceId,
                        firmInvoiceItemId: this._id
                    }, {
                        firmInvoiceId: null,
                        firmInvoiceItemId: null,
                    });
                    return resolve(true);
                    break;
                default:
                    return resolve(false);
                    break;
            }
        }else{
            return resolve(false);
        }
    });
};


module.exports = mongoose.model("FirmInvoicesItems", FirmInvoicesItemsSchema);
