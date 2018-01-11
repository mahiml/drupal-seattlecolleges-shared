// $Id: nscc_schedule.js,v 1.2 2007/12/08 14:06:22 goba Exp $

/**
* Bindings for the open and close button
* for each item.
*/
Drupal.behaviors.nscc_locator = function(context) {
	
	var map;
	var color = ['#ffff00','#ff0000','#0000ff','#00FF00']; 
	var campusCenter = new google.maps.LatLng(47.6995, -122.3325);
	var campusBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(47.697247089751656,-122.33490325927734),
		new google.maps.LatLng(47.701319587209944,-122.33114816665649));
	var markersArray=[];  		
	var infowindowsArray=[];  		
	/*
	var backgroundOverlayBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(47.6958454,-122.335057),
		new google.maps.LatLng(47.7032728,-122.329748));
	
	
	var mapmodeOverlay = new google.maps.GroundOverlay(
		'https://prod.northseattle.edu/sites/all/themes/nscc_960/imgs/map-overlay-mapmode.png',
		backgroundOverlayBounds,{clickable:false});
	var othermodeOverlay = new google.maps.GroundOverlay(
		'https://prod.northseattle.edu/sites/all/themes/nscc_960/imgs/map-overlay-satmode.png',
		backgroundOverlayBounds,{clickable:false});
	*/					
	var mapOptions = {
		zoom: 17,
		center: campusCenter,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		//mapTypeId: google.maps.MapTypeId.HYBRID,
		disableDefaultUI: true,
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
			position: google.maps.ControlPosition.TOP_RIGHT
		},
		navigationControl: true,
		scaleControl: true,
		scrollwheel: false
	};
	
	
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	//mapmodeOverlay.setMap(map);
	/*
	google.maps.event.addListener(map, 'maptypeid_changed', function(event) {
			if (map.getMapTypeId() == 'roadmap'){
					mapmodeOverlay.setMap(map);
					othermodeOverlay.setMap(null);
			} else {
					mapmodeOverlay.setMap(null);
					othermodeOverlay.setMap(map);
			} 
	});
	
	$('#toggle_background_overlay').toggle(
			function(){
				mapmodeOverlay.setMap(null);
				othermodeOverlay.setMap(null);
				$('#toggle_background_overlay').toggleClass('on');
			},
			function(){
				if (map.getMapTypeId() == 'roadmap'){
						mapmodeOverlay.setMap(map);
						othermodeOverlay.setMap(null);
				} else {
						mapmodeOverlay.setMap(null);
						othermodeOverlay.setMap(map);
				} 
				$('#toggle_background_overlay').toggleClass('on');
			}
		);
	*/

		var directionsDisplay = new google.maps.DirectionsRenderer();
		var directionsService = new google.maps.DirectionsService();
		directionsDisplay.setMap(map);
		directionsDisplay.setPanel(document.getElementById("locator-directions-panel"));
		var trafficLayer = new google.maps.TrafficLayer();

	function calcRoute() {
		var start = $('#start_point_textbox').val();
		var end = "9600 College Way N  Seattle, WA 98103";
		var travel_mode = $('#travel_mode_selector').val();
		var request = {
			origin:start, 
			destination:end,
			travelMode: google.maps.DirectionsTravelMode[travel_mode]
		};
		directionsService.route(request, function(response, status) {
			if (! start) { exit; }
			$('#locator-directions-panel').html('');
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
				trafficLayer.setMap(map);
				
				// add link to printable directions
				var print_map_link;
				var enc_start_addr = start.replace(/\s+/,'+');
//				enc_start_addr = enc_start_addr.replace(/[^\w\+\,]/, '');
				switch (travel_mode) {
					case 'BICYCLING':
						print_map_link = '<a href="http://maps.google.com/maps?f=d&source=s_d&saddr='	+ enc_start_addr + '&daddr=north+seattle+community+college,+9600+college+way+n,+seattle,+wa&dirflg=b&ie=UTF8&t=h&z=15&layer=c&pw=2" title="Printable bicycling directions" class="print-directions">Print these directions</a>';
						break;
					case 'WALKING':
						print_map_link = '<a href="http://maps.google.com/maps?f=d&source=s_d&saddr=' + enc_start_addr + '&daddr=north+seattle+community+college,+9600+college+way+n,+seattle,+wa&dirflg=w&ie=UTF8&t=h&z=15&layer=c&pw=2" title="Printable walking directions" class="print-directions">Print these directions</a>';
						break;
					case 'RIDING':	//Transit?
						print_map_link = '<a href="http://maps.google.com/maps?f=d&source=s_d&saddr=' + enc_start_addr + '&daddr=north+seattle+community+college,+9600+college+way+n,+seattle,+wa&dirflg=r&ie=UTF8&t=h&z=15&start=0&pw=2" title="Printable transit directions" class="print-directions">Print these directions</a>';
						break;
					default:
						print_map_link = '<a href="http://maps.google.com/maps?f=d&source=s_d&saddr=' + enc_start_addr + '&daddr=north+seattle+community+college,+9600+college+way+n,+seattle,+wa&ie=UTF8&t=h&z=15&layer=c&pw=2" title="Printable driving directions" class="print-directions">Print these directions</a>';
						break;
				}
				$('.directions-form').append(print_map_link);
			} else {
				switch(status){
					case 'NOT_FOUND':
						//Couldn't geocode start
						error_message = "Couldn't find \""+start+'".';
					break;
					case 'ZERO_RESULTS':
						//Couldn't find a route
						error_message = "Couldn't find a route from \""+start+"\" to NSCC.";
					break;
					case 'MAX_WAYPOINTS_EXCEEDED':
						//too many waypoints
						error_message = "Too many waypoints."
					break;
					case 'INVALID_REQUEST':
						//bogus request
						error_message = "Problem with your request."
					break;
					case 'OVER_QUERY_LIMIT':
						//too many requests in a given time period
						error_message = "Too many queries from this web page."
					break;
					case 'REQUEST_DENIED':
						//NSCC has been banned from the directions service
						error_message = "NSCC has been banned from this service."
					break;
					case 'UNKNOWN_ERROR':
						//A completely unknown error, probably sunspots.
						error_message = "There is a (probably temporary) problem with Google's directions service."						
					break;					
				}	
				alert("A Problem prevents us from giving you directions: "+error_message);				
			}
		});
	}

	$('#locator-directions-form').submit(function(){
			$('#locator-directions-panel').html('<img src="/sites/all/modules/nscc_locator/imgs/ajax-loader.gif" alt="Working..." id="ajax-throbber">');
			$('.directions-form a.print-directions').remove();
			calcRoute();
			return false;}
	);
		
};

