const Playlist = require('../../models/playlist');
const { dateToString } = require('../../helpers/date');


module.exports = {

    playlists:  async () => {
        try{
            const playlists = await Playlist.find();

            return playlists.map(playlist => {
                return {
                    ...playlist._doc,
                    createdAt: new Date(playlist._doc.createdAt).toISOString(),
                    updatedAt: new Date(playlist._doc.updatedAt).toISOString()
                }
            })
        } catch(err){
            throw err;
        }
    },
    addPlaylist: async args => {
        try{
         const song_ = await Song.findById({_id: args.songId});
 
         const user_ = "5c538d2fc54b9654635fbcdb"; // get current user id
         const playlist = new Playlist({
             user: user_,
             song: song_
         })
 
         const result = await playlist.save();
         return {
             ...result._doc
         }
        }catch(err){
            throw err;
        }
     },
 
     removePlaylist: async args => {
         try{
             await Playlist.findByIdAndDelete(args.playlistId);
         return {
             success: true,
             message: ""
         }
         } catch (err){
             throw err;
         }
     }
}