const mongoose = require("mongoose");
const { Schema } = mongoose;
const APP_CONSTANTS = require("../appConstants");
const ChatRequestsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "borhanuser" },
  expertId: { type: Schema.Types.ObjectId, ref: "expertborhanuser" },
  details: { type: String },
  status: {
    type: String,
    enum: [
      APP_CONSTANTS.chatRoomStatus.cancelled,
      APP_CONSTANTS.chatRoomStatus.confirmed,
      APP_CONSTANTS.chatRoomStatus.pending,
    ],
  },
  practiceArea: { type: Schema.Types.ObjectId },
});

module.exports = mongoose.model("chatrequests", ChatRequestsSchema);
