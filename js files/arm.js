// class definition for the arm class (for wanzer arms).

function Arm(name, cost, weight, hp_pattern, skill, acc_pattern, num_acc_upgrades = 0){
    MachinePart.call(name, cost, weight, hp_pattern, skill);
    this.acc_pattern = acc_pattern;
    this.num_acc_upgrades = num_acc_upgrades;
}

Arm.prototype = Object.create(MachinePart.prototype);
Arm.prototype.constructor = Arm;

Arm.prototype.acc = function(){return this.acc_pattern[this.num_acc_upgrades]}

MachinePart.prototype.incrementAcc = function()
{
    if this.num_acc_upgrades < this.acc_pattern.length - 1
    {
        this.num_acc_upgrades++;
    }
}

MachinePart.prototype.decrementAcc = function()
{
    if this.num_acc_upgrades > 0
    {
        this.num_acc_upgrades--;
    }
}