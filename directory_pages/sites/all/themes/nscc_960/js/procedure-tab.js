// Tabbed-panels behavior for Procedures
$(function() {
	var tabs = $("ol.procedure_steps").tabs("div.panes > div",{effect: 'fade',api: true});
	$('.tab_nav_link').hide();
	$('.tab_nav_span').show();
	$('.next_span').bind('click',function(event){ tabs.next(); });
	$('.prev_span').bind('click',function(event){ tabs.prev(); });
});
