google.charts.load('current', {'packages': ['line']});
google.charts.setOnLoadCallback(drawChart);


function drawChart() {
    var data_linechart = $.ajax({
        url: "/api/linechart",
        dataType: "json",
        async: false
    }).responseJSON;

    var data = new google.visualization.DataTable();

    data.addColumn('string', 'day');
    data.addColumn('number', 'cases');
    data.addColumn('number', 'recovered');
    data.addColumn('number', 'deaths');

    data.addRows(data_linechart);

    var options = {
        legend: {position: 'none'}


    };

    var chart = new google.charts.Line(document.getElementById('linechart_material'));

    chart.draw(data, google.charts.Line.convertOptions(options));

}

window.addEventListener('resize', drawChart, false);