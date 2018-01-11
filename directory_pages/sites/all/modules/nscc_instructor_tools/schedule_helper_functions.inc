<?php
function _get_current_quarter(){
	db_set_active('class_schedule');
	$date_now = date('Ymd');
	$sql = 'select yrq from schedule.yrq_details where last_day_yrq>=%s and published=true order by yrq asc limit 1;';
	$result = db_query($sql,$date_now);
	while($record=db_fetch_object($result)){
		$yrq = $record->yrq;
	}
	db_set_active('default');
	return $yrq;
}

function _get_prev_quarter($yrq){
	db_set_active('class_schedule');
	$sql = 'Select yrq from schedule.yrq_details where yrq<\'%s\' and published=true order by yrq desc limit 1;';
	$result = db_query($sql,$yrq);
	while($record=db_fetch_object($result)){
		$prev_yrq = $record->yrq;
	}
	db_set_active('default');
	if($prev_yrq){
		return $prev_yrq;
	} else {
		return false;
	}
}

function _get_next_quarter($yrq){
	db_set_active('class_schedule');
	$sql = 'Select yrq from schedule.yrq_details where yrq>\'%s\' and published=true order by yrq asc limit 1;';
	$result = db_query($sql,$yrq);
	while($record=db_fetch_object($result)){
		$next_yrq = $record->yrq;
	}
	db_set_active('default');
	if($next_yrq){
		return $next_yrq;
	} else {
		return false;
	}
}

function _yrq_to_quarter($yrq){
  $quarter_details = _get_quarter_details($yrq);
  if($quarter_details->yrq >= 'A001'){
    $output = preg_replace( '/ (\d\d)\s+$/',' 20$1',ucwords(strtolower(" {$quarter_details->abbr_title} ")) )." ";
  } else {
    $output = preg_replace( '/ (\d\d)\s+$/',' 19$1',ucwords(strtolower(" {$quarter_details->abbr_title} ")) )." ";
  } 
  return $output;	
}

function _get_course_precis($yrq,$item){
	$course_array = _get_class_details($yrq,$item);
	return rtrim(_yrq_to_quarter(strtoupper($yrq)))."/".$course_array['courseno']."(YRQ/Item: ".$yrq.$item.")";
}

function _get_quarter_details($yrq){
	db_set_active('class_schedule');
	$quarter_detail_array = array();

	$sql='SELECT  * from schedule.yrq_details where yrq=\'%s\';';
	$result = db_query($sql,$yrq);
	$quarter_details=db_fetch_object($result);
	db_set_active('default');
	return $quarter_details;
}

function _is_instructor($netid_uname){
	db_set_active('class_schedule');
	$sql = 'Select count(*) from schedule.class_details where rtrim(instructor) ilike \'%s\';';
	$count = db_result(db_query($sql,$netid_uname));
	db_set_active('default');
	if($count > 0){
		return true;
	}
	return false;
}

function _get_classes_per_instructor($yrq,$instructor){
	db_set_active('class_schedule');
	$sql = 'Select * from schedule.class_details where yrq=\'%s\' and rtrim(instructor) ilike \'%s\' order by course||section asc;';
	$result = db_query($sql,$yrq,$instructor);
	while($record=db_fetch_object($result)){
		$courseno = $record->course.".".$record->section;
		$courses_array[$record->item]['item'] = $record->item;
		$courses_array[$record->item]['courseno'] = $record->course.".".$record->section;
		$courses_array[$record->item]['coursetitle'] = $record->title;
		$courses_array[$record->item]['coursedaystimes'] = $record->days." ".$record->times;
	}
	db_set_active('default');
	return $courses_array;
}

function _get_class_details($yrq,$item){
	db_set_active('class_schedule');
	$sql = 'Select * from schedule.class_details where yrq=\'%s\' and item=\'%s\';';
	$result = db_query($sql,$yrq,$item);
	if ($record=db_fetch_object($result)){
		$courseno = $record->course.".".$record->section;
		$course_array['item'] = $record->item;
		$course_array['courseno'] = $record->course.".".$record->section;
		$course_array['coursetitle'] = $record->title;
		$course_array['coursedaystimes'] = $record->days." ".$record->times;
		$course_array['url'] = $record->url;
		$course_array['instructor_message'] = $record->instructor_message;
		$course_array['instructor'] = $record->instructor;
	}
	db_set_active('default');
	return $course_array;
}

function _get_other_sections($yrq,$item){
	$section_array=array();
	db_set_active('class_schedule');
	$sql = "select cd.item,cd.course||'.'||cd.section as section from class_details as cd  join (select cd2.course from class_details as cd2 where cd2.item='%s' and cd2.yrq='%s') as target_course on (target_course.course = cd.course) where cd.yrq='%s' and not cd.item='%s';";
	$result = db_query($sql,$item,$yrq,$yrq,$item);
	while($record=db_fetch_object($result)){
		$section_array[$record->item] = $record->section;
	}
	db_set_active('default');
	return $section_array;
}

function _get_class_roster($yrq,$item){
	_checkadd_sm_db();
	db_set_active('sm');
	$sql = 'SELECT sid,fullname,email,gradeid,feepaystatusid,array(SELECT action FROM sm.enrollment_transaction_requests as etr where etr.sid=r.sid and etr.yrq=r.yrq and etr.item=r.item and etr.request_status=\'pending\') as pending_actions FROM sm.roster as r WHERE r.yrq=\'%s\' AND r.item=\'%s\'  ORDER BY r.fullname ASC;';
	$result = db_query($sql,$yrq,$item);
	while($record=db_fetch_object($result)){
		if($record->pending_actions){
			$pa_string = trim($record->pending_actions,'{}');
			$pa_array  = explode(",",$pa_string);
		}else{
			$pa_array=array();
		}
		$roster_array[$record->sid] = array(
																						'sid'=>$record->sid,
																						'fullname'=>$record->fullname,
																						'email'=>$record->email,
																						'gradeid'=>$record->gradeid,
																						'feepaystatusid'=>$record->feepaystatusid,
																						'pending_actions'=>$pa_array,
		);
	}	
	db_set_active('default');
	//watchdog('instructor_tools',"YRQ: $yrq, item: $item\n".'<pre>'.print_r($roster_array,true).'</pre>');
	return $roster_array;
}

function _augment_ibc_roster($yrq,$item,$ibc_roster){


	//we get the required sids from the ibc_roster, and pack them into a single sql statement.
	foreach($ibc_roster as $student){
		$sidlist .= "'".$student['sid']."',";
	}
	if($sidlist){
		$sidclause = "  AND r.sid IN (".rtrim($sidlist,",").")";
	}
	//watchdog('etr_test','SIDlist: '.$sidlist);

	//execute same to build array of data from ods
	_checkadd_sm_db();
	db_set_active('sm');
	$sql = 'SELECT sid,gradeid,feepaystatusid,array(SELECT action FROM sm.enrollment_transaction_requests as etr where etr.sid=r.sid and etr.yrq=r.yrq and etr.item=r.item and etr.request_status=\'pending\') as pending_actions FROM sm.roster as r WHERE r.yrq=\'%s\' AND r.item=\'%s\''.$sidclause.' ORDER BY r.fullname ASC;';
	//$sql = 'SELECT sid,array(SELECT action FROM sm.enrollment_transaction_requests as etr where etr.sid=r.sid and etr.yrq=r.yrq and etr.item=r.item and etr.request_status=\'pending\') as pending_actions FROM sm.roster as r WHERE r.yrq=\'%s\' AND r.item=\'%s\'  AND r.sid IN '.$sidlist.' ORDER BY r.fullname ASC;';
	$result = db_query($sql,$yrq,$item);
	while($record=db_fetch_object($result)){
		if($record->pending_actions){
			$pa_string = trim($record->pending_actions,'{}');
			$pa_array  = explode(",",$pa_string);
		}else{
			$pa_array=array();
		}
		$roster_array[$record->sid] = array(
																						'sid'=>$record->sid,
																						'gradeid'=>$record->gradeid,
																						'feepaystatusid'=>$record->feepaystatusid,
																						'pending_actions'=>$pa_array,
		);
	}	
	//watchdog('instructor_tools',"YRQ: $yrq, item: $item\n".'<pre>'.print_r($roster_array,true).'</pre>');
	$sql = 'select sid,array(SELECT action FROM sm.enrollment_transaction_requests as etr where etr.sid=etr2.sid and etr.yrq=etr2.yrq and etr.item=etr2.item and etr.request_status=\'pending\') as pending_actions from sm.enrollment_transaction_requests as etr2 where etr2.yrq=\'%s\' and etr2.item=\'%s\' group by etr2.sid,etr2.yrq,etr2.item;';
	$result = db_query($sql,$yrq,$item);
	while($record=db_fetch_object($result)){
		if($record->pending_actions){
			$pa_string = trim($record->pending_actions,'{}');
			$pa_array  = explode(",",$pa_string);
		}else{
			$pa_array=array();
		}
		$roster_array[$record->sid]['pending_actions'] = $pa_array;
	}	
	db_set_active('default');

	//Then combine the ODS data with the live data from ibc
	
	foreach($ibc_roster as $ibc_record){
		$output_roster[ $ibc_record['sid'] ] = array(
																						'sid'=>$ibc_record['sid'],
																						'fullname'=>$ibc_record['name'],
																						'email'=>$ibc_record['email'],
																						'gradeid'=>$roster_array[ $ibc_record['sid'] ]['gradeid'],
																						'feepaystatusid'=>$roster_array[ $ibc_record['sid'] ]['feepaystatusid'],
																						'pending_actions'=>$roster_array[ $ibc_record['sid'] ]['pending_actions'],
		);
	}
	
	
	return $output_roster;
	
}

function _augment_ibc_waitlist($yrq,$item,$ibc_waitlist){


	//we get the required sids from the ibc_roster, and pack them into a single sql statement.
	foreach($ibc_waitlist as $student){
		$sidlist .= "'".$student['sid']."',";
	}
	if($sidlist){
		$sidclause = " AND r.sid IN (".rtrim($sidlist,",").")";
	}
	//watchdog('etr_test','SIDlist: '.$sidlist);

	//execute same to build array of data from ods
	_checkadd_sm_db();
	db_set_active('sm');
	$sql = 'SELECT sid,array(SELECT action FROM sm.enrollment_transaction_requests as etr where etr.sid=r.sid and etr.yrq=r.yrq and etr.item=r.item and etr.request_status=\'pending\') as pending_actions FROM sm.enrollment_transaction_requests as r WHERE r.yrq=\'%s\' AND r.item=\'%s\''.$sidclause.';';
	$result = db_query($sql,$yrq,$item);
	while($record=db_fetch_object($result)){
		if($record->pending_actions){
			$pa_string = trim($record->pending_actions,'{}');
			$pa_array  = explode(",",$pa_string);
		}else{
			$pa_array=array();
		}
		$roster_array[$record->sid] = array(
																						'sid'=>$record->sid,
																					'pending_actions'=>$pa_array,
		);
	}	
	db_set_active('default');
	//watchdog('instructor_tools',"YRQ: $yrq, item: $item\n".'<pre>'.print_r($roster_array,true).'</pre>');

	//Then combine the ODS data with the live data from ibc
	
	foreach($ibc_waitlist as $ibc_record){
		$output_roster[ $ibc_record['sid'] ] = array(
																						'sid'=>$ibc_record['sid'],
																						'fullname'=>$ibc_record['name'],
																						'email'=>$ibc_record['email'],
																						//'gradeid'=>$roster_array[ $ibc_record['sid'] ]['gradeid'],
																						//'feepaystatusid'=>$roster_array[ $ibc_record['sid'] ]['feepaystatusid'],
																						'pending_actions'=>$roster_array[ $ibc_record['sid'] ]['pending_actions'],
		);
	}
	
	
	return $output_roster;
	
}



function _post_enrollment_transaction($record){
	_checkadd_sm_db();
	db_set_active('sm');
	$sql = "INSERT INTO sm.enrollment_transaction_requests (yrq,item,action,destination,sid,fullname,email,reason,requestor,instructor) VALUES ('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');";
	$get_id_sql = "SELECT currval('sm.enrollment_transaction_requests_id_seq');";
	$result = db_query($sql,$record->yrq,$record->item,$record->action,$record->destination,$record->sid,$record->fullname,$record->email,$record->reason,$record->requestor,$record->instructor);
	$id = db_result(db_query($get_id_sql));
	db_set_active('default');
	return $id;	
}

function _complete_enrollment_transaction($record_id,$completor = 'unknown'){
	_checkadd_sm_db();
	db_set_active('sm');
	$sql = "UPDATE sm.enrollment_transaction_requests SET request_status='completed',completor='%s',dtg_completed=now() WHERE id = %d;";
	$result = db_result(db_query($sql,$completor,$record_id));
	db_set_active('default');
}

function _deny_enrollment_transaction($record_id,$completor = 'unknown',$denial_reason = 'unknown'){
	_checkadd_sm_db();
	db_set_active('sm');
	$sql = "UPDATE sm.enrollment_transaction_requests SET request_status='denied',completor='%s',dtg_completed=now(),denial_reason='%s' WHERE id = %d;";
	$result = db_result(db_query($sql,$completor,$denial_reason,$record_id));
	db_set_active('default');
}

function _unlock_enrollment_transaction($record_id){
	_checkadd_sm_db();
	db_set_active('sm');
	$sql = "UPDATE sm.enrollment_transaction_requests SET request_status='pending',dtg_locked=null WHERE id = %d;";
	$result = db_result(db_query($sql,$record_id));
	db_set_active('default');
}

function _unlock_stale_locks(){
	_checkadd_sm_db();
	db_set_active('sm');
	$sql = "UPDATE sm.enrollment_transaction_requests SET request_status='pending',dtg_locked=null WHERE request_status='locked' and dtg_locked <= (now() - interval '1 hour');";
	$result = db_result(db_query($sql));
	db_set_active('default');
}



function _get_next_enrollment_transaction(){
	_checkadd_sm_db();
	db_set_active('sm');
	$sql_start_trans = "BEGIN;LOCK TABLE sm.enrollment_transaction_requests IN ACCESS EXCLUSIVE MODE;";
	$sql_get_count = "SELECT count(id) FROM sm.enrollment_transaction_requests WHERE request_status='pending';";
	$sql_update ="UPDATE sm.enrollment_transaction_requests SET request_status='locked',dtg_locked=now() WHERE dtg_requested = (SELECT min(dtg_requested) AS dtg_requested FROM sm.enrollment_transaction_requests WHERE request_status='pending');";
	$sql_select ="SELECT * from sm.enrollment_transaction_requests etr JOIN (SELECT max(dtg_requested) AS dtg_requested FROM sm.enrollment_transaction_requests WHERE request_status='locked') AS max USING (dtg_requested);";
	$sql_end_trans .="COMMIT;";
	db_query($sql_start_trans);
	$tally = db_result(db_query($sql_get_count)); 
	db_query($sql_update);
	$enr_trans = db_fetch_object(db_query($sql_select));
	db_query($sql_end_trans);
	//watchdog('enr_trans','Next et: <pre>'.print_r($enr_trans,true).'</pre>');
	db_set_active('default');
	$enr_trans->tally = $tally;
	return $enr_trans;

}

function _get_enrollment_transaction_by_id($transaction_id){
	_checkadd_sm_db();
	db_set_active('sm');
	$sql = "SELECT etr.*,(SELECT count(tally_etr.id) FROM sm.enrollment_transaction_requests as tally_etr WHERE tally_etr.request_status='pending') as tally  FROM sm.enrollment_transaction_requests as etr WHERE id=%d;";
	$enr_trans = db_fetch_object(db_query($sql,$transaction_id));
	db_set_active('default');
	return $enr_trans;
}

function _get_enrollment_transaction_by_sid($sid){
	$output_array=array();
	$count = 0;
	_checkadd_sm_db();
	db_set_active('sm');
	$sql = "SELECT * FROM sm.enrollment_transaction_requests WHERE sid='%s' order by dtg_requested desc;";
	$result = db_query($sql,$sid);
	while($enr_trans = db_fetch_object($result)){
		$output_array[] = $enr_trans;
		$count++;
	}
	db_set_active('default');
	if ($count > 0){
		return $output_array;
	} else {
		return false;
	}	
}

function _get_enrollment_transactions_by_status($status){
	$output_array=array();
	$count = 0;
	_checkadd_sm_db();
	db_set_active('sm');
	$sql = "SELECT * FROM sm.enrollment_transaction_requests WHERE request_status='%s' order by dtg_completed desc,dtg_requested desc;";
	$result = db_query($sql,$status);
	while($enr_trans = db_fetch_object($result)){
		$output_array[] = $enr_trans;
		$count++;
	}
	db_set_active('default');
	if ($count > 0){
		return $output_array;
	} else {
		return false;
	}	
}



function _get_enrollment_transaction_stats(){
	_checkadd_sm_db();
	db_set_active('sm');
	$sql_pending = "select count(id) as pending_requests,date_trunc('minute',min(dtg_requested)) as oldest_date ,date_trunc('minute',max(dtg_requested)) as youngest_date, date_trunc('minute',now()-min(dtg_requested)) as oldest_age, date_trunc('minute',now()-max(dtg_requested)) as youngest_age, date_trunc('minute',avg(now()-dtg_requested)) as average_age from sm.enrollment_transaction_requests where request_status='pending' or request_status='locked';";
	$sql_complete= "select count(id) as completed_requests,date_trunc('minute',max(dtg_completed)) as most_recent_completed,avg(dtg_completed - dtg_locked) as average_completion_duration,date_trunc('minute',avg(dtg_completed - dtg_requested)) as average_total_completion_duration from sm.enrollment_transaction_requests where request_status='completed' or request_status='denied';";
	$pending_stats = db_fetch_object(db_query($sql_pending));
	$complete_stats = db_fetch_object(db_query($sql_complete));
	db_set_active('default');
	$stats = new stdClass;
	$stats->pending_requests = $pending_stats->pending_requests;
	$stats->pending_first = $pending_stats->oldest_date;
	$stats->pending_last = $pending_stats->youngest_date;
	$stats->pending_oldest = $pending_stats->oldest_age;
	$stats->pending_youngest = $pending_stats->youngest_age;
	$stats->pending_average_age = $pending_stats->average_age;
	$stats->completed_requests = $complete_stats->completed_requests;
	$stats->completed_last = $complete_stats->most_recent_completed;
	$stats->completed_average_duration = $complete_stats->average_completion_duration;
	$stats->completed_average_total_duration = $complete_stats->average_total_completion_duration;
	return $stats;
}

function _checkadd_sm_db() {

	global $db_url;

	// If current $db_url is not an array make it one (and don't forget to insert the default connection)
	if (!is_array($db_url)) {
		$default = $db_url;
		$db_url = array();
		$db_url['default'] = $default;
	}

  // Add the new reference
	if(!$db_url['sm']){
		$db_url['sm'] = 'pgsql://sm_viewer:83jge94gledifl@onering.inf/nscc';
	}
}


function _check_instructor_for_class($yrq,$item,$instructor){
	db_set_active('class_schedule');
	$sql = 'Select count(*) from schedule.class_details where yrq=\'%s\' and item=\'%s\' and rtrim(instructor) ilike \'%s\';';
	$result = db_result(db_query($sql,$yrq,$item,$instructor));
	db_set_active('default');
	if($result){
		return true;
	} 
	return false;
}


