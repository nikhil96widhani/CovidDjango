$('#region_selector').change(function () {
    loadWorldStats();
});


$(function() {
    loadWorldStats();
   });


function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

function percentage(a, b) {
    var total = a + b;
    return String(((100 * a) / total).toFixed(2));
}

function loadWorldStats() {
    var region_name = document.getElementById('region_selector').value;

    if (region_name === '') {
        region_name = 'World';

    } else {
        //pass
    }

    var getworldstats = '/api/worldstats';

    $.ajax({
        methood: "GET",
        url: getworldstats,
        data: {'region': region_name},
        success: function (data) {

            document.getElementById("total_cases").innerHTML = number_format(data[0].cases.total);
            var case_increase = number_format(data[0].cases.new);

            document.getElementById("new_total_cases").innerHTML =
                '<i class="fas fa-long-arrow-alt-up text-danger"></i>' + ' ' + case_increase;

            document.getElementById("total_deaths").innerHTML = number_format(data[0].deaths.total);
            var case_increase2 = number_format(data[0].deaths.new);

            document.getElementById("new_total_deaths").innerHTML =
                '<i class="fas fa-long-arrow-alt-up text-danger"></i>' + ' ' + case_increase2;

            var death_percentage = percentage(data[0].deaths.total, data[0].cases.recovered);
            document.getElementById("deathpercentage1").innerHTML = death_percentage + '%';
            document.getElementById("deathpercentage2").style.width = death_percentage + '%';

            var recovered_percentage = percentage(data[0].cases.recovered, data[0].deaths.total);
            document.getElementById("recoveredpercentage1").innerHTML = recovered_percentage + '%';
            document.getElementById("recoveredpercentage2").style.width = recovered_percentage + '%';

            document.getElementById("total_recovered").innerHTML = number_format(data[0].cases.recovered);

            document.getElementById("total_active").innerHTML = number_format(data[0].cases.active);

            document.getElementById("total_critical").innerHTML = number_format(data[0].cases.critical);

        },
        error: function (error_data) {
            console.log("error");
            console.log(error_data);
        }

    }).done(function () {
        //on return, add here

    });
}


// $(document).ready(function loadPage() {
//     loadWorldStats();
// });
