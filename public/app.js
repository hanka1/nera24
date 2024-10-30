async function requestData(path) {
    try {
        await document.requestStorageAccess()
        // access granted
        const response = await fetch(path)
        const data = await response.json()
        // process data
        return data
    } catch (error) {
        // access denied or fetch failed
        console.error('Error:', error)
    }
}

/*
// Function to add lap lengths in the HTML
function updateLapLengths() {
    try {
    document.getElementById('lapG').textContent = `green buoy 12,8 km`
    document.getElementById('lapR').textContent = `red buoy 4,8 km`
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

//respond to btn clic
document.getElementById('summary-data-btn').addEventListener('click', async () => {
    try {

        //to remove the old table if it exists
        const oldTable = document.getElementById('last_table')
        if (oldTable) {
            oldTable.remove()
        }

        updateLapLengths();
        
        window.location.href = '/summary'
        await createSummaryTable('/api/summary')

    } catch (error) {
        console.error('Error fetching data:', error)
    }
})

//respond to btn clic
document.getElementById('online-data-btn').addEventListener('click', async () => {
    try {

        //to remove the old table if it exists
        const oldTable = document.getElementById('last_table')
        if (oldTable) {
            oldTable.remove()
        }
        window.location.href = '/online'
        await createOnlineTable('/api/online')

    } catch (error) {
        console.error('Error fetching data:', error)
    }
})

*/



