// Function to hide all submenus
function hideAllSubmenus() {
    document.querySelectorAll('.submenu').forEach(submenu => {
        submenu.style.display = 'none';
    });
}

// Function to remove the active class from all menu items
function removeActiveClass() {
    document.querySelectorAll('.menu > li, .submenu > li').forEach(menuItem => {
        menuItem.classList.remove('active');
    });
}

/*document.querySelectorAll('a[data-content]').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default link behavior
        const content = this.getAttribute('data-content');
        showContent(content);
    });
});

function showContent(content) {
    let contentToShow = '';*/

// Function to show content in the container
function showContent(content) {

    deleteOldContent()
    
    const contentContainer = document.getElementById('content')
 
    let lang = i18next.language

    // Define your content based on the data-content attribute
    let contentToShow = '';

    switch (content) {
        case 'nav.info':
            contentToShow = intro_info[lang]
            break;
        case 'nav.proposition':
            contentToShow = proposition_info[lang]
            break;
        // case 'nav.registration':
            // contentToShow = registration_info[lang]
            // break;
        case 'nav.history':
            contentToShow = history_info[lang]
            break;
        case 'nav.about_race':
            contentToShow = about_race[lang];
            break;
        case 'nav.results':
            contentToShow = results_info[lang];
            //createSummaryTable2()
            break;
        case 'nav.photos':
            contentToShow = photos[lang];
            break;
        case 'nav.online':
            contentToShow = online24[lang];
            createOnlineTable();
            break;
        case 'nav.online24':
            contentToShow = online24[lang];
            createSummaryTable2()
            break;
        case 'nav.online24s':
            contentToShow = online24s[lang];
            createOnlineTable();
            break;
        case 'nav.online12':
            contentToShow = online12[lang];
            break;
        case 'nav.online12s':
            contentToShow = online12s[lang];
            break;
        case 'nav.onlineM':
            contentToShow = onlineM[lang];
            break;
        case 'nav.onlineMs':
            contentToShow = onlineMs[lang];
            break;
        case 'nav.contact':
            contentToShow = contact[lang];
            break;
        case 'online-data-btn':
            contentToShow = online_tabel_text[lang];
            createOnlineTable();
            console.log('switch');
            break;
        default:
            contentToShow = intro_info[lang]; // Handle any default or undefined cases
            break;
    }
    contentContainer.innerHTML = contentToShow;
}

// Add click event listeners to menu and submenu items
document.querySelectorAll('.menu > li > a, .submenu > li > a').forEach(menuItem => {
    
    menuItem.addEventListener('click', (e) => {
        e.preventDefault();
        const submenu = menuItem.nextElementSibling;

        hideAllSubmenus(); // Hide other submenus
        removeActiveClass(); // Remove active class from all items

        if (submenu) {
            submenu.style.display = 'block';
        }

        // Set active class and display content
        menuItem.parentElement.classList.add('active');
        
        lastActiveElement = menuItem.attributes["data-i18n"].value
        console.log(lastActiveElement)
        
        // Display content based on clicked item
        //const content = menuItem.getAttribute('data-i18n');
        showContent(lastActiveElement);
    });
});

// Hide submenu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.menu')) {
        hideAllSubmenus();
        removeActiveClass();
    }
});

// Show submenu on hover
document.querySelectorAll('.menu > li').forEach(menuItem => {
    menuItem.addEventListener('mouseenter', (e) => {
        const submenu = menuItem.querySelector('.submenu');
        if (submenu) {
            submenu.style.display = 'block';
        }
    });

    menuItem.addEventListener('mouseleave', (e) => {
        const submenu = menuItem.querySelector('.submenu');
        if (submenu) {
            submenu.style.display = 'none';
        }
    });
});
