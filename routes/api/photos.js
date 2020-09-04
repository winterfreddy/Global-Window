const express = require("express");
const router = express.Router();
const passport = require("passport");
const AWS = require('aws-sdk');
const uuidv4 = require("uuid").v4;
const keys = require("../../config/keys");
const Photo = require("../../models/Photo");
const Point = require("../../models/Point");
const Favorite = require("../../models/Favorite");
const validatePhotoInput = require("../../validation/photo");
const getSearchArea = require("./_photos_helper");
const strftime = require("strftime");

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
    const { lng1, lng2 } = req.query;
    if(!lng1 && !lng2) {
      Photo.find()
        .sort({ created: -1 })
        .then((photos) => res.json(photos))
        .catch((err) =>
          res.status(404).json({ nophotosfound: "No photos found" })
        );
        
    // } else if(req.query.lng1 && !req.query.lng2) { // use this when it works
    } else if(false) { // temp because it's broken
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
    } else if (lng1 && lng2) {
      const searchArea = getSearchArea(req.query);
      let search;
      if (req.query.tag) {
        search = req.query.tag
      } else {
        search = { $exists: true }
      }

      Photo.find({ 
        location: {
          $geoWithin: {
            $geometry: searchArea,
          },
        },
        tags: search
        
      })
        .limit(MAX_SEARCH_LIMIT)
        .sort({ created: -1 })
        .then((photos) => res.json(photos)) 
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

router.get("/:id/favorites", (req, res) => {
  Favorite.find({ photoId: req.params.id })
    .then((favorites) => {
      if (favorites.length > 0) {
        return res.json(favorites);
      } else {
        return res.json({photoId: req.params.id});
      }
    })
    .catch((err) =>
      res.status(400).json({ photoNotFound: "Photo with that id not found" })
    );
});

const uploadImage = (file) => {
  const params = {
    Bucket: keys.s3Bucket,
    Key: uuidv4(),
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  };
  console.log("image params are set");
  const uploadPhoto = s3.upload(params).promise();
  return uploadPhoto;
};

// create a new photo - NB: this uses the helper method above
router.post(
  "/",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePhotoInput(req.body, req.file);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Wait for file to upload, get URL, and then create Photo object
    uploadImage(req.file)
      .then((data) => {
        const uploadedFileURL = data.Location;
        const coords = JSON.parse(req.body.coordinates);
        const locationObject = new Point({
          type: "Point",
          coordinates: [coords.lng, coords.lat],
        });
        
        const newPhoto = new Photo({
          creatorId: req.user.id,
          description: req.body.description,
          imageURL: uploadedFileURL,
          coordinates: coords,
          location: locationObject,
          tags: req.body.tags,
          created: strftime("%b %d, %Y, %l:%M %P"),
        });
        newPhoto.save().then((photo) => res.json(photo));
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
      const currUserId = req.user.id;
      if(currUserId == photo.creatorId) {
        Photo.deleteOne({ _id: photo.id })
          .then(() => Favorite.deleteMany({ photoId: req.params.id }), function(err, result) {
             if (err) {
               res.send(err);
             } else {
               res.send(result);
             }
          })
          .then(() => res.json({ successfulDelete: "Deleted successfully" }))
          .catch(err => res.status(400).json({ unsuccessfulDelete: "Not deleted" })) 
      } else {
        res.status(404).json({ unauthorizedDelete: "Not authorized to delete" })
      }
    })
    .catch(() => res.status(400).json({ photoNotFound: "Photo not found with that id" }))
));

// update a photo
router.patch('/:id', upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { coordinates, tags, description, lat, lng } = req.body;
    Photo.findById(req.params.id)
      .then(photo => {
        const currUserId = req.user.id;
        if(currUserId == photo.creatorId) {
          const newCoords = JSON.parse(coordinates); 
          const locationObject = new Point({
            type: "Point",
            coordinates: [newCoords.lng, newCoords.lat],
          });
          photo.updateOne({ 
                description: description ,
                tags: tags ,
                coordinates: newCoords,
                location: locationObject 
          })
            .then(() =>
              res.json({ successfulUpdate: "Photo successfully updated" })
            )
            .catch((err) =>
              res.json({ failedUpdate: "Photo could not be updated " })
            );
        } else {
          res.status(404).json({ unauthorizedUpdate: "Not authorized to update" })
        }
      })
    .catch(err =>
      res.status(422).json({ noPhotoFound: "Photo could not be found" }))
});

module.exports = router;
