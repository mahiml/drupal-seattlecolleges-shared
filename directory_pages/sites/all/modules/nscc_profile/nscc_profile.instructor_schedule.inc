<?php 

require_once('schedule_helpers.inc');
/*
function nscc_profile_instructor_class_schedule_handler($instructor_id="",$current_quarter = ""){
	$json_array = _yrq_ajax_nav_output($current_quarter);
	$json_array['instructor_class_schedule'] = _get_instructor_class_schedule_for_quarter($instructor_id,$current_quarter);
	
	print drupal_to_js($json_array);
	//error_log(print_r($instructor_id." ".$current_quarter,TRUE),3,"/var/tmp/testlog.txt");

}
*/

function _get_instructor_schedule_block($instructor_id,$current_quarter){
	$account = user_load( array('uid'=>$instructor_id) );
	if (_is_instructor($account->name)){
		$output = "<div id=\"instructor_schedule_quarter_display\">\n";
		$output .= _get_instructor_class_schedule_for_quarter($instructor_id,$current_quarter);
		$output .="</div>";
		$output .= _yrq_nav_output($current_quarter,$account->uid);
	} else {
		$output = "";
	}
	return $output;
}

function _get_instructor_class_schedule_for_quarter($instructor_id,$current_quarter){
		global $user;
		if(!$account){
			$account = user_load( array('uid'=>$instructor_id) );
		}
		$output .= t('<h2>'._yrq_to_quarter($current_quarter).' Classes'."</h2>\n");
		$output .="<div class=\"class_list\">";
		$courses_array = _get_classes_per_instructor($current_quarter,$account->name);
		if(is_array($courses_array)){
			$output .="<ul class=\"classes\">";
			foreach($courses_array as $course){
				if ($user->uid == $instructor_id || $user->uid == 1 || $user->uid == 3 ){
					$item_edit_link = '&nbsp;'.l('Edit','tools/'.$account->name.'/item_details_update/'.$current_quarter."/".$course['item'],array('attributes'=>array('class' => 'edit-button')));
				}
				$output .= "<li class=\"class\"><ul class=\"class_details\">";
				$output .= "<li class=\"course-no\">".l($course['courseno'],'http://resources.northseattle.edu/schedule/'.$current_quarter.'/item/'.$course['item'])."$item_edit_link</li>";
				$output .= "<li class=\"course-title\">".check_plain($course['coursetitle'])."</li>";
				//$output .= "<li class=\"course-days-times\">".$course['coursedaystimes']."</li>";
				$output .= "</ul></li>";
			}
			$output .="</ul>";
		} else {
			$output .="<p>I'm not the primary instructor for any classes this quarter.</p>";
		}
		$output .="<form id=\"argstash\"><input type=\"hidden\" id=\"class_instructor\" name=\"class_instructor\" value=\"".$account->uid."\"><input type=\"hidden\" id=\"class_prev_yrq\" name=\"class_prev_yrq\" value=\""._get_prev_quarter($current_quarter)."\"><input type=\"hidden\" id=\"class_next_yrq\" name=\"class_next_yrq\" value=\""._get_next_quarter($current_quarter)."\"></form>";
		$output .="</div>\n";
		return $output;
}


function _yrq_nav_output($yrq,$instructor_uid){
  $quarter_details = _get_quarter_details($yrq);
  
  $output = "<div class=\"yrq_nav\"><ul>";
  if ( $prev_quarter = _get_prev_quarter($yrq) ){
    $output .= "<li>".l("< Prev",drupal_get_path_alias($_GET['q']),array('query'=>array('class_yrq'=>$prev_quarter,'class_instructor'=>$instructor_uid),'attributes'=>array('id'=>'inst_class_sched_p_yrq')))."&nbsp;</li>";
  } else {
    $output .= "<li>".l("",drupal_get_path_alias($_GET['q']),array('query'=>array('class_yrq'=>$prev_quarter,'class_instructor'=>$instructor_uid),'attributes'=>array('id'=>'inst_class_sched_p_yrq','style'=>'display:none;')))."&nbsp;</li>";
  }
 
  if ( $next_quarter = _get_next_quarter($yrq) ){
    $output .= "<li>".l("Next >",drupal_get_path_alias($_GET['q']),array('query'=>array('class_yrq'=>$next_quarter,'class_instructor'=>$instructor_uid),'attributes'=>array('id'=>'inst_class_sched_n_yrq')))."&nbsp;</li>";
  } else {
    $output .= "<li>".l("Next >",drupal_get_path_alias($_GET['q']),array('query'=>array('class_yrq'=>$next_quarter,'class_instructor'=>$instructor_uid),'attributes'=>array('id'=>'inst_class_sched_n_yrq','style'=>'display:none;')))."&nbsp;</li>";
  }
  $output .="</ul></div>\n";
  return $output; 
}

function _yrq_ajax_nav_output($yrq){
  
  $output = array('hide_prev'=>true,'hide_next'=>true);
  
  if ( _get_prev_quarter($yrq) ){
    $output['hide_prev'] = false;
  }
  if ( _get_next_quarter($yrq) ){
    $output['hide_next'] = false;
  }
  return $output; 
}



function _spanify($text,$targetlength){
	$output = "<span title=\"$text\">";
	if(strlen($text) > $targetlength){
		$text = substr($text, 0, ($targetlength - 3) )."...";
	}
	$output .= $text;
	$output .="</span>";
	return $output;

}

