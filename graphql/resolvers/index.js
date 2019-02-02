const AlbumResolver = require('./album')
const ArtistResolver = require('./artist')
const SongResolver = require('./song')
const AuthResolver = require('./auth')
const PlaylistResolver = require('./playlist')
const FavoriteResolver = require('./favorite');



const RootResolver = {
    ...AlbumResolver,
    ...ArtistResolver,
    ...SongResolver,
    ...AuthResolver,
    ...PlaylistResolver,
    ...FavoriteResolver
}

module.exports = RootResolver;