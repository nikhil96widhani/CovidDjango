let line_chart_options = {
    series: [],
    noData: {
        text: 'Loading...'
    },
    chart: {
        height: 300,
        type: 'line',

        // zoom: {
        //     enabled: false
        // },
        // toolbar: {
        //     show: false
        // }
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: [5, 5, 5],
        curve: 'straight',
    },
    xaxis: {
        type: 'datetime'
    },
    markers: {
        size: 0.3,
        hover: {
            sizeOffset: 6
        }
    },
    grid: {
        borderColor: '#f1f1f1',
    }
};

let radial_bars_options = {
    series: [],
    noData: {
        text: 'Loading...'
    },
    chart: {
        height: 315,
        type: 'radialBar',
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
                enabled: true,
                delay: 150
            },
            dynamicAnimation: {
                enabled: true,
                speed: 350
            }
        }
    },
    labels: ['Active', 'Recovered', 'Deaths'],
};

let triple_line_chart = new ApexCharts(document.querySelector("#triple-line-chart-div"), line_chart_options);
triple_line_chart.render();

let radial_bars = new ApexCharts(document.querySelector("#radial-bars-div"), radial_bars_options);
radial_bars.render();

function lineChartAndRadialBarsDataFill() {
    let region_name = document.getElementById('region_selector').value;
    let url = '/api/linechart';
    let data = {'region_name': region_name, 'days':60}

    $.getJSON(url, data, function (response) {
        last_index = response.total.length - 1;

        let current_total = response.total[last_index];
        let current_recovered = response.recovered[last_index];
        let current_deaths = response.deaths[last_index];

        let c_r_percentage = Math.floor((current_recovered / current_total) * 100);
        let c_d_percentage = Math.floor((current_deaths / current_total) * 100);
        let c_a_percentage = 100 - (c_r_percentage + c_d_percentage);

        triple_line_chart.updateSeries([
            {
                name: "Total Cases",
                data: response.total
            },
            {
                name: "Recovered",
                data: response.recovered
            },
            {
                name: 'Deaths',
                data: response.deaths
            },
        ])
        triple_line_chart.updateOptions({
            // labels: response.dates,
            labels: response.dates,
        })

        radial_bars.updateSeries([c_a_percentage, c_r_percentage, c_d_percentage])
        radial_bars.updateOptions({
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        total: {
                            show: true,
                            label: 'Total',
                            formatter: function (w) {
                                return current_total
                            }
                        }
                    }
                }
            },
        });
    });
}

$(document).ready(function () {
    lineChartAndRadialBarsDataFill();
});

$('#region_selector').change(function () {
    lineChartAndRadialBarsDataFill();
});