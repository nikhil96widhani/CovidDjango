google.charts.load('current', {'packages': ['line']});

// NEW CODE START
jQuery(document).ready(checkContainer);

function checkContainer () {
  if($('#regions_div').is(':visible')){ //if the container is visible on the page
    drawLineChart();  //Adds a grid to the html
  } else {
    setTimeout(checkContainer, 50); //wait 50 ms, then try again
  }
}

function drawLineChart() {

    var width = document.getElementById("linechart_div").offsetWidth;
    var height = document.getElementById("linechart_div").offsetHeight;

    $.ajax({
        methood: "GET",
        url: '/api/linechart',
        dataType: "json",
        success: function (data_l) {
            var data = new google.visualization.DataTable();

            data.addColumn('string', 'day');
            data.addColumn('number', 'cases');
            data.addColumn('number', 'recovered');
            data.addColumn('number', 'deaths');

            data.addRows(data_l);

            var options = {
                legend: {position: 'none'},
                width: width,
                height: height,
                axes: {
                         x: {
                             0: { side: 'bottom', label: ""}
                         }
                    }

            };

            var chart = new google.charts.Line(document.getElementById('linechart_div'));

            chart.draw(data, google.charts.Line.convertOptions(options));

        },
        error: function (error_data) {
            console.log("error loading line chart");
            console.log(error_data);
        }

    }).done(function () {
        //on return, add here
    });
}
// NEW CODE END




// google.charts.setOnLoadCallback(drawChart);
// $(window).resize(drawChart);
//
// var data_linechart = $.ajax({
//     url: "/api/linechart",
//     dataType: "json",
//     async: false
// }).responseJSON;
//
//
//

// function drawChart() {
//
//     var data = new google.visualization.DataTable();
//
//     data.addColumn('string', 'day');
//     data.addColumn('number', 'cases');
//     data.addColumn('number', 'recovered');
//     data.addColumn('number', 'deaths');
//
//     data.addRows(data_linechart);
//
//     var width = document.getElementById("linechart_div").offsetWidth;
//     var height = document.getElementById("linechart_div").offsetHeight;
//
//     var options = {
//         legend: {position: 'none'},
//         width: width,
//         height: height,
//         axes: {
//                  x: {
//                      0: { side: 'bottom', label: ""}
//                  }
//             }
//
//     };
//
//     var chart = new google.charts.Line(document.getElementById('linechart_div'));
//
//     chart.draw(data, google.charts.Line.convertOptions(options));
//
// }
