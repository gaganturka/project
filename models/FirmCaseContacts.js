const mongoose = require("mongoose");
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseDelete = require('mongoose-delete');

const FirmCaseContactsSchema = new Schema({
        firmId: {type: Schema.Types.ObjectId, ref: "Firm", required: true},
        firmCaseId: {type: Schema.Types.ObjectId, ref: "FirmCases", required: true},
        firmContactId: {type: Schema.Types.ObjectId, ref: "FirmContacts", required: true},
    },
    {timestamps: true}
);

FirmCaseContactsSchema.plugin(mongoosePaginate);
FirmCaseContactsSchema.plugin(mongooseDelete);

module.exports = mongoose.model("FirmCaseContacts", FirmCaseContactsSchema);
