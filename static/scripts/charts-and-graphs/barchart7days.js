// function checkContainer() {
//     if ($('#total_recovered').is(':visible')) { //if the container is visible on the page
//         drawBarchart7days();  //Adds a grid to the html
//     } else {
//         setTimeout(checkContainer, 50); //wait 50 ms, then try again
//     }
// }
// jQuery(document).ready(checkContainer);

var options = {
    series: [],
    noData: {
        text: 'Loading...'
    },
    yaxis: {
        show: false,
    },
    // colors: ['#003f5c', '#374c80', '#7a5195', '#bc5090', '#ef5675', '#ff764a', '#ffa600', '#f95d6a', '#ff7c43', '#ffa600'],
    colors: ['#4e73df'],
    chart: {
        height: 300,
        type: 'bar',
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            horizontal: true,
            dataLabels: {
                position: 'top',
            },
        }
    },
};

var bar_chart_7_days = new ApexCharts(document.querySelector("#barchart_7days"), options);
bar_chart_7_days.render();

function drawBarchart7days() {
    $.ajax({
        methood: "GET",
        url: '/api/barchart',
        dataType: "json",
        success: function (data) {
            bar_chart_7_days.updateSeries([{
                name: 'No of New Cases',
                data: data[1]
            }])
            bar_chart_7_days.updateOptions({
                yaxis: {
                    show: true,
                },
                dataLabels: {
                    enabled: true,
                    offsetX: 40,
                    style: {
                        fontSize: '12px',
                        colors: ['#595959']
                    },
                    formatter: function (value) {
                        return kmbtFormatter(value);
                    }
                },
                xaxis: {
                    categories: data[0],
                    labels: {
                        formatter: function (value) {
                            return kmbtFormatter(value);
                        }
                    }
                },
            })
        },
        error: function (error_data) {
            console.log("error loading geo chart");
            console.log(error_data);
        }

    }).done(function () {
        // $("#world_overview_spinner").hide()
        //on return, add here
    });
}

// $(document).ready(function () {
//     drawBarchart7days();
// });
