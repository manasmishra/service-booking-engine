const moment = require("moment");

class Vehicle {
  constructor(VIN, make = null, model = null, user = null, slotPath) {
    this.VIN = VIN;
    this.make = make;
    this.model = model;
    this.user = user;
    this.slotPath = slotPath;
  }

  getVehicle() {
    return this.VIN;
  }

  // deleteVehicle() {
  //   this.make = null;
  //   this.model = null;
  //   this.user = null;
  //   this.slot = null;
  //   delete this.color;
  //   delete this.slot;
  // }
}

const vehicleDb = {};

const vehicleModel = {
  createVehicle: async function createVehicle(
    VIN,
    make = null,
    model = null,
    user = null,
    slotPath
  ) {
    const vehicleByVin = vehicleDb[VIN];
    if (vehicleByVin) {
      vehicleByVin.slotPath = slotPath;
      return vehicleByVin;
    }
    vehicleDb[VIN] = new Vehicle(VIN, make, model, user, slotPath);
    return vehicleDb[VIN];
  },
  getVehicleByVin: async function getVehicleByVin(VIN) {
    const vehicle = vehicleDb[VIN];
    if (vehicle) {
      // eslint-disable-next-line no-unused-vars
      const [YYYY, MM, DD, mNo, slotTime] = vehicle.slotPath.split(".");
      vehicle.slotTime = moment(
        `${YYYY}/${MM}/${DD} ${slotTime}`,
        "YYYY/MM/DD HH:mm"
      ).format();
    }
    return vehicle;
  },
};

// Disallow new properties on our object
Object.freeze(vehicleModel);

module.exports = {
  vehicleModel,
};
