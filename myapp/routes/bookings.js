const express = require("express");

const router = express.Router();

const { Validator } = require("express-json-validator-middleware");
const { createBooking } = require("../controllers/createBooking");
const { getBookingByDate } = require("../controllers/getBookingByDate");
const {
  getBookingByVehicleVin,
} = require("../controllers/getBookingByVehicleVin");

const { createBookingSchema } = require("../schemas/createBooking");
const { validationMiddleWare } = require("../lib/validationMiddleWare");

const { validate } = new Validator();
router.use(validationMiddleWare);

/* GET users listing. */
router.post("/", validate({ body: createBookingSchema }), createBooking);

router.get("/:date", getBookingByDate);
router.get("/vin/:vin", getBookingByVehicleVin);

module.exports = router;
