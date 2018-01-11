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
				
		var polyOptions = {
    	strokeColor: '#FF0000',
    	strokeOpacity: 1.0,
    	strokeWeight: 3,
    	fillColor: "#FF0000",
    	fillOpacity: 0.35
  	}
  	var poly = new google.maps.Polygon(polyOptions);
  	poly.setMap(map);

		var polypath=[];
		var editPolygonPathClickHandler;

		var lineOptions = {
    	strokeColor: '#FF0000',
    	strokeOpacity: 1.0,
    	strokeWeight: 3,
  	}
  	var line = new google.maps.Polyline(lineOptions);
  	line.setMap(map);

		var linepath=[];
		var editLinePathClickHandler;



		function fillPolygonList(){
			$.post(
					'/locator/getpolygonlist',
					{},
					function(data){
						$('#polygon-edit-list').empty();
						for(i in data){
							poly_id = data[i]['poly_id'];
							poly_name = data[i]['name']; 
							$('#polygon-edit-list').append('<li><span  class="fakelink" id="polygon-edit-id-'+poly_id+'">'+poly_name+"</span></li>\n");
							attachEditPolyClicks(poly_id,poly_name);
						}
					},
					'json');
	  }

		function fillLineList(){
			$.post(
					'/locator/getlinelist',
					{},
					function(data){
						$('#line-edit-list').empty();
						for(i in data){
							line_id = data[i]['line_id'];
							line_name = data[i]['name']; 
							$('#line-edit-list').append('<li><span  class="fakelink" id="line-edit-id-'+line_id+'">'+line_name+"</span></li>\n");
							attachEditLineClicks(line_id,line_name);
						}
					},
					'json');
	  }

	  
		function attachEditPolyClicks(poly_id,poly_name){				
				$('#polygon-edit-id-'+poly_id).bind('click',function(){
						$.post(
								'/locator/getpolygon/',
								{'poly_id': poly_id},
								function(data){
									var path = poly.getPath();
									for(i in path){
										path.pop();
										polypath.pop();
									}
									polypath.length=0;
								  $('#polygon-edit-form').empty();
									$('#polygon-edit-form').append("<div class=\"form-field\"><input type=\"hidden\" id=\"polygon_id\" name=\"polygon_id\"></div>\n");
									$('#polygon-edit-form').append("<div class=\"form-field\"><input type=\"hidden\" id=\"polygon_json_points\" name=\"polygon_json_points\"></div>\n");
									$('#polygon-edit-form').append("<div class=\"form-field\"><label>Name: <input type=\"text\" id=\"polygon_name\" name=\"polygon_name\" size=\"15\" value=\"\"></label></div>\n");
									$('#polygon-edit-form').append("<h4>Current Polygon Points</h4>\n");
									$('#polygon-edit-form').append("<div id=\"pointlist\" class=\"locator-polygon-pointlist\">\n");
									$('#polygon-edit-form').append("</div>\n");
									$('#polygon-edit-form').append("<input id=\"clear-polygon\" type=\"button\" value=\"Redraw from Scratch\">\n");
									$('#polygon-edit-form').append("<div  class=\"form-field\"><input id=\"save-polygon\" type=\"button\" value=\"Update\"></div>\n");
									$('#polygon-edit-form').append("<div  class=\"form-field\"><input id=\"delete-polygon\" type=\"button\" value=\"Delete\"></div>\n");
									pointarray = $.secureEvalJSON(data.polygon.json);
									for(i in pointarray){
										point = new google.maps.LatLng(pointarray[i].lat,pointarray[i].lng);
										path.push( point );
										polypath.push({lat: pointarray[i].lat, lng: pointarray[i].lng});											
										$('#pointlist').append('<div class="locator-pointlist">'+point.toString()+'</div>');
									}
									$('#polygon_json_points').val(data.polygon.json);
									$('#polygon_id').val(data.polygon.poly_id);
									$('#polygon_name').val(data.polygon.name);

									$('#clear-polygon').bind('click',function(){
											clearPolygon();
											editPolygonPathClickHandler = google.maps.event.addListener(map, 'click', function(event) {
																	$('#polygon-edit-status').html('Points Cleared.');
													  			poly.setOptions({strokeColor: "#FF0000",fillColor: "#FF0000",fillOpacity: .80});
																	$('#pointlist').append('<div class="locator-pointlist">'+event.latLng.toString()+'</div>');
																	var path=poly.getPath();
																	path.push(event.latLng);
																	polypath.push({lat: event.latLng.lat(), lng: event.latLng.lng()});
									});

									});			
									$('#save-polygon').bind('click',function(){
											poly.setOptions({strokeColor: "#0000FF",fillColor: "#0000FF",fillOpacity: 0.35});
							  			jsonpath = $.toJSON(polypath);
											$('#pointlist').empty();
											$('#polygon_json_points').val(jsonpath);
											$.post(
												'/locator/edit/polygons/polygonsave',
												$('#polygon-edit-form').serialize(),
												function(data){
													$('#polygon-edit-status').html(data.status);
													fillPolygonList();
													$('#polygon-edit-form').empty();
													google.maps.event.clearListeners(map, 'click');
													},	
												'json');
									});
									$('#delete-polygon').bind('click',function(){
											$('#polygon-delete-confirmation').append("<form action=\"\" method=\"post\"><div>Really delete this polygon forever?</div><input type=\"button\" id=\"polygon-really-delete\" name=\"polygon-really-delete\" value=\"Delete Forever\"><input type=\"button\" id=\"polygon-cancel-delete\" name=\"polygon-cancel-delete\" value=\"No, Keep it.\"></form>");
											$('#polygon-edit-form').empty();
											$('#polygon-really-delete').bind('click',function(){
												$.post(
													'/locator/edit/polygons/polygondelete',
													{'poly_id': poly_id},
													function(data){
															$('#polygon-edit-status').html(data.status);
															$('#polygon-delete-confirmation').empty();
															fillPolygonList();
															clearPolygon();
															google.maps.event.clearListeners(map, 'click');	
													},
													'json'
												);
												});
											$('#polygon-cancel-delete').bind('click',function(){ $('#polygon-delete-confirmation').empty();});
									});
								},
								'json'
						);

				});	
		}

		function attachEditLineClicks(line_id,line_name){				
				$('#line-edit-id-'+line_id).bind('click',function(){
						$.post(
								'/locator/getline/',
								{'line_id': line_id},
								function(data){
									var path = line.getPath();
									for(i in path){
										path.pop();
										linepath.pop();
									}
									linepath.length=0;
								  $('#line-edit-form').empty();
									$('#line-edit-form').append("<div class=\"form-field\"><input type=\"hidden\" id=\"line_id\" name=\"line_id\"></div>\n");
									$('#line-edit-form').append("<div class=\"form-field\"><input type=\"hidden\" id=\"line_json_points\" name=\"line_json_points\"></div>\n");
									$('#line-edit-form').append("<div class=\"form-field\"><label>Name: <input type=\"text\" id=\"line_name\" name=\"line_name\" size=\"15\" value=\"\"></label></div>\n");
									$('#line-edit-form').append("<h4>Current line Points</h4>\n");
									$('#line-edit-form').append("<div id=\"line-pointlist\" class=\"locator-line-pointlist\">\n");
									$('#line-edit-form').append("</div>\n");
									$('#line-edit-form').append("<input id=\"clear-line\" type=\"button\" value=\"Redraw from Scratch\">\n");
									$('#line-edit-form').append("<div  class=\"form-field\"><input id=\"save-line\" type=\"button\" value=\"Update\"></div>\n");
									$('#line-edit-form').append("<div  class=\"form-field\"><input id=\"delete-line\" type=\"button\" value=\"Delete\"></div>\n");
									pointarray = $.secureEvalJSON(data.line.json);
									for(i in pointarray){
										point = new google.maps.LatLng(pointarray[i].lat,pointarray[i].lng);
										path.push( point );
										linepath.push({lat: pointarray[i].lat, lng: pointarray[i].lng});											
										$('#line-pointlist').append('<div class="locator-pointlist">'+point.toString()+'</div>');
									}
									$('#line_json_points').val(data.line.json);
									$('#line_id').val(data.line.line_id);
									$('#line_name').val(data.line.name);

									$('#clear-line').bind('click',function(){
											clearLine();
											editLinePathClickHandler = google.maps.event.addListener(map, 'click', function(event) {
																	$('#line-edit-status').html('Points Cleared.');
													  			line.setOptions({strokeColor: "#FF0000"});
																	$('#line-pointlist').append('<div class="locator-pointlist">'+event.latLng.toString()+'</div>');
																	var path=line.getPath();
																	path.push(event.latLng);
																	linepath.push({lat: event.latLng.lat(), lng: event.latLng.lng()});
									});

									});			
									$('#save-line').bind('click',function(){
											line.setOptions({strokeColor: "#0000FF"});
							  			jsonpath = $.toJSON(linepath);
											$('#line-pointlist').empty();
											$('#line_json_points').val(jsonpath);
											$.post(
												'/locator/edit/lines/linesave',
												$('#line-edit-form').serialize(),
												function(data){
													$('#line-edit-status').html(data.status);
													fillLineList();
													$('#line-edit-form').empty();
													google.maps.event.clearListeners(map, 'click');
													},	
												'json');
									});
									$('#delete-line').bind('click',function(){
											$('#line-delete-confirmation').append("<form action=\"\" method=\"post\"><div>Really delete this line forever?</div><input type=\"button\" id=\"line-really-delete\" name=\"line-really-delete\" value=\"Delete Forever\"><input type=\"button\" id=\"line-cancel-delete\" name=\"line-cancel-delete\" value=\"No, Keep it.\"></form>");
											$('#line-edit-form').empty();
											$('#line-really-delete').bind('click',function(){
												$.post(
													'/locator/edit/lines/linedelete',
													{'line_id': line_id},
													function(data){
															$('#line-edit-status').html(data.status);
															$('#line-delete-confirmation').empty();
															fillLineList();
															clearLine();
															google.maps.event.clearListeners(map, 'click');	
													},
													'json'
												);
												});
											$('#line-cancel-delete').bind('click',function(){ $('#line-delete-confirmation').empty();});
									});
								},
								'json'
						);

				});	
		}



		function clearPolygon(){
			$('#pointlist').empty();
			var path = poly.getPath();
			for(i in path){
				path.pop();
				polypath.pop();
			}
			polypath.length=0;
		}

		function clearLine(){
			$('#line-pointlist').empty();
			var path = line.getPath();
			for(i in path){
				path.pop();
				linepath.pop();
			}
			linepath.length=0;
		}


		function addNewPolygonForm(){
		  $('#polygon-edit-form').empty();
			$('#polygon-edit-form').append("<div class=\"form-field\"><input type=\"hidden\" id=\"polygon_id\" name=\"polygon_id\"></div>\n");
			$('#polygon-edit-form').append("<div class=\"form-field\"><input type=\"hidden\" id=\"polygon_json_points\" name=\"polygon_json_points\"></div>\n");
			$('#polygon-edit-form').append("<div class=\"form-field\"><label>Name: <input type=\"text\" id=\"polygon_name\" name=\"polygon_name\" size=\"15\" value=\"New Polygon\"></label></div>\n");
			$('#polygon-edit-form').append("<h4>Current Polygon Points</h4>\n");
			$('#polygon-edit-form').append("<div id=\"pointlist\" class=\"locator-polygon-pointlist\">\n");
			$('#polygon-edit-form').append("</div>\n");
			$('#polygon-edit-form').append("<input id=\"clear-polygon\" type=\"button\" value=\"Redraw from Scratch\">\n");
			$('#polygon-edit-form').append("<div  class=\"form-field\"><input id=\"save-polygon\" type=\"button\" value=\"Save\"></div>\n");
			clearPolygon();	
			editPolygonPathClickHandler = google.maps.event.addListener(map, 'click', function(event) {
				poly.setOptions({strokeColor: "#FF0000",fillColor: "#FF0000",fillOpacity: .80});
				$('#pointlist').append('<div class="locator-pointlist">'+event.latLng.toString()+'</div>');
				var path=poly.getPath();
				path.push(event.latLng);
				polypath.push({lat: event.latLng.lat(), lng: event.latLng.lng()});
			});
			$('#clear-polygon').bind('click',function(){ clearPolygon();});			
			$('#save-polygon').bind('click',function(){
	  			poly.setOptions({strokeColor: "#0000FF",fillColor: "#0000FF",fillOpacity: .80});
	  			jsonpath = $.toJSON(polypath);
					$('#pointlist').empty();
					$('#polygon_json_points').val(jsonpath);
					$.post(
						'/locator/edit/polygons/polygonsave',
						$('#polygon-edit-form').serialize(),
						function(data){
								$('#polygon-edit-status').html(data.status);
								fillPolygonList();
								$('#polygon-edit-form').empty();
								google.maps.event.clearListeners(map, 'click');},
						'json');
						}
				 );
		}

		function addNewLineForm(){
		  $('#line-edit-form').empty();
			$('#line-edit-form').append("<div class=\"form-field\"><input type=\"hidden\" id=\"line_id\" name=\"line_id\"></div>\n");
			$('#line-edit-form').append("<div class=\"form-field\"><input type=\"hidden\" id=\"line_json_points\" name=\"line_json_points\"></div>\n");
			$('#line-edit-form').append("<div class=\"form-field\"><label>Name: <input type=\"text\" id=\"line_name\" name=\"line_name\" size=\"15\" value=\"New Line\"></label></div>\n");
			$('#line-edit-form').append("<h4>Current Line Points</h4>\n");
			$('#line-edit-form').append("<div id=\"line-pointlist\" class=\"locator-line-pointlist\">\n");
			$('#line-edit-form').append("</div>\n");
			$('#line-edit-form').append("<input id=\"clear-line\" type=\"button\" value=\"Redraw from Scratch\">\n");
			$('#line-edit-form').append("<div  class=\"form-field\"><input id=\"save-line\" type=\"button\" value=\"Save\"></div>\n");
			clearLine();	
			editLinePathClickHandler = google.maps.event.addListener(map, 'click', function(event) {
				line.setOptions({strokeColor: "#FF0000"});
				$('#line-pointlist').append('<div class="locator-pointlist">'+event.latLng.toString()+'</div>');
				var path=line.getPath();
				path.push(event.latLng);
				linepath.push({lat: event.latLng.lat(), lng: event.latLng.lng()});
			});
			$('#clear-line').bind('click',function(){ clearLine();});			
			$('#save-line').bind('click',function(){
	  			line.setOptions({strokeColor: "#0000FF",});
	  			jsonpath = $.toJSON(linepath);
					$('#line-pointlist').empty();
					$('#line_json_points').val(jsonpath);
					$.post(
						'/locator/edit/lines/linesave',
						$('#line-edit-form').serialize(),
						function(data){
								$('#line-edit-status').html(data.status);
								fillLineList();
								$('#line-edit-form').empty();
								google.maps.event.clearListeners(map, 'click');},
						'json');
						}
				 );
		}

		fillPolygonList();
		fillLineList();
		$('#add-polygon').bind('click',function(){ addNewPolygonForm();});			
		$('#add-line').bind('click',function(){ addNewLineForm();});			

	

};

