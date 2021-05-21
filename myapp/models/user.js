class User {
  constructor(name, email = null, phoneNumber = null) {
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }

  getVehicle() {
    return this.name;
  }

  // deleteVehicle() {
  //   this.make = null;
  //   this.model = null;
  //   this.user = null;
  //   this.slot = null;
  //   delete this.email;
  //   delete this.slot;
  // }
}

module.exports = {
  User,
};
