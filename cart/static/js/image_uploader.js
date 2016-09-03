(function($){
    $.fn.simpleImage = function(opts){
        var Uploader = {
            /*
             FUNCTION: Check extension after upload file
             */
            check_extension: function($el, ext_arr, error_msg, image_holder){
                var file_ext = $el.val().toLowerCase().split('.').pop();
                if(ext_arr.map(function(v) {
                        return v.toLowerCase();
                    }).indexOf(file_ext) < 0) {

                    alert(error_msg || 'You can upload file with ' + ext_arr.join(', '));
                    $el.val('');
                    if(image_holder) {
                        $('#' + image_holder).empty();
                    }
                }
            },
            /*
             FUNCTION: Preview Image
             */
            preview: function($el, preview, image_holder) {
                var img = document.createElement("img");
                var file = $el[0].files[0];
                var reader = new FileReader();

                reader.onload = function(e) {
                    img.src = e.target.result;
                    img.onload = function() {
                        if(preview) {
                            var $image_holder = $('#' + image_holder);
                            $image_holder.empty();
                            $("<img />", {
                                "src": reader.result,
                                "class": "thumb_image"
                            }).appendTo($image_holder);
                        }
                    }
                };
                reader.readAsDataURL(file);
            }
        };

        return this.each(function(){
            var options = $.extend({}, $.fn.simpleImage.defaults, opts || {});
            var $el = $(this);

            if(options.accept_only_image) {
                $el.attr('accept', "image/*");
            }

            $($el).on('change', function () {
                if(Uploader.check_extension){
                    Uploader.check_extension($el, options.file_extension, options.file_extension_error_message, options.preview_container_id);
                }
                if(options.preview || options.max_width || options.max_height) {
                    if (typeof (FileReader) != "undefined") {
                        Uploader.preview($el, options.preview, options.preview_container_id);
                    } else {
                        alert(options.file_upload_error_message);
                    }
                }
            });
        });
    };

    /*
     OPTION: You available to change default outside the plugin
     */
    $.fn.simpleImage.defaults = {
        accept_only_image: true, /* true or false */
        preview: true, /* true or false */
        preview_container_id: "image_holder",
        file_extension: ['png', 'jpeg', 'jpg', 'gif', 'bmp'], /* If you don't want to use it, check it 'false' */
        file_extension_error_message: undefined,
        file_upload_error_message: "This browser doesn't support FileReader. Use another browser."
    }
})(jQuery);
