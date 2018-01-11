/**
 *	@file nscc_conted.course_teaser_tooltips.js
 *
 *	Flyout tooltips for course teasers on category page. Depends on jQuery library
 *	and HoverIntent plugin.
 */

Drupal.behaviors.nscc_conted_course_teaser_tooltips = function(context) {
	var hoverconfig = {    
		sensitivity: 6,	// number = sensitivity threshold (must be 1 or higher)    
		interval: 100,	// number = milliseconds for onMouseOver polling interval    
		timeout: 200,	// number = milliseconds delay before onMouseOut
		over: teaser_show,	// function = onMouseOver callback (REQUIRED)
		out: teaser_hide	// function = onMouseOut callback (REQUIRED)
	};
	
	function teaser_show(event) {
		var event = event || window.event;
		//console.log('event: '+event.type+' x: '+event.pageX+' y: '+event.pageY);
		var course = $(this);
		var teaser = course.children('.course-teaser');
		//var pos_top = Math.floor(teaser.height()/3) * -1 + 'px';
		//var pos_top = event.pageX + 18 + 'px';
		var pos_top = course.children('h2').height() + 12 + 'px';
		//var w_course = course.width();
		var w_anchor = course.children('h2').children('a').width();
		//var c_teaser = Math.floor(teaser.width() / 2);
		//var pos_left = Math.floor(((w_course - w_anchor) / 2) - c_teaser + w_anchor) + 'px';
		//var pos_left = Math.floor(w_anchor + 18) + 'px';
		//var pos_left = event.pageY + 18 + 'px';
		var pos_left = Math.floor(w_anchor / 2) + 'px';
		teaser.css({'top':pos_top,'left':pos_left,'z-index':100});
		teaser.fadeIn('fast');
	}
	
	function teaser_hide(event) {
		var event = event || window.event;
		var course = $(this);
		var teaser = course.children('.course-teaser');
		teaser.fadeOut('fast');
	}
	$('.category-course-list .course-teaser').addClass('tooltip').hide();
	$('.category-course-list .course').css('position','relative').hoverIntent(hoverconfig);
}