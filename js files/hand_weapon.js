// class definition for hand weapon class.

function HandWeapon(name, cost, weight, dmg, apCost, acc, rangeMin, rangeMax, weaponType, dmgType, numHits, accLoss){
    Weapon.call(name, cost, weight, dmg, apCost, acc, rangeMin, rangeMax, weaponType, dmgType);
    this.numHits = numHits;
    this.accLoss = accLoss;
    this.totalDmg = this.dmg * this.numHits;
    this.avgDmg = this.totalDmg * (this.acc - this.accLoss * (this.rangeMax - this.rangeMin)/2)/100
}

HandWeapon.prototype = Object.create(Weapon.prototype);
HandWeapon.prototype.constructor = HandWeapon;