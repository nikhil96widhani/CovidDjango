let radial_bars_options = {
    series: [],
    noData: {
        text: 'Loading...'
    },
    chart: {
        height: 315,
        type: 'radialBar',
    },
    labels: ['Active', 'Recovered', 'Deaths'],
    colors: ['rgba(78, 115, 223, 1)', 'rgba(28, 200, 138, 1)', 'rgba(231, 74, 59, 1)'],
    // colors: ['#4e73df', '#1cc88a', '#e74a3b'],
};

let radial_bars = new ApexCharts(document.querySelector("#radial-bars-div"), radial_bars_options);
radial_bars.render();

function radialBarsFill(current_total, current_recovered, current_deaths) {
    let c_r_percentage = Math.floor((current_recovered / current_total) * 100);
    let c_d_percentage = Math.floor((current_deaths / current_total) * 100);
    let c_a_percentage = 100 - (c_r_percentage + c_d_percentage);

    radial_bars.updateSeries([c_a_percentage, c_r_percentage, c_d_percentage])
    radial_bars.updateOptions({
        plotOptions: {
            radialBar: {
                dataLabels: {
                    total: {
                        show: true,
                        label: 'Total',
                        formatter: function (w) {
                            return kmbtFormatter(current_total)
                        }
                    }
                }
            }
        },
    });
}