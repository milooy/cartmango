/*-- materializecss side bar --*/
$('.button-collapse').sideNav();

/*-- 위로 스크롤 할때 보이는 네비게이션 바 --*/
$('.nav-main').shy({
    thresholdUp: 5,
    thresholdDown: 5,
    animationDelay: 0,
    animationDur: 150
});

/*-- 헤더가 보일 떈 nav를 투명하게 한다 --*/
$(window).scroll(function() {
    if(document.body.scrollTop>=180) {
        $('.nav-main').removeClass('nav-transparent')
    } else {
        $('.nav-main').addClass('nav-transparent');
    }
});