const mongoose = require("mongoose");
const {Schema} = mongoose;
const APP_CONSTANTS = require("../appConstants");

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            // required: true,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,

            required: true,
            // unique: true,
        },
        googleId: {
            type: String,
        },
        facebookId: {
            type: String,
        },
        mobileNo: {
            type: String,
        },
        profilePic: {
            type: String,
        },
        isEmailVerified: {
            type: Boolean,
        },
        password: {
            type: String,
            default: ""
        },
        role: {
            type: String,
            enum: [
                APP_CONSTANTS.role.admin,
                APP_CONSTANTS.role.expert,
                APP_CONSTANTS.role.borhanuser,
                APP_CONSTANTS.role.firmadmin,
            ],
        },
        customerId: {
            type: String,
        },
        userData: {
            model: {
                type: String,
                enum: [
                    APP_CONSTANTS.role.admin,
                    APP_CONSTANTS.role.expert,
                    APP_CONSTANTS.role.borhanuser,
                    APP_CONSTANTS.role.firmadmin,
                ],
            },
            data: {type: Schema.Types.ObjectId, refPath: "userData.model"},
        },
        mobileFirebaseUid: {
            type: String,
        },
        token: [
            {
                deviceType: [{type: String, enum: ["1", "2", "3"]}],
                deviceToken: [{type: String}],
            },
        ],
        fireBaseToken: {
            type: String,
        },
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
    }
);
UserSchema.virtual("expertlisting", {
    ref: "expert", //must be changed to the name you used for Comment model.
    foreignField: "userId",
    localField: "_id",
});

module.exports = mongoose.model("user", UserSchema);
