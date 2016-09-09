

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

function filteredUrl(filter_name, val) {
    var url;
    var href = location.href;
    var pathname = location.pathname;
    var search = location.search;
    var filter_value = search.getValueByKey(filter_name);
    if(filter_value) {
        var filter_val = location.search.getValueByKey(filter_name);
        url = pathname + search.replace(filter_val, val);
    } else {
        if(search) {
            url = href + '&'+filter_name+'=' + val;
        } else {
            url = href + '?'+filter_name+'=' + val;
        }
    }
    return url;
}


$(document).ready(function () {
    materializeInit();
    var order_query = location.search.getValueByKey('order');
    $("select.select-order").change(function() {
        window.location = filteredUrl('order', this.value);
    });
    $("select.select-list").change(function() {
        window.location = filteredUrl('list', this.value);
    });
    $(".select-order option[value="+location.search.getValueByKey('order')+"]").attr("selected", "selected");
    $(".select-list option[value="+location.search.getValueByKey('list')+"]").attr("selected", "selected");
});