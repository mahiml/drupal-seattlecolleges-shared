// $Id: nscc_geo_point_field.js,v 1.2 2007/12/08 14:06:22 goba Exp $

/**
* Bindings for the open and close button
* for each item.
*/
Drupal.behaviors.nscc_geo_point_field = function(context) {

			var map;
			var campusCenter = new google.maps.LatLng(47.6995, -122.3325);
  		var campusBounds = new google.maps.LatLngBounds(
  			new google.maps.LatLng(47.697247089751656,-122.33490325927734),
    		new google.maps.LatLng(47.701319587209944,-122.33114816665649));
      var markers=[];  		

  		var backgroundOverlayBounds = new google.maps.LatLngBounds(
  			new google.maps.LatLng(47.6958454,-122.335057),
    		new google.maps.LatLng(47.7032728,-122.329748));
	
			var mapOptions = {
				zoom: 17,
				center: campusCenter,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				disableDefaultUI: true,
				mapTypeControl: true,
    		mapTypeControlOptions: {
        	style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        	position: google.maps.ControlPosition.TOP_RIGHT
    		},
    		navigationControl: true,
				scaleControl: true,
				scrollwheel: true
			};

			
			function setup_point_input_map(map,div_id){

				map = new google.maps.Map(document.getElementById(div_id), mapOptions);
				lat_input = div_id.replace(/^(.+)_mapdiv/g,"edit-$1-latitude");
				lat_input = lat_input.replace(/_/g,"-");
				lng_input = lat_input.replace(/latitude/g,"longitude");
				latfield = $('#'+lat_input );
				lngfield = $('#'+lng_input );
						
 
				var mapmodeOverlay = new google.maps.GroundOverlay(
					'https://prod.northseattle.edu/sites/all/themes/nscc_960/imgs/map-overlay-mapmode.png',
					backgroundOverlayBounds,{clickable:false});
				var othermodeOverlay = new google.maps.GroundOverlay(
					'https://prod.northseattle.edu/sites/all/themes/nscc_960/imgs/map-overlay-satmode.png',
					backgroundOverlayBounds,{clickable:false});
			    			
				google.maps.event.addListener(map, 'maptypeid_changed', function(event) {
						if (map.getMapTypeId() == 'roadmap'){
								mapmodeOverlay.setMap(map);
								othermodeOverlay.setMap(null);
						} else {
								mapmodeOverlay.setMap(null);
								othermodeOverlay.setMap(map);
						} 
				});
	
				var marker = new google.maps.Marker({title:"Selected Coordinates"});
				targetLocation = new google.maps.LatLng(latfield.val(), lngfield.val());
				marker.setPosition(targetLocation);
				marker.setMap(map);
	
	
				google.maps.event.addListener(map, 'click', function(event) {				
					marker.setPosition(event.latLng);
					marker.setMap(map);
					marker.setTitle('Marker Set at: '+event.latLng.toString());
					lat_input = map.getDiv().id.replace(/^(.+)_mapdiv/g,"edit-$1-latitude");
					lat_input = lat_input.replace(/_/g,"-");
					lng_input = lat_input.replace(/latitude/g,"longitude");
					$('#'+lat_input ).val(event.latLng.lat());
					$('#'+lng_input ).val(event.latLng.lng());
				});

				google.maps.event.addListener(marker, 'click', function(event) {
					marker.setMap(null);
					lat_input = map.getDiv().id.replace(/^(.+)_mapdiv/g,"edit-$1-latitude");
					lat_input = lat_input.replace(/_/g,"-");
					lng_input = lat_input.replace(/latitude/g,"longitude");
					$('#'+lat_input ).val('');
					$('#'+lng_input ).val('');
				});	

			}
			$('.point_input_map').map( function(){ setup_point_input_map( $(this).attr('id'), $(this).attr('id') ); });
					

};

