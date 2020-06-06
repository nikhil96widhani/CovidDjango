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
    yaxis: {
      labels: {
        formatter: function (value) {
          return kmbtFormatter(value);
        }
      },
    },
    markers: {
        size: 0.3,
        hover: {
            sizeOffset: 6
        }
    },
    grid: {
        borderColor: '#f1f1f1',
    },
    // colors: ['rgba(0,143,251,0.85)', 'rgba(0, 227, 150, 0.85)', 'rgba(255,47,47,0.85)'],
    colors: ['rgba(78, 115, 223, 1)', 'rgba(28, 200, 138, 1)', 'rgba(231, 74, 59, 1)'],
    // colors: ['#4e73df', '#1cc88a', '#e74a3b'],
};

let triple_line_chart = new ApexCharts(document.querySelector("#triple-line-chart-div"), line_chart_options);
triple_line_chart.render();

function lineChartDataFill() {
    let region_name = document.getElementById('region_selector').value;
    let url = '/api/linechart';
    let data = {'region_name': region_name, 'days':60}

    $.getJSON(url, data, function (response) {
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
    });
}

// $(document).ready(function () {
//     lineChartDataFill();
// });

$('#region_selector').change(function () {
    lineChartDataFill();
});