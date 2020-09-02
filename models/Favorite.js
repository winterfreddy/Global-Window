const mongoose = require("mongoose")
require("mongoose-double")(mongoose);
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;

const FavoriteSchema = new Schema({
    favoriterId: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Favorite = mongoose.model("Favorite", FavoriteSchema);
