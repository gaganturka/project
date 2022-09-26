const mongoose = require("mongoose");
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseDelete = require('mongoose-delete');

const FirmActivityTypesSchema = new Schema({
        firmId: {type: Schema.Types.ObjectId, ref: "firms", required: true},
        name: {type: String, required: true},
        createdBy: {type: Schema.Types.ObjectId, ref: "user", required: true},
        updatedBy: {type: Schema.Types.ObjectId, ref: "user"},
    },
    {timestamps: true}
);

FirmActivityTypesSchema.plugin(mongoosePaginate);
FirmActivityTypesSchema.plugin(mongooseDelete);

module.exports = mongoose.model("FirmActivityTypes", FirmActivityTypesSchema);
