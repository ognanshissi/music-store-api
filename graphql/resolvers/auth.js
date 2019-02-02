const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');
const { songs }  = require('./serializer');
const jwt = require('jsonwebtoken');



module.exports = {


    login: async ({email, password}) => {
        try{
            const user_ = await User.findOne({email: email});
            if(!user_){
                throw new Error("No user exist with this email address")
            }
            // check the password
            const isQual = await bcrypt.compare(password, user_.password);
            if(!isQual){
                throw new Error("Password doesn't match!")
            }
            const token = jwt.sign({userId: user_._id, email: user_.email}, process.env.SECRET_KEY, {expiresIn: '1h'})
            // created user object
            const userData = {
                userId: user_._id,
                token: token,
                tokenExpiration:1
            }

            return userData;

        }catch(err){
            throw err;
        }
    },

    users:  () => {
        return User.find()
        .then( users => {
            return users.map(user => {
                return { 
                    ...user._doc,
                    songs: songs.bind(this, user._doc.songs),
                    createdAt: dateToString(user._doc.createdAt),
                    updatedAt: dateToString(user._doc.updatedAt),
                 }
            })
        }).catch( err => {
            throw err;
        })
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

            })

            return user.save();
        }).then( user => {
            return {
                ...user._doc,
                password: null,
                createdAt: dateToString(user._doc.createdAt),
                updatedAt: dateToString(user._doc.updatedAt),}
        })
        .catch(err => {
            throw err;
        })
    },
}