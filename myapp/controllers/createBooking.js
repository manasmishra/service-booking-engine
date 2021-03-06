const moment = require("moment");
const { model } = require("../models/createCapacity");

exports.createBooking = async function createBooking(req, res) {
  const capacity = await model.getCapacity();
  if (!capacity) {
    return res.status(412).json({
      error: `Please first create capacity then only booking will be accepted`,
    });
  }
  const { vehicle } = req.body;
  const { user } = req.body;
  const bookingDateTime = moment(req.body.bookingDateTime, "YYYY/MM/DD HH:mm");
  const bookingDateTimeEnd = moment(
    req.body.bookingDateTime,
    "YYYY/MM/DD HH:mm"
  ).add(2, "hours");
  if (!bookingDateTime.isValid()) {
    return res.status(400).json({
      error: `Invalid date passed. Pleae pass Date and time in format DD/MM/YYYY HH:mm`,
    });
  }
  const bookingDate = moment(req.body.bookingDateTime, "YYYY/MM/DD").format(
    "YYYY/MM/DD"
  );
  const dayStartTimeMoment = moment(`${bookingDate} 09:00`, "YYYY/MM/DD HH:mm");
  const dayEndTimeMoment = moment(`${bookingDate} 17:00`, "YYYY/MM/DD HH:mm");
  if (
    bookingDateTime.isBefore(dayStartTimeMoment) ||
    bookingDateTimeEnd.isAfter(dayEndTimeMoment)
  ) {
    return res.status(400).json({
      error: `Booking Time is outside working hours. Please book a slot in between 09:00-17:00`,
    });
  }
  const date = bookingDateTime.format("YYYY/MM/DD HH:mm");
  const isBooked = await model.bookSlot(vehicle, user, date);
  return isBooked
    ? res.json({ message: "Sucessfully booked for the asked slot" })
    : res.json({ message: "No slots available for the requested time slot" });
};
