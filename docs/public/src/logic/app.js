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


 document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const menuItems = document.querySelectorAll('ul.menu > li > a');
    let isMenuOpen = false;

    if (!hamburger || !nav) return;

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        isMenuOpen = !isMenuOpen;
        toggleMenu(isMenuOpen);
    });

    // Handle menu items click
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (window.innerWidth <= 480) {
                const parent = this.parentElement;
                const submenu = parent.querySelector('.submenu');
                
                if (submenu) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other submenus
                    menuItems.forEach(otherItem => {
                        if (otherItem !== this) {
                            const otherParent = otherItem.parentElement;
                            otherParent.classList.remove('active');
                            const otherSubmenu = otherParent.querySelector('.submenu');
                            if (otherSubmenu) {
                                slideUp(otherSubmenu);
                            }
                        }
                    });

                    // Toggle current submenu
                    parent.classList.toggle('active');
                    if (parent.classList.contains('active')) {
                        slideDown(submenu);
                    } else {
                        slideUp(submenu);
                    }
                } else {
                    // If it's a menu item without submenu, close the menu
                    toggleMenu(false);
                }
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !nav.contains(e.target) && !hamburger.contains(e.target)) {
            toggleMenu(false);
        }
    });

    // Helper functions
    function toggleMenu(open) {
        isMenuOpen = open;
        hamburger.classList.toggle('active', open);
        nav.classList.toggle('active', open);
        
        if (!open) {
            // Close all submenus when closing menu
            menuItems.forEach(item => {
                const parent = item.parentElement;
                parent.classList.remove('active');
                const submenu = parent.querySelector('.submenu');
                if (submenu) {
                    submenu.style.display = 'none';
                }
            });
        }

        // Prevent body scroll when menu is open
        document.body.style.overflow = open ? 'hidden' : '';
    }

    function slideDown(element) {
        element.style.display = 'block';
        element.style.height = '0px';
        const height = element.scrollHeight;
        element.style.transition = 'height 0.3s ease';
        element.style.height = height + 'px';
        
        element.addEventListener('transitionend', function handler() {
            element.style.height = 'auto';
            element.removeEventListener('transitionend', handler);
        });
    }

    function slideUp(element) {
        element.style.height = element.scrollHeight + 'px';
        element.style.transition = 'height 0.3s ease';
        
        setTimeout(() => {
            element.style.height = '0px';
        }, 10);

        element.addEventListener('transitionend', function handler() {
            element.style.display = 'none';
            element.style.height = 'auto';
            element.removeEventListener('transitionend', handler);
        });
    }

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 480 && isMenuOpen) {
                toggleMenu(false);
            }
        }, 250);
    });
});