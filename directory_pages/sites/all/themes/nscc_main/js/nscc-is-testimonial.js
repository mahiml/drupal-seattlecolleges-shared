$(function(){
 $('.is-testimonial-bio').hide();

 $('div.node-type-testimonial-is').each(function(index) {
 		if ($(this).find('div.is-testimonial-quote-wrapper').height() >=  $(this).find('div.is-testimonial-bio-wrapper').height() ) {
 			$(this).height($(this).find('div.is-testimonial-quote-wrapper').height()+150 );
 		} else {
 			$(this).height($(this).find('div.is-testimonial-bio-wrapper').height()+150 );
 		}		
 });
 
 $('div.node-type-testimonial-is').hoverIntent(
 	function(){
 		//alert('on');
	 //$(this).find('h2').hide();
 	 $(this).find('.is-testimonial-quote').hide();
	 $(this).find('.is-testimonial-bio').fadeIn();
 	},
 	function(){
 		//alert('off');
	// $(this).find('h2').fadeIn();
 	 $(this).find('.is-testimonial-quote').fadeIn();
	 $(this).find('.is-testimonial-bio').hide();
 	}
 );
});