const mongoose = require("mongoose");
const { Schema } = mongoose;
const APP_CONSTANTS = require("../appConstants");

const ExpertUserSchema = new Schema({
  isSubscribed: {
    type: boolean,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "categories",
  },
  practiceArea: [
    {
      type: Schema.Types.ObjectId,
      ref: "practicearea",
    },
  ],
  bio: {
    type: String,
  },
  audioFilePath: {
    type: String,
  },
  videoFilePath: {
    type: String,
  },
  iApprovedByAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  status: {
    type: String,
    enum: [
      APP_CONSTANTS.activityStatus.active,
      APP_CONSTANTS.activityStatus.busy,
      APP_CONSTANTS.activityStatus.unavailable,
    ],
  },
  documents: [
    {
      filename: String,
      filetype: String,
      link: String,
      mimeType: String,
    },
  ],
  bankName: {
    type: String,
  },
  bankAccountNo: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  accountType: {
    type: String,
    enum: [
      APP_CONSTANTS.accountType.freelancer,
      APP_CONSTANTS.accountType.expert,
    ],
  },
  rating: {
    noOfRating: Number,
    ratingCount: Number,
    avgRating:Number,
  },
  experience: {
    type: Number,
  },
  noOfHoursSessionDone: {
    type: Number,
  },
  noOfViews: {
    type: Number,
  },
  availableForVideo: {
    type: Boolean,
    default: true,
  },
  availableForAudio: {
    type: Boolean,
    default: true,
  },
  availableForChat: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("expertborhanuser", ExpertUserSchema);
