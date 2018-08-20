create table if not exists weapons(
    weapon_name text,
    weapon_type text,
    wgt int,
    dmg int,
    cst int,
    shop_e int,
    shop_a int,
    primary key(weapon_name, dmg)
    foreign key (weapon_type) references weapons_common_statistics(weapon_type)
);