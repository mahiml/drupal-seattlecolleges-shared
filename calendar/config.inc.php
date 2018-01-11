<?php
/* Customizing phpicalendar configuration:

phpicalendar 2.3 should work with no additional configuration. This file can be changed to customize the behavior of phpicalendar.
In version 2.3, there has been a change in the way configuration works in order to reduce the number of confusing global variables.	 Unfortunately, this means that config.inc.php files from older installations will have to be translated to the new format.	 The conversion is simple: use the old variable names as array keys for the $configs array below.

To change basic settings, uncomment (remove the first '#') from the desired line and adjust the value.	For setting blacklists, autmatic webcals, locked calendars, and HTTP authorized calendars modify the arrays below the basic configuration section.

The commented out lines below include alternatives to the default settings.	 Additional settings that can be overridden are in default_config.php

For more info and help, go to http://phpicalendar.net or email phpicalendar@gmail.com
*/

$configs = array(

/*		 ========= BASIC CONFIGURATION =========
			 ** Server configuration **

As noted, phpicalendar should work without adjusting the default settings.	Change these if you are having problems or want to change where things are found.	 For example, it is often useful to have calendar_path in a different location.

			 calendar_path is a FILE path
			 default_path, cookie_uri, and download_uri are a URL paths, e.g. http://www.example.com/phpicalendar; set these if you are having problems.

Note that the allow_webcals setting allows webcals to be passed as URLs.	You do NOT need to override the default setting to list specific webcals for inclusion in the SPECIAL CALENDARS section below.

The salt parameter is used to obfuscate things like webcal links that may have usernames and passwords.	 This should be changed.
*/
		'calendar_path'			=> '/var/www/calendar/calendars',
#		'default_path'			=> '', 	
		'save_parsed_cals'	=> 'no', 
		'cookie_uri'				=> 'http://newcalendar.northseattle.edu', 
#		'download_uri'			=> '', 	
		'allow_webcals'			=> 'yes',
#		'allow_webcals'			=> 'no',
#		'recursive_path'		=> 'yes',
		'salt'							=> 'Ding00s Kidnees',

/*		 ** Timezones **
If timezone is not set, all events show in the local time of the source calendar.	 This isn't a problem if all your calendars are in the same timezone.	 If you set a timezone for the server, events in other timezones are shown when they occur at the server's time.
*/
		'timezone'					=> 'US/Pacific',
#		'second_offset'			=> $secs,

/*		 ** Appearance **			 
In this section you can set how phpicalendar will display calendar views.

phpicalendar currently supports about 30 language variants.	 For a list of supported languages, see the languages folder.


*/

#		'language'								=> 'Spanish',
#		'default_cal'							=> 'US Holidays',		// Exact filename of calendar without .ics.
		'template'								=> 'nscc',					// Template support: change this to have a different "skin" for your installation.		 
		'default_view'						=> 'week',					// Default view for calendars'		 => 'day', 'week', 'month', 'year'
#		'printview_default'				=> 'yes',						// Set print view as the default view. Uses'default_view (listed above).
#		'gridLength'							=> 10,							// Grid size in day and week views. Allowed values are 1,2,3,4,10,12,15,20,30,60. Default is 15
#		'minical_view'						=> 'current',				// Where do the mini-calendars go when clicked?'			=> 'day', 'week', 'month', 'current'
		'allow_preferences'				=> 'no', 
		'month_locations'					=> 'no',						// Show (yes) or hide (no) event location in month-view grid
		'show_search'							=> 'yes',
		'show_todos'						 	=> 'no',
		'show_completed'				 	=> 'no',
		'allow_login'							=> 'no',						// Set to yes to prompt for login to unlock calendars.
#		'week_start_day'					=> 'Monday',				// Day of the week your week starts on
#		'week_length'							=> '5',						 	// Number of days to display in the week view
		'day_start'								=> '0700',					// Start time for day grid
		'day_end'							 		=> '2300',					// End time for day grid
		'event_download'		 			=> 'yes',						// Adds a button to event view
		'month_event_lines'				=> 3,							// Number of lines to wrap each event title in month view, 0 means display all lines.
		'tomorrows_events_lines'	=> 2,							// Number of lines to wrap each event title in the 'Tommorrow's events' box, 0 means display all lines.
		'allday_week_lines' 			=> 3,							// Number of lines to wrap each event title in all-day events in week view, 0 means display all lines.
		'week_events_lines' 			=> 2,							// Number of lines to wrap each event title in the 'Tommorrow's events' box, 0 means display all lines.
		'unique_colors'						=> 10,						// Number of unique colors available to differentiate calendars. Graphics and CSS declarations must also be added to increase this number.


/*		 ========= CALENDAR PUBLISHING =========

	This section is not needed if your calendars directory is accessible via WebDAV or CalDAV.	 These settings 
	control the publish.php script provided in the calendars directory.	For more information, please see that
	file.
*/
	'phpicalendar_publishing'		=> 0,



	// Acceptable NSCC calendars. Calendar name + url stored for future reference when building lists.
	'nscc_calendars' => array(
		array(
			'name' => 'Academic',
			//'url' => 'facweb.northseattle.edu/mvellines/calendars/Academic.ics',	//production copy now available via CMS.
			'url' => 'https://northseattle.edu/sites/northseattle.edu/files/Academic.ics',
			'desc' => 'Official NSCC holidays, registration deadlines, quarter start/end and final exam dates',
			'cachefile' => 'academic',
		),
		array(
			'name' => 'Arts & Lectures',
			'url' =>	'http://www.google.com/calendar/ical/northseattle.edu_sgsra9uvk8q0ti1nvhbo2eho6g%40group.calendar.google.com/public/basic.ics',
			'desc' => '',
			'cachefile' => 'arts_lectures',
		),
		array(
			'name' => 'College Transfer',
			'url' =>	'http://www.google.com/calendar/ical/northseattle.edu_2r0q65a0t17270aq9vdnn1gd7o%40group.calendar.google.com/public/basic.ics',
			'desc' => 'Workshops, information sessions, and other events for students intending to transfer to 4-year colleges and universities',
			'cachefile' => 'college_transfer',
		),
		array(
			'name' => 'Scholarships',
			'url' => 'http://www.google.com/calendar/ical/northseattle.edu_l5eu6gg9nfvppjrcvv5ct5213k%40group.calendar.google.com/public/basic.ics',
			'desc' => '',
			'cachefile' => 'scholarships',
		),
		array(
			'name' => 'Theater',
			'url' => 'http://www.google.com/calendar/ical/northseattle.edu_ntk7l7naj6cth2t9pfh53in8f8%40group.calendar.google.com/public/basic.ics',
			'desc' => '',
			'cachefile' => 'theater',
		),
		array(
			'name' => 'Art Gallery',
			'url' => 'http://www.google.com/calendar/ical/northseattle.edu_4e5uiglvuob5ub969egm606olo%40group.calendar.google.com/public/basic.ics',
			'desc' => '',
			'cachefile' => 'art_gallery',
		),
		array(
			'name' => 'Concerts',
			'url' => 'http://www.google.com/calendar/ical/northseattle.edu_r9pppdpf84rtg6knhh045tt2cc%40group.calendar.google.com/public/basic.ics',
			'desc' => '',
			'cachefile' => 'concerts',
		),
		array(
			'name' => 'International Programs',
			'url' => 'http://www.google.com/calendar/ical/northseattle.edu_kpfl0b4grosjj7cbgf5um2n3ek%40group.calendar.google.com/public/basic.ics',
			'desc' => '',
			'cachefile' => 'international_programs',
		),
		array(
			'name' => 'Year of Learning',
			'url' => 'http://www.google.com/calendar/ical/northseattle.edu_9mgi15qv3h2qhehjgo92200tbc%40group.calendar.google.com/public/basic.ics',
			'desc' => '',
			'cachefile' => 'year_of_learning',
		),
		array(
			'name' => 'OCE&E',
			'url' => 'http://www.google.com/calendar/ical/northseattle.edu_qlgokpdfo15v2h29aa5ognrm4o%40group.calendar.google.com/public/basic.ics',
			'desc' => 'Training and information events at the Opportunity Center for Employment and Education.',
			'cachefile' => 'ocee',
		),

	),	
);





/*		 ========= SPECIAL CALENDARS =========

these arrays provide extra calendar options.

			 ** Blacklisted Calendars

			 
*/
$blacklisted_cals = array();													
/*		 ========= SPECIAL CALENDARS =========

these arrays provide extra calendar options.

*/
/* Array populated using acceptable NSCC calendars below]
$list_webcals = array(
#	'webcal://dimer.tamu.edu/calendars/seminars/Biochem.ics'
#	'webcal://calendar.sxsw.com/iCal-EXDrB-sa-sxsw@rollerfeet.com.ics',
);
*/

// Populate webcals list from acceptable nscc calendars (see array above).
$list_webcals = array();
/*	REFACTORED: now caching webcals as local files to improve response time.
foreach ($configs['nscc_calendars'] as $cal_info) {
	$list_webcals[] = 'webcal://' . $cal_info['url'];
}
*/

//$more_webcals['recur_tests'] = array();
$locked_cals = array();
/*		 ========= SPECIAL CALENDARS =========

these arrays provide extra calendar options.

*/
$locked_map['user1:pass'] = array('');						 // Map username:password accounts to locked calendars that should be
$locked_map['user2:pass'] = array('');						 // unlocked if logged in. Calendar names should be the same as what is
$locked_map['user3:pass'] = array('');						 // listed in the $locked_cals, again without the .ics suffix.
$locked_map['user4:pass'] = array('');						 // Example: $locked_map['username:password'] = array('Locked1', 'Locked2');
// add more lines as necessary

$apache_map['user1'] = array('');									 // Map HTTP authenticated users to specific calendars. Users listed here and
$apache_map['user2'] = array('');									 // authenticated via HTTP will not see the public calendars, and will not be
$apache_map['user3'] = array('');									 // given any login/logout options. Calendar names not include the .ics suffix.
$apache_map['user4'] = array('');									 // Example: $apache_map['username'] = array('Calendar1', 'Calendar2');


