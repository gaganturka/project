const mongoose = require("mongoose");
const { Schema } = mongoose;

const BorhanUserSchema = new Schema({
  isSubscribed: {
    type: String,
  },
  balance: {
    type: Number,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
module.exports = mongoose.model("borhanuser", BorhanUserSchema);
