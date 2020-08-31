const express = require("express");
const router = express.Router();
const passport = require("passport");

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
