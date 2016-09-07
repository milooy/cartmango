/*-- materializecss side bar --*/
$('.button-collapse').sideNav();

/*-- 헤더가 보일 떈 nav를 투명하게 한다 --*/
$(window).scroll(function() {
    if(document.body.scrollTop>=55) {
        $('.nav-main').removeClass('nav-transparent')
    } else {
        $('.nav-main').addClass('nav-transparent');
    }
});

/*-- 네비게이션 바 검색 기능 --*/
function searchBox() {
    var $query_input = $(".search-ul-large input[name='query']"),
        $search_box = $('.search-ul-large .search-box'),
        $close = $('.search-ul-large li.close'),
        $account_ul = $('ul.account-large');

    var $query_input_m = $(".search-box-mobile input[name='query']"),
        $search_box_m = $('.search-box-mobile'),
        $logo = $('.brand-logo'),
        $close_m = $('.search-box-mobile i');

    $query_input.val('');
    $query_input_m.val('');
    $('.search-ul-large form').submit(function(e) {
        if(!$query_input.val()) {
            e.preventDefault();
        }
    });
    $('.search-box-mobile form').submit(function(e) {
        if(!$query_input_m.val()) {
            e.preventDefault();
        }
    });
    $('li.search a.search-large').click(function() {
        if($query_input.val()) {
            $('.search-ul-large .submit').click();
        }
        $search_box.css('display', 'block');
        $close.css('display', 'inline-block');
        $account_ul.css('display', 'none');
        $query_input.focus();
    });
    $close.click(function() {
        $query_input.val('');
        $search_box.css('display', 'none');
        $close.css('display', 'none');
        $account_ul.css('display', 'inline-block');
    });
    $('.search-mobile').click(function() {
        if($query_input_m.val()) {
            $('.search-box-mobile .submit').click();
        }
        $search_box_m.css('display', 'block');
        $logo.css('display', 'none');
        $query_input_m.focus();
    });
    $close_m.click(function() {
        $query_input_m.val('');
        $logo.css('display', 'inline-block');
        $search_box_m.css('display', 'none');
    });
}

$(document).ready(function () {
    searchBox();
});