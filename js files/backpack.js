// class definition for backpack class.

function Backpack(name, cost, weight, bpType){
    EquippableItem.call(name, cost, weight);
    this.bpType;
}

Backpack.prototype = Object.create(EquippableItem.prototype);
Backpack.prototype.constructor = Backpack;