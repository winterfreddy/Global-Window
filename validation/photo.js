const Validator = require('validator');
const validText = require("./valid-text");

module.exports = function validatePhotoInput(data, photo) {
  let errors = {};

  const { lat, lng } = JSON.parse(data.coordinates);
  data.imageURL = validText(data.imageURL) ? data.imageURL : "";

  if (!Validator.isNumeric(lat.toString())) {
    errors.lat = "Latitude must be decimal";
  }
  
  if (Validator.isEmpty(lat.toString())) {
    errors.lat = "Latitude is required";
  }
  
  if (!Validator.isNumeric(lng.toString())) {
    errors.lng = "Longitude must be decimal";
  }
  
  if (Validator.isEmpty(lng.toString())) {
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