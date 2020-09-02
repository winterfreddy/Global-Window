const Validator = require('validator');
const validText = require("./valid-text");

module.exports = function validatePhotoInput(data, photo) {
  let errors = {};

  const { lat, lng } = JSON.parse(data.coordinates);
  // console.log("lat: ", lat);
  // console.log("type of lat: ", typeof lat);
  // console.log("lng: ", lng);
  // data.creatorId = validText(data.creatorId) ? data.creatorId : "";
  data.imageURL = validText(data.imageURL) ? data.imageURL : "";
  // const newLat = validText(lat) ? lat : "";
  // const newLng = validText(lng) ? lng : "";

//   if (Validator.isEmpty(data.imageURL)) {
//     errors.imageURL = "Image URL is required";
//   }

//   // Posting URLs or uploading image?
//   if(!Validator.isURL(data.imageURL)) {
//     errors.imageURL = "Image URL must be valid";
//   }



  if (!Validator.isNumeric(lat.toString())) {
    errors.lat = "Latitude must be decimal";
    console.log("lat decimal");
  }
  
  if (Validator.isEmpty(lat.toString())) {
    errors.lat = "Latitude is required";
  }
  
  if (!Validator.isNumeric(lng.toString())) {
    errors.lng = "Longitude must be decimal";
    console.log("lng decimal");
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