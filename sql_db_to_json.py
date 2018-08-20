import sqlite3
from os import getcwd
from json import dump


def dict_factory(cursor, row):
    row_dict = {}
    for idx, col in enumerate(cursor.description):
        row_dict[col[0]] = row[idx]
    return row_dict


def main():
    connection = sqlite3.connect(getcwd() + "\\front_mission_3.db")

    all_tables = {}
    cursor = connection.cursor()
    connection.row_factory = dict_factory

    for table in cursor.execute("SELECT name FROM sqlite_master WHERE type='table';").fetchall():
        print(table[0])
        pk = []
        all_tables[table[0]] = {}

        for row in cursor.execute("pragma table_info(" + table[0] + ");"):
            if row[-1] != 0:
                pk.append(row[0])
        pk = sorted(pk)  # to ensure consistent behavior

        temp = cursor.execute("select * from " + table[0]).fetchall()
        for entry in temp:
            all_tables_key = ""
            for key in pk:
                all_tables_key += str(entry[key])
            all_tables[table[0]][all_tables_key] = entry

    with open(getcwd() + "\\front_mission_3_data.json", 'w') as destination:
        dump(all_tables, destination)

    connection.close()


if __name__ == "__main__":
    main()
