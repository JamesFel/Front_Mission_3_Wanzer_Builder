create table if not exists machine_parts_purchase_and_upgrade_costs(
    machine_part text primary key,
    upgrade_type text,
    purchase int,
    lvl1 int,
    Lvl2 int,
    Lvl3 int,
    Lvl4 int,
    Lvl5 int,
    Lvl6 int,
    Lvl7 int,
    check(upgrade_type in ("HP", "DR", "Acc", "EDB")),
    check(machine_part in ("Body", "Arm", "Legs"))
);