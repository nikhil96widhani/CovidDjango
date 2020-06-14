let region_name = 'World';
let url = '/api/linechart';
let data = {'region_name': region_name, 'days': 60}

$.getJSON(url, data, function (response) {
    let total = response.line_chart_data.total;
    let active = response.line_chart_data.active;
    let recovered = response.line_chart_data.recovered;
    let deaths = response.line_chart_data.deaths;
    let line_chart_dates = response.line_chart_data.dates;

    last_index = total.length - 1;

    let current_total = total[last_index];
    let current_active = active[last_index];
    let current_recovered = recovered[last_index];
    let current_deaths = deaths[last_index];

    let daily_cases = response.bar_chart_data.daily_cases;
    let daily_recovered = response.bar_chart_data.daily_recovered;
    let daily_deaths = response.bar_chart_data.daily_deaths;
    let bar_chart_dates = response.bar_chart_data.dates;

    let recovery_chances = Math.floor((current_recovered * 100) / (current_recovered + current_deaths))
    let recovery_death_chances = [recovery_chances, (100 - recovery_chances)]

    // let card_total = daily_cases.slice(-7);
    // let card_active = active.slice(-7);
    // let card_recovered = daily_recovered.slice(-7);
    // let card_deaths = daily_deaths.slice(-7);
    // let card_dates = bar_chart_dates.slice(-7);
    // console.log(dates)
    // console.log(total)

    cardStatsValueFill(current_total, current_active, current_recovered, current_deaths)
    cardChartsDataFill(daily_cases, daily_recovered, daily_deaths, bar_chart_dates, recovery_death_chances)
    lineChartDataFill(total, active, recovered, deaths, line_chart_dates)
    barChartDataFill(daily_cases, daily_recovered, daily_deaths, bar_chart_dates)
    countryCompareDataCallAndFill();
});

$('#cases-selection').change(function () {
    compareChartUpdateSeries();
});

$('#country-compare-button').click(function () {
    countryCompareDataCallAndFill();
});