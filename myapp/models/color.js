class Color {
  constructor(color, vehicle=null, slot=null) {
    this.colorName = color;
    this.vehicles = vehicle ? [vehicle] : []
    this.slots = slot ? [slot] : []
  }
  addDetails(vehicle, slot) {
    this.vehicles.push(vehicle)
    this.slots.push(slot)
  }
  getColor() {
    return this.colorName
  }
  deleteDetails(vehicle, slot) {
    for(let i=0; i< this.vehicles.length; i++) {
      let _vehicle = this.vehicles[i];
      let _slot = this.slots[i];
      // console.log('Inside color deleteDetails _vehicle to be deleted is:', _vehicle, ' vehicle is:', vehicle)
      // console.log('Inside color deleteDetails _slot to be deleted is:', _slot, ' slot is:', slot)
      if(_vehicle.registratioNo === vehicle.registratioNo) {
        _vehicle.deleteVehicle();
        delete this.vehicles[i];
        this.vehicles.splice(i,1)
      }
      if(_slot.slotNo === slot.slotNo) {
        _slot.deleteDetails();
        delete this.slots[i];
        this.slots.splice(i,1)
      }
    }
  }
}
class ColorFactory {
  constructor() {
    this.colors = []
  }
  createColor(colorName, vehicle = null, slot = null) {
    let color = this.getColor(colorName);
    if(color) {
      return color;
    } else {
      const newColor = new Color(colorName, vehicle, slot);
      this.colors.push(newColor)
      return newColor
    }
  }
  getColor(colorName) {
    return this.colors.find(color => color.colorName === colorName)
  }
  
}

module.exports = {
  Color,
  ColorFactory
}