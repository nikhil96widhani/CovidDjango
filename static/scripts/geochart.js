google.charts.load('current', {
    'packages': ['geochart'],
    'mapsApiKey': 'AIzaSyDm0d0NBkHGqE1Uy5eoH07z_cr6pCKAkaA'
});

google.charts.setOnLoadCallback(drawRegionsMap);
$(window).resize(drawRegionsMap);

var data_geochart = $.ajax({
        url: "/api/geochart",
        dataType: "json",
        async: false
    }).responseJSON;

function drawRegionsMap() {

    var data = google.visualization.arrayToDataTable(data_geochart);

    var width = document.getElementById("regions_div").offsetWidth;
    var height = document.getElementById("regions_div").offsetHeight;

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
        width: width,
        height: height,
        // show region based on selection
        // region: 'US'

    };

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);

    // function resize() {
    //     var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
    //
    //     chart.draw(data, options);
    // }
    //
    // window.onload = resize;
    // window.onresize = resize;

}



