create table if not exists wanzer_arms(
    machine text primary key,
    hp0 integer,
    hp1 integer,
    hp2 integer,
    hp3 integer,
    hp4 integer,
    hp5 integer,
    hp6 integer,
    hp7 integer,
    wgt integer,
    acc0 integer,
    acc1 integer,
    acc2 integer,
    acc3 integer,
    acc4 integer,
    battle_skill text,
    foreign key (machine) references wanzer_list(machine)
    foreign key (battle_skill) references battle_skills(skill)
);