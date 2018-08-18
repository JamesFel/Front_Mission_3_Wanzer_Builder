// class definition for basket class.

function Basket(name, cost, weight, bpType, capacity){
    Backpack.call(name, cost, weight, bpType);
    this.capacity = capacity;
    this.contents = [];  // to store up to capacity number of Items in backpack
}

ShoulderWeapon.prototype = Object.create(Weapon.prototype);
ShoulderWeapon.prototype.constructor = ShoulderWeapon;