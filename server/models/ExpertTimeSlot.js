const { date } = require("@hapi/joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const APP_CONSTANTS = require("../appConstants");

const AppointmentSchema = new Schema({

  expertId: {
    type: Schema.Types.ObjectId,
    ref: "expert",
  },
//   appointmentType: {
//     type: String,
//     enum: [
//       APP_CONSTANTS.appointmentType.audio,
//       APP_CONSTANTS.appointmentType.video,
//     ],
//   },
//   duration: {
//     type: Number,
//   },
  appointmentDate: {
    type: Date,
  },
//   appointmentTime: {
//     type: String,
//   },
  startAppointmentTime: {
    type: Date,
  },
  endAppointmentTime: {
    type: Date,
  },
//   appointDateandTime: {
//     type: Date,
//   },

  status: {
    type: String,
    enum: [
      APP_CONSTANTS.appointmentStatus.confirmed,
      APP_CONSTANTS.appointmentStatus.pending,
    ],
    default:APP_CONSTANTS.appointmentStatus.pending
  },
//   practiceArea: {
//     type: Schema.Types.ObjectId,
//     ref: "practicearea",
//   },

});

module.exports = mongoose.model("expertTimeAvailable", AppointmentSchema);
