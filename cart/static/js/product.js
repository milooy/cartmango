

function materializeInit() {
    $('.modal-trigger').leanModal({
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .3, // Opacity of modal background
            in_duration: 300, // Transition in duration
            out_duration: 200, // Transition out duration
            starting_top: '4%', // Starting top style attribute
            ending_top: '10%', // Ending top style attribute
            ready: function() {  }, // Callback for Modal open
            complete: function() {  } // Callback for Modal close
        }
    );
    $('select').material_select();
}


$(document).ready(function () {
    materializeInit();
    var order_query = location.search.getValueByKey('order');
    $("select").change(function() {
        var pathname = location.pathname;
        var query = location.search.getValueByKey('query');
        if(query) {
            pathname += ('?query='+query+'&order=' + this.value);
        } else {
            pathname += ('?order=' + this.value);
        }
        window.location = pathname;
    });
    $("select option[value="+order_query+"]").attr("selected", "selected");
});