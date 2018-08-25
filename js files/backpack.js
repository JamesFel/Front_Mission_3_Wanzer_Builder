// class definition for backpack class.

function Backpack(name, cost, weight, bpType)
{
    EquippableItem.call(this, name, cost, weight);
    this.bpType = bpType;
}

Backpack.prototype = Object.create(EquippableItem.prototype);
Backpack.prototype.constructor = Backpack;