//Functions that update information in the individual fields (ex: body field (hp, def-c, power, wgt, etc.))

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
    let currentBody = newBody(db, document.getElementById('body-selector').value, currentSelections['body'])
    currentSelections['body'] = currentBody;

    document.getElementById('body-hp').innerHTML = currentBody.hp();
    document.getElementById('def-c').innerHTML = currentBody.def_c();
    document.getElementById('body-wgt').innerHTML = currentBody.weight;
    document.getElementById('body-power').innerHTML = currentBody.power;
    document.getElementById('body-cost').innerHTML = currentBody.cost;
    updateCost();
}


updateDefC = function()
{
    "use strict"
    let currentPart = currentSelections['body']
    let targetValue = document.getElementById('body-def-c-upgrades').value;

    for(let i = currentPart.num_def_c_upgrades; i < targetValue; i++)
    {
        currentPart.incrementDefC()
    }

    for(let i = currentPart.num_def_c_upgrades; i > targetValue; i--)
    {
        currentPart.decrementDefC()
    }

    document.getElementById('def-c').innerHTML = currentPart.def_c();
    document.getElementById('body-cost').innerHTML = currentPart.cost;
    updateCost();
}

// -----------------------------------------Arms -----------------------------------------------------

// -----------------------------------------Legs -----------------------------------------------------

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