const Song = require('../../models/song');
const Artist = require('../../models/artist');
const User = require('../../models/user');
const Album = require('../../models/album');
const { songSerializer } = require('./serializer');






module.exports = {
    songs: () => {
        return Song.find()
        .then( songs => {
            return songs.map( song => {
                return songSerializer(song);
            })
        }).catch( err => {
            throw err;
        })
    },
    createSong: async args => {

        const song = new Song({
            title: args.songInput.title,
            file: args.songInput.file,
            file_type: args.songInput.file_type,
            album: "5c549d537c7fef2906dda2af", // album _id collection
            user: "5c53af5b54785968e2d2e02d", // user _id collection
            artist: "5c53b755e40e456f2858126f"
        })
        let createdSong;
        try{
            const result = await song.save();
            createdSong = songSerializer(result);
            const album = await Album.findById("5c549d537c7fef2906dda2af");

            if(!album){
                throw new Error("Album not Found");
            }
            album.songs.push(song);
            await album.save();

            const user = await User.findById("5c53af5b54785968e2d2e02d");

            if(!user){
                throw new Error("User not Found");
            }
            user.songs.push(song);

           await user.save();

            const artist = await Artist.findById("5c53b755e40e456f2858126f");

            if(!artist) 
                throw new Error("");
            artist.songs.push(artist);
            await artist.save();
            return createdSong;
        }catch(err){
            throw err;
        }
    
    },
}