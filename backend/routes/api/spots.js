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
} = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

const router = express.Router();

const allSpotsValidation = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required")
    .isLength({ min: 0 })
    .isLength({ max: 256 })
    .withMessage("Address provided must be less than 256 characters"),
  check("city")
    .exists({ checkFalsy: true })
    .withMessage("City is required")
    .isLength({ min: 0 })
    .isLength({ max: 100 })
    .withMessage("City name must be less than 100 characters"),
  check("state")
    .exists({ checkFalsy: true })
    .withMessage("State is required")
    .isLength({ min: 0 })
    .isLength({ max: 100 })
    .withMessage("State name must be less than 100 characters"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required")
    .isLength({ min: 0 })
    .isLength({ max: 100 })
    .withMessage("Country name must be less than 100 characters"),
  check("lat")
    .exists({ checkFalsy: true })
    .withMessage("Latitude is not valid")
    .isLength({ min: 0 })
    .isLength({ max: 100 })
    .withMessage("Latitude must be less than 100 characters"),
  check("lng")
    .exists({ checkFalsy: true })
    .withMessage("Longitude is not valid")
    .isLength({ min: 0 })
    .isLength({ max: 100 })
    .withMessage("Longitude must be less than 100 characters"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

//get all spots
router.get("/", async (req, res) => {
  const allSpots = await Spot.findAll({
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
  allSpots.forEach((spot) => {
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

    delete spot.Reviews;
    delete spot.SpotImages;
    Spots.push(spot);
  });

  return res.json({
    Spots,
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
    sum += rev.stars;
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

//

module.exports = router;
