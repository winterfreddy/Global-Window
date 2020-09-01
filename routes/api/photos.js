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

module.exports = router;
