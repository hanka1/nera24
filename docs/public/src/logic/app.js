document.addEventListener('DOMContentLoaded', () => {
    i18next.init({
        lng: 'cz',
        resources: {
            en: {
                translation: {
                    "header": { "title": "Nera24" },

                    "nav": { "info": "Info", "online": "Online", "summary": "Summary", "history" : "History", "contact": "Contact" },
                    "info": { "title": "Info about race", "content": intro_info_en },
                    "history": { "title": "Race history", "content": history_info_en },
                    "summary": { "title": "Race summary and statistics" },
                    "contact": { "title": "Contact", "content": "TODO add contact info." }
                }
            },
            cz: {
                translation: {
                    "header": { "title": "Nera24" },
                    "nav": { "info": "Info", "online": "Online", "summary": "Souhrn", "history" : "Historie", "contact": "Kontakt" },

                    "info": { "title": "Info o  závodě", "content": intro_info_cz },
                    "history": { "title": "Historie závodu", "content": history_info_cz },
                    "summary": { "title": "Souhrnné výsledky a statistiky" },
                    "contact": { "title": "Kontakt", "content": "TODO pridat kontaktni info." }
                }
            }
        }
    }, function(err, t) {
        updateContent();
    });

    function updateContent() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            el.innerHTML = i18next.t(el.getAttribute('data-i18n'))
        })
    }

    window.changeLanguage = function (lng) {
        i18next.changeLanguage(lng, (err, t) => {
            if (err) return console.error(err);
            updateContent()

            // Check if the "online" section is active
            const onlineSection = document.getElementById('online');
            if (onlineSection && onlineSection.style.display !== 'none') {
                // Update the online table
                document.getElementById('table-container-online').innerHTML = ''
                createOnlineTable();
            }

        })
    }
})

//config date to header
document.addEventListener('DOMContentLoaded', () => { 
    document.getElementById('header-race-date').textContent = config.RACE_DATE; 
});

//config date to header
document.addEventListener('DOMContentLoaded', () => { 
    document.getElementById('header-race-name').textContent = config.RACE_NAME; 
});



