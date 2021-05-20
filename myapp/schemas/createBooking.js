exports.createBookingSchema = {
  type: "object",
  required: ["vehicle", "user", "bookingDateTime"],
  properties: {
    vehicle: {
      type: "object",
      required: ["VIN"],
      properties: {
        VIN: {
          type: "string",
          minLength: 17,
        },
        make: {
          type: "string",
          minLength: 1,
        },
        model: {
          type: "string",
          minLength: 1,
        },
      },
    },
    user: {
      type: "object",
      required: ["phoneNumber"],
      properties: {
        name: {
          type: "string",
          minLength: 1,
        },
        email: {
          type: "string",
          format: "email",
        },
        phoneNumber: {
          type: "number",
          minLength: 10,
        },
      },
    },
    bookingDateTime: {
      type: "string",
    },
  },
};
