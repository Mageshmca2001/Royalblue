const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main-content');
const toggleButton = document.getElementById('toggleButton');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');
const overlay = document.getElementById('overlay');

let lastScreenWidth = window.innerWidth;
let isSidebarOpen = false;

function toggleSidebar() {
if (isSidebarOpen) {
closeSidebar();
} else {
openSidebar();
}
}

function openSidebar() {
sidebar.classList.remove('-translate-x-full');
if (window.innerWidth >= 768) {
mainContent.style.marginLeft = '256px';
}
isSidebarOpen = true;

if (window.innerWidth < 768) {
overlay.classList.remove('hidden');
document.body.style.overflow = 'hidden';
sidebar.style.boxShadow = '4px 0 8px rgba(0, 0, 0, 0.1)';
}
}

function closeSidebar() {
sidebar.classList.add('-translate-x-full');
mainContent.style.marginLeft = '0';
overlay.classList.add('hidden');
document.body.style.overflow = '';
sidebar.style.boxShadow = 'none';
isSidebarOpen = false;
}

// Event listeners and initialization remain the same
toggleButton.addEventListener('click', toggleSidebar);
closeSidebarBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

window.addEventListener('resize', () => {
const currentWidth = window.innerWidth;
const breakpoint = 768;

if (lastScreenWidth >= breakpoint && currentWidth < breakpoint) {
closeSidebar();
mainContent.style.marginLeft = '0';
} else if (lastScreenWidth < breakpoint && currentWidth >= breakpoint && isSidebarOpen) {
openSidebar();
}

lastScreenWidth = currentWidth;
});

if (window.innerWidth >= 768) {
openSidebar();
}



function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const icon = document.getElementById("dropdownIcon");
  
    if (dropdown.classList.contains("hidden")) {
      dropdown.classList.remove("hidden");
      icon.classList.remove("bx-chevron-down");
      icon.classList.add("bx-chevron-up");
    } else {
      dropdown.classList.add("hidden");
      icon.classList.remove("bx-chevron-up");
      icon.classList.add("bx-chevron-down");
    }
  }
  


  document.getElementById("dropdownButton").addEventListener("click", () => {
    const dropdownMenu = document.getElementById("dropdownMenu");
    dropdownMenu.classList.toggle("hidden");
});
