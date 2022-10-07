const mongoose = require("mongoose");
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseDelete = require('mongoose-delete');

const APP_CONSTANTS = require("../appConstants");

const FirmInvoicesPaymentsSchema = new Schema({
        firmId: {type: Schema.Types.ObjectId, ref: "Firm", required: true},
        firmInvoiceId: {type: Schema.Types.ObjectId, ref: "FirmInvoices", required: true},
        paymentMethod: {type: String},
        date: {type: Date},
        amount: {type: Number},
        notes: {type: String},
    },
    {timestamps: true}
);

FirmInvoicesPaymentsSchema.plugin(mongoosePaginate);
FirmInvoicesPaymentsSchema.plugin(mongooseDelete);

module.exports = mongoose.model("FirmInvoicesPayments", FirmInvoicesPaymentsSchema);
