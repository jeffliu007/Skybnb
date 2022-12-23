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

//get bookings for current user

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

//edit booking by id

router.put("/:bookingId", requireAuth, async (req, res, next) => {
  const { user } = req;
  const id = req.params.bookingId;
  const { startDate, endDate } = req.body;
  const groupedErr = {};

  const currBooking = await Booking.findByPk(id);
  const newDate = new Date();

  if (!currBooking) {
    const err = new Error("Booking couldn't be found");
    err.status = 404;
    err.title = "No current booking";
    return next(err);
  }

  if (user.id !== currBooking.userId) {
    const err = new Error("Unauthorized user");
    err.status = 404;
    err.message = "Unauthorized user";
    return next(err);
  }

  if (endDate <= startDate) {
    const err = new Error("endDate cannot be on or before startDate");
    err.status = 400;
    err.title = "Validation error";
    return next(err);
  }

  if (currBooking.endDate < newDate) {
    const err = new Error("Past bookings can't be modified");
    err.status = 403;
    err.title = "Invalid user action";
    return next(err);
  }

  //edit
  currBooking.startDate = startDate;
  currBooking.endDate = endDate;

  const allBookings = await Booking.findAll();

  allBookings.forEach((booking) => {
    let prevStart = booking.startDate.getTime();
    let prevEnd = booking.startDate.getTime();
    let buildStart = currBooking.startDate.getTime();
    let buildEnd = currBooking.endDate.getTime();

    //account for conflicting dates

    if (prevStart >= buildStart && prevStart <= buildEnd) {
      groupedErr.startDate = "Start date invalid";
    }

    if (prevEnd >= buildStart && prevEnd <= buildEnd) {
      groupedErr.endDate = "End date invalid";
    }
  });

  if (Object.values(groupedErr).length > 0) {
    const err = new Error(
      "Sorry this spot is already booked for the specified dates"
    );
    err.status = 403;
    err.title = "Spot unavailable";
    return next(err);
  }

  await currBooking.save();
  // res.send("hit");
  res.json(currBooking);
});

//delete a booking

router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  const { user } = req;
  const id = req.params.bookingId;
  const newDate = new Date();

  const currBooking = await Booking.findByPk(id);
  const currSpot = await Spot.findByPk(id);

  if (!currBooking) {
    const err = new Error("Booking couldn't be found");
    err.status = 404;
    err.title = "No current booking";
    return next(err);
  }

  if (user.id !== currBooking.userId && user.id !== currSpot.ownerId) {
    const err = new Error("Unauthorized user");
    err.status = 404;
    err.message = "Unauthorized user";
    return next(err);
  }

  if (currBooking.startDate < newDate && currBooking.endDate > newDate) {
    const err = new Error("Bookings that have been started can't be deleted");
    err.status = 403;
    err.title = "Booking error";
  }

  await currBooking.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
