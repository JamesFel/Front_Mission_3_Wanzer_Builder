// class definition for the body class (for wanzer bodies).

function Body(name, cost, weight, hp_pattern, skill, power, def_c_per_upgrade, num_def_c_upgrades=0)
{
    MachinePart.call(this, name, cost, weight, hp_pattern, skill);
    this.power = power;
    this.def_c_per_upgrade = def_c_per_upgrade;
    this.num_def_c_upgrades = num_def_c_upgrades;
    this.hp_upgrade_costs = [240, 120, 170, 220, 270, 320, 360, 410]
    this.def_c_upgrade_costs = [0, 240, 360, 480, 600]
}

Body.prototype = Object.create(MachinePart.prototype);
Body.prototype.constructor = Body;

Body.prototype.def_c = function()
{
    return this.def_c_per_upgrade * this.num_def_c_upgrades;
}

Body.prototype.upgradeHP = function()
{
    if(this.incrementHP())
    {
        this.adjustCost(this.hp_upgrade_costs[this.num_hp_upgrades])
    }
}
Body.prototype.downgradeHP = function()
{
   if(this.decrementHP())
   {
      this.adjustCost(-1 * this.hp_upgrade_costs[this.num_hp_upgrades + 1])
   }
}

Body.prototype.incrementDefC = function()
{
    if (this.num_def_c_upgrades < 4)
    {
        this.num_def_c_upgrades++;
        this.adjustCost(this.def_c_upgrade_costs[this.num_def_c_upgrades]);
    }
}

Body.prototype.decrementHP = function()
{
    if (this.num_hp_upgrades > 0)
    {
        this.num_hp_upgrades--;
        this.adjustCost(-1 * this.def_c_upgrade_costs[this.num_def_c_upgrades + 1]);
    }
}