// class definition for shoulder weapon class.

function ShoulderWeapon(name, cost, weight, dmg, apCost, acc, rangeMin, rangeMax, weaponType, dmgType, ammo){
    Weapon.call(this, name, cost, weight, dmg, apCost, acc, rangeMin, rangeMax, weaponType, dmgType);
    this.ammo = ammo;
}

ShoulderWeapon.prototype = Object.create(Weapon.prototype);
ShoulderWeapon.prototype.constructor = ShoulderWeapon;