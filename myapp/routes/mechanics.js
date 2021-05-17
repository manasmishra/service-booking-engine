var express = require('express');
var router = express.Router();
const {
	Validator,
	ValidationError,
} = require("express-json-validator-middleware");
const {
	CAPACITY_PER_SLOT
} = require("../constants");
const { mechanicsFactory } = require("../models/createCapacity");

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

	next();
}
const capacitySchema = {
	type: "object",
	properties: {
		noOfMechanics: {
			type: "integer",
			minimum: 2,
		},
		mechanics: {
			type: "array",
			items: {
				type: "object",
				properties: {
					name: {
						type: "string",
						minLength: 1
					}
				}
			}
		},
	},
};
router.use(validationErrorMiddleware);

/* GET users listing. */
router.post('/', validate({ body: capacitySchema }), function(req, res, next) {
	const capacity = mechanicsFactory.createMechanics(req.body.noOfMechanics || CAPACITY_PER_SLOT);
	console.log("noOfMechanics:", capacity);
  res.json(capacity);
});

router.get('/', function(req, res, next) {
	const capacity = mechanicsFactory.getFreeMechanics();
	res.json({
		capacity
	});
});

module.exports = router;
