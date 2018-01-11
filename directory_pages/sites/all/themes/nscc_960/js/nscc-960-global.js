// Dependencies: jQuery library (should be included by core automatically)


$(function() {

  // Anonomous user?
  if ($('body[class*="not-logged-in"]').length > 0) {
    
    // Attach login form display-toggler.
    $('#block-nscc-1 h2 a').toggle(
      function(event) {
        $('#block-nscc-1 #user-login-form').slideDown('fast',
          function() {
				$('#toolbox').css('overflow','visible');	// ensures form, error msg, and tools are visible.
            $('#block-nscc-1 #user-login-form input:first').focus();
            $('#block-nscc-1 h2 a').html('Cancel');
          }
        );
        return false;
      },
      function(event) {
        $('#block-nscc-1 #user-login-form').slideUp('fast',
          function() {
          	$('#block-nscc-1 h2 a').html('Login');
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
      $('#toolbox').css('overflow','visible');	// ensures form, error msg, and tools are visible.
      $('#block-nscc-1 h2 a').click();  // keeps toggler sync'd.
    }
    else {
      $('#block-nscc-1 #user-login-form').hide();
    }
  }
  else {
    $('#block-nscc-1 .content').hide();
  }
  
  
  // Alternate background color for tables & lists.
  $('.nscc-profile_list-item:nth-child(odd)').addClass('altRow');
  $('.tuition-table tbody tr:nth-child(odd)').css('background-color','rgb(223, 232, 234)');

  
  // Open tips for composing content in a new window.
  $('a[href="/filter/tips"]').attr('target', '_new');


	// Frame buster
	if (top != self) {
		if ($('#node-55') != undefined) {	//exception: 24/7 library help page
			$('ul.primary-local-tasks a').attr('target', '_top');	//admin tasks should not occur inside frameset.
		} else {
			alert('The URL '+self.location.href+' cannot be viewed inside a frame. You will be redirected to the full page.');
			top.location.replace(self.location.href);
		}
	}
	
	
	// Degree Audit Beta Alert
	$('a[href="https://www.public.ctc.edu/DAStudentWeb/Login.aspx?col=063"]').click(function() {
//    alert('The Degree Audit system is in beta testing. Some features may not work yet.\n\nYou are welcome to use it for UNOFFICIAL info. Be sure to meet with an advisor or your faculty coordinator to review the audit for accuracy and confirm your progress towards your degree or certificate.\n\nIf your degree or certificate is not listed, please contact your advisor or faculty coordinator for assistance.');
		alert('Degree Audits are not official.\nSee your advisor to verify academic progress.');
    return true;
	});
	
	
	// Trap logo capture [doesn't seem to work as expected]
	$('#logo img').bind('mousedown', function(e){
		if (e.which == 3) {
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
	});
});