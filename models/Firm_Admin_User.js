const mongoose = require("mongoose");
const {Schema} = mongoose;

const FirmAdminUserSchema = new Schema(
    {
        contactPerson: {type: String, required: true},
        contactNo: {type: String, required: true},
        firmId: {type: Schema.Types.ObjectId, ref: "Firm"},
        userId: {type: Schema.Types.ObjectId, ref: "user"},
    },
    {timestamps: true}
);

module.exports = mongoose.model("FirmAdminUser", FirmAdminUserSchema);
