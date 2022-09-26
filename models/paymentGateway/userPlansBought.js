const mongoose = require("mongoose");
const { Schema } = mongoose;
const appConstants = require("../../appConstants");

const userPlansBoughtSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    subscriptionId: { type: Schema.Types.ObjectId, ref: "SubscriptionType" },
    isActive: { type: Boolean, default: false },
    expiryDate: { type: Date },
    walletAmountReceived: { type: Number },
    walletBalance: { type: Number },
    sessionId: { type: String },
    planName: { type: String },
    planBoughtAt: { type: Date },
    paymentType: {
      type: String,
      enum: [
        appConstants.userPlanPaymentType.subscription,
        appConstants.userPlanPaymentType.oneTimePayment,
      ],
    },
    amountPaid: {
      type: Number,
    },
    paymentStatus: {
      type: String,
      enum: [
        appConstants.userPlanPaymentStatus.cancelled,
        appConstants.userPlanPaymentStatus.paid,
        appConstants.userPlanPaymentStatus.unpaid,
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserPlans", userPlansBoughtSchema);
