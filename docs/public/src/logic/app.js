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

document.addEventListener('DOMContentLoaded', () => {
    i18next.init({
        lng: 'en',
        resources: {
            en: {
                translation: {
                    "header": { "title": "Nera24" },

                    "nav": { "info": "Info", "online": "Online", "summary": "Summary", "history" : "History", "contact": "Contact" },
                    "info": { "title": "Info about race", "content": intro_info_en },
                    "history": { "title": "Race history", "content": history_info_en },
                    "summary": { "title": "Race summary and statistics", "content": "Actual race statistics" },
                    "contact": { "title": "Contact", "content": "How to contact us." }
                }
            },
            cz: {
                translation: {
                    "header": { "title": "Nera24" },
                    "nav": { "info": "Info", "online": "Online", "summary": "Souhrn", "history" : "Historie", "contact": "Kontakt" },

                    "info": { "title": "Info o  závodě", "content": intro_info_cz },
                    "history": { "title": "Historie závodu", "content": history_info_cz },
                    "summary": { "title": "Souhrnné výsledky a statistiky", "content": "tady bude tabulka ..." },
                    "contact": { "title": "Kontakt", "content": "tady budou kontakty..." }
                }
            }
        }
    }, function(err, t) {
        updateContent();
    });

    function updateContent() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            el.innerHTML = i18next.t(el.getAttribute('data-i18n'));
        });
    }

    window.changeLanguage = function (lng) {
        i18next.changeLanguage(lng, (err, t) => {
            if (err) return console.error(err);
            updateContent();
        });
    };
});

//config date to header
document.addEventListener('DOMContentLoaded', () => { 
    document.getElementById('header-race-date').textContent = config.RACE_DATE; 
});

//config date to header
document.addEventListener('DOMContentLoaded', () => { 
    document.getElementById('header-race-name').textContent = config.RACE_NAME; 
});

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

