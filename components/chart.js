// Sample data
const timeData = ['08:00', '10:00', '12:00', '14:00', '16:00'];
const metricsData = {
    tested: [2000, 3500, 4500, 7000, 7000],
    completed: [1000, 2500, 2500, 4000, 5000],
    reworked: [500, 500, 1000, 2000, 1000]
};

// Create Pie Chart
const pieCtx = document.getElementById('pieChart').getContext('2d');
const totalTested = metricsData.tested[metricsData.tested.length - 1];
const totalCompleted = metricsData.completed[metricsData.completed.length - 1];
const totalReworked = metricsData.reworked[metricsData.reworked.length - 1];
const inProgress = totalTested - totalCompleted - totalReworked;

new Chart(pieCtx, {
    type: 'pie',
    data: {
        labels: ['Completed', 'Reworked', 'tested'],
        datasets: [{
            data: [totalCompleted, totalReworked, inProgress],
            backgroundColor: [
                'rgb(34, 197, 94)',
                'rgb(239, 68, 68)',
                'rgb(59, 130, 246)'
            ]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: { font: { size: 12 } }
            }
        }
    }
});

// Create Bar Chart
const barCtx = document.getElementById('barChart').getContext('2d');
new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: timeData,
        datasets: [
            {
                label: 'Tested',
                data: metricsData.tested,
                backgroundColor: 'rgba(59, 130, 246, 0.7)'
            },
            {
                label: 'Completed',
                data: metricsData.completed,
                backgroundColor: 'rgba(34, 197, 94, 0.7)'
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: { font: { size: 12 } }
            }
        }
    }
});

// Populate Table
const tableBody = document.getElementById('metricsTable');
timeData.forEach((time, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="px-4 py-2 text-sm text-gray-900">${time}</td>
        <td class="px-4 py-2 text-sm text-gray-900 text-right">${metricsData.tested[index].toLocaleString()}</td>
        <td class="px-4 py-2 text-sm text-gray-900 text-right">${metricsData.completed[index].toLocaleString()}</td>
    `;
    tableBody.appendChild(row);
});