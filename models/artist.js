const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const ArtistSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    bio: String,
    dob: String,
    created_at: Date,
    updated_at:  Date
})

module.exports = mongoose.model('Artist', ArtistSchema)