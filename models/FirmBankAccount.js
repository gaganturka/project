const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");
// const mongooseDelete = require('mongoose-delete');

const FirmBankAccountSchema = new Schema(
  {
    firmId: { type: Schema.Types.ObjectId, ref: "Firm", required: true },
    accountHolder: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    bank: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
    createdBy: {type: Schema.Types.ObjectId, ref: "user", required: true},
    updatedBy: {type: Schema.Types.ObjectId, ref: "user"},
  },
  { timestamps: true }
);

FirmBankAccountSchema.plugin(mongoosePaginate);
// FirmCaseContactsSchema.plugin(mongooseDelete);

module.exports = mongoose.model("FirmBankAccount", FirmBankAccountSchema);
