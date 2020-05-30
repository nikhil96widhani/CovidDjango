$("#news_button").click(function () {
    $("#latest_news").empty();
    loadNews();
});

$('#region_selector').change(function () {
    $("#latest_news").empty();
    loadNews();
});

function get_time(time) {
    var time_start = new Date();
    var time_end = new Date(time);

    var Difference_In_Time = time_start.getTime() - time_end.getTime().toFixed(0);
    var Difference_In_Minute = Difference_In_Time / (1000 * 3600);
    var Difference_In_Days = Math.trunc(Difference_In_Time / (1000 * 3600 * 24));

    var difference;

    if (Difference_In_Days >= 1) {
        difference = Difference_In_Days + ' days ago';
    } else if (Difference_In_Minute >= 1) {
        difference = Math.trunc(Difference_In_Minute) + ' hrs ago';
    } else {

        difference = Math.trunc(Difference_In_Minute * 100) + ' mins ago';
    }
    return String(difference);
}

function loadNews() {
    var region_name = document.getElementById('region_selector').value;

    if (region_name === '') {
        region_name = 'World';

    } else {
        //pass
    }

    var getNewsData = '/api/news';

    $.ajax({
        methood: "GET",
        url: getNewsData,
        data: {'region': region_name},
        success: function (data) {
            for (var article in data) {
                $("#latest_news").append(
                    '<a class="dropdown-item d-flex align-items-center" target="_blank" href=' + data[article].url + '>' +
                    '<div class="mr-3">' +
                    '<div class="icon-circle bg-primary">' +
                    '<img class="rounded-circle img-thumbnail" width="100px" height="100px" src="' + data[article].urlToImage + '">' +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<div class="small text-gray-500">From: ' + data[article].source.name + ' : ' + get_time(data[article].publishedAt) + ' </div>' +
                    '<span class="font-weight-bold">' + data[article].title + '</span>' +
                    '</div>' +
                    '</a>'
                );
            }
        },
        error: function (error_data) {
            console.log("error");
            console.log(error_data);
        }

    }).done(function () {
        //on return, add here
        $("#spinner").hide();
    });
}