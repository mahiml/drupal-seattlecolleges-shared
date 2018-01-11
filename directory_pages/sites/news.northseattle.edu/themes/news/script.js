// Dependencies: jQuery library (should be included by core automatically)

$(function() {
  // Login form UI enhancements
  $('#block-user-0 h2:first').wrapInner('<a href="#user-login-form" title="Login to add or edit content"></a>');
  $('#block-user-0 h2 a:first').toggle(
    function(event) {
      $('#user-login-form').slideDown('normal',
        function() { $('#user-login-form input:first').focus(); }
      );
      return false;
    },
    function(event) {
//      $('#user-login-form input').blur();
      $('#user-login-form').slideUp('normal');
      return false;
    }
  );
  $('#user-login-form').hide();

  // Hork-form UI enhancements
  $('.node .feed-picker h2:first').wrapInner('<a href="#nscc-feed-picker-form" title="Add this to your feeds"></a>');
  $('.node .feed-picker h2 a:first').toggle(
    function(event) {
      $('#nscc-feed-picker-form').slideDown('normal',
        function() { $('#nscc-feed-picker-form select:first').focus(); }
      );      
      return false;
    },
    function(event) {
//      $('#nscc-feed-picker-form select').blur();
      $('#nscc-feed-picker-form').slideUp('normal');
      return false;
    }
  );
  $('#nscc-feed-picker-form').hide();
});