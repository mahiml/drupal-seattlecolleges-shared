<?php 
require_once drupal_get_path('module','nscc_instructor_tools').'/schedule_helper_functions.inc';
require_once drupal_get_path('module','nscc_instructor_tools').'/ibc_wrapper.inc';


function nscc_instructor_tools_instructor_class_picker_handler($instructor_id="",$current_quarter = ""){
	//require_once drupal_get_path('module','nscc_instructor_tools').'/nscc_instructor_tools.instructor_schedule.inc';
	$json_array = _picker_yrq_ajax_nav_output($current_quarter);
 	$json_array['instructor_class_picker'] = _get_instructor_class_picker_for_quarter($instructor_id,$current_quarter);
	
	print drupal_to_js($json_array);
}


function _get_instructor_class_picker_page($instructor_name,$current_quarter=''){
	if (!$current_quarter){
		$current_quarter = _get_current_quarter();
	}
	$account = user_load( array('name'=>$instructor_name) );
	if (_is_instructor($account->name)){
		$output = "<div id=\"instructor_picker_quarter_display\">\n";
		$output .= _get_instructor_class_picker_for_quarter($account->uid,$current_quarter);
		$output .="</div>";
		$output .= _picker_yrq_nav_output($current_quarter,$account->uid);
	} else {
		$output = "";
	}
	return $output;
}

function _get_instructor_class_picker_for_quarter($instructor_id,$current_quarter){
		global $user;
		if(!$account){
			$account = user_load( array('uid'=>$instructor_id) );
		}
		$output .= t('<h2>'._yrq_to_quarter($current_quarter).' Classes'."</h2>\n");
		$output .="<div class=\"picker_list\">";
		$courses_array = _get_classes_per_instructor($current_quarter,$account->name);
		//watchdog('instructor_tools',"testing picker: inst: ".$account->name." yrq: ".$current_quarter." <pre>\n".print_r($courses_array,true).'</pre>');
		if(is_array($courses_array)){
			$output .="<ul class=\"classes\">";
			foreach($courses_array as $course){
				if ($user->uid == $instructor_id || $user->uid == 1 || $user->uid == 3 ){
					$item_edit_link = '&nbsp;'.l('Edit','tools/'.$account->name.'/item_details_update/'.$current_quarter."/".$course['item'],array('attributes'=>array('class' => 'edit-button')));
				}
				$output .= "<li class=\"class\"><ul class=\"class_details\">";
				$output .= "<li class=\"course-no\">".l($course['courseno'],'https://northseattle.edu/schedule/'.$current_quarter.'/item/'.$course['item'])." <span class=\"course-title\">".check_plain($course['coursetitle'])."</span> $item_edit_link</li>";
				//$output .= "<li class=\"course-title\">".check_plain($course['coursetitle'])."</li>";
				$output .= "<li class=\"course-days-times\">".$course['coursedaystimes']."</li>";
				$output .= "</ul></li>";
			}
			$output .="</ul>";
		} else {
			$output .="<p>I'm not the primary instructor for any classes this quarter.</p>";
		}
		$output .="<form id=\"picker_argstash\"><input type=\"hidden\" id=\"picker_instructor\" name=\"picker_instructor\" value=\"".$account->uid."\"><input type=\"hidden\" id=\"picker_prev_yrq\" name=\"picker_prev_yrq\" value=\""._get_prev_quarter($current_quarter)."\"><input type=\"hidden\" id=\"picker_next_yrq\" name=\"picker_next_yrq\" value=\""._get_next_quarter($current_quarter)."\"></form>";
		$output .="</div>\n";
		return $output;
}

function _picker_yrq_nav_output($yrq,$instructor_uid){
  $quarter_details = _get_quarter_details($yrq);
  $url_base = preg_replace('/\/class_tools.*$/', '/class_tools',drupal_get_path_alias($_GET['q']));
  watchdog('instructor_tools', drupal_get_path_alias($_GET['q']) );
  $output = "<div class=\"yrq_picker_nav\"><ul>";
  if ( $prev_quarter = _get_prev_quarter($yrq) ){
    $output .= "<li>".l("< Prev",$url_base."/$prev_quarter",array('attributes'=>array('id'=>'inst_class_picker_p_yrq')))."&nbsp;</li>";
  } else {
    $output .= "<li>".l("",$url_base."/$prev_quarter",array('attributes'=>array('id'=>'inst_class_picker_p_yrq','style'=>'display:none;')))."&nbsp;</li>";
  }
 
  if ( $next_quarter = _get_next_quarter($yrq) ){
    $output .= "<li>".l("Next >",$url_base."/$next_quarter",array('attributes'=>array('id'=>'inst_class_picker_n_yrq')))."&nbsp;</li>";
  } else {
    $output .= "<li>".l("Next >",$url_base."/$next_quarter",array('attributes'=>array('id'=>'inst_class_picker_n_yrq','style'=>'display:none;')))."&nbsp;</li>";
  }
  $output .="</ul></div>\n";
  return $output; 
}

function _picker_yrq_ajax_nav_output($yrq){
  
  $output = array('hide_prev'=>true,'hide_next'=>true);
  
  if ( _get_prev_quarter($yrq) ){
    $output['hide_prev'] = false;
  }
  if ( _get_next_quarter($yrq) ){
    $output['hide_next'] = false;
  }
  return $output; 
}

function _instructor_tools_schedule_update($yrq=null,$item=null){
	require_once drupal_get_path('module','nscc_instructor_tools').'/schedule_helper_functions.inc';
	//Access callback Confirms the existence of the given yrq/item	
	//present form
	$output = "\n<!-- Class Tools Form -->\n<div>\n".drupal_get_form('nscc_instructor_tools_enr_trans_form')."\n\n".drupal_get_form('nscc_instructor_tools_item_updateform')."\n</div><!-- End Class Tools Form -->\n";
	//$output ='';
	return $output;
}

function nscc_instructor_tools_enr_trans_form(){
	require_once drupal_get_path('module','nscc_instructor_tools').'/schedule_helper_functions.inc';
	$username = arg(1);
	$target_user = user_load(array('name'=>$username));
	$yrq = arg(3);
	$item = arg(4);
	$other_sections = _get_other_sections($yrq,$item);
	//$roster = _get_class_roster($yrq,$item);
	//watchdog('instructor_tools',"Target User:\n<pre>".print_r($target_user,true)."</pre>");
 
	if($target_user->nscc_profile_sid=='' || $_SESSION['ibc_session']['pin']==''){
		//not logged in, so present login form
		$form['yrq'] = array(
			'#type'=>'value',
			'#value'=>$yrq,
		);
		$form['item']=array(
			'#type'=>'value',
			'#value'=>$item,
		);	
		$form['roster'] = array(
			'#type' => 'fieldset',
			'#title' => t('Roster/Enrollment Actions'),
			'#collapsible'=> true,
			'#collapsed'=> false,
		);
		$form['roster']['enrollment_action'] = array(
			'#type'=>'value',
			'#value'=>'Authenticate'
		);
		if($target_user->nscc_profile_sid==''){
			$form['roster']['authentication_sid'] = array(
				'#type' => 'textfield',
				'#title' => t('SID'),
				'#size' => 10,
				'#maxlength'=>9,
				'#default_value'=>$target_user->nscc_profile_sid,
			);
		} else {
			$form['roster']['authentication_sid'] = array(
				'#type' => 'value',
				'#value'=> $target_user->nscc_profile_sid,
			);
		}
		$form['roster']['authentication_pin'] = array(
			'#type' => 'password',
			'#title' => t('PIN'),
			'#size' => 10,
			'#description'=> 'Your Instructor Briefcase PIN.',
			'#maxlength'=>9,
		);
		$form['roster']['authenticate'] = array(
				'#type' => 'submit',
				'#value' => t('Authenticate'),
		);

	} else {
		//successfully logged in, so present roster and actions.
		$ibc_login_response = ibc_login($target_user->nscc_profile_sid,$_SESSION['ibc_session']['pin'],$yrq);
		
		$ibc_roster_response = ibc_getroster($ibc_login_response['response_fields']['tkt'],$yrq,$item);
		$roster = _augment_ibc_roster($yrq,$item,$ibc_roster_response['response_fields']['students']);
		if($ibc_roster_response['response_fields']['waitlist']){
			$waitlist = _augment_ibc_waitlist($yrq,$item,$ibc_roster_response['response_fields']['waitlist']);
			//watchdog('etr_test','ibc_waitlist: <pre>'.print_r($ibc_roster_response['response_fields']['waitlist'],true).'</pre>');
		}
		//$roster = _get_class_roster($yrq,$item);

		$form['yrq'] = array(
			'#type'=>'value',
			'#value'=>$yrq,
		);
		$form['item']=array(
			'#type'=>'value',
			'#value'=>$item,
		);	
	
		if($roster){
			$form['roster'] = array(
				'#type' => 'fieldset',
				'#title' => t('Roster/Enrollment Actions'),
				'#collapsible'=> true,
				'#collapsed'=> false,
			);
			$form['roster']['enrollment_action'] = array(
				'#type'=>'select',
				'#title'=>'Enrollment Action',
				'#options'=>array(
														''=>'Select an enrollment action',
														'add'=>'Add a student to this section',
														'audit'=>'Set these students to Audit status',
														'credit'=>'Set these students to Credit status',
														'drop'=>'Drop these students from this section',
													),												
			);
			$form['roster']['add_student_begin']=array(
				'#type' => 'markup',
				'#value' => '<div id="add_student">',
			);
			//waitlist iterate here.
			if($ibc_roster_response['response_fields']['waitlist']){
				$form['roster']['waitlist_present'] = array(
					'#type'=>'value',
					'#value'=>true,
				);
				$form['roster']['waitlist_table_header'] = array(
					'#type'=>'markup',
					'#value'=>'<table class="waitlist"><thead><tr class="waitlist-header"><th class="waitlist-select">select</th><th class="waitlist-sid">SID</th><th class="waitlist-fullname">Name</th><th class="waitlist-status">Status</th></tr></thead>',
				);
				//foreach($ibc_roster_response['response_fields']['waitlist'] as $wl_record){
				foreach($waitlist as $wl_record){
					$form['roster']['waitlist_elem_start_'.$wl_record['sid']]=array(
						'#type'=>'markup',
						'#value'=>'<tr class="waitlist-entry"><td class="waitlist-action">',
					);
					$form['roster']['waiter_'.$wl_record['sid']] = array(
						'#type'=>'checkbox',
						'#default_value'=>0,
						
					);
					$form['roster']['waiter_name_'.$wl_record['sid']] = array(
						'#type'=>'value',
						'#value'=>$wl_record['fullname'],
					);
					$form['roster']['waiter_email_'.$wl_record['sid']] = array(
						'#type'=>'value',
						'#value'=>$wl_record['email'],
					);
					$status_string='';
					if($wl_record['pending_actions']){
						foreach($wl_record['pending_actions'] as $action){
							switch($action){
								case 'add':
									$status_string .='<span class="pending-tag add-tag" title="Pending Add to This Section">A</span>';
									break;								
								case 'move':
									$status_string .='<span class="pending-tag move-tag" title="Pending Move to Another Section">M</span>';
									break;
								case 'audit':
									$status_string .='<span class="pending-tag audit-tag" title="Pending Change to Audit Status">Au</span>';
									break;
								case 'credit':
									$status_string .='<span class="pending-tag credit-tag" title="Pending Change to Credit Status">Cr</span>';
									break;
								case 'drop':
									$status_string .='<span class="pending-tag drop-tag" title="Pending Drop">D</span>';
									break;
								case 'waiver_senior':
									$status_string .='<span class="pending-tag senior-waiver-tag" title="Pending Senior Waiver">SW</span>';
									break;
								case 'waiver_emp':
									$status_string .='<span class="pending-tag employee-waiver-tag" title="Pending Employee Waiver">EW</span>';
									break;							
							}
						}
					}
					
					$form['roster']['waitlist_elem_end_'.$wl_record['sid']]=array(
						'#type'=>'markup',
						'#value'=>'</td><td class="waitlist-sid">'.$wl_record['sid'].'</td><td class="waitlist-fullname"><a class="waitlist-mailto" title="Mail to '.$wl_record['email'].'" href="mailto:'.$wl_record['email'].'">'.$wl_record['fullname'].'</a></td><td class="waitlist-status">'.$status_string.'</td></tr>',
					);

				}

				$form['roster']['waitlist_elem_start_new']=array(
					'#type'=>'markup',
					'#value'=>'<tr class="waitlist-entry">',
				);
				$form['roster']['waiter_new'] = array(
					'#type'=>'checkbox',
					'#default_value'=>0,
					'#prefix'=>'<td class="waitlist-action">',
					'#suffix'=>'</td>',
				);
				$form['roster']['waiter_sid_new']=array(
					'#type' => 'textfield',
					'#title' => t('SID'),
					'#size' => 10,
					'#maxlength'=>9,
					'#prefix'=>'<td class="waitlist-entry" colspan="2"><p>Add someone who\'s not on the waitlist:</p><div id="not-waitlist-add">',
				);
				$form['roster']['waiter_name_new']=array(
					'#type' => 'textfield',
					'#title' => t('Name'),
					'#size' => 50,
				);
				$form['roster']['waiter_email_new']=array(
					'#type' => 'textfield',
					'#title' => t('Email'),
					'#size' => 75,
					'#maxlength'=>255,
					'#suffix'=>'</div></td>',
				);

				$form['roster']['waitlist_elem_end_new']=array(
					'#type'=>'markup',
					'#value'=>'</tr>',
				);

				$form['roster']['waitlist_table_footer'] = array(
					'#type'=>'markup',
					'#value'=>'</table>'."\n</div>",
				);
				
			} else {
				$form['roster']['waitlist_present'] = array(
					'#type'=>'value',
					'#value'=>false,
				);
	
				$form['roster']['add_student_sid']=array(
					'#type' => 'textfield',
					'#title' => t('SID'),
					'#size' => 10,
					'#maxlength'=>9,
				);
				$form['roster']['add_student_name']=array(
					'#type' => 'textfield',
					'#title' => t('Name'),
					'#size' => 50,
				);
				$form['roster']['add_student_email']=array(
					'#type' => 'textfield',
					'#title' => t('Email'),
					'#size' => 75,
					'#maxlength'=>255,
				);
				$form['roster']['add_student_end']=array(
					'#type' => 'markup',
					'#value' => '</div>',
				);
			}
			/*
			if($other_sections){
				//watchdog('enr_trans','Other Sections:<pre>'.print_r($other_sections,true).'</pre>');
				$form['roster']['enrollment_action']['#options']['move']='Move these students to another section';
				$form['roster']['move_destination'] = array(
					'#type'=>'select',
					'#title'=>'Move to Section',
					//'#options'=>array_merge(array(''=>'Select a destination section'),$other_sections),
					'#options'=>array(''=>'Select a destination section')+$other_sections,
				);
			}
			*/
			$form['roster']['enrollment_reason'] = array(
				'#type'=>'select',
				'#title'=>'Reason',
				'#options'=>array(
														''=>'Specify a reason for this action',
														'no-show'=>'Non-attendance',
														'split'=>'Class has split.',
														'new_section'=>'New Section Opened',
														'overload'=>'Overload',
														'permission'=>'Permission',
														'prereq'=>'Approved Prereq',
														'other'=>'Other...',
													),												
			);
			$form['roster']['enrollment_reason_other'] = array(
				'#type' => 'textfield',
				'#title' => t('Please Elaborate'),
				'#size' => 75,
			);				
	
	
			$form['roster']['table_header'] = array(
				'#type'=>'markup',
				'#value'=>'<table class="roster"><thead><tr class="roster-header"><th class="roster-select">select</th><th class="roster-sid">SID</th><th class="roster-fullname">Name</th><th class="roster-status">Status</th></tr></thead>',
			);
	
			foreach($roster as $sid=>$record){
				if ($record['gradeid'] != 'W'){
					$form['roster']['roster_elem_start_'.$sid]=array(
						'#type'=>'markup',
						'#value'=>'<tr class="roster-entry"><td class="roster-action">',
					);
					$form['roster']['student_'.$sid] = array(
						'#type'=>'checkbox',
						'#default_value'=>0,
					);
					$form['roster']['student_name_'.$sid] = array(
						'#type'=>'value',
						'#value'=>$record['fullname'],
					);
					$form['roster']['student_email_'.$sid] = array(
						'#type'=>'value',
						'#value'=>$record['email'],
					);
					switch($record['gradeid']){
						case 'N':
							$status_string ='<span class="complete-tag audit-tag" title="Auditing">Au</span>';
						break;
						case '':
						case '*':
						case 'S':
						case 'I':
						case 'Y':				
							//$status_string='<span class="complete-tag credit-tag" title="For Credit">Cr</span>';
							$status_string='';
						break;					
					}
					switch($record['feepaystatusid']){
						case '10':
							$status_string .='<span class="complete-tag senior-waiver-tag" title="Receiving Senior Waiver">SW</span>';
							break;
						case '51':
							$status_string .='<span class="complete-tag employee-waiver-tag" title="Receiving Employee Waiver">EW</span>';
							break;
					}
					if($record['pending_actions']){
						foreach($record['pending_actions'] as $action){
							switch($action){
								case 'move':
									$status_string .='<span class="pending-tag move-tag" title="Pending Move to Another Section">M</span>';
									break;
								case 'audit':
									$status_string .='<span class="pending-tag audit-tag" title="Pending Change to Audit Status">Au</span>';
									break;
								case 'credit':
									$status_string .='<span class="pending-tag credit-tag" title="Pending Change to Credit Status">Cr</span>';
									break;
								case 'drop':
									$status_string .='<span class="pending-tag drop-tag" title="Pending Drop">D</span>';
									break;
								case 'waiver_senior':
									$status_string .='<span class="pending-tag senior-waiver-tag" title="Pending Senior Waiver">SW</span>';
									break;
								case 'waiver_emp':
									$status_string .='<span class="pending-tag employee-waiver-tag" title="Pending Employee Waiver">EW</span>';
									break;							
							}
						}
					}
					//watchdog('enr_trans','<pre>'.print_r($record['pending_actions'],true).'</pre>');
					//$status_string = '<span class="complete-tag" title="Auditing">A</span><span class="complete-tag" title="Receiving Employee Waiver">EW</span><span class="pending-tag" title="Pending Senior Waiver">SW</span><span class="pending-remove-tag" title="Pending Employee Waiver Removal">EW</span>';
					$form['roster']['roster_elem_end_'.$sid]=array(
						'#type'=>'markup',
						'#value'=>'</td><td class="roster-sid">'.$record['sid'].'</td><td class="roster-fullname"><a class="roster-mailto" title="Mail to '.$record['email'].'" href="mailto:'.$record['email'].'">'.$record['fullname'].'</a></td><td class="roster-status">'.$status_string.'</td></tr>',
					);
				}	
			}
			$form['roster']['table_footer'] = array(
				'#type'=>'markup',
				'#value'=>'</table>',
			);
			$form['roster']['enr_trans_existing_markup'] = array(
					'#type' => 'markup',
					'#value' => '<div>Your requests will be processed by the end of the next business day.</div>',
			);
			$form['roster']['enr_trans_existing'] = array(
					'#type' => 'submit',
					'#value' => t('Submit'),
			);
	
		}
	}

	return $form;

}

function nscc_instructor_tools_enr_trans_form_validate($form,&$form_state){
	$username = arg(1);
	$target_user = user_load(array('name'=>$username));
	$target_email = $target_user->nscc_profile_email_address;
	if (! $target_email){
			form_set_error('',t('You need to set an Email Address in your people profile.'));
	}
	//watchdog('enr_trans', 'Validate: <pre>'.print_r($form_state['values'],true).'</pre>');
	switch($form_state['values']['enrollment_action']){
		case 'Authenticate':
			//This is where I'll do an ibc_login, error if unsuccessful
			$ibc_result = ibc_login($form_state['values']['authentication_sid'],$form_state['values']['authentication_pin'],$form_state['values']['yrq']);
			if (! $ibc_result['success']){
				form_set_error('PIN',t('Authentication Problem -- '.$ibc_result['error_msg'] ));
			} else {
				$_SESSION['ibc_session']['pin']=$form_state['values']['authentication_pin'];
			}
			break;
			
		case 'add':
		case 'overload':
			if($form_state['values']['waitlist_present']){
				if($form_state['values']['waiter_new']){
					if(! $form_state['values']['waiter_sid_new']){
						form_set_error('waiter_sid_new',t('We must insist on an SID to add someone'));
					}
					if(! $form_state['values']['waiter_name_new']){
						form_set_error('waiter_name_new',t('We require the student\'s name to verify the SID'));
					}
					if(! $form_state['values']['waiter_email_new']){
						form_set_error('waiter_email_new',t('We require the student\'s email address to have a way to notify the student'));
					}
				} else {
					$select_waitlist_entries = 0;
					foreach($form_state['values'] as $field_name => $value){
						if(preg_match('/waiter_(\d\d\d\d\d\d\d\d\d)/',$field_name,$matches) && $value == 1){
							$selected_waitlist_entries++;
						}	
					}
					if(! $selected_waitlist_entries){
						form_set_error('waiter_new','You must select at least one waitlist member or enter a new student to add.');
					}
				}
			} else {			
				if(! $form_state['values']['add_student_sid']){
						form_set_error('add_student_sid',t('We must insist on an SID to add someone'));
				}
				if(! $form_state['values']['add_student_name']){
					form_set_error('add_student_name',t('We require the student\'s name to verify the SID'));
				}
				if(! $form_state['values']['add_student_email']){
					form_set_error('add_student_email',t('We require the student\'s email address to have a way to notify the student'));
				}
			}			
			if(! $form_state['values']['enrollment_reason'] || $form_state['values']['enrollment_reason']=='other' && !$form_state['values']['enrollment_reason_other']){
								form_set_error('enrollment_reason',t('You must specify a reason, or elaborate on "Other...".'));
			}

		break;
		case 'move':
			//require destination, fall through
			if(! $form_state['values']['move_destination']){
				//watchdog('enr_trans','no md: <pre>'.print_r($form_state['values']['move_destination'],true).'</pre>');
				form_set_error('move_destination',t('We can\'t transfer students without a destination'));
			}
			if(! $form_state['values']['enrollment_reason'] || $form_state['values']['enrollment_reason']=='other' && !$form_state['values']['enrollment_reason_other']){
								form_set_error('enrollment_reason',t('You must specify a reason, or elaborate on "Other...".'));
			}

		case 'audit':
		case 'credit':
		case 'drop':
			//require selected students					
			foreach($form_state['values'] as $field_name => $value){
				if(preg_match('/student_(\d\d\d\d\d\d\d\d\d)/',$field_name,$matches) && $value == 1){
					$target_students[] = $matches[1];
				}
			}
			if(!$target_students){
				form_set_error('',t('You must select at least one student to update.'));
			}
			if($form_state['values']['enrollment_reason']=='other' && !$form_state['values']['enrollment_reason_other']){
								form_set_error('enrollment_reason',t('You must elaborate on "Other...".'));
			}
			//watchdog('enr_trans', 'Target Students: <pre>'.print_r($target_students,true).'</pre>');			
		break;

	}
}

function nscc_instructor_tools_enr_trans_form_submit($form,&$form_state){
	//watchdog('enr_trans', 'Submit: <pre>'.print_r($form_state['values'],true).'</pre>');
	global $user;
	$email_params = array();
	$email_source = 'NSCC-no-reply@northseattle.edu';
	//watchdog('inst_tools',"Logged-in User: <pre>".print_r($user,true)."</pre>");
	$instructor_netid = arg(1);
	$instructor = user_load(array('name'=>$instructor_netid));
	$instructor_email = $instructor->nscc_profile_email_address;

	
	
	$record = new stdClass();
	$record->yrq = $form_state['values']['yrq'];
	$record->item = $form_state['values']['item'];
	$email_params['course'] = _get_course_precis($record->yrq,$record->item);
	if($form_state['values']['enrollment_reason']=='other'){
		$record->reason = $form_state['values']['enrollment_reason_other'];
		$email_params['reason_other'] = $record->reason;
	} else {
		$record->reason = $form_state['values']['enrollment_reason'];		
		$email_params['reason'] = $record->reason;
	}
	$record->request_status = 'pending';	
	$record->requestor = $user->name;
	$record->instructor = $instructor->name;
	$record->action = $form_state['values']['enrollment_action'];
	if ($form_state['values']['move_destination']){
		$record->destination  = $form_state['values']['move_destination'];
	}else{
		$record->destination  = '';
	}

	switch($form_state['values']['enrollment_action']){
		case 'Authenticate':
			//ibc login must have worked -- or validation would have failed
			//post sid to user
			if($instructor->nscc_profile_sid != $form_state['values']['authentication_sid']){
				//remember, to get here the sid and pin had to match, so let's go ahead and update
				$instructor->nscc_profile_sid = $form_state['values']['authentication_sid'];
				user_save($instructor, array('nscc_profile_sid'=>$form_state['values']['authentication_sid']));
			}
			//post pin to session -- handled during validation
		break;
		case 'add':
		case 'overload':
				$email_params['transaction_type'] = 'add';
				if($form_state['values']['waitlist_present']){
					//iterate over the checked waitlist members
					foreach($form_state['values'] as $field_name => $value){
						if(preg_match('/waiter_(\d\d\d\d\d\d\d\d\d)/',$field_name,$matches) && $value == 1){
							$record->sid = $matches[1];
							$record->fullname = $form_state['values']['waiter_name_'.$record->sid];
							$record->email = $form_state['values']['waiter_email_'.$record->sid];
							//watchdog('enr_trans', 'Record: <pre>'.print_r($record,true).'</pre>');
							$record->id = _post_enrollment_transaction($record);
							preg_match('/^(\w+) /',$record->fullname,$names);
							$email_params['student_last'] = $names[1];
							$email_params['student_precis'] = $record->fullname.'('.$record->sid.')';
							$email_params['request_id'] = $record->id;
							$email_params['recipient_role'] = 'student';
							drupal_mail('nscc_instructor_tools','etr_request_initiated',$record->email,language_default(),$email_params,$email_source);
							$email_params['recipient_role'] = 'instructor';
							drupal_mail('nscc_instructor_tools','etr_request_initiated',$instructor_email,language_default(),$email_params,$email_source);
						}
					}
					//add non-waitlist entry:
					if($form_state['values']['waiter_new']){
						$record->sid = $form_state['values']['waiter_sid_new'];
						$record->fullname = $form_state['values']['waiter_name_new'];
						$record->email = $form_state['values']['waiter_email_new'];
						$record->id = _post_enrollment_transaction($record);
						preg_match('/^(\w+) /',$record->fullname,$names);
						$email_params['student_last'] = $names[1];
						$email_params['student_precis'] = $record->fullname.'('.$record->sid.')';
						$email_params['request_id'] = $record->id;
						$email_params['recipient_role'] = 'student';
						drupal_mail('nscc_instructor_tools','etr_request_initiated',$record->email,language_default(),$email_params,$email_source);
						$email_params['recipient_role'] = 'instructor';
						drupal_mail('nscc_instructor_tools','etr_request_initiated',$instructor_email,language_default(),$email_params,$email_source);
					}
				} else {
					$record->sid = $form_state['values']['add_student_sid'];
					$record->fullname = $form_state['values']['add_student_name'];
					$record->email = $form_state['values']['add_student_email'];
					$record->id = _post_enrollment_transaction($record);
					preg_match('/^(\w+) /',$record->fullname,$names);
					$email_params['student_last'] = $names[1];
					$email_params['student_precis'] = $record->fullname.'('.$record->sid.')';
					$email_params['request_id'] = $record->id;
					$email_params['recipient_role'] = 'student';
					drupal_mail('nscc_instructor_tools','etr_request_initiated',$record->email,language_default(),$email_params,$email_source);
					$email_params['recipient_role'] = 'instructor';
					drupal_mail('nscc_instructor_tools','etr_request_initiated',$instructor_email,language_default(),$email_params,$email_source);
				}
				//watchdog('enr_trans', 'Record: <pre>'.print_r($record,true).'</pre>');
		break;
		case 'move':		
		case 'audit':
		case 'credit':
		case 'drop':
		case 'waiver_senior':
		case 'waiver_emp':
			$email_params['transaction_type'] = $form_state['values']['enrollment_action'];
			foreach($form_state['values'] as $field_name => $value){
				if(preg_match('/student_(\d\d\d\d\d\d\d\d\d)/',$field_name,$matches) && $value == 1){
					$record->sid = $matches[1];
					$record->fullname = $form_state['values']['student_name_'.$record->sid];
					$record->email = $form_state['values']['student_email_'.$record->sid];
					//watchdog('enr_trans', 'Record: <pre>'.print_r($record,true).'</pre>');
					$record->id = _post_enrollment_transaction($record);
					preg_match('/^(\w+) /',$record->fullname,$names);
					$email_params['student_last'] = $names[1];
					$email_params['student_precis'] = $record->fullname.'('.$record->sid.')';
					$email_params['request_id'] = $record->id;
					$email_params['recipient_role'] = 'student';
					drupal_mail('nscc_instructor_tools','etr_request_initiated',$record->email,language_default(),$email_params,$email_source);
					$email_params['recipient_role'] = 'instructor';
					drupal_mail('nscc_instructor_tools','etr_request_initiated',$instructor_email,language_default(),$email_params,$email_source);
					watchdog('enr_trans','email_params: <pre>'.print_r($email_params,true).'<pre>');
				}
			}
		break;
	}



}

function nscc_instructor_tools_item_updateform(){
	require_once drupal_get_path('module','nscc_instructor_tools').'/schedule_helper_functions.inc';
	$yrq = arg(3);
	$item = arg(4);
	$course_details = _get_class_details($yrq,$item);
	$current_url_value = $course_details['url'];
	$current_im_value = $course_details['instructor_message'];
	//$other_sections = _get_other_sections($yrq,$item);
	$format = filter_formats(1);
	$filter_dummy_form[$format->format] = array('#type' => 'value', '#value' => $format->format, '#parents' => array('instructor_message_format'));
	$filter_dummy_form['format']['guidelines'] = array('#title' => t('Formatting guidelines'),'#value' => '',);
	//$roster = _get_class_roster($yrq,$item);
	

	$form['sched_details'] = array(
		'#type' => 'fieldset',
		'#title' => t('Schedule Details'),
		'#collapsible'=> true,
		'#collapsed'=> false,
	);
	$form['sched_details']['url'] = array(
		'#type' => 'textfield',
		'#title' => t('Class URL'),
		'#size' => 75,
		'#default_value'=>$current_url_value,
		'#description' => t('<div>A URL for this class. It could be:<ul><li>a web site specific to the class,</li><li>the class Canvas login page,</li><li>or even your faculty page.</li></ul>This url will be given in the online class schedule.(As the WWW tag for this section.)</div>')
	);
	$form['sched_details']['instructor_message'] = array(
		'#type' => 'textarea',
		'#title' => t('Message from the Instructor'),
		'#default_value'=>$current_im_value,
		'#wysiwyg'=> TRUE,
		'#rows'=>'4',
		'#description' => t('<p>A message to your prospective students. It will be in the online schedule as part of the course description.</p>')
	);
	$form['sched_details']['format'] = $filter_dummy_form;
	$form['sched_details']['yrq'] = array(
		'#type' => 'value',
		'#value' => $yrq
	);
	$form['sched_details']['item'] = array(
		'#type' => 'value',
		'#value' => $item
	);
	$form['sched_details']['submit'] = array(
		'#type' => 'submit',
		'#value' => t('Submit')
	);
		
	return $form;
}

function nscc_instructor_tools_item_updateform_validate($form,&$form_state){
	if(!valid_url($form_state['values']['url']) && $form_state['values']['url'] !=''){
		form_set_error('url', t('That is not a valid URL.'));
		return false;
	}
}

function nscc_instructor_tools_item_updateform_submit($form,&$form_state){
	
	$instructor_message = filter_xss($form_state['values']['instructor_message']);
	$check_existing_sql = "select count(*) from schedule.instructor_item_details where eff_yrq='%s' and item='%s';";
	$insert_sql="insert into schedule.instructor_item_details (eff_yrq,item,url,instructor_message) values ('%s','%s','%s','%s')";
	$update_sql="update schedule.instructor_item_details set url='%s',instructor_message='%s' where eff_yrq='%s' and item='%s';";
	watchdog('instructor_tools','yrq:'.$form_state['values']['yrq'].' item:'.$form_state['values']['item'].' url:'.$form_state['values']['url'].' message:'.$instructor_message);

	db_set_active('class_schedule');
	if(db_result(db_query($check_existing_sql,$form_state['values']['yrq'],$form_state['values']['item']))){
		db_query($update_sql,$form_state['values']['url'],$instructor_message,$form_state['values']['yrq'],$form_state['values']['item']);	
	} else {
		db_query($insert_sql,$form_state['values']['yrq'],$form_state['values']['item'],$form_state['values']['url'],$instructor_message);	
	}
	db_set_active('default');
	$class_details = _get_class_details($form_state['values']['yrq'],$form_state['values']['item']);
	//$form_state['redirect'] = 'users/'.rtrim(strtolower($class_details['instructor']));
	drupal_set_message("Updated schedule details for item {$class_details['item']} of ".rtrim(_yrq_to_quarter(strtoupper($form_state['values']['yrq']))).".");
	

}

function _enrollment_transactions_list($page_user){
 _unlock_stale_locks();
	$stats = _get_enrollment_transaction_stats();
	if($stats->pending_requests){
		$output ='<a class="et-process-link" href="enr_trans/process_next">Process the Next Pending Request</a>';
	} else {
		$output ='<span class="et-process-nomore">No More Requests Pending</span>';
	}
	$output .= '<h2>Statistics</h2>';
	$output .= '<h3>Pending Requests</h3>';
	$output .= '<table class="enrollment-transaction-stats-pending">';
	$output .= '<thead><tr><th title="Number of Pending Requests">Pending</th><th title="Age of the Oldest Pending Request">Oldest</th><th title="Age of the Newest Pending Request">Newest</th><th title="Average Age of All Pending Requests">Avg.</th></tr></thead>';
	$output .= '<tbody><tr><td>'.$stats->pending_requests.'</td><td>'.preg_replace('/:00$/','',$stats->pending_oldest).' old</td><td>'.preg_replace('/:00$/','',$stats->pending_youngest).' old</td><td>'.preg_replace('/:00$/','',$stats->pending_average_age).' old</td></tr></tbody>';
	$output .='</table>';


	if($stats->completed_requests){
		$output .= '<h3>Completions</h3>';
		$output .= '<table class="enrollment-transaction-stats-completion">';
		$output .= '<thead><tr><th title="Number of Completed Requests (includes denied requests)">Completions</th><th title="The Age of the Most Recent Completion">Most Recent</th><th title="The average Time it took ARRC staff to complete a request, once opened.">Avg. Process</th><th title="The average time it took to complete requests, from the initial request to completion.">Avg. Rq-to-Completion</th></tr></thead>';
		$output .= '<tbody><tr><td>'.$stats->completed_requests.'</td><td>'.preg_replace('/:00$/','',$stats->completed_last).'</td><td>'.$stats->completed_average_duration.'</td><td>'.preg_replace('/:00$/','',$stats->completed_average_total_duration).'</td></tr></tbody>';
		$output .='</table>';
	}
	if (user_access('access enrollment transaction reports')){
		$output .= '<div class="enrollment-transation-reports-list">';
		$output .= '<h2>Reports</h2>';
		$output .= '<table class="enrollment-transaction-reports">';
		$output .= '<thead><tr><th>Title</th><th>Controls</th></tr></thead>';
		$output .= '<tbody>';
		$output .= '<tr><td class="report-title">Request</td><td class="report-form">'.drupal_get_form('nscc_instructor_tools_enr_trans_report_tid_form').'</td></tr>';
		$output .= '<tr><td class="report-title">Student</td><td class="report-form">'.drupal_get_form('nscc_instructor_tools_enr_trans_report_sid_form').'</td></tr>';
		$output .= '<tr><td class="report-title">Pending</td><td class="report-form">'.drupal_get_form('nscc_instructor_tools_enr_trans_report_pending_form').'</td></tr>';
		$output .= '<tr><td class="report-title">Completed</td><td class="report-form">'.drupal_get_form('nscc_instructor_tools_enr_trans_report_completed_form').'</td></tr>';
		$output .= '<tr><td class="report-title">Denied</td><td class="report-form">'.drupal_get_form('nscc_instructor_tools_enr_trans_report_denied_form').'</td></tr>';
		$output .= '</tbody></table></div>';
	}
	return $output;
	
}

function nscc_instructor_tools_enr_trans_report_tid_form($form_state){
	$form['header'] = array(
		'#type'=>'markup',
		'#value'=>'<div class="one-line-form">',
	);
	$form['tid'] = array(
			'#type' => 'textfield',
			'#title' => t('Request #'),
			'#size' => 4,
			'#maxlength'=>9,
	);
	$form['submit'] = array(
			'#type'=>'submit',
			'#value' => t('Show this particular Transaction.')		
	);
	$form['footer'] = array(
		'#type'=>'markup',
		'#value'=>'</div>',
	);
	return $form;
}

function nscc_instructor_tools_enr_trans_report_sid_form($form_state){
	$form['header'] = array(
		'#type'=>'markup',
		'#value'=>'<div class="one-line-form">',
	);
	$form['sid'] = array(
			'#type' => 'textfield',
			'#title' => t('SID'),
			'#size' => 9,
			'#maxlength'=>9,
	);
	$form['submit'] = array(
			'#type'=>'submit',
			'#value' => t('Get This Student\'s Transactions.')		
	);
	$form['footer'] = array(
		'#type'=>'markup',
		'#value'=>'</div>',
	);
	return $form;
}

function nscc_instructor_tools_enr_trans_report_pending_form($form_state){
	$form['header'] = array(
		'#type'=>'markup',
		'#value'=>'<div class="one-line-form">',
	);
	$form['submit'] = array(
			'#type'=>'submit',
			'#value' => t('Show all Pending Transactions.')		
	);
	$form['footer'] = array(
		'#type'=>'markup',
		'#value'=>'</div>',
	);
	return $form;
}

function nscc_instructor_tools_enr_trans_report_completed_form($form_state){
	$form['header'] = array(
		'#type'=>'markup',
		'#value'=>'<div class="one-line-form">',
	);
	$form['submit'] = array(
			'#type'=>'submit',
			'#value' => t('Show all Completed Transactions.')		
	);
	$form['footer'] = array(
		'#type'=>'markup',
		'#value'=>'</div>',
	);
	return $form;
}

function nscc_instructor_tools_enr_trans_report_denied_form($form_state){
	$form['header'] = array(
		'#type'=>'markup',
		'#value'=>'<div class="one-line-form">',
	);
	$form['submit'] = array(
			'#type'=>'submit',
			'#value' => t('Show all Denied Transactions.')		
	);
	$form['footer'] = array(
		'#type'=>'markup',
		'#value'=>'</div>',
	);
	return $form;
}

function nscc_instructor_tools_enr_trans_report_tid_form_validate($form,&$form_state){
	//tid field should be non-zero integer
	if(! preg_match('/^\d+$/',$form_state['values']['tid'])){
		form_set_error('tid', t('That is not a Request ID.'));
		return false;
	}
}

function nscc_instructor_tools_enr_trans_report_sid_form_validate($form,&$form_state){
	//sid field should be nine digit numerical
	if(! preg_match('/^\d{9}$/',$form_state['values']['sid'])){
		form_set_error('sid', t('That is not valid SID.'));
	}
}

//note that there's nothing to validate about the other reports

function nscc_instructor_tools_enr_trans_report_tid_form_submit($form,&$form_state){
	$host_user = arg(1);
	$form_state['redirect'] = 'tools/'.$host_user.'/enr_trans/report_tid/'.$form_state['values']['tid'];
}

function nscc_instructor_tools_enr_trans_report_sid_form_submit($form,&$form_state){
	$host_user = arg(1);
	$form_state['redirect'] = 'tools/'.$host_user.'/enr_trans/report_sid/'.$form_state['values']['sid'];
}

function nscc_instructor_tools_enr_trans_report_pending_form_submit($form,&$form_state){
	$host_user = arg(1);
	$form_state['redirect'] = 'tools/'.$host_user.'/enr_trans/report_pending';
}

function nscc_instructor_tools_enr_trans_report_completed_form_submit($form,&$form_state){
	$host_user = arg(1);
	$form_state['redirect'] = 'tools/'.$host_user.'/enr_trans/report_completed';
}

function nscc_instructor_tools_enr_trans_report_denied_form_submit($form,&$form_state){
	$host_user = arg(1);
	$form_state['redirect'] = 'tools/'.$host_user.'/enr_trans/report_denied';
}

function _enrollment_transactions_report_tid($tid){
	$transaction = _get_enrollment_transaction_by_id($tid);
	if($transaction->id){
	$output = "<h1>Enrollment Transaction Request #$tid</h1>\n";
	$output .= '<table class="etr-report-single"><thead><tr><th>Field</th><th>Value</th></tr><thead><tbody>'."\n";
	$output .= '<tr><td class="label">Status</td><td class="value">'.$transaction->request_status.'</td></tr>'."\n";
	$output .= '<tr><td class="label">Year/Quarter</td><td class="value">'.$transaction->yrq.'</td></tr>'."\n";
	$output .= '<tr><td class="label">Item</td><td class="value">'.$transaction->item.'</td></tr>'."\n";
	$output .= '<tr><td class="label">SID</td><td class="value">'.$transaction->sid.'</td></tr>'."\n";
	$output .= '<tr><td class="label">Full Name</td><td class="value">'.$transaction->fullname.'</td></tr>'."\n";
	$output .= '<tr><td class="label">Email Address</td><td class="value">'.$transaction->email.'</td></tr>'."\n";
	$output .= '<tr><td class="label">Action Requested</td><td class="value">'.$transaction->action.'</td></tr>'."\n";
	if($transaction->action=='move'){
		$output .= '<tr><td class="label">Move Destination</td><td class="value">'.$transaction->destination.'</td></tr>'."\n";
	}
	$output .= '<tr><td class="label">Reason Given</td><td class="value">'.$transaction->reason.'</td></tr>'."\n";
	$output .= '<tr><td class="label">Requested By</td><td class="value">'.$transaction->requestor.'</td></tr>'."\n";
	$output .= '<tr><td class="label">Requested Date</td><td class="value">'.$transaction->dtg_requested.'</td></tr>'."\n";
	switch($transaction->request_status){
		case 'completed':
			$output .= '<tr><td class="label">Completed Date</td><td class="value">'.$transaction->dtg_completed.'</td></tr>'."\n";
			break;
		case 'denied':
			$output .= '<tr><td class="label">Denied Date</td><td class="value">'.$transaction->dtg_completed.'</td></tr>'."\n";
			$output .= '<tr><td class="label">Denial Reason</td><td class="value">'.$transaction->denial_reason.'</td></tr>'."\n";
			break;
		case 'pending':
			break;	
	}
	$output .= '</tbody></table>'."\n";
	} else {
		$output = "No Such Transaction Exists.\n";
	}
	return $output;
}

function _enrollment_transactions_report_sid($sid){
	$tlist = _get_enrollment_transaction_by_sid($sid);
	if($tlist){
		$output = "<h1>Enrollment Transaction Requests for SID $sid</h1>\n";
		$output .=_output_enrollment_transaction_as_table($tlist);
	} else {
		$output = "I found no requests for $sid.\n";
	}
	return $output;
}


function _output_enrollment_transaction_as_table(&$transaction_list){
	$output .= '<table class="etr-report"><thead><tr><th>ID#</th><th>Class</th><th>Student</th><th>Action</th><th>Request</th><th>Status</th></tr><thead><tbody>'."\n";
	foreach($transaction_list as $transaction){
		$output .='<tr>';
		$output .='<td>'.$transaction->id.'</td>';
		$output .='<td>'.$transaction->yrq.' '.$transaction->item.'</td>';
		$output .='<td>'.$transaction->sid.'<br><a href="mailto:'.$transaction->email.'">'.$transaction->fullname.'</a></td>';
		if($transaction->action=='move'){
			$output .='<td>'.$transaction->action.' to '.$transaction->destination.'</td>';
		} else {
			$output .='<td>'.$transaction->action.'</td>';
		}
		$output .='<td>by '.$transaction->requestor.'<br>on '.$transaction->dtg_requested.'<br>because '.$transaction->reason.'</td>';
		switch($transaction->request_status){
			case 'pending':
				$output .= '<td>Pending...</td>';
				break;
			case 'completed':
				$output .= '<td>Completed<br>by '.$transaction->completor.'<br>on '.$transaction->dtg_completed.'</td>';
				break;
			case 'denied':
				$output .= '<td>Denied<br>by '.$transaction->completor.'<br>on '.$transaction->dtg_completed.'<br>because '.$transaction->denial_reason.'</td>';
				break;
		}
		$output .="</tr>\n";
	}
	$output .= '</tbody></table>'."\n";
	return $output;
}

function _enrollment_transactions_report_pending(){
	$tlist = _get_enrollment_transactions_by_status('pending');
	if($tlist){
		$output = "<h1>Pending Enrollment Transaction Requests</h1>\n";
		$output .=_output_enrollment_transaction_as_table($tlist);
	} else {
		$output = "I found no pending requests.\n";
	}
	return $output;
}

function _enrollment_transactions_report_completed(){
	$tlist = _get_enrollment_transactions_by_status('completed');
	if($tlist){
		$output = "<h1>Completed Enrollment Transaction Requests</h1>\n";
		$output .=_output_enrollment_transaction_as_table($tlist);
	} else {
		$output = "I found no completed requests.\n";
	}
	return $output;
}
function _enrollment_transactions_report_denied(){
	$tlist = _get_enrollment_transactions_by_status('denied');
	if($tlist){
		$output = "<h1>Denied Enrollment Transaction Requests</h1>\n";
		$output .=_output_enrollment_transaction_as_table($tlist);
	} else {
		$output = "I found no denied requests.\n";
	}
	return $output;
}

function _enrollment_transactions_process_next($page_user){
		_unlock_stale_locks();
		$output = drupal_get_form('nscc_instructor_tools_process_enr_trans_form');
		return $output;
}

function nscc_instructor_tools_process_enr_trans_form($form_state){
	_unlock_stale_locks();
	watchdog('instructor_tools','Build form_state:<br><pre>'.print_r($form_state,true).'</pre>');
	require_once drupal_get_path('module','nscc_instructor_tools').'/schedule_helper_functions.inc';
	
	if( $form_state['post']['op'] ){
		$next_transaction = _get_enrollment_transaction_by_id($form_state['post']['transaction_id']);
		//build out the whole form, noone will see it
		$posting = true;
	} else {
		$next_transaction = _get_next_enrollment_transaction();
		//only build out the form if tally >0
		$posting = false;
	}
	$form['transaction_id'] = array(
		'#type' => 'hidden',
		'#value' => $next_transaction->id,
	);
	if($next_transaction->tally || $posting){	
		$form['transaction'] = array(
			'#type' => 'fieldset',
			'#title' => t('Current Transaction (ID# '.$next_transaction->id.')'),
			'#collapsible'=> false,
			'#collapsed'=> false,
		);
		watchdog('instructor_tools','showing form for id '.$next_transaction->id);
		switch($next_transaction->action){
			case 'add':
			case 'overload':
			case 'drop':
					$action_string = ucfirst($next_transaction->action);
			break;	
			case 'audit':
					$action_string = "Set to Audit Status";
			break;
			case 'credit':
					$action_string = "Set to Credit Status";
			break;
			case 'waiver_senior':
					$action_string = "Grant a Senior Waiver";
			break;
			case 'waiver_emp':
					$action_string = "Grant an Employee Waiver";
			break;
			case 'move':		
					$action_string = "Drop";
					$action_string_second = "Add";
			break;

		}
		if($next_transaction->action == 'move'){
			$enr_trans_details = '<table class="enrollment-transaction"><tr><th>YRQ</th><th>Item</th><th>Action</th><th>SID</th><th>Requested by</th></tr>';
			$enr_trans_details .='<tr><td>'.$next_transaction->yrq.'</td><td>'.$next_transaction->item.'</td><td>'.$action_string.'</td><td rowspan="2">'.$next_transaction->sid.'<br><span class="de-emph">'.$next_transaction->fullname.'</span></td></tr>'; 
			$enr_trans_details .='<tr><td>'.$next_transaction->yrq.'</td><td>'.$next_transaction->destination.'</td><td>'.$action_string_second.'<br><span class="de-emph">'.$next_transaction->reason.'</span></td><td>'.$next_transaction->requestor.'</td></tr>'; 
			$enr_trans_details .='</table>'; 
		}else{
			$enr_trans_details = '<table class="enrollment-transaction"><tr><th>YRQ</th><th>Item</th><th>Action</th><th>SID</th><th>Requested by</th></tr>';
			$enr_trans_details .='<tr><td>'.$next_transaction->yrq.'</td><td>'.$next_transaction->item.'</td><td>'.$action_string.'<br><span class="de-emph">'.$next_transaction->reason.'</span></td><td>'.$next_transaction->sid.'<br><span class="de-emph">'.$next_transaction->fullname.'</span></td><td>'.$next_transaction->requestor.'</td></tr>'; 
			$enr_trans_details .='</table>'; 
		}
		$form['transaction']['details'] = array(
			'#type' => 'markup',
			'#value' => $enr_trans_details,
		);

		$form['cancel'] = array(
			'#type'=>'submit',
			'#submit'=>array('nscc_instructor_tools_process_enr_trans_stop_processing'),
			'#value' => t('Stop Processing Transactions')		
		);
		$form['deny'] = array(
			'#type'=>'button',
			'#submit'=> FALSE,
			'#value' => t('Deny This Transaction')		
		);		
		$form['done'] = array(
			'#type'=>'submit',
			'#submit'=>array('nscc_instructor_tools_process_enr_trans_complete'),
			'#value' => t('Complete This Transaction')		
		);
		$form['deny_subform_start'] = array(
			'#type'=>'markup',
			'#value'=>'<div class="enr-trans-subform-deny">'
		);		
		$form['deny_reason'] = array(
			'#type' => 'textfield',
			'#title' => t('Why I deny this request'),
			'#size' => 75,
		);
		$form['deny_cancel'] = array(
			'#type'=>'button',
			'#value' => t('Cancel')		
		);		
		$form['deny_confirm'] = array(
			'#type'=>'submit',
			'#submit'=>array('nscc_instructor_tools_process_enr_trans_deny'),			
			'#value' => t('Deny')		
		);		
		$form['deny_subform_end'] = array(
			'#type'=>'markup',
			'#value'=>'</div>'
		);		

		if($next_transaction->tally == 1){
			$form['count'] = array(
				'#type' => 'markup',
				'#value' => '<div class="pending-count">This is the <em>last</em> pending request.</div>',
			);
		} else {
			$form['count'] = array(
				'#type' => 'markup',
				'#value' => '<div class="pending-count">There are <em>'.$next_transaction->tally.'</em> remaining requests.</div>',
			);
		}
	} else {
		$form['count'] = array(
			'#type' => 'markup',
			'#value' => '<div class="pending-count">There are <em>no more</em> pending requests.</div>',
		);
	}	
	
	return $form;
}

function nscc_instructor_tools_process_enr_trans_form_validate($form,&$form_state){
	watchdog('instructor_tools','Default enr_trans validate for '.$form_state['values']['transaction_id'].', op='.$form_state['values']['op']);
	switch($form_state['values']['op']){
		case 'Stop Processing Transactions':
			break;
		case 'Deny':
			if($form_state['values']['deny_reason']==''){
				form_set_error('deny_reason',t('If you deny a transaction, you must give a reason.'));
			}
			break;
		case 'Complete This Transaction':
			break;
	}
}

function nscc_instructor_tools_process_enr_trans_form_submit($form,&$form_state){
	$email_params = array();
	$email_source = 'NSCC-no-reply@northseattle.edu';
	watchdog('instructor_tools','Default enr_trans submit for '.$form_state['values']['transaction_id']);
	drupal_set_message("Default submit for ".$form_state['values']['transaction_id']);
	$form_state['redirect'] = 'tools/'.arg(1).'/enr_trans';
}

function nscc_instructor_tools_process_enr_trans_stop_processing($form,&$form_state){
	watchdog('instructor_tools','sp form:<br><pre>'.print_r($form,true).'</pre>');
	watchdog('instructor_tools','sp form_state:<br><pre>'.print_r($form_state,true).'</pre>');

	require_once drupal_get_path('module','nscc_instructor_tools').'/schedule_helper_functions.inc';
	_unlock_enrollment_transaction($form_state['values']['transaction_id']);
	watchdog('instructor_tools',"Unlocked Transaction ".$form_state['values']['transaction_id']);
	drupal_set_message("Unlocked Transaction ".$form_state['values']['transaction_id']);
	$form_state['redirect'] = 'tools/'.arg(1).'/enr_trans';
}

function nscc_instructor_tools_process_enr_trans_complete($form,&$form_state){
	global $user;
	$email_params = array();
	$email_source = 'NSCC-no-reply@northseattle.edu';
	$email_params['request_id'] = $form_state['values']['transaction_id'];
  _complete_enrollment_transaction($form_state['values']['transaction_id'],$user->name);
	$transaction_details = _get_enrollment_transaction_by_id($form_state['values']['transaction_id']);
	$email_params['course'] = _get_course_precis($transaction_details->yrq,$transaction_details->item);
	$email_params['student_precis'] = $transaction_details->fullname.'('.$transaction_details->sid.')';
	preg_match('/^(\w+) /',$transaction_details->fullname,$names);
	$email_params['student_last'] = $names[1];
	$email_params['transaction_type'] = $transaction_details->action;
	$email_params['reason'] = $transaction_details->reason;
	$email_params['recipient_role'] = 'student';
	drupal_mail('nscc_instructor_tools','etr_request_completed',$transaction_details->email,language_default(),$email_params,$email_source);
	$email_params['recipient_role'] = 'instructor';
	//get instructor email here.
	drupal_mail('nscc_instructor_tools','etr_request_completed',$transaction_details->email,language_default(),$email_params,$email_source);
	
	watchdog('instructor_tools',"Completed Transaction ".$form_state['values']['transaction_id']);
	drupal_set_message("Completed Transaction ".$form_state['values']['transaction_id']);
}

function nscc_instructor_tools_process_enr_trans_deny($form,&$form_state){
	global $user;
	$email_params = array();
	$email_source = 'NSCC-no-reply@northseattle.edu';
	$email_params['request_id'] = $form_state['values']['transaction_id'];
	_deny_enrollment_transaction($form_state['values']['transaction_id'],$user->name,$form_state['values']['deny_reason']);
	$transaction_details = _get_enrollment_transaction_by_id($form_state['values']['transaction_id']);
	$email_params['course'] = _get_course_precis($transaction_details->yrq,$transaction_details->item);
	$email_params['student_precis'] = $transaction_details->fullname.'('.$transaction_details->sid.')';
	preg_match('/^(\w+) /',$transaction_details->fullname,$names);
	$email_params['student_last'] = $names[1];
	$email_params['transaction_type'] = $transaction_details->action;
	$email_params['reason'] = $transaction_details->reason;
	$email_params['deny_message'] = $transaction_details->denial_reason;
	$email_params['recipient_role'] = 'student';
	drupal_mail('nscc_instructor_tools','etr_request_denied',$transaction_details->email,language_default(),$email_params,$email_source);
	$email_params['recipient_role'] = 'instructor';
	//get instructor email here.
	drupal_mail('nscc_instructor_tools','etr_request_denied',$transaction_details->email,language_default(),$email_params,$email_source);

	watchdog('instructor_tools',"Denied Transaction ".$form_state['values']['transaction_id']);
	drupal_set_message("Denied Transaction ".$form_state['values']['transaction_id']);
}



