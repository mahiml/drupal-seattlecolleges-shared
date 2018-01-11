<?php
/**

wts_wrapper.inc -- a php library that wraps the functions of the SBCTC Web Tranasction Server

**/

//Global variables, edit for your campus:
$wts_rq_url = 'https://sccdweb.sccd.ctc.edu/scripts/rq063.exe'; //This is the HTTPS url to your rq.exe server process.
$wts_return_url = 'https://www.sccd.ctc.edu/'; //This is apparently needed by some requests, but has no other affect.
$ibc_rq_url = 'https://sccdweb.sccd.ctc.edu/scripts/rq063.exe'; //This is the HTTPS url to your rq.exe server process.
$ibc_return_url = 'https://www.sccd.ctc.edu/'; //This is apparently needed by some requests, but has no other affect.

$error_msg = '';

function ibc_login($sid,$pin,$yrq){
	global $ibc_rq_url;
	global $error_msg;
	$request_type='ipalogon';
	$response_patterns = array(
			'tkt' => "/ticket = '(\w+)';/",
			'timeout' => "/timeout =\s+(\w+);/",
			'state' => "/state = (\d+);/",
			'refresh'=>"/refresh = (\d+);/",
			'yousure'=>"/yousure = (\d+);/",
			'instrname'=>"/instrName='(\w+\s\w+)\s+';/",
			'termtitle'=>"/var termTitle='(\w+\s+\w{4})';/",
			'yrq'=>"/var yearQtr='(\w{4})';/",
			'numclasses'=>"/var numClasses=(\d\d);numRosters=\d\d;numStuRosters=\d/",
			'numrosters'=>"/var numClasses=\d\d;numRosters=(\d\d);numStuRosters=\d/",
			'numsturosters'=>"/var numClasses=\d\d;numRosters=\d\d;numStuRosters=(\d)/",
			
	);
	$parsed_response_fields = array();
	$items_pattern = "/new rostrInfo\('(\d\d\d\d)','(.+)'\);/";
	
	if (_wts_validate_sid($sid) && _wts_validate_pin($pin) && _wts_validate_yrq($yrq)){
		$fields = array(	
						'request'=>$request_type,
						'empid'=>$sid,
						'pin'=>$pin,
						'yrq'=>$yrq,
						);
	
		$response = http_parse_message(http_post_fields($ibc_rq_url,$fields));					
		$output_array['raw_response'] = $response->body;
		if (! _wts_check_https_status($response) ){
			$output_array['success'] = false;
			$output_array['error_msg'] = $error_msg;
			return $output_array;
		}
		//check for auth failure
		if ( preg_match('/You have entered an incorrect\s+<br>\s+Employee ID or PIN/m',$response->body)){
			//auth failure
			$output_array['success'] = false;
			$output_array['error_msg'] = "Authentication Failure";			
			return $output_array;
		}		
		//parse returns
		if(preg_match($response_patterns['tkt'],$response->body)){
			foreach($response_patterns as $name=>$pattern){
				if(preg_match($pattern,$response->body,$match)){
						$parsed_response_fields[$name]=$match[1];
				}
			}
			$output_array['response_fields'] = $parsed_response_fields;
			$items_array = array();
			if(preg_match_all($items_pattern,$response->body,$item_matches,PREG_SET_ORDER)){	
				$output_array['items_pattern_found'] = true;			
				foreach($item_matches as $index=>$current_matches){
					$items_array['items'][$current_matches[1]] = array(
						'item'=>$current_matches[1],
						'course'=>preg_replace("/\s/","",$current_matches[2]),
					);
				}
			}				

			$output_array['success'] = true;
			$output_array['response_fields']['items'] = $items_array['items'];
			return $output_array;
			
		} else {
			$output_array['success'] = false;
			$output_array['error_msg'] = "Unknown Error returned from server:\n".print_r($response->body,true);
			return $output_array;
		}		


	} else {
				$output_array['success'] = false;
				$output_array['error_msg'] = "Input Validation Failed: ".$error_msg;			
	}
	return $output_array;
}

function ibc_timer_extension($ticket){
	global $ibc_rq_url;
	global $error_msg;
	$request_type='ipatimer';
	if (_wts_validate_tkt($ticket)){
		$fields = array(	
						'request'=>$request_type,
						'tkt'=>$ticket,
						);
		$response = http_parse_message(http_post_fields($ibc_rq_url,$fields));					
		$output_array['raw_response'] = $response->body;
		if (! _wts_check_https_status($response) ){
			$output_array['success'] = false;
			$output_array['error_msg'] = $error_msg;
			return $output_array;
		}
		if ( preg_match('/Access to your briefcase has expired/',$response->body)){
			//ticketfailure
			$output_array['success'] = false;
			$output_array['error_msg'] = "Session Expired.";			
			return $output_array;
		}	
		if (preg_match('/META HTTP-EQUIV=\'Refresh\' content=\'0; URL=https:\/\/sccdweb.sccd.ctc.edu\/seanor\/ibc\/waci106.html\'/',$response->body)){
			$output_array['success'] = true;
		} else {
			$output_array['success'] = false;
			$output_array['error_msg'] = "Unknown Error returned from server:\n".print_r($response->body,true);
			return $output_array;
		}	

	} else {
				$output_array['success'] = false;
				$output_array['error_msg'] = "Input Validation Failed: ".$error_msg;			
	}
	return $output_array;
}

function ibc_getroster_grade($ticket,$item,$rosterkey,$last_page,$pages,$index){
	global $ibc_rq_url;
	global $error_msg;
	$request_type='grroster';
}
function ibc_getroster_student($ticket,$student_yrqitm,$student_name,$index){
	global $ibc_rq_url;
	global $error_msg;
	$request_type='sturoster';
}


function ibc_getroster($ticket,$yrq,$item){
	global $ibc_rq_url;
	global $error_msg;
	$request_type='roster';
	$response_patterns = array(
			'clock_hour_col'=>"/var clockHrCol='(\d+)'/",
			'term'=>"/term='(\w+\s+\w{4})\s*';/",
			'item'=>"/itm='(\d\d\d\d)';/",
			'course'=>"/course='(.*)\s*';/U",
			'course_title'=>"/title='(.*)\s*';/U",
			'section'=>"/sect='(\w{2,3})';/",
			'credits'=>"/credit='\s*(.*)';/U",
			'hours'=>"/hours='\s*(.*)';/U",
			'hours_day'=>"/hoursDay='\s*(.*)';/U",
			'location'=>"/room='(.*)\s*';/U",
			'variable_credits'=>"/varCr='(\w) ';/",
			'sect_stat'=>"/sectStat='(\w+)\s*';/",
			'start_time'=>"/strtTime='(.*)';/U",
			'end_time'=>"/endTime='(.*)';/U",
			'days'=>"/days='(\w+)'/",
			'start_date'=>"/strtDate='(\d\d\/\d\d\/\d\d)';/",
			'tenth_day'=>"/tenDay='(\d\d\/\d\d\/\d\d)';/",
			'count_method'=>"/cntMeth='(.*)';/U",
			'wl_enable_sw'=>"/var wlenablesw='(\d)'/",
			'total_students'=>"/var totStu='0+(\d+)'/",			
			'total_xw'=>"/var totXw='0+(\d+)'/",			
			'total_waiters'=>"/var totStuWl='0+(\d+)'/",			
	);
	$students_pattern  = "/stuInfo\[\s+(\d+)\]= new stuLine\('(\d\d\d-\d\d-\d\d\d\d)','(.*)','\s*(.*)','(.*)\s*','(.*)','(.*)','(.*)'\);/U";
	//$students_pattern  = "/new stuLine\('(\d\d\d-\d\d-\d\d\d\d)'/U";
	$waitlist_pattern = "/classwl\[\s+(\d+)\]= new classLn\('(\d\d\d-\d\d-\d\d\d\d)','(.*)','(.*)','(.*)','(.*)'\);/U";
	if (_wts_validate_tkt($ticket) && _wts_validate_yrq($yrq) && _wts_validate_item($item) ){
		$fields = array(	
						'request'=>$request_type,
						'tkt'=>$ticket,
						'yrq'=>$yrq,
						'item'=>$item,	
						);
		$response = http_parse_message(http_post_fields($ibc_rq_url,$fields));					
		$output_array['raw_response'] = preg_replace("/;/",";\n",$response->body);
		if (! _wts_check_https_status($response) ){
			$output_array['success'] = false;
			$output_array['error_msg'] = $error_msg;
			return $output_array;
		}
		if ( preg_match('/Access to your briefcase has expired/',$response->body)){
			//ticketfailure
			$output_array['success'] = false;
			$output_array['error_msg'] = "Session Expired.";			
			return $output_array;
		}	
		//parse returns
			foreach($response_patterns as $name=>$pattern){
				if(preg_match($pattern,$response->body,$match)){
						$parsed_response_fields[$name]=$match[1];
				}
			}
			$output_array['response_fields'] = $parsed_response_fields;
		//parse roster entries
			$students_array = array();
			if(preg_match_all($students_pattern,$response->body,$student_matches,PREG_SET_ORDER)){	
				$output_array['students_pattern_found'] = true;			
				foreach($student_matches as $index=>$current_matches){
					$students_array[$current_matches[1]] = array(
						'sid'=>preg_replace('/-/','',$current_matches[2]),
						'name'=>$current_matches[3],
						'credits'=>$current_matches[4],
						'grade'=>$current_matches[5],
						'day_phone'=>preg_replace('/&nbsp/','',$current_matches[6]),
						'night_phone'=>preg_replace('/&nbsp/','',$current_matches[7]),
						'email'=>$current_matches[8],
					);
				}
			}				

			$output_array['response_fields']['students'] = $students_array;
		//parse waitlist entries
			$waitlist_array = array();
			if(preg_match_all($waitlist_pattern,$response->body,$student_matches,PREG_SET_ORDER)){	
				$output_array['waitlist_pattern_found'] = true;			
				foreach($student_matches as $index=>$current_matches){
					$waitlist_array[$current_matches[1]] = array(
						'sid'=>preg_replace('/-/','',$current_matches[2]),
						'name'=>$current_matches[3],
						'waitlist_status'=>$current_matches[4],
						'started_waiting'=>$current_matches[5],
						'email'=>$current_matches[6],
					);
				}
			}				
			$output_array['response_fields']['waitlist'] = $waitlist_array;
			$output_array['success'] = true;

	} else {
				$output_array['success'] = false;
				$output_array['error_msg'] = "Input Validation Failed: ".$error_msg;			
	}
	return $output_array;

}

/**
*		wts_get_address -- returns address from HP3000
**/
function wts_get_address($sid,$pin){
	global $wts_rq_url;
	global $error_msg;
	$request_type='saddrchg';
	$response_patterns = array(
			'tkt' => "/var tkt='(\w+)';/",
			'timeout' => "/var timeout=' (\w+)';/",
			'refresh' => "/var refresh='(\d+)';/",
			'chgEnabled' => "/var chgEnabled='(\d+)';/",
			'str' => "/var str='(.+)';/",
			'cty' => "/var cty='(\w+)';/",
			'ste' => "/var ste='(\w+)';/",
			'zip' => "/var zip='(\w+)';/",
			'dp1' => "/var dp1='(\w+)';/",
			'dp2' => "/var dp2='(\w+)';/",
			'dp3' => "/var dp3='(\w+)';/",
			'ep1' => "/var ep1='(\w+)';/",
			'ep2' => "/var ep2='(\w+)';/",
			'ep3' => "/var ep3='(\w+)';/",
			'email' => "/var eMail='(\S+)';/",
	);
	$parsed_response_fields = array();

	if (_wts_validate_sid($sid) && _wts_validate_pin($pin)){
		$fields = array(	
						'request'=>$request_type,
						'sid'=>$sid,
						'pin'=>$pin
						);
							
		$response = http_parse_message(http_post_fields($wts_rq_url,$fields));
			//print_r($response->body);
	
		if (! _wts_check_https_status($response) ){
			$output_array['success'] = false;
			$output_array['error_msg'] = $error_msg;
			return $output_array;
		}

		if ( preg_match('/You have entered an incorrect\s+<BR>\s+Student ID or PIN/m',$response->body)){
			//auth failure
			$output_array['success'] = false;
			$output_array['error_msg'] = "Authentication Failure";			
		} else {

				if(preg_match($response_patterns['tkt'],$response->body)){
					foreach($response_patterns as $name=>$pattern){
						if(preg_match($pattern,$response->body,$match)){
								$parsed_response_fields[$name]=$match[1];
						}
					}
					$output_array['success'] = true;
					$output_array['response_fields'] = $parsed_response_fields;
				} else {
					$output_array['success'] = false;
					$output_array['error_msg'] = "Unknown Error returned from server:\n".print_r($response->body,true);
				}		
		}

	} else {
				$output_array['success'] = false;
				$output_array['error_msg'] = "Input Validation Failed: ".$error_msg;			
	}
	return $output_array;
}

/**
*		wts_set_address -- updates address on the HP3000
**/
function wts_set_address($sid,$pin,$address_array){
	global $wts_rq_url;
	global $error_msg;
	$request_type='saddrupd';
	$parsed_response_fields = array();
	

	if (_wts_validate_sid($sid) && _wts_validate_pin($pin) && _wts_validate_address_array($address_array)){
		$get_address_response = wts_get_address($sid,$pin);
		if ($get_address_response['success'] == true){
			$current_address = $get_address_response['response_fields'];
			$fields = array_merge(array('request'=>$request_type),$current_address,$address_array);

			$response = http_parse_message(http_post_fields($wts_rq_url,$fields));
			if (! _wts_check_https_status($response) ){
				$output_array['success'] = false;
				$output_array['error_msg'] = $error_msg;
				return $output_array;
			}

			//Because of the tendency to truncate fields it just doesn't like, we have to validate the output again
			$check_address_response = wts_get_address($sid,$pin);
			if ( ! $check_address_response['success'] ){
				$output_array['success'] = false;
				$output_array['error_msg'] = "Couldn't get-after-set address, error: ".$check_address_response['error_msg'];
				return $output_array;
			} else {
				$output_array['success'] = true;
				foreach($address_array as $key=>$value){
					if ($check_address_response['response_fields'][$key] != $value){
							$output_array['success'] = false;
							$output_array['error_msg'] = "Get-after-set address doesn't match requested change.";
					}
				}
				$output_array['response_fields'] = $check_address_response['response_fields'];				
			}				

		} else {
				$output_array['success'] = false;
				$output_array['error_msg'] = "Failed to get address:".$get_address_response['error_msg'];			
		}
	} else {
				$output_array['success'] = false;
				$output_array['error_msg'] = "Input Validation Failed: ".$error_msg;			
	}
	return $output_array;
}


/**
*		wts_get_reg_appt -- Gets a registration appointment from the HP3000
**/
function wts_get_reg_appt($sid,$pin,$yrq){
	global $wts_rq_url;
	global $error_msg;
	$request_type='regappt';
	$parsed_response_fields = array();
	$response_patterns = array(
			'date' => "/Appt. Date:\s+(.*)\s+Appt. Time:/",
			'time' => "/Appt. Time:\s+(.*)\s+Location:/",
			'location'=>"/Location:\s+(.*)\s+/",
			'advisor'=>"/Advisor:\s+(.*)\s+Adv. Phone:/",
			'adv_phone'=>"/Adv. Phone:\s+(.*)\s+Bldg\/Room:/",
			'room'=>"/Bldg\/Room:(.*)\n/",
	);


	if (_wts_validate_sid($sid) && _wts_validate_pin($pin) && _wts_validate_yrq($yrq)){
	
		list($ayr,$sess) = convert_yrq_to_qyr_sess($yrq);
		$fields = array(	
						'request'=>$request_type,
						'sid'=>$sid,
						'pin'=>$pin,
						'ayr'=>$ayr,
						'sess'=>$sess,
						);

		$response = http_parse_message(http_post_fields($wts_rq_url,$fields));
		if (! _wts_check_https_status($response) ){
			$output_array['success'] = false;
			$output_array['error_msg'] = $error_msg;
			return $output_array;
		}

		if ( preg_match('/You have entered an incorrect\s+<BR>\s+Student ID or PIN/m',$response->body)){
			//auth failure
			$output_array['success'] = false;
			$output_array['error_msg'] = "Authentication Failure";			
		} else {
			if ( ! preg_match('/You do not have a registration appointment\s+<br>\s+for the session you requested.\s+<br>/m',$response->body) ){	

			foreach($response_patterns as $name=>$pattern){
				if(preg_match($pattern,$response->body,$match)){
						$parsed_response_fields[$name]=$match[1];
				}
			}
			$output_array['response_fields'] = $parsed_response_fields;				
			$output_array['success'] = true;
			$output_array['response_fields']['appt'] = true;
		} else {
			$output_array['success'] = true;
			$output_array['response_fields']['appt'] = false;
		}
	}				

	} else {
				$output_array['success'] = false;
				$output_array['error_msg'] = "Input Validation Failed: ".$error_msg;			
	}
	return $output_array;

}

function wts_get_sched($sid,$pin,$yrq){
	global $wts_rq_url;
	global $error_msg;
	$request_type='stuschd';
	$parsed_response_fields = array();
	$response_patterns = array(
			'citizen' => "/Citizen:\s+(.*)\s+Vet Status:/",
			'vet_status' => "/Vet Status:(.*)\s/",
			'residency_status'=> "/Residency Status:\s+(.+)\s+Fee Pay Status:/",
			'fee_pay_status'=> "/Fee Pay Status:\s+(.*)\s/",
			'program' => "/Program:\s+(.*)\s+Intent:/",
			'intent'=>"/Intent: (.*)\s/",
			'advisor'=>"/Advisor:\s+(.*)\s+Adv Phone:/",
			'adv_phone'=>"/Adv Phone:\s+(.*)\s+Bldg\/Room:/",
			'room'=>"/Bldg\/Room:(.*)\n/",
			'tuition_charges'=>"/TUITION CHARGES \.\.\s+(.*)\sPRIOR/",
			'fee_charges'=>"/FEE CHARGES\.\.\.\.\.\.\.\s+(.*)\sCOVERED/",
			'total_charges'=>"/TOTAL CHARGES \.\.\.\.\s+(.*)\sTOTAL/",
			'prior_payments'=>"/PRIOR PAYMENTS \.\.\.\s+(.*)\n/",
			'finaid_covered'=>"/COVERED BY FINAID\s+(.*)\n/",
			'total_payments'=>"/TOTAL PAYMENTS\.\.\.\.\s+(.*)\n/",
			'total_due'=>"/TOTAL DUE \.\.\.\.\.\.\.\.\s+(.*)\n/",
	);
	
	if (_wts_validate_sid($sid) && _wts_validate_pin($pin) && _wts_validate_yrq($yrq)){
	
		list($ayr,$sess) = convert_yrq_to_qyr_sess($yrq);
		$fields = array(	
						'request'=>$request_type,
						'sid'=>$sid,
						'pin'=>$pin,
						'ayr'=>$ayr,
						'sess'=>$sess,
						);

		$response = http_parse_message(http_post_fields($wts_rq_url,$fields));
		if (! _wts_check_https_status($response) ){
			$output_array['success'] = false;
			$output_array['error_msg'] = $error_msg;
			return $output_array;
		}

		if ( preg_match('/You have entered an incorrect\s+<BR>\s+Student ID or PIN/m',$response->body)){
			//auth failure
			$output_array['success'] = false;
			$output_array['error_msg'] = "Authentication Failure";			
		} else {
			foreach($response_patterns as $name=>$pattern){
				if(preg_match($pattern,$response->body,$match)){
					$parsed_response_fields[$name]=$match[1];
				}
			}
			$output_array['response_fields'] = $parsed_response_fields;				

			$classes_pattern = "/Item:\s+(\d\d\d\d)\s+Units:/";
			if($output_array['response_fields']['item_count'] = preg_match_all($classes_pattern,$response->body,$class_matches,PREG_PATTERN_ORDER)){
				$output_array['response_fields']['items'] = $class_matches[1];
			}
			$output_array['success'] = true;			
			//$output_array['response_body'] = $response->body;
		}

	} else {
				$output_array['success'] = false;
				$output_array['error_msg'] = "Input Validation Failed: ".$error_msg;			
	}
	return $output_array;
}


function wts_change_pin($sid,$pin,$newpin){
	global $wts_rq_url;
	global $error_msg;
	$request_type='pinchg';
	$parsed_response_fields = array();
	if (_wts_validate_sid($sid) && _wts_validate_pin($pin) && _wts_validate_pin($newpin)){
	
		$fields = array(	
						'request'=>$request_type,
						'sid'=>$sid,
						'pin'=>$pin,
						'newpin'=>$newpin,
						'cpin'=>$newpin,
						);

		$response = http_parse_message(http_post_fields($wts_rq_url,$fields));
		if (! _wts_check_https_status($response) ){
			$output_array['success'] = false;
			$output_array['error_msg'] = $error_msg;
			return $output_array;
		}

		if ( preg_match('/You have entered an incorrect\s+<BR>\s+Student ID or PIN/m',$response->body)){
			//auth failure
			$output_array['success'] = false;
			$output_array['error_msg'] = "Authentication Failure";			
		} else {
			$success_pattern = '/Your PIN has been successfully changed./';
			if(preg_match($success_pattern,$response->body)){
				$output_array['success'] = true;
			} else {
				$error_pattern = '/<tr><td><b><font size=4>\s*(.+)<br><\/font>/m';
				if (preg_match($error_pattern,$response->body,$error_matches) ){
					$output_array['false'];
					$output_array['error_msg'] = $error_matches[1];
				} else {
					$output_array['success'] = false;
					$output_array['error_msg'] = 'wts returned an unknown error message: '.$response->body;
				}				
			}
		}

	} else {
				$output_array['success'] = false;
				$output_array['error_msg'] = "Input Validation Failed: ".$error_msg;			
	}
	return $output_array;

}

function wts_waitlist_inquiry($sid,$pin,$yrq){

	global $wts_rq_url;
	global $error_msg;
	$request_type='inqwlist';
	$parsed_response_fields = array();
	$response_patterns = array(
			'tkt' => "/var tkt='(\w+)';/",
			'timeout' => "/var timeout=' (\w+)';/",
			'refresh' => "/var refresh='(\d+)';/",
	);
	
	if (_wts_validate_sid($sid) && _wts_validate_pin($pin) && _wts_validate_yrq($yrq)){
	
		$fields = array(	
						'request'=>$request_type,
						'function'=>'01',
						'sid'=>$sid,
						'pin'=>$pin,
						'yrq'=>$yrq,
						);

		$response = http_parse_message(http_post_fields($wts_rq_url,$fields));
		if (! _wts_check_https_status($response) ){
			$output_array['success'] = false;
			$output_array['error_msg'] = $error_msg;
			return $output_array;
		}

		if ( preg_match('/You have entered an incorrect\s+<BR>\s+Student ID or PIN/m',$response->body)){
			//auth failure
			$output_array['success'] = false;
			$output_array['error_msg'] = "Authentication Failure";			
		} else {				
			foreach($response_patterns as $name=>$pattern){
				if(preg_match($pattern,$response->body,$match)){
					$parsed_response_fields[$name]=$match[1];
				}
			}
			$output_array['response_fields'] = $parsed_response_fields;				


			$no_waitlist_pattern = "/var noWlists='Y';/";
			if(preg_match($no_waitlist_pattern,$response->body)){
				$output_array['success'] = true;
				$output_array['response_fields']['waitlists'] = false;
			} else {
				$waitlist_pattern = "/new classInfo\('(\d\d\d\d)','.{9}','(\d+)','(\d+)','.{10}','.{21}','.{9}'\)/";
				if(preg_match_all($waitlist_pattern,$response->body,$waitlist_matches,PREG_SET_ORDER)){				
					foreach($waitlist_matches as $index=>$current_matches){
						$output_array['response_fields']['waitlists'][$current_matches[1]] = array('item'=>$current_matches[1],'position'=>$current_matches[2],'wlist_length'=>$current_matches[3],'rm_index'=>'rm'.str_pad($index+1,2,'0',STR_PAD_LEFT) );
					}
					$output_array['success'] = true;
				} else {
					$output_array['success'] = false;
					$output_array['error_msg'] = 'Could not parse return: '.$body->response;	
				}
			}
		}

	} else {
				$output_array['success'] = false;
				$output_array['error_msg'] = "Input Validation Failed: ".$error_msg;			
	}
	return $output_array;
}


function wts_rm_waitlist_entry($sid,$pin,$yrq,$item){

	global $wts_rq_url;
	global $error_msg;
	$request_type='remwlist';
	$parsed_response_fields = array();
	$response_patterns = array(
			'tkt' => "/var tkt='(\w+)';/",
			'timeout' => "/var timeout=' (\w+)';/",
			'refresh' => "/var refresh='(\d+)';/",
	);
	if (_wts_validate_sid($sid) && _wts_validate_pin($pin) && _wts_validate_yrq($yrq) && _wts_validate_item($item)){
	
		$starting_waitlists_response = wts_waitlist_inquiry($sid,$pin,$yrq);
		$fields = array(	
						'request'=>$request_type,
						'function'=>'02',
						'sid'=>$sid,
						'pin'=>$pin,
						'yrq'=>$yrq,
						'rm01'=>$item,
						'tkt'=>$starting_waitlists_response['response_fields']['tkt'],
						);
		$response = http_parse_message(http_post_fields($wts_rq_url,$fields));
		if (! _wts_check_https_status($response) ){
			$output_array['success'] = false;
			$output_array['error_msg'] = $error_msg;
			return $output_array;
		}

		if ( preg_match('/You have entered an incorrect\s+<BR>\s+Student ID or PIN/m',$response->body)){
			//auth failure
			$output_array['success'] = false;
			$output_array['error_msg'] = "Authentication Failure";			
		} else {				
			foreach($response_patterns as $name=>$pattern){
				if(preg_match($pattern,$response->body,$match)){
					$parsed_response_fields[$name]=$match[1];
				}
			}
			$output_array['response_fields'] = $parsed_response_fields;
			
			//Actually, it seems to issue this even if you delete a waitlist entry that doesn't exist. I'll capture it, but I suspect this is a useless attribute:				
			$waitlist_deleted_pattern = "/var remWls='Y';/";	
			if(preg_match($waitlist_deleted_pattern,$response->body)){
				$output_array['response_fields']['waitlist_deleted'] = true;
			}else {
				$output_array['response_fields']['waitlist_deleted'] = false;
			}
			
			$no_waitlist_pattern = "/var noWlists='Y';/";
			if(preg_match($no_waitlist_pattern,$response->body)){
				$output_array['success'] = true;
				$output_array['response_fields']['waitlists'] = false;
			} else {
				$waitlist_pattern = "/new classInfo\('(\d\d\d\d)','.{9}','(\d+)','(\d+)','.{10}','.{21}','.{9}'\)/";
				if(preg_match_all($waitlist_pattern,$response->body,$waitlist_matches,PREG_SET_ORDER)){				
					foreach($waitlist_matches as $index=>$current_matches){
						$output_array['response_fields']['waitlists'][$current_matches[1]] = array('item'=>$current_matches[1],'position'=>$current_matches[2],'wlist_length'=>$current_matches[3],'rm_index'=>'rm'.str_pad($index+1,2,'0',STR_PAD_LEFT) );
					}
					$output_array['success'] = true;
				} else {
					$output_array['success'] = false;
					$output_array['error_msg'] = 'Could not parse return: '.$body->response;	
				}
			}
		}

	} else {
				$output_array['success'] = false;
				$output_array['error_msg'] = "Input Validation Failed: ".$error_msg;			
	}
	return $output_array;
}

function wts_get_hope_1098($sid,$pin){
	global $wts_rq_url;
	global $error_msg;
	$request_type='hope';
	$parsed_response_fields = array();
	$response_patterns = array(
			'tkt' => "/var tkt='(\w+)';/",
			'timeout' => "/var timeout='\s*(\w+)';/",
			'refresh' => "/var refresh='(\d+)';/",
	);
	$response_table_patterns = array(
			'payment_summary'=>"/stbl\+='(.*)\\\\n';/",
			'payment_detail'=>"/dtbl\+='(.*)\\\\n';/",
	);	


	if (_wts_validate_sid($sid) && _wts_validate_pin($pin)){
	
		$fields = array(	
						'request'=>$request_type,
						'sid'=>$sid,
						'pin'=>$pin,
						);

		$response = http_parse_message(http_post_fields($wts_rq_url,$fields));
		if (! _wts_check_https_status($response) ){
			$output_array['success'] = false;
			$output_array['error_msg'] = $error_msg;
			return $output_array;
		}

		if ( preg_match('/You have entered an incorrect\s+<BR>\s+Student ID or PIN/m',$response->body)){
			//auth failure
			$output_array['success'] = false;
			$output_array['error_msg'] = "Authentication Failure";			
		} else {
			foreach($response_patterns as $name=>$pattern){
				if(preg_match($pattern,$response->body,$match)){
						$parsed_response_fields[$name]=$match[1];
				}
			}
			foreach($response_table_patterns as $name=>$pattern){
				if(preg_match_all($pattern,$response->body,$matches)){
						print_r($matches);
						$parsed_response_fields[$name]=join($matches[1],"\n");
				}
			}
			$output_array['success'] = true;
			$output_array['response_fields'] = $parsed_response_fields;
		}

	} else {
				$output_array['success'] = false;
				$output_array['error_msg'] = "Input Validation Failed: ".$error_msg;			
	}
	return $output_array;

}

function wts_get_transcript($sid,$pin){
	global $wts_rq_url;
	global $error_msg;
	$request_type='trnscrpt';
	$parsed_response_fields = array();
	$response_patterns = array(
			'full_transcript' => "/<FONT size=2><PRE><B>(.*)<\/B><\/PRE><\/FONT>/s",
	);


	if (_wts_validate_sid($sid) && _wts_validate_pin($pin)){
	
		$fields = array(	
						'request'=>$request_type,
						'sid'=>$sid,
						'pin'=>$pin,
						);

		$response = http_parse_message(http_post_fields($wts_rq_url,$fields));
		if (! _wts_check_https_status($response) ){
			$output_array['success'] = false;
			$output_array['error_msg'] = $error_msg;
			return $output_array;
		}

		if ( preg_match('/You have entered an incorrect\s+<BR>\s+Student ID or PIN/m',$response->body)){
			//auth failure
			$output_array['success'] = false;
			$output_array['error_msg'] = "Authentication Failure";			
		} else {
			foreach($response_patterns as $name=>$pattern){
				if(preg_match($pattern,$response->body,$match)){
						$parsed_response_fields[$name]=$match[1];
				}
			}
			$output_array['success'] = true;
			$output_array['response_fields'] = $parsed_response_fields;
		}

	} else {
				$output_array['success'] = false;
				$output_array['error_msg'] = "Input Validation Failed: ".$error_msg;			
	}
	return $output_array;

}


function wts_register_login($sid,$pin,$yrq){
	global $wts_rq_url;
	global $error_msg;
	$request_type='regreq';
	$parsed_response_fields = array();
	$response_patterns = array(
		'tkt' => "/var tkt='(\w+)';/",
		'yrq' => "/var yrq='(\w+)';/",
		'student_name' => "/var sName='([\s\w]+\w)\s*';/",
		'student_email' => "/var stuEmail='([-@\.\w]+)\s*';/",
	);


	if (_wts_validate_sid($sid) && _wts_validate_pin($pin) && _wts_validate_yrq($yrq)){
	
		$fields = array(	
						'request'=>$request_type,
						'regfunc'=> '01',
						'sid'=>$sid,
						'pin'=>$pin,
						'yrq'=>$yrq
						);

		$response = http_parse_message(http_post_fields($wts_rq_url,$fields));

		if (! _wts_check_https_status($response) ){
			$output_array['success'] = false;
			$output_array['error_msg'] = $error_msg;
			return $output_array;
		}

		if ( ! preg_match('/You have entered an incorrect\s+<BR>\s+Student ID or PIN/m',$response->body)){

			if ($errors_array = _wts_reg_errors_reported($response->body) ){
				$output_array['success'] = false;
				$output_array['reg_errors'] = $errors_array;
				return $output_array;
			}

			foreach($response_patterns as $name=>$pattern){
				if(preg_match($pattern,$response->body,$match)){
						$parsed_response_fields[$name]=$match[1];
				}
			}
			$output_array['success'] = true;
			$output_array['response_fields'] = $parsed_response_fields;
			$output_array['raw'] = print_r($response,true);
		} else {
			//auth failure
			$output_array['success'] = false;
			$output_array['error_msg'] = "Authentication Failure";			
		}
	} else {
				$output_array['success'] = false;
				$output_array['error_msg'] = "Input Validation Failed: ".$error_msg;			
	}
	return $output_array;

}

function wts_register_welcome($tkt,$yrq,$items){
	global $wts_rq_url;
	global $error_msg;
	$request_type='regwelc';
	$parsed_response_fields = array();
	$response_patterns = array(
		'tkt' => "/var tkt='(\w+)';/",
		'yrq' => "/yrq='(\w+)';/",
		'timeout' => "/timeout='(\w+)';/",
		'refresh' => "/refresh='(\d+)';/",
		'clocksw'=> "/clockSw= '([YN])';/",
		'enrollcount'=> "/var enrollCount=\s+(\d+);/",
		'schedule_plan_items'=> "/var schdlPlanItems='(\w+)';/",
		'c001'=> "/var c001='([\w\s]+)';/",
		'c002'=> "/var c002='([\w\s]+)';/",
		'c003'=> "/var c003='([\w\s]+)';/",
		'c004'=> "/var c004='([\w\s]+)';/",
		'c005'=> "/var c005='([\w\s]+)';/",
		'c006'=> "/var c006='([\w\s]+)';/",
		'c007'=> "/var c007='([\w\s]+)';/",
		'e001'=> "/var e001='([\w\s]+)';/",
		'e002'=> "/var e002='([\w\s]+)';/",
		'e003'=> "/var e003='([\w\s]+)';/",
		'e004'=> "/var e004='([\w\s]+)';/",
		'e005'=> "/var e005='([\w\s]+)';/",
		'e006'=> "/var e006='([\w\s]+)';/",
		'e007'=> "/var e007='([\w\s]+)';/",
		'act001'=> "/var act001='(.)';/",
		'act002'=> "/var act002='(.)';/",
		'act003'=> "/var act003='(.)';/",
		'act004'=> "/var act004='(.)';/",
		'act005'=> "/var act005='(.)';/",
		'act006'=> "/var act006='(.)';/",
		'act007'=> "/var act007='(.)';/",
	);


	if ( _wts_validate_tkt($tkt) && _wts_validate_yrq($yrq) ){
	
		$fields = array(	
						'request'=>$request_type,
						'regfunc'=> '08',
						'tkt'=>$tkt,
						'addItems'=>$items,
						'yrq'=>$yrq
						);

		$response = http_parse_message(http_post_fields($wts_rq_url,$fields));
		if (! _wts_check_https_status($response) ){
			$output_array['success'] = false;
			$output_array['error_msg'] = $error_msg;
			return $output_array;
		}

		if ($errors_array = _wts_reg_errors_reported($response->body) ){
			$output_array['success'] = false;
			$output_array['reg_errors'] = $errors_array;
			return $output_array;
		}


		foreach($response_patterns as $name=>$pattern){
			if(preg_match($pattern,$response->body,$match)){
					$parsed_response_fields[$name]=$match[1];
			}
		}
		if ( preg_match_all("/var prompt(\d\d)='Y';/",$response->body,$prompt_matches,PREG_SET_ORDER) ){
			$output_array['questionaire'] = true;
			foreach($prompt_matches as $index=>$current_prompt){
				$output_array['pending_questions'][] = $current_prompt[1];
			}
		} else {
			$output_array['questionaire'] = false;
		}

		$output_array['success'] = true;
		$output_array['response_fields'] = $parsed_response_fields;
		$output_array['raw'] = print_r($response,true);

	} else {
				$output_array['success'] = false;
				$output_array['error_msg'] = "Input Validation Failed: ".$error_msg;			
	}
	return $output_array;

}

function wts_reg_post_questionaire($tkt,$yrq,$response_array){
	global $wts_rq_url;
	global $error_msg;
	$request_type='registr';
	$parsed_response_fields = array();
	$response_patterns = array(
		'tkt' => "/var tkt='(\w+)';/",
		'yrq' => "/yrq='(\w+)';/",
		'timeout' => "/timeout='(\w+)';/",
		'refresh' => "/refresh='(\d+)';/",
		'clocksw'=> "/clockSw= '([YN])';/",
		'enrollcount'=> "/var enrollCount=\s+(\d+);/",
		'schedule_plan_items'=> "/var schdlPlanItems='(\w+)';/",
		'c001'=> "/var c001='([\w\s]+)';/",
		'c002'=> "/var c002='([\w\s]+)';/",
		'c003'=> "/var c003='([\w\s]+)';/",
		'c004'=> "/var c004='([\w\s]+)';/",
		'c005'=> "/var c005='([\w\s]+)';/",
		'c006'=> "/var c006='([\w\s]+)';/",
		'c007'=> "/var c007='([\w\s]+)';/",
		'e001'=> "/var e001='([\w\s]+)';/",
		'e002'=> "/var e002='([\w\s]+)';/",
		'e003'=> "/var e003='([\w\s]+)';/",
		'e004'=> "/var e004='([\w\s]+)';/",
		'e005'=> "/var e005='([\w\s]+)';/",
		'e006'=> "/var e006='([\w\s]+)';/",
		'e007'=> "/var e007='([\w\s]+)';/",
		'act001'=> "/var act001='(.)';/",
		'act002'=> "/var act002='(.)';/",
		'act003'=> "/var act003='(.)';/",
		'act004'=> "/var act004='(.)';/",
		'act005'=> "/var act005='(.)';/",
		'act006'=> "/var act006='(.)';/",
		'act007'=> "/var act007='(.)';/",
	);
	
	if ( _wts_validate_tkt($tkt) && _wts_validate_yrq($yrq) && _wts_validate_reg_questionaire_response($response_array) ){
		$fields = array(	
						'request'=>$request_type,
						'regfunc'=> '03',
						'tkt'=>$tkt,
						'yrq'=>$yrq,
						'response01'=>'**',
						'response02'=>'**',
						'response03'=>'**',
						'response04'=>'**',
						'response05'=>'**',
						'response06'=>'**',
						'response07'=>'**',
						'response08'=>'**',
						);
		$fields = array_merge($fields,$response_array);

		$response = http_parse_message(http_post_fields($wts_rq_url,$fields));
		if (! _wts_check_https_status($response) ){
			$output_array['success'] = false;
			$output_array['error_msg'] = $error_msg;
			return $output_array;
		}
		if ($errors_array = _wts_reg_errors_reported($response->body) ){
			$output_array['success'] = false;
			$output_array['reg_errors'] = $errors_array;
			return $output_array;
		}


		foreach($response_patterns as $name=>$pattern){
			if(preg_match($pattern,$response->body,$match)){
					$parsed_response_fields[$name]=$match[1];
			}
		}
		if ( preg_match_all("/var prompt(\d\d)='Y';/",$response->body,$prompt_matches,PREG_SET_ORDER) ){
			$output_array['questionaire'] = true;
			foreach($prompt_matches as $index=>$current_prompt){
				$output_array['pending_questions'][] = $current_prompt[1];
			}
		} else {
			$output_array['questionaire'] = false;
		}
		$output_array['success'] = true;
		$output_array['response_fields'] = $parsed_response_fields;
		$output_array['raw'] = print_r($response,true);


	} else {
		$output_array['success'] = false;
		$output_array['error_msg'] = "Input Validation Failed: ".$error_msg;			
	}
	return $output_array;
}


function wts_register_get_schedule($tkt,$yrq){
	global $wts_rq_url;
	global $error_msg;
	$request_type='registr';
	$parsed_response_fields = array();

	if ( _wts_validate_tkt($tkt) && _wts_validate_yrq($yrq) ){
	
		$fields = array(	
						'request'=>$request_type,
						'regfunc'=> '04',
						'tkt'=>$tkt,
						'yrq'=>$yrq
						);

		$response = http_parse_message(http_post_fields($wts_rq_url,$fields));
		if (! _wts_check_https_status($response) ){
			$output_array['success'] = false;
			$output_array['error_msg'] = $error_msg;
			return $output_array;
		}

		if ($errors_array = _wts_reg_errors_reported($response->body) ){
			$output_array['success'] = false;
			$output_array['reg_errors'] = $errors_array;
			return $output_array;
		}

		$output_array['response_fields'] = _wts_parse_reg_response($response->body);
		$output_array['success'] = true;
		$output_array['raw'] = $response->body;

	} else {
				$output_array['success'] = false;
				$output_array['error_msg'] = "Input Validation Failed: ".$error_msg;			
	}
	return $output_array;
}

function wts_register_add_items($tkt,$yrq,$items){
	global $wts_rq_url;
	global $error_msg;
	$request_type='registr';
	$parsed_response_fields = array();

	if ( _wts_validate_tkt($tkt) && _wts_validate_yrq($yrq) && _wts_validate_items($items) ){
	
		$fields = array(	
						'request'=>$request_type,
						'regfunc'=> '04',
						'tkt'=>$tkt,
						'yrq'=>$yrq,
						'e001'=>'',
						);

		$index=1;
		foreach ($items as $item){
			$fields['c00'.$index] = $item;
			$fields['act00'.$index] = 'A';
			$index++;
		}

		$response = http_parse_message(http_post_fields($wts_rq_url,$fields));
		if (! _wts_check_https_status($response) ){
			$output_array['success'] = false;
			$output_array['error_msg'] = $error_msg;
			return $output_array;
		}
		$output_array['raw'] = $response->body;

		if ($errors_array = _wts_reg_errors_reported($response->body) ){
			$output_array['success'] = false;
			$output_array['reg_errors'] = $errors_array;
		}
		if ($reqd_entry_codes_array = _wts_entry_codes_required($response->body)){
			$output_array['ec_required'] = true;
			$output_array['ec_required_array'] = $reqd_entry_codes_array;
		}
		if ($waitlist_array = _wts_reg_waitlist_suggested($response->body) ){
			$output_array['success'] = false;
			$output_array['reg_waitlist_suggestions'] = $waitlist_array;
		}

		$output_array['response_fields'] = _wts_parse_reg_response($response->body);
		$output_array['success'] = true;

	} else {
				$output_array['success'] = false;
				$output_array['error_msg'] = "Input Validation Failed: ".$error_msg;			
	}
	return $output_array;
}

function wts_register_post_entry_codes($tkt,$yrq,$items,$entry_codes){
	global $wts_rq_url;
	global $error_msg;
	$request_type='registr';
	$parsed_response_fields = array();

	if ( _wts_validate_tkt($tkt) && _wts_validate_yrq($yrq) && _wts_validate_items($items) && _wts_validate_entry_codes($items,$entry_codes) ){
	
		$fields = array(	
						'request'=>$request_type,
						'regfunc'=> '04',
						'tkt'=>$tkt,
						'yrq'=>$yrq,
						);

		$index=1;
		foreach ($items as $item){
			$fields['c00'.$index] = $item;
			$fields['act00'.$index] = 'A';
			$fields['e00'.$index] = $entry_codes[$index-1];
			$index++;
		}
	
		$response = http_parse_message(http_post_fields($wts_rq_url,$fields));
		if (! _wts_check_https_status($response) ){
			$output_array['success'] = false;
			$output_array['error_msg'] = $error_msg;
			return $output_array;
		}
		$output_array['raw'] = $response->body;

		if ($errors_array = _wts_reg_errors_reported($response->body) ){
			$output_array['success'] = false;
			$output_array['reg_errors'] = $errors_array;
			return $output_array;
		}

		if ($reqd_entry_codes_array = _wts_entry_codes_required($response->body)){
			$output_array['ec_required'] = true;
			$output_array['ec_required_array'] = $reqd_entry_codes_array;
		}
		if ($waitlist_array = _wts_reg_waitlist_suggested($response->body) ){
			$output_array['success'] = false;
			$output_array['reg_waitlist_suggestions'] = $waitlist_array;
		}

		$output_array['response_fields'] = _wts_parse_reg_response($response->body);
		$output_array['success'] = true;

	} else {
				$output_array['success'] = false;
				$output_array['error_msg'] = "Input Validation Failed: ".$error_msg;			
	}
	return $output_array;
}

function wts_register_post_item_actions($tkt,$yrq,$item_action_array){
	global $wts_rq_url;
	global $error_msg;
	$request_type='registr';
	$parsed_response_fields = array();

	if ( _wts_validate_tkt($tkt) && _wts_validate_yrq($yrq) && _wts_validate_item_action_array($item_action_array)){
	
		$fields = array(	
						'request'=>$request_type,
						'regfunc'=> '04',
						'tkt'=>$tkt,
						'yrq'=>$yrq,
						);

		$index=1;
		foreach ($items as $item){
			$fields['c00'.$index] = $item;
			$fields['act00'.$index] = 'A';
			$fields['e00'.$index] = $entry_codes[$index-1];
			$index++;
		}
	
		$response = http_parse_message(http_post_fields($wts_rq_url,$fields));
		if (! _wts_check_https_status($response) ){
			$output_array['success'] = false;
			$output_array['error_msg'] = $error_msg;
			return $output_array;
		}
		$output_array['raw'] = $response->body;

		if ($errors_array = _wts_reg_errors_reported($response->body) ){
			$output_array['success'] = false;
			$output_array['reg_errors'] = $errors_array;
			return $output_array;
		}

		if ($reqd_entry_codes_array = _wts_entry_codes_required($response->body)){
			$output_array['ec_required'] = true;
			$output_array['ec_required_array'] = $reqd_entry_codes_array;
		}
		if ($waitlist_array = _wts_reg_waitlist_suggested($response->body) ){
			$output_array['success'] = false;
			$output_array['reg_waitlist_suggestions'] = $waitlist_array;
		}

		$output_array['response_fields'] = _wts_parse_reg_response($response->body);
		$output_array['success'] = true;

	} else {
				$output_array['success'] = false;
				$output_array['error_msg'] = "Input Validation Failed: ".$error_msg;			
	}
	return $output_array;
}





/**
*  utility functions
**/
function _wts_check_https_status(&$response){
	global $error_msg;
	if ($response->responseCode != 200){
		$error_msg = "HTTP failure, server returned code ".$response->responseCode;
		return false;	
	}
	if(preg_match("/<TITLE>503 Service Unavailable<\/TITLE>/",$response->body)){
		$error_msg = "HTTP failure, server returned code 503";
		return false;
	}
	return true;
}


function _wts_reg_errors_reported($response_body){
	/**
	*	Parses known and unknown errors for an attempt to add a single class.  
	**/
	global $error_msg;
	$known_error_patterns = array(
		"\(0019\) There is a flag on your records that blocks registration\.",
		"\(0026\) Registration for this quarter has not yet started\.",
		"\(0038\) You have already registered for this class\.",
		"\(1001\) Invalid item number\.",
		"\(1008\) You must add this class at the registration office\.",
		"\(1009\) Web registration for this quarter is closed\.",
		"\(1019\) This class is full\.",
		"\(1020\) Permission is required to register for this class\.",
		"\(1027\) Invalid course entry code\.",
		"\(1028\) Course entry code cannot be used with this course\.",
	);
	$error_code_pattern = "errorDataArray\[(\d\d)\]=new errorData\(\s*\n'(.{9})','(\d{4})','(.*)'\);";
	print("\nchecking for errors...");
	if ( preg_match_all("/$error_code_pattern/Ums",$response_body,$matches,PREG_SET_ORDER) ){
		foreach ($matches as $match){
			$output_array[ $match[3] ] = $match[4];
		}
		return $output_array;
	}
	print("No Match\n");
	return false;
}

function _wts_entry_codes_required($response_body){
	$output_array = array();
	$entry_code_pattern = "entryCdData\[(\d\d)\]=new promptData\(\s*\n'(.{9})','(\d{4})','(.*)'\);";
	$message_patterns = array(	"\(0115\) Unmet prerequisite - override with a course entry code\.",
															"\(1034\) Permission required - override with a course entry code\.",
														);
	if ( preg_match_all("/$entry_code_pattern/Ums",$response_body,$matches,PREG_SET_ORDER) ){
		foreach ($matches as $match){
			$output_array[] =  $match[3];
		}
		return $output_array;
	}
	return false;
}

function _wts_reg_waitlist_suggested($response_body){
	$output_array = array();
	$waitlist_pattern = "wlistData\[(\d\d)\]=new promptData\(\s*\n'(.{9})','(\d{4})','\(0121\) The current waitlist count = (\d{4}) and capacity = (\d{4}).'\);";
	if ( preg_match_all("/$waitlist_pattern/Ums",$response_body,$matches,PREG_SET_ORDER) ){
		foreach ($matches as $match){
			$output_array[ $match[3] ] = array('count'=>$match[4],'capacity'=>$match[5]);
		}
		return $output_array;
	}
	return false;
}




function _wts_parse_reg_response($response_body){
	$response_array = array();
	$response_patterns = array(
		'tkt' => "/var tkt='(\w+)';/",
		'yrq' => "/var yrq='(\w+)';/",
		'timeout' => "/timeout='(\w+)';/",
		'refresh' => "/refresh='(\d+)';/",
		'clocksw'=> "/clockSw= '([YN])';/",
		'total_credits'=>"/var totCr='([\d\.]+)';/",			
		'tuition'=>"/var tuit01='\s*([\d\.]+)';/",			
		'fees'=>"/var tuit02='\s*([\d\.]+)';/",			
		'total'=>"/var tuit03='\s*([\d\.]+)';/",
		'waitlist_prompt'=>"/wlistPrompt='([YN])';/",
		'waitlist_preference'=>"/wlistPref='([YN])';/",
		'total_due'=>"/var tuit07='\s*([\d\.]+)';/",	
		'total_hours'=>"/totHr='\s*([\d\.]+)';/", 		
		'credit_ind'=>"/var creditInd='([YN])';/",
		'clock_ind'=>"/var clockInd='([YN])';/",
		'audit_ind'=>"/var audInd='([YN])';/",
		'variable_credit_ind'=>"/var varCrInd='([YN])';/",
		'entry_code_prompt'=>"/var promptEntry='([YN])';/",
		'class_errors'=>"/var classErrors='([YN])';/",
		'info_message'=>"/var infoMsg='([YN])';/",
		'payment'=>"/var tuit04='\s*([\d\.]+)';/",
		'financial_aid'=>"/var tuit05='\s*([\d\.]+)';/",
		'total_paid'=>"/var tuit06='\s*([\d\.]+)';/",
		'refund'=>"/var tuit08='\s*([\d\.]+)';/",
		);
	$course_pattern = "/new classInfo\(\s+'(.*)','(.{9})','(\d{4})','\s*([\d\.]+)','(.{10})','(.{15})','(.{5})','(.{5})','(.{12})','(.{6})','(.{5})','(.)','(.{4})','(.{7})'\);/";
	$ec_required_pattern = "/new promptData\('(.{9})','(\d{4})','\((\d{4})\) (.*)'\);/";

	foreach($response_patterns as $name=>$pattern){
		if(preg_match($pattern,$response_body,$match)){
				$response_array[$name]=$match[1];
		}
	}
	if(preg_match_all($course_pattern,$response_body,$course_matches,PREG_SET_ORDER)){				
		foreach($course_matches as $index=>$current_matches){
			$response_array['enrolled_classes'][$current_matches[3]] = array(
				'type'=>$current_matches[1],
				'course'=>$current_matches[2],
				'item'=>$current_matches[3],
				'credits'=>$current_matches[4],
				'days'=>$current_matches[5],
				'times'=>$current_matches[6],
				'building'=>$current_matches[7],
				'room'=>$current_matches[8],
				'instructor'=>$current_matches[9],
				'clock_hours'=>$current_matches[10],
				'grade'=>$current_matches[11],
				'variable_credit_ind'=>$current_matches[12],
				'class_credits'=>$current_matches[13],
				'class_fee'=>$current_matches[14],
				);
		}
	}
	if(preg_match_all($ec_required_pattern,$response_body,$ec_required_matches,PREG_SET_ORDER)){				
		foreach($ec_required_matches as $index=>$current_matches){
			$response_array['required_entry_codes'][$current_matches[2]] = array(
				'course'=>$current_matches[1],
				'item'=>$current_matches[2],
				'reason_code'=>$current_matches[3],
				'reason_msg'=>$current_matches[4],
			);
		}			
	}

	return $response_array;
}


function convert_yrq_to_qyr_sess($yrq){
	$matches=array();
	if ( preg_match('/^(\d)(\d)(\d)(\d)$/',$yrq,$matches) ) {
		$ayr = '19'.$matches[1].$matches[2].' - '.$matches[1].$matches[3];
		$sess = $matches[4];
	}	else {
		if( preg_match('/^(\w)(\d)(\d)(\d)$/i',$yrq,$matches) ){
			switch($matches[1]){
				case 'a':
				case 'A':
					$prefix = '200';
					$tens = '0';					
					break;
				
				case 'b':
				case 'B':
					$prefix = '201';
					$tens = '1';					
					break;				

				case 'c':
				case 'C':
					$prefix = '202';
					$tens = '2';					
					break;				

				case 'c':
				case 'C':
					$prefix = '203';
					$tens = '3';
					break;
				// I retire in 2034, so the rest of the alphabet is somebody else's problem.					
			}
			$ayr = $prefix.$matches[2].' - '.$tens.$matches[3];
			$sess = $matches[4];	
		}
	}
	
	return array($ayr,$sess);
}

/**
*  validators below --generally speaking, they only validate data schema, not actual content.
**/
function _wts_validate_sid($sid){
	global $error_msg;
	if(preg_match('/^\d\d\d\d\d\d\d\d\d$/',$sid)){
		return true;
	} else {
		$error_msg = "Invalid SID";
		return false;
	}
}

function _wts_validate_pin($pin){
	global $error_msg;
	if(preg_match('/^\d{4,7}$/',$pin) && $pin > 999){
		return true;
	} else {
		$error_msg = "Invalid PIN";
		return false;
	}
}

function _wts_validate_yrq($yrq){
	global $error_msg;
	if(preg_match('/^[7-9A-C](01|12|23|34|45|56|67|78|89|90)[1-4]$/i',$yrq)){
		return true;
	} else {
		$error_msg = "Invalid Year/Quarter";
		return false;
	}
}

function _wts_validate_item($item){
	global $error_msg;
	if(preg_match('/^\d\d\d\d$/',$item)){
		return true;
	} else {
		$error_msg = "Invalid Item Number";
		return false;
	}
}

function _wts_validate_items($items){
	global $error_msg;
	if (count($items) < 1 || count($items) > 9){
		$error_msg = "Too many or too few items";
		return false;
	}
	foreach($items as $item){
		if( ! preg_match('/^\d\d\d\d$/',$item)){
			$error_msg = "Invalid Item Number";
			return false;
		}
	}
	return true;
}

function _wts_validate_entry_codes($items,$entry_codes){
	global $error_msg;
	if ( count($items) != count($entry_codes) ){
		$error_msg = "You must post the same number of items and entry codes";
		return false;
	}
	if (count($entry_codes) < 1 || count($entry_codes) > 9){
		$error_msg = "Too many or too few Entry Codes";
		return false;
	}
	foreach($entry_codes as $entry_code){
		if(! preg_match('/\d{5}/',$entry_code)){
			$error_msg = "Invalid Entry Code";
			return false;
		}
	}
	return true;
}

function _wts_validate_item_action_array($item_action_array){
	global $error_msg;
	foreach($item_action_array as $item=>$action){
		if (! _wts_validate_item($item) ){
			//error_msg from _wts_validate_item is acceptable.
			return false;
		}
		if (is_array($action)){
		} else {
			if (! preg_match('[AD]',$action) ){
				$error_msg = "Invalid action '$action' requested form item $item.";
				return false;
			}
		}
	}
}

function _wts_validate_tkt($tkt){
	global $error_msg;
	if(preg_match('/^[A-Z0-9]{17}$/',$tkt)){
		return true;
	} else {
		$error_msg = "Invalid Ticket";
		return false;
	}
}


function _wts_validate_address_array($address_array){
	global $error_msg;
	$acceptable_fields = array(
		'str'=>24,
		'cty'=>16,
		'ste'=>2,
		'zip'=>9,
		'dp1'=>3,
		'dp2'=>3,
		'dp3'=>4,
		'ep1'=>3,
		'ep2'=>3,
		'ep3'=>4,
		'email'=>60,
	);
	if (array_diff_key($address_array,$acceptable_fields) ){
		$error_msg = "Extra fields in the address array.";
		return false;
	} else {
		foreach($address_array as $key=>$value){
				if (strlen($value) > $acceptable_fields[$key]){
						$error_msg = "Address array field '$key' is to long.";
						return false;
				}
				switch($key){
					case 'cty':
						if ( preg_match('/[-\W_]/',$value) ){ $error_msg = "Address array field '$key' has problem character.";return false; }
					break;

					case 'zip':
						if ( preg_match('/\D/',$value) ){ $error_msg = "Address array field '$key' has problem character.";return false; }
					break;
											
					case 'ste':
						if ( ! preg_match('/^[A-Z][A-Z]$/',$value) ){ $error_msg = "Address array field '$key' has problem character.";return false; }
					break;

					case 'dp1':						
					case 'dp2':						
					case 'ep1':						
					case 'ep2':						
						if ( ! preg_match('/^\d\d\d$/',$value) ){ $error_msg = "Address array field '$key' id invalid.";return false; }
					break;

					case 'dp3':						
					case 'ep3':						
						if ( ! preg_match('/^\d\d\d\d$/',$value) ){ $error_msg = "Address array field '$key' id invalid.";return false; }
					break;
					
					case 'email':
						$horrible_email_regular_expression_just_trust_us = '/^(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))$/iD';
						if ( ! preg_match($horrible_email_regular_expression_just_trust_us,$value) ){ $error_msg = "Address array field '$key' id invalid.";return false; }
					break;
					
						
				}
		}
	
		return true;
	}
}

/*
The response array is an array of answers to the enrollment questions first-time enrollees are subjected to:
1. How will your course work relate to your current or future work?
2. What is your main long-term goal for attending this college?
3. How long do you plan to attend this college?
4. What is your work status while attending this college?
5. What is your prior education level upon entry to this college?
6. What is your current family status?
7. Do you have a physical or mental impairment which substantially limits one or more major life activities, such as seeing, hearing, speaking, walking, learning, working, etc?
8. What is your gender?

*/

function _wts_validate_reg_questionaire_response($response_array){

	global $error_msg;
	$acceptable_fields = array(
		'response01'=>'/^(11|12|13|14|90|\*\*)$/',
		'response02'=>'/^(11|12|13|14|15|90|\*\*)$/',
		'response03'=>'/^(11|12|13|14|15|16|90|\*\*)$/',
		'response04'=>'/^(11|12|13|14|15|16|80|81|82|90|\*\*)$/',
		'response05'=>'/^(10|11|12|13|14|15|16|17|90|\*\*)$/',
		'response06'=>'/^(11|12|13|90|\*\*)$/',
		'response07'=>'/^(Y|N|\*\*)$/',
		'response08'=>'/^(M|F|\*\*)$/',
	);
	if (array_diff_key($response_array,$acceptable_fields)){
		$error_msg = "Extra fields in response array.";
		return false;
	}
	if (array_diff_key($acceptable_fields,$response_array)){
		$error_msg = "Missing fields in response array.";
		return false;
	}
	foreach($response_array as $key=>$value){
		if (! preg_match($acceptable_fields[$key],$value) ){
			$error_msg .= "Response $key is invalid. -- {$acceptable_fields[$key]} = $value\n";
		}
	}
	if ($error_msg){
		return false;
	}
	return true;
}





?>