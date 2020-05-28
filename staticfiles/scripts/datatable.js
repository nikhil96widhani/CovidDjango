// function loadTable() {
//
//     var getNewsData = '/api/tabledata';
//
//     $.ajax({
//         methood: "GET",
//         url: getNewsData,
//         data: {region: null},
//         success: function (data) {
//             console.log(data)
//             var trHTML = '';
//             $.each(data, function (i, item) {
//                 trHTML += '<tr><td>' + item.country + '</td><td>' + item.cases.total + '</td><td>' + item.cases.new + '</td><td>' + item.deaths.total + '</td><td>' + item.deaths.new + '</td><td>' + item.cases.recovered + '</td></tr>';
//             });
//             $('#dataTable').append(trHTML);
//         },
//         error: function (error_data) {
//             console.log("error");
//             console.log(error_data)
//         }
//
//     }).done(function () {
//         //on return, add here
//         $("#spinner").hide()
//     });
// }
// $(document).ready(function () {
//         loadTable();
//         $('#dataTable').DataTable(
//             {
//                 order: [1, 'desc'],
//                 "pagingType": "full"
//             }
//         );
//     });


// Call the dataTables jQuery plugin
$(document).ready(function () {
    $('#dataTable').DataTable(
        {
            order: [1, 'desc'],
            "pagingType": "full"
        }
    );
});