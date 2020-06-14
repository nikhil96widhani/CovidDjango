let compare_chart_options = {
    chart: {
        height: 250,
        type: 'line',
    },
    series: [],
    noData: {
        text: 'Loading...'
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: [3,3],
        curve: 'straight',
    },
    xaxis: {
        type: 'datetime'
    },
    yaxis: {
        labels: {
            show: false
        },
    },
    markers: {
        size: 0,
        hover: {
            sizeOffset: 6
        }
    },
    grid: {
        borderColor: '#f1f1f1',
    },
    fill: {
        type: ['solid', 'solid'],
    },
    // colors: ['rgba(78, 115, 223, 1)', 'rgb(255,202,20)', 'rgba(28, 200, 138, 1)', 'rgba(231, 74, 59, 1)'],
};

let compare_chart = new ApexCharts(document.querySelector("#country-comparison-chart-div"), compare_chart_options);
compare_chart.render();

var country_1_response;
var country_2_response;

function compareChartUpdateSeries() {
    let country_1_name = $('#compare-country-1').val()
    let country_2_name = $('#compare-country-2').val()
    let cases_selection = $('#cases-selection').val()

    // console.log(cases_selection)

    if (cases_selection == 'total') {
        compare_chart.updateSeries([
            {
                name: country_1_name,
                data: country_1_response.total
            },
            {
                name: country_2_name,
                data: country_2_response.total
            },
        ])
        compare_chart.updateOptions({
            colors: ['rgb(0,48,255)', 'rgb(0,235,255)']
        })
    }
    if (cases_selection == 'recovered') {
        compare_chart.updateSeries([
            {
                name: country_1_name,
                data: country_1_response.recovered
            },
            {
                name: country_2_name,
                data: country_2_response.recovered
            },
        ])
        compare_chart.updateOptions({
            colors: ['rgb(23,92,0)', 'rgb(76,255,124)']
        })
    }
    if (cases_selection == 'active') {
        compare_chart.updateSeries([
            {
                name: country_1_name,
                data: country_1_response.active
            },
            {
                name: country_2_name,
                data: country_2_response.active
            },
        ])
        compare_chart.updateOptions({
            colors: ['rgb(142,111,0)', 'rgb(255,236,74)']
        })
    }
    if (cases_selection == 'deaths') {
        compare_chart.updateSeries([
            {
                name: country_1_name,
                data: country_1_response.deaths
            },
            {
                name: country_2_name,
                data: country_2_response.deaths
            },
        ])
        compare_chart.updateOptions({
            colors: ['rgb(121,0,0)', 'rgb(255,69,69)']
        })
    }
}

function countryCompareDataCallAndFill() {
    compare_chart.updateSeries([])

    let country_1 = $('#compare-country-1').val()
    let country_2 = $('#compare-country-2').val()

    let country_1_data = {'region_name': country_1, 'days': 60}
    let country_2_data = {'region_name': country_2, 'days': 60}

    $.getJSON(url, country_1_data, function (response) {
        country_1_response = response.line_chart_data;
        $.getJSON(url, country_2_data, function (response) {
            country_2_response = response.line_chart_data;
            compareChartUpdateSeries()
            compare_chart.updateOptions({
                yaxis: {
                    labels: {
                        show: true,
                        formatter: function (value) {
                            return kmbtFormatter(value);
                        }
                    },
                },
                labels: country_1_response.dates
            })
        });
    });
}
