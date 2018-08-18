// class definition for shield class.

function Shield(name, cost, weight, dmgReduction, durability){
    EquippableItem.call(name, cost, weight);
    this.dmgReduction = dmgReduction;
    this.durability = durability;
}

Shield.prototype = Object.create(EquippableItem.prototype);
Shield.prototype.constructor = Shield;