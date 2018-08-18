// class definition for the arm class (for wanzer arms).

function Arm(name, cost, weight, hp, skill, acc){
    MachinePart.call(name, cost, weight, hp, skill);
    this.acc = acc;
}

Arm.prototype = Object.create(MachinePart.prototype);
Arm.prototype.constructor = Arm;