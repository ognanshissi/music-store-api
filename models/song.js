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

    addedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: Date,
    updated_at: Date

})


module.exports = mongoose.model('Song', songSchema);



