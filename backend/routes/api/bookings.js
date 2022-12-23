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

module.exports = router;
