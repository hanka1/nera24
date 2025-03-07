// Fixed and cleaned up mobile navigation code
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const menuItems = document.querySelectorAll('.menu > li');
    let activeSubmenu = null;
    
    // Add class for menu items with submenus (for arrow indication)
    menuItems.forEach(item => {
        if (item.querySelector('.submenu')) {
            item.classList.add('has-submenu');
        }
    });
    
    // Make sure hamburger button has the line elements
    if (hamburger && hamburger.querySelectorAll('.hamburger-line').length === 0) {
        // If hamburger lines are missing, create them
        for (let i = 0; i < 3; i++) {
            const line = document.createElement('span');
            line.className = 'hamburger-line';
            hamburger.appendChild(line);
        }
        console.log('Added hamburger lines dynamically');
    }
    
    // Toggle mobile menu on hamburger click
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            console.log('Hamburger clicked');
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
    } else {
        console.error('Hamburger button not found');
    }
    
    // Function to close all submenus
    function closeAllSubmenus() {
        menuItems.forEach(item => {
            const submenu = item.querySelector('.submenu');
            if (submenu) {
                submenu.style.display = 'none';
            }
            item.classList.remove('submenu-active');
        });
        activeSubmenu = null;
    }
    
    // Function to update language switcher position
    function updateLanguageSwitcherPosition() {
        if (window.innerWidth <= 720) {
            const languageSwitcher = document.querySelector('.language-switcher');
            const openSubmenu = document.querySelector('.menu > li.submenu-active');
            
            if (openSubmenu && languageSwitcher) {
                const submenuHeight = openSubmenu.querySelector('.submenu').offsetHeight;
                languageSwitcher.style.marginTop = submenuHeight + 'px';
            } else {
                // Reset margin when no submenu is open
                if (languageSwitcher) {
                    languageSwitcher.style.marginTop = '0';
                }
            }
        } else {
            // Reset for desktop view
            const languageSwitcher = document.querySelector('.language-switcher');
            if (languageSwitcher) {
                languageSwitcher.style.marginTop = '0';
            }
        }
    }
    
    // Handle menu item clicks in mobile view
    menuItems.forEach(item => {
        const link = item.querySelector('a');
        const submenu = item.querySelector('.submenu');
        
        if (submenu) {
            // For mobile view only
            link.addEventListener('click', function(e) {
                // Check if it's mobile view
                if (window.innerWidth <= 720) {
                    // Prevent default only in mobile view for items with submenus
                    e.preventDefault();
                    
                    // Toggle current submenu
                    if (item.classList.contains('submenu-active')) {
                        // If already active, close it
                        item.classList.remove('submenu-active');
                        submenu.style.display = 'none';
                        activeSubmenu = null;
                    } else {
                        // Close any open submenu
                        closeAllSubmenus();
                        
                        // Open this submenu
                        item.classList.add('submenu-active');
                        submenu.style.display = 'block';
                        activeSubmenu = item;
                    }
                    
                    // Update language switcher position
                    updateLanguageSwitcherPosition();
                }
            });
        }
    });
    
    // Handle submenu item clicks - FIXED: Don't close immediately
    document.querySelectorAll('.submenu > li > a').forEach(subItem => {
        subItem.addEventListener('click', function(e) {
            if (window.innerWidth <= 720) {
                // Don't close the menu immediately - allow the user to see what they've clicked
                // Only close if they click outside or on the hamburger menu
            }
        });
    });
    
    // Close menu when clicking outside in mobile view
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 720 && 
            !e.target.closest('.menu') && 
            !e.target.closest('.hamburger') && 
            nav.classList.contains('active')) {
            
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            closeAllSubmenus();
        }
    });
    
    // Reset everything on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 720) {
            // Reset for desktop view
            document.querySelectorAll('.submenu').forEach(sub => {
                sub.style.display = ''; // Reset to CSS default
            });
            
            document.querySelectorAll('.menu > li').forEach(item => {
                item.classList.remove('submenu-active');
            });
            
            const languageSwitcher = document.querySelector('.language-switcher');
            if (languageSwitcher) {
                languageSwitcher.style.marginTop = '0';
            }
        } else {
            // Make sure language switcher position is correct in mobile
            if (activeSubmenu) {
                updateLanguageSwitcherPosition();
            }
        }
    });
});