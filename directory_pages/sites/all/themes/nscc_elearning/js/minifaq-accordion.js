// Accordionize minifaqs
$(function() {
	$(".minifaq-accordion div.answer").hide();
	
	$(".minifaq-accordion h3.question").click(function(){
				//$(".minifaq-accordion div.answer").hide();
				$(this).toggleClass('expanded').next().slideToggle(150);
				return false;
	}).next().hide();
	
});
