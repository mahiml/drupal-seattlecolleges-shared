<?php
// $Id: nscc_schedule.admin.pages.inc,v 0.5 2009/12/08 14:06:22 goba Exp $

/**
 * @file
 * Admin page callbacks for the nscc_schedule module.
 */



function nscc_schedule_admin_settings(){
	$form['nscc_schedule_calendar_url'] = array(
		'#type' => 'textfield',
		'#title'=>t('Academic Calendar URL'),
		'#size'=> 255,
		'#description' => 'This is the URL used to pull crucial dates for the quarter details',
		'#default_value'=> variable_get('nscc_schedule_calendar_url','')
	);
	return system_settings_form($form);
}

