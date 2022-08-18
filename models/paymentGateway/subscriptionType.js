const mongoose = require("mongoose");
const { Schema } = mongoose;


const subscriptionTypeSchema = new Schema({
  planName: {
    type: String,
    enum: ["basic", "advanced", "premium"],
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
  planDuration: { type: String },

  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("SubscriptionType", subscriptionTypeSchema);
