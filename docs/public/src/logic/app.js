document.addEventListener('DOMContentLoaded', () => {
    i18next.init({
        lng: 'cz',
        resources: {
            en: {
                translation: {
                    "header": { "title": "Nera24" },
                    "nav": {
                        "info": "Info",
                        "proposition": "Proposition",
                        "registration": "Registration",
                        "history": "History",
                        "about_race": "About Race",
                        "results": "Results",
                        "photos": "Photos",
                        "contact": "Contact"
                    }
                }
            },
            cz: {
                translation: {
                    "header": { "title": "Nera24" },
                    "nav": {
                        "info": "Info",
                        "proposition": "Propozice",
                        "registration": "Registrace",
                        "history": "Historie",
                        "about_race": "O Závodě",
                        "results": "Výsledky",
                        "photos": "Fotky",
                        "contact": "Kontakt"
                    }
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
        showContent(lastActiveElement);
        
    }

    window.changeLanguage = function (lng) {
        i18next.changeLanguage(lng, (err, t) => {
            if (err) return console.error(err);
            console.log(lng)
            updateContent()
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



