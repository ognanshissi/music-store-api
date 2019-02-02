const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const ArtistSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    albums: [
        {
            type: Schema.Types.ObjectId,
            ref: "Album" 
        }
    ],
    songs: [
        {
            type: Schema.Types.ObjectId,
            ref: "Song"
        }
    ],
    origin: String,
    bio: String,
    dob: Date,
}, {timestamps: true})

module.exports = mongoose.model('Artist', ArtistSchema)