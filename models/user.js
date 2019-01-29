const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    full_name: {
        type: String,
        required: false
    },
    isActive: Boolean,

    isAdmin: Boolean,

    created_at: Date,
    updated_at: Date,

    createdSongs: [
        {
            type: Schema.Types.ObjectId,
            ref: "Song"
        }
    ]
})

module.exports = mongoose.model('User', UserSchema);