const Album = require('../../models/album');
const Artist = require('../../models/artist');
const { albumSerializer } = require('./serializer');




module.exports  = {

    albums: async () =>{
        try {
        const results = await Album.find()
        return results.map(album => {
                return albumSerializer(album)
            })
        } catch(err){
            throw err;
        }
    },

    createAlbum: async (args) => {
    
        try {
            // check for corresponding album first
            const artist = await Artist.findById("5c53b755e40e456f2858126f");
            if(!artist) throw err;
            let album = new Album({
                artist: artist,
                title: args.albumInput.title,
                genre: args.albumInput.genre,
                avatar: args.albumInput.avatar,
                date: args.albumInput.date
            });
            let createdAlbum;

            const result = await album.save();
            createdAlbum = albumSerializer(result);
            artist.albums.push(album);
            await artist.save();

            return createdAlbum;

        }catch(err){
            throw err;
        }
    },
}