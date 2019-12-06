function header_screen_check(){
    if ($(window).width() <= 768) {
        $('header').insertBefore($(".main_slider"));
    }
    else if ($('main').children(":first").is('header')){
        $('header').insertAfter($(".main_slider"));
    };
}

function aboutus_screen_check(){
    if ($(window).width() <= 1169) {
        $(".aboutus_container").replaceWith($(".aboutus_container").html());
        $('.aboutus').addClass("flex");
    } else if (!$('div').is(".aboutus_container")){
        $('.aboutus_img_cover, .aboutus_text_box').wrapAll("<div class='container aboutus_container flex'></div>");
        $('.aboutus').removeClass("flex");
    };
}


aboutus_screen_check();
header_screen_check();
$(window).on('resize', function(){
    aboutus_screen_check();
    header_screen_check();
});

// Media queries DOM user_menu replacement
function mediaMainMenuReplace(matchSize) {
    var user_menu = document.getElementById('user_menu');
    if (matchSize.matches) { // If media query matches
        document.getElementById('head_top_container').appendChild(user_menu);
        user_menu.classList.add('head_top_user_menu');
    } else {
        document.getElementById('head_bottom_inner1').appendChild(user_menu);
        user_menu.classList.remove('head_top_user_menu');
    }
}

var matchSize = window.matchMedia("(max-width: 576px)");
mediaMainMenuReplace(matchSize);
matchSize.addListener(mediaMainMenuReplace);
