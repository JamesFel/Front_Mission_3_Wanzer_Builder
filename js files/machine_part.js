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

Object.defineProperty(MachinePart.prototype, 'adjustCost',
{
    set: function(amount){if(this.cost + amount > 0){this.cost += amount}}
});

Object.defineProperty(MachinePart.prototype, 'hp',
{
    get: function(){return this.hp_upgrade_pattern[this.num_hp_upgrades];}
})

Object.defineProperty(MachinePart.prototype, 'incrementHP',
{
    set: function()
    {
        if (this.num_hp_upgrades < this.hp_upgrade_pattern.length - 1)
        {
            this.num_hp_upgrades++;
            return true;
        }
    }
})

Object.defineProperty(MachinePart.prototype, 'decrementHP',
{
    set: function()
    {
        if (this.num_hp_upgrades > 0)
        {
            this.num_hp_upgrades--;
            return true;
        }
    }
})