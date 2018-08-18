# Big thanks to Chad Dotson for the code this is based on.
# http://www.cdotson.com/2014/06/generating-json-documents-from-sqlite-databases-in-python/

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
    connection.row_factory = dict_factory

    all_tables = {}
    cursor = connection.cursor()

    for table in cursor.execute("SELECT name FROM sqlite_master WHERE type='table';"):
        cursor.execute("select * from " + table["name"])
        all_tables[table["name"]] = cursor.fetchall()

    with open(getcwd() + "\\front_mission_3_data.json", 'w') as destination:
        dump(all_tables, destination)

    connection.close()


if __name__ == "__main__":
    main()