const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const songSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    file_type: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },

    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
    },

    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album', 
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, {timestamps: true})


module.exports = mongoose.model('Song', songSchema);



