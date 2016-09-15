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

var List = {
    init: function() {
        var query = location.search.split('=')[1];
        List.query = query? '?query='+ query : '';
        this.get(location.pathname+'items/'+List.query);
        this.infiniteScroll()
    },
    get: function(url) {
        $.get(url, function(data) {
            $('section.product_list_section').html(data);
        });
    },
    getByScroll: function(next_page) {
        List.query = List.query.replace('?', '&');
        $.get(location.pathname+'items/?page='+next_page + List.query, function(data) {
            $('.loader').remove();
            $('section.product_list_section').append(data);
        });
    },
    infiniteScroll: function() {
        $(window).scroll(function () {
            var $loader = $('.loader');
            var $next_page_container = $('.next-page-container');
            var next_page = $next_page_container.data('next');
            var footer = $('footer.page-footer').position().top;
            var scrollTop = $(window).scrollTop();
            if (scrollTop + $(window).height() >= footer - 30) {
                $loader.css('display', 'block');
                if(next_page) {
                    $next_page_container.remove();
                    List.getByScroll(next_page);
                }
            }
        });
    }
};

$(document).ready(function () {
    List.init();
    materializeInit();
    initSelectBox(['order', 'list']);
});