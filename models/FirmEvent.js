const { boolean } = require("@hapi/joi");
const mongoose = require("mongoose");
const { NumberInstance } = require("twilio/lib/rest/pricing/v2/number");
const { Schema } = mongoose;
const APP_CONSTANTS = require("../appConstants");

const FirmEventSchema = new Schema(
  {
    caseId: {
      type: Schema.Types.ObjectId,
      ref: "FirmCases",
    },
    firmEmployees: [
      {
        type: Schema.Types.ObjectId,
        ref: "FirmEmployees",
      },
    ],
    eventName: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: "FirmLocation",
      required: true,
    },
    isRepeated: {
      type: Boolean,
      required: true
    },
    repeatType: {
      type: String,
    },
    repeatDuration: {
      type: Number
    },
    days: [
      {
        type: String
      },
    ],
    repeatEndedOn: {
      type: String,
      default: null,
    },
  }
);

module.exports = mongoose.model("FirmEvent", FirmEventSchema);
