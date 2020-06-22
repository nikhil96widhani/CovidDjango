function loadDataTable() {
    loadTable();
    load_footer();
}

function loadSynchedData() {
    let region_name = $('#region-selector').val();
    let url = '/api/historical/';
    let data = {'region_name': region_name}

    $.getJSON(url, data, function (response) {
        console.log(response)

        let total = response.line_chart_data.total;
        let active = response.line_chart_data.active;
        let recovered = response.line_chart_data.recovered;
        let deaths = response.line_chart_data.deaths;
        let line_chart_dates = response.line_chart_data.dates;

        let daily_cases = response.bar_chart_data.daily_cases;
        let daily_recovered = response.bar_chart_data.daily_recovered;
        let daily_deaths = response.bar_chart_data.daily_deaths;
        let bar_chart_dates = response.bar_chart_data.dates;

        cardStatsValueFill(response.card_data)
        barChartDataFill(daily_cases, daily_recovered, daily_deaths, bar_chart_dates)
        lineChartDataFill(total, active, recovered, deaths, line_chart_dates)
    });
}

loadSynchedData();
loadDataTable();
countryCompareDataCallAndFill();

$('#region-selector').change(function () {
    loadSynchedData();
})
