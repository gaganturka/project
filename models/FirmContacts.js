const mongoose = require("mongoose");
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const FirmContactsSchema = new Schema({
        firmId: {type: Schema.Types.ObjectId, ref: "Firm", required: true},
        firmContactGroupId: {type: Schema.Types.ObjectId, ref: "FirmContactGroups", default: null},
        firmCompanyId: {type: Schema.Types.ObjectId, ref: "FirmCompanies", default: null},
        userId: {type: Schema.Types.ObjectId, ref: "user", default: null},
        contactType: {type: String, required: true},
        firstName: {type: String, required: true},
        middleName: {type: String, default: null},
        lastName: {type: String, required: true},
        email: {type: String, default: null},
        portalEnabled: {type: Boolean, default: false},
        mobileNo: {type: String, default: null},
        alternativeMobileNo: {type: String, default: null},
        landLineNo: {type: String, default: null},
        faxNo: {type: String, default: null},
        address1: {type: String, default: null},
        address2: {type: String, default: null},
        country: {type: String, default: null},
        state: {type: String, default: null},
        city: {type: String, default: null},
        zipCode: {type: String, default: null},
        dateOfBirth: {type: Date, default: null},
        jobTitle: {type: String, default: null},
        drivingLicenseNo: {type: String, default: null},
        drivingLicenseStateCode: {type: String, default: null},
        notes: {type: String, default: null},
        createdBy: {type: Schema.Types.ObjectId, ref: "user", required: true},
        updatedBy: {type: Schema.Types.ObjectId, ref: "user", default: null},
    },
    {timestamps: true}
);

FirmContactsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("FirmContacts", FirmContactsSchema);
