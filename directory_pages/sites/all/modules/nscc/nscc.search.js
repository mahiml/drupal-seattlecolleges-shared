// $Id: nscc.nav_menu.js,v 1.2 2007/12/08 14:06:22 goba Exp $

/**
* Bindings for the navigation menu rollover panels 
* in the nav_menu block
*/
Drupal.behaviors.nscc_search = function(context){
	$('.nscc-search-results-page').hide();
	gotopage(1);
  
  var pager_list = $('div.nscc-search-results-pager').html();
	$('span.per-page-pager-list').html(pager_list);
	$('a.nscc-search-results-page-link').bind('click',function(){
		var target_page = $(this).attr('href').match(/search-results-page-(\d+)$/);
		gotopage(target_page[1]);
		return false;
		});
	
	//add all the next/previous buttons
	$('.nscc-search-results-page-controls').map(function(){
		var page_matches = $(this).attr('id').match(/nscc-search-results-page-controls-(\d+)/);
		var page_no = parseInt(page_matches[1]);
		var next_page_no = page_no + 1;
		var prev_page_no = page_no - 1;
		if($('#nscc-search-results-page-controls-'+next_page_no).length != 0){
		  $('#nscc-search-results-next-pane-control-'+page_no).html('<a href="#nscc-search-results-page-'+next_page_no+'">Next</a>');
		} 
		if($('#nscc-search-results-page-controls-'+prev_page_no).length != 0){
		  $('#nscc-search-results-previous-pane-control-'+page_no).html('<a href="#nscc-search-results-page-'+prev_page_no+'">Prev</a>');
		} 	
	});
	//map previous/next button clicks
	$('.nscc-search-results-next-pane-control > a').bind('click',function(){
		 var page_matches = $(this).attr('href').match(/#nscc-search-results-page-(\d+)/);
		 var page_no = parseInt(page_matches[1]);
		 gotopage(page_no);
		 return false;
	});
	$('.nscc-search-results-previous-pane-control > a').bind('click',function(){
		 var page_matches = $(this).attr('href').match(/#nscc-search-results-page-(\d+)/);
		 var page_no = parseInt(page_matches[1]);
		 gotopage(page_no);
		 return false;
	});
	
	
	function gotopage(destination_id){
		$('.nscc-search-results-page.open').hide();
		$('.nscc-search-results-page.open').toggleClass('open');
		$('#nscc-search-results-page-'+destination_id).fadeIn();
		$('#nscc-search-results-page-'+destination_id).toggleClass('open');		
		$('a.nscc-search-results-page-link.active-page').toggleClass('active-page');
		$('a.nscc-search-results-page-link[href="#nscc-search-results-page-'+destination_id+'"]').toggleClass('active-page')
	}
	
};