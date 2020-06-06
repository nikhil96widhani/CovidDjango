function loadWorldStats() {
    var region_name = document.getElementById('region_selector').value;

    var getworldstats;

    if (region_name === 'World') {
        getworldstats = 'https://disease.sh/v2/all?yesterday=false&allowNull=false';

    }
    else if (region_name === '') {
        getworldstats = 'https://disease.sh/v2/all?yesterday=false&allowNull=false';
    }
    else {
        getworldstats = 'https://disease.sh/v2/countries/' + region_name +
            '?yesterday=false&strict=true&allowNull=false';
    }

    $.ajax({
        methood: "GET",
        url: getworldstats,
        success: function (data) {

            // Block 1 Total Cases
            document.getElementById("total_cases").innerHTML = numberWithCommas(data.cases);
            var case_increase = numberWithCommas(data.todayCases);

            document.getElementById("new_total_cases").innerHTML =
                '<i class="fas fa-long-arrow-alt-up text-danger"></i>' + ' ' + case_increase;

            var active_percentage = percentage2(data.active, data.cases);
            document.getElementById("total_active").innerHTML = numberWithCommas(data.active);
            document.getElementById("activecasespercentage").style.width = active_percentage + '%';

            // Block 2 Total Deths
            document.getElementById("total_deaths").innerHTML = numberWithCommas(data.deaths);
            var case_increase2 = numberWithCommas(data.todayDeaths);

            document.getElementById("new_total_deaths").innerHTML =
                '<i class="fas fa-long-arrow-alt-up text-danger"></i>' + ' ' + case_increase2;

            var death_percentage = percentage(data.deaths, data.recovered);
            document.getElementById("deathpercentage1").innerHTML = death_percentage + '%';
            document.getElementById("deathpercentage2").style.width = death_percentage + '%';

            // Block 3 total Recovered
            document.getElementById("total_recovered").innerHTML = numberWithCommas(data.recovered);
            var case_increase3 = numberWithCommas(data.todayRecovered);

            document.getElementById("new_total_recovered").innerHTML =
                '<i class="fas fa-long-arrow-alt-up text-danger"></i>' + ' ' + case_increase3;

            var recovered_percentage = percentage(data.recovered, data.deaths);
            document.getElementById("recoveredpercentage1").innerHTML = recovered_percentage + '%';
            document.getElementById("recoveredpercentage2").style.width = recovered_percentage + '%';

            let current_total = data.cases;
            let current_recovered = data.recovered;
            let current_deaths = data.deaths;

            radialBarsFill(current_total, current_recovered, current_deaths);
        },
        error: function (error_data) {
            console.log("error");
            console.log(error_data);
        }

    }).done(function () {
        //on return, add here
    });
}

$(document).ready(function loadPage() {
    loadWorldStats();
});

$('#region_selector').change(function () {
    loadWorldStats();
});

