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
        case 'nav.summary':
            contentToShow = "summary";
            break;
        case 'nav.online':
            contentToShow = createOnlineTable() ;
            break;
        case 'nav.history':
            contentToShow = '<p>This is some content for Main Item 4.</p>';
            break;
        case 'nav.contact':
                contentToShow = '<p>contact</p>';
                break;
        case 'nav.info1':
            contentToShow = '<p>This is some Info 1.</p>';
            break;
        case 'nav.info2':
            contentToShow = '<table border="1"><tr><th>Header 1</th><th>Header 2</th></tr><tr><td>Data 1</td><td>Data 2</td></tr></table>';
            break;
        case 'nav.info3':
            contentToShow = '<p>Info 3 go here.</p>';
            break;
        case 'nav.summary1':
            contentToShow = createSummaryTable(lang);
            break;
        case 'nav.summary2':
            contentToShow = createSummaryTable2(lang);
            break;
        case 'nav.summary3':
            contentToShow = '<p>Summary 3 go here.</p>';
            break;
        default:
            contentToShow = '<p>Default content goes here.</p>';
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
