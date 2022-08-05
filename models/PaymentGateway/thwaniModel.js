const mongoose = require("mongoose");
const { Schema } = mongoose;
const appConstants = require("../../appConstants");

const thwaniPaymentSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    paymentType: {
      type: String,
      enum: [
        "",
        appConstants.paymentType.subscription,
        appConstants.paymentType.oneTimePayment,
      ],
      default: "",
    },
    subscriptionType: {
      type: String,
      enum: [
        "",
        appConstants.subscriptionType.silver.name,
        appConstants.subscriptionType.gold.name,
        appConstants.subscriptionType.platinum.name,
      ],
      default: "",
    },
    paymentValue: { type: Number, default: 0 },
    paymentMadeAt: { type: Date, default: Date.now() },
    paymentStatus: {
      type: String,
      enum: [
        "",
        appConstants.paymentStatus.Success,
        appConstants.paymentStatus.Failed,
        appConstants.paymentStatus.Processing,
      ],
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ThwaniPayment", thwaniPaymentSchema);
