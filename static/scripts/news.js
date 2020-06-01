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
                    '<div class="row"><div class="card shadow mb-3"><div class="card-body"><div class="row no-gutters align-items-center">'
                    +
                    '<div class="col-sm-3"><img class="img-fluid img-rounded" src="' + data[article].urlToImage + '"alt=""></div>'
                    +
                    '<span class="col-sm-8 mx-auto my-2"><a target="_blank" rel="nofollow" href="' + data[article].url + '"><div class="text-primary lead font-weight-bold">' + data[article].title + '</div></a>'
                    +
                    '<span class="small text-gray-500">From: ' + data[article].source.name + ' , ' + get_time(data[article].publishedAt) + ' </span>'
                    +
                    '<div class="mt-2 text-medium-size text-gray-800">' + data[article].description + '.... <a target="_blank" rel="nofollow" href="' + data[article].url + '"> read more</a></p>'
                    +
                    '</div></div></div></div></div>'
                );
            }
        },
        error: function (error_data) {
            console.log("error");
            console.log(error_data);
        }

    }).done(function () {
        //on return, add here
        $("#spinner_news").hide();
    });
}