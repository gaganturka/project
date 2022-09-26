const mongoose = require("mongoose");
const { Schema } = mongoose;

const userRequestSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: { type: String },
    firmName: { type: String },
    phoneNo: { type: String },
    isDeleted: { type: Boolean, default: false },
    isContacted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userRequest", userRequestSchema);
