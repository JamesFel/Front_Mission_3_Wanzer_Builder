replaceOptions = function (list_of_options, selector_id)
{
	let dropdown = document.getElementById(selector_id);
	removeOptions(dropdown);
	dropdown.options[0] = new Option('-----------');
	for(i=0; i < list_of_options.length; i++)
	{
	    dropdown.options[i+1] = new Option(list_of_options[i]);
	}
}

removeOptions = function(dropdown)
{
    for(i = dropdown.options.length - 1 ; i >= 0 ; i--)
    {
        dropdown.remove(i);
    }
}

updateDropdownList = function ()
{
    let ea = document.getElementById("ea-select");
    let steal = document.getElementById("steal").checked;
    let mission_num = document.getElementById("mission").value;

    //resetting the arrays
    wanzerList.length = 0;
    handWeaponList.length = 0;
    shoulderWeaponList.length = 0;
    shieldList.length = 0;
    backpackListP.length = 0;
    backpackListB.length = 0;

    for (machine in db["machine_acquisition"])
    {
        let shop = machine[3 + ea]
        let rob = machine[1 + ea]
        if (
            (shop > 0 && shop <= mission_num) ||
            (steal && rob > 0 && rob <= mission_num)
            )
        {
            wanzerList.push(machine[0])
        }
    }

    for (weapon in db["weapons"])
    {
        //fill in, make sure to add weapons and shoulder weapons to different lists
    }

    for (shield in db["shields"])
    {
        //fill in
    }

    for (backpack in db["backpacks"])
    {
        //fill in, make sure to add baskets and power supplies to different lists
    }

    let wanzerPartsSelectorIdList = [
        "body-selector",
        "left-arm-selector",
        "right-arm-selector",
        "wanzer-legs-selector",
    ]

    let handWeaponsSelectorIdList = ["right-hand-selector", "left-hand-selector"]
    let shoulderWeaponSelectorIdList = ["left-shoulder-selector","worn-backpack-selector"]

    for(i=0; i < wanzerPartsSelectorIdList.length; i++)
    {
        replaceOptions(wanzerList, wanzerPartsSelectorIdList[i])
    }

    for(i=0; i < handWeaponsSelectorIdList.length; i++)
    {
        replaceOptions(handWeaponList, handWeaponsSelectorIdList[i])
    }

    for(i=0; i < shoulderWeaponSelectorIdList.length; i++)
    {
        replaceOptions(shoulderWeaponList, shoulderWeaponsSelectorIdList[i])
    }

    //for(i=0; i < handWeaponsSelectorIdList.length; i++)
    //{
        //replaceOptions(shieldList, handWeaponsSelectorIdList[i])
    //}

    //if(???)
    //{
        replaceOptions(backpackListP, "backpack-selector")
    //}
    //else
    //{
    //    replaceOptions(backpackListB, "backpack-selector")
    //}
}