$("#news-button-2").click(function () {
    $("#latest-news-2").empty();
    loadNews_new();
});

$('#region_selector').change(function () {
    $("#latest-news-2").empty();
    loadNews_new();
});


function loadNews_new() {
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
                console.log(data[article])
                $("#latest-news-2").append(
                    '<div class="row"><div class="card shadow mb-4"><div class="card-body"><div class="row no-gutters align-items-center">'
                    +
                    '<div class="col-sm-3"><img class="img-fluid img-rounded" src="' + data[article].urlToImage + '"alt=""></div>'
                    +
                    '<div class="col-sm-8 mx-auto my-2"><div class="text-primary lead">' + data[article].title + '</div>'
                    +
                    '<small class="text-muted">Last Updated ' + get_time(data[article].publishedAt) + '</small><p class="mt-3">' + data[article].description + '</p>'
                    +
                    '<a target="_blank" rel="nofollow" href="' + data[article].url + '">Read More....</a></div></div></div></div></div>'
                );
            }
        },
        error: function (error_data) {
            console.log("error");
            console.log(error_data);
        }

    });
}