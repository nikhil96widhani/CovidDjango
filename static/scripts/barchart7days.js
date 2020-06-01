jQuery(document).ready(checkContainer);

function checkContainer () {
  if($('#total_recovered').is(':visible')){ //if the container is visible on the page
    drawBarchart7days();  //Adds a grid to the html
  } else {
    setTimeout(checkContainer, 50); //wait 50 ms, then try again
  }
}

function drawBarchart7days() {

    $.ajax({
        methood: "GET",
        url: '/api/barchart',
        dataType: "json",
        success: function (data) {
            var options = {
              series: [{
                name: 'No of New Cases',
                data: data[1]
              }],
              colors:['#4e73df'],
              chart: {
                type: 'bar',
                height: 350
              },
              plotOptions: {
                bar: {
                  horizontal: true,
                  dataLabels: {
                    position: 'top',
                  },
                }
              },
              dataLabels: {
                enabled: true,
                offsetX: -6,
                style: {
                  fontSize: '12px',
                  colors: ['#fff']
                }
              },
              xaxis: {
                categories: data[0],
              }
            };

            var chart = new ApexCharts(document.querySelector("#barchart_7days"), options);
            chart.render();

        },
        error: function (error_data) {
            console.log("error loading geo chart");
            console.log(error_data);
        }

    }).done(function () {
        $("#world_overview_spinner").hide()
        //on return, add here
    });
}

