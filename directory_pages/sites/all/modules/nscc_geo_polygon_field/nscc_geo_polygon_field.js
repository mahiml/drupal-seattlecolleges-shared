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

			
			function setup_polygon_input_map(map,div_id){
				map = new google.maps.Map(document.getElementById(div_id), mapOptions);
				
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

	
	
				polygon_ajax_input = div_id.replace(/^(.+)_mapdiv/g,"edit-$1-polygon-ajax");
				polygon_ajax_input = polygon_ajax_input.replace(/_/g,"-");	
				polygon_ajax_field = $('#'+polygon_ajax_input );

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
				var polypath=[];
				var pointindex=0;
				if(polygon_ajax_field.val()){
					pointarray = $.secureEvalJSON(polygon_ajax_field.val());
					for(i in pointarray){
						point = new google.maps.LatLng(pointarray[i].lat,pointarray[i].lng);
						path.push( point );
						polypath.push({lat: pointarray[i].lat, lng: pointarray[i].lng});											

						markers[i] = new google.maps.Marker({clickable: true,map: map, position: point,draggable: true });
						markers[i].pointindex = i;
						google.maps.event.addListener(markers[i],'dragend', function(event){
							var path=poly.getPath();
							path.setAt(this.pointindex,this.position);
							polypath[this.pointindex] = {lat: event.latLng.lat(), lng: event.latLng.lng()};					
							polygon_ajax_input = div_id.replace(/^(.+)_mapdiv/g,"edit-$1-polygon-ajax");
							polygon_ajax_input = polygon_ajax_input.replace(/_/g,"-");	
							$('#'+polygon_ajax_input ).val($.toJSON(polypath));
						});
						pointindex++;
					}
					//pointindex++;
				}
				poly.setMap(map);
		
	
				function clearPolygon(){
					var path = poly.getPath();
					for(i in path){
						path.pop();
						polypath.pop();
					}
					path.length=0;
					polypath.length=0;

					path = poly.getPath();
					for(i in path){
						path.pop();
						polypath.pop();
					}
					path.length=0;
					polypath.length=0;

					if(markers){
					for(i in markers){
							markers[i].setMap(null);
					}
						markers.length=0;
					}
					pointindex=0;
					polygon_ajax_input = div_id.replace(/^(.+)_mapdiv/g,"edit-$1-polygon-ajax");
					polygon_ajax_input = polygon_ajax_input.replace(/_/g,"-");	
					$('#'+polygon_ajax_input ).val('');
				}
			
				google.maps.event.addListener(map, 'click', function(event) {
					markers[pointindex] = new google.maps.Marker({clickable: true,map: map, position: event.latLng,draggable: true });
					markers[pointindex].pointindex = pointindex;
					
					google.maps.event.addListener(markers[pointindex],'dragend', function(event){
						var path=poly.getPath();
						path.setAt(this.pointindex,this.position);
						polypath[this.pointindex] = {lat: event.latLng.lat(), lng: event.latLng.lng()};					
						polygon_ajax_input = div_id.replace(/^(.+)_mapdiv/g,"edit-$1-polygon-ajax");
						polygon_ajax_input = polygon_ajax_input.replace(/_/g,"-");	
						$('#'+polygon_ajax_input ).val($.toJSON(polypath));
					});
					
						
					polygon_ajax_input = div_id.replace(/^(.+)_mapdiv/g,"edit-$1-polygon-ajax");
					polygon_ajax_input = polygon_ajax_input.replace(/_/g,"-");	
					var path=poly.getPath();
					path.push(event.latLng);
					polypath.push({lat: event.latLng.lat(), lng: event.latLng.lng()});
					$('#'+polygon_ajax_input ).val($.toJSON(polypath));
					pointindex++;				
				});

				// Create a div to hold the control.
				var clearControlDiv = document.createElement('DIV');
				clearControlDiv.style.padding = '5px';
				var clearControlUI = document.createElement('DIV');
				clearControlUI.style.backgroundColor = 'white';
				clearControlUI.style.borderStyle = 'solid';
				clearControlUI.style.borderWidth = '2px';
				clearControlUI.style.cursor = 'pointer';
				clearControlUI.style.textAlign = 'center';
				clearControlUI.title = 'Click to set the map to Home';
				clearControlDiv.appendChild(clearControlUI);
				var clearControlText = document.createElement('DIV');
				clearControlText.style.fontFamily = 'Arial,sans-serif';
				clearControlText.style.fontSize = '12px';
				clearControlText.style.paddingLeft = '4px';
				clearControlText.style.paddingRight = '4px';
				clearControlText.innerHTML = 'Clear';
				clearControlUI.appendChild(clearControlText);
  			google.maps.event.addDomListener(clearControlUI, 'click', function() {
    				clearPolygon();
  			});				
				map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearControlDiv);


			}
			$('.map_polygon_input_map').map( function(){ setup_polygon_input_map( $(this).attr('id'), $(this).attr('id') ); });
					

};

