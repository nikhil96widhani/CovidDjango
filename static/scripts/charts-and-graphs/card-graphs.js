let total_cases_card_chart_options = {
    series: [],
    // noData: {
    //     text: 'Loading...'
    // },
    chart: {
        // id: 'line-1',
        // group: 'cards',
        type: "line",
        height: 60,
        sparkline: {
            enabled: true
        }
    },
    stroke: {
        width: 2,
        curve: "smooth"
    },
    markers: {
        size: 0
    },
    colors: ['#4e73df'],
    xaxis: {
        type: 'datetime'
    },
    yaxis: {
        labels: {
            minWidth: 40,
            show: false,
            formatter: function (value) {
                return kmbtFormatter(value);
            }
        },
    },
    tooltip: {
        fixed: {
            enabled: !1
        },
        y: {
            title: {
                formatter: function (o) {
                    return ""
                }
            }
        },
        marker: {
            show: !1
        }
    }
};
let total_cases_card_chart = new ApexCharts(document.querySelector("#total-cases-card-chart"), total_cases_card_chart_options);
total_cases_card_chart.render();

let recovered_cases_card_chart_options = {
    series: [],
    // noData: {
    //     text: 'Loading...'
    // },
    chart: {
        // id: 'line-3',
        // group: 'cards',
        type: "line",
        height: 60,
        sparkline: {
            enabled: !0
        }
    },
    stroke: {
        width: 2,
        curve: "smooth"
    },
    markers: {
        size: 0
    },
    colors: ['#1cc88a'],
    xaxis: {
        type: 'datetime'
    },
    yaxis: {
        labels: {
            minWidth: 40,
            show: false,
            formatter: function (value) {
                return kmbtFormatter(value);
            }
        },
    },
    tooltip: {
        fixed: {
            enabled: !1
        },
        y: {
            title: {
                formatter: function (o) {
                    return ""
                }
            }
        },
        marker: {
            show: !1
        }
    }
};
let recovered_cases_card_chart = new ApexCharts(document.querySelector("#recovered-cases-card-chart"), recovered_cases_card_chart_options);
recovered_cases_card_chart.render();

let deaths_card_chart_options = {
    series: [],
    // noData: {
    //     text: 'Loading...'
    // },
    chart: {
        // id: 'line-4',
        // group: 'cards',
        type: "line",
        height: 60,
        sparkline: {
            enabled: !0
        }
    },
    stroke: {
        width: 2,
        curve: "smooth"
    },
    markers: {
        size: 0
    },
    colors: ['#e74a3b'],
    xaxis: {
        type: 'datetime'
    },
    yaxis: {
        labels: {
            minWidth: 40,
            show: false,
            formatter: function (value) {
                return kmbtFormatter(value);
            }
        },
    },
    tooltip: {
        fixed: {
            enabled: !1
        },
        y: {
            title: {
                formatter: function (o) {
                    return ""
                }
            }
        },
        marker: {
            show: !1
        }
    }
};
let deaths_card_chart = new ApexCharts(document.querySelector("#deaths-card-chart"), deaths_card_chart_options);
deaths_card_chart.render();

// let active_cases_card_chart_options = {
//     series: [],
//     // noData: {
//     //     text: 'Loading...'
//     // },
//     chart: {
//         // id: 'line-2',
//         // group: 'cards',
//         type: "line",
//         height: 60,
//         sparkline: {
//             enabled: !0
//         }
//     },
//     stroke: {
//         width: 2,
//         curve: "smooth"
//     },
//     markers: {
//         size: 0
//     },
//     colors: ['#f6c23e'],
//     xaxis: {
//         type: 'datetime'
//     },
//     yaxis: {
//         labels: {
//             minWidth: 40,
//             show: false,
//             formatter: function (value) {
//                 return kmbtFormatter(value);
//             }
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
active_cases_card_chart_options = {
    series: [90, 10],
    chart: {
        type: 'donut',
        width: 70,
        height: 70,
        sparkline: {
            enabled: true
        }
    },
    colors: ['#1cc88a', '#e74a3b'],
    fill: {
        type: ['gradient', 'gradient'],
    },
    labels: ['Recovery Chances', 'Death Chances'],
    stroke: {
        width: 1
    },
    tooltip: {
        fixed: {
            enabled: false
        },
        y: {
            formatter: function (val) {
                return val + "%"
            }
        },
    }
};
let active_cases_card_chart = new ApexCharts(document.querySelector("#active-cases-card-chart"), active_cases_card_chart_options);
active_cases_card_chart.render();

function cardChartsDataFill(card_total, card_recovered, card_deaths, card_dates, recovery_death_chances) {
    total_cases_card_chart.updateSeries([
        {
            name: "Total Cases",
            data: card_total,
        },
    ])
    total_cases_card_chart.updateOptions({
        labels: card_dates,
    })
    // active_cases_card_chart.updateSeries([
    //     {
    //         name: "Active",
    //         data: card_active,
    //     },
    // ])
    // active_cases_card_chart.updateOptions({
    //     labels: card_dates,
    // })
    active_cases_card_chart.updateSeries(recovery_death_chances)
    active_cases_card_chart.updateOptions({
        labels: ['Recovery Chances', 'Death Chances'],
    })
    recovered_cases_card_chart.updateSeries([
        {
            name: "Recovered",
            data: card_recovered,
        },
    ])
    recovered_cases_card_chart.updateOptions({
        labels: card_dates,
    })
    deaths_card_chart.updateSeries([
        {
            name: "Deaths",
            data: card_deaths,
        },
    ])
    deaths_card_chart.updateOptions({
        labels: card_dates,
    })
}
