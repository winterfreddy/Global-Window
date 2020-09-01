const express = require("express");
const router = express.Router();
const passport = require("passport");
const AWS = require('aws-sdk');
const uuidv4 = require("uuid").v4;
const fs = require('fs');
const keys = require("../../config/keys");
const Photo = require("../../models/Photo");
const validatePhotoInput = require("../../validation/photo");

// Middleware for Form-Data Postman
const multer = require("multer");
const upload = multer();

// AWS Setup
const s3 = new AWS.S3({
  accessKeyId: keys.awsAccessKeyId,
  secretAccessKey: keys.awsSecretAccessKey,
});
const config = new AWS.Config({
  accessKeyId: keys.awsAccessKeyId,
  secretAccessKey: keys.awsSecretAccessKey,
  region: "us-west-1",
});

// router.get("/", (req, res) => {
//     config.getCredentials(function (err) {
//         if (err) console.log(err.stack);
//         // credentials not loaded
//         else {
//             console.log("Access key:", config.credentials.accessKeyId);
//         }
//     });
//     // res.json("Finished?");
// });

// Use this to access/add files?
// var params = { Bucket: "myBucket", Key: "fileName" }

// s3.getObject(params, function(err, data) {
//   if (err) console.log(err, err.stack);
//   else     console.log(data);
// });


const uploadFile = (file) => {
  // Read content from the file
  console.log(file);
//   const fileContent = fs.readFileSync(file.buffer);
//   const fileContent = fs.readFile(file, 'utf8');
    // const fileContent = fs.readFile(file,(err, data) => {
    //     if (err) throw err;
    //     console.log(data);
    // });

//   const newFileName = uuidv4();
  // Setting up S3 upload parameters
  const params = {
    Bucket: keys.s3Bucket,
    Key: file.originalname, // File name you want to save as in S3
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read"
  };

  let uploadedFileURL;
  // Uploading files to the bucket

    // if (err) {
    //   throw err;
    // }
    // console.log(`File uploaded successfully. ${data.Location}`);
    // uploadedFileURL = data.Location;
  const uploadPhoto = s3.upload(params).promise();
  
  return uploadPhoto.then((data) => {
    console.log(data.Location);
    return data.Location;  
  }).catch((err) => {
      console.log('photo error: ', err);
  });
};

router.post("/", upload.single("file"), 
    passport.authenticate("jwt", { session: false }),
    (req, res) => {

        // console.log('req: ', req);
        // console.log('body: ', req.body);
        // console.log('file: ', req.file);
        // const { errors, isValid } = validatePhotoInput(req.body);

        // if (!isValid) {
        //     return res.status(400).json(errors);
        // }

        const uploadedFileURL = uploadFile(req.file);
        console.log("received uploadedFileURL");
        const newPhoto = new Photo({
            creatorId: req.body.creatorId, // req.user.id
            imageURL: uploadedFileURL,
            coordinates: { lat: req.body.lat, lng: req.body.lng }
        });

        newPhoto.save().then((photo) => res.json(photo));
    }
);

module.exports = router;
