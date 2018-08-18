create table if not exists battle_skills(
    skill text primary key,
    rating int,
    condition text,
    slots int,
    machine text,
    part text,
    effect blob,
    learn blob,
    foreign key (machine) references wanzer_list(machine),
    check(part in ("Body", "Arm", "Legs"))
    );