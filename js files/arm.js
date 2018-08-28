// class definition for the arm class (for wanzer arms).

function Arm(name, cost, weight, hp_pattern, skill, acc_pattern,
    num_acc_upgrades = 0)
{
    MachinePart.call(this, name, cost, weight, hp_pattern, skill);
    this.acc_pattern = acc_pattern;
    this.num_acc_upgrades = num_acc_upgrades;
    this.hp_upgrade_costs = [100, 150, 220, 310, 420, 550, 700, 870]
    this.acc_upgrade_costs = [0, 100, 250, 450, 700]
}

Arm.prototype = Object.create(MachinePart.prototype);
Arm.prototype.constructor = Arm;

Arm.prototype.acc = function()
{
    return this.acc_pattern[this.num_acc_upgrades];
}

Arm.prototype.setHP = function(num_hp_upgrades)
{
    this.num_hp_upgrades = Math.min(7, Math.max(0, num_hp_upgrades));

    this.cost = this.hp_upgrade_costs[this.num_hp_upgrades] +
        this.acc_upgrade_costs[this.num_acc_upgrades];
}

Arm.prototype.setAcc = function(num_acc_upgrades)
{
    this.num_acc_upgrades = Math.min(4, Math.max(0, num_acc_upgrades));

    this.cost = this.hp_upgrade_costs[this.num_hp_upgrades] +
        this.acc_upgrade_costs[this.num_acc_upgrades];
}