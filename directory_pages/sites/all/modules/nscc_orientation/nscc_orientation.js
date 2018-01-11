Drupal.behaviors.nscc_orientation = function(context) {
	// Minimap flyout
	var mm_trigger = $('.location a');
  	mm_trigger.parent().parent().hoverIntent({
		timeout: 300,
		over: function(event) {
			var trigger = $(this);
			var room = $(this).children().children('a').html();
			var style = 'position:absolute;top:' + (trigger.position().top - 86) + 'px;left:' + (trigger.position().left + trigger.children('span').children('a').width()) + 'px;z-index:10000;padding:12px 12px 12px 40px;background:transparent url(/sites/all/themes/nscc_960/imgs/bg-minimap-schedule.png) top left no-repeat;width:185px;height:196px;';
			$.get('/minimap/' + room, function(data) {
					trigger.children('span').after('<div class="minimap-tooltip" style="'+style+'"><a href="/locator/locate/' + room + '">' + data + '</a></div>');
			});
		},
		out: function(event) {
			$(this).children('.minimap-tooltip').remove();
		}
	});

};