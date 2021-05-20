const express = require("express");

const router = express.Router();
const {
  Validator,
  ValidationError,
} = require("express-json-validator-middleware");
const { model } = require("../models/createCapacity");
const { CAPACITY_PER_SLOT } = require("../constants");

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
const capacitySchema = {
  type: "object",
  required: ["noOfMechanics"],
  properties: {
    noOfMechanics: {
      type: "integer",
      minimum: 2,
    },
  },
};
router.use(validationErrorMiddleware);

router.post("/", validate({ body: capacitySchema }), async function (req, res) {
  const capacity = await model.setCapacity(
    req.body.noOfMechanics || CAPACITY_PER_SLOT
  );
  res.json({
    capacity,
  });
});

router.get("/", async function (req, res) {
  const capacity = await model.getCapacity();
  res.json({
    capacity,
  });
});

module.exports = router;
