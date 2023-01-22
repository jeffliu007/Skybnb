const { validationResult, check } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => `${error.msg}`);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

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
    .isLength({ min: 0 })
    .isLength({ max: 1500 })
    .withMessage("Description must be shorter than 1500"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

const allReviewsValidation = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .isInt({
      min: 1,
      max: 5,
    })
    .withMessage(": Please select a star from 1-5 below"),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  allSpotsValidation,
  allReviewsValidation,
};
