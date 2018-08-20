// class definition for machine part class.

function MachinePart(name, cost, weight, hp_upgrade_pattern, skill){
    EquippableItem.call(this, name, cost, weight);
    this.hp_upgrade_pattern = hp_upgrade_pattern;
    this.num_hp_upgrades = 0;
    this.skill = skill;

    set adjustCost(amount){if(this.cost + amount > 0){this.cost += amount}}

    get hp(){return this.hp_upgrade_pattern[this.num_hp_upgrades];}

    set incrementHP()
    {
        if (this.num_hp_upgrades < this.hp_upgrade_pattern.length - 1)
        {
            this.num_hp_upgrades++;
            return true
        }
    }

    set decrementHP()
    {
        if (this.num_hp_upgrades > 0)
        {
            this.num_hp_upgrades--;
            return true
        }
    }

}

MachinePart.prototype = Object.create(EquippableItem.prototype);
MachinePart.prototype.constructor = MachinePart;