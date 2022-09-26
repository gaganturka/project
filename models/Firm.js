const mongoose = require("mongoose");
const {Schema} = mongoose;

const FirmSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "user", required: true},
    firmName: {type: String, required: true},
    companyRegNo: {type: String, required: true},
    contactPerson: {type: String, required: true},
    contactNo: {type: String, required: true},
}, {timestamps: true});

module.exports = mongoose.model("Firm", FirmSchema);
