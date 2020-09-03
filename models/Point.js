const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PointSchema = new Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number], // [lng, lat] IMPORTANT
    required: true,
    index: '2dsphere'
  },
});
module.exports = Point = mongoose.model("Point", PointSchema);
