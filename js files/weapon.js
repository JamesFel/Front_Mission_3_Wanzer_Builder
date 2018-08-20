// class definition for weapon class.

function Weapon(name, cost, weight, dmg, apCost, acc, rangeMin, rangeMax, weaponType, dmgType)
{
    EquippableItem.call(name, cost, weight);
    this.dmg = dmg;
    this.apCost = apCost;
    this.acc = acc;
    this.rangeMin = rangeMax;
    this.rangeMax = rangeMax;
    this.weaponType = weaponType;
    this.dmgType = dmgType;
}

Weapon.prototype = Object.create(EquippableItem.prototype);
Weapon.prototype.constructor = Weapon;