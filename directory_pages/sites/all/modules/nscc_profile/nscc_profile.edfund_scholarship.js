// $Id: nscc_profile.edfund_scholarship.js,v 1.2 2007/12/08 14:06:22 goba Exp $

/**
* Bindings for the next and previous quarter buttons
* in the instructor class schedule block.
*/
Drupal.behaviors.nscc_profile_edfund_scholarship_block = function(context) {
		$(".edfund-schol-rec-req div.slide-out-button").bind('click',function (){
			$(".edfund-schol-rec-req div.slide-out-content").toggle('fast');
			$(".edfund-schol-rec-req div.slide-out-button").toggleClass("open");
		});
	
	
};