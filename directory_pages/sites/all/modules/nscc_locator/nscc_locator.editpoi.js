// $Id: nscc_schedule.js,v 1.2 2007/12/08 14:06:22 goba Exp $

/**
* Bindings for the open and close button
* for each item.
*/
Drupal.behaviors.nscc_locator = function(context) {
			
			var map;
			var colorZeroth='#ffff00'; //yellow
			var colorFirst='#ff0000'; // red
			var colorSecond='#0000ff'; // blue
			var colorThird='#00FF00'; //green
			var campusCenter = new google.maps.LatLng(47.6995, -122.3325);
  		var campusBounds = new google.maps.LatLngBounds(
  			new google.maps.LatLng(47.697247089751656,-122.33490325927734),
    		new google.maps.LatLng(47.701319587209944,-122.33114816665649));
      var markersArray=[];  		
      var infowindowsArray=[];  		

  		var backgroundOverlayBounds = new google.maps.LatLngBounds(
  			new google.maps.LatLng(47.6960,-122.33499),
    		new google.maps.LatLng(47.7032,-122.32975));
	
 
  		var mapmodeOverlay = new google.maps.GroundOverlay(
  			'https://prod.northseattle.edu/sites/all/themes/nscc_960/imgs/map-overlay-mapmode.png',
  			backgroundOverlayBounds);
  		var othermodeOverlay = new google.maps.GroundOverlay(
  			'https://prod.northseattle.edu/sites/all/themes/nscc_960/imgs/map-overlay-bldgs-roads.png',
  			backgroundOverlayBounds);

			var mapOptions = {
				zoom: 16,
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

			
		  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

			google.maps.event.addListener(map, 'maptypeid_changed', function(event) {
					if (map.getMapTypeId() == 'roadmap'){
							mapmodeOverlay.setMap(map);
							othermodeOverlay.setMap(null);
					} else {
							mapmodeOverlay.setMap(null);
							othermodeOverlay.setMap(map);
					} 
			});


			function createpoitypemenu(){
				$.get('/locator/poitypes',null,function(data){
							var POITypesJson = Drupal.parseJson(data);
							for(i in POITypesJson){
								poit_id = POITypesJson[i]['poit_id'];
								poit_name = POITypesJson[i]['name'];
								poit_icon = POITypesJson[i]['icon_url'];
								$('#poi-type-toggles').append('<li class="locator-poitype-toggle" id="poitype-toggle-'+poit_id+'"><a href="javascript:void();"><img class="poi-type-icon" height="16" width="16" src="'+poit_icon+'">'+poit_name+'</a></li>');
								$('#poitype-toggle-'+poit_id).toggle(
										function(){
										  $(this).toggleClass('on');
											var type_id = $(this).attr('id');
											var target_poit = type_id.replace(/^poitype-toggle-/,'');
											$.get('/locator/poidump/'+target_poit,null,parsePOI);
											 },
										function(){
										  $(this).toggleClass('on');
											var type_id = $(this).attr('id');
											var target_poit = type_id.replace(/^poitype-toggle-/,'');
											deleteMarkersbytype(target_poit);
										}
								);

							}
							$('#poi-type-toggles').append('<li class="locator-poitype-toggle" id="locator-clearall-toggle"><a href="javascript:void();"><img  class="poi-type-icon" height="16" width="16" src="/sites/all/themes/nscc_960/imgs/icons/map/map-labels-clear.png">Clear Map</a></li>');
							$('#locator-clearall-toggle').bind('click',function(){ deleteMarkers(); });
					});
			}
			
			createpoitypemenu();

			function deleteMarkersbytype(type){
				if(markersArray){
					for(i in markersArray){
						if(markersArray[i].type == type){
							for (j in infowindowsArray){
								//alert("IW:"+infowindowsArray[j].markerpoi_id+"M:"+markersArray[i].poi_id);
								if(infowindowsArray[j].markerpoi_id == markersArray[i].poi_id){
										infowindowsArray[j].close();
								}
							}
							markersArray[i].setMap(null);
						}
					}
				}
			}
	
			function deleteMarkers(){
				if(markersArray){
					for(i in markersArray){
							markersArray[i].setMap(null);
					}
					markersArray.length=0;
				}
				if(infowindowsArray){
					for(i in infowindowsArray){
							infowindowsArray[i].close();
					}
					infowindowsArray.length=0;
				}
			}
	
//same above here
  		map.setZoom(17);

     
 			google.maps.event.addListener(map, 'click', function(event) {
    		newPOI(event.latLng);
  		});

			$.get('/locator/poidump',null,parsePOI);
			
			function parsePOI(data){
				var POIJson = Drupal.parseJson(data);
				for(i in POIJson){
					poiLocation = new google.maps.LatLng(POIJson[i]['lat'],POIJson[i]['long']);
					poiMarker = new google.maps.Marker({position: poiLocation, map: map, title: POIJson[i]['name'], icon: POIJson[i]['icon_url'], flat: false});
					poiMarker.poi_id = POIJson[i]['poi_id'];
					poiMarker.type = POIJson[i]['poi_type'];
					poiMarker.setTitle(poiMarker.poi_id + ": " + POIJson[i]['name']);
					markersArray.push(poiMarker);
					attachEdit(poiMarker,i);
				}						
			}
			
			//seperate function to get closure to work right.
			function attachEdit(attachmarker,index){
		 			google.maps.event.addListener(attachmarker, 'click', function(event) {
    				editPOI(attachmarker);
    			});	
			}
			
			function newPOI(location) {
			  var clickedLocation = new google.maps.LatLng(location);
  			var marker = new google.maps.Marker({
      		position: location, 
      		map: map,
      		title: "New Marker!"
  			});
  			$.post(
  				'/locator/edit/poi/add',
  				{name: marker.title, lat: location.lat(),lng: location.lng(),mode: 'edit' },
  				function(data){
						var detailsForm = new google.maps.InfoWindow(
      											{ content: data.details_form });
      			detailsForm.open(map, marker);
      			google.maps.event.addListener(detailsForm,'domready',function(event){eval(data.details_form_script);});
      			marker.poi_id = data.poi_id;
      			detailsForm.poi_id = data.poi_id;
      			infowindowsArray.push(detailsForm);
      			marker.setTitle(marker.poi_id + ": " + data.poi_name);
    			},
  				"json"
  			);
		 		google.maps.event.addListener(marker, 'click', function(event) {
    			editPOI(marker);
  			});
  			markersArray.push(marker);
			}

			function editPOI(editMarker) {
  			$.post(
  				'/locator/edit/poi/add',
  				{poi_id: editMarker.poi_id,mode: 'edit' },
  				function(data){
						var detailsForm = new google.maps.InfoWindow(
      											{ content: data.details_form});
      			detailsForm.open(map, editMarker);
      			detailsForm.poi_id = editMarker.poi_id;
      			infowindowsArray.push(detailsForm);
      			google.maps.event.addListener(detailsForm,'domready',function(event){eval(data.details_form_script);});
      			//setTimeout(function(){bindSave(data);},1000);
    			},
  				"json"
  			);
			}


			function updateMarkerIcon(target_poi,target_type,target_icon_url){
				if(markersArray){
					for(i in markersArray){
						if(markersArray[i].poi_id == target_poi){
							markersArray[i].type = target_type;
							markersArray[i].setIcon(target_icon_url);
						}
					}
				}
			}

			function deleteMarker(target_poi){
				if(markersArray){
					for(i in markersArray){
						if(markersArray[i].poi_id == target_poi){
							markersArray[i].setMap(null);
						}
					}
				}
				if(infowindowsArray){
					for(i in infowindowsArray){
						if(infowindowsArray[i].poi_id == target_poi){
							infowindowsArray[i].close();
						}
					}
				}
			}
					
	
};

