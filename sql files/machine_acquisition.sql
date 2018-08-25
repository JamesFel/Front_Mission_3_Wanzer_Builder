create table if not exists machine_acquisition(
    machine text primary key,
    battle_e int,
    battle_a int,
    shop_e int,
    shop_a int,
    foreign key (machine) references wanzer_list(machine)
);