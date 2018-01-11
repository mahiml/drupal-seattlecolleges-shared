// Tabbed-panels behavior for Procedures
$(function() {

	//$("div.procedure-accordion").accordion();
	$("div.procedure-accordion div.procedure-accordian-step-body").hide();
/*	
	$("div.procedure-accordion h3.procedure-accordian-step-title").click(function(){
				if($(this).hasClass('expanded')){
					$(this).removeClass('expanded').next().slideUp(500);
					return false;
				} else {
					$("div.procedure-accordion div.procedure-accordian-step-body").slideUp(500);
					$(this).addClass('expanded').next().slideDown(300);
					return false;
				}	
	});
*/
	
	$("div.procedure-accordion h3.procedure-accordian-step-title").click(function(){
		if($(this).hasClass('expanded')){
			$(this).removeClass('expanded').next().slideUp(500);
		} else {
			$("div.procedure-accordion h3.procedure-accordian-step-title").removeClass('expanded').next().slideUp(500);
			$(this).addClass('expanded').next().slideDown(300);
		}
		return false;
	});

});
