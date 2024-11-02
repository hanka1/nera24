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



