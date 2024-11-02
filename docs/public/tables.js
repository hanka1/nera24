async function createOnlineTable(path) {
    try {

        const racers = await requestData(path)
        // Create a table element
        const table = document.createElement('table')
        table.id = 'last_table'
        table.style.borderCollapse = 'collapse'

        // Create and append the header row
        const headerRow = document.createElement('tr');
        const headers = [
            { text: 'Order', class: 'left-align' },
            { text: 'Team (number)', class: 'team-name' },
            { text: 'Name (tracker)', class: 'racer-name' },
            { text: 'Total km', class: 'total-km' },
            { text: 'Finish', class: 'center-align' },
            { text: 'Last lap', class: 'center-align' }
        ]
        
        headers.forEach(header => {
            const th = document.createElement('th')
            th.textContent = header.text
            th.className = header.class
            th.style.borderBottom = '2px solid #00273265' // Border between rows
            headerRow.appendChild(th)
        });

        table.appendChild(headerRow);

        // Create and append rows for each racer
        racers.forEach(racer_all_info => {
            const row = document.createElement('tr')
            const racer = {
                order: racer_all_info.order + ".",
                team_name: racer_all_info.team_name + " (" +  racer_all_info.team_id + ")" ,
                racer_name: racer_all_info.racer_name + " (" +  racer_all_info.tracker_id + ")" ,
                total_km: (Math.round(racer_all_info.total_km * 10) / 10).toFixed(1)  + " km" ,
                finish_time: racer_all_info.finish_time.split(' ')[1],
                lap_time: racer_all_info.lap_time
            }
           

            Object.keys(racer).forEach((key, index) => {
                const td = document.createElement('td')
                td.style.borderBottom = '2px solid #00273265'
                td.className = headers[index].class; // Apply the same class as header
                td.textContent = racer[key]
                row.appendChild(td)
            });

            table.appendChild(row)
        });

        // Append the table to the container
        const tableContainer = document.getElementById('table-container-online');
        tableContainer.appendChild(table)

    } catch (error) {
        console.error('Error:', error)
    }
} 

async function createSummaryTable(path) {
    try {
        //updateLapLengths()

        const race = await requestData(path)
        const tableContainer = document.getElementById('table-container-summary')
        const table = document.createElement('table')
        table.id = 'last_table'
        table.style.borderCollapse = 'collapse'
        const headerRow = document.createElement('tr')

        // create table headers
        race.forEach(team => {
            const th = document.createElement('th')
            th.colSpan = 5
            th.textContent = team.team_name + ":  " + (Math.round(team.total_km * 10) / 10).toFixed(1)  + " km"
            th.style.borderRight = '2px solid #00273265'
            th.style.borderLeft = '4px solid #00273265'
            th.style.borderTop = '2px solid #00273265'
            headerRow.appendChild(th)
        })
        table.appendChild(headerRow)

        // create sub-headers
        const subHeaderRow = document.createElement('tr')
        race.forEach(() => {
            ['Name', 'Start', 'Buoy', 'Finish', 'Time'].forEach((text, index) => {
                const th = document.createElement('th')
                th.textContent = text
                if (index === 0 ) {
                    th.style.borderLeft = '4px solid #00273265'
                }
                subHeaderRow.appendChild(th)
            })
        })
        table.appendChild(subHeaderRow)

        // create table rows
        const maxRows = Math.max(...race.map(team => team.lap_records.length))
        for (let i = 0; i < maxRows; i++) {
            const row = document.createElement('tr')
            race.forEach(team => {
                const record = team.lap_records[i] || {};
                ['racer_name', 'start_time', 'buoy_time', 'finish_time', 'lap_time'].forEach((key, index) => {
                    const td = document.createElement('td')
                    if (key === 'buoy_time') {
                        td.textContent = Object.values(record[key] || {}).join(', ')
                    } else {
                        td.textContent = record[key] || ''
                    }
                    if (index === 0 ) {
                        td.style.borderLeft = '4px solid #00273265'
                    }
                    // set row color based on buoy_time
                    if (record.buoy_time) {
                        if (record.buoy_time.red) {
                            td.style.backgroundColor = '#FFCCCB'
                        } else if (record.buoy_time.green) {
                            td.style.backgroundColor = '#D9EBB8'
                        } else if (record.buoy_time.gray) {
                            td.style.backgroundColor = 'lightgray'
                            td.style.color = 'gray'
                        }
                    }
                    row.appendChild(td)
                })
            }) 
            table.appendChild(row)
        }
        tableContainer.appendChild(table)

    } catch (error) {
        console.error('Error:', error)
    }
} 

//for automatic table summary
async function refreshSummaryTable() {
    try {
        //to remove the old table if it exists
        const oldTable = document.getElementById('last_table')
        if (oldTable) {
            oldTable.remove()
        }
        //console.log("refreshed")
        await createSummaryTable('/api/summary')

    } catch (error) {
        console.error('Error refreshing table:', error);
    }
}

//for automatic table summary
async function refreshOnlineTable() {
    try {
        //to remove the old table if it exists
        const oldTable = document.getElementById('last_table')
        if (oldTable) {
            oldTable.remove()
        }
        //console.log("refreshed")
        await createOnlineTable('/api/online')

    } catch (error) {
        console.error('Error refreshing table:', error);
    }
}

// Set interval to summary table every 5 minutes
//setInterval(refreshSummaryTable, 300000); // 300000 milliseconds = 5 minutes

// Set interval to summary table every 5 minutes
//setInterval(refreshOnlineTable, 10000); // 10 seconds