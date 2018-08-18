create table if not exists machine_acquisition(
    machine text primary key,
    party_Member text,
    battle_e text,
    battle_a text,
    shop_e text,
    shop_a text,
    foreign key (machine) references wanzer_list(machine)
);