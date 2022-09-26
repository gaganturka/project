const mongoose = require("mongoose");
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const FirmEmployeeTypesSchema = new Schema({
        name: {type: String, required: true},
        createdBy: {type: Schema.Types.ObjectId, ref: "user", required: true},
        updatedBy: {type: Schema.Types.ObjectId, ref: "user", default: null},
    },
    {timestamps: true}
);

FirmEmployeeTypesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("FirmEmployeeTypes", FirmEmployeeTypesSchema);
