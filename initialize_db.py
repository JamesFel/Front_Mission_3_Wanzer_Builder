import sqlite3
from os import getcwd

loadOrder = [
    "backpacks",
    "wanzer_list",
    "battle_skills",
    "boost_upgrade_patterns",
    "credits",
    "damage_reduction_upgrade_progression",
    "dash_upgrade_patterns",
    "evasion_upgrade_progression",
    "machine_acquisition",
    "machine_parts_purchase_and_upgrade_costs",
    "shields",
    "wanzer_arms",
    "wanzer_body",
    "wanzer_legs",
    "weapons_common_statistics",
    "weapons"
]


def execute_sql_file(fileName, cur):
    with open(fileName) as sqlFile:
        stmt = sqlFile.read()
        cur.execute(stmt)


def load_table(table_name, values_as_delimited_string, cur, delim=','):
    values = values_as_delimited_string.split(delim)
    qMarks = "?,"*len(values)
    qMarks = qMarks[:-1]
    stmt = "insert or replace into {table} values({values});".format(
        table=table_name,
        values=qMarks)
    cur.execute(stmt, values)


def create_table(file_name, cur):
    execute_sql_file(file_name, cur)


def main():
    conn = sqlite3.connect(getcwd() + "\\front_mission_3.db")
    cur = conn.cursor()
    rt = getcwd() + '\\'
    for rtName in loadOrder:
        if rtName == 'battle_skills':
            delim = "|"
        else:
            delim = ","

        with open(rt + "source files\\" + rtName + ".csv") as source:
            source.readline()  # ignore column names
            create_table(rt + "sql files\\" + rtName + ".sql", cur)
            for line in source:
                load_table(rtName, line.replace('\n', ''), cur, delim=delim)

        conn.commit()
    conn.close()


if __name__ == "__main__":
    main()