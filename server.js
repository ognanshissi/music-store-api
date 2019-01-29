const express = require('express');
const bodyParser = require('body-parser');
const graphQLHttp = require('express-graphql');
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const Artist = require('./models/artist');
const Album = require('./models/album');
const User = require('./models/user');
const Song = require('./models/song');



const app = express();



app.use(bodyParser.json()) // parse incoming request

// middleware to handle graphQL requests on the path /graphql this path can change anytime
app.use('/graphql', graphQLHttp({
    schema: buildSchema(`

    type Artist {
        _id: ID!
        full_name: String!
        bio: String
        dob: String
        created_at: String
        updated_at: String
    }

    input artistInput {
        full_name: String!
        bio: String
        dob: String
    }

    type Album {
        _id: ID!
        artist: String!
        title: String!
        genre: String!
        avatar: String
        date: String!
        created_at: String!
        updated_at: String!
    }

    input albumInput {
        artist: String!
        title: String!
        genre: String!
        avatar: String
        date: String!
    }

    type User {
        email: String!
        password: String
        full_name: String
        isActive: Boolean
        isAdmin: Boolean
    }

    input UserInput {
        email: String!
        password: String!
        full_name: String
        isActive: Boolean
        isAdmin: Boolean
    }

    type Song {
        title: String!
        file: String!
        file_type: String!
    }

    input SongInput {
        title: String!
        file: String
        file_type: String
    }

    type RootQuery {
        artists: [Artist!]!
        albums: [Album!]!
        users: [User!]!
        songs: [Song!]!
    }

    type RootMutation {
        createArtist(artistInput: artistInput): Artist
        createAlbum(albumInput: albumInput): Album
        createUser(userInput: UserInput):  User
        createSong(songInput: SongInput): Song
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    // takes all resolvers method define in RootQuery and RootMutation
    rootValue: {

        albums: () =>{
            return Album.find().then(result => {
                return result.map(album => {
                    return { ...album._doc}
                })
            }).catch(err => {
                throw err;
            })
        },

        createAlbum: (args) => {

            let album = new Album({
                artist: args.albumInput.artist,
                title: args.albumInput.title,
                genre: args.albumInput.genre,
                avatar: args.albumInput.avatar,
                date: args.albumInput.date,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });

            return album.save().then((result) => {
                return { ...result._doc }
            }).catch(err => {
                throw err;
            })

        },

        artists: () => {
            return Artist.find().then(artists => {
                return artists.map(artist => {
                    return { ...artist._doc};
                })
            })

        },

        createArtist: (args) => {
            let artist = new Artist({
                full_name: args.artistInput.full_name,
                bio: args.artistInput.bio,
                dob: new Date(args.artistInput.dob),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            })


            return artist.save().then((result) => {
                console.log(result)
                return { ...result._doc }
            }).catch( err => console.log(err) )
        },

        createUser: args => {
            return User.findOne({email: args.userInput.email})
            .then( user => {
                if(user){
                    throw new Error('The user already exist');
                }

                return bcrypt.hash(args.userInput.password, 12);
            })
            .then( encryptedPassword => {
                const user = new User({
                    email: args.userInput.email,
                    password: encryptedPassword,
                    full_name: args.userInput.full_name,
                    isAdmin: args.userInput.isAdmin,
                    isActive: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()

                })

                return user.save();
            }).then( user => {
                return {...user._doc, password: null}
            })
            .catch(err => {
                throw err;
            })
        },
        users:  () => {
            return User.find().then( users => {
                return users.map(user => {
                    return { ...user._doc }
                })
            }).catch( err => {
                throw err;
            })
        },
        createSong: args => {

            const song = new Song({
                title: args.songInput.title,
                file: args.songInput.file,
                file_type: args.songInput.file_type,
                album: "5c5099dd0d21a611a606e84c", // album collection
                addedBy: "5c50b7182365c91dc3bc94ce" // user collection
            })
            let createdSong;
            return song.save()
            .then( result => {
                let createdSong = {...result._doc};
                return Album.findById("5c5099dd0d21a611a606e84c");

            })
            .then( album => {
                if(!album){
                    throw new Error("Album not Found");
                }
                album.songs.push(song);
                return album.save();
            })
            .then( result => {
                return User.findById("5c50b7182365c91dc3bc94ce");
            })
            .then( user => {
                if(!user){
                    throw new Error("User not Found");
                }
                user.createdSongs.push(song);

                return user.save();
            })
            .then( result => {
                return createdSong;
            })
            .catch( err => {
                throw err;
            });
        }
    },
    graphiql: true
}))


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.PASSWORD}@cluster0-af1hq.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`, {
    useNewUrlParser:  true
})
.then(() => {
    console.log("Connected to Database")
    app.listen(9000)
}).catch( err => {
    console.log(err)
})