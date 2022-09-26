const mongoose = require("mongoose");
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseDelete = require('mongoose-delete');
const APP_CONSTANTS = require("../appConstants");

const FirmCaseExpensesSchema = new Schema({
        firmId: {type: Schema.Types.ObjectId, ref: "Firm", required: true},
        firmCaseId: {type: Schema.Types.ObjectId, ref: "FirmCases", required: true},
        firmCaseEmployeeId: {type: Schema.Types.ObjectId, ref: "FirmCaseEmployees"},
        firmActivityTypeId: {type: Schema.Types.ObjectId, ref: "FirmActivityTypes", required: true},
        isBillable: {type: Boolean, required: true},
        description: {type: String},
        date: {type: Date},
        rate: {type: Number, required: true},
        duration: {type: Number},
        amount: {type: Number, required: true},
        rateType: {
            type: String,
            enum: APP_CONSTANTS.activityRateTypes,
            required: true
        },
    },
    {timestamps: true}
);

FirmCaseExpensesSchema.plugin(mongoosePaginate);
FirmCaseExpensesSchema.plugin(mongooseDelete);

module.exports = mongoose.model("FirmCaseExpenses", FirmCaseExpensesSchema);
