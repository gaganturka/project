const mongoose = require("mongoose");
const { Schema } = mongoose;
const APP_CONSTANTS = require("../appConstants");

const ExpertUserSchema = new Schema(
  {
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
    priceDetails: [
      {
        pricePerMinuteOrSms: { type: Number },
        discountPerMinuteOrSms: { type: Number },

        callType: {
          type: String,
          enum: [
            "",
            APP_CONSTANTS.callType.audio.value,
            APP_CONSTANTS.callType.video.value,
            APP_CONSTANTS.callType.chat.value,
          ],
          default: "",
        },
      },
    ],
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
    isApprovedByAdmin: {
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
      default: APP_CONSTANTS.activityStatus.active,
    },
    document: [
      {
        fileName: String,
        fileType: String,
        link: String,
        mimeType: String,
      },
    ],
    bankName: {
      type: String,
      default: "",
    },
    bankAccountNo: {
      type: String,
      default: "",
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
      avgRating: Number,
    },
    experience: {
      type: Number,
      default: 0,
    },
    noOfHoursSessionDone: {
      type: Number,
      default: 0,
    },
    noOfViews: {
      type: Number,
      default: 0,
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
    noOfHoursOfSessionsDone: {
      type: Number,
      default: 0,
    },
    noOfSessionsDone: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
ExpertUserSchema.virtual("expertlisting", {
  ref: "favexpert", //must be changed to the name you used for Comment model.
  foreignField: "expertId",
  localField: "_id",
});

module.exports = mongoose.model("expert", ExpertUserSchema);
