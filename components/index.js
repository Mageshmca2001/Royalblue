const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main-content');
const toggleButton = document.getElementById('toggleButton');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');
const overlay = document.getElementById('overlay');

let lastScreenWidth = window.innerWidth;
let isSidebarOpen = true;

function toggleSidebar() {
  if (isSidebarOpen) {
    collapseSidebar();
  } else {
    expandSidebar();
  }
}

function expandSidebar() {
  sidebar.classList.remove('w-16');
  sidebar.classList.add('w-64');
  sidebar.classList.remove('-translate-x-full');
  sidebar.classList.remove('sidebar-collapsed');
  
  // Show text elements
  document.querySelectorAll('.nav-text').forEach(el => {
    el.classList.remove('hidden');
  });
  
  // Show full dropdown arrows
  document.querySelectorAll('.dropdown-arrow').forEach(el => {
    el.classList.remove('hidden');
  });
  
  // Adjust logo container
  const logoContainer = document.querySelector('.logo-container');
  if (logoContainer) {
    logoContainer.classList.remove('justify-center');
    logoContainer.classList.add('justify-between');
  }
  
  if (window.innerWidth >= 768) {
    mainContent.style.marginLeft = '256px';
  }
  
  if (window.innerWidth < 768) {
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  
  isSidebarOpen = true;
}

function collapseSidebar() {
  if (window.innerWidth < 768) {
    sidebar.classList.add('-translate-x-full');
    mainContent.style.marginLeft = '0';
  } else {
    sidebar.classList.remove('w-64');
    sidebar.classList.add('w-16');
    sidebar.classList.add('sidebar-collapsed');
    mainContent.style.marginLeft = '64px';
  }
  
  // Hide text elements
  document.querySelectorAll('.nav-text').forEach(el => {
    el.classList.add('hidden');
  });
  
  // Hide dropdown arrows
  document.querySelectorAll('.dropdown-arrow').forEach(el => {
    el.classList.add('hidden');
  });
  
  // Adjust logo container
  const logoContainer = document.querySelector('.logo-container');
  if (logoContainer) {
    logoContainer.classList.remove('justify-between');
    logoContainer.classList.add('justify-center');
  }
  
  // Close any open dropdowns
  document.querySelectorAll('.dropdown-content').forEach(el => {
    el.classList.add('hidden');
  });
  
  overlay.classList.add('hidden');
  document.body.style.overflow = '';
  
  isSidebarOpen = false;
}

// Event listeners
toggleButton.addEventListener('click', toggleSidebar);
closeSidebarBtn.addEventListener('click', collapseSidebar);
overlay.addEventListener('click', collapseSidebar);

// Handle dropdown clicks
document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    if (!isSidebarOpen) {
      // If sidebar is collapsed, expand it first
      expandSidebar();
      return;
    }
    
    const dropdownContent = trigger.nextElementSibling;
    dropdownContent.classList.toggle('hidden');
    
    const icon = trigger.querySelector('.bx-chevron-down');
    if (icon) {
      icon.classList.toggle('bx-chevron-up');
    }
  });
});

window.addEventListener('resize', () => {
  const currentWidth = window.innerWidth;
  const breakpoint = 768;

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
});

// Initialize sidebar state based on screen size
if (window.innerWidth >= 768) {
  expandSidebar();
} else {
  collapseSidebar();
}