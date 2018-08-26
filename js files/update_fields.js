//Functions that update information in the individual fields (ex: body field (hp, def-c, power, wgt, etc.))

// -----------------------------------------All parts ------------------------------------------------
updateCost = function()
{
    "use strict"
    let cost = 0

    for(let selection in currentSelections)
    {
        if(currentSelections[selection] != null)
        {
            cost += currentSelections[selection].cost;
        }
    }

    document.getElementById("total-cost").value = cost;
}

// -------------------------------------------Body -------------------------------------------------
updateBodyField = function()
{
    "use strict"
    let currentBody = newBody(db,
                              document.getElementById('body-selector').value,
                              currentSelections['body']
                              );
    currentSelections['body'] = currentBody;

    document.getElementById('body-hp').innerHTML = currentBody.hp();
    document.getElementById('def-c').innerHTML = currentBody.def_c();
    document.getElementById('body-wgt').innerHTML = currentBody.weight;
    document.getElementById('body-power').innerHTML = currentBody.power;
    document.getElementById('body-cost').innerHTML = currentBody.cost;
    document.getElementById('body-skill').innerHTML = currentBody.skill;
    updateCost();
}


updateDefC = function()
{
    "use strict"
    let currentPart = currentSelections['body'];
    let targetValue = document.getElementById('body-def-c-upgrades').value;
    let currentValue = currentPart.num_def_c_upgrades;

    for(let i = currentValue; i < targetValue; i++)
    {
        currentPart.incrementDefC()
    }

    for(let i = currentValue; i > targetValue; i--)
    {
        currentPart.decrementDefC()
    }

    document.getElementById('def-c').innerHTML = currentPart.def_c();
    document.getElementById('body-cost').innerHTML = currentPart.cost;
    updateCost();
}

// -----------------------------------------Arms -----------------------------------------------------
updateArmField = function(side)
{
    "use strict"
    let currentArm = newArm(db,
                            document.getElementById(side + '-arm-selector').value,
                            currentSelections[side + '-arm-selector']
                            );
    currentSelections[side + '-arm'] = currentArm;

    document.getElementById(side + '-arm-hp').innerHTML = currentArm.hp();
    document.getElementById(side + '-arm-acc').innerHTML = currentArm.acc();
    document.getElementById(side + '-arm-wgt').innerHTML = currentArm.weight;
    document.getElementById(side + '-arm-cost').innerHTML = currentArm.cost;
    document.getElementById(side + '-arm-skill').innerHTML = currentArm.skill;
    updateCost();
}

updateAcc = function(side)
{
    "use strict"
    let currentArm = currentSelections[side + '-arm'];
    let targetValue = document.getElementById(side + '-arm-acc-upgrades').value;
    let currentValue = currentArm.num_acc_upgrades;

    for(let i = currentValue; i < targetValue; i++)
    {
        currentArm.incrementAcc()
    }

    for(let i = currentValue; i > targetValue; i--)
    {
        currentArm.decrementAcc();
    }

    document.getElementById(side + '-arm-acc').innerHTML = currentArm.acc();
    document.getElementById(side + '-arm-cost').innerHTML = currentArm.cost;
    updateCost();
}

// -----------------------------------------Legs -----------------------------------------------------
updateLegsField = function()
{
    "use strict"
    let currentLegs = newLegs(db,
                              document.getElementById('wanzer-legs-selector').value,
                              currentSelections['wanzer-legs']
                              );
    currentSelections['wanzer-legs'] = currentLegs;

    document.getElementById('wanzer-legs-hp').innerHTML = currentLegs.hp();
    document.getElementById('wanzer-legs-evade').innerHTML = currentLegs.evade();
    document.getElementById('wanzer-legs-boost').innerHTML = currentLegs.boost();
    document.getElementById('wanzer-legs-dash').innerHTML = currentLegs.dash();
    document.getElementById('wanzer-legs-type').innerHTML = currentLegs.numLegs;
    document.getElementById('wanzer-legs-move').innerHTML = currentLegs.move;
    document.getElementById('wanzer-legs-wgt').innerHTML = currentLegs.weight;
    document.getElementById('wanzer-legs-cost').innerHTML = currentLegs.cost;
    document.getElementById('wanzer-legs-skill').innerHTML = currentLegs.skill;
}

updateEvade = function()
{
    "use strict"
    let currentLegs = currentSelections['wanzer-legs'];
    let targetValue = document.getElementById('wanzer-legs-evade-upgrades').value;
    let currentValue = currentLegs.num_evade_upgrades;

    for(let i = currentValue; i < targetValue; i++)
    {
        currentLegs.incrementEv()
    }

    for(let i = currentValue; i > targetValue; i--)
    {
        currentLegs.decrementEv();
    }

    document.getElementById('wanzer-legs-evade').innerHTML = currentLegs.evade();
    document.getElementById('wanzer-legs-cost').innerHTML = currentLegs.cost;
    updateCost();
}

updateBoostDash = function()
{
    "use strict"
    let currentLegs = currentSelections['wanzer-legs'];
    let targetValue = document.getElementById('wanzer-legs-bd-upgrades').value;
    let currentValue = currentLegs.num_bd_upgrades;

    for(let i = currentValue; i < targetValue; i++)
    {
        currentLegs.incrementBD()
    }

    for(let i = currentValue; i > targetValue; i--)
    {
        currentLegs.decrementBD();
    }

    document.getElementById('wanzer-legs-boost').innerHTML = currentLegs.boost();
    document.getElementById('wanzer-legs-dash').innerHTML = currentLegs.dash();
    document.getElementById('wanzer-legs-cost').innerHTML = currentLegs.cost;
    updateCost();
}

// -----------------------------------------Machine Parts --------------------------------------------
updateHP = function(part)
{
    "use strict"
    let currentPart = currentSelections[part]
    let targetValue = document.getElementById(part + '-hp-upgrades').value;

    for(let i = currentPart.num_hp_upgrades; i < targetValue; i++)
    {
        currentPart.upgradeHP()
    }

    for(let i = currentPart.num_hp_upgrades; i > targetValue; i--)
    {
        currentPart.downgradeHP()
    }

    document.getElementById(part + '-hp').innerHTML = currentPart.hp();
    document.getElementById(part + '-cost').innerHTML = currentPart.cost;
    updateCost();
}

// --------------------------------------Shoulders -------------------------------------------------

// --------------------------------------Hands -----------------------------------------------------

// --------------------------------------Backpack --------------------------------------------------