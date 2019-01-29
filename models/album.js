const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AlbumSchema = new Schema({

    artist: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    date: {type: Date, required: true}, // date the album came out

    songs: [
        {
            type: Schema.Types.ObjectId,
            ref: "Song"
        }
    ],

    created_at: Date,
    updated_at: Date


})


module.exports = mongoose.model('Album', AlbumSchema)