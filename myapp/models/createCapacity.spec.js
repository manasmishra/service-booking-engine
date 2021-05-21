const moment = require("moment");
const { model } = require("./createCapacity");

describe("Booking Engine database", () => {
  describe("Create Capacity", () => {
    it("Should set default capacity when no capacity is passed:", async () => {
      const capacity = await model.setCapacity();
      expect(capacity).toBe(2);
    });
    it("Should set capacity to the default capacity if passed capacity is less than default:", async () => {
      const capacity = await model.setCapacity(1);
      expect(capacity).toBe(2);
    });
    it("Should set capacity to the passed capacity if its greater than default:", async () => {
      const capacity = await model.setCapacity(5);
      expect(capacity).toBe(5);
    });
  });
  describe("get Capacity", () => {
    it("Should return last set capacity:", async () => {
      const capacity = await model.getCapacity();
      expect(capacity).toBe(5);
    });
  });
  describe("Reset capacity to default", () => {
    it("Should reset the capacity:", async () => {
      const capacity = await model.resetCapacityToDefault();
      expect(capacity).toBe(2);
    });
  });
  describe("get DB", () => {
    it("Should return blank db when nothing is created:", async () => {
      const db = await model.getDB();
      expect(db).toStrictEqual({});
    });
  });
});

describe("Book Slot", () => {
  it("When db is blank will create a slot if its within time range:", async () => {
    await model.resetCapacityToDefault();
    const isBooked = await model.bookSlot(
      { VIN: "134q4iq3rjqefkjnw", make: "HONDA", model: "CITY" },
      { name: "manas", age: "32", ph: "9861965513" },
      "2021/05/20 12:00"
    );
    expect(isBooked).toBe(true);
  });
  it("When db is blank will create a slot if its within time range:", async () => {
    const isBooked = await model.bookSlot(
      { VIN: "134q4iq3rjqefkjnw", make: "HONDA", model: "CITY" },
      { name: "manas", age: "32", ph: "9861965513" },
      "2021/05/20 12:00"
    );
    expect(isBooked).toBe(true);
  });
  it("When db is blank will create a slot if its within time range:", async () => {
    const isBooked = await model.bookSlot(
      { VIN: "134q4iq3rjqefkjnw", make: "HONDA", model: "CITY" },
      { name: "manas", age: "32", ph: "9861965513" },
      "2021/05/20 12:00"
    );
    expect(isBooked).toBe(false);
  });
  it("Should not book if the given date time is not before or after 2hr of any of slots present in DB:", async () => {
    const isBooked = await model.bookSlot(
      { VIN: "134q4iq3rjqefkjnw", make: "HONDA", model: "CITY" },
      { name: "manas", age: "32", ph: "9861965513" },
      "2021/05/20 11:00"
    );
    expect(isBooked).toBe(false);
  });
  it("Should not book if the given date time is not before or after 2hr of any of slots present in DB:", async () => {
    const isBooked = await model.bookSlot(
      { VIN: "134q4iq3rjqefkjnw", make: "HONDA", model: "CITY" },
      { name: "manas", age: "32", ph: "9861965513" },
      "2021/05/20 10:00"
    );
    expect(isBooked).toBe(true);
  });
  it("Should not book if the given date time is not before or after 2hr of any of slots present in DB:", async () => {
    const isBooked = await model.bookSlot(
      { VIN: "134q4iq3rjqefkjnw", make: "HONDA", model: "CITY" },
      { name: "manas", age: "32", ph: "9861965513" },
      "2021/05/20 14:00"
    );
    expect(isBooked).toBe(true);
  });
  it("Should not book if the booking is beyond working hours:", async () => {
    const isBooked = await model.bookSlot(
      { VIN: "134q4iq3rjqefkjnw", make: "HONDA", model: "CITY" },
      { name: "manas", age: "32", ph: "9861965513" },
      "2021/05/20 16:00"
    );
    expect(isBooked).toBe(false);
  });
  it("Should not book if the booking is before working hours:", async () => {
    const isBooked = await model.bookSlot(
      { VIN: "134q4iq3rjqefkjnw", make: "HONDA", model: "CITY" },
      { name: "manas", age: "32", ph: "9861965513" },
      "2021/05/20 08:59"
    );
    expect(isBooked).toBe(false);
  });
});

describe("Get Booked slots by date", () => {
  it("Get all the bookins made for a day", async () => {
    const dateMoment = moment("2021-05-20", "YYYY-MM-DD");
    const bookings = await model.getBookingsByDate(dateMoment);
    expect(bookings).toStrictEqual({
      1: [
        {
          "12:0": {
            vehicle: { VIN: "134q4iq3rjqefkjnw", make: "HONDA", model: "CITY" },
            user: { name: "manas", age: "32", ph: "9861965513" },
            slotTime: "12:0",
          },
        },
        {
          "10:0": {
            slotTime: "10:0",
            vehicle: { VIN: "134q4iq3rjqefkjnw", make: "HONDA", model: "CITY" },
            user: { name: "manas", age: "32", ph: "9861965513" },
          },
        },
        {
          "14:0": {
            slotTime: "14:0",
            vehicle: { VIN: "134q4iq3rjqefkjnw", make: "HONDA", model: "CITY" },
            user: { name: "manas", age: "32", ph: "9861965513" },
          },
        },
      ],
      2: [
        {
          "12:0": {
            vehicle: { VIN: "134q4iq3rjqefkjnw", make: "HONDA", model: "CITY" },
            user: { name: "manas", age: "32", ph: "9861965513" },
            slotTime: "12:0",
          },
        },
      ],
    });
  });
});
