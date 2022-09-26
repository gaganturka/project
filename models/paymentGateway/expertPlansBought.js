const mongoose = require("mongoose");
const { Schema } = mongoose;
const appConstants = require("../../appConstants");

const expertPlansBoughtSchema = new Schema(
    {
        expertId: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        subscriptionId: { type: Schema.Types.ObjectId, ref: "SubscriptionType" },
        isActive: { type: Boolean, default: false },
        expiryDate: { type: Date },
        // walletAmountReceived: { type: Number },
        // walletBalance: { type: Number },
        sessionId: { type: String },
        planName: { type: String },
        planBoughtAt: { type: Date },
        paymentType: {
            type: String,
            enum: [
                appConstants.userPlanPaymentType.subscription,

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

module.exports = mongoose.model("ExpertPlans", expertPlansBoughtSchema);
