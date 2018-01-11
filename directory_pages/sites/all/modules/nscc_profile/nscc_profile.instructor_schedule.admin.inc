<?php 
function nscc_profile_schedule_update($yrq=null,$item=null){
	require_once drupal_get_path('module','nscc_profile').'/schedule_helpers.inc';
	//Access callback Confirms the existence of the given yrq/item	
	//present form
	return drupal_get_form('nscc_profile_item_updateform');
}

function nscc_profile_item_updateform(){
	$yrq = arg(1);
	$item = arg(2);
	$course_details = _get_class_details($yrq,$item);
	$current_url_value = $course_details['url'];
	$current_im_value = $course_details['instructor_message'];

	$format = filter_formats(1);
	$filter_dummy_form[$format->format] = array('#type' => 'value', '#value' => $format->format, '#parents' => array('instructor_message_format'));
	$filter_dummy_form['format']['guidelines'] = array('#title' => t('Formatting guidelines'),'#value' => '',);

	$form['url'] = array(
		'#type' => 'textfield',
		'#title' => t('Class URL'),
		'#size' => 100,
		'#default_value'=>$current_url_value,
		'#description' => t('<p>A URL for this class. It could be:<ul><li>a web site specific to the class,</li><li>the class Canvas login page,</li><li>or even your faculty page.</li></ul>This url will be given in the online class schedule.(As the WWW tag for this section.)</p>')
	);
	$form['instructor_message'] = array(
		'#type' => 'textarea',
		'#title' => t('Message from the Instructor'),
		'#default_value'=>$current_im_value,
		'#wysiwyg'=> TRUE,
		'#rows'=>'4',
		'#description' => t('<p>A message to your prospective students. It will be in the online schedule as part of the course description.</p>')
	);
	$form['format'] = $filter_dummy_form;
	$form['yrq'] = array(
		'#type' => 'value',
		'#value' => $yrq
	);
	$form['item'] = array(
		'#type' => 'value',
		'#value' => $item
	);
	$form['submit'] = array(
		'#type' => 'submit',
		'#value' => t('Submit')
	);
	return $form;
}

function nscc_profile_item_updateform_validate($form,&$form_state){
	if(!valid_url($form_state['values']['url'])){
		form_set_error('url', t('That is not a valid URL.'));
		return false;
	}
}

function nscc_profile_item_updateform_submit($form,&$form_state){
	
	$instructor_message = filter_xss($form_state['values']['instructor_message']);
	$check_existing_sql = "select count(*) from schedule.instructor_item_details where eff_yrq='%s' and item='%s';";
	$insert_sql="insert into schedule.instructor_item_details (eff_yrq,item,url,instructor_message) values ('%s','%s','%s','%s')";
	$update_sql="update schedule.instructor_item_details set url='%s',instructor_message='%s' where eff_yrq='%s' and item='%s';";

	db_set_active('class_schedule');
	if(db_result(db_query($check_existing_sql,$form_state['values']['yrq'],$form_state['values']['item']))){
		db_query($update_sql,$form_state['values']['url'],$instructor_message,$form_state['values']['yrq'],$form_state['values']['item']);	
	} else {
		db_query($insert_sql,$form_state['values']['yrq'],$form_state['values']['item'],$form_state['values']['url'],$instructor_message);	
	}
	db_set_active('default');
	$class_details = _get_class_details($form_state['values']['yrq'],$form_state['values']['item']);
	$form_state['redirect'] = 'users/'.rtrim(strtolower($class_details['instructor']));
	drupal_set_message("Updated instructor's details for item {$class_details['item']} of ".rtrim(_yrq_to_quarter(strtoupper($form_state['values']['yrq']))).".");
	

}