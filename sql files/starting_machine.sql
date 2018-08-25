create table if not exists starting_machine(
    pilot text primary key,
    wanzer text,
    foreign key(wanzer) references wanzer_list(machine)
);