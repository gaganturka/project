const { boolean } = require("@hapi/joi");
const mongoose = require("mongoose");
const {Schema} = mongoose;
const APP_CONSTANTS = require("../appConstants");

const FirmEventLocationSchema = new Schema(
    {   
        firmId: {
            type: Schema.Types.ObjectId,
            ref: "FirmAdminUser",
          },
        name: {
            type: String,
            required: true
        },
        address1: {
            type: String,
            required: true
        },
        address2: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        zipcode: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
    }
);


module.exports = mongoose.model("FirmLocation", FirmEventLocationSchema);
