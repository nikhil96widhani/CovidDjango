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
        width: [3,3,3,3],
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
        // size: 0.3,
        hover: {
            sizeOffset: 6
        }
    },
    grid: {
        borderColor: '#f1f1f1',
    },
    colors: ['rgba(78, 115, 223, 1)', 'rgb(255,202,20)', 'rgba(28, 200, 138, 1)', 'rgba(231, 74, 59, 1)'],
};

let line_chart = new ApexCharts(document.querySelector("#line-chart-div"), line_chart_options);
line_chart.render();

let bar_chart_options = {
    series: [],
    noData: {
        text: 'Loading...'
    },
    chart: {
        type: 'bar',
        height: 300,
        stacked: true,
    },
    plotOptions: {
        bar: {
            columnWidth: '60%',
        }
    },
    colors: ['rgba(78, 115, 223, 1)', 'rgba(231, 74, 59, 1)', 'rgba(28, 200, 138, 1)'],
    dataLabels: {
        enabled: false
    },
    xaxis: {
        type: 'datetime'
    },
    yaxis: {
        labels: {
            show: false
        },
    },
    tooltip: {
        intersect: true
    }
}

let daily_bar_chart = new ApexCharts(document.querySelector('#bar-chart-div'), bar_chart_options);
daily_bar_chart.render();

// let total_cases_card_chart_options = {
//     series: [],
//     noData: {
//         text: 'Loading...'
//     },
//     chart: {
//         id: 'total-cases-card-chart',
//         group: 'card-graphs',
//         type: "line",
//         height: 60,
//         sparkline: {
//             enabled: true
//         }
//     },
//     stroke: {
//         width: 2,
//         curve: "smooth"
//     },
//     markers: {
//         size: 0
//     },
//     colors: ['#4e73df'],
//     xaxis: {
//         type: 'datetime'
//     },
//     yaxis: {
//         labels: {
//             show: false
//         },
//     },
//     tooltip: {
//         fixed: {
//             enabled: !1
//         },
//         y: {
//             title: {
//                 formatter: function (o) {
//                     return ""
//                 }
//             }
//         },
//         marker: {
//             show: !1
//         }
//     }
// };
//
// let total_cases_card_chart = new ApexCharts(document.querySelector("#total-cases-card-chart"), total_cases_card_chart_options);
// total_cases_card_chart.render();

function lineChartDataFill(total, active, recovered, deaths, dates) {
    line_chart.updateSeries([
        {
            name: "Total Cases",
            data: total
        },
        {
            name: "Active Cases",
            data: active
        },
        {
            name: "Recovered",
            data: recovered
        },
        {
            name: 'Deaths',
            data: deaths
        },
    ])
    line_chart.updateOptions({
        yaxis: {
            labels: {
                show: true,
                formatter: function (value) {
                    return kmbtFormatter(value);
                }
            },
        },
        labels: dates,
    })
}

function barChartDataFill(daily_total, daily_recovered, daily_deaths, dates) {
    daily_bar_chart.updateSeries([
        {
            name: "New Cases",
            data: daily_total,
        },
        {
            name: "Deaths",
            data: daily_deaths,
        },
        {
            name: "Recovered",
            data: daily_recovered,
        }
    ])
    daily_bar_chart.updateOptions({
        yaxis: {
            labels: {
                show: true,
                formatter: function (value) {
                    return kmbtFormatter(value);
                }
            },
        },
        labels: dates,
    })
}

// function cardChartsDataFill(card_total, card_active, card_recovered, card_deaths, card_dates) {
//     total_cases_card_chart.updateSeries([
//         {
//             name: "Total Cases",
//             data: card_total,
//         },
//     ])
//     total_cases_card_chart.updateOptions({
//         yaxis: {
//             labels: {
//                 show: false,
//                 formatter: function (value) {
//                     return kmbtFormatter(value);
//                 }
//             },
//         },
//         labels: card_dates,
//     })
// }

function cardStatsValueFill(current_total, current_active, current_recovered, current_deaths) {
    $('#current-total-value').html(numberWithCommas(current_total));
    $('#current-active-value').html(numberWithCommas(current_active));
    $('#current-recovered-value').html(numberWithCommas(current_recovered));
    $('#current-deaths-value').html(numberWithCommas(current_deaths));
}