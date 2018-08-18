create table if not exists wanzer_body(
    machine primary key,
    hp0 int,
    hp1 int,
    hp2 int,
    hp3 int,
    hp4 int,
    hp5 int,
    hp6 int,
    hp7 int,
    wgt int,
    pwr int,
    battle_skill text,
    dr  int,
    foreign key(battle_skill) references battle_skills(skill)
    foreign key(machine) references wanzer_list(machine)
);