/*-- materializecss side bar --*/
$('.button-collapse').sideNav();

/*-- 헤더가 보일 떈 nav를 투명하게 한다 --*/
$(window).scroll(function() {
    if(document.body.scrollTop>=180) {
        $('.nav-main').removeClass('nav-transparent')
    } else {
        $('.nav-main').addClass('nav-transparent');
    }
});