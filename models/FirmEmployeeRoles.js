const mongoose = require("mongoose");
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const FirmEmployeeRolesSchema = new Schema({
        firmId: {type: Schema.Types.ObjectId, ref: "Firm", required: true},
        name: {type: String, required: true},
        modules: {type: Array, required: true, default: null},
        createdBy: {type: Schema.Types.ObjectId, ref: "user", required: true},
        updatedBy: {type: Schema.Types.ObjectId, ref: "user", default: null},
    },
    {timestamps: true}
);

FirmEmployeeRolesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("FirmEmployeeRoles", FirmEmployeeRolesSchema);
