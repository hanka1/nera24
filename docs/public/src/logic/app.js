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
                        //"registration": "Registration",
                        "history": "History",
                        "about_race": "About Race",
                        "results": "Results",
                        "photos": "Photos",
                        "online": "Online",
                        "online24": "24 actual",
                        "online24s": "24 summary",
                        "online12": "12 actual",
                        "online12s": "12 summary",
                        "onlineM": "marathon actual",
                        "onlineMs": "marathon summary",
                        "contact": "Contact",
                        "online_button": "Online results"
                    }
                }
            },
            cz: {
                translation: {
                    "header": { "title": "Nera24" },
                    "nav": {
                        "info": "Info",
                        "proposition": "Propozice",
                        //"registration": "Registrace",
                        "history": "Historie",
                        "about_race": "O Závodu",
                        "results": "Výsledky",
                        "photos": "Fotky",
                        "online": "Online",
                        "online24": "24 aktuální",
                        "online24s": "24 souhrn",
                        "online12": "12 aktuální",
                        "online12s": "12 souhrn",
                        "onlineM": "marathon aktuální",
                        "onlineMs": "marathon souhrn",
                        "contact": "Kontakt",
                        "online_button": "Průběžné výsledky online"
                    }
                }
            }
        }
    }, function(err, t) {
        updateContent();
    });

    function updateContent() {
        if (document.getElementById('last_table')){
            showContent('online-data-btn');
        } else {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                el.innerHTML = i18next.t(el.getAttribute('data-i18n'))
            })
            showContent(lastActiveElement);
        }
    }
 
    window.changeLanguage = function (lng) {
        i18next.changeLanguage(lng, (err, t) => {
            if (err) return console.error(err);
            updateContent()
        })
    }
 
    // Set header content
    document.getElementById('header-race-date').textContent = config.RACE_DATE;
 
    // Online data button click handler
    document.getElementById('online-data-btn').addEventListener('click', async () => {
        try {
            updateContent('online-data-btn')
 
            function updateContent() {
                document.querySelectorAll('[data-i18n]').forEach(el => {
                    el.innerHTML = i18next.t(el.getAttribute('data-i18n'))
                })
                showContent('online-data-btn');
            }
        } catch (err) {
            console.log(err)
        }
    })
 });

