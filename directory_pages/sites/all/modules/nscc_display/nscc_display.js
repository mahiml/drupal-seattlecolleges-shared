Drupal.behaviors.nscc_display_clock = function(context) {
	nscc_displayUpdateClock();
	nscc_displayUpdateSlide();
	nscc_displayUpdateCalendar();
	$('.time-header').addClass('crawler');
}
var current_slide = 0;
var current_color = 0;
var color = [
	'sac',
	'rust',
	'lime',
	'midnight',
	'enterprise',
	'disappointment',
	'fructose',
	'miasma',
	'thirsty',
	'kahuna',
	'vapid'
];


function nscc_displayUpdateClock(){
	 var months = new Array(13);
	 months[0]  = "Jan";
	 months[1]  = "Feb";
	 months[2]  = "Mar";
	 months[3]  = "Apr";
	 months[4]  = "May";
	 months[5]  = "Jun";
	 months[6]  = "Jul";
	 months[7]  = "Aug";
	 months[8]  = "Sep";
	 months[9]  = "Oct";
	 months[10] = "Nov";
	 months[11] = "Dec";


	var datetime = new Date();
	var minute = datetime.getMinutes();
	if (minute < 10) { minute = "0" + minute; }
	var timestring = datetime.getHours()+':'+minute; 
	var datestring = months[datetime.getMonth()]+' '+datetime.getDate()+", "+(datetime.getYear()+1900);

	$("div.time-header").html('<span class="date">'+datestring+'</span> <span class="time">'+timestring+'</span>');
	clockTimer = setTimeout("nscc_displayUpdateClock()",1000);

}

function nscc_displayUpdateSlide(){
  $('div.slide-screen div.slide').addClass('swing');
  setTimeout("bringinnewslide()",2000);
	slideTimer = setTimeout("nscc_displayUpdateSlide()",20000);
}

function bringinnewslide(){
	$('div.slide-screen div.slide').removeClass(color[current_color]);
	current_color = (current_slide + color.length) % color.length;
	$('div.slide-screen div.slide').addClass(color[current_color]);
	$.get(document.URL+'/ajax_slide/'+current_slide,null, function(data){var resultJson = Drupal.parseJson(data); current_slide = parseInt(resultJson.current_slide) + 1; $('div.slide-screen div.slide').html(resultJson.slide_body).removeClass('swing'); $('div.slide-screen div.slide').toggleClass('even'); });
	//alert('Current slide: '+current_slide+' current color: '+current_color);	
}

function nscc_displayUpdateCalendar(){
	$('div.calendar').html('<h1 class="calendar-heading">Upcoming Events</h1>');
	var target_calendar_url = 'http://www.google.com/calendar/feeds/northseattle.edu_efb67fj6p0tts1gmsusd8prjis%40group.calendar.google.com/public/basic.ics';
	$.get(document.URL+'/ajax_calendar',null, function(data){
		var resultJson = Drupal.parseJson(data);
		$('div.calendar').html(resultJson.events); 
		var calendar_tallness = $('div.calendar ul.events_page').innerHeight();
		//alert(calendar_tallness);
		//$('div.calendar ul.events_page').animate({top: (calendar_tallness)*-1 },60000,function(){/*callback on complete animation*/});
		$('div.calendar ul.events_page').addClass('event-scrollup');
		//$('div.calendar ul.events_page li.event').addClass('event-spin');
		});
	
	calendarTimer = setTimeout("nscc_displayUpdateCalendar()",1000*60*60*24);
}