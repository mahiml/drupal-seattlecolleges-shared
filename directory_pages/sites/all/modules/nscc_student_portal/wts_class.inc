<?php
class wts_request {
	const rq_url = 'https://sccdweb.sccd.ctc.edu/scripts/rq063.exe';
	private $fields = array(
		'request_type'=>'',
		'sid'=> '',
		'pin'=> '',
		'tkt'=> ''
		);

	private $request_types = array(
		'saddrchg',
		'saddrupd',
		'regappt',
		'stuschd',
		'pinchg',
		'inqwlist',
		'remwlist',
		'hope',
		'trnscrpt',
		'regreq',
		'regwelc',
		'registr',
	);
		
	private $error_msg;
		
	public function __set($property,$value){

		if (method_exists($this, ($method = 'validate_'.$property))){
			$valid = $this->$method($value);
		}
		if($valid){ 
			switch($property){
				case 'request_type':
				case 'sid':
				case 'pin':
				case 'tkt':
					$this->fields[$property] = $value;
					break;
				case 'error_msg':
					$this->error_msg = $value;	
					break;
			}
			return true;
		} else {
			$this->error_msg = "Invalid Property Value for $property";
			return false;
		}
	}
	
	public function __get($property){
		switch($property){
			case 'request_type':
			case 'sid':
			case 'pin':
			case 'tkt':
				return $this->fields[$property];
				break;
			case 'error_msg':
				return $this->error_msg;	
				break;
		}
	}
	public function __isset($property){
		switch($property){
			case 'request_type':
			case 'sid':
			case 'pin':
			case 'tkt':
				return isset($this->fields[$property]);
				break;
			case 'error_msg':
				return isset($this->error_msg);	
				break;
		}
	}

	public function __unset($property){
	}
	
	
	private function validate_request_type($request_type){
		return in_array($request_type,$this->request_types);
	}
	
	private function validate_sid($sid){
		if(preg_match('/^\d\d\d\d\d\d\d\d\d$/',$sid)){
			return true;
		} else {
			$this->error_msg = "Invalid SID";
			return false;
		}
	}
	
	private function validate_pin($pin){
		if(preg_match('/^\d{4,6}$/',$pin) && $pin > 999){
			return true;
		} else {
			$this->error_msg = "Invalid PIN";
			return false;
		}
	}
	
	private function validate_yrq($yrq){
		if(preg_match('/^[7-9A-C]01|12|23|34|45|56|67|78|89|90[1-4]$/i',$yrq)){
			return true;
		} else {
			$this->error_msg = "Invalid Year/Quarter";
			return false;
		}
	}
	
	private function validate_item($item){
		if(preg_match('/^\d\d\d\d$/',$item)){
			return true;
		} else {
			$this->error_msg = "Invalid Item Number";
			return false;
		}
	}

 private function validate_items($items){
		if (count($items) < 1 || count($items) > 9){
			$this->error_msg = "Too many or too few items";
			return false;
		}
		foreach($items as $item){
			if( ! preg_match('/^\d\d\d\d$/',$item)){
				$this->error_msg = "Invalid Item Number";
				return false;
			}
		}
		return true;
	}
		
	private function validate_entry_codes($items,$entry_codes){
		if ( count($items) != count($entry_codes) ){
			$this->error_msg = "You must post the same number of items and entry codes";
			return false;
		}
		if (count($entry_codes) < 1 || count($entry_codes) > 9){
			$this->error_msg = "Too many or too few Entry Codes";
			return false;
		}
		foreach($entry_codes as $entry_code){
			if(! preg_match('/\d{5}/',$entry_code)){
				$this->error_msg = "Invalid Entry Code";
				return false;
			}
		}
		return true;
	}

	private function validate_item_action_array($item_action_array){
		foreach($item_action_array as $item=>$action){
			if (! _wts_validate_item($item) ){
				//error_msg from _wts_validate_item is acceptable.
				return false;
			}
			if (is_array($action)){
			} else {
				if (! preg_match('[AD]',$action) ){
					$this->error_msg = "Invalid action '$action' requested form item $item.";
					return false;
				}
			}
		}
	}

	private function validate_tkt($tkt){
		if(preg_match('/^[A-Z0-9]{17}$/',$tkt)){
			return true;
		} else {
			$this->error_msg = "Invalid Ticket";
			return false;
		}
	}


	private function validate_address_array($address_array){
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
			$this->error_msg = "Extra fields in the address array.";
			return false;
		} else {
			foreach($address_array as $key=>$value){
					if (strlen($value) > $acceptable_fields[$key]){
							$this->error_msg = "Address array field '$key' is to long.";
							return false;
					}
					switch($key){
						case 'cty':
							if ( preg_match('/[-\W_]/',$value) ){ $this->error_msg = "Address array field '$key' has problem character.";return false; }
						break;
	
						case 'zip':
							if ( preg_match('/\D/',$value) ){ $this->error_msg = "Address array field '$key' has problem character.";return false; }
						break;
												
						case 'ste':
							if ( ! preg_match('/^[A-Z][A-Z]$/',$value) ){ $this->error_msg = "Address array field '$key' has problem character.";return false; }
						break;
	
						case 'dp1':						
						case 'dp2':						
						case 'ep1':						
						case 'ep2':						
							if ( ! preg_match('/^\d\d\d$/',$value) ){ $this->error_msg = "Address array field '$key' id invalid.";return false; }
						break;
	
						case 'dp3':						
						case 'ep3':						
							if ( ! preg_match('/^\d\d\d\d$/',$value) ){ $this->error_msg = "Address array field '$key' id invalid.";return false; }
						break;
						
						case 'email':
							$horrible_email_regular_expression_just_trust_us = '/^(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))$/iD';
							if ( ! preg_match($horrible_email_regular_expression_just_trust_us,$value) ){ $this->error_msg = "Address array field '$key' id invalid.";return false; }
						break;
						
							
					}
			}
		
			return true;
		}
	}

				
}


?>