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
	var previousCenter;
	var previousZoom;
	var previousBounds;
	var backgroundOverlayBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(47.6958454,-122.335057),
		new google.maps.LatLng(47.7032728,-122.329748));
	var defaultZoom = 17;
	var closestPolyline = new google.maps.Polyline();
	/* No longer needed since gmap can be edited via Google interface
	var mapmodeOverlay = new google.maps.GroundOverlay(
		'https://prod.northseattle.edu/sites/all/themes/nscc_960/imgs/map-overlay-mapmode.png',
		backgroundOverlayBounds,{clickable:false});
	var othermodeOverlay = new google.maps.GroundOverlay(
		'https://prod.northseattle.edu/sites/all/themes/nscc_960/imgs/map-overlay-satmode.png',
		backgroundOverlayBounds,{clickable:false});
	*/					
	var mapOptions = {
		zoom: defaultZoom,
		center: campusCenter,
		//mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeId: google.maps.MapTypeId.HYBRID,
		disableDefaultUI: true,
		disableDoubleClickZoom: true,
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
	/* No longer needed since gmap can be edited via Google interface
	mapmodeOverlay.setMap(map);
	google.maps.event.addListener(map, 'maptypeid_changed', function(event) {
			if (map.getMapTypeId() == 'roadmap'){
					mapmodeOverlay.setMap(map);
					othermodeOverlay.setMap(null);
			} else {
					mapmodeOverlay.setMap(null);
					othermodeOverlay.setMap(map);
			} 
	});
	*/

	/*
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

	//search results	
	//var starting_sector = starting_sector || undefined;	
	if(typeof(starting_sector) != "undefined"){
		//alert("Starting Sector: " + starting_sector);
			var starting_sectorOptions = {
				clickable: false,
				strokeColor: color[starting_sector_level],
				strokeOpacity: 1.0,
				strokeWeight: 3,
				fillColor: color[starting_sector_level],
				fillOpacity: 0.35
			}
		var starting_sectorPoly = new google.maps.Polygon(starting_sectorOptions);
		var starting_sectorPath = starting_sectorPoly.getPath();
		var starting_sectorBounds = new google.maps.LatLngBounds();
		for(i in starting_sector){
			starting_sectorPoint = new google.maps.LatLng(starting_sector[i].lat,starting_sector[i].lng);
			starting_sectorPath.push( starting_sectorPoint );
			starting_sectorBounds.extend(starting_sectorPoint);
		}
		starting_sectorPoly.setMap(map);
		var starting_sectorCenter = starting_sectorBounds.getCenter();
		map.panTo(starting_sectorCenter);
	}

	var bd_polygons=[];
	var bd_polygonOptions = {
		clickable: false,
		strokeColor: '#FF8F00',
		strokeOpacity: 1.0,
		strokeWeight: 3,
		fillColor: '#FF8F00',
		fillOpacity: 0.35
	}
	var pk_polygons=[];
	var pk_polygonOptions = {
		clickable: false,
		strokeColor: '#880044',
		strokeOpacity: 1.0,
		strokeWeight: 3,
		fillColor: '#FF0088',
		fillOpacity: 0.35
	}


	function createPoiMenu(){
		$.get('/locator/menu',null,function(data){
					var MenuJson = Drupal.parseJson(data);
					for(i in MenuJson){
						menu_item_type = MenuJson[i]['type'];
						switch(menu_item_type){
							case 'poi_group':
								menu_item_nid = MenuJson[i]['nid'];
								menu_item_title = MenuJson[i]['title'];
								menu_item_icon = MenuJson[i]['marker_icon'];
								//alert("Menu Item: "+menu_item_type+","+menu_item_nid+","+menu_item_title+","+menu_item_icon);
								$('#locator-poi-menu').append('<li class="locator-map-menu-item" id="poigroup-toggle-'+menu_item_nid+'"><a href="javascript:void();"><img class="poi-type-icon" height="16" width="16" src="'+menu_item_icon+'">'+menu_item_title+'</a></li>');
								$('#poigroup-toggle-'+menu_item_nid).toggle(
										function(){
											$(this).toggleClass('on');
											var poigroup_id = $(this).attr('id');
											var target_nid = poigroup_id.replace(/^poigroup-toggle-/,'');
											$.get('/locator/poigroup/'+target_nid,null,parsePOIGroup);
											 },
										function(){
											$(this).toggleClass('on');
											var poigroup_id = $(this).attr('id');
											var target_nid = poigroup_id.replace(/^poigroup-toggle-/,'');
											//alert("target_nid: "+target_nid);
											deleteMarkersbynid(target_nid);
										}
								);
							break;
							case 'poi_category':
								menu_item_title = MenuJson[i]['title'];
								menu_item_category = MenuJson[i]['category'];
								menu_item_icon = MenuJson[i]['marker_icon'];
								$('#locator-poi-menu').append('<li class="locator-map-menu-item" id="poicategory-toggle-'+menu_item_category+'"><a href="javascript:void();"><img class="poi-type-icon" height="16" width="16" src="'+menu_item_icon+'">'+menu_item_title+'</a></li>');
								$('#poicategory-toggle-'+menu_item_category).toggle(
										function(){
											$(this).toggleClass('on');
											var poicategory_id = $(this).attr('id');
											var target_category = poicategory_id.replace(/^poicategory-toggle-/,'');
											//alert("Category: "+target_category);	
											$.get('/locator/poicategory/'+target_category,null,parsePOICategory);
											 },
										function(){
											$(this).toggleClass('on');
											var poicategory_id = $(this).attr('id');
											var target_category = poicategory_id.replace(/^poicategory-toggle-/,'');
											deleteMarkersbycategory(target_category);
										}
								);
							break;
							case 'building_details':
								menu_item_title = MenuJson[i]['title'];
								menu_item_abbr = MenuJson[i]['abbr'];
								menu_item_nid = MenuJson[i]['nid'];
								menu_item_point_array = Drupal.parseJson(MenuJson[i]['polygon']);
								//alert(menu_item_point_array);
								$('#locator-building-menu').append('<li class="locator-map-menu-item" id="building-toggle-'+menu_item_nid+'"><a href="javascript:void();">'+menu_item_title+' ('+menu_item_abbr+')</a></li>');
								bd_polygons[menu_item_nid] = new google.maps.Polygon(bd_polygonOptions);
								bd_polygons[menu_item_nid].pathvar = bd_polygons[menu_item_nid].getPath();
								bd_polygons[menu_item_nid].boundsvar = new google.maps.LatLngBounds();
								for(i in menu_item_point_array){
										bd_polygonPoint = new google.maps.LatLng(menu_item_point_array[i].lat,menu_item_point_array[i].lng);
										bd_polygons[menu_item_nid].pathvar.push( bd_polygonPoint );
										bd_polygons[menu_item_nid].boundsvar.extend(bd_polygonPoint);
								}
								//bd_polygons[menu_item_nid].setMap(map);
								bd_polygons[menu_item_nid].center = bd_polygons[menu_item_nid].boundsvar.getCenter();
								$('#building-toggle-'+menu_item_nid).hoverIntent(
										{
										sensitivity: 6,
										interval: 200,
										timeout: 300,
										over: function(){
											//$(this).toggleClass('on');
											var building_id = $(this).attr('id');
											var target_building_nid = building_id.replace(/^building-toggle-/,'');
											bd_polygons[target_building_nid].setMap(map);
											map.setZoom(defaultZoom);
											map.panTo(bd_polygons[target_building_nid].center);		
										},	
										out: function(){
											//$(this).toggleClass('on');
											var building_id = $(this).attr('id');
											var target_building_nid = building_id.replace(/^building-toggle-/,'');
											bd_polygons[target_building_nid].setMap(null);		
											//map.panTo(campusCenter); //stupid.		
										}
										}
								);
								$('#building-toggle-'+menu_item_nid).bind('click',
									function(){
										var building_id = $(this).attr('id');
										var target_building_nid = building_id.replace(/^building-toggle-/,'');
										$.post(
												'/locator/building/details',
												{bd_nid: target_building_nid},
													function(data){
														var overlaywidth = '400px';
														doOverlay(data.window_details,overlaywidth);
												},
												"json"
											);
										return false;
									}
								);
							break;
							case 'parking_kiosks':
								menu_item_title = MenuJson[i]['title'];
								menu_item_icon = MenuJson[i]['marker_icon'];
								$('#locator-parking-kiosk-menu').append('<li class="locator-map-menu-item" id="parking-kiosks-toggle" ><a href="javascript:void();"><img class="poi-type-icon" height="16" width="16" src="'+menu_item_icon+'">'+menu_item_title+'</a></li>');
								$('#parking-kiosks-toggle').toggle(
										function(){
											$(this).toggleClass('on');
											$.get('/locator/parking_kiosks',null,parseParkingKioskList);
										},
										function(){
											$(this).toggleClass('on');
											deleteMarkersbycategory('parking_kiosks');
										}
								);
							break;
							case 'parking_cat':
								menu_item_title = MenuJson[i]['title'];
								menu_item_nid = MenuJson[i]['nid'];
								menu_item_point_array_array = MenuJson[i]['polygon_array'];
								//alert(menu_item_point_array);
								$('#locator-parking-bytype-menu').append('<li class="locator-map-menu-item" id="parking-toggle-'+menu_item_nid+'"><a href="javascript:void();">'+menu_item_title+'</a></li>');
								pk_polygons[menu_item_nid] = new google.maps.Polygon(pk_polygonOptions);
								pk_polygons[menu_item_nid].pathsvar = pk_polygons[menu_item_nid].getPaths();
								pk_polygons[menu_item_nid].boundsvar = new google.maps.LatLngBounds();
								var pk_polygons_assembly_array = [];								
								for(i in menu_item_point_array_array){
										pk_polygons_assembly_array[i]=[];
										var menu_item_point_array = Drupal.parseJson(menu_item_point_array_array[i]);
										for (j in menu_item_point_array){
											pk_polygonPoint = new google.maps.LatLng(menu_item_point_array[j].lat,menu_item_point_array[j].lng);
											pk_polygons_assembly_array[i][j] = pk_polygonPoint;
											//pk_polygons[menu_item_nid].pathsvar[i].push( pk_polygonPoint );
											pk_polygons[menu_item_nid].boundsvar.extend(pk_polygonPoint);
										} 
								}
								pk_polygons[menu_item_nid].setPaths(pk_polygons_assembly_array);
								pk_polygons[menu_item_nid].center = pk_polygons[menu_item_nid].boundsvar.getCenter();
								$('#parking-toggle-'+menu_item_nid).hoverIntent(
										{
										sensitivity: 6,
										interval: 200,
										timeout: 300,
										over: function(){
											//$(this).toggleClass('on');
											var parking_id = $(this).attr('id');
											var target_nid = parking_id.replace(/^parking-toggle-/,'');
											pk_polygons[target_nid].setMap(map);
											previousCenter = map.getCenter();
											previousBounds = map.getBounds();
											previousZoom = map.getZoom();
											map.panTo(pk_polygons[target_nid].center);
											map.fitBounds(pk_polygons[target_nid].boundsvar);
											if (map.getZoom() >= 18){
												map.setZoom(18);
											}		
										},	
										out: function(){
											//$(this).toggleClass('on');
											var parking_id = $(this).attr('id');
											var target_nid = parking_id.replace(/^parking-toggle-/,'');
											pk_polygons[target_nid].setMap(null);													
											//map.panTo(previousCenter); //stupid.
											//map.setZoom(previousZoom);
											//map.fitBounds(previousBounds);		
										}
										}
								);
								$('#parking-toggle-'+menu_item_nid).bind('click',
									function(){
										var parking_id = $(this).attr('id');
										var target_nid = parking_id.replace(/^parking-toggle-/,'');
										$.post(
												'/locator/parking/details',
												{pk_nid: target_nid},
													function(data){
														var overlaywidth = '400px';
														doOverlay(data.window_details,overlaywidth);
												},
												"json"
											);
										return false;
									}
								);
							break;							
							case 'parking_lot':
								menu_item_title = MenuJson[i]['title'];
								menu_item_nid = MenuJson[i]['nid'];
								menu_item_point_array = Drupal.parseJson(MenuJson[i]['polygon']);
								//alert(menu_item_point_array);
								$('#locator-parking-bylot-menu').append('<li class="locator-map-menu-item" id="parking-toggle-'+menu_item_nid+'"><a href="javascript:void();">'+menu_item_title+'</a></li>');
								pk_polygons[menu_item_nid] = new google.maps.Polygon(pk_polygonOptions);
								pk_polygons[menu_item_nid].pathvar = pk_polygons[menu_item_nid].getPath();
								pk_polygons[menu_item_nid].boundsvar = new google.maps.LatLngBounds();
								for(i in menu_item_point_array){
										pk_polygonPoint = new google.maps.LatLng(menu_item_point_array[i].lat,menu_item_point_array[i].lng);
										pk_polygons[menu_item_nid].pathvar.push( pk_polygonPoint );
										pk_polygons[menu_item_nid].boundsvar.extend(pk_polygonPoint);
								}
								//bd_polygons[menu_item_nid].setMap(map);
								pk_polygons[menu_item_nid].center = pk_polygons[menu_item_nid].boundsvar.getCenter();
								$('#parking-toggle-'+menu_item_nid).hoverIntent(
										{
										sensitivity: 6,
										interval: 200,
										timeout: 300,
										over: function(){
											$(this).toggleClass('on');
											var parking_id = $(this).attr('id');
											var target_nid = parking_id.replace(/^parking-toggle-/,'');
											pk_polygons[target_nid].setMap(map);
											map.panTo(pk_polygons[target_nid].center);
											map.setZoom(defaultZoom);		
										},	
										out: function(){
											$(this).toggleClass('on');
											var parking_id = $(this).attr('id');
											var target_nid = parking_id.replace(/^parking-toggle-/,'');
											pk_polygons[target_nid].setMap(null);		
											//map.panTo(campusCenter); //stupid.		
										}
										}
								);
							break;
								
						}
					}
					//$('#locator-poi-menu').append('<li class="locator-poitype-toggle" id="locator-clearall-toggle"><a href="javascript:void();"><img  class="poi-type-icon" height="16" width="16" src="/sites/all/themes/nscc_960/imgs/icons/map/map-labels-clear.png">Clear Map</a></li>');
					//$('#locator-clearall-toggle').bind('click',function(){ deleteMarkers(); });
			});
		
	}
	createPoiMenu();

	$('.block-nscc_locator h2').toggle(
		function(){
			$(this).parent('.block-nscc_locator').children('div.locator-menu').slideDown('fast');
			$(this).toggleClass('open');
		},
		function(){
			$(this).parent('.block-nscc_locator').children('div.locator-menu').slideUp('fast');
			$(this).toggleClass('open');
		}
	);	
	
	function parsePOIGroup(data){
		var POIJson = Drupal.parseJson(data);
		//var POIString = "POIString: \n";
		for(i in POIJson){
			//POIString = POIString + i +": "+POIJson[i]['lat']+","+POIJson[i]['long'] +"," + POIJson[i]['name'] +"," + POIJson[i]['poi_id'] +"," + POIJson[i]['poi_g_nid']+"," + POIJson[i]['icon_url']+"," + POIJson[i]['shadow_url'] + "\n";
			poiLocation = new google.maps.LatLng(POIJson[i]['lat'],POIJson[i]['long']);
			poiMarker = new google.maps.Marker({position: poiLocation, map: map, title: i + ": " + POIJson[i]['name'], icon: POIJson[i]['icon_url'],shadow: POIJson[i]['shadow_url'], flat: true});
			poiMarker.poi_id = POIJson[i]['poi_id'];
			poiMarker.nid = POIJson[i]['poi_g_nid'];
			//poiMarker.setTitle(poiMarker.poi_id + ": " + POIJson[i]['name']);
			markersArray.push(poiMarker);
		}
		//alert(POIString);
	}
	function parsePOICategory(data){
		var POIJson = Drupal.parseJson(data);
		for(i in POIJson){
			//alert("title: "+POIJson[i]['name']+"category: "+POIJson[i]['poi_category']+"Lat: "+POIJson[i]['lat'] );
			poiLocation = new google.maps.LatLng(POIJson[i]['lat'],POIJson[i]['long']);
			poiMarker = new google.maps.Marker({position: poiLocation, map: map, title: POIJson[i]['name'], icon: POIJson[i]['icon_url'], shadow: POIJson[i]['shadow_url'],flat: false});
			poiMarker.poi_id = POIJson[i]['poi_id'];
			poiMarker.category = POIJson[i]['poi_category'];
			poiMarker.setTitle(poiMarker.poi_id + ": " + POIJson[i]['name']);
			markersArray.push(poiMarker);
			attachPOIDetails(poiMarker,i);
		}						
	}

	function attachPOIDetails(attachmarker,index){
			google.maps.event.addListener(attachmarker, 'click', function(event) {
				//alert("clicked poi_id: "+attachmarker.poi_id);
				$.post(
						'/locator/poicategory/poidetails',
						{poi_id: attachmarker.poi_id},
							function(data){
								var overlaywidth = '280px';
								doOverlay(data.window_details,overlaywidth);
						},
						"json"
					);
			});	
	}
	
	function parseParkingKioskList(data){
		var POIJson = Drupal.parseJson(data);
		for(i in POIJson){
			//alert("title: "+POIJson[i]['name']+"category: "+POIJson[i]['poi_category']+"Lat: "+POIJson[i]['lat'] );
			poiLocation = new google.maps.LatLng(POIJson[i]['lat'],POIJson[i]['long']);
			poiMarker = new google.maps.Marker({position: poiLocation, map: map, title: POIJson[i]['name'], icon: POIJson[i]['icon_url'], shadow: POIJson[i]['shadow_url'],flat: false});
			poiMarker.poi_id = POIJson[i]['pk_id'];
			poiMarker.category = POIJson[i]['category'];
			poiMarker.setTitle(poiMarker.poi_id + ": " + POIJson[i]['name']);
			markersArray.push(poiMarker);
			attachPKDetails(poiMarker,i);
		}						
	
	}
	function attachPKDetails(attachmarker,index){
			google.maps.event.addListener(attachmarker, 'click', function(event) {
				$.post(
						'/locator/parking_kiosks/pkdetails',
						{poi_id: attachmarker.poi_id},
							function(data){
								var overlaywidth = '280px';
								doOverlay(data.window_details,overlaywidth);
						},
						"json"
					);
			});	
	}



	//fancy query overlay
	$("body div#container").after($("#locator-overlay-wrapper"));
	$("#locator-overlay-wrapper").click(function(){hideOverlay();});
	$("#locator-overlay-photo").click(function(){hideOverlay();});
	
	function hideOverlay(){
		$("#locator-overlay-wrapper").hide(50);
		$("#locator-overlay-photo").html('');
	}
/*
	function doOverlay(content,overlaywidth){
		$("#locator-overlay-placeholder").html('<div class="locator-overlay-content" style="width: '+overlaywidth+';">'+content+"</div>");
		$("#locator-overlay-wrapper").show();
		$("#locator-overlay-matte").show();
		var leftmargin = ($(window).width() - $("#locator-overlay-content").width())/2;
		$("#locator-overlay-content").css('left',leftmargin);
		$("#locator-overlay-content").fadeIn('fast').vCenter();
	}
*/
	function doOverlay(content,overlaywidth){
		//The dark background overlay
		$('body').append('<div id="fade-background">&nbsp;</div>');
		$('#fade-background').height($('body').outerHeight()).width($('body').outerWidth());
		$('#fade-background').click(function(){ $('.flyout').remove(); $(this).remove();return false;});

		//The actual content
		$('body').append('<div id="locator-flyout" class="locator-flyout flyout">'+content+'</div>');
		$('#locator-flyout').show().vCenter();
		$('#locator-flyout').width(overlaywidth);
		var leftmargin = ($(window).width() - $('#locator-flyout').width())/2;
		$('#locator-flyout').css('left',leftmargin);
		$('#locator-flyout').bind('click',function(){ $(this).remove(); $('#fade-background').remove(); return true;});
	}



	function deleteMarkersbynid(nid){
		if(markersArray){
			for(i in markersArray){
				if(markersArray[i].nid == nid){
					markersArray[i].setMap(null);
				}
			}
		}
	}

	function deleteMarkersbycategory(category){
		if(markersArray){
			for(i in markersArray){
				if(markersArray[i].category == category){
					markersArray[i].setMap(null);
					if(typeof(markersArray[i].infoWindow)!='undefined'){
						markersArray[i].infoWindow.close();
					}					
				}
			}
		}
	}

};



//custom centering funtion as jquery plugin
(function($) {
  $.fn.vCenter = function(options) {
    var pos = {
      sTop : function() {
        return window.pageYOffset
        || document.documentElement && document.documentElement.scrollTop
        ||  document.body.scrollTop;
      },
      wHeight : function() {
        return window.innerHeight
        || document.documentElement && document.documentElement.clientHeight
        || document.body.clientHeight;
      }
    };
    return this.each(function(index) {
      if (index == 0) {
        var $this = $(this);
        var elHeight = $this.height();
        var elTop = pos.sTop() + (pos.wHeight() / 2) - (elHeight / 2);
        if(elTop<10){ elTop=10; }
        $this.css({
          position: 'absolute',
          margin: '0 auto',
          top: elTop
        });
      }
    });
  };
 
})(jQuery); // end plugin


