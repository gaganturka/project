const { date } = require("@hapi/joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const APP_CONSTANTS = require("../appConstants");

const AppointmenChatSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
  expertId: {
    type: Schema.Types.ObjectId,
    ref: "expert",
  },
  status: {
    type: String,
    enum: [
      APP_CONSTANTS.appointmentStatus.confirmed,
      APP_CONSTANTS.appointmentStatus.pending,
      APP_CONSTANTS.appointmentStatus.cancelled,
    ],
    default:APP_CONSTANTS.appointmentStatus.pending
  },
   question: {
    type: String,

  },
  chatRoomId:{
    type: String,
  }

});

module.exports = mongoose.model("chatappointment", AppointmenChatSchema);
