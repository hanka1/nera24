async function requestData() {
    try {
        await document.requestStorageAccess()
        // Access granted
        const response = await fetch('/refresh')
        const data = await response.json()
        // Process data
        return data
    } catch (error) {
        // Access denied or fetch failed
        console.error('Error:', error)
    }
}

async function createTable() {
    try {
        
        const race = await requestData()
        const tableContainer = document.getElementById('table-container')
        const table = document.createElement('table')
        table.style.borderCollapse = 'collapse'
        const headerRow = document.createElement('tr')

        // Create table headers
        race.forEach(team => {
            const th = document.createElement('th')
            th.colSpan = 5
            th.textContent = team.team_name + "  /  " + team.total_km  + " km"
            th.style.borderLeft = '2px solid #00273265'
            th.style.borderTop = '2px solid #00273265'
            headerRow.appendChild(th)
        })
        table.appendChild(headerRow)

        // Create sub-headers
        const subHeaderRow = document.createElement('tr')
        race.forEach(() => {
            ['Name', 'Start', 'Buoy', 'End', 'km'].forEach((text, index) => {
                const th = document.createElement('th')
                th.textContent = text
                if (index === 0 ) {
                    th.style.borderLeft = '2px solid #00273265'
                }
                subHeaderRow.appendChild(th)
            })
        })
        table.appendChild(subHeaderRow)

        // Create table rows
        const maxRows = Math.max(...race.map(team => team.race_records.length))
        for (let i = 0; i < maxRows; i++) {
            const row = document.createElement('tr')
            race.forEach(team => {
                const record = team.race_records[i] || {};
                ['racer_name', 'startTime', 'buoyTimes', 'endTime', 'lapDistance'].forEach((key, index) => {
                    const td = document.createElement('td')
                    if (key === 'buoyTimes') {
                        td.textContent = Object.values(record[key] || {}).join(', ')
                    } else {
                        td.textContent = record[key] || ''
                    }
                    if (index === 0 ) {
                        td.style.borderLeft = '2px solid #00273265'
                    }
                    // Set row color based on buoyTimes
                    if (record.buoyTimes) {
                        if (record.buoyTimes.red) {
                            td.style.backgroundColor = '#FFCCCB'
                        } else if (record.buoyTimes.green) {
                            td.style.backgroundColor = '#D9EBB8'
                        } else if (record.buoyTimes.gray) {
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
        // Access denied or fetch failed
        console.error('Error:', error)
    }
} 

//respond to btn clic
document.getElementById('fetch-data-btn').addEventListener('click', async () => {
    try {
        
        await createTable()

    } catch (error) {
        console.error('Error fetching data:', error)
    }
})

//respond to page load
document.addEventListener('DOMContentLoaded', async () => {
    try {

        await createTable()

    } catch (err){
        console.error('Error fDOMContentLoaded:', err)
    }
})
