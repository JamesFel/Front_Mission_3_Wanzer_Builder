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
    for (secondaryKey in db[key])
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

updateDropdownLists = function ()
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
        "wanzer-legs-selector",
    ]

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

    for(let i=0; i < wanzerPartsSelectorIdList.length; i++)
    {
        replaceOptions(wanzerList, wanzerPartsSelectorIdList[i])
    }

    for(let i=0; i < handWeaponsSelectorIdList.length; i++)
    {
        replaceOptions(handWeaponList, handWeaponsSelectorIdList[i])
    }

    for(let i=0; i < shoulderWeaponSelectorIdList.length; i++)
    {
        replaceOptions(shoulderWeaponList, shoulderWeaponSelectorIdList[i])
    }

    for(let i=0; i < shieldSelectorIdList.length; i++)
    {
        replaceOptions(shieldList, shieldSelectorIdList[i])
    }

    if(document.getElementById("capacity-power").value == "p")
    {
        replaceOptions(backpackListP, "backpack-selector")
    }
    else
    {
        replaceOptions(backpackListC, "backpack-selector")
    }

}