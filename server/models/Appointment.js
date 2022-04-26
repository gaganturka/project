const { date } = require("@hapi/joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const APP_CONSTANTS = require("../appConstants");

const AppointmentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  expertId: {
    type: Schema.Types.ObjectId,
    ref: "expert",
  },
  appointmentType: {
    type: String,
    enum: [
      APP_CONSTANTS.appointmentType.audio,
      APP_CONSTANTS.appointmentType.video,
    ],
  },
  duration: {
    type: Number,
  },
  appointmentDate: {
    type: Date,
  },
  appointmentTime: {
    type: String,
  },
  startAppointmentTime: {
    type: Date,
  },
  endAppointmentTime: {
    type: Date,
  },
  appointDateandTime: {
    type: Date,
  },

  status: {
    type: String,
    enum: [
      APP_CONSTANTS.appointmentStatus.cancelled,
      APP_CONSTANTS.appointmentStatus.confirmed,
      APP_CONSTANTS.appointmentStatus.pending,
    ],
  },
  practiceArea: {
    type: Schema.Types.ObjectId,
    ref: "practicearea",
  },
  isRescheduled: {
    type: Boolean,
    default: false,
  },
  isRejectedByUser: {
    type: Boolean,
    default: false,
  },
  question: {
    type: String,
  },
});

module.exports = mongoose.model("appointment", AppointmentSchema);
