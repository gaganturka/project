const mongoose = require("mongoose");
const { Schema } = mongoose;
const APP_CONSTANTS = require("../appConstants");

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,

    required: true,
    unique: true,
  },
  googleId: {
    type: String,
    unique: true,
  },
  facebookId: {
    type: String,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
  },
  isEmailVerified: {
    type: Boolean,
  },
  otp: {
    type: String,
  },
  password: { type: String, default: "" },
  role: {
    type: String,
    enum: [
      APP_CONSTANTS.role.admin,
      APP_CONSTANTS.role.expert,
      APP_CONSTANTS.role.borhanuser,
    ],
  },
  userData: {
    model: {
      type: String,
      enum: [
        APP_CONSTANTS.role.admin,
        APP_CONSTANTS.role.expert,
        APP_CONSTANTS.role.borhanuser,
      ],
    },
    data: { type: Schema.Types.ObjectId, refPath: "userData.model" },
  },
});

module.exports = mongoose.model("user", UserSchema);
