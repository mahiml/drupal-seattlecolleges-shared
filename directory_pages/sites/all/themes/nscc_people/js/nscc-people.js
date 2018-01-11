// Dependencies: jQuery library (should be included by core automatically)
/* --- DISABLED 05apr2010 per Lori
$(function(){
  var instructorCourseItems = $('#instructor_schedule_quarter_display li.class');
  if (instructorCourseItems) {
    $.each(instructorCourseItems, function(){
      var editButton = $(this).find('a.edit-button');
      $(this).hover(
          function(){ editButton.fadeIn(100); },  // Over
          function(){ editButton.fadeOut(100); }  // Out
      );
    });
    $('a.edit-button').hide();
  }
});
*/