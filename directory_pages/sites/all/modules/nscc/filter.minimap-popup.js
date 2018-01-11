// $Id: nscc_schedule.js,v 1.2 2007/12/08 14:06:22 goba Exp $

/**
* Bindings for the open and close button
* for each item.
*/
Drupal.behaviors.nscc_minimap_popup = function(context) {
	// Minimap flyout
	
	$('span.minimap-popup').hoverIntent({
		timeout: 300,
		over: function(event) {
			var trigger = $(this);
			var link = trigger.children('a');
			var room = link.html();
			var style = 'position:absolute;top:' + (link.position().top - 86) + 'px;left:' + (link.position().left + trigger.width()) + 'px;z-index:10000;padding:12px 12px 12px 40px;background:transparent url(/sites/all/themes/nscc_960/imgs/bg-minimap-schedule.png) top left no-repeat;width:185px;height:196px;';
			$.get('/minimap/' + room, function(data) {
					link.after('<div class="minimap-tooltip" style="'+style+'"><a href="https://northseattle.edu/locator/locate/' + room + '">' + data + '</a></div>');
			});
		},
		out: function(event) {
			$(this).children('.minimap-tooltip').remove();
		}
	});
	
};