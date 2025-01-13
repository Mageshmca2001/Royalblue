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
  
  function logout() {
    // Add your logout logic here
    alert("Logging out...");
    // Example: Redirect to a login page
    window.location.href = "../index.html";
  }
  