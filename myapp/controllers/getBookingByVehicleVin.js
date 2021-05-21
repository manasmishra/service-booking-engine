const { vehicleModel } = require("../models/vehicle");

exports.getBookingByVehicleVin = async function getBookingByVehicleVin(
  req,
  res
) {
  const { vin } = req.params;
  const bookings = await vehicleModel.getVehicleByVin(vin);
  if (bookings) {
    return res.json({
      bookings,
    });
  }
  return res.status(400).json({
    err: {
      message: "NO Bookings found for the vehicle",
    },
  });
};
