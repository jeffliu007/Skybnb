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
  handleValidationErrors,
  allSpotsValidation,
  allReviewsValidation,
} = require("../../utils/validation");
const { Op } = require("sequelize");

const router = express.Router();

//get all spots
router.get("/", async (req, res) => {
  //query checks
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;

  // page = parseInt(page);
  // size = parseInt(size);
  // if (!page) page = 1;
  // else if (page > 10) page = 10;
  // else if (page < 1) throw new Error("Page must be greater than or equal to 1");
  // if (!size) size = 10;
  // else if (size > 20) size = 20;
  // else if (size < 1) throw new Error("Size must be greater than or equal to 1");

  // let pagination = {};
  // if (page >= 1 && size >= 1) {
  //   pagination.limit = size;
  //   pagination.offset = size * (page - 1);
  // }

  let where = {};

  if (minLng)
    where.lng = {
      [Op.gte]: minLng,
    };

  if (maxLng)
    where.lng = {
      [Op.lte]: maxLng,
    };

  if (minLat)
    where.lat = {
      [Op.gte]: minLat,
    };

  if (maxLat)
    where.lat = {
      [Op.lte]: maxLat,
    };

  if (minPrice < 0) {
    throw new Error("Minimum price must be greater than or equal to 0");
  } else if (minPrice)
    where.price = {
      [Op.gte]: minPrice,
    };

  if (maxPrice < 0) {
    throw new Error("Maximum price must be greater than or equal to 0");
  } else if (maxPrice)
    where.price = {
      [Op.lte]: maxPrice,
    };

  //query check ends

  const allSpots = await Spot.findAll({
    where,
    include: [
      {
        model: Review,
        attributes: ["stars"],
      },
      {
        model: SpotImage,
        attributes: ["url", "preview"],
      },
    ],
    // ...pagination,
  });

  let Spots = [];
  allSpots.forEach((spot) => {
    let sum = 0;
    let amt = spot.Reviews.length;
    spot = spot.toJSON();

    spot.Reviews.forEach((rev) => {
      sum += +rev.stars;
      let avg = sum / amt;

      if (!avg) avg = "No reviews yet";

      spot.avgRating = avg;
    });

    spot.SpotImages.forEach((img) => {
      if (img.preview === true) {
        spot.previewImage = img.url;
      } else spot.previewImage = "No images uploaded yet";
    });

    if (spot.SpotImages.length === 0)
      spot.previewImage = "No images uploaded yet";

    delete spot.Reviews;
    delete spot.SpotImages;
    Spots.push(spot);
  });

  return res.json({
    Spots,
    page: page,
    size: size,
  });
});

//get spots owned by current User

router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;

  const usersSpots = await user.getSpots({
    include: [
      {
        model: Review,
        attributes: ["stars"],
      },
      {
        model: SpotImage,
        attributes: ["url", "preview"],
      },
    ],
  });
  let Spots = [];
  usersSpots.forEach((spot) => {
    spot = spot.toJSON();
    let sum = 0;
    let amt = spot.Reviews.length;

    spot.Reviews.forEach((rev) => {
      sum += rev.stars;
      let avg = sum / amt;

      if (!avg) avg = "No reviews yet";

      spot.avgRating = avg;

      spot.SpotImages.forEach((img) => {
        if (img.preview === true) {
          spot.previewImage = img.url;
        } else spot.previewImage = "No images uploaded yet";
      });
    });

    if (spot.SpotImages.length === 0)
      spot.previewImage = "No images uploaded yet";

    delete spot.SpotImages;
    delete spot.Reviews;
    Spots.push(spot);
  });
  if (!Spots) res.json("No spots available");
  else res.json({ Spots: Spots });
});

//get specific spot by id

router.get("/:spotId", async (req, res, next) => {
  const id = req.params.spotId;

  const spot = await Spot.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Review,
      },
      {
        model: User,
        attributes: {
          exclude: [
            "username",
            "email",
            "hashedPassword",
            "createdAt",
            "updatedAt",
          ],
        },
      },
      {
        model: SpotImage,
        attributes: {
          exclude: ["spotId", "createdAt", "updatedAt"],
        },
      },
    ],
  });

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.title = "Invalid spot";
    err.status = 404;
    return next(err);
  }
  let jsonSpot = spot.toJSON();
  jsonSpot.numReviews = jsonSpot.Reviews.length;
  let sum = 0;
  jsonSpot.Reviews.forEach((rev) => {
    sum += parseInt(rev.stars);
  });
  let avg = sum / jsonSpot.numReviews;

  if (!avg) avg = "No reviews yet";
  else jsonSpot.avgStarRating = avg;
  jsonSpot.Owner = jsonSpot.User;
  //remove the tables we edited
  delete jsonSpot.User;
  delete jsonSpot.Reviews;

  res.json(jsonSpot);
});

//creating a new spot

router.post("/", requireAuth, allSpotsValidation, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  let user = req.user;

  let newSpot = await Spot.create({
    ownerId: user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });
  res.status = 201;
  return res.json(newSpot);
});

//add image to a spot based on the spot's id

router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const user = req.user;
  const spotId = req.params.spotId;
  const { url, preview } = req.body;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.message = "Spot couldn't be found";
    err.title = "No spot found";
    return next(err);
  }

  if (user.id !== spot.ownerId) {
    const err = new Error("Unauthorized user");
    err.status = 404;
    err.message = "Unauthorized user";
    return next(err);
  }

  let newImage = await SpotImage.create({
    url,
    preview,
    spotId,
  });

  newImage = newImage.toJSON();

  delete newImage.spotId;
  delete newImage.createdAt;
  delete newImage.updatedAt;

  return res.json(newImage);
});

//edit a spot
router.put(
  "/:spotId",
  requireAuth,
  allSpotsValidation,
  async (req, res, next) => {
    const user = req.user;
    const spotId = req.params.spotId;
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;

    const spot = await Spot.findByPk(spotId);

    if (user.id !== spot.ownerId) {
      const err = new Error("Unauthorized user");
      err.status = 404;
      err.message = "Unauthorized user";
      return next(err);
    }

    if (!spot) {
      const err = new Error("Spot couldn't be found");
      err.status = 404;
      err.message = "Spot couldn't be found";
      err.title = "No spot found";
      return next(err);
    }

    spot.set({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });

    await spot.save();
    return res.json(spot);
  }
);

//delete a spot by id

router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId;
  const user = req.user;

  const spot = await Spot.findByPk(spotId);

  if (user.id !== spot.ownerId) {
    const err = new Error("Unauthorized user");
    err.status = 404;
    err.message = "Unauthorized user";
    return next(err);
  }

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.message = "Spot couldn't be found";
    err.title = "No spot found";
    return next(err);
  }

  spot.destroy();

  return res.json({
    message: "Successfully deleted",
    statusCode: res.statusCode,
  });
});

// get all rev by spotId

router.get("/:spotId/reviews", async (req, res, next) => {
  const id = req.params.spotId;

  const allRev = await Review.findAll({
    where: {
      spotId: id,
    },
    include: [
      {
        model: User,
        attributes: {
          exclude: [
            "username",
            "hashedPassword",
            "email",
            "createdAt",
            "updatedAt",
          ],
        },
      },
      {
        model: ReviewImage,
        attributes: {
          exclude: ["createdAt", "updatedAt", "reviewId"],
        },
      },
    ],
  });

  if (allRev.length === 0) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.title = "Spot doesn't exist";
    return next(err);
  }

  return res.json({
    Reviews: allRev,
  });
});

//create a rev for a spot  based on spot id
router.post(
  "/:spotId/reviews",
  requireAuth,
  allReviewsValidation,
  async (req, res, next) => {
    const user = req.user;
    const id = req.params.spotId;
    const { stars, review } = req.body;

    const spot = await Spot.findByPk(id);

    const allRev = await Review.findAll({
      where: {
        userId: user.id,
      },
    });

    if (!spot) {
      const err = new Error("Spot couldn't be found");
      err.status = 404;
      err.message = "Spot couldn't be found";
      err.title = "No spot found";
      return next(err);
    } else if (spot && !allRev) {
      const err = new Error("No reviews currently exist");
      err.status = 404;
      err.message = "No reviews";
      err.title = "No reviews found";
      return next(err);
    }

    let alreadyExistFlag = false;

    allRev.forEach((rev) => {
      if (rev.spotId === parseInt(id)) {
        alreadyExistFlag = true;
      }
    });

    if (alreadyExistFlag) {
      const err = new Error("User already has a review for this spot");
      err.status = 403;
      err.title = "A review has already been submitted";

      return next(err);
    }

    const newRev = await Review.create({
      review,
      stars,
      userId: user.id,
      spotId: spot.id,
    });

    return res.json(newRev);
  }
);

//get all bookings for a spot based on spot id
router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const user = req.user;
  const id = req.params.spotId;

  const spot = await Spot.findByPk(id);

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.message = "Spot couldn't be found";
    err.title = "No spot found";
    return next(err);
  }

  const allBookings = await Booking.findAll({
    where: {
      spotId: spot.id,
    },
    include: [
      {
        model: User,
        attributes: {
          exclude: [
            "username",
            "hashedPassword",
            "email",
            "createdAt",
            "updatedAt",
          ],
        },
      },
    ],
  });

  if (user.id === spot.ownerId) {
    return res.json({ Bookings: allBookings });
  } else {
    const nonUserBooking = [];

    allBookings.forEach((booking) => {
      booking = booking.toJSON();

      delete booking.id;
      delete booking.userId;
      delete booking.createdAt;
      delete booking.updatedAt;
      delete booking.User;
      nonUserBooking.push(booking);
    });

    return res.json({
      Bookings: nonUserBooking,
    });
  }
});

//create a booking for a spot based on spot id

router.post("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const user = req.user;
  const id = req.params.spotId;
  const { startDate, endDate } = req.body;

  const convertDates = (date) => {
    date = date.toISOString();
    const strDate = date.split("T")[0];

    const [year, month, day] = strDate.split("-");
    const monthIndex = month - 1;
    const dateObj = new Date(year, monthIndex, day);
    return dateObj;
  };

  const spot = await Spot.findByPk(id);
  const groupedErr = {};
  groupedErr.errors = [];

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.message = "Spot couldn't be found";
    err.title = "No spot found";
    groupedErr.errors.push("Spot couldn't be found");

    return next(err);
  }

  const allBookings = await Booking.findAll();

  if (user.id === spot.ownerId) {
    const err = new Error("Spot cannot belong to current user");
    err.status = 404;
    err.title = "Invalid user action";
    return next(err);
  }

  if (endDate <= startDate) {
    const err = new Error("Check-out cannot be on or before Check-in");
    err.status = 400;
    err.title = "Validation error";
    groupedErr.errors.push("Check-out cannot be on or before Check-in");
    return next(err);
  }

  const currBuild = await Booking.build({
    startDate,
    endDate,
    spotId: parseInt(spot.id),
    userId: user.id,
  });

  if (allBookings.length) {
    const conflictingDates = [];

    for (let i = 0; i < allBookings.length; i++) {
      const bookingStartDateObj = convertDates(allBookings[i].startDate);
      const bookingEndDateObj = convertDates(allBookings[i].endDate);
      const startDateObj = convertDates(currBuild.startDate);
      const endDateObj = convertDates(currBuild.endDate);

      if (
        startDateObj.getTime() >= bookingStartDateObj.getTime() &&
        startDateObj.getTime() <= bookingEndDateObj.getTime()
      ) {
        conflictingDates.push("Start date conflicts with an existing booking");
        break;
      } else if (
        endDateObj.getTime() >= bookingStartDateObj.getTime() &&
        endDateObj.getTime() <= bookingEndDateObj.getTime()
      ) {
        conflictingDates.push("End date conflicts with an existing booking");
        break;
      } else if (
        (startDateObj.getTime() <= bookingStartDateObj.getTime() &&
          endDateObj.getTime() >= bookingStartDateObj.getTime()) ||
        (startDateObj.getTime() <= bookingEndDateObj.getTime() &&
          endDateObj.getTime() >= bookingEndDateObj.getTime())
      ) {
        conflictingDates.push(
          "Booking dates conflict with an existing booking"
        );
        break;
      }
    }

    if (conflictingDates.length > 0) {
      const err = new Error(
        "Sorry this spot is already booked for the specified dates"
      );
      err.status = 403;
      err.title = "Spot unavailable";
      err.message = "Sorry this spot is already booked for the specified dates";
      err.errors = conflictingDates;
      return next(err);
    }
  }

  await currBuild.save();

  return res.json(currBuild);
});

module.exports = router;
