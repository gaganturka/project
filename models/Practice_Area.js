const mongoose = require("mongoose");
const {Schema} = mongoose;

const PracticeAreaSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    url: {original: {type: String}, thumb: {type: String}},
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "categories",
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    createdBy: {
        type: String,
    }
});

module.exports = mongoose.model("practicearea", PracticeAreaSchema);
