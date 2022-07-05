const { Schema, model } = require("mongoose");

const tamagotchiSchema = new Schema(
    {
        avatarName: {
            type: String,
            unique: true
        },
        levelFeatures: {
            walking: Number,
            cycling: Number,
            publicTransport: Number
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
