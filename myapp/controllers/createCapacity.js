const { CAPACITY_PER_SLOT } = require("../constants");
const { model } = require("../models/createCapacity");

exports.createCapacity = async function createCapacity(req, res) {
  const capacity = await model.setCapacity(
    req.body.noOfMechanics || CAPACITY_PER_SLOT
  );
  res.json({
    capacity,
  });
};
