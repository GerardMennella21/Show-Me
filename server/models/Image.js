const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const imageSchema = new Schema(
    {
        imageText: {
            type: String,
            required: 'You need to add a caption!',
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true
        },
        photo: {
            type: DataTypes.STRING
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

imageSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Image = model('Image', imageSchema);

module.exports = Image;
