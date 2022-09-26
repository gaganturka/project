const mongoose = require("mongoose");
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseDelete = require('mongoose-delete');

const APP_CONSTANTS = require("../appConstants");

const FirmCasesSchema = new Schema({
        firmId: {type: Schema.Types.ObjectId, ref: "Firm", required: true},
        firmCaseContactIds: [{type: Schema.Types.ObjectId, ref: "FirmCaseContacts"}],
        firmCaseEmployeeIds: [{type: Schema.Types.ObjectId, ref: "FirmCaseEmployees"}],
        firmPracticeAreaId: {type: Schema.Types.ObjectId, ref: "FirmPracticeAreas", default: null},
        firmCaseStageId: {type: Schema.Types.ObjectId, ref: "FirmCaseStages", default: null},
        billingContactId: {type: Schema.Types.ObjectId, ref: "FirmContacts", default: null},
        caseBillingMethod: {type: String, default: null},
        leadAttorneyId: {type: Schema.Types.ObjectId, ref: "FirmEmployees", default: null},
        originatingAttorneyId: {type: Schema.Types.ObjectId, ref: "FirmEmployees", default: null},
        caseName: {type: String, required: true},
        caseNumber: {type: String, default: null},
        court: {type: String, default: null},
        office: {type: String, default: null},
        dateOpened: {type: Date, default: null},
        description: {type: String, default: null},
        statuteOfLimitation: {type: Date, default: null},
        conflictCheck: {type: Boolean, default: false},
        conflictCheckNotes: {type: String, default: null},
        flatFee: {type: Number, default: null},
        status: {
            type: String,
            enum: [APP_CONSTANTS.caseStatus.opened, APP_CONSTANTS.caseStatus.closed],
            default: APP_CONSTANTS.caseStatus.opened
        },
        createdBy: {type: Schema.Types.ObjectId, ref: "user", required: true},
        updatedBy: {type: Schema.Types.ObjectId, ref: "user", default: null},
    },
    {timestamps: true}
);

FirmCasesSchema.plugin(mongoosePaginate);
FirmCasesSchema.plugin(mongooseDelete);

module.exports = mongoose.model("FirmCases", FirmCasesSchema);
