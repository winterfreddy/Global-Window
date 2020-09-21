const express = require("express");
const router = express.Router();
const passport = require("passport");
const Favorite = require("../../models/Favorite");

// Middleware for Form-Data Postman
const multer = require("multer");
const upload = multer();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newFavorite = new Favorite({
      photoId: req.body.photoId, // req.params.photoId
      favoriterId: req.user.id,
    });
    newFavorite
      .save()
      .then((favorite) => res.json(favorite))
      .catch((err) =>
        res.status(422).json({ failedFavorite: "Unable to favorite photo" })
      );
  }
);

router.delete(
  "/:photoId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const photoId = req.params.photoId;
    const currUserId = req.user.id;
    Favorite.findOneAndRemove({ photoId, favoriterId: currUserId })
      .then((favorite) =>
        res.json(favorite.photoId)
      )
      .catch((err) =>
        res
          .status(404)
          .json({ favoriteNotFound: "Favorite has not been found" })
      );
  }
);

module.exports = router;
