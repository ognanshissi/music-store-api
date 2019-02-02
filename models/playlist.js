const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const playlistSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    song: {
        type: Schema.Types.ObjectId,
        ref: "Song"
    }
}, {timestamps: true});


module.exports = mongoose.model('Playlist', playlistSchema);