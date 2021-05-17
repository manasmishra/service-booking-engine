class mechanic {
  constructor(id, assigned, name) {
    this.id = id;
    this.assigned = assigned || false;
    this.name = name;
  }
}

const mechanicsFactory = (function () {
  const mechanics = {};
  return {
    createMechanics: function (noOfMechanics) {
      if (noOfMechanics > Object.keys(mechanics).length) {
        for (let i = 1; i <= noOfMechanics; i++) {
          const obj = new mechanic(i, false);
          mechanics[i] = obj;
        }
      }
      return mechanics;
    },
    getFreeMechanics: function () {
      const freeMechanics = [];
      for (const mechanicId in mechanics) {
        if (Object.hasOwnProperty.call(mechanics, mechanicId)) {
          const mechanic = mechanics[mechanicId];
          if (!mechanic.assigned) {
            freeMechanics.push(mechanic);  
          }
        }
      }
      return freeMechanics;
    }
  }
})()

module.exports = {
  mechanicsFactory
}