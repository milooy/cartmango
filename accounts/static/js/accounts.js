var Accounts = {
    init: function() {
        var $input_avatar = $('#id_avatar');
        $input_avatar.simpleImage();
        $('.select-avatar, #image_holder').click(function() {
            $input_avatar.click();
        });
        $input_avatar.on('change', function () {

            // TODO: 아 이거 고쳐야하는데 귀찮다
            console.log('바끼여', $('#image_holder img').length)
            img = $('#image_holder img')[0];
            img.onload = function() {
                console.log("이미지 로드");
            }
            if($('#image_holder img').length > 0) {
                $('.select-avatar').addClass('hide');
            } else {
                $('.select-avatar').removeClass('hide');
            }
        });

    },
    avatar: function() {

    }

}

$(function() {
    Accounts.init();
});
