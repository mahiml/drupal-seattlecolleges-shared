// Dependencies: jQuery library (should be included by core automatically)

$(function() {

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