create table if not exists weapons_common_statistics(
    weapon_type text primary key,
    weapon_skill text,
    dmg_type text,
    acc int,
    acc_loss int,
    ammo int,
    ap int,
    range_min int,
    range_max int,
    num_hits int
);