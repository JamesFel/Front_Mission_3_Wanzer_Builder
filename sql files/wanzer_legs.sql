create table if not exists wanzer_legs(
  machine text primary key,
  hp0 int,
  hp1 int,
  hp2 int,
  hp3 int,
  hp4 int,
  hp5 int,
  hp6 int,
  hp7 int,
  Wgt int,
  Mv int,
  battle_skill text,
  ev1 int,
  boost_pattern int,
  dash_pattern int,
  leg_count int,
  foreign key(battle_skill) references battle_skills(skill),
  foreign key(machine) references wanzer_list(machine)
);