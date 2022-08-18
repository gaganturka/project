const mongoose = require("mongoose");
const { Schema } = mongoose;
const appConstants = require("../appConstants");

const UserPaymentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    paymentStatus: {
      type: String,

      enum: [
        appConstants.paymentStatus.Success,
        appConstants.paymentStatus.Failed,
        appConstants.paymentStatus.Pending,
      ],
      default: appConstants.paymentStatus.Pending,
    },

    amountPaid: {
      type: Number,
      default: 0,
    },
    isSubscribed: { type: Boolean, default: false },
    subscriptionType: { type: String },
    paymentDetails: {},
  },
  { timeStamps: true }
);
module.exports = mongoose.model("userPayment", UserPaymentSchema);
