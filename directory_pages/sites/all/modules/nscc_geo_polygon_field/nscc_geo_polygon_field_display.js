// $Id: nscc_geo_point_field.js,v 1.2 2007/12/08 14:06:22 goba Exp $

/**
* Bindings for the open and close button
* for each item.
*/
Drupal.behaviors.nscc_geo_polygon_field = function(context) {

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
				scrollwheel: false
			};

			
			function setup_polygon_display_map(div_id){
				var map = new google.maps.Map(document.getElementById(div_id), mapOptions);
				
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

	
				var polyOptions = {
					clickable: false,
					strokeColor: '#FF0000',
					strokeOpacity: 1.0,
					strokeWeight: 3,
					fillColor: "#FF0000",
					fillOpacity: 0.35
				}
				var poly = new google.maps.Polygon(polyOptions);
				var path = poly.getPath();

				polygon_ajax = div_id.replace(/^(.+)-display-map/g,"$1-pointlist");
				polygon_ajax_field = $('#'+polygon_ajax );
								

				if(polygon_ajax_field.val()){
					pointarray = $.secureEvalJSON(polygon_ajax_field.val());
					for(i in pointarray){
						point = new google.maps.LatLng(pointarray[i].lat,pointarray[i].lng);
						path.push( point );
					}
				}
				poly.setMap(map);
			}
			
			$('.map_polygon_display_map').map( function(){setup_polygon_display_map( $(this).attr('id') ); });
					

};

