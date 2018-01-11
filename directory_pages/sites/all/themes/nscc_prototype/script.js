// Dependencies: jQuery library (should be included by core automatically)

$(function() {

  // Anonomous user?
  if ($('body[class*="not-logged-in"]').length > 0) {
  
    // Login form display-toggler.
    $('#block-nscc-1 h2 a').toggle(
      function(event) {
        $('#block-nscc-1 #user-login-form').slideDown('fast',
          function() { $('#block-nscc-1 #user-login-form input:first').focus(); }
        );
        return false;
      },
      function(event) {
        $('#block-nscc-1 #user-login-form').slideUp('fast');
        return false;
      }
    );
//    $('#block-nscc-1 #user-login-form').hide();
    
    // Login Error?
    var pgErrMsg = $('.region-main .content-header .error').parent().html();
    if(pgErrMsg && pgErrMsg.match('netid|password', 'i')) {
      $('#block-nscc-1 #user-login-form div:first').prepend(pgErrMsg);
      $('.region-main .content-header').hide();
      $('#block-nscc-1 #user-login-form').show();
    }
    else {
      $('#block-nscc-1 #user-login-form').hide();
    }
  }
  else {
    $('#block-nscc-1 .content').hide();
  }
  
  // User profile list-striping
  $('.nscc-profile_list-item:nth-child(odd)').addClass('altRow');
  
  // Instructor courselist block striping
  //$('.block-nscc_profile .classes li:nth-child(odd)').addClass('altRow');
});