
//Variables otras
var isHover

//FUNCIONES PARICULARES DEL FUNCIONAMIENTO GENERAL

//1.-  Abrir Modal en general
function open_modal_login(){
	$('#modal-login').modal('show');
}
function open_modal_signin(){
	$('#modal-signin').modal('show');
}
function open_modal_forgot_password(){
	$('#modal-forgot-password').modal('show');
}
function open_modal_image(){
	$('#image-gallery').modal('show');
}

//Funcion para Galeria de Imagenes
$(document).ready(function(){
    //FANCYBOX
    //https://github.com/fancyapps/fancyBox
    $(".fancybox").fancybox({
        openEffect: "none",
        closeEffect: "none"
    });
});
   