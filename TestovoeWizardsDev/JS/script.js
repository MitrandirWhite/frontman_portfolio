$(document).ready(function () {

    function btnClickModalToggle(btn, dataAttr1, dataAttr2, noScroll) {
        $(btn).click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(dataAttr1).toggleClass('active');
            $(dataAttr2).toggleClass('active');
            if (noScroll) {
                $('body').toggleClass('no_scroll');
            }
        });
    }

    btnClickModalToggle("#contacts_btn", "[data-overlay-trigger]", "[data-contacts-trigger]", true);

    btnClickModalToggle("[data-close-modal]", "[data-overlay-trigger]", "[data-contacts-trigger]", true);

    btnClickModalToggle("[data-overlay-trigger]", "[data-overlay-trigger]", "[data-contacts-trigger]", true);


//    BURGER MENU BUTTON

    $('#burger_btn').click(function () {
        $(this).toggleClass('open');
    });

    btnClickModalToggle("#burger_btn", "[data-main-menu-toggle]", '', false);
    btnClickModalToggle("#news_li", "[data-news-submenu-toggle]", '', false);
    
    function mediaMapChange(matchSize767) {
        if (matchSize767.matches) {
            // If media query matches


            let accordeon_items = $('.accordeon-item');
            $('.accordeon-item__body').slideUp();
            $('.accordeon-item__title').on('click', function () {
                var index = $(this).parent().attr('data-accordeon');
                accordeon_items.each(function () {
                    if ($(this).attr('data-accordeon') != index) {
                        $(this).children('.accordeon-item__body').slideUp();
                        $(this).children('.accordeon-item__title').removeClass("active");
                    } else {
                        $(this).children('.accordeon-item__body').slideToggle();
                        $(this).children('.accordeon-item__title').toggleClass("active");
                    }
                });
            });
        }
        else{
            $('#burger_btn').removeClass('open');
            $("[data-main-menu-toggle]").removeClass('active');
            $("[data-news-submenu-toggle]").removeClass('active');
            $('.accordeon-item__title').off();
            $('.accordeon-item__body').slideDown();
        }
    }


    var matchSize767 = window.matchMedia("(max-width: 767px)");
    mediaMapChange(matchSize767);
    matchSize767.addListener(mediaMapChange);





//    VALIDATION

    function isFieldsValid() {


        var regExp = {
            name: /^[A-zА-я ]*$/,
            tel: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
            // email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        }

        var isValid = {valid: true};

        var fields = $('#application_form input');

        fields.each(function () {

            var thisName = $(this).attr('name');
            var thisItem = $(this)[0];

            if (thisName !== "file") {
                if (!thisItem.value.match(regExp[thisName])) {
                    console.log(thisName + " НЕ соответствует регулярке");
                    if (thisItem.value !== "") {
                        $(thisItem).parent().addClass("invalid");
                    }
                    isValid = false;

                }
                else {

                    $(thisItem).parent().removeClass("invalid");
                }

            }
            else {


                var myFile = $(this).val();
                var ext = myFile.split('.').pop().toLowerCase();


                if (ext === "pdf" || ext === "docx" || ext === "doc" || ext === "txt") {
                    $(this).parent().parent().removeClass("invalid");

                    $("#cv_label").html(thisItem.files[0].name);
                }
                else {

                    isValid.valid = false;
                    if (thisItem.value !== "") {
                        $(this).parent().parent().addClass("invalid");
                        $("#cv_label").html(thisItem.files[0].name);
                    }

                }
            }

        });

        return isValid.valid;
    }


    $('#application_form input').change(function () {
        if (isFieldsValid()) {

            $("#application_submit").removeAttr('disabled');
        } else {
            return false;
        }
    });


});
