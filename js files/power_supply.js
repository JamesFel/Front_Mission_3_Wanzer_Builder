// class definition for power supply class.

function PowerSupply(name, cost, weight, bpType, power){
    Backpack.call(name, cost, weight, bpType);
    this.power = power;
}

PowerSupply.prototype = Object.create(Backpack.prototype);
PowerSupply.prototype.constructor = PowerSupply;