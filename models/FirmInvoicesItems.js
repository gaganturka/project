const mongoose = require("mongoose");
const {Schema} = mongoose;
const APP_CONSTANTS = require("../appConstants");

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


module.exports = mongoose.model("FirmInvoicesItems", FirmInvoicesItemsSchema);
