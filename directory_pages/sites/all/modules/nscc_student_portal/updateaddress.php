#!/usr/bin/php -q
<?php


list($command,$sid,$pin) = $_SERVER['argv'];

if(validate_sid($sid) && validate_pin($pin)){
	$current_values = get_current_address_from_district($sid,$pin);
} else{
	print "ERROR: invalid SID and/or PIN\n";
}

// functions below here =======================================

function get_current_address_from_district($sid,$pin){
	$wts_rq_url = 'http://sccdweb.sccd.ctc.edu/scripts/rq063.exe';
	$patterns = array(
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
	$response_variables = array();

	$fields = array(	
					'request'=>'saddrchg',
					'sid'=>$sid,
					'pin'=>$pin
					);
						
	print_r($fields);
	//patterns in the expected return
	$response = http_parse_message(http_post_fields($wts_rq_url,$fields));
	//$response = http_parse_message(http_post_fields($wts_rq_url,$fields));
	print_r($response->body);
	
	$write_file = fopen("/root/test.html",'wb');
	fwrite($write_file,$response->body);
	fclose($write_file);

	if(preg_match($patterns['tkt'],$response->body)){
			foreach($patterns as $name=>$pattern){
				if(preg_match($pattern,$response->body,$match)){
						$response_variables[$name]=$match[1];
				}
			}
			return $response_variables;		
	} else {
			print "\n\tERROR: SID and PIN do not match\n";
			return false;
	}		
}

function update_address_to_district($current_values){
	$url = 'https://sccdweb.sccd.ctc.edu/scripts/rq063.exe';
	$boilerplate_fields = array(
					'request'=>'saddrupd',
					);
	$fields = array_merge($boilerplate_fields,$current_values);
	$response = http_parse_message(http_post_fields($url,$fields));
	print "\nUpdate Response:\n";	
	print $response->body;
	return true;
}

function validate_sid($sid){
	return true;
}
function validate_pin($pin){
	return true;
}

?>