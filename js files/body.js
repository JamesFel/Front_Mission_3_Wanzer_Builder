// class definition for the body class (for wanzer bodies).

function body(name, cost, weight, hp, skill, power, def_c){
    MachinePart.call(name, cost, weight, hp, skill);
    this.power = power;
    this.def_c = def_c;
}

body.prototype = Object.create(MachinePart.prototype);
body.prototype.constructor = body;