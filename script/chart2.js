const ctx = document.getElementById('dailyReportsChart').getContext('2d');

// Define the data
const data = {
    labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00', '02:00', '04:00', '06:00' ,'08:00'],
    datasets: [
        {
            label: 'Meters Tested',
            data: [2000, 3500, 4500, 7000, 7000, 3000, 7500, 7000, 7000, 7000, 6500, 7000, 8000],
            backgroundColor: 'rgba(255, 136, 0, 0.7)',
            borderColor: 'rgb(0, 0, 0)',
            borderWidth: 1
        },
        {
            label: 'Meters Completed',
            data: [1000, 2500, 2500, 4000, 5000, 2000, 5500, 4000, 5000, 6000, 5000, 4000, 5000],
            backgroundColor: 'rgba(30, 255, 0, 0.7)',
            borderColor: 'rgb(0, 0, 0)',
            borderWidth: 1
        },
        {
            label: 'Meters Reworked',
            data: [500, 500, 1000, 2000, 1000, 500, 1000, 2000, 1000, 500, 500, 2000, 3000],
            backgroundColor: 'rgba(255, 0, 0, 0.7)',
            borderColor: 'rgb(0, 0, 0)',
            borderWidth: 1
        }
    ]
};

// Create the chart
const myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Meter Testing Analysis by Serial Number'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Meters'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Serial Number'
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        }
    }
});