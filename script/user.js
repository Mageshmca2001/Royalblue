// Data Store
let users = [];
let editingId = null;

// DOM Elements
const userTable = document.getElementById('userTable');
const userForm = document.getElementById('userForm');
const userModal = document.getElementById('userModal');
const modalTitle = document.getElementById('modalTitle');
const searchInput = document.getElementById('searchInput');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    attachEventListeners();
});

// Event Listeners
function attachEventListeners() {
    openModalBtn.addEventListener('click', () => openModal());
    closeModalBtn.addEventListener('click', () => closeModal());
    userForm.addEventListener('submit', handleFormSubmit);
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    
    // Close modal on outside click
    userModal.addEventListener('click', (e) => {
        if (e.target === userModal) closeModal();
    });
}

// Load Users
function loadUsers() {
    // Simulated initial data - replace with API call
    users = [
        { id: 1, username: 'Nagarajan', password: 'Nagarajan@1989', role: 'Admin', status: 'Active' },
        { id: 2, username: 'ranjthi', password: 'RanjthiKumar@008', role: 'User', status: 'Active' }
    ];
    renderTable();
}

// Render Table
function renderTable(data = users) {
    const tbody = userTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    data.forEach((user, index) => {
        const tr = document.createElement('tr');
        tr.className = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
        
        tr.innerHTML = `
            <td class="border border-gray-400 px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">${user.id}</td>
            <td class="border border-gray-400 px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">${user.username}</td>
            <td class="border border-gray-400 px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">${user.password}</td>
            <td class="border border-gray-400 px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">${user.role}</td>
            <td class="border border-gray-400 px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                <span class="px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
                    user.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-100 text-red-800'
                }">
                    ${user.status}
                </span>
            </td>
            <td class=" border border-gray-400 px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                <button onclick="editUser(${user.id})" class="text-blue-600 hover:text-blue-900">
                    <i class='bx bx-edit'></i> Edit
                </button>
                <button onclick="deleteUser(${user.id})" class="text-red-600 hover:text-red-900">
                    <i class='bx bx-trash'></i> Delete
                </button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}

// Form Submit Handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        role: document.getElementById('role').value,
        status: document.getElementById('status').value
    };
    
    if (!validateForm(formData)) return;
    
    if (editingId) {
        updateUser(editingId, formData);
    } else {
        createUser(formData);
    }
    
    closeModal();
    userForm.reset();
}

// Create User
function createUser(userData) {
    const newUser = {
        id: users.length + 1,
        ...userData
    };
    users.push(newUser);
    renderTable();
    showToast('User created successfully!', 'success');
}

// Update User
function updateUser(id, userData) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users[index] = { ...users[index], ...userData };
        renderTable();
        showToast('User updated successfully!', 'success');
    }
}

// Delete User
function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        users = users.filter(user => user.id !== id);
        renderTable();
        showToast('User deleted successfully!', 'success');
    }
}

// Edit User
function editUser(id) {
    const user = users.find(user => user.id === id);
    if (user) {
        editingId = id;
        modalTitle.textContent = 'Edit User';
        document.getElementById('username').value = user.username;
        document.getElementById('password').value = user.password;
        document.getElementById('role').value = user.role;
        document.getElementById('status').value = user.status;
        openModal();
    }
}

// Modal Functions
function openModal() {
    userModal.classList.remove('hidden');
    if (!editingId) {
        modalTitle.textContent = 'Add New User';
        userForm.reset();
    }
}

function closeModal() {
    userModal.classList.add('hidden');
    editingId = null;
    userForm.reset();
}

// Search Handler
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredUsers = users.filter(user => 
        user.username.toLowerCase().includes(searchTerm) ||
        user.role.toLowerCase().includes(searchTerm) ||
        user.status.toLowerCase().includes(searchTerm)
    );
    renderTable(filteredUsers);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function validateForm(data) {
    if (data.username.length < 3) {
        showToast('Username must be at least 3 characters long', 'error');
        return false;
    }
    if (data.password.length < 6) {
        showToast('Password must be at least 6 characters long', 'error');
        return false;
    }
    if (!data.role) {
        showToast('Please select a role', 'error');
        return false;
    }
    return true;
}

function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    
    toast.className = `mb-3 p-4 rounded-lg shadow-lg flex items-center space-x-2 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`;
    
    toast.innerHTML = `
        <i class='bx ${type === 'success' ? 'bx-check' : 'bx-x'}'></i>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}