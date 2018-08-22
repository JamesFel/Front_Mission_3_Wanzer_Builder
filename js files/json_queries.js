newBody = function(db, machine, oldBody=null)
{

}


newArm = function(db, machine, oldArm=null)
{

}


newLegs = function(db, machine, oldLeg=null)
{
    let name = machine;
    let cost = db["machine_parts_purchase_and_upgrade_costs"]["LegsHP"][2];
    let weight = db["wanzer_legs"][machine][9];
    let hp = db["wanzer_legs"][machine][1];
    let skill = db["wanzer_legs"][machine][11];
    let evade_level_1 = db["wanzer_legs"][machine][12];
    let boost_pattern = db["boost_upgrade_patterns"][db["wanzer_legs"][machine][13]];
    let dash_pattern = db["dash_upgrade_patterns"][db["wanzer_legs"][machine][14]];
    let move = db["wanzer_legs"][machine][10];
    let numLegs = db["wanzer_legs"][machine][15];
    let num_evade_upgrades = 0;
    let num_bd_upgrades = 0;

    if (oldLeg !== null)
    {
        num_evade_upgrades = oldLeg.num_evade_upgrades;
        num_bd_upgrades = oldLeg.num_bd_upgrades;
    }
    return new Legs(name, cost, weight, hp, skill, evade_level_1, boost_pattern, dash_pattern, move, numLegs,
              num_evade_upgrades, num_bd_upgrades)
}

newHandWeapon = function(db, weapon)
{

}


newShoulderWeapon = function(db, weapon)
{

}

newBackpack = function(db, bp, oldBackpack=null)
{

}


// Emma = 0, Alissa = 1
wanzerList(db, missionNum, EmmaAlissa=0, includeStolen=false)
{
    response = []
    for( var wanzer in db["machine_acquisition"])
    {
         if ((includeStolen && wanzer[1 + EmmaAlissa] <= missionNum)|| wanzer[3 + EmmaAlissa] <= missionNum)
         {
             response.append(wanzer[0]);
         }
    }
    return response;
}