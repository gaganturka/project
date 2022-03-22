const mongoose = require("mongoose");
const { Schema } = mongoose;

const BorhanUserSchema = new Schema({
  isSubscribed: {
    type: String,
  },
  balance: {
    type: Number,
  },
});
module.exports = mongoose.model("borhanuser", BorhanUserSchema);
