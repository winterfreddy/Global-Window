const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const Photo = require("../../models/Photo");
const Favorite = require("../../models/Favorite");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
    });
  }
);

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if(!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ username: "A user has already registered with this username" });
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
      });
      
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = { id: user.id, username: user.username };

              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              );
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }).then((user) => {
    if (!user) {
      return res.status(404).json({ username: "This user does not exist" });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { id: user.id, username: user.username };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Incorrect password" });
      }
    });
  });
});

router.get("/:id/photos", (req, res) => {
  Photo.find({ creatorId: req.params.id }, "_id")
    .sort({ date: -1 })
    // .then(photos => res.json(photos))
    .catch((err) =>
      res.status(404).json({ nophotosfound: "No photos found from that user" })
    );
});

router.get(
  "/:id/favoritePhotos",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Favorite.find({ favoriterId: req.params.id }, 'photoId')
      .sort({ date: -1 })
      .then((photos) => res.json(photos))
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;
