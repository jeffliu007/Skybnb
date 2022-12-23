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
const {
  handleValidationError,
  allReviewsValidation,
} = require("../../utils/validation");
const { Op } = require("sequelize");
const { compareSync } = require("bcryptjs");

const router = express.Router();

router.get("/current", requireAuth, async (req, res, next) => {
  const { user } = req;

  const userBookings = await Booking.findAll({
    where: {
      userId: user.id,
    },
    include: [
      {
        model: Spot,
        attributes: {
          exclude: ["description", "createdAt", "updatedAt"],
        },
      },
    ],
  });

  const arrOfBookings = [];

  for (let i = 0; i < userBookings.length; i++) {
    let booking = userBookings[i];

    let bookImg = await SpotImage.findOne({
      where: {
        spotId: booking.spotId,
        preview: true,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "id", "spotId", "preview"],
      },
    });

    if (booking.Spot) {
      booking.Spot.toJSON();
      booking.Spot = Spot;
    }

    if (bookImg) {
      booking.dataValues.Spot.dataValues.previewImage = bookImg.url;
    } else booking.dataValues.Spot.previewImage = "No image uploaded yet";

    arrOfBookings.push(booking);
  }

  res.json({
    Bookings: arrOfBookings,
  });
});

module.exports = router;
