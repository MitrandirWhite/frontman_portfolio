$(document).ready(function(){

    function btnClickModalToggle(btn, dataAttr1, dataAttr2){
        $( btn ).click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(dataAttr1).toggleClass('active');
            $(dataAttr2).toggleClass('active');
            $('body').toggleClass('no_scroll');
        });
    }

    btnClickModalToggle("#contacts_btn", "[data-overlay-trigger]", "[data-contacts-trigger]");

    btnClickModalToggle("[data-close-modal]", "[data-overlay-trigger]", "[data-contacts-trigger]");

    btnClickModalToggle("[data-overlay-trigger]", "[data-overlay-trigger]", "[data-contacts-trigger]");


//    VALIDATION

    function isFieldsValid() {
        var regExp = {
            name: /^[A-zА-я ]*$/,
            tel: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
            email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        }

        $('[data-invalid-message]').each(function(){
            $(this).hide();
        });

        var fields = $('#application_form input');
        var isValid = true;


        fields.each(function(){
            var thisName = $(this).attr('name');
            var thisItem = $(this)[0];

            if(thisName !== "file"){
                if(thisItem.value === '' || !thisItem.value.match(regExp[thisName])) {
                    $(this).parent().children('[data-invalid-message]').show();
                    $(this).addClass("invalid");
                    isValid = false;
                }
                else{
                    $(this).removeClass("invalid");
                }
            }
            else{
                console.log("Пошло на елс сиви");
                // if(thisItem.value !== ''){
                $('#cv_input').on( 'change', function() {
                    console.log("СИВИ ОНченж");
                    var myfile= $(this).val();
                    var ext = myfile.split('.').pop();
                    if(ext==="pdf" || ext==="docx" || ext==="doc" || ext==="txt"){
                        $(this).removeClass("invalid");
                        console.log(ext);
                    } else{
                        console.log(ext);
                        isValid = false;
                        $(this).parent().children('[data-invalid-message]').show();
                        $(this).addClass("invalid");
                    }
                });
                // }
                // else{
                //     isValid = false;
                // }



            }

        });
        console.log("isValid = " + isValid);
        return isValid;

    }

    $('#application_form input').change(function () {
        console.log("isFieldsValid = " + isFieldsValid());
        if(isFieldsValid()) {
            console.log("Поля правильные");
            $("#application_submit").removeAttr('disabled');
        } else {
            return false;
        }
    });

});
