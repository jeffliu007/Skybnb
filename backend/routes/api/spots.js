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
const { TimeoutError } = require("sequelize");
const user = require("../../db/models/user");

const router = express.Router();

//get all spots
router.get("/", async (req, res) => {
  const allSpots = await Spot.findAll({
    attributes: [
      "id",
      "ownerId",
      "address",
      "city",
      "state",
      "country",
      "lat",
      "lng",
      "name",
      "description",
      "price",
      "createdAt",
      "updatedAt",
      [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
      [sequelize.col("url"), "previewImage"],
    ],
    include: [
      {
        model: Review,
        attributes: [],
        required: true,
      },
      {
        model: SpotImage,
        attributes: [],
        required: true,
      },
    ],
    group: ["Spot.Id"],
  });
  return res.json({
    Spots: allSpots,
  });
});

//get spots owned by current User

router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;

  const usersSpots = await Spot.findAll({
    where: {
      ownerId: user.id,
    },
  });

  const arrOfSpots = [];

  for (let i = 0; i < usersSpots.length; i++) {
    let spot = usersSpots[i];

    const review = await spot.getReviews({
      attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
    });
    spot = spot.toJSON();
    spot.avgRating = review[0].dataValues.avgRating;
    const previewImage = await SpotImage.findOne({
      where: {
        preview: true,
        spotId: spot.id,
      },
    });

    if (previewImage) {
      spot.previewImage = previewImage.toJSON().url;
    } else {
      spot.previewImage = "Preview image currently does not exist";
    }
    arrOfSpots.push(spot);
    if (arrOfSpots.length === 0) return res.json("You do not have any spots");
  }
  return res.json({
    arrOfSpots,
  });
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

  const avgRev = await Review.findAll({
    attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
  });

  const specificSpot = spot.toJSON();

  specificSpot.avgStarRating = avgRev[0].dataValues.avgRating;
  specificSpot.numReviews = specificSpot.Reviews.length;
  specificSpot.Owner = specificSpot.User;
  //remove the tables we edited
  delete specificSpot.User;
  delete specificSpot.Reviews;

  res.json(specificSpot);
  // const reviewNum = await Review.count({
  //   where: {
  //     spotId: id,
  //   },
  // });
  // // console.log(reviewNum);

  // const specificSpot = await Spot.findOne({
  //   where: {
  //     id: id,
  //   },
  //   attributes: [
  //     "id",
  //     "ownerId",
  //     "address",
  //     "city",
  //     "state",
  //     "country",
  //     "lat",
  //     "lng",
  //     "name",
  //     "description",
  //     "price",
  //     "createdAt",
  //     "updatedAt",
  //     [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
  //     [sequelize.col("url"), "previewImage"],
  //   ],
  //   include: [
  //     {
  //       model: Review,
  //       attributes: [],
  //       required: true,
  //     },
  //     {
  //       model: SpotImage,
  //       attributes: [],
  //       required: true,
  //     },
  //   ],
  // });
  // return res.json(specificSpot);
});

//continue on creating a spot tomorrow

module.exports = router;
