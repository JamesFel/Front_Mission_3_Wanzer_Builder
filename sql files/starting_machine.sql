create table if not exists starting_machine(
    pilot text,
    wanzer text,
    primary key (pilot, wanzer),
    foreign key(wanzer) references wanzer_list(machine)
);