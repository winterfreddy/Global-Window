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

// router.delete(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const currUserId = req.user.id;
//     Favorite.findById(req.params.id)
//       .then((favorite) => {
//         if (favorite.favoriterId == currUserId) {
//           Favorite.deleteOne({ _id: req.params.id })
//           .then(() => res.json({ successfulUnfavorite: "Favorite has been removed" }))
//           .catch((err) => res.json({ favoriteNotDeleted: "Unable to delete favorite" }))
//         } else {
//            res.status(422).json({ unauthorizedFavoriter: "Can only delete your own favorites" });
//         }
//       }).catch((err) =>
//         res
//           .status(404)
//           .json({ favoriteNotFound: "Favorite has not been found" })
//       );
//   }
// );

router.delete(
  "/",
  upload.single('file'),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const photoId = req.body.photoId;
    const currUserId = req.user.id;
    console.log(req.body)
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
