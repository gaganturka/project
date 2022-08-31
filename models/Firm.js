const mongoose = require("mongoose");
const { Schema } = mongoose;

const FirmSchema = new Schema({
    contactNo: {
        type: String,
        required: true,
    },
    firmName: {
        type: String,
        required: true,
    },

    firmEmail: {
        type: String,
        required: true,
    },
    contactPerson: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    companyRegNo: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model("Firm", FirmSchema);