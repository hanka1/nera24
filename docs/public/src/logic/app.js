document.addEventListener('DOMContentLoaded', () => {
    i18next.init({
        lng: 'cz',
        resources: {
            en: {
                translation: {
                    "header": { "title": "Nera24" },
                    "nav": {
                        "info": "Info Nera 24",
                        "info1": "Info 1",
                        "info2": "Info 2",
                        "info3": "Info 3",
                        "summary": "Summary",
                        "summary1": "Summary 1",
                        "summary2": "Summary 2",
                        "summary3": "Summary 3",
                        "online": "Online",
                        "history": "History",
                        "contact": "Contact"
                    }
                }
            },
            cz: {
                translation: {
                    "header": { "title": "Nera24" },
                    "nav": {
                        "info": "Info Nera 24",
                        "info1": "Info 1",
                        "info2": "Info 2",
                        "info3": "Info 3",
                        "summary": "Souhrn",
                        "summary1": "Souhrn 1",
                        "summary2": "Souhrn 2",
                        "summary3": "Souhrn 3",
                        "online": "Online",
                        "history": "Historie",
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



