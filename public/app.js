document.addEventListener('DOMContentLoaded', () => {
    const tableContainer = document.getElementById('table-container');
    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    const headerRow = document.createElement('tr');

    // Create table headers
    race.forEach(team => {
        const th = document.createElement('th');
        th.colSpan = 5;
        th.textContent = team.team_name + "  /  " + team.total_km  + " km";
        th.style.borderLeft = '2px solid #00273265';
        th.style.borderTop = '2px solid #00273265';
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Create sub-headers
    const subHeaderRow = document.createElement('tr');
    race.forEach(() => {
        ['Name', 'Start', 'Buoy', 'End', 'km'].forEach((text, index) => {
            const th = document.createElement('th');
            th.textContent = text;
            if (index === 0 ) {
                th.style.borderLeft = '2px solid #00273265';
            }
            subHeaderRow.appendChild(th);
        });
    });
    table.appendChild(subHeaderRow);

    // Create table rows
    const maxRows = Math.max(...race.map(team => team.race_records.length));
    for (let i = 0; i < maxRows; i++) {
        const row = document.createElement('tr');
        race.forEach(team => {
            const record = team.race_records[i] || {};
            ['racer_name', 'startTime', 'buoyTimes', 'endTime', 'lapDistance'].forEach((key, index) => {
                const td = document.createElement('td');
                if (key === 'buoyTimes') {
                    td.textContent = Object.values(record[key] || {}).join(', ');
                } else {
                    td.textContent = record[key] || '';
                }
                if (index === 0 ) {
                    td.style.borderLeft = '2px solid #00273265';
                }

                if (record.buoyTimes) {
                    if (record.buoyTimes.red) {
                        td.style.backgroundColor = '#FFCCCB';
                    } else if (record.buoyTimes.green) {
                        td.style.backgroundColor = '#D9EBB8';
                    } else if (record.buoyTimes.gray) {
                        td.style.backgroundColor = 'lightgray';
                        td.style.color = 'gray'
                    }
                }

                row.appendChild(td);

              
            })
            });

            // Set row color based on buoyTimes
            
        table.appendChild(row);
    }

    tableContainer.appendChild(table);
});
