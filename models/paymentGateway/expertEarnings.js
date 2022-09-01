const mongoose = require("mongoose");
const { Schema } = mongoose;
const appConstants = require("../../appConstants");

const expertEarningsSchema = new Schema(
    {
        appointmentId: {
            type: Schema.Types.ObjectId,
        },
        chatId: {
            type: Schema.Types.ObjectId,
        },
        userId: {
            type: Schema.Types.ObjectId,
        },
        expertId: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        date: { type: Date },
        totalAmountRecieved: { type: Number },
        discount: { type: Number },
        amountEarned: { type: Number },
        amountPaidToAdmin: { type: Number }
    },
    { timestamps: true }
);

module.exports = mongoose.model("ExpertEarnings", expertEarningsSchema);