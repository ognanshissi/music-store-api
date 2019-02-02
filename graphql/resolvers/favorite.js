const Favorite = require('../../models/favorite');
const { dateToString }  = require('../../helpers/date');

module.exports = {
    favorites: async () => {
        try{
            const favorites = await Favorite.find();
            return favorites.map(favorite => {
                return {
                    ...favorite._doc,
                    createdAt: dateToString(favorite._doc.createdAt),
                    updatedAt: dateToString(favorite._doc.updatedAt)
                }
        })
        }catch(err){
            throw err;
        }
    },

   



}