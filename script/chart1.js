function generateDates() {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 31; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        dates.unshift(date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        }));
    }
    return dates;
}

// Generate random data for demonstration
function generateRandomData(min, max, count) {
    return Array.from({ length: count }, () => 
        Math.floor(Math.random() * (max - min + 1)) + min
    );
}

// Generate data
const metersTested = generateRandomData(4000, 8000, 31);
const metersCompleted = generateRandomData(3000, 6000, 31);
const metersReworked = generateRandomData(500, 3000, 31);

// Update summary stats
document.getElementById('totalTested').textContent = metersTested.reduce((a, b) => a + b, 0).toLocaleString();
document.getElementById('totalCompleted').textContent = metersCompleted.reduce((a, b) => a + b, 0).toLocaleString();
document.getElementById('totalReworked').textContent = metersReworked.reduce((a, b) => a + b, 0).toLocaleString();

// Chart configuration
const ctx = document.getElementById('MonthlyReportsChart').getContext('2d');

const data = {
    labels: generateDates(),
    datasets: [
        {
            label: 'Meters Tested',
            data: metersTested,
            backgroundColor: 'rgba(255, 136, 0, 0.7)',
            borderColor: 'rgb(0, 0, 0)',
            borderWidth: 1
        },
        {
            label: 'Meters Completed',
            data: metersCompleted,
            backgroundColor: 'rgba(30, 255, 0, 0.7)',
            borderColor: 'rgb(0, 0, 0)',
            borderWidth: 1
        },
        {
            label: 'Meters Reworked',
            data: metersReworked,
            backgroundColor: 'rgba(255, 0, 0, 0.7)',
            borderColor: 'rgb(0, 0, 0)',
            borderWidth: 1
        }
    ]
};

const myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    padding: 20,
                    font: {
                        size: 12
                    }
                }
            },
            title: {
                display: true,
                text: 'Meter Analysis By Monthly',
                font: {
                    size: 16,
                    weight: 'bold'
                },
                padding: 20
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Meters',
                    font: {
                        size: 12,
                        weight: 'bold'
                    }
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Date',
                    font: {
                        size: 12,
                        weight: 'bold'
                    }
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        }
    }
});