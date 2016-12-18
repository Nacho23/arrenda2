
//Variables Google Maps
var map;
var marker;
var infoWindow;
var map_center;
var zoom = 13;

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

//2.- Abrir Flip Description
$("#flip-desc").click(function(){
    $("#panel-desc").slideToggle("slow");
});

//FUNCIONES GOOGLE MAPS
function initialize(){
    try{
        initMap();
    }catch(e){
        alert("Error al cargar el mapa, recargue la página");
        console.log(e);
    }
}

function initMap(){
	//Carga mapa básico con las caracteristicas iniciales
	map_center = new google.maps.LatLng(-39.8350246, -73.4459405);

	map = new google.maps.Map(document.getElementById("map_main"), {
		center: map_center,
		zoom: zoom,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	infoWindow = new google.maps.InfoWindow({map: map});

	//Captura la ubicación del usuario.
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			map_center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

			infoWindow.setPosition(pos);
            
            //Contenido del popover de cada lugar
			infoWindow.setContent('You are here');
			map.setCenter(pos);

			marker = new google.maps.Marker({map: map, position: pos});
            
            //Evento al dar click en el marcador
            marker.addListener("click", function(){
                //se desliega el sidebar lateral
                $("#wrapper").toggleClass("toggled");
                
                //se despliega el popover sobre la información del lugar
                infoWindow.open(map, marker);

            })

		}, function(){
			handleLocationError(true, infoWindow, map.getCenter());
		});
	}else{
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter())
	}

	google.maps.event.addDomListener(window, 'resize', resize);

}

function resize(){
	map.setCenter(map_center);
}


//Funciones relacionadas con el error al geolocalizar
function handleLocationError(browserHasGeolocation, infoWindow, pos){
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
		'Error: The Geolocation service failed.':
		'Error: Your browser doesn\'t support geolocation.');
}


//BARRA LATERA
$("#menu-toggle-2").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled-2");
    $('#menu ul').hide();
});

 function initMenu() {
  $('#menu ul').hide();
  $('#menu ul').children('.current').parent().show();
  //$('#menu ul:first').show();
  $('#menu li a').click(
    function() {
      var checkElement = $(this).next();
      if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
        return false;
        }
      if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
        $('#menu ul:visible').slideUp('normal');
        checkElement.slideDown('normal');
        return false;
        }
      }
    );
  }
$(document).ready(function() {initMenu();});

