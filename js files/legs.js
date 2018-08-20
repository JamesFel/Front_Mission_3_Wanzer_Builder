// class definition for the legs class (for wanzer legs).

function Legs(name, cost, weight, hp, skill, evade_level_1, boost_pattern, dash_pattern, move, numLegs,
              num_evade_upgrades=0, num_bd_upgrades=0)
{
    MachinePart.call(this, name, cost, weight, hp, skill);

    this.evade_pattern = [1.0, 2.4, 4.0, 5.9]
    this.evade_level_1 = evade_level_1;
    this.num_evade_upgrades = num_evade_upgrades;

    this.boost_pattern = boost_pattern;
    this.dash_pattern = dash_pattern;
    this.num_bd_upgrades = num_bd_upgrades;

    this.move = move;
    this.numLegs = numLegs;
    this.hp_upgrade_costs = [100, 80, 120, 150, 180, 210, 240, 280]
    this.edb_upgrade_costs = [0, 160, 240, 320, 400]
}

Legs.prototype = Object.create(MachinePart.prototype);
Legs.prototype.constructor = Legs;

Legs.prototype.evade = function(){return round(this.evade_pattern[this.num_evade_upgrades] * this.evade_level_1);}
Legs.prototype.boost = function(){return this.boost_pattern[this.num_bd_upgrades];}
Legs.prototype.dash = function(){return this.dash_pattern[this.num_bd_upgrades];}

Legs.prototype.upgradeHP()
{
    if(this.incrementHP)
    {
        this.adjustCost(this.hp_upgrade_costs[this.num_hp_upgrades])
    }
}
Legs.prototype.downgradeHP()
{
   if(this.decrementHP)
   {
      this.adjustCost(-1 * this.hp_upgrade_costs[this.num_hp_upgrades + 1])
   }
}

Legs.prototype.incrementEv = function()
{
    if (this.num_evade_upgrades < this.evade_pattern.length - 1)
    {
        this.num_evade_upgrades++;
        this.adjustCost(this.edb_upgrade_costs[this.num_evade_upgrades]);
    }
}

Legs.prototype.decrementEv = function()
{
    if (this.num_evade_upgrades > 0)
    {
        this.num_evade_upgrades--;
        this.adjustCost(-1 * this.edb_upgrade_costs[this.num_evade_upgrades +1]);
    }
}

Legs.prototype.incrementBD = function()
{
    if (this.num_bd_upgrades < this.boost_pattern.length - 1)
    {
        this.num_bd_upgrades++;
        this.adjustCost(this.edb_upgrade_costs[this.num_bd_upgrades]);
    }
}

Legs.prototype.decrementBD = function()
{
    if (this.num_bd_upgrades > 0)
    {
        this.num_bd_upgrades--;
        this.adjustCost(this.edb_upgrade_costs[-1 * this.num_bd_upgrades + 1]);
    }
}