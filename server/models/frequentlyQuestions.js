const mongoose = require("mongoose");
const { Schema } = mongoose;

const frequentlyQuestionsSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: Date,
  },
});

module.exports = mongoose.model("frequentlyQuestions", frequentlyQuestionsSchema);
