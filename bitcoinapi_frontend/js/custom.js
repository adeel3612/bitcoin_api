// initiate the js on the page load.
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
});