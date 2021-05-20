exports.capacitySchema = {
  type: "object",
  required: ["noOfMechanics"],
  properties: {
    noOfMechanics: {
      type: "integer",
      minimum: 2,
    },
  },
};
