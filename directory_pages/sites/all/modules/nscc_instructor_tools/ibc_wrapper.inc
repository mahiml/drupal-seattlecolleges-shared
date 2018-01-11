<?php
global $ibc_rq_url;
global $ibc_return_url;
global $error_msg;

$ibc_rq_url = 'https://wts.seattlecolleges.edu/scripts/rq063.exe'; //This is the HTTPS url to your rq.exe server process.
$ibc_return_url = 'https://www.sccd.ctc.edu/'; //This is apparently needed by some requests, but has no other effect.
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
		//watchdog('ibc_wrapper',print_r($ibc_rq_url,true));
		//watchdog('ibc_wrapper',print_r($fields,true));
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

//requires that you have a valid ticket from a previous ibc_login
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

function _wts_validate_tkt($tkt){
	global $error_msg;
	if(preg_match('/^[A-Z0-9]{17}$/',$tkt)){
		return true;
	} else {
		$error_msg = "Invalid Ticket";
		return false;
	}
}

