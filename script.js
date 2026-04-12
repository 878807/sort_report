const ctx = document.getElementById('chart');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: [100, 1000, 5000, 10000],
        datasets: [
            {
                label: 'Bubble',
                data: [0.01, 0.8, 5, 20],
                borderWidth: 2
            },
            {
                label: 'Selection',
                data: [0.01, 0.7, 4.5, 18],
                borderWidth: 2
            },
            {
                label: 'Insertion',
                data: [0.005, 0.5, 3, 10],
                borderWidth: 2
            },
            {
                label: 'Merge',
                data: [0.001, 0.01, 0.05, 0.1],
                borderWidth: 2
            },
            {
                label: 'Quick',
                data: [0.001, 0.01, 0.04, 0.08],
                borderWidth: 2
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: 'Sorting Performance Comparison'
            }
        }
    }
});
