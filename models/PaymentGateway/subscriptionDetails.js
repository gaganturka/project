const mongoose = require("mongoose");
const { Schema } = mongoose;
const appConstants = require("../../appConstants");

const subscriptionSchema = new Schema(
  {
    subscriptionDetails: {},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
