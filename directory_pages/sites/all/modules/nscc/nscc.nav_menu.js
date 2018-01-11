// $Id: nscc.nav_menu.js,v 1.2 2007/12/08 14:06:22 goba Exp $

/**
* Bindings for the navigation menu rollover panels 
* in the nav_menu block
*/
Drupal.behaviors.nscc_nav_menu_block = function(context){
	//Nav index flyout behaviours
	var hoverconfig = {    
     	sensitivity: 6, // number = sensitivity threshold (must be 1 or higher)    
     	interval: 100, // number = milliseconds for onMouseOver polling interval    
     	over: nav_panel_in, // function = onMouseOver callback (REQUIRED)    
     	timeout: 200, // number = milliseconds delay before onMouseOut    
     	out: nav_panel_out // function = onMouseOut callback (REQUIRED)    
	};

	$("li.nav_index_entry").hoverIntent(hoverconfig);
  
	function nav_panel_in(){
	  $(this).parent().children("li.nav_index_entry").children(".nav_index_wrapper").fadeOut(200);
	  //$(this).parent().children("li.nav_index_entry").children(".nav_index_wrapper").slideUp('fast');
	  $(this).addClass("here");
		$(this).children(".nav_index_wrapper").fadeIn(100);
		//$(this).children(".nav_index_wrapper").slideDown('fast');
	}

	function nav_panel_out(){
		$(this).children(".nav_index_wrapper").fadeOut(200);
		//$(this).children(".nav_index_wrapper").slideUp('fast');
	  $(this).removeClass("here");
	}
	
};