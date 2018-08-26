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
    for(let i = dropdown.options.length - 1 ; i >= 0 ; i--)
    {
        dropdown.remove(i);
    }
}

populateList = function(db, mission_num, key, offset, ea, listToFill, exclude=null, eOffset=0)
{
    for (let secondaryKey in db[key])
    {
        let item = db[key][secondaryKey]
        let rob = item[offset + ea]
        let shop = item[offset + 2 + ea]

        if (
            (shop > 0 && shop <= mission_num) ||
            (steal && rob > 0 && rob <= mission_num)
            )
        {
            if(exclude === null || !(item[eOffset] in exclude))
            {
                listToFill.push(item[0])
            }
        }
    }
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
        "wanzer-legs-selector",
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

updateSelection = function(selectorIdList, replacementList, previousSelections)
{
    "use strict"
    for(let i=0; i < selectorIdList.length; i++)
    {
        let currentId = selectorIdList[i];
        replaceOptions(replacementList, currentId)
        if(currentId in previousSelections && replacementList.includes(previousSelections[currentId]))
        {
            document.getElementById(currentId).value=previousSelections[currentId];
        }
    }
}

updateDropdownLists = function ()  //TODO: Change this so that it clears away info from entries that are no longer valid.
{
    "use strict"
    let ea = parseInt(document.getElementById("ea-select").value);
    let steal = document.getElementById("steal").checked;
    let mission_num = document.getElementById("mission").value;
    let shoulderWeaponSelectorIdList = ["left-shoulder-selector","right-shoulder-selector"]
    let handWeaponsSelectorIdList = []
    let shieldSelectorIdList = []
    let wanzerPartsSelectorIdList = [
        "body-selector",
        "left-arm-selector",
        "right-arm-selector",
        "wanzer-legs-selector"
    ]
    let currentlySelected = checkCurrentSelection();

    //resetting the arrays
    wanzerList.length = 0;
    handWeaponList.length = 0;
    shoulderWeaponList.length = 0;
    shieldList.length = 0;
    backpackListP.length = 0;
    backpackListC.length = 0;
    let handWeaponTypes = ["fist", "baton", "flame thrower", "m.gun", "rifle", "shotgun", "spike"]

    if (document.getElementById("right-shield") == 'w')
    {
        handWeaponsSelectorIdList.push("right-hand-selector")
    }
    else
    {
        shieldSelectorIdList.push("right-hand-selector")
    }

    if (document.getElementById("left-shield") == 'w')
    {
        handWeaponsSelectorIdList.push("left-hand-selector")
    }
    else
    {
        shieldSelectorIdList.push("left-hand-selector")
    }

    populateList(db, mission_num, "machine_acquisition", 1, ea, wanzerList);
    populateList(db, mission_num, "shields", 6, ea, shieldList)
    populateList(db, mission_num, "weapons", 5, ea, handWeaponList, ["grenade", "missile"], 1)
    populateList(db, mission_num, "weapons", 5, ea, shoulderWeaponList, handWeaponTypes, 1)
    populateList(db, mission_num, "backpacks", 5, ea, backpackListP,[4, 6, 8], 2)
    populateList(db, mission_num, "backpacks", 5, ea, backpackListC, [30, 60, 90], 3)

    updateSelection(wanzerPartsSelectorIdList, wanzerList, currentlySelected);
    updateSelection(handWeaponsSelectorIdList, handWeaponList, currentlySelected);
    updateSelection(shoulderWeaponSelectorIdList, shoulderWeaponList, currentlySelected);
    updateSelection(shieldSelectorIdList, shieldList, currentlySelected);

    if(document.getElementById("capacity-power").value == "p")
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
    }
    else
    {
        replaceOptions(handWeaponList, hand + "-hand-selector")
    }
}