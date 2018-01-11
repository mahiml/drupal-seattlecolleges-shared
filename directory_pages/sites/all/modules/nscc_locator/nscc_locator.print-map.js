/*	Printable map conveniences	*/

Drupal.behaviors.print_map = function(context) {
	$('.block-nscc_locator.print-notice').css('cursor','pointer').attr('title','Print a copy of the map').click(function(e){window.print();});
	$('.block-nscc_locator.print-notice p strong').wrap('<a href="#" />').click(function(e){
		$('h1').css("display","none");
		$('.block-nscc_locator.pdf-link').css("display","none");
		//$('div#map_canvas img').css("position","absolute");
		//$('div#map_canvas img').css("-webkit-transform","rotate(90deg)");
		//$('div#map_canvas img').css("-moz-transform","rotate(90deg)");
		//$('div#map_canvas img').css("-o-transform","rotate(90deg)");
		//$('div#map_canvas img').css("-ms-transform","rotate(90deg)");
		//$('div#map_canvas img').css("transform","rotate(90deg)");
		//$('div#map_canvas img').css("filter","progid:DXImageTransform.Microsoft.BasicImage(rotation=3)");
		window.print();
		//$('div#map_canvas img').css("position","relative");
		//$('div#map_canvas img').css("-webkit-transform","rotate(0deg)");
		//$('div#map_canvas img').css("-moz-transform","rotate(0deg)");
		//$('div#map_canvas img').css("-o-transform","rotate(0deg)");
		//$('div#map_canvas img').css("-ms-transform","rotate(0deg)");
		//$('div#map_canvas img').css("transform","rotate(0deg)");
		//$('div#map_canvas img').css("filter","progid:DXImageTransform.Microsoft.BasicImage(rotation=1)");
		$('.block-nscc_locator.pdf-link').css("display","block");
		$('h1').css("display","block");
		e.stopPropagation();
	});
}