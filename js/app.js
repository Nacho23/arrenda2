
//Variables Google Maps
var map;
var marker;
var infoWindow;
var map_center;

//Variables otras
var isHover


//FUNCIONES PARICULARES DEL FUNCIONAMIENTO GENERAL

//1.-  Abrir Modal de LOGIN
function open_modal_login(){
	$('#modal-login').modal('show');
}

//2.- Abrir Flip Description
$("#flip-desc").click(function(){
    $("#panel-desc").slideToggle("slow");
});

//FUNCIONES GOOGLE MAPS
function initMap(){
	//Carga mapa básico con las caracteristicas iniciales
	map_center = new google.maps.LatLng(55.774593, 37.679367);

	map = new google.maps.Map(document.getElementById("map_main"), {
		center: map_center,
		zoom: 16,
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
			infoWindow.setContent('location found');
			map.setCenter(pos);

			marker = new google.maps.Marker({map: map, position: pos});

			//Al hacer click en el marcador, se despliega la siguiente información
			marker.addListener("click", function(){
				infoWindow.open(map, marker);
			});
            
            //Al hacer click en el marcador, se desliega el sidebar lateral
            marker.addListener("click", function(){
                $("#wrapper").toggleClass("toggled");
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

