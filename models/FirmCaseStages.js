const mongoose = require("mongoose");
const {Schema} = mongoose;

const FirmCaseStagesSchema = new Schema({
        firmId: {type: Schema.Types.ObjectId, ref: "firms", required: true},
        name: {type: String, required: true},
        createdBy: {type: Schema.Types.ObjectId, ref: "user", required: true},
        updatedBy: {type: Schema.Types.ObjectId, ref: "user", default: null},
    },
    {timestamps: true}
);

module.exports = mongoose.model("FirmCaseStages", FirmCaseStagesSchema);
