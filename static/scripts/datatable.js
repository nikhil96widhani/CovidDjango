// uses formatting_functions.js


function DataTableFormat(){
    $('#dataTable').DataTable(
            {
                order: [1, 'desc'],
                "pagingType": "full",
  //               "columnDefs": [
  //   { "orderable": false, "targets": 0 }
  // ]
            }

        );
}



function loadTable() {

    var getNewsData = 'https://disease.sh/v2/countries?yesterday=false&sort=cases&allowNull=false';

    $.ajax({
        methood: "GET",
        url: getNewsData,
        success: function (data) {
            var trHTML = '';
            $.each(data, function (i, item) {
                trHTML += '<tr><td>' + item.country + '</td>' +
                    '<td>' + numberWithCommas(item.cases) + '</td>' +
                    '<td class="text-primary"> +' + numberWithCommas(item.todayCases) + '</td>' +
                    '<td>' + numberWithCommas(item.deaths) + '</td>' +
                    '<td class="text-danger"> +' + numberWithCommas(item.todayDeaths) + '</td>' +
                    '<td>' + numberWithCommas(item.recovered) + '</td>'+
                    '<td>' + numberWithCommas(item.active) + '</td>'+
                    '<td>' + numberWithCommas(item.critical) + '</td>'+
                    '<td>' + numberWithCommas(item.casesPerOneMillion) + '</td>'+
                    '<td>' + numberWithCommas(item.deathsPerOneMillion) + '</td></tr>';
            });
            $('#datatable-ajax').empty().append(trHTML);
            DataTableFormat();
        },
        error: function (error_data) {
            console.log("error");
            console.log(error_data)
        }

    }).done(function () {
        //on return, add here
    });
}

function load_footer() {

    var getTotalData = 'https://disease.sh/v2/all?yesterday=false&allowNull=true';

    $.ajax({
        methood: "GET",
        url: getTotalData,
        success: function (data) {
            // console.log(data)
            var trHTML = '';
                trHTML += '<tr><td>Total</td>' +
                    '<td>' + numberWithCommas(data.cases) + '</td>' +
                    '<td class="text-primary"> +' + numberWithCommas(data.todayCases) + '</td>' +
                    '<td>' + numberWithCommas(data.deaths) + '</td>' +
                    '<td class="text-danger"> +' + numberWithCommas(data.todayDeaths) + '</td>' +
                    '<td>' + numberWithCommas(data.recovered) + '</td>'+
                    '<td>' + numberWithCommas(data.active) + '</td>'+
                    '<td>' + numberWithCommas(data.critical) + '</td>'+
                    '<td>' + numberWithCommas(data.casesPerOneMillion) + '</td>'+
                    '<td>' + numberWithCommas(data.deathsPerOneMillion) + '</td></tr>';
            $('#datatable-footer-ajax').empty().append(trHTML);
            // DataTableFormat();
        },
        error: function (error_data) {
            console.log("error");
            console.log(error_data)
        }

    }).done(function () {
        //on return, add here
        $("#datatable_spinner").hide()
    });
}


jQuery(document).ready(checkContainer);

function checkContainer () {
  if($('#total_recovered').is(':visible')){ //if the container is visible on the page
      loadTable();
      load_footer();  //Adds a grid to the html
  } else {
    setTimeout(checkContainer, 50); //wait 50 ms, then try again
  }
}




// $(document).ready(function () {
//         loadTable();
//         load_footer();
//         // $('#dataTable').DataTable(
//         //     {
//         //         order: [1, 'desc'],
//         //         "pagingType": "full"
//         //     }
//         // );
//     });


// Call the dataTables jQuery plugin
// $(document).ready(function () {
//     $('#dataTable').DataTable(
//         {
//             order: [1, 'desc'],
//             "pagingType": "full"
//         }
//     );
// });