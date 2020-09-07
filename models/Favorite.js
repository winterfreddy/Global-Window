const mongoose = require("mongoose")
const Schema = mongoose.Schema;

// const FavoriteSchema = new Schema({
//     favoriterId: {
//         type: Schema.Types.ObjectId,
//         ref: "users",
//     },
    
//     created: {
//         type: Date,
//         default: Date.now,
//     },
// });

const FavoriteSchema = new Schema({
  photoId: {
    type: Schema.Types.ObjectId,
    // ref: "photos"
    ref: "Photo",
    index: true,
    required: true
  },
  favoriterId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

FavoriteSchema.index({ photoId: 1, favoriterId: 1 }, { unique: true });

module.exports = Favorite = mongoose.model("Favorite", FavoriteSchema);
