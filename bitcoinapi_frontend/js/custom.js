/**
 * api url change it accordind to the link with your local url
 */
var api_url = '/bitcoinapi_app/bitcoinapi_backend/public/api/getbitcoindata'
var chart_object = {};

// initiate the datapicker function so that it can load data on the page load.

$( document ).ready(function() {
    $('.datepicker_to').datepicker({
        //format and end date so that a user cannot select the date greater than todays date
        format: 'yyyy-mm-dd',
        endDate: '+0d',
    });

    $('.datepicker_from').datepicker({
        format: 'yyyy-mm-dd',
        //specifying end date so a maximum date a user can select is 1 less than the todays date
        endDate: '-1d',
    });

    //setting todays date
    $('.datepicker_to').datepicker('setDate', 'now');

    //initially setting date 10 days less than todays date
    $('.datepicker_from').datepicker('setDate', '-10d');


    //get data from the api on the page load
    get_data_from_api();

    //event binding on render button
    $( ".render_button" ).on( "click", function() {
        get_data_from_api();
    });
});

//main function to get the data from our api and render it in our chart
function get_data_from_api(){
    //get to and from date for filtering our data
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
            plotting_the_chart(result);
        },

    });
}

//render the chart

function plotting_the_chart(data){
    var plotting_data = data['bpi'];
    var plotting_date=[];
    var plotting_price=[];
    var date;

    //prepare datasets
    for (date in plotting_data){

        //data for x-axis (date)
        plotting_date.push(date);

        //plotting for y-axis(price in usd)
        plotting_price.push(plotting_data[date]);
    }

    //configuring for our chart
    var config = {
        type: 'line',
        data: {
            labels: plotting_date,
            datasets: [{
                label: 'Price',
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,0,1)",
                borderColor: "rgba(81, 150, 240,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderWidth: 1,
                borderJoinStyle: 'miter',
                pointBackgroundColor: "#fff",
                pointBorderWidth: 5,
                pointHoverRadius: 10,
                pointHoverBackgroundColor: "rgba(220,220,220,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 3,
                pointRadius: 1,
                pointHitRadius: 2,
                data: plotting_price,
                spanGaps: false,
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Bitcoin Price'
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    },
                    gridLines: {
                        display: false
                    },

                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Price'
                    },
                    gridLines: {
                        display: false
                    },
                }]
            }
        }
    };

    var ctx = document.getElementById('myChart').getContext('2d');

    //check if a chart is already available and destroy the same chart element. This action will help to run our code in different web browser
    if (chart_object[ctx.canvas.id] != null) {
        chart_object[ctx.canvas.id].destroy();
    }
    chart_object[ctx.canvas.id] = new Chart(ctx, config);
}
