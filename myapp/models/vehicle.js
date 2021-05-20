class Vehicle {
  constructor(vehicleVIN, make = null, model = null, slot = null) {
    this.vehicleVIN = vehicleVIN;
    this.make = make;
    this.model = model;
    this.slot = slot;
  }

  getVehicle() {
    return this.vehicleVIN;
  }

  deleteVehicle() {
    this.make = null;
    this.model = null;
    this.slot = null;
    this.vehicleVIN = null;
    delete this.make;
    delete this.model;
    delete this.slot;
  }
}

module.exports = {
  Vehicle,
};
