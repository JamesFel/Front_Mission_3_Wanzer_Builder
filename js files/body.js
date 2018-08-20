// class definition for the body class (for wanzer bodies).

function Body(name, cost, weight, hp_pattern, skill, power, def_c_per_upgrade, num_def_c_upgrades=0){
    MachinePart.call(name, cost, weight, hp, skill);
    this.power = power;
    this.def_c_per_upgrade = def_c_per_upgrade;
    this.num_def_c_upgrades = num_def_c_upgrades;
}

Body.prototype = Object.create(MachinePart.prototype);
Body.prototype.constructor = Body;

Body.prototype.def_c = function(){return this.def_c_per_upgrade * this.num_def_c_upgrades}

Body.prototype.incrementDefC = function()
{
    if (this.num_def_c_upgrades < 4)
    {
        this.num_def_c_upgrades++;
    }
}

Body.prototype.decrementHP = function()
{
    if (this.num_hp_upgrades > 0)
    {
        this.num_hp_upgrades--;
    }
}