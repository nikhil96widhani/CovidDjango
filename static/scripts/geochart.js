google.charts.load('current', {
    'packages': ['geochart'],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    'mapsApiKey': 'AIzaSyDm0d0NBkHGqE1Uy5eoH07z_cr6pCKAkaA'
});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
    var data_geochart = $.ajax({
        url: "/api/geochart",
        dataType: "json",
        async: false
    }).responseJSON;

    var data = google.visualization.arrayToDataTable(data_geochart);

    var options = {
        legend: 'none',
        colorAxis: {
            // Custom scale and colour https://www.colorhexa.com/2e4585 #}
            values: [3000, 10000, 30000, 50000, 100000, 150000, 200000, 1000000],
            colors: ['#d5dcf1', '#c7d0eb', '#b8c4e6', '#9bacdc', '#7e94d2', '#617cc8', '#3d5cb1', '#334d94'],
            // Set Scale
            // colors: ['#C9D5F5', '#2E4585']
        },
        datalessRegionColor: '#f8f8f8',
        defaultColor: '#f8f8f8',
        // show region based on selection
        // region: 'US'

    };

    function resize() {
        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
    }

    window.onload = resize;
    window.onresize = resize;
    // window.addEventListener('resize', drawRegionsMap, false);

}