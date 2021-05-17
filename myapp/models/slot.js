class SlotNode {
  constructor(parkingNo, vehicle = null, color = null) {
    this.slotNo = parkingNo;
    this.vehicle = vehicle;
    this.color = color
  }
  addDetails(vehicle = null, color = null) {
    this.vehicle = vehicle
    this.color = color
  }
  getSlot(){
    return this.slotNo;
  }
  deleteDetails() {
    this.slotNo = null;
    this.vehicle = null;
    this.color = null;
    delete this.vehicle;
    delete this.color;
  }
}
class SlotFactory {
  constructor() {
    this.slots = []
  }
  createSlot(slotNo, vehicle = null, color = null) {
    let slot = this.getSlot(slotNo);
    if(slot) {
      return slot;
    } else {
      const newSlot = new SlotNode(slotNo, vehicle, color);
      this.slots.push(newSlot)
      return newSlot
    }
  }
  getSlot(slotNo) {
    return this.slots.find(slot => slot.slotNo === slotNo)
  }
}

module.exports = {
  SlotNode,
  SlotFactory
}