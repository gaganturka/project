const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminUserSchema = new Schema({
  description: {
    type: String,
  },
});

module.exports = mongoose.model("adminborhanuser", AdminUserSchema);
