let compare_chart_options = {
    chart: {
        height: 250,
        type: 'line',
    },
    series: [],
    noData: {
        text: 'Select Countries and Click on Compare!'
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: [3, 3],
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

function compareChartUpdateSeriesAndOptions(radio_selection_value) {
    let country_1_name = $('#compare-country-1').val()
    let country_2_name = $('#compare-country-2').val()

    if (radio_selection_value == 'total') {
        $('#comparison-chart-title-2').html(" - Total Cases")
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
    if (radio_selection_value == 'recovered') {
        $('#comparison-chart-title-2').html(" - Recovered Cases")
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
    if (radio_selection_value == 'active') {
        $('#comparison-chart-title-2').html(" - Active Cases")
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
    if (radio_selection_value == 'deaths') {
        $('#comparison-chart-title-2').html(" - Deaths")
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
    let url = '/api/comparison/';

    compare_chart.updateOptions({
        noData: {
            text: 'Loading...'
        }
    })
    compare_chart.updateSeries([])

    let country1 = $('#compare-country-1').val()
    let country2 = $('#compare-country-2').val()

    let data = {'country1': country1, 'country2': country2}
    // $('#comparison-chart-title-1').html(country_1_name + " vs " + country_2_name)
    $.getJSON(url, data, function (response) {
        country_1_response = response.country_1_data;
        country_2_response = response.country_2_data;
        compareChartUpdateSeriesAndOptions($("input[name='cases-radio-buttons']:checked").val())
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
}

$('#country-compare-button').click(function () {
    countryCompareDataCallAndFill();
});

$("input[name='cases-radio-buttons']").change(function () {
    let radio_selection_value = $(this).val()
    compareChartUpdateSeriesAndOptions(radio_selection_value);
});