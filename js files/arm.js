// class definition for the arm class (for wanzer arms).

function Arm(name, cost, weight, hp_pattern, skill, acc_pattern, num_acc_upgrades = 0)
{
    MachinePart.call(name, cost, weight, hp_pattern, skill);
    this.acc_pattern = acc_pattern;
    this.num_acc_upgrades = num_acc_upgrades;
    this.hp_upgrade_costs = [100, , 50, 70, 90, 110, 130, 150, 170]
    this.acc_upgrade_costs = [0, 100, 150, 200, 250]
}

Arm.prototype = Object.create(MachinePart.prototype);
Arm.prototype.constructor = Arm;

Arm.prototype.acc = function(){return this.acc_pattern[this.num_acc_upgrades];}

Arm.prototype.upgradeHP()
{
    if(this.incrementHP)
    {
        this.adjustCost(this.hp_upgrade_costs[this.num_hp_upgrades])
    }
}
Arm.prototype.downgradeHP()
{
   if(this.decrementHP)
   {
      this.adjustCost(-1 * this.hp_upgrade_costs[this.num_hp_upgrades + 1])
   }
}

MachinePart.prototype.incrementAcc = function()
{
    if (this.num_acc_upgrades < this.acc_pattern.length - 1)
    {
        this.num_acc_upgrades++;
        this.adjustCost(this.acc_upgrade_costs[this.num_acc_upgrades]);
    }
}

MachinePart.prototype.decrementAcc = function()
{
    if (this.num_acc_upgrades > 0)
    {
        this.num_acc_upgrades--;
        this.adjustCost(-1 * this.acc_upgrade_costs[this.num_acc_upgrades + 1]);
    }
}