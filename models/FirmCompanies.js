const mongoose = require("mongoose");
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const FirmCompaniesSchema = new Schema({
        firmId: {type: Schema.Types.ObjectId, ref: "Firm", required: true},
        name: {type: String, required: true},
        email: {type: String, default: null},
        website: {type: String, default: null},
        mobileNo: {type: String, default: null},
        landLineNo: {type: String, default: null},
        faxNumber: {type: String, default: null},
        address1: {type: String, default: null},
        address2: {type: String, default: null},
        country: {type: String, default: null},
        state: {type: String, default: null},
        city: {type: String, default: null},
        zipCode: {type: String, default: null},
        notes: {type: String, default: null},
        createdBy: {type: Schema.Types.ObjectId, ref: "user", required: true},
        updatedBy: {type: Schema.Types.ObjectId, ref: "user", default: null},
    },
    {timestamps: true}
);

FirmCompaniesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("FirmCompanies", FirmCompaniesSchema);
