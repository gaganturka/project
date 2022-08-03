const mongoose = require("mongoose");
const { Schema } = mongoose;

const TestimonySchema = new Schema({
  feedback: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("testimony", TestimonySchema);
