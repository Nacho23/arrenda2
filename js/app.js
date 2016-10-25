
var map;

function initMap(){
	var mapOption = {
		center: new google.maps.LatLng(-39.83,-73.25),
		zoom: 10,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(document.getElementById("map_main"), mapOption);
}