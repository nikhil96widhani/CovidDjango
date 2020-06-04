let radial_bars_options = {
    series: [],
    noData: {
        text: 'Loading...'
    },
    chart: {
        height: 315,
        type: 'radialBar',
        // animations: {
        //     enabled: true,
        //     easing: 'easeinout',
        //     speed: 800,
        //     animateGradually: {
        //         enabled: true,
        //         delay: 150
        //     },
        //     dynamicAnimation: {
        //         enabled: true,
        //         speed: 350
        //     }
        // }
    },
    // plotOptions: {
    //     radialBar: {
    //         dataLabels: {
    //             name: {
    //                 fontSize: '22px',
    //             },
    //             value: {
    //                 fontSize: '16px',
    //             },
    //             // total: {
    //             //     show: true,
    //             //     label: 'Total',
    //             //     formatter: function (w) {
    //             //         // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
    //             //         return current_total
    //             //     }
    //             // }
    //         }
    //     }
    // },
    labels: ['Active', 'Recovered', 'Deaths'],
};

let radial_bars = new ApexCharts(document.querySelector("#radial-bars-div"), radial_bars_options);
radial_bars.render();

function radialBarsFill() {
    let region_name = $('#region_selector').val();
    let url = '/api/linechart';
    let data = {'region_name': region_name, 'days':1}

    $.getJSON(url, data, function (response) {
        current_total = response.total[0];
        current_recovered = response.recovered[0];
        current_deaths = response.deaths[0];

        console.log(response)

        let c_r_percentage = Math.floor((current_recovered / current_total) * 100);
        let c_d_percentage = Math.floor((current_deaths / current_total) * 100);
        let c_a_percentage = 100 - (c_r_percentage + c_d_percentage);

        radial_bars.updateSeries([c_a_percentage, c_r_percentage, c_d_percentage])
        radial_bars.updateOptions({
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        total: {
                            show: true,
                            label: 'Total',
                            formatter: function (w) {
                                return current_total
                            }
                        }
                    }
                }
            },
        });
    });
}

$(document).ready(function () {
    radialBarsFill();
});

$('#region_selector').change(function () {
    radialBarsFill();
});