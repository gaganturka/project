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
      APP_CONSTANTS.appointmentStatus.rescheduled,
      APP_CONSTANTS.appointmentStatus.completed,
      APP_CONSTANTS.appointmentStatus.rejected,
    ],
  },
  practiceArea: {
    type: Schema.Types.ObjectId,
    ref: "practicearea",
  },
  timeSlotId: {
    type: Schema.Types.ObjectId,
    ref: "expertTimeAvailable",
  },
  isRescheduled: {
    type: Boolean,
    default: false,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  isRejectedByUser: {
    type: Boolean,
    default: false,
  },
  isRejectedByExpert: {
    type: Boolean,
    default: false,
  },
  question: {
    type: String,
  },
  discount: { type: Number },
  valueAfterDiscount: { type: Number },
  videoChatId: {
    type: String,
    default: "",
  },
  isRescheduled: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("appointment", AppointmentSchema);
