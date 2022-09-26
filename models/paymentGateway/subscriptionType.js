const mongoose = require("mongoose");
const { Schema } = mongoose;

const subscriptionTypeSchema = new Schema(
  {
    planName: {
      type: String,
      // enum: ["basic", "advanced", "premium"],
    },
    subscriptionFor: {
      type: String,
      enum: ["borhanUser", "borhanExpert"],
    },
    planAmount: {
      type: Number,
    },
    walletAmount: { type: Number },
    discountValue: {
      type: Number,
    },
    planDuration: { type: Number },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubscriptionType", subscriptionTypeSchema);
