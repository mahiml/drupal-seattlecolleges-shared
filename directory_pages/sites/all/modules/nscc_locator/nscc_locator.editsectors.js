// $Id: nscc_editsectors.js,v 1.2 2007/12/08 14:06:22 goba Exp $

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
				zoom: 18,
				center: campusCenter,
				mapTypeId: google.maps.MapTypeId.HYBRID,
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
			$("body div#container").after($("#locator-photo-overlay-wrapper"));
			$("#locator-photo-overlay-wrapper").click(function(){hidePhoto();});
			$("#locator-photo-overlay-photo").click(function(){hidePhoto();});

			function hidePhoto(){
				$("#locator-photo-overlay-wrapper").hide(10);
				$("#locator-photo-overlay-photo").html('');
			}

			function parsePOI(data){
				var POIJson = Drupal.parseJson(data);
				for(i in POIJson){
					poiLocation = new google.maps.LatLng(POIJson[i]['lat'],POIJson[i]['long']);
					poiMarker = new google.maps.Marker({position: poiLocation, map: map, title: POIJson[i]['name'], icon: POIJson[i]['icon_url'], flat: false});
					poiMarker.poi_id = POIJson[i]['poi_id'];
					poiMarker.type = POIJson[i]['poi_type'];
					poiMarker.setTitle(poiMarker.poi_id + ": " + POIJson[i]['name']);
					markersArray.push(poiMarker);
					attachDetails(poiMarker,i);
				}						
			}
			
			function attachDetails(attachmarker,index){
		 			google.maps.event.addListener(attachmarker, 'click', function(event) {
  					$.post(
  							'/locator/poidetails',
  							{poi_id: attachmarker.poi_id},
  								function(data){
										var detailsDisplay = new google.maps.InfoWindow({ content: data.window_details});
										detailsDisplay.markerpoi_id = attachmarker.poi_id;
      							detailsDisplay.open(map, attachmarker);
      							infowindowsArray.push(detailsDisplay);
      							google.maps.event.addListener(detailsDisplay,'domready',function(event){eval(data.window_details_script);});
			    			},
  							"json"
  						);
						map.panTo(attachmarker.getPosition());
    			});	
			}

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
				
		google.maps.event.addListener(map, 'click', function(event) {
			$('#pointlist').append('<div>'+event.latLng.toString()+'</div>');
		});
	
		var ch_sectorpath = [
			nw =  new google.maps.LatLng(47.70121128022502, -122.33462967395782),
			sw =  new google.maps.LatLng(47.70081234755653, -122.33462967395782),
			se =  new google.maps.LatLng(47.70081234755653, -122.33440168619155),
			se2 = new google.maps.LatLng(47.70097119893960, -122.33440168619155),
			se3 = new google.maps.LatLng(47.700973004066185, -122.33428635120391),
			se4 = new google.maps.LatLng(47.70106326031508, -122.33427562236785),
			e   = new google.maps.LatLng(47.701070480808255, -122.33409859657287),
			ne  = new google.maps.LatLng(47.70121489046147, -122.33409323215484),
		];
		
		var ibnw_sectorpath = [
			nw = new google.maps.LatLng(47.700655300826995, -122.33370162963867),
			sw = new google.maps.LatLng(47.7002220660170, -122.33370162963867),
			se = new google.maps.LatLng(47.7002220660170, -122.33350314617157),
			ne = new google.maps.LatLng(47.700655300826995, -122.33350314617157),
		];
	
		var ibne_sectorpath = [
			nw = new google.maps.LatLng(47.700655300826995, -122.33350314617157),
			sw = new google.maps.LatLng(47.7002220660170, -122.33350314617157),
			se = new google.maps.LatLng(47.7002220660170, -122.33327784061431),
			ne = new google.maps.LatLng(47.700655300826995, -122.33327784061431),
		];
	
		var ibcw_sectorpath = [
			nw = new google.maps.LatLng(47.7002220660170, -122.33370162963867),
			sw = new google.maps.LatLng(47.6997202311951, -122.33370162963867),
			se = new google.maps.LatLng(47.6997202311951, -122.33350314617157),
			ne = new google.maps.LatLng(47.7002220660170, -122.33350314617157),
		];
	
		var ibce_sectorpath = [
			nw = new google.maps.LatLng(47.7002220660170, -122.33350314617157),
			sw = new google.maps.LatLng(47.6997202311951, -122.33350314617157),
			se = new google.maps.LatLng(47.6997202311951, -122.33327784061431),
			ne = new google.maps.LatLng(47.7002220660170, -122.33327784061431),
		];
	
		var ibsw_sectorpath = [
			nw = new google.maps.LatLng(47.6997202311951, -122.33370162963867),
			sw = new google.maps.LatLng(47.6993591959615, -122.33370162963867),
			se = new google.maps.LatLng(47.6993591959615, -122.33350314617157),
			ne = new google.maps.LatLng(47.6997202311951, -122.33350314617157),
		];
	
		var ibse_sectorpath = [
			nw = new google.maps.LatLng(47.6997202311951, -122.33350314617157),
			sw = new google.maps.LatLng(47.6993591959615, -122.33350314617157),
			se = new google.maps.LatLng(47.6993591959615, -122.33327784061431),
			ne = new google.maps.LatLng(47.6997202311951, -122.33327784061431),
		];
	
		var lb_sectorpath = [
			new google.maps.LatLng(47.69963358296706, -122.33425416469574),
			new google.maps.LatLng(47.69956137600035, -122.33425952911377),
			new google.maps.LatLng(47.69955776564937, -122.33429708003997),
			new google.maps.LatLng(47.698983716666405, -122.334302444458),
			new google.maps.LatLng(47.698983716666405, -122.33376600265503),
			new google.maps.LatLng(47.69955054494671, -122.33377136707306),
			new google.maps.LatLng(47.69956137600035, -122.33388401985168),
			new google.maps.LatLng(47.69963358296706, -122.33388401985168),
		];
	
		var ccn_sectorpath = [
			new google.maps.LatLng(47.69900176861748, -122.33366407871246),
			new google.maps.LatLng(47.69875987195394, -122.33366407871246),
			new google.maps.LatLng(47.69875987195394, -122.33327247619629),
			new google.maps.LatLng(47.69901259978513, -122.33327247619629),
		];
	
		var ccc_sectorpath = [
			new google.maps.LatLng(47.69875987195394, -122.33366407871246),
			new google.maps.LatLng(47.69875987195394, -122.33327247619629),
			new google.maps.LatLng(47.69851436374486, -122.33327247619629),
			new google.maps.LatLng(47.69851436374486, -122.33366407871246),
		];
	
		sector_ccn = new google.maps.Polygon({
			paths: ccn_sectorpath,
			strokeColor: "#888888",
			strokeOpacity: 0.8,
			strokeWeight: 1,
			fillColor: "#0088FF",
			fillOpacity: 0.35
		});
		sector_ccn.setMap(map);
		
		sector_ccc = new google.maps.Polygon({
			paths: ccc_sectorpath,
			strokeColor: "#888888",
			strokeOpacity: 0.8,
			strokeWeight: 1,
			fillColor: "#00FF88",
			fillOpacity: 0.35
		});
		sector_ccc.setMap(map);
	
		sector_ch = new google.maps.Polygon({
			paths: ch_sectorpath,
			strokeColor: "#888888",
			strokeOpacity: 0.8,
			strokeWeight: 1,
			fillColor: "#8844FF",
			fillOpacity: 0.35
		});
		sector_ch.setMap(map);
	
		sector_lb = new google.maps.Polygon({
			paths: lb_sectorpath,
			strokeColor: "#888888",
			strokeOpacity: 0.8,
			strokeWeight: 1,
			fillColor: "#0044FF",
			fillOpacity: 0.35
		});
		sector_lb.setMap(map);
	
	
		sector_ibnw = new google.maps.Polygon({
			paths: ibnw_sectorpath,
			strokeColor: "#888888",
			strokeOpacity: 0.8,
			strokeWeight: 1,
			fillColor: "#FF0000",
			fillOpacity: 0.35
		});
		sector_ibnw.setMap(map);
	
		sector_ibne = new google.maps.Polygon({
			paths: ibne_sectorpath,
			strokeColor: "#888888",
			strokeOpacity: 0.8,
			strokeWeight: 1,
			fillColor: "#FFFF00",
			fillOpacity: 0.35
		});
		sector_ibne.setMap(map);
	
		sector_ibcw = new google.maps.Polygon({
			paths: ibcw_sectorpath,
			strokeColor: "#888888",
			strokeOpacity: 0.8,
			strokeWeight: 1,
			fillColor: "#FF00FF",
			fillOpacity: 0.35
		});
		sector_ibcw.setMap(map);
	
		sector_ibce = new google.maps.Polygon({
			paths: ibce_sectorpath,
			strokeColor: "#888888",
			strokeOpacity: 0.8,
			strokeWeight: 1,
			fillColor: "#FF8888",
			fillOpacity: 0.35
		});
		sector_ibce.setMap(map);
	
	sector_ibsw = new google.maps.Polygon({
			paths: ibsw_sectorpath,
			strokeColor: "#888888",
			strokeOpacity: 0.8,
			strokeWeight: 1,
			fillColor: "#FF88FF",
			fillOpacity: 0.35
		});
		sector_ibsw.setMap(map);
	
		sector_ibse = new google.maps.Polygon({
			paths: ibse_sectorpath,
			strokeColor: "#888888",
			strokeOpacity: 0.8,
			strokeWeight: 1,
			fillColor: "#8888FF",
			fillOpacity: 0.35
		});
		sector_ibse.setMap(map);
	
					
};

