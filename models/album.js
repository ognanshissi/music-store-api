const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AlbumSchema = new Schema({

    artist: {
        type: Schema.Types.ObjectId,
        ref: "Artist"
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
    ]

}, {timestamps: true})


module.exports = mongoose.model('Album', AlbumSchema)