const mongoose = require("mongoose");
const { Schema } = mongoose;
const appConstants = require("../../appConstants");

const userTransactionsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    amountPaid: {
      type: Number,
    },
    type: {
      type: String,
      enum: [
        appConstants.userTransactionType.credit,
        appConstants.userTransactionType.debit,
      ],
    },
    sessionId: { type: String },
    date: { type: Date },
    description: { type: String },
    paymentStatus: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserTransactions", userTransactionsSchema);
