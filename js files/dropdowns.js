//Functions necessary for updating dropdown lists.

//------------------------------------------------General functions------------------------------------------------
validateMinMax = function(min, max, selector)
{
    let upgrades = document.getElementById(selector);

    if(isNaN(parseInt(upgrades.value)))
    {
        upgrades.value = min;
        return null;
    }

    let targetValue = Math.max(min, Math.min(max, parseInt(upgrades.value)));
    upgrades.value = targetValue;

    return targetValue;
}

//---------------------------------------------Add/remove options from Select elements ----------------------------
replaceOptions = function (list_of_options, selector_id)
{
    "use strict"
	let dropdown = document.getElementById(selector_id);
	removeOptions(dropdown);
	dropdown.options[0] = new Option('-----------');
	for(let i=0; i < list_of_options.length; i++)
	{
	    dropdown.options[i+1] = new Option(list_of_options[i]);
	}
}

removeOptions = function(dropdown)
{
    "use strict"
    let optGroups = dropdown.getElementsByTagName('optgroup');
    for (let i = optGroups.length - 1; i >= 0; i--)
    {
        dropdown.removeChild(optGroups[i]);
    }

    for(let i = dropdown.options.length - 1 ; i >= 0 ; i--)
    {
        dropdown.remove(i);
    }
}

replaceWeaponOptions = function(list_of_options, selector_id)
{
    let selector = document.getElementById(selector_id);
    removeOptions(selector);

    selector.options[0] = new Option('-----------');

    for(optGroup in list_of_options)
    {
        let og = document.createElement('optgroup');
        og.label = optGroup;

        for(weapon in list_of_options[optGroup])
        {
            let child = document.createElement('option');
            child.value = list_of_options[optGroup][weapon];
            child.textContent = child.value;
            og.appendChild(child);
        }
        selector.appendChild(og);
    }
}

//--------------------------------------------Update dropdown lists ------------------------------------------------
//use of optGroups requires eOffset to be set to the element
//    that will determine the optGroups to be created.
populateList = function(db, mission_num, primaryKey, compare, offset, ea,
                        steal, listToFill, exclude=null, eOffset=0,
                        optGroups=false)
{
    var key = primaryKey
    for (let secondaryKey in db[key])
    {
        let item = db[key][secondaryKey];
        let rob = item[offset + ea];
        let shop = item[offset + 2 + ea];

        if (
            (shop > 0 && shop <= mission_num) ||
            (steal && rob > 0 && rob <= mission_num)
            )
        {
            if(exclude === null || !(exclude.includes(item[eOffset])))
            {
                if(!(optGroups)) {listToFill.push(item[0]);}
                else
                {
                    if (item[eOffset] in listToFill)
                    {
                        listToFill[item[eOffset]].push(item[0]);
                    }
                    else
                    {
                        listToFill[item[eOffset]] = [item[0]];
                    }
                }
            }
        }
    }
    if(optGroups)
    {
        for(let group in listToFill)
        {
            listToFill[group].sort(function(a, b){return db[key][a][compare] - db[key][b][compare]})
        }
    }
    else
    {
        listToFill.sort(function(a, b)
            {
                if(db[key][a][compare] < db[key][b][compare]){return -1;}
                else{return 1;}
            })
    }
}

populateSkillList = function(listToFill, part)
{
    "use strict"
    part = part.toUpperCase();

    for(let skill in db['battle_skills'])
    {
        let candidate = db['battle_skills'][skill]
        if(candidate[5].toUpperCase() == part && wanzerList.includes(candidate[4]))
        {
            listToFill.push(candidate[0])
        }
    }
    listToFill.sort()
}

checkCurrentSelection = function()
{
    "use strict"
    let selectorIds = [
        "left-shoulder-selector",
        "right-shoulder-selector",
        "body-selector",
        "left-arm-selector",
        "right-arm-selector",
        "legs-selector",
        "backpack-selector",
        "right-hand-selector",
        "left-hand-selector"
    ]
    let response = {}

    for(let i=0;i < selectorIds.length; i++)
    {
        let current = document.getElementById(selectorIds[i]);

        if (current != undefined)
        {
            current = current.value;
            if(current[0] != '-') {response[selectorIds[i]] = current;}
        }
    }

    return response;
}

updateSelection = function(selectorIdList, replacementList, previousSelections, weapons=false, skip=false)
{
    for(let i=0; i < selectorIdList.length; i++)
    {
        let currentSelectorId = selectorIdList[i];
        let selector = document.getElementById(currentSelectorId)

        if(!(weapons)){replaceOptions(replacementList, currentSelectorId);}
        else{replaceWeaponOptions(replacementList, currentSelectorId);}

        if(skip){continue;}

        if(currentSelectorId in previousSelections &&
           replacementList.includes(previousSelections[currentSelectorId]))
        {
            selector.value = previousSelections[currentSelectorId];
        }
        else
        {
            selector.selectedIndex = 0;
            selector.onchange();
        }
    }
}

updateDropdownLists = function ()  //TODO: Change this so that it uses currentSelections instead of currentlySelected
{
    "use strict"
    let ea = parseInt(document.getElementById("ea-select").value);
    let steal = document.getElementById("steal").checked;
    let mission_num = validateMinMax(0, 70, "mission");
    if (mission_num == null){return;}

    let shoulderWeaponSelectorIdList = ["left-shoulder-selector","right-shoulder-selector"];
    let handWeaponsSelectorIdList = [];
    let shieldSelectorIdList = [];
    let wanzerPartsSelectorIdList = [
        "body-selector",
        "left-arm-selector",
        "right-arm-selector",
        "legs-selector"
    ];
    let bodySkillSelectorList = ['body-skill-selector'];
    let armSkillSelectorList = ['left-arm-skill-selector', 'right-arm-skill-selector'];
    let legsSkillSelectorList = ['legs-skill-selector'];
    let currentlySelected = checkCurrentSelection();

    //resetting the arrays
    wanzerList = [];
    handWeaponList = [];
    shoulderWeaponList = [];
    shieldList = [];
    backpackListP= [];
    backpackListC = [];
    bodySkillList = [];
    armSkillList = [];
    legsSkillList = [];

    let handWeaponTypes = ["fist", "baton", "flame thrower", "m.gun", "rifle", "shotgun", "spike", "beam"]

    if (document.getElementById("right-shield").value == 'w')
    {
        handWeaponsSelectorIdList.push("right-hand-selector")
    }
    else
    {
        shieldSelectorIdList.push("right-hand-selector")
    }

    if (document.getElementById("left-shield").value == 'w')
    {
        handWeaponsSelectorIdList.push("left-hand-selector")
    }
    else
    {
        shieldSelectorIdList.push("left-hand-selector")
    }

    populateList(db, mission_num, "machine_acquisition", 0,
                 1, ea, steal, wanzerList);
    populateList(db, mission_num, "shields", 5,
                 6, ea, steal, shieldList)
    populateList(db, mission_num, "weapons", 3,
                 5, ea, steal, handWeaponList, ["grenade", "missile"], 1, true)
    populateList(db, mission_num, "weapons", 3,
                 5, ea, steal, shoulderWeaponList, handWeaponTypes, 1, true)
    populateList(db, mission_num, "backpacks", 3,
                 5, ea, steal, backpackListP,[4, 6, 8], 2)
    populateList(db, mission_num, "backpacks", 2,
                 5, ea, steal, backpackListC, [30, 60, 90], 3)
    populateSkillList(bodySkillList, 'Body');
    populateSkillList(armSkillList, 'Arm');
    populateSkillList(legsSkillList, 'Legs');

    //populating dropdown menus
    updateSelection(wanzerPartsSelectorIdList, wanzerList, currentlySelected);
    updateSelection(handWeaponsSelectorIdList, handWeaponList, currentlySelected, true);
    updateSelection(shoulderWeaponSelectorIdList, shoulderWeaponList, currentlySelected, true);
    updateSelection(shieldSelectorIdList, shieldList, currentlySelected);
    updateSelection(bodySkillSelectorList, bodySkillList, currentlySelected, false, true);
    updateSelection(armSkillSelectorList, armSkillList, currentlySelected, false, true);
    updateSelection(legsSkillSelectorList, legsSkillList, currentlySelected, false, true);

    if(document.getElementById("power-capacity").value == "p")
    {
        updateSelection(["backpack-selector"], backpackListP, currentlySelected);
    }
    else
    {
        updateSelection(["backpack-selector"], backpackListC, currentlySelected);
    }

}

updateHandList = function(hand)
{
    if(document.getElementById(hand + "-shield").value == "s")
    {
        replaceOptions(shieldList, hand + "-hand-selector")
        document.getElementById(hand + '-shield-table').style.display = "block";
        document.getElementById(hand + '-weapon-table').style.display = "none";
        updateWeaponField(hand, true);
    }
    else
    {
        replaceWeaponOptions(handWeaponList, hand + "-hand-selector")
        document.getElementById(hand + '-shield-table').style.display = "none";
        document.getElementById(hand + '-weapon-table').style.display = "block";
        updateShieldField(hand, true);
    }
}

updateBackpackList = function()
{
    let currentlySelected = checkCurrentSelection();
    if(document.getElementById("power-capacity").value == "p")
    {
        updateSelection(["backpack-selector"], backpackListP, currentlySelected);
        document.getElementById("power-capacity-label").innerHTML = "Power:";
    }
    else
    {
        updateSelection(["backpack-selector"], backpackListC, currentlySelected);
        document.getElementById("power-capacity-label").innerHTML = "Capacity:";
    }
    updateBackpackField();
}