const express = require("express");
const { setTokenCookie, restoreUser } = require("../../utils/auth");

const { Spot, SpotImage, Review, sequelize } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

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
    group: ["spot.Id"],
  });
  return res.json({
    Spots: allSpots,
  });
});

module.exports = router;
