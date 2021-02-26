// initiate the js on the page load.
var api_url = '/bitcoinapi_app/bitcoinapi_backend/public/api/getbitcoindata'

$( document ).ready(function() {
    $('.datepicker_to').datepicker({
        format: 'mm-dd-yyyy',
        endDate: '+0d',
    });

    $('.datepicker_from').datepicker({
        format: 'mm-dd-yyyy',
        endDate: '-1d',
    });
    $('.datepicker_to').datepicker('setDate', 'now');
    $('.datepicker_from').datepicker('setDate', '-10d');


    //get data from the api on the page load
    get_data_from_api();

    $( ".render_button" ).on( "click", function() {
        get_data_from_api();
    });
});

function get_data_from_api(){
    var date_to = $('.datepicker_to').val();
    var date_from = $('.datepicker_from').val();

    var data = {
        'date_to' : date_to,
        'date_from' : date_from,
    };
    $.ajax({
        method: 'POST',
        url: api_url,
        data: data,
        dataType: 'json',
        success: function(result) {
            console.log(result);
        },
    });
}