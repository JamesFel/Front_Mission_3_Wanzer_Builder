// class definition for machine part class.

function MachinePart(name, cost, weight, hp, skill){
    EquippableItem.call(name, cost, weight);
    this.hp = hp;
    this.skill = skill;
}

MachinePart.prototype = Object.create(EquippableItem.prototype);
MachinePart.prototype.constructor = MachinePart;