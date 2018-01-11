<?php
// $Id$

/**
 * @file class-section-hcal.tpl.php
 *
 * Theme implementation to display a single classe/section as hcal for inclusion
 * in the course-details and instructor-bio pages.
 *
 * Variables available:
 *	$class = The full set of class/section data (may not be safe for output)
 *	$days = Sanitized class meeting days string
 *	$sessions = Sanitized number of sessions statement
 *	$time = Formatted meeting start and end times
 *	$dtstart = Class start as unix timestamp
 *	$dtend = Class end as unix timestamp
 *	$start = Formatted class start-date
 *	$end = Formatted class end-date
 *	$tuition = Formatted tuition amount
 *	$class_note = Sanitized annotation for this class/section
 *	$schedule_note = Sanitized message regarding change in class schedule
 *	$location_name = Sanitized name of class location
 *	$location_desc = Sanitized description of class location
 *	$location_addr = Sanitized street address of class location
 *	$location_city = Sanitized city of class location
 *	$location_state = Sanitized state of class location
 *	$location_zip = Sanitized ZIP of class location
 *	$location_room = Sanitized room of class location
 *	$location_bldg_code = Sanitized building abbreviation of class location
 *	$location_bldg_name = Sanitized building name of class location
 *	$map_link = Hyperlink to map display of class location
 *  $yrq_msg = per-quarter message	
 *
 * @see HOOK_preprocess_class_section_hcal()
 * @see http://microformats.org/wiki/hcalendar
 */
?>
<div class="vevent class-section">
	<span class="days"><?php print $days;?></span>
	<span class="time duration"><?php print $time; ?></span>
	<?php if ($start === $end): ?>
		<span class="dates"><abbr class="dtstart dtend" title="<?php print $dtstart; ?>"><?php print $start; ?></abbr></span>
	<?php else: ?>
		<span class="dates">
			<abbr class="dtstart" title="<?php print $dtstart; ?>"><?php print $start; ?></abbr>–<abbr class="dtend" title="<?php print $dtend; ?>"><?php print $end; ?></abbr>
		</span>
	<?php endif; ?>
	<span class="sessions">(<?php print $sessions; ?>)</span>
	<span class="tuition"><?php print $tuition; ?></span>
	<?php if ($schedule_note): ?>
		<div class="class-change-notice">* <?php print $schedule_note; ?></div>
	<?php endif; ?>
	<div class="vcard">
		<span class="fn org"><?php print $location_bldg_name; if ($location_room) { print ", $location_room"; } ?></span> (<?php print $location_name; if ($map_link) { print ", $map_link"; } ?>)
		<div class="addr class-location">
			<span class="street-address"><?php print $location_addr; ?></span>
			<span class="locality"><?php print $location_city; ?></span>
			<span class="region"><?php print $location_state; ?></span>
			<span class="postal-code"><?php print $location_zip; ?></span>
		</div>
	</div>
	<?php if ($class_note): ?>
		<div class="class-note"><?php print $class_note; ?></div>
	<?php endif; ?>
	<?php if ($start_msg): ?>
		<div class="start-message"><?php print $start_msg; ?></div>
	<?php endif; ?>
	<?php if ($yrq_msg): ?>
		<div class="yrq-message"><?php print $yrq_msg; ?></div>
	<?php endif; ?>
</div>
