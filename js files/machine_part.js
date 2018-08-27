// class definition for machine part class.

function MachinePart(name, cost, weight, hp_upgrade_pattern, skill)
{
    EquippableItem.call(this, name, cost, weight);
    this.hp_upgrade_pattern = hp_upgrade_pattern;
    this.num_hp_upgrades = 0;
    this.skill = skill;
}

MachinePart.prototype = Object.create(EquippableItem.prototype);
MachinePart.prototype.constructor = MachinePart;

MachinePart.prototype.hp = function()
{
    return this.hp_upgrade_pattern[this.num_hp_upgrades];
}