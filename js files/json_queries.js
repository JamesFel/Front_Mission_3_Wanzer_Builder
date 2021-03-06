newBody = function(db, machine, oldBody = null)
{
    if (machine[0] == '-')
    {
        return null;
    }

    let name = machine;
    let cost = db["machine_parts_purchase_and_upgrade_costs"]["BodyHP"][2];
    let weight = db["wanzer_body"][machine][9];
    let hp_pattern = [];
    let skill = db["wanzer_body"][machine][11];
    let power = db["wanzer_body"][machine][10];
    let def_c_per_upgrade = db["wanzer_body"][machine][12];
    let num_def_c_upgrades = 0;

    for (let i = 1; i < 9; i++)
    {
        hp_pattern.push(db["wanzer_body"][machine][i]);
    }

    let tempBod = new Body(name, cost, weight, hp_pattern, skill, power,
        def_c_per_upgrade, num_def_c_upgrades);
    if (oldBody != null)
    {
        tempBod.setDefC(oldBody.num_def_c_upgrades);
        tempBod.setHP(oldBody.num_hp_upgrades);
    }

    return tempBod;
}


newArm = function(db, machine, oldArm = null)
{
    if (machine[0] == '-')
    {
        return null;
    }

    let name = machine;
    let cost = db["machine_parts_purchase_and_upgrade_costs"]["ArmHP"][2];
    let weight = db["wanzer_arms"][machine][9];
    let hp_upgrade_pattern = [];
    let skill = db["wanzer_arms"][machine][15];
    let acc_pattern = [];
    let num_acc_upgrades = 0;

    for (let i = 1; i < 9; i++)
    {
        hp_upgrade_pattern.push(db["wanzer_arms"][machine][i]);
    }

    for (let i = 10; i < 15; i++)
    {
        acc_pattern.push(db["wanzer_arms"][machine][i]);
    }

    tempArm = new Arm(name, cost, weight, hp_upgrade_pattern, skill,
        acc_pattern, num_acc_upgrades);

    if (oldArm !== null)
    {
        tempArm.setHP(oldArm.hp());
        tempArm.setAcc(oldArm.acc());
    }

    return tempArm;
}


newLegs = function(db, machine, oldLeg = null)
{
    if (machine[0] == '-')
    {
        return null;
    }

    let name = machine;
    let cost = db["machine_parts_purchase_and_upgrade_costs"]["LegsHP"][2];
    let weight = db["wanzer_legs"][machine][9];
    let hp_upgrade_pattern = [];
    let skill = db["wanzer_legs"][machine][11];
    let evade_level_1 = db["wanzer_legs"][machine][12];
    let boost_pattern = db["boost_upgrade_patterns"][db["wanzer_legs"][
        machine
    ][13]].slice(1);
    let dash_pattern = db["dash_upgrade_patterns"][db["wanzer_legs"][
        machine
    ][14]].slice(1);
    let move = db["wanzer_legs"][machine][10];
    let numLegs = db["wanzer_legs"][machine][15];
    let num_evade_upgrades = 0;
    let num_bd_upgrades = 0;

    for (i = 1; i < 9; i++)
    {
        hp_upgrade_pattern.push(db["wanzer_legs"][machine][i]);
    }

    let tempLeg = new Legs(name, cost, weight, hp_upgrade_pattern, skill,
        evade_level_1,
        boost_pattern, dash_pattern, move, numLegs, num_evade_upgrades,
        num_bd_upgrades);

    if (oldLeg !== null)
    {
        tempLeg.setHP(oldLeg.num_hp_upgrades);
        tempLeg.setEvade(oldLeg.num_evade_upgrades);
        tempLeg.setBD(oldLeg.num_bd_upgrades);
    }

    return tempLeg;
}


newShield = function(db, shd)
{
    if (shd[0] == '-')
    {
        return null;
    }

    let name = shd;
    let cost = db["shields"][shd][5];
    let weight = db["shields"][shd][1];
    let dmgReduction = db["shields"][shd][4];
    let durability = db["shields"][shd][3];

    return new Shield(name, cost, weight, dmgReduction, durability);
}


newHandWeapon = function(db, weapon)
{
    if (weapon[0] == '-')
    {
        return null;
    }

    let name = weapon;
    let cost = db["weapons"][weapon][4];
    let weight = db["weapons"][weapon][2];
    let dmg = db["weapons"][weapon][3];
    let weaponType = db["weapons"][weapon][1]

    let numHits = db["weapons_common_statistics"][weaponType][9];
    let apCost = db["weapons_common_statistics"][weaponType][6];
    let acc = db["weapons_common_statistics"][weaponType][3];
    let rangeMin = db["weapons_common_statistics"][weaponType][7];
    let rangeMax = db["weapons_common_statistics"][weaponType][8];
    let dmgType = db["weapons_common_statistics"][weaponType][2];
    let accLoss = db["weapons_common_statistics"][weaponType][4];

    return new HandWeapon(name, cost, weight, dmg, apCost, acc, rangeMin,
        rangeMax, weaponType, dmgType, numHits, accLoss);
}


newShoulderWeapon = function(db, weapon)
{
    if (weapon[0] == '-')
    {
        return null;
    }

    let name = db["weapons"][weapon][0];
    let cost = db["weapons"][weapon][4];
    let weight = db["weapons"][weapon][2];
    let dmg = db["weapons"][weapon][3];
    let weaponType = db["weapons"][weapon][1];

    let apCost = db["weapons_common_statistics"][weaponType][6];
    let acc = db["weapons_common_statistics"][weaponType][3];
    let rangeMin = db["weapons_common_statistics"][weaponType][7];
    let rangeMax = db["weapons_common_statistics"][weaponType][8];
    let dmgType = db["weapons_common_statistics"][weaponType][2];
    let ammo = db["weapons_common_statistics"][weaponType][5];

    return new ShoulderWeapon(name, cost, weight, dmg, apCost, acc,
        rangeMin, rangeMax, weaponType, dmgType, ammo);
}

newBasket = function(db, bas, oldBasket = null)
{
    if (bas[0] == '-')
    {
        return null;
    }

    let name = bas;
    let cost = db["backpacks"][bas][4];;
    let weight = db["backpacks"][bas][1];
    let bpType = "basket";
    let capacity = db["backpacks"][bas][2];;

    response = new Basket(name, cost, weight, bpType, capacity);

    if (oldBasket !== null && oldBasket.bpType == bpType)
    {
        for (var item in oldBasket.contents)
        {
            if (capacity > response.length)
            {
                response.contents.push(item);
            }
            else
            {
                break;
            }
        }
    }
    return response;
}


newPowerSupply = function(db, ps)
{
    if (ps[0] == '-')
    {
        return null;
    }

    let name = ps;
    let cost = db["backpacks"][ps][4];
    let weight = db["backpacks"][ps][1];
    let bpType = "power supply"
    let power = db["backpacks"][ps][3];

    return new PowerSupply(name, cost, weight, bpType, power);
}


// Emma = 0, Alissa = 1
wanzerList = function(db, missionNum, EmmaAlissa = 0, includeStolen = false)
{
    response = []
    for (var wanzer in db["machine_acquisition"])
    {
        if ((includeStolen && wanzer[1 + EmmaAlissa] <= missionNum) ||
            wanzer[3 + EmmaAlissa] <= missionNum)
        {
            response.push(wanzer[0]);
        }
    }
    return response;
}