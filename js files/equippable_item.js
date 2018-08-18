// class definition for equippable item class.

function EquippableItem(name, cost, weight){
    Item.call(name, cost);
    this.weight = weight;
}

EquippableItem.prototype = Object.create(Item.prototype);
EquippableItem.prototype.constructor = EquippableItem;