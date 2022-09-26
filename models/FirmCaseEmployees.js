const mongoose = require("mongoose");
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseDelete = require('mongoose-delete');

const FirmCaseEmployeesSchema = new Schema({
        firmId: {type: Schema.Types.ObjectId, ref: "Firm", required: true},
        firmCaseId: {type: Schema.Types.ObjectId, ref: "FirmCases", required: true},
        firmEmployeeId: {type: Schema.Types.ObjectId, ref: "FirmEmployees", required: true},
        ratePerHour: {type: Number},
    },
    {timestamps: true}
);

FirmCaseEmployeesSchema.plugin(mongoosePaginate);
FirmCaseEmployeesSchema.plugin(mongooseDelete);

module.exports = mongoose.model("FirmCaseEmployees", FirmCaseEmployeesSchema);
