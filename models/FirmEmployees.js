const mongoose = require("mongoose");
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const APP_CONSTANTS = require("../appConstants");

const FirmEmployeesSchema = new Schema({
        firmId: {type: Schema.Types.ObjectId, ref: "Firm", required: true},
        firmEmployeeTypeId: {type: Schema.Types.ObjectId, ref: "FirmEmployeeTypes", required: true},
        firmEmployeeRoleId: {type: Schema.Types.ObjectId, ref: "FirmEmployeeRoles", required: true},
        userId: {type: Schema.Types.ObjectId, ref: "user", default: null},
        ratePerHour: {type: Number, default: null},
        status: {type: String, enum: [APP_CONSTANTS.firmEmployeeStatus.active, APP_CONSTANTS.firmEmployeeStatus.inactive]},
        createdBy: {type: Schema.Types.ObjectId, ref: "user", required: true},
        updatedBy: {type: Schema.Types.ObjectId, ref: "user", default: null},
    },
    {timestamps: true}
);

FirmEmployeesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("FirmEmployees", FirmEmployeesSchema);
