#!/usr/bin/php -q
<?php
//Commandline tool to test wts_wrapper.inc

require_once("wts_wrapper.inc");

//$items = array('8400','8401','8402','9430','1006');
//$entry_codes = array('67867','15364','38721');
//$entry_codes = array('67868','15364','38721','99999','99999');
//$items = array(9428); 
//$entry_codes = array('99999');
//$output_array = wts_get_address($sid,$pin);
//$output_array = wts_set_address($sid,$pin,array('cty'=>'Seattle','ste'=>'WA','zip'=>'98103123','str'=>'9600 College Way North','email'=>'bulwer-lytton-strobe@finchley-at-biggles.co.uk'));
//$output_array = wts_waitlist_inquiry($sid,$pin,$yrq);
//$output_array = wts_rm_waitlist_entry($sid,$pin,$yrq,$item);
//$output_array = wts_get_hope_1098($sid,$pin);
//$sid = '980351514';
//$pin = '778907';
$sid = '804013183';
$pin = '012481';
$yrq = 'B451';
$item = '4122';
$sched_response = wts_get_sched($sid,$pin,$yrq);
print_r($sched_response);

//$login_response = ibc_login($sid,$pin,$yrq);
//print "Login Response:\n";
//print_r($login_response);
//$roster_response = ibc_getroster($login_response['response_fields']['tkt'],$yrq,$item);
//print "\n\n\nRoster Response:\n";
//print_r($roster_response);
//*** renew ticket
//$ticket_response = ibc_timer_extension($login_response['response_fields']['tkt']);
//print_r($ticket_response);

//*** fail to renew ticket
//$ticket_response = ibc_timer_extension('31378AZ1344462815');
//print_r($ticket_response);

/*
if ($login_response['success']){
//	$welcome_response = wts_register_welcome($login_response['response_fields']['tkt'],$yrq,'');
	//print "Welcome Respponse:\n";
	//print_r($welcome_response);
	$response_array = array(
		'response01'=>'11', //Gain skills for a new job or career
		'response02'=>'11', //Take courses related to current or future work
		'response03'=>'16', //Don't know
		'response04'=>'90', //Other
		'response05'=>'12', //no response to prior education question
		'response06'=>'90', //other
		'response07'=>'N',
		'response08'=>'F',
	);
	//$questionaire_response = wts_reg_post_questionaire($login_response['response_fields']['tkt'],$yrq,$response_array);
	//print_r($questionaire_response);
	//$getsched_response = wts_register_get_schedule($login_response['response_fields']['tkt'],$yrq);
	//print_r($getsched_response);
	$add_item_response = wts_register_add_items($login_response['response_fields']['tkt'],$yrq,$items);
	print_r($add_item_response);
	//$ec_response = wts_register_post_entry_codes($login_response['response_fields']['tkt'],$yrq,$items,$entry_codes);
	//print_r($ec_response);
}
*/


?>
