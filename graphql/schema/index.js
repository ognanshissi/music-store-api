const { buildSchema } = require('graphql')

module.exports = buildSchema(`


type Playlist {
    user: User!
    song: Song!
    createdAt: String!
    updatedAt: String!
}

type Favorite {
    user: User!
    song: Song!
    like: Boolean!
    updatedAt: String!
    createdAt: String!
}

type Artist {
    _id: ID!
    full_name: String!
    bio: String
    dob: String
    albums: [Album!]
    songs: [Song!]
    createdAt: String!
    updatedAt: String!
}

input artistInput {
    full_name: String!
    bio: String
    dob: String
}

type Album {
    _id: ID!
    artist: Artist!
    title: String!
    genre: String!
    avatar: String
    date: String!
    songs: [Song!]
    createdAt: String!
    updatedAt: String!
}

input albumInput {
    title: String!
    genre: String!
    avatar: String
    date: String!
}

type User {
    _id: ID!
    email: String!
    password: String
    full_name: String
    isActive: Boolean
    isAdmin: Boolean
    songs: [Song!]
    createdAt: String!
    updatedAt: String!
}

input UserInput {
    email: String!
    password: String!
    full_name: String
    isActive: Boolean
    isAdmin: Boolean
}

type Song {
    _id: ID!
    title: String!
    file: String!
    file_type: String!
    user: User!
    album: Album!
    createdAt: String!
    updatedAt: String!
}

input SongInput {
    title: String!
    file: String
    file_type: String
}

type Auth {
    token: String!
    userId: ID!
    tokenExpiration: Int!
}

type RootQuery {
    artists: [Artist!]!
    albums: [Album!]!
    users: [User!]
    songs: [Song!]
    playlists: [Playlist!]!
    favorites: [Favorite!]!
    login(email: String!, password: String!): Auth!
}

type RootMutation {
    createArtist(artistInput: artistInput): Artist
    createAlbum(albumInput: albumInput): Album
    createUser(userInput: UserInput):  User
    createSong(songInput: SongInput): Song
    addPlaylist(songId: ID!): Playlist!
    removePlaylist(playlistId: ID!): [String!]!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);