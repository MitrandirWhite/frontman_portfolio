var btn = document.querySelector(".main_menu_button"),
    menu = document.querySelector(".menu_drop");


btn.addEventListener('click', function(){
    if(menu.style.visibility && menu.style.visibility == "visible"){
        menu.style.visibility="hidden";
        menu.style.opacity="0";
    }
    else{
        menu.style.visibility="visible";
        menu.style.opacity="1";
    }
},false);
console.log(btn);