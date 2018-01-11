/**
 *		Behaviors for Coops site
 */


$(function(){

	// Coops-specific housekeeping of std NSCC login form.
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


	// Menu adjustment: hide programs of school and indicate school as active when viewing schools or programs.
	var activePgmLink = $('.node-type-program .region-left a.active');
	activePgmLink.parent().siblings().andSelf().hide();
	activePgmLink.parent().parent().parent().children('a').addClass('active');
	$('.node-type-school .region-left a.active').siblings().hide();
});