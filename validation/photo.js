const Validator = require('validator');
const validText = require("./valid-text");
const LAT = 'lat';
const LNG = 'lng';



module.exports = function validateNewPhotoInput(data) {
  let errors = {};


  data.creatorId = validText(data.creatorId) ? data.creatorId : "";
  data.imageURL = validText(data.imageURL) ? data.imageURL : "";
  const coords = data.coordinates;
  data.lat = validText(coords[LAT]) ? coords[LAT] : "";
  data.lng = validText(coords[LNG]) ? coords[LNG] : "";


  if(Validator.isEmpty(data.imageURL)) {
​    errors.imageURL = "Image URL is required";
  }


  // Posting URLs or uploading image?
  // if(!Validator.isURL(data.imageURL)) {
  //   errors.imageURL = "Image URL must be valid";
  // }

  if (!Validator.isDecimal(data.lat)) {
​    errors.lat = "Latitude must be decimal";
  }
  if (Validator.isEmpty(data.lat)) {
​    errors.lat = "Latitude is required";
  }



  if (!Validator.isDecimal(data.lng)) {
​    errors.lng = "Longitude must be decimal";
  }
  if (Validator.isEmpty(data.lng)) {
​    errors.lng = "Longitude is required";
  }

  return {
​    errors,
​    isValid: Object.keys(errors).length === 0
  }
}