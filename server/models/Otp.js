const mongoose = require("mongoose");
const { Schema } = mongoose;

const OtpSchema = new Schema({
  otp:{
      type:String,
      required:true,
  }
  ,
  mobileNo:{
      type:String,
      required:true,
  },
});

module.exports = mongoose.model("otp", OtpSchema);
