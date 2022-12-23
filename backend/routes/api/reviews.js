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
  return res.json({
    Reviews: allRevs,
  });
});

//add image to review based on rev id

router.post("/:reviewId/images", requireAuth, async (req, res, next) => {
  const { user } = req;
  const id = req.params.reviewId;
  const { url } = req.body;

  const usersRev = await Review.findOne({
    where: {
      id,
    },
    include: [
      {
        model: ReviewImage,
        attributes: {
          exclude: ["reviewId", "createdAt", "updatedAt"],
        },
      },
    ],
  });

  if (!usersRev) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    err.message = "No reviews yet";
    return next(err);
  }

  if (user.id !== usersRev.userId) {
    const err = new Error("Unauthorized user");
    err.status = 404;
    err.message = "Unauthorized user";
    return next(err);
  }

  usersRev.ReviewImages.forEach((rev) => {
    if (url === rev.dataValues.url) {
      const err = new Error(
        "This url/image already exists, please choose a different url"
      );
      err.status = 403;
      err.message = "Chosen Url already exists";
      return next(err);
    }
  });

  if (usersRev.ReviewImages.length > 10) {
    const err = new Error(
      "Maximum number of images for this resource was reached"
    );
    err.status = 403;
    err.message = "Maximum number of images for this resource was reached";
    return next(err);
  }

  let newReviewImg = await ReviewImage.create({
    url,
    reviewId: id,
  });

  newReviewImg = newReviewImg.toJSON();

  delete newReviewImg.reviewId;
  delete newReviewImg.createdAt;
  delete newReviewImg.updatedAt;

  return res.json(newReviewImg);
});

//edit a review
router.put(
  "/:reviewId",
  requireAuth,
  allReviewsValidation,

  async (req, res, next) => {
    const { user } = req;
    const id = req.params.reviewId;
    const { review, stars } = req.body;

    const revId = await Review.findByPk(id);

    if (!revId) {
      const err = new Error("Review couldn't be found");
      err.status = 404;
      err.message = "Review couldn't be found";
      return next(err);
    }
    if (user.id !== revId.userId) {
      const err = new Error("Unauthorized user");
      err.status = 404;
      err.message = "Unauthorized user";
      return next(err);
    }

    revId.set({
      review,
      stars,
      updatedAt: new Date(),
    });

    await revId.save();

    return res.json(revId);
  }
);

module.exports = router;
