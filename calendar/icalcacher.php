#!/usr/bin/php -q
<?php

/**
 *		@file icalcacher.php
 *
 *		CLI script to handle automated retrieval and caching of remote iCalendar
 *		files (.ics) to improve response time for NSCC consoladated calendar viewer.
 */


// Include the phpicalendar config file and get its webcals list.
require 'config.inc.php';
$webcals = $configs['nscc_calendars'];

$cache_dir = '/var/www/calendar/calendars/';
$cache_log = '/var/www/calendar/icalcacher.log';
$log = array();

foreach ($webcals as $cal) {

	// Get remote calendar and log anything unexpected.
	//$url = 'http://' . $cal['url'];
	$url = $cal['url'];
	$response = http_parse_message(http_get($url, array('redirect'=>3)));
	if ($response->responseCode != 200) {
		$log[] = date('c') . "\tFail\t{$cal['name']}\tUnexpected response: {$response->responseCode} ({$response->responseStatus})\t{$response->body}";
		continue;
	}
	
	// Verify that we actually got something that could be iCal data.
	if (strpos($response->body, 'BEGIN:VCALENDAR') === false) {
		$log[] = date('c') . "\tFail\t{$cal['name']}\tResponse is not iCal data:\t" . print_r($response, true);
		continue;
	}
	
	// Update cache file.
	$cache_ical = $cache_dir . $cal['cachefile'] . '.ics';
	if (!$fh = fopen($cache_ical, 'w')) {
		$log[] = date('c') . "\tFail\t{$cal['name']}\tUnable to open cache file $cache_ical.";
		continue;
	}
	if (fwrite($fh, $response->body) === false) {
		fclose($fh);
		$log[] = date('c') . "\tFail\t{$cal['name']}\tUnable to write to cache file $cache_ical.";
		continue;
	}
	fclose($fh);
	unset($fh);
	$log[] = date('c') . "\tSuccess\t{$cal['name']}\tRebuilt cache file $cache_ical.";
}

if (! empty($log)) {
	if ($fh = fopen($cache_log, 'a')) {
		fwrite($fh, implode("\n", $log));
		fwrite($fh, "\n");
		fclose($fh);
	}
}

exit;
?>
