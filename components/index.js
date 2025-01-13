// Get DOM elements
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main-content');
const toggleButton = document.getElementById('toggleButton');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');
const overlay = document.getElementById('overlay');

// Track sidebar state and screen width
let isSidebarOpen = window.innerWidth >= 768;
let lastScreenWidth = window.innerWidth;

// Function to handle sidebar expansion
function expandSidebar() {
    sidebar.classList.remove('-translate-x-full', 'w-16', 'sidebar-collapsed');
    sidebar.classList.add('w-64');
    
    // Show all text elements and dropdown arrows
    document.querySelectorAll('.nav-text, .dropdown-arrow').forEach(el => {
        el.classList.remove('hidden');
    });
    
    // Adjust logo container
    const logoContainer = document.querySelector('.logo-container');
    if (logoContainer) {
        logoContainer.classList.remove('justify-center');
        logoContainer.classList.add('justify-between');
    }
    
    // Handle main content margin
    if (window.innerWidth >= 768) {
        mainContent.style.marginLeft = '16rem';
        mainContent.style.transition = 'margin-left 0.3s ease-in-out';
    }
    
    // Show overlay on mobile
    if (window.innerWidth < 768) {
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    isSidebarOpen = true;
}

// Function to handle sidebar collapse
function collapseSidebar() {
    if (window.innerWidth < 768) {
        sidebar.classList.add('-translate-x-full');
        mainContent.style.marginLeft = '0';
    } else {
        sidebar.classList.remove('w-64', '-translate-x-full');
        sidebar.classList.add('w-16', 'sidebar-collapsed');
        mainContent.style.marginLeft = '4rem';
    }
    
    // Hide text elements and dropdown arrows
    document.querySelectorAll('.nav-text, .dropdown-arrow').forEach(el => {
        el.classList.add('hidden');
    });
    
    // Adjust logo container
    const logoContainer = document.querySelector('.logo-container');
    if (logoContainer) {
        logoContainer.classList.remove('justify-between');
        logoContainer.classList.add('justify-center');
    }
    
    // Close dropdowns
    document.querySelectorAll('.dropdown-content').forEach(el => {
        el.classList.add('hidden');
    });
    
    // Hide overlay
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
    
    isSidebarOpen = false;
}

// Toggle sidebar function
function toggleSidebar() {
    if (isSidebarOpen) {
        collapseSidebar();
    } else {
        expandSidebar();
    }
}

// Handle dropdown clicks
document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        if (!isSidebarOpen) {
            expandSidebar();
            return;
        }
        
        const dropdownContent = trigger.nextElementSibling;
        const icon = trigger.querySelector('.bx-chevron-down');
        
        // Toggle dropdown and icon
        dropdownContent.classList.toggle('hidden');
        if (icon) {
            icon.classList.toggle('bx-chevron-up');
        }
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    const currentWidth = window.innerWidth;
    const breakpoint = 768;
    
    if (currentWidth !== lastScreenWidth) {
        if (lastScreenWidth >= breakpoint && currentWidth < breakpoint) {
            collapseSidebar();
        } else if (lastScreenWidth < breakpoint && currentWidth >= breakpoint) {
            if (isSidebarOpen) {
                expandSidebar();
            } else {
                collapseSidebar();
            }
        }
        
        lastScreenWidth = currentWidth;
    }
});

// Add event listeners
toggleButton.addEventListener('click', toggleSidebar);
closeSidebarBtn.addEventListener('click', collapseSidebar);
overlay.addEventListener('click', collapseSidebar);

// Initialize sidebar state
if (window.innerWidth >= 768) {
    expandSidebar();
} else {
    collapseSidebar();
}

// Add CSS transitions to sidebar
sidebar.style.transition = 'all 0.3s ease-in-out';