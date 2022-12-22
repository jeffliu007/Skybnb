const express = require("express");
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");

const {
  Spot,
  SpotImage,
  Review,
  User,
  Booking,
  sequelize,
  ReviewImage,
} = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

const router = express.Router();

router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;

  const usersRev = await Review.findAll({
    where: {
      userId: user.id,
    },
    include: [
      {
        model: User,
        attributes: {
          exclude: [
            "hashedPassword",
            "email",
            "createdAt",
            "updatedAt",
            "username",
          ],
        },
      },
      {
        model: Spot,
        attributes: {
          exclude: ["description", "createdAt", "updatedAt"],
        },
      },
      {
        model: ReviewImage,
        attributes: {
          exclude: ["reviewId", "createdAt", "updatedAt"],
        },
      },
    ],
  });
  const allRevs = [];
  for (let i = 0; i < usersRev.length; i++) {
    let rev = usersRev[i];
    rev = rev.toJSON();
    let newImage = await SpotImage.findOne({
      where: {
        spotId: rev.spotId,
        preview: true,
      },
    });

    if (newImage) rev.Spot.previewImage = newImage.url;
    else rev.Spot.previewImage = "No images uploaded yet";
    allRevs.push(rev);
  }
  res.json({
    Reviews: allRevs,
  });
});

module.exports = router;
