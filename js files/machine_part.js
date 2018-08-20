// class definition for machine part class.

function MachinePart(name, cost, weight, hp_pattern, skill){
    EquippableItem.call(name, cost, weight);
    this.hp_pattern = hp_upgrade_pattern;
    this.num_hp_upgrades = 0;
    this.skill = skill;
}

MachinePart.prototype = Object.create(EquippableItem.prototype);
MachinePart.prototype.constructor = MachinePart;

MachinePart.prototype.hp = function(){return hp_upgrade_pattern[num_hp_upgrades];}

MachinePart.prototype.incrementHP = function()
{
    if (num_hp_upgrades < hp_upgrade_pattern.length - 1)
    {
        num_hp_upgrades++;
    }
}

MachinePart.prototype.decrementHP = function()
{
    if (num_hp_upgrades > 0)
    {
        num_hp_upgrades--;
    }
}
