const express = require("express");
const router = express.Router();
const passport = require("passport");
const AWS = require('aws-sdk');
const uuidv4 = require("uuid").v4;
const keys = require("../../config/keys");
const Photo = require("../../models/Photo");
const Point = require("../../models/Point");
const validatePhotoInput = require("../../validation/photo");

const SET_MAX_DISTANCE = 30000000;
const MAX_SEARCH_LIMIT = 20;

// Middleware for Form-Data Postman
const multer = require("multer");
const upload = multer();

// AWS S3 Setup
const s3 = new AWS.S3({
  accessKeyId: keys.awsAccessKeyId,
  secretAccessKey: keys.awsSecretAccessKey,
});

// // get all photos
router.get('/', (req, res) => {
    // if(!req.body.coordinatesSet) { // USE THIS ONE FOR PROD
    console.log('request query: ',req.query);
    if(!req.query.lng1) {
        console.log("GRAB ALL PHOTOS");
      // TESTING ONLY
      Photo.find()
        .sort({ date: -1 })
        .then((photos) => res.json(photos))
        .catch((err) =>
          res.status(404).json({ nophotosfound: "No photos found" })
        );
      // } else if(coordsSet.length === 1) { // USE THIS ONE FOR PROD
    } else if(req.query.lng1 && !req.query.lng2) {
      console.log("length 1 coordsSet");
      // const coordsSet = JSON.parse(req.body.coordinatesSet);
      let coords = [];
      coords[0] = parseFloat(req.query.lng1) || 0;
      coords[1] = parseFloat(req.query.lat1) || 0;
    //   const centerPoint = {
    //       type: 'Point',
    //       coordinates: coords
    //   };
      console.log(coords);
      Photo.find({
        location: {
          $near: {
            $geometry: {
                type: "Point",
                coordinates: coords,
            },
            $maxDistance: SET_MAX_DISTANCE,
          },
        },
      })
        // .limit(MAX_SEARCH_LIMIT)
        // .sort({ date: -1 })
        .then((photos) => res.json(photos)) // try .exec() if this doesn't work
        .catch((err) => res.status(404).json(err));
        // .exec(function(err, locations) {
        //     if (err) {
        //         return res.status(500).json(err);
        //     }
        //     res.json(200, locations);
        // });

      // } else if(coordsSet.length === 2) { // USE THIS ONE FOR PROD
    } else if (req.query.lng1 && req.query.lng2) {
      // const coordsSet = JSON.parse(req.body.coordinatesSet);
      console.log("2+ coord values found, searchArea");
      let northValue = req.query.lng2;
      let southValue = req.query.lng1;
      let eastValue = req.query.lat2;
      let westValue = req.query.lat1;

      const searchArea = {
        type: "Polygon",
        coordinates: [
          [
            [northValue, westValue],
            [southValue, westValue],
            [southValue, eastValue],
            [northValue, eastValue],
            [northValue, westValue],
          ],
        ],
      };

      console.log('serach area: ', searchArea);

      Photo.find({ // or .find()
        location: {
          $geoWithin: {
            $geometry: searchArea,
          },
        },
      })
        .limit(MAX_SEARCH_LIMIT)
        .sort({ created: -1 })
        .then((photos) => res.json(photos)) // try .exec() if this doesn't work
        .catch((err) =>
          res.status(404).json(err)
        );
    }
});

// get a specific photo
router.get('/:id', (req, res) => {
  Photo.findById(req.params.id)
    .then(photo => res.json(photo))
    .catch(err =>
      res.status(404).json({ nophotofound: 'No photo found with that ID' })
    );
});

const uploadImage = (file) => {
  console.log(file);
  const params = {
    Bucket: keys.s3Bucket,
    Key: uuidv4(),
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  };
  console.log("created params");
  const uploadPhoto = s3.upload(params).promise();
  console.log("going back to posting photo");
  return uploadPhoto;
};
// create a new photo - NB: this uses the helper method above
router.post(
  "/",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // TODO: ADD THIS BACK AFTER TESTING
    const { errors, isValid } = validatePhotoInput(req.body, req.file);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Wait for file to upload, get URL, and then create Photo object
    uploadImage(req.file)
      .then((data) => {
        console.log("file upload successful");
        const uploadedFileURL = data.Location;
        // ADD THIS BACK AFTER TESTING
        const coords = JSON.parse(req.body.coordinates);
        // const coords = { lat: req.body.lat, lng: req.body.lng };
        console.log("coords: ", coords);
        const locationObject = new Point({
          type: "Point",
          coordinates: [coords.lng, coords.lat],
        });
        console.log("locationObject: ", locationObject);
        locationObject.save().then((point) => {
          // create Photo object
          console.log("locationObject saved!");
          const newPhoto = new Photo({
            creatorId: req.user.id, // req.user.id
            description: req.body.description,
            imageURL: uploadedFileURL,
            coordinates: coords,
            location: point,
            tags: req.body.tags,
          });
          newPhoto.save().then((photo) => res.json(photo));
        });
      })
      .catch((err) => {
        res.status(400).json({ image: "Image upload did not work" });
      });
  }
);

// delete a photo, MAY RETURN NULL
router.delete('/:id',
  passport.authenticate("jwt", { session: false }),
  (req, res) => (
    Photo.findById(req.params.id)
    .then((photo) => {
      console.log('photo found'); 
      const currUserId = req.user.id;
      if(currUserId == photo.creatorId) {
        Photo.deleteOne({ _id: photo.id })
          .then(() => res.json({ successfulDelete: "Deleted successfuly" }))
          .catch(err => res.status(400).json({ unsuccessfulDelete: "Not deleted" })) 
      } else {
        res.status(404).json({ unauthorizedDelete: "Not authorized to delete" })
      }
    })
    .catch(() => res.status(400).json({ photoNotFound: "Photo not found with that id" }))
));

// update a photo
router.patch('/:id',
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Photo.findById(req.params.id)
      .then(photo => {
        const currUserId = req.user.id;
        if(currUserId == photo.creatorId) {
          photo.updateOne(
            { description: req.body.description },
            { tags: req.body.tags }
            // If `new` isn't true, `findOneAndUpdate()` will return the
            // document as it was _before_ it was updated.
            // { new: true }
          ).then(() => res.status(200).json({ successfulUpdate: "Photo successfully updated" }))
          .catch(err => res.json({ failedUpdate: "Photo could not be updated "}))
        } else {
          res.status(404).json({ unauthorizedUpdate: "Not authorized to update" })
        }
      })
    .catch(err =>
      res.status(422).json({ noPhotoFound: "Photo could not be found" }))
})

module.exports = router;
