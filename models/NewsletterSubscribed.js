const mongoose = require("mongoose");
const { Schema } = mongoose;

const NewsletterSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  subscribedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("newsletter", NewsletterSchema);
