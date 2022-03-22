const mongoose = require("mongoose");
const { Schema } = mongoose;

const SlotsSchema = new Schema({
  date: {
    type: Date,
  },
  duration: {
    type: Number,
  },
  slots: [
    {
      startTime: String,
      endTime: String,
    },
  ],
  expertUserId:{
      type:Schema.Types.ObjectId,
      ref:"expertborhanuser",
  },
  expertId:{
     type:Schema.Types.ObjectId,
     ref:"user"
  }

});

module.exports = mongoose.model("slots", SlotsSchema);
