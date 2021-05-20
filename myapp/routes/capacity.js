const express = require("express");

const router = express.Router();
const { Validator } = require("express-json-validator-middleware");
const { model } = require("../models/createCapacity");

const { validate } = new Validator();
const { validationMiddleWare } = require("../lib/validationMiddleWare");
const { capacitySchema } = require("../schemas/createCapacity");
const { createCapacity } = require("../controllers/createCapacity");

router.use(validationMiddleWare);

router.post("/", validate({ body: capacitySchema }), createCapacity);

router.get("/", async function (req, res) {
  const capacity = await model.getCapacity();
  res.json({
    capacity,
  });
});

module.exports = router;
