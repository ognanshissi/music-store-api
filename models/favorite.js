const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    song: {
        type: Schema.Types.ObjectId,
        ref: "Song"
    },
    like: Boolean,
}, {timestamps: true});


module.exports = mongoose.model('Favorite', favoriteSchema)