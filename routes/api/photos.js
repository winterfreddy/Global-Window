const express = require("express");
const router = express.Router();
const passport = require("passport");
const AWS = require('aws-sdk');
const uuidv4 = require("uuid").v4;
const keys = require("../../config/keys");
const Photo = require("../../models/Photo");
const validatePhotoInput = require("../../validation/photo");

// Middleware for Form-Data Postman
const multer = require("multer");
const upload = multer();

// AWS S3 Setup
const s3 = new AWS.S3({
  accessKeyId: keys.awsAccessKeyId,
  secretAccessKey: keys.awsSecretAccessKey,
});

// get all photos
router.get('/', (req, res) => {
  Photo.find()
    .sort({ date: -1 })
    .then(photos => res.json(photos))
    .catch(err => res.status(404).json({ nophotosfound: 'No photos found' }));
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
  const params = {
    Bucket: keys.s3Bucket,
    Key: uuidv4(),
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read"
  };

  const uploadPhoto = s3.upload(params).promise();
  
  return s3.upload(params).promise();
};

// create a new photo - NB: this uses the helper method above
router.post("/", upload.single("file"), 
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { errors, isValid } = validatePhotoInput(req.body);

        if (!isValid) {
          return res.status(400).json(errors);
        }
        
        // Wait for file to upload, get URL, and then create Photo object
        uploadImage(req.file).then(data => {
            const uploadedFileURL = data.Location;

            // create Photo object
            const newPhoto = new Photo({
            creatorId: req.user.id, // req.user.id
            imageURL: uploadedFileURL,
            coordinates: { lat: req.body.lat, lng: req.body.lng },
            });

            newPhoto.save().then((photo) => res.json(photo));
        }).catch(err => {
            console.log(err);  
            res.status(400).json({image: "Image upload did not work"});
        });
    }
);

// delete a photo
// router.delete('/:id', (req, res) => {
//   Photo.findById(req.params.id)
//     .then((photo) => {
//       const currUserId = req.user.id;
//       if(currUserId === photo.creatorId) {
//         Photo.deleteOne({ id: photo.id })
//           .then(() => res.json({ successfulDelete: "Deleted successfuly" }))
//           .catch(err => res.status(400).json({ unsuccessfulDelete: "Not deleted" })) 
//       } else {
//         res.status(404).json({ unauthorizedDelete: "Not authorized to delete" })
//       }
//     })
//     .catch(() => res.status(400).json({ photoNotFound: "Photo not found with that id" }))
// })
router.delete('/:id', (req, res) => (
    Photo.findById(req.params.id)
    .then((photo) => {
    const currUserId = req.user.id;
      if(currUserId === photo.creatorId) {
        Photo.deleteOne({ id: photo.id })
          .then(() => res.json({ successfulDelete: "Deleted successfuly" }))
          .catch(err => res.status(400).json({ unsuccessfulDelete: "Not deleted" })) 
      } else {
        res.status(404).json({ unauthorizedDelete: "Not authorized to delete" })
      }
    })
      .catch(err => console.log("delete error: ", err))
));

// update a photo
router.patch('/:id', (req, res) => {
  Photo.findById(req.params.id)
    .then(photo => {
      photo.updateOne(
        { description: req.body.description },
        { tags: req.body.tags }
        // If `new` isn't true, `findOneAndUpdate()` will return the
        // document as it was _before_ it was updated.
        // { new: true }
      ).then(() => res.status(200).json({ successfulUpdate: "Photo successfully updated" }))
      .catch(err => res.json({ failedUpdate: "Photo could not be updated "}))
    })
    .catch(err =>
      res.status(422).json({ noPhotoFound: "Photo could not be found" }))
})

module.exports = router;
