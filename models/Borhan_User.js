const mongoose = require("mongoose");
const { Schema } = mongoose;

const BorhanUserSchema = new Schema({
  isSubscribed: {
    type: Boolean,
    default: false,
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
  totalRefunded: { type: Number, default: 0 },
});
module.exports = mongoose.model("borhanuser", BorhanUserSchema);
