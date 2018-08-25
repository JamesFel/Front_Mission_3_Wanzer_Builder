create table if not exists weapons(
    weapon_name text primary key,
    weapon_type text,
    wgt int,
    dmg int,
    cst int,
    shop_e int,
    shop_a int,
    foreign key (weapon_type) references weapons_common_statistics(weapon_type)
);