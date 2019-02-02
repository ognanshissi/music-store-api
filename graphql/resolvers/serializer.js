const Album = require('../../models/album');
const Artist = require('../../models/artist');
const Song = require('../../models/song');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

const album = async albumId => {

    try {
        const album = await Album.findById(albumId);

        return albumSerializer(album);
    } catch(err){
        throw err;
    }
    
}

const songs =  async songIds => {
    try {
        const songs = await Song.find({_id: {$in: songIds}});
        return songs.map(song => {
            return songSerializer(song);
        })
    } catch(err){
        throw err;
    }
    
}

const user = async  userId => {
    try{
        const user = await User.findById(userId)
        return {
            ...user._doc, 
            songs: songs.bind(this, user._doc.songs),
            favorites: songs.bind(this, user._doc.songs)
        }
    } catch(err){
        throw err;
    }
}

const artist = async artistId => {
    try {
        const artist = await Artist.findById(artistId)
        return artistSerializer(artist);
    } catch(err){
        throw err;
    }

}

const albums = async albumIds => {
    try {
        const albums = await Album.find({_id: {$in: albumIds}})
        return albums.map(album => {
            return {
                ...album._doc,
                songs: songs.bind(this, album._doc.songs),
                artist: artist.bind(this, album._doc.artist)
            }
        })
    } catch(err){
        throw err;
    }
}

// serializer

const albumSerializer = album => {
    return {
        ...album._doc,
        songs: songs.bind(this, album._doc.songs),
        artist: artist.bind(this, album._doc.artist),
        date: dateToString(album._doc.date),
        createdAt: dateToString(album._doc.createdAt),
        updatedAt: dateToString(album._doc.updatedAt)
    }
}

const artistSerializer = artist => {
    return {
        ...artist._doc,
        songs: songs.bind(this, artist._doc.songs),
        albums: albums.bind(this, artist._doc.albums),
        createdAt: dateToString(artist._doc.createdAt),
        updatedAt: dateToString(artist._doc.updatedAt)
    }
}

const songSerializer = song => {
    return {
        ...song._doc, 
        album: album.bind(this, song._doc.album),
        user: user.bind(this, song._doc.user),
        artist: artist.bind(this, song._doc.artist),
        createdAt: dateToString(song._doc.createdAt),
        updatedAt: dateToString(song._doc.updatedAt)
    }
}

// exports.albums = albums;
// exports.album = album;
// exports.artist = artist;
exports.songs = songs;
// exports.user = user;
exports.songSerializer = songSerializer;
exports.artistSerializer = artistSerializer;
exports.albumSerializer = albumSerializer;