// class definition for the body class (for wanzer bodies).

function Body(name, cost, weight, hp_pattern, skill, power, def_c_per_upgrade, num_def_c_upgrades=0)
{
    MachinePart.call(this, name, cost, weight, hp_pattern, skill);
    this.power = power;
    this.def_c_per_upgrade = def_c_per_upgrade;
    this.num_def_c_upgrades = num_def_c_upgrades;
    this.hp_upgrade_costs = [240, 360, 530, 1020, 1320, 1240, 1600, 2010]
    this.def_c_upgrade_costs = [0, 240, 600, 1080, 1680]
}

Body.prototype = Object.create(MachinePart.prototype);
Body.prototype.constructor = Body;

Body.prototype.def_c = function()
{
    return this.def_c_per_upgrade * this.num_def_c_upgrades;
}

Body.prototype.setHP = function(num_hp_upgrades)
{
    this.num_hp_upgrades = Math.min(7, Math.max(0, num_hp_upgrades));

    this.cost = this.hp_upgrade_costs[this.num_hp_upgrades] +
        this.def_c_upgrade_costs[this.num_def_c_upgrades];
}

Body.prototype.setDefC = function(num_def_c_upgrades)
{
        this.num_def_c_upgrades = Math.min(4, Math.max(0, num_def_c_upgrades));

        this.cost = this.hp_upgrade_costs[this.num_hp_upgrades] +
            this.def_c_upgrade_costs[this.num_def_c_upgrades];
}