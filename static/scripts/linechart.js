google.charts.load('current', {'packages': ['line']});

google.charts.setOnLoadCallback(drawChart);
$(window).resize(drawChart);

var data_linechart = $.ajax({
    url: "/api/linechart",
    dataType: "json",
    async: false
}).responseJSON;

function drawChart() {

    var data = new google.visualization.DataTable();

    data.addColumn('string', 'day');
    data.addColumn('number', 'cases');
    data.addColumn('number', 'recovered');
    data.addColumn('number', 'deaths');

    data.addRows(data_linechart);

    var width = document.getElementById("linechart_div").offsetWidth;
    var height = document.getElementById("linechart_div").offsetHeight;

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

}
