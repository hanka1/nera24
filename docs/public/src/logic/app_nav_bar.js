document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link')
    const contentSections = document.querySelectorAll('.content-section')

    navLinks.forEach(link => {
        link.addEventListener('click', async (event) => {
            event.preventDefault()

            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'))

            // Add active class to the clicked link
            event.target.classList.add('active')

            const targetId = event.target.getAttribute('data-target')

            // Hide all sections
            contentSections.forEach(section => {
                section.style.display = 'none'
            })

            // Show the target section
            document.getElementById(targetId).style.display = 'block'

            // Call the endpoint
            try {
                // Remove the old table if it exists
                removeOldTable()

                // Determine the endpoint path based on the targetId
                await fetchDataAndUpdateTable(targetId)
                
            } catch (error) {
                console.error('Error in DOMContentLoaded:', error)
            }
        })
    })

})

function removeOldTable() {
    const oldTable = document.getElementById('last_table')
    if (oldTable) {
        oldTable.remove()
    }
}

let refreshInterval;

async function fetchDataAndUpdateTable(targetId) {
    // Clear the existing interval if any
    if (refreshInterval) {
        clearInterval(refreshInterval)
    }

    if (targetId === 'summary') {
        await createSummaryTable('/api/summary')
        console.log("Summary info.")
    } else if (targetId === 'online') {


        await createOnlineTable('/api/online')
        console.log("Online info.")
        // Automatically update every 20 seconds
        refreshInterval = setInterval(() => {
            if (document.getElementById('last_table')) {
                refreshOnlineTable();
            }
        }, 20 * 1000);
    } else if (targetId === 'info') {
        // TODO: Decide what will be there
        console.log("Race info.")
    } else if (targetId === 'history') {
        // TODO: Decide what will be there
        console.log("Race history.")
    } else if (targetId === 'contact') {
        console.log("Contact.") // TODO
    } else {
        console.log("Not defined.") // Default endpoint
    }
}
