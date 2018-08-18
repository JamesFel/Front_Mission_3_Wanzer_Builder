// class definition for the legs class (for wanzer legs).

function Legs(name, cost, weight, hp, skill, evade, boost, dash, move, numLegs){
    MachinePart.call(name, cost, weight, hp, skill);
    this.evade = evade;
    this.boost = boost;
    this.dash = dash;
    this.move = move;
    this.numLegs = numLegs;
}

Legs.prototype = Object.create(MachinePart.prototype);
Legs.prototype.constructor = Legs;