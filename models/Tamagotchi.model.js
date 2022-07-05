const { Schema, model } = require("mongoose");

const tamagotchiSchema = new Schema(
    {
        avatarName: {
            type: String,
            unique: true
        },
        levelFeatures: {
            walking: {
                type: Number,
                default: 0
            },
            cycling: {
                type: Number,
                default: 0
            },
            publicTransport: {
                type: Number,
                default: 0
            },
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },


        suggestions: {
            type: Schema.Types.ObjectId,
            ref: 'Suggestions'
        }
    }


);


const Tamagotchi = model("Tamagotchi", tamagotchiSchema);

module.exports = Tamagotchi;
