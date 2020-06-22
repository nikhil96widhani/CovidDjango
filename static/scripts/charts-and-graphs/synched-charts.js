recovery_chances_death_chances_chart_options = {
    series: [],
    chart: {
        type: 'donut',
        width: 70,
        height: 70,
        sparkline: {
            enabled: true
        }
    },
    colors: ['rgba(28, 200, 138, 1)', 'rgba(231, 74, 59, 1)'],
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
let recovery_chances_death_chances_chart = new ApexCharts(document.querySelector("#recovery-chances-death-chances-chart-div"), recovery_chances_death_chances_chart_options);
recovery_chances_death_chances_chart.render();

let bar_chart_options = {
    series: [],
    noData: {
        text: 'Loading...'
    },
    chart: {
        type: 'bar',
        height: 278,
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

let line_chart_options = {
    series: [],
    noData: {
        text: 'Loading...'
    },
    chart: {
        height: 300,
        type: 'line',
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
    colors: ['rgba(78, 115, 223, 1)', 'rgba(246, 194, 62, 1)', 'rgba(231, 74, 59, 1)', 'rgba(28, 200, 138, 1)'],
};
let line_chart = new ApexCharts(document.querySelector("#line-chart-div"), line_chart_options);
line_chart.render();

function recoveryDeathChancesChartDataFill(recovery_death_chances) {
    recovery_chances_death_chances_chart.updateSeries(recovery_death_chances)
    recovery_chances_death_chances_chart.updateOptions({
        labels: ['Recovery Chances', 'Death Chances'],
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

function cardStatsValueFill(card_data) {
    $('#current-total-value').html(numberWithCommas(card_data.current_total));
    $('#current-active-value').html(numberWithCommas(card_data.current_active));
    $('#current-recovered-value').html(numberWithCommas(card_data.current_recovered));
    $('#current-deaths-value').html(numberWithCommas(card_data.current_deaths));

    let progress_active_percentage = card_data.progress_active_percentage + '%'
    let progress_recovered_percentage = card_data.progress_recovered_percentage + '%'
    let progress_deaths_percentage = card_data.progress_deaths_percentage + '%'

    $('#progress-active-percentage').css('width', progress_active_percentage).html(progress_active_percentage)
    $('#progress-recovered-percentage').css('width', progress_recovered_percentage).html(progress_recovered_percentage)
    $('#progress-deaths-percentage').css('width', progress_deaths_percentage).html(progress_deaths_percentage)


    let up_arrow = '<i class="fas fa-long-arrow-alt-up text-danger pl-2 pr-1"></i>'
    let down_arrow = '<i class="fas fa-long-arrow-alt-down text-danger pl-2 pr-1">'

    $('#total-cases-change-value').html(up_arrow + numberWithCommas(card_data.total_cases_change))
    $('#active-cases-change-value').html(up_arrow + numberWithCommas(card_data.active_cases_change))
    $('#recovered-cases-change-value').html(up_arrow + numberWithCommas(card_data.recovered_cases_change))
    $('#deaths-change-value').html(up_arrow + numberWithCommas(card_data.deaths_change))

    recoveryDeathChancesChartDataFill(card_data.recovery_death_chances)
}