const express = require("express");
const router = express.Router();
const passport = require("passport");
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const keys = require("../../config/keys");

// AWS Setup
const config = new AWS.Config({
    accessKeyId: keys.aws_access_key_id,
    secretAccessKey: keys.aws_secret_access_key,
    region: "us-west-1"
});
// var config = new AWS.Config({
//   accessKeyId: 'AKID', secretAccessKey: 'SECRET', region: 'us-west-2'
// });
// AWS.config.accessKeyId = keys.aws_access_key_id;
// AWS.config.secreAccessKey = keys.aws_secret_access_key;
// AWS.config.region = "us-west-1";




router.get("/", (req, res) => {
    console.log("Get Photos");
    config.getCredentials(function (err) {
        if (err) console.log(err.stack);
        // credentials not loaded
        else {
            console.log("Access key:", config.credentials.accessKeyId);
        }
    });
});

// Use this to access/add files?
// var params = { Bucket: "myBucket", Key: "fileName" }

// s3.getObject(params, function(err, data) {
//   if (err) console.log(err, err.stack);
//   else     console.log(data);
// });

const Photo = require("../../models/Photo");
const validatePhotoInput = require("../../validation/photo");

router.post("/", 
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { errors, isValid } = validatePhotoInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }
    
        const newPhoto = new Photo({
            creatorId: req.body.creatorId,
            imageURL: req.body.imageURL,
            coordinates: { lat: req.body.lat, lng: req.body.lng }
        });

        newPhoto.save().then((photo) => res.json(photo));
    }
);

module.exports = router;
