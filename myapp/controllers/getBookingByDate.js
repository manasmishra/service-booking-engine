const moment = require("moment");
const { model } = require("../models/createCapacity");

exports.getBookingByDate = async function (req, res) {
  const { date } = req.params;
  const dateMoment = moment(date, "YYYY-MM-DD");
  if (dateMoment.isValid()) {
    const bookings = await model.getBookingsByDate(dateMoment);
    return res.json({
      bookings,
    });
  }
  return res.status(400).json({
    err: {
      message: "Please give a valid date in YYYY-MM-DD format",
    },
  });
};
