const mongoose = require("mongoose");
const { Schema } = mongoose;

const ExpertRatingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      expertId: {
        type: Schema.Types.ObjectId,
        ref: "expert",
      },
      rating:{
          type:Number,
      }
     
});

module.exports = mongoose.model("expertrating", ExpertRatingSchema);
