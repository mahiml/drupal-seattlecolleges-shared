/**
 *	@file nscc_conted.js
 *
 *	Behaviors for Continuing Ed theme. Depends on jQuery
 */


//$(function(){
Drupal.behaviors.nscc_conted = function(context) {

	// Conted-specific housekeeping of std NSCC login form.
	var loginBlock = $('#block-nscc-1').remove();
	$('#footer').after(loginBlock);
	$('.netid_help').remove();
	
	// Anonomous user?
	if ($('body[class*="not-logged-in"]').length > 0) {
	 
		// Attach login form display-toggler.
		$('.login-link').toggle(
		function(event) {
		  loginBlock.show('fast', function() {
				//$('#toolbox').css('overflow','visible');	// ensures form, error msg, and tools are visible.
				$('#block-nscc-1 #user-login-form input:first').focus();
				$('.login-link').html('Cancel Login');
			 }
		  );
		  return false;
		},
		function(event) {
		  loginBlock.hide('fast', function() {
				$('.login-link').html('Login');
			 }
		  );
		  return false;
		}
		);
		
		// Display login error message above login form in toolbox.
		var pgErrMsg = $('.region-main .content-header .error').parent().html();
		if(pgErrMsg && pgErrMsg.match('netid|password', 'i')) {
			$('#block-nscc-1 #user-login-form div:first').prepend(pgErrMsg);
			$('.region-main .content-header').hide();
			$('#block-nscc-1 #user-login-form').show();
			//$('#toolbox').css('overflow','visible');	// ensures form, error msg, and tools are visible.
			$('.login-link').click();  // keeps toggler sync'd.
		} else {
			loginBlock.hide();
		}
	} else {
	 loginBlock.hide();
	}


	// Open tips for composing content in a new window.
	$('a[href="/filter/tips"]').attr('target', '_new');
	$('a[href="/filter/tips"]').parent().addClass('input-tips-links');


	// Relocate button-link (indicia) to main NSCC site to bottom of address block.
	var position_indicia = function() {
		var news = $('#news-headlines');
		var info = $('#college-info');
		var indicia = $('#nscc-indicia');
		if (news.outerHeight() > info.outerHeight()) {
			info.height(news.outerHeight());
			indicia.css({'position':'absolute','bottom':0,'left':0});
		}
		return indicia;
	}
	position_indicia();
};