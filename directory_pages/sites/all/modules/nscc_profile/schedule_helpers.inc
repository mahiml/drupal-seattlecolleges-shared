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


