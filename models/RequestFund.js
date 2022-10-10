const { boolean } = require("@hapi/joi");
const mongoose = require("mongoose");
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');
const APP_CONSTANTS = require("../appConstants");

const RequestFundSchema = new Schema(
    {   
        firmId: {
            type: Schema.Types.ObjectId,
            ref: "Firm",
          },
        caseContactId: {
            type: Schema.Types.ObjectId,
            ref: "FirmCases",
        },
        amount: {
            type: String,
            required: true
        },
        dueDate: {
            type: String,
            required: true,
        },
        depositInto: {
            type: Schema.Types.ObjectId,
            ref: "FirmBankAccount",
        },
        message: {
            type: String,
            required: true
        },
        createdBy: {type: Schema.Types.ObjectId, ref: "user", required: true},
        updatedBy: {type: Schema.Types.ObjectId, ref: "user"}
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
    }
);

RequestFundSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("RequestFund", RequestFundSchema);
