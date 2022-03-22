const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: { original: { type: String }, thumb: { type: String } },
});

module.exports = mongoose.model("categories", CategoriesSchema);
