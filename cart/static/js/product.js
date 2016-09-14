

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

function initSelectBox(name_list) {
    name_list.forEach(function(name) {
        $("select.select-"+name).change(function() {
            window.location = filteredUrl(name, this.value);
        });

        var val = location.search.getValueByKey(name);
        if(val) {
            $(".select-"+ name +" option[value="+ val +"]").attr("selected", "selected");
        }
    });
}

$(document).ready(function () {
    materializeInit();
    initSelectBox(['order', 'list']);
});