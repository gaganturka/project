const { bool } = require("@hapi/joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const FavExpertSchema = new Schema({
  borhanUserId: {
    type: Schema.Types.ObjectId,
    ref: "borhanuser",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  expertUserId: {
    type: Schema.Types.ObjectId,
    ref: "expert",
  },
  expertId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  isFavorite:{
    type:Boolean,
  }
});

module.exports = mongoose.model("favexpert", FavExpertSchema);
