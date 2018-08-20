newLegs = function(db, machine, oldLeg=null)
{
    var name = machine,
        cost = db["machine_parts_purchase_and_upgrade_costs"]["LegHP"],
        weight = db["wanzer_legs"][machine]["wgt"],
        hp = db["wanzer_legs"][machine]["hp0"],
        skill = db["wanzer_legs"][machine]["battle_skill"],
        evade_level_1 = db["wanzer_legs"][machine]["ev1"],
        boost_pattern = db["boost_upgrade_patterns"][db["wanzer_legs"][machine]["boost_pattern"]],
        dash_pattern = db["dash_upgrade_patterns"][db["wanzer_legs"][machine]["dash_pattern"]],
        move = db["wanzer_legs"][machine]["mv"],
        numLegs = db["wanzer_legs"][machine]["leg_count"],
        num_evade_upgrades = 0,
        num_bd_upgrades = 0

    if (oldLeg !== null)
    {
        num_evade_upgrades = oldLeg.num_evade_upgrades;
        num_bd_upgrades = oldLeg.num_bd_upgrades;
    }
    console.log(name, cost, weight, hp, skill, evade_level_1, boost_pattern, dash_pattern, move, numLegs,
              num_evade_upgrades, num_bd_upgrades)
    return new Legs(name, cost, weight, hp, skill, evade_level_1, boost_pattern, dash_pattern, move, numLegs,
              num_evade_upgrades, num_bd_upgrades)
}

