// Select DOM elements
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const userModal = document.getElementById('userModal');
const userForm = document.getElementById('userForm');
const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];

// Track the user being edited (if any)
let editingUser = null;

// Function to open the modal
openModalBtn.addEventListener('click', () => {
    // Clear form fields if adding a new user
    userForm.reset();
    editingUser = null;
    userModal.classList.remove('hidden');
});

// Function to close the modal
closeModalBtn.addEventListener('click', () => {
    userModal.classList.add('hidden');
});

// Function to add or update user
userForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const username = document.getElementById('username').value;
    const createdDate = document.getElementById('createdDate').value;
    const role = document.getElementById('role').value;
    const status = document.getElementById('status').value;

    // If editing, update the row
    if (editingUser) {
        editingUser.querySelector('.username').textContent = username;
        editingUser.querySelector('.createdDate').textContent = createdDate;
        editingUser.querySelector('.role').textContent = role;
        editingUser.querySelector('.status').textContent = status;
    } else {
        // Add a new row to the table
        const newRow = dataTable.insertRow();

        newRow.innerHTML = `
            <td class="border border-gray-300 text-center px-4 py-2">${dataTable.rows.length}</td>
            <td class="border border-gray-300 text-center px-4 py-2 username">${username}</td>
            <td class="border border-gray-300 text-center px-4 py-2 createdDate">${createdDate}</td>
            <td class="border border-gray-300 text-center px-4 py-2 role">${role}</td>
            <td class="border border-gray-300 text-center px-4 py-2 status">${status}</td>
            <td class="border border-gray-300 text-center px-4 py-2 flex justify-center items-center space-x-2">
                <button class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 flex items-center">
                    <i class="bx bx-edit mr-2"></i> Edit
                </button>
                <button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 deleteBtn flex items-center">
                    <i class="bx bx-trash mr-2"></i> Delete
                </button>
            </td>
        `;
    }

    // Close the modal
    userModal.classList.add('hidden');
});

// Event delegation for editing and deleting users
dataTable.addEventListener('click', (e) => {
    if (e.target.closest('.editBtn')) {
        const row = e.target.closest('tr');
        const username = row.querySelector('.username').textContent;
        const createdDate = row.querySelector('.createdDate').textContent;
        const role = row.querySelector('.role').textContent;
        const status = row.querySelector('.status').textContent;

        // Populate the modal with user data
        document.getElementById('username').value = username;
        document.getElementById('createdDate').value = createdDate;
        document.getElementById('role').value = role;
        document.getElementById('status').value = status;

        // Set the user to be edited
        editingUser = row;

        // Open the modal
        userModal.classList.remove('hidden');
    }

    if (e.target.closest('.deleteBtn')) {
        const row = e.target.closest('tr');
        row.remove();
    }
});