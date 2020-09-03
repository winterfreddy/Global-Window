const mongoose = require("mongoose")
require("mongoose-double")(mongoose);
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;
// const PointSchema = require('./Point');

const PointSchema = new Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number], // [lng, lat] IMPORTANT
    required: true,
  },
});

const PhotoSchema = new Schema({
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  description: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  coordinates: {
    lat: {
      type: SchemaTypes.Double,
      required: true,
    },
    lng: {
      type: SchemaTypes.Double,
      required: true,
    },
  },
  location: {
    type: PointSchema,
    required: true
  },
  created: {
    type: Date,
    default: Date.now,
  },
  tags: [],
  // favoriterIds: [],
});

module.exports = User = mongoose.model("Photo", PhotoSchema);
