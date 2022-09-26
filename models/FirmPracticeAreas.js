const mongoose = require("mongoose");
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const FirmPracticeAreasSchema = new Schema({
        firmId: {type: Schema.Types.ObjectId, ref: "firms", required: true},
        name: {type: String, required: true},
        createdBy: {type: Schema.Types.ObjectId, ref: "user", required: true},
        updatedBy: {type: Schema.Types.ObjectId, ref: "user"},
    },
    {timestamps: true}
);

FirmPracticeAreasSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("FirmPracticeAreas", FirmPracticeAreasSchema);
