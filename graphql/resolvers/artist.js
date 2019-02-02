const Artist = require('../../models/artist');

const { artistSerializer } = require('./serializer');




module.exports = {
    artists: async () => {
        try {
            const artists = await Artist.find();
            return artists.map(artist => {
                return artistSerializer(artist)
            })
        } catch(err){
            throw err;
        }
    },

    // Mutations 
    
    createArtist: async (args, req) => {

        if(!req.isAuth){
            throw new Error("Not authenticated")
        }
        try {
        let artist = new Artist({
            full_name: args.artistInput.full_name,
            bio: args.artistInput.bio,
            dob: args.artistInput.dob,
        })

        const result = await artist.save();
        return artistSerializer(result);
    } catch(err){
        throw err;
    }
    },
}