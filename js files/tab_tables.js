sortTable = function(tableId, dsc, sortOn)
{
    "use strict"
    let table,
        rows,
        switching;

    table = document.getElementById(tableId);
    switching = true;

    while (switching)
    {
        switching = false;
        rows = table.rows;

        for (let i = 1; i < (rows.length - 1); i++)
        {
            let x = rows[i].getElementsByTagName("TD")[sortOn].innerHTML;
            let y = rows[i + 1].getElementsByTagName("TD")[sortOn].innerHTML;

            if(isNaN(Number(x)) || isNaN(Number(y)))
            {
                x = x.toLowerCase();
                y = y.toLowerCase();
            }
            else
            {
                x = Number(x);
                y = Number(y);
            }

            if (dsc == (x > y) && x != y) //both true or both false
            {
                switching = true;
                rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
                break;
            }
        }
    }
}

filterTable = function(tableId, emmaShopCell)
{
    "use strict"
    let table,
        tableRows,
        tableDataShop,
        tableDataStolen,
        stolen,
        mission,
        storyline,
        stolenCell;

    stolen = document.getElementById('steal').checked;
    mission = document.getElementById('mission').value;
    storyline = document.getElementById('ea-select').value;
    emmaShopCell += parseInt(storyline);

    table = document.getElementById(tableId);
    tableRows = table.getElementsByTagName("tr");

    if(stolen && tableId.slice(0,6) != "weapon")
    {
        stolenCell = emmaShopCell - 2;
    }
    else
    {
        stolenCell = emmaShopCell;
    }

    for (let i = 1; i < tableRows.length; i++)
    {
        tableDataShop = tableRows[i].getElementsByTagName("td")[emmaShopCell];
        tableDataStolen = tableRows[i].getElementsByTagName("td")[stolenCell];

        if ((tableDataShop && parseInt(tableDataShop.innerHTML) <= mission) ||
            (stolen && tableDataStolen && parseInt(tableDataStolen.innerHTML) <= mission))
        {
            tableRows[i].style.display="";
        }
        else
        {
            tableRows[i].style.display = "none";
        }
    }
}

createRows = function(key, template, table, restrict=null, buyStealKey=null, bsOffset=0)
{
    let rowIdx = 1, row, cell, source, bsSource;

    source = db[key];
    if(buyStealKey != null)
    {
        bsSource = db[buyStealKey];
    }

    for(let ref in source)
    {
        if(restrict == null || restrict == source[ref][1])
        {
            row = table.insertRow(rowIdx);
            rowIdx++;

            for(let j=0; j < template.length; j++)
            {
                cell = row.insertCell(j);
                cell.innerHTML = source[ref][template[j]];
            }
            if(buyStealKey != null)
            {
                for(let k=0; k < 4; k++)
                {
                    cell = row.insertCell(template.length + k);
                    cell.innerHTML = bsSource[ref][bsOffset + k];
                }
            }
        }
    }
}

loadTables = function()
{
    "use strict"
    let bodyTabTable = document.getElementById('body-tab-table');
    let armTabTable = document.getElementById('arm-tab-table');
    let legsTabTable = document.getElementById('legs-tab-table');

    let weaponTabMissileTable = document.getElementById('weapon-tab-missile-table');
    let weaponTabGrenadeTable = document.getElementById('weapon-tab-grenade-table');

    let weaponTabShotgunTable = document.getElementById('weapon-tab-shotgun-table');
    let weaponTabMGunTable = document.getElementById('weapon-tab-m-gun-table');
    let weaponTabFlameThrowerTable = document.getElementById('weapon-tab-flame-thrower-table');
    let weaponTabFistTable = document.getElementById('weapon-tab-fist-table');
    let weaponTabBatonTable = document.getElementById('weapon-tab-baton-table');
    let weaponTabSpikeTable = document.getElementById('weapon-tab-spike-table');
    let weaponTabRifleTable = document.getElementById('weapon-tab-rifle-table');
    let weaponTabBeamTable = document.getElementById('weapon-tab-beam-table');

    let weaponTabShieldTable = document.getElementById('weapon-tab-shield-table');

    let bodyTemplate = [0, 9, 1, 8, 10, 12, 11];
    let armTemplate = [0, 9, 1, 8, 10, 11, 12, 13, 14, 15];
    let legsTemplate = [0, 9, 1, 8, 10, 12, 13, 14, 11];
    let weaponTemplate = [0, 2, 3, 4, 7, 8];
    let shieldTemplate = [0, 1, 4, 3, 5, 8, 9];

    createRows('wanzer_body', bodyTemplate, bodyTabTable, null, "machine_acquisition", 1);
    createRows('wanzer_arms', armTemplate, armTabTable, null, "machine_acquisition", 1);
    createRows('wanzer_legs', legsTemplate, legsTabTable, null, "machine_acquisition", 1);

    createRows('weapons', weaponTemplate, weaponTabMissileTable, 'missile');
    createRows('weapons', weaponTemplate, weaponTabGrenadeTable, 'grenade');

    createRows('weapons', weaponTemplate, weaponTabShotgunTable, 'shotgun');
    createRows('weapons', weaponTemplate, weaponTabMGunTable, 'm.gun');
    createRows('weapons', weaponTemplate, weaponTabFlameThrowerTable, 'flame thrower');
    createRows('weapons', weaponTemplate, weaponTabFistTable, 'fist');
    createRows('weapons', weaponTemplate, weaponTabBatonTable, 'baton');
    createRows('weapons', weaponTemplate, weaponTabSpikeTable, 'spike');
    createRows('weapons', weaponTemplate, weaponTabRifleTable, 'rifle');
    createRows('weapons', weaponTemplate, weaponTabBeamTable, "beam");

    createRows('shields', shieldTemplate, weaponTabShieldTable);

    sortTable('body-tab-table', true, 0);
    sortTable('arm-tab-table', true, 0);
    sortTable('legs-tab-table', true, 0);
    sortTable('weapon-tab-missile-table', true, 3);
    sortTable('weapon-tab-grenade-table', true, 3);
    sortTable('weapon-tab-shotgun-table', true, 3);
    sortTable('weapon-tab-m-gun-table', true, 3);
    sortTable('weapon-tab-spike-table', true, 3);
    sortTable('weapon-tab-fist-table', true, 3);
    sortTable('weapon-tab-baton-table', true, 3);
    sortTable('weapon-tab-rifle-table', true, 3);
    sortTable('weapon-tab-flame-thrower-table', true, 3);
    sortTable('weapon-tab-beam-table', true, 3);
    sortTable('weapon-tab-shield-table', true, 4);
}