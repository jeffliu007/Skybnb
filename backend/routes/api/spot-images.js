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

router.delete("/:imageId", requireAuth, async (req, res, next) => {
  const { user } = req;
  const id = req.params.imageId;

  const deleteImg = await SpotImage.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Spot,
      },
    ],
  });

  if (!deleteImg) {
    const err = new Error("Spot Image couldn't be found");
    err.status = 404;
    err.title = "No image available";
    return next(err);
  }
  if (user.id !== deleteImg.Spot.ownerId) {
    const err = new Error("Unauthorized user");
    err.status = 404;
    err.message = "Unauthorized user";
    return next(err);
  }

  await deleteImg.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
