// class definition for the legs class (for wanzer legs).

function Legs(name, cost, weight, hp, skill, evade_level_1, boost_pattern, dash_pattern, move, numLegs,
              num_evade_upgrades=0, num_bd_upgrades=0)
{
    MachinePart.call(this, name, cost, weight, hp, skill);

    this.evade_pattern = [0, 1.0, 2.4, 4.0, 5.9]
    this.evade_level_1 = evade_level_1;
    this.num_evade_upgrades = num_evade_upgrades;

    this.boost_pattern = boost_pattern;
    this.dash_pattern = dash_pattern;
    this.num_bd_upgrades = num_bd_upgrades;

    this.move = move;
    let leg_pattern = ["Hover", "2 Legs", "4 Legs"]
    if(parseInt(numLegs) != NaN)
    {
        this.numLegs = leg_pattern[numLegs/2];
    }
    else
    {
        this.numLegs = numLegs;
    }
    this.hp_upgrade_costs = [320, 400, 520, 670, 850, 1060, 1300, 1580]
    this.edb_upgrade_costs = [0, 160, 400, 720, 1120]
}

Legs.prototype = Object.create(MachinePart.prototype);
Legs.prototype.constructor = Legs;


Legs.prototype.evade = function()
{
    return Math.round(this.evade_pattern[this.num_evade_upgrades] * this.evade_level_1);
}

Legs.prototype.boost = function()
{
    return this.boost_pattern[this.num_bd_upgrades];
}

Legs.prototype.dash = function()
{
    return this.dash_pattern[this.num_bd_upgrades];
}

Legs.prototype.setHP = function(num_hp_upgrades)
{
    this.num_hp_upgrades = Math.min(7, Math.max(0, num_hp_upgrades));

    this.cost = this.hp_upgrade_costs[this.num_hp_upgrades] +
        this.edb_upgrade_costs[this.num_evade_upgrades] +
        this.edb_upgrade_costs[this.num_bd_upgrades];
}

Legs.prototype.setEvade = function(num_evade_upgrades)
{
        this.num_evade_upgrades = Math.min(4, Math.max(0, num_evade_upgrades));

        this.cost = this.hp_upgrade_costs[this.num_hp_upgrades] +
            this.edb_upgrade_costs[this.num_evade_upgrades] +
            this.edb_upgrade_costs[this.num_bd_upgrades];
}

Legs.prototype.setBD = function(num_bd_upgrades)
{
        this.num_bd_upgrades = Math.min(4, Math.max(0, num_bd_upgrades));

        this.cost = this.hp_upgrade_costs[this.num_hp_upgrades] +
            this.edb_upgrade_costs[this.num_evade_upgrades] +
            this.edb_upgrade_costs[this.num_bd_upgrades];
}