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

    document.getElementById("total-cost").innerHTML = cost;
}

updateAverageHP = function()
{
    "use strict"
    let parts = ['body', 'right-arm', 'left-arm', 'wanzer-legs']
    let hp = 0;

    for(let i in parts)
    {
        if (currentSelections[parts[i]] != null)
        {
            hp += currentSelections[parts[i]].hp();
        }
    }

    hp = parseInt(hp/4);
    document.getElementById('stats-avg-hp').innerHTML = hp;
}

updatePower = function()
{
    "use strict"
    let power = 0;
    let unused = 0;
    let cell = document.getElementById('unused-power')
    let powerSources = []

    if(document.getElementById('power-capacity').value == 'p' &&
       currentSelections['backpack'] != null
       )
    {
        powerSources.push('backpack')
    }

    if(currentSelections['body'] != null)
    {
        powerSources.push('body')
    }

    for(let i=0; i < powerSources.length; i++)
    {
        power += currentSelections[powerSources[i]].power;
    }

    document.getElementById('total-power').innerHTML = power;
    unused -= parseInt(document.getElementById('total-weight').innerHTML);
    cell.innerHTML = unused;

    if (unused < 0){cell.style.color = "red";}
    else{cell.style.color = "black";}
}

updateWeight = function()
{
    "use strict"
    let weight = 0;
    let unused = 0;
    let cell = document.getElementById('unused-power')

    for(let item in currentSelections)
    {
        if(currentSelections[item] != null)
        {
            weight += currentSelections[item].weight;
        }
    }
    document.getElementById('total-weight').innerHTML = weight;
    unused = parseInt(document.getElementById('total-power').innerHTML) - weight;
    cell.innerHTML = unused;

    if (unused < 0){cell.style.color = "red";}
    else{cell.style.color = "black";}
}

updateBattleAP = function()
{
    "use strict"
    let unused = document.getElementById('total-ap').value;
    let cell = document.getElementById('battle-ap')
    let upgradeTypes = [
        "body-def-c-upgrades",
        "wanzer-legs-evade-upgrades"
    ]

    unused = Math.min(30, Math.max(12, unused)) // since setting min/max on the input itself isn't working.

    for(let i=0; i < upgradeTypes.length; i++)
    {
        unused -= document.getElementById(upgradeTypes[i]).value;
    }

    unused -= Math.max(
                  document.getElementById("left-arm-acc-upgrades").value,
                  document.getElementById("right-arm-acc-upgrades").value
                  );

    cell.innerHTML = unused;
    if (unused < 12){cell.style.color = "red";}
    else{cell.style.color = "black";}
}

updateBlockedDamagePercent = function()
{
    "use strict"
    let leftHand = document.getElementById('left-shield').value;
    let rightHand = document.getElementById('right-shield').value;
    let legs = currentSelections['wanzer-legs']
    let block1 = 0, block2 = 0, evade = 0;
    let bdp = 0;

    if(leftHand == 's' && currentSelections['left-hand'] != null)
    {
        block1 = currentSelections['left-hand'].dmgReduction;
    }

    if(rightHand == 's' && currentSelections['right-hand'] != null)
    {
        block2 = currentSelections['right-hand'].dmgReduction;
    }

    if(block1 != 0 && block2 != 0)
    {
        block1 = (block1 + block2)/2;
    }
    else{block1 = Math.max(block1, block2);}

    if(legs != null){evade = legs.evade();}

    bdp = parseInt(100-((100-block1)*(100-evade))/100);
    document.getElementById('stats-bdp').innerHTML = bdp;
}

updateSkillInfo = function(part, skill)
{
    "use strict"
    let entry;
    if (skill == null){entry=["None","","NA","0","None","-"]}
    else{entry = db["battle_skills"][skill];}

    //Name|score|condition|slots|machine|part|effect|learn
    let newHTML ="<p><b>Skill</b>: " + skill + "<br>" +
             "<b>Score</b>: " + entry[1] + "<br>" +
             "<b>Condition</b>: " + entry[2] + "<br>" +
             "<b>Slots</b>: " + entry[3] + "<br><br>" +
             "<b>Effect</b>: " + entry[6] + "<br><br>" +
             "<b>Learn</b>: " + entry[7] + "</p>";
    document.getElementsByClassName(part + '-skill-info')[0].innerHTML = newHTML;
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

    if (currentBody != null)
    {
        document.getElementById('body-hp').innerHTML = currentBody.hp();
        document.getElementById('def-c').innerHTML = currentBody.def_c();
        document.getElementById('stats-def-c').innerHTML = currentBody.def_c();
        document.getElementById('body-wgt').innerHTML = currentBody.weight;
        document.getElementById('body-power').innerHTML = currentBody.power;
        document.getElementById('body-cost').innerHTML = currentBody.cost;
        document.getElementById('body-skill').innerHTML = currentBody.skill;
        updateSkillInfo('body', currentBody.skill)
    }
    else
    {
        document.getElementById('body-hp').innerHTML = 0;
        document.getElementById('def-c').innerHTML = 0;
        document.getElementById('stats-def-c').innerHTML = 0;
        document.getElementById('body-wgt').innerHTML = 0;
        document.getElementById('body-power').innerHTML = 0;
        document.getElementById('body-cost').innerHTML = 0;
        document.getElementById('body-skill').innerHTML = '';
        document.getElementById('body-def-c-upgrades').value = 0;
        document.getElementById('body-hp-upgrades').value = 0;
        updateSkillInfo('body', null)
    }
    updateCost();
    updatePower();
    updateWeight();
    updateAverageHP();
}


updateDefC = function()
{
    "use strict"
    let currentPart = currentSelections['body'];
    if(currentPart == null){return;}

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
    document.getElementById('stats-def-c').innerHTML = currentPart.def_c();
    document.getElementById('body-cost').innerHTML = currentPart.cost;
    updateCost();
    updateBattleAP();
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

    if(currentArm != null)
    {
        document.getElementById(side + '-arm-hp').innerHTML = currentArm.hp();
        document.getElementById(side + '-arm-acc').innerHTML = currentArm.acc();
        document.getElementById(side + '-arm-wgt').innerHTML = currentArm.weight;
        document.getElementById(side + '-arm-cost').innerHTML = currentArm.cost;
        document.getElementById(side + '-arm-skill').innerHTML = currentArm.skill;
        updateSkillInfo(side + '-arm', currentArm.skill);
    }
    else
    {
        document.getElementById(side + '-arm-hp').innerHTML = 0;
        document.getElementById(side + '-arm-acc').innerHTML = 0;
        document.getElementById(side + '-arm-wgt').innerHTML = 0;
        document.getElementById(side + '-arm-cost').innerHTML = 0;
        document.getElementById(side + '-arm-skill').innerHTML = '';
        document.getElementById(side + '-arm-hp-upgrades').value = 0;
        document.getElementById(side + '-arm-acc-upgrades').value = 0;
        updateSkillInfo(side + '-arm', null);
    }
    updateCost();
    updateWeight();
    updateAverageHP();
}

updateAcc = function(side)
{
    "use strict"
    let currentArm = currentSelections[side + '-arm'];
    if(currentArm == null){return;}

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
    updateBattleAP();
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
    if(currentLegs != null)
    {
        document.getElementById('wanzer-legs-hp').innerHTML = currentLegs.hp();
        document.getElementById('wanzer-legs-evade').innerHTML = currentLegs.evade();
        document.getElementById('stats-evade').innerHTML = currentLegs.evade();
        document.getElementById('wanzer-legs-boost').innerHTML = currentLegs.boost();
        document.getElementById('stats-boost').innerHTML = currentLegs.boost();
        document.getElementById('wanzer-legs-dash').innerHTML = currentLegs.dash();
        document.getElementById('stats-dash').innerHTML = currentLegs.dash();
        document.getElementById('wanzer-legs-type').innerHTML = currentLegs.numLegs;
        document.getElementById('wanzer-legs-move').innerHTML = currentLegs.move;
        document.getElementById('stats-move').innerHTML = currentLegs.move;
        document.getElementById('wanzer-legs-wgt').innerHTML = currentLegs.weight;
        document.getElementById('wanzer-legs-cost').innerHTML = currentLegs.cost;
        document.getElementById('wanzer-legs-skill').innerHTML = currentLegs.skill;
        updateSkillInfo('legs', currentLegs.skill);
    }
    else
    {
        document.getElementById('wanzer-legs-hp').innerHTML = 0;
        document.getElementById('wanzer-legs-evade').innerHTML = 0
        document.getElementById('stats-evade').innerHTML = 0;
        document.getElementById('wanzer-legs-boost').innerHTML = 0
        document.getElementById('stats-boost').innerHTML = 0;
        document.getElementById('wanzer-legs-dash').innerHTML = 0
        document.getElementById('stats-dash').innerHTML = 0;
        document.getElementById('wanzer-legs-type').innerHTML = "";
        document.getElementById('wanzer-legs-move').innerHTML = 0;
        document.getElementById('stats-move').innerHTML = 0;
        document.getElementById('wanzer-legs-wgt').innerHTML = 0;
        document.getElementById('wanzer-legs-cost').innerHTML = 0;
        document.getElementById('wanzer-legs-skill').innerHTML = "";
        document.getElementById('wanzer-legs-evade-upgrades').value = 0;
        document.getElementById('wanzer-legs-bd-upgrades').value = 0;
        document.getElementById('wanzer-legs-hp-upgrades').value = 0;
        updateSkillInfo('legs', null);
    }
    updateCost();
    updateWeight();
    updateAverageHP();
    updateBlockedDamagePercent();
}

updateEvade = function()
{
    "use strict"
    let currentLegs = currentSelections['wanzer-legs'];
    if(currentLegs == null){return;}

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
    document.getElementById('stats-evade').innerHTML = currentLegs.evade();
    document.getElementById('wanzer-legs-cost').innerHTML = currentLegs.cost;
    updateCost();
    updateBattleAP();
    updateBlockedDamagePercent();
}

updateBoostDash = function()
{
    "use strict"
    let currentLegs = currentSelections['wanzer-legs'];
    if(currentLegs == null){return;}

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
    document.getElementById('stats-boost').innerHTML = currentLegs.boost();
    document.getElementById('wanzer-legs-dash').innerHTML = currentLegs.dash();
    document.getElementById('stats-dash').innerHTML = currentLegs.dash();
    document.getElementById('wanzer-legs-cost').innerHTML = currentLegs.cost;
    updateCost();
}

// -----------------------------------------Machine Parts --------------------------------------------
updateHP = function(part)
{
    "use strict"
    let currentPart = currentSelections[part]
    if(currentPart == null) {return;}

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
    updateAverageHP();
}

// --------------------------------------Shoulders -------------------------------------------------
updateShoulderField = function(side)
{
    "use strict"
    let location = side + '-shoulder'
    let currentShoulder = newShoulderWeapon(db,
                              document.getElementById(location + '-selector').value,
                              currentSelections[location]
                              );
    currentSelections[location] = currentShoulder;
    if(currentShoulder != null)
    {
        document.getElementById(location + '-weapon-type').innerHTML = currentShoulder.weaponType;
        document.getElementById(location + '-damage-type').innerHTML = "F";
        document.getElementById(location + '-damage').innerHTML = currentShoulder.dmg;
        document.getElementById(location + '-acc').innerHTML = currentShoulder.acc;
        document.getElementById(location + '-ap-cost').innerHTML = currentShoulder.apCost;
        document.getElementById(location + '-cost').innerHTML = currentShoulder.cost;
        document.getElementById(location + '-wgt').innerHTML = currentShoulder.weight;
        document.getElementById(location + '-ammo').innerHTML = currentShoulder.ammo;
        document.getElementById(location + '-range').innerHTML =
            currentShoulder.rangeMin + "~" + currentShoulder.rangeMax;
    }
    else
    {
        document.getElementById(location + '-weapon-type').innerHTML = "missile";
        document.getElementById(location + '-damage-type').innerHTML = "F";
        document.getElementById(location + '-damage').innerHTML = 0;
        document.getElementById(location + '-acc').innerHTML = 0;
        document.getElementById(location + '-range').innerHTML = "0~0";
        document.getElementById(location + '-ap-cost').innerHTML = 0;
        document.getElementById(location + '-cost').innerHTML = 0;
        document.getElementById(location + '-wgt').innerHTML = 0;
        document.getElementById(location + '-ammo').innerHTML = 0;
    }
    updateCost();
    updateWeight();
}

// --------------------------------------Hands -----------------------------------------------------
// TODO: remember to include updateBlockedDamagePercent() in updateArmField(hand) if shield in use.

// --------------------------------------Backpack --------------------------------------------------
updateBackpackField = function()
{
    "use strict"
    let bp, pc;
    if(document.getElementById('power-capacity').value =='p')
    {
        bp = newPowerSupply(db,
                                document.getElementById('backpack-selector').value,
                                currentSelections['backpack']
                                );
        if(bp != null){pc=bp.power;}
    }
    else
    {
        bp = newBasket(db,
                           document.getElementById('backpack-selector').value,
                           currentSelections['backpack']
                           );
        if(bp != null){pc=bp.capacity;}
    }
    currentSelections['backpack'] = bp;

    if(bp != null)
    {
        document.getElementById('power-capacity-value').innerHTML = pc;
        document.getElementById('backpack-weight').innerHTML = bp.weight;
    }
    else
    {
        document.getElementById('power-capacity-value').innerHTML = 0;
        document.getElementById('backpack-weight').innerHTML = 0;
    }

    updatePower();
    updateWeight();
    updateCost();
}