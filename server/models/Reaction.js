const { Schema } = required('mongoose');
const dateFormat = required('../utils/dateFormat');

const reactionSchema = new Schema(
    {
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username:{
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        createAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = reactionSchema;