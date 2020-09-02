const Validator = require('validator');
const validText = require("./valid-text");

module.exports = function validatePhotoInput(data) {
  let errors = {};

  const { lat, lng } = data.coordinates;
  
  // data.creatorId = validText(data.creatorId) ? data.creatorId : "";
  data.imageURL = validText(data.imageURL) ? data.imageURL : "";
  lat = validText(lat) ? lat : "";
  lng = validText(lng) ? lng : "";

//   if (Validator.isEmpty(data.imageURL)) {
//     errors.imageURL = "Image URL is required";
//   }

//   // Posting URLs or uploading image?
//   if(!Validator.isURL(data.imageURL)) {
//     errors.imageURL = "Image URL must be valid";
//   }

  if(!Validator.isDecimal(lat)) {
    errors.lat = "Latitude must be decimal";
  }

  if (Validator.isEmpty(lat)) {
    errors.lat = "Latitude is required";
  }

  if (!Validator.isDecimal(lng)) {
    errors.lng = "Longitude must be decimal";
  }

  if (Validator.isEmpty(lng)) {
    errors.lng = "Longitude is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }

}