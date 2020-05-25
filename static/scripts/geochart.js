google.charts.load('current', {
    'packages': ['geochart'],
    'mapsApiKey': 'AIzaSyDm0d0NBkHGqE1Uy5eoH07z_cr6pCKAkaA'
});


// $("#total_critical").ready(function () {
//     drawRegionsMap();
// });


jQuery(document).ready(checkContainer);

function checkContainer () {
  if($('#total_critical').is(':visible')){ //if the container is visible on the page
    drawRegionsMap();  //Adds a grid to the html
  } else {
    setTimeout(checkContainer, 50); //wait 50 ms, then try again
  }
}


// google.charts.setOnLoadCallback(drawRegionsMap);
// $(window).resize(drawRegionsMap);



// function drawRegionsMap() {
//
//     var data_geochart = $.ajax({
//             url: "/api/geochart",
//             dataType: "json",
//             async: false
//         }).responseJSON;
//
//     var data = google.visualization.arrayToDataTable(data_geochart);
//
//     var width = document.getElementById("regions_div").offsetWidth;
//     var height = document.getElementById("regions_div").offsetHeight;
//
//     var options = {
//         legend: 'none',
//         colorAxis: {
//             // Custom scale and colour https://www.colorhexa.com/2e4585 #}
//             values: [3000, 10000, 30000, 50000, 100000, 150000, 200000, 1000000],
//             colors: ['#d5dcf1', '#c7d0eb', '#b8c4e6', '#9bacdc', '#7e94d2', '#617cc8', '#3d5cb1', '#334d94'],
//             // Set Scale
//             // colors: ['#C9D5F5', '#2E4585']
//         },
//         datalessRegionColor: '#f8f8f8',
//         defaultColor: '#f8f8f8',
//         width: width,
//         height: height,
//         // show region based on selection
//         // region: 'US'
//
//     };
//
//     var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
//
//     chart.draw(data, options);
//
//     // function resize() {
//     //     var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
//     //
//     //     chart.draw(data, options);
//     // }
//     //
//     // window.onload = resize;
//     // window.onresize = resize;
//
// }


function drawRegionsMap() {

    var width = document.getElementById("regions_div").offsetWidth;
    var height = document.getElementById("regions_div").offsetHeight;

    $.ajax({
        methood: "GET",
        url: '/api/geochart',
        dataType: "json",
        success: function (data_g) {
            var data = google.visualization.arrayToDataTable(data_g);

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

        },
        error: function (error_data) {
            console.log("error loading geo chart");
            console.log(error_data);
        }

    }).done(function () {
        //on return, add here
    });
}

