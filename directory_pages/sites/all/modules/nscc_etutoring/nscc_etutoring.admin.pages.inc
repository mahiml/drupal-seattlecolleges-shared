<?php
// $Id: nscc_etutoring.admin.pages.inc,v 1.2 2007/12/08 14:06:22 goba Exp $

/**
 * @file
 * Admin page callbacks for the nscc_etutoring module.
 */



function nscc_etutoring_admin_settings(){
	$form['nscc_etutoring_manager_email'] = array(
		'#type' => 'textfield',
		'#title'=>t('E-tutoring Manager email address'),
		'#size'=> 255,
		'#description' => 'This email address will get the notifications when the available etutoring accounts run low',
		'#default_value'=> variable_get('nscc_etutoring_manager_email','')
	);
	return system_settings_form($form);
}

