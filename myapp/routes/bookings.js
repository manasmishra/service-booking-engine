const express = require("express");

const router = express.Router();

const {
  Validator,
  ValidationError,
} = require("express-json-validator-middleware");
const { mechanicsFactory } = require("../models/createCapacity");
const { createBooking } = require("../controllers/createBooking");

const { createBookingSchema } = require("../schemas/createBooking");

const { validate } = new Validator();

function validationErrorMiddleware(error, request, response, next) {
  if (response.headersSent) {
    return next(error);
  }

  const isValidationError = error instanceof ValidationError;
  if (!isValidationError) {
    return next(error);
  }

  response.status(400).json({
    errors: error.validationErrors,
  });

  return next();
}
router.use(validationErrorMiddleware);

/* GET users listing. */
router.post("/", validate({ body: createBookingSchema }), createBooking);

router.get("/", function (req, res) {
  const capacity = mechanicsFactory.getFreeMechanics();
  res.json({
    capacity,
  });
});

module.exports = router;
