<?php


function _nscc_schedule_manage_page() {
	$mtree_pdata = menu_tree_page_data();
	foreach ($mtree_pdata as $menu_item) {
		if ($menu_item['link']['router_path'] != 'manage') { continue; }
		foreach ($menu_item['below'] as $key => $val) {
			$link = $val['link'];
			if ($link['router_path'] != 'manage/schedule') {continue;}
			foreach($val['below'] as $subkey=>$subval){
				$sublink = $subval['link'];
				if($sublink['type'] == MENU_NORMAL_ITEM){
					$manage_page_content[] = '<div class="app-management-item"><h3>' . l($sublink['title'], $sublink['link_path'], $sublink['options']) . "</h3> -- " . check_plain($sublink['description']) . '</div>';
				}	
			}
		}
	}
	$introductory_text ="<div>I'd like to see this collapse into a shorter layout, with descriptions after the links:</div>\n";

	return '<div class="app-management-index">' .$introductory_text. implode("\n", $manage_page_content) . '</div>';
}



function nscc_schedule_manage_callback(){
	$output = "schedule manage placeholder.";
	return $output;
}

function nscc_schedule_quarter_selector_form(){
	$current_yrq =  _schedule_get_current_yrq();
	$url = ltrim(request_uri(),'/');
	$yrq_options = array();
	
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	$sql = "SELECT DISTINCT yrq FROM schedule.yrq_details WHERE yrq < 'Z999' ORDER BY yrq desc limit 10;";
	//watchdog('yrq_selector',"Current_yrq: $current_yrq, Url: $url");
	$result = db_query($sql);

	while ($quarter = db_fetch_object($result)) {
		//$quarter->title = '('.$quarter->yrq.') '; //.trim(_schedule_yrq_to_quarter($quarter->yrq));
		$yrq_options[$quarter->yrq] =  '('.$quarter->yrq.') '.trim(_schedule_yrq_to_quarter($quarter->yrq));
	}

	db_set_active('default');

	watchdog('yrq_selector','<pre>'.print_r($yrq_options,true).'</pre>');
	
	$form['url']=array(
		'#type' => 'value',
		'#value' => $url,		
	);
	$form['yrq']=array(
		'#type'=>'select',
		'#weight'=>10,
		'#title'=>'Year/Quarter',
		'#description'=>'',
		'#size' => 1,
		'#multiple'=>false,
		'#default_value'=>$current_yrq,
		'#options'=>$yrq_options,		
	);
	$form['submit']=array(
		'#type'=>'submit',
		'#value'=>'Submit',
		'#prefix'=>'',
		'#suffix'=>'',
		'#weight'=>100,
	);
	return $form;
}


function nscc_schedule_quarter_selector_form_validate($form,&$form_state){
 //watchdog('yrq_selector','Validate: source url: '.$form_state['values']['url']);
	return true;
}

function nscc_schedule_quarter_selector_form_submit($form,&$form_state){
 $form_state['redirect'] = $form_state['values']['url'].'/'.$form_state['values']['yrq'];
 //watchdog('yrq_selector','SUBMIT: destination url: '.$form_state['redirect']);
}


function nscc_schedule_quarter_details_form($garbage,$yrq){
	$quarter_details = _schedule_get_quarter_details($yrq);
	$infoblock='<table>';
	$infoblock.='<tr><td>YRQ Code:</td>  <td>'.$quarter_details->yrq.'</td></tr>';
	$infoblock.='<tr><td>Title:</td>     <td>'.$quarter_details->abbr_title.'</td></tr>';
	$infoblock.='<tr><td>First Day:</td> <td>'.date('M j, Y', _schedule_hpdate_to_date($quarter_details->first_day_yrq)).'</td></tr>';
	$infoblock.='<tr><td>10th Day:</td>  <td>'.date('M j, Y', _schedule_hpdate_to_date($quarter_details->ten_day_yrq)).'</td></tr>';
	$infoblock.='<tr><td>Last Day:</td>  <td>'.date('M j, Y', _schedule_hpdate_to_date($quarter_details->last_day_yrq)).'</td></tr>';
	$infoblock.='</table>';
	
	$form['infoblock']=array(
		'#type'=>'markup',
		'#value'=>$infoblock,
		'#weight'=>1,
	);
	$form['yrq']=array(
		'#type' => 'value',
		'#value' => $yrq,		
		'#weight'=>5,
	);
	if($quarter_details->published=='t'){
		$published_value=1;
	} else {
		$published_value=0;
	}	
	$form['published']=array(
		'#title'=>'Published',
		'#type'=>'checkbox',
		'#default_value'=>$published_value,
		'#weight'=>10,
	);
	
	$form['blurb']=array(
		'#title'=>'Blurb',
		'#type'=>'textarea',
		'#description'=>'',
		'#cols'=>40,
		'#rows'=>5,
		'#resizable'=>'false',
		'#default_value'=>$quarter_details->blurb,
		'#weight'=>15,
	);
	$form['format'] = filter_form(4,16);
	$form['format']['#prefix']='<div style="display:none;">';
	$form['format']['#suffix']='</div>';	
	$form['submit']=array(
		'#type'=>'submit',
		'#value'=>'Update',
		'#prefix'=>'',
		'#suffix'=>'',
		'#weight'=>100,
	);
	return $form;
}

function nscc_schedule_quarter_details_form_validate($form,&$form_state){
}
function nscc_schedule_quarter_details_form_submit($form,&$form_state){
	if($form_state['values']['published']){
		$published = 't';
	}else{
		$published='f';
	}
	$sql="INSERT INTO schedule.yrq_supplemental_details (yrq,published,blurb) VALUES ('%s','%s','%s');";
	_checkadd_schedule_edit_db();
	db_set_active('schedule_edit');
	$result=db_query($sql,$form_state['values']['yrq'],$published,$form_state['values']['blurb']);
	db_set_active('default');
	if ($result){
		drupal_set_message('YRQ '.$form_state['values']['yrq'].' updated.');
	}

}

function nscc_schedule_dept_selector_form(){
	$current_yrq =  _schedule_get_current_yrq();
	$url = request_uri();
	$dept_options = array();
	
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	$sql = "SELECT distinct trim(trailing '&' from trim(trailing ' ' from dept_abbr)) as abbr, dept_title as title from schedule.deptlist where schedule.deptlist.yrq >='%s' order by abbr;";
	$result = db_query($sql,$current_yrq);

	while ($dept = db_fetch_object($result)) {
		$dept_options[$dept->abbr] =  '('.$dept->abbr.') '.trim($dept->title);
	}

	db_set_active('default');

	watchdog('dept_selector','<pre>'.print_r($yrq_options,true).'</pre>');
	
	$form['url']=array(
		'#type' => 'value',
		'#value' => $url,		
	);
	$form['dept']=array(
		'#type'=>'select',
		'#weight'=>10,
		'#title'=>'Department',
		'#description'=>'',
		'#size' => 1,
		'#multiple'=>false,
		'#options'=>$dept_options,		
	);
	$form['submit']=array(
		'#type'=>'submit',
		'#value'=>'Submit',
		'#prefix'=>'',
		'#suffix'=>'',
		'#weight'=>100,
	);
	return $form;
}


function nscc_schedule_dept_selector_form_validate($form,&$form_state){
	return true;
}

function nscc_schedule_dept_selector_form_submit($form,&$form_state){
 $form_state['redirect'] = $form_state['values']['url'].'/'.$form_state['values']['dept'];
}


function nscc_schedule_dept_details_form($garbage,$dept_id){
	require_once('nscc_schedule.pages.inc');
	$dept_details = _nscc_schedule_get_dept_details($dept_id);
	
	$form['dept']=array(
		'#type' => 'value',
		'#value' => $dept_details->dept,		
		'#weight'=>5,
	);
	
	$form['title'] = array(
		'#title'=>'Title',
		'#type'=>'textfield',
		'#maxlength'=>50,
		'#size'=>50,
		'#description'=>'Enter the correctly-cased, unabbrieviated name of the department',
		'#default_value'=>$dept_details->title,
	);
	$form['dean'] = array(
		'#title'=>'Dean',
		'#type'=>'textfield',
		'#maxlength'=>20,
		'#size'=>12,
		'#description'=>'Enter the NetID username of the department\'s dean.',
		'#default_value'=>$dept_details->dean,
	);
	$form['blurb']=array(
		'#title'=>'Blurb',
		'#type'=>'textarea',
		'#description'=>'',
		'#cols'=>40,
		'#rows'=>5,
		'#resizable'=>'false',
		'#default_value'=>$dept_details->blurb,
		'#weight'=>15,
	);
	$form['format'] = filter_form(4,16);
	$form['format']['#prefix']='<div style="display:none;">';
	$form['format']['#suffix']='</div>';	
	$form['submit']=array(
		'#type'=>'submit',
		'#value'=>'Update',
		'#prefix'=>'',
		'#suffix'=>'',
		'#weight'=>100,
	);
 //watchdog('input_format','<pre>'.print_r($form,true).'</pre>');
	
	return $form;
}

function nscc_schedule_dept_details_form_validate($form,&$form_state){
}

function nscc_schedule_dept_details_form_submit($form,&$form_state){
	$sql="INSERT INTO schedule.dept_supplemental_details VALUES ('%s','%s','%s','%s');";
	_checkadd_schedule_edit_db();
	db_set_active('schedule_edit');
	$result=db_query($sql,$form_state['values']['dept'],$form_state['values']['title'],$form_state['values']['dean'],$form_state['values']['blurb']);
	db_set_active('default');
	if ($result){
		drupal_set_message('Department '.$form_state['values']['title'].' updated.');
	}

}


function nscc_schedule_course_selector_form(){
	$current_yrq =  _schedule_get_current_yrq();
	$url = request_uri();
	$course_options = array();
	
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	$sql = "select distinct course from class_details where yrq>='%s' order by course asc;";
	$result = db_query($sql,$current_yrq);

	while ($course = db_fetch_object($result)) {
		$course_options[$course->course] =  $course->course;
	}

	db_set_active('default');

	//watchdog('course_selector','<pre>'.print_r($course_options,true).'</pre>');
	
	$form['url']=array(
		'#type' => 'value',
		'#value' => $url,		
	);
	$form['course']=array(
		'#type'=>'select',
		'#weight'=>10,
		'#title'=>'Course',
		'#description'=>'',
		'#size' => 1,
		'#multiple'=>false,
		'#options'=>$course_options,		
	);
	$form['submit']=array(
		'#type'=>'submit',
		'#value'=>'Submit',
		'#prefix'=>'',
		'#suffix'=>'',
		'#weight'=>100,
	);
	return $form;
}


function nscc_schedule_course_selector_form_validate($form,&$form_state){
	return true;
}

function nscc_schedule_course_selector_form_submit($form,&$form_state){
 $form_state['redirect'] = $form_state['values']['url'].'/'.$form_state['values']['course'];
}


function nscc_schedule_course_details_form($garbage,$course_id){
	global $user;
	require_once('nscc_schedule.pages.inc');
	$current_yrq =  _schedule_get_current_yrq();
	$form['#tree']=true;
	$form['course_id']=array(
		'#type' => 'value',
		'#value' => $course_id,		
	);

	if ( user_access('edit course titles') ){
		$form['titles']=array(
			'#title'=>'Course Titles',
			'#type'=>'fieldset',
			//'#collapsible'=>TRUE,
			'#description'=>'Edit the course titles here. For any given quarter, the highest lesser effective yrq\'s title will be shown in the online schedule.',
		);
		
		_checkadd_schedule_db();
		db_set_active('class_schedule');
		$sql = "SELECT * from schedule.class_titles where course_id='%s' and eff_yrq >= (select max(insct.eff_yrq) from schedule.class_titles as insct where insct.course_id='%s' and insct.eff_yrq <= '%s') order by eff_yrq;";
		$result = db_query($sql,$course_id,$course_id,$current_yrq);
		db_set_active('default');
	
		while ($course = db_fetch_object($result)) {
			$form['titles'][$course->eff_yrq] = array(
				'#title'=>'Effective '.$course->eff_yrq.' ('._schedule_yrq_to_quarter($course->eff_yrq).')',
				'#type'=>'fieldset',
				'#collapsible'=>TRUE,
				'#collapsed'=>TRUE,
				'#description'=>'',
			);		
			$form['titles'][$course->eff_yrq]['title']=array(
					'#title'=>'',
					'#type'=>'textfield',
					'#maxlength'=>200,
					'#size'=>60,
					'#description'=>'',
					'#default_value'=>$course->title,
				);
			$form['titles'][$course->eff_yrq]['Update']=array(
				'#type'=>'submit',
				'#value'=>'Update '.$course->eff_yrq,
				'#name'=>'title_'.$course->eff_yrq,
				'#prefix'=>'',
				'#suffix'=>'',
				'#submit'=>array('nscc_schedule_crse_det_submit_update_title'),
			);
		}
	
	
		$form['titles']['new_title']=array(
			'#title'=>'New Title',
			'#type'=>'fieldset',
			'#collapsible'=>TRUE,
			'#collapsed'=>TRUE,
			'#description'=>'',
		);
		$form['titles']['new_title']['eff_yrq']=array(
				'#title'=>'Effective yrq',
				'#type'=>'textfield',
				'#maxlength'=>4,
				'#size'=>4,
				'#description'=>'',
				'#default_value'=>'',
			);
	
		$form['titles']['new_title']['title']=array(
				'#title'=>'Title',
				'#type'=>'textfield',
				'#maxlength'=>200,
				'#size'=>60,
				'#description'=>'',
				'#default_value'=>'',
			);
		$form['titles']['new_title']['Update']=array(
				'#type'=>'submit',
				'#value'=>'Add',
				'#prefix'=>'',
				'#suffix'=>'',
				'#submit'=>array('nscc_schedule_crse_det_submit_add_title'),
			);
	} else {
	 // the user lacks permission to edit course Title
		$form['titles']=array(
			'#title'=>'Course Titles',
			'#type'=>'fieldset',
			//'#collapsible'=>TRUE,
			'#description'=>'You don\'t have permission to edit course titles. I can, however show them to you:',
		);
		_checkadd_schedule_db();
		db_set_active('class_schedule');
		$sql = "SELECT * from schedule.class_titles where course_id='%s' and eff_yrq >= (select max(insct.eff_yrq) from schedule.class_titles as insct where insct.course_id='%s' and insct.eff_yrq <= '%s') order by eff_yrq;";
		$result = db_query($sql,$course_id,$course_id,$current_yrq);
		db_set_active('default');
		$form['titles']['titles_table_header']=array(
			'#type'=>'markup',
			'#value'=> '<table class="course-titles-table"><thead><tr><th class="eff-yrq">Effective Quarter</th><th class="course-title">Title</th></tr><thead><tbody>'
		);
	
		while ($course = db_fetch_object($result)) {
		$form['titles']['titles_table_record_'.$course->eff_yrq]=array(
			'#type'=>'markup',
			'#value'=> '<tr><td class="eff-yrq">'.$course->eff_yrq.'('._schedule_yrq_to_quarter($course->eff_yrq).')</td><td class="course-title">'.$course->title.'</td></tr>'
		);
		
		}
		$form['titles']['titles_table_footer']=array(
			'#type'=>'markup',
			'#value'=> '</tbody></table>'
		);

	}
	
	$form['web_desc']=array(
		'#title'=>'Web Descriptions',
		'#type'=>'fieldset',
		//'#collapsible'=>TRUE,
		'#description'=>'These descriptions will appear in the online class schedule.',
	);
	db_set_active('class_schedule');
	$sql = "SELECT * from schedule.web_descriptions where course_id='%s' and eff_yrq >= (select max(insct.eff_yrq) from schedule.web_descriptions as insct where insct.course_id='%s' and insct.eff_yrq <= '%s') order by eff_yrq;";
	$result = db_query($sql,$course_id,$course_id,$current_yrq);
	db_set_active('default');
	while ($course = db_fetch_object($result)) {
		$form['web_desc'][$course->eff_yrq] = array(
			'#title'=>'Effective '.$course->eff_yrq.' ('._schedule_yrq_to_quarter($course->eff_yrq).')',
			'#type'=>'fieldset',
			'#description'=>'',
			'#collapsible'=>TRUE,
			'#collapsed'=>TRUE,
		);		
		$form['web_desc'][$course->eff_yrq]['web_description']=array(
				'#type'=>'textarea',
				'#description'=>'',
				'#cols'=>40,
				'#rows'=>5,
				'#resizable'=>'false',
				'#default_value'=>$course->web_description,
				'#weight'=>5,
		);
		$form['web_desc'][$course->eff_yrq]['format'] = filter_form(4,6,array('web_desc',$course->eff_yrq,'format'));
  	$form['web_desc'][$course->eff_yrq]['format']['#prefix']='<div style="display:none;">';
	  $form['web_desc'][$course->eff_yrq]['format']['#suffix']='</div>';	

		//$form['web_desc'][$course->eff_yrq]['format'] = filter_form(4,6,array('web_desc',$course->eff_yrq));
		$form['web_desc'][$course->eff_yrq]['Update']=array(
			'#type'=>'submit',
			'#value'=>'Update '.$course->eff_yrq,
			'#name'=>'web_desc_'.$course->eff_yrq,
			'#prefix'=>'',
			'#suffix'=>'',
			'#weight'=>10,
			'#submit'=>array('nscc_schedule_crse_det_submit_update_webdesc'),
		);			
	}
	$form['web_desc']['new_web_description'] = array(
		'#title'=>'New Web Description',
		'#type'=>'fieldset',
		'#description'=>'',
		'#collapsible'=>TRUE,
		'#collapsed'=>TRUE,
	);		
	$form['web_desc']['new_web_description']['eff_yrq']=array(
			'#title'=>'Effective yrq',
			'#type'=>'textfield',
			'#maxlength'=>4,
			'#size'=>4,
			'#description'=>'',
			'#default_value'=>'',
		);
	$form['web_desc']['new_web_description']['web_description']=array(
			'#type'=>'textarea',
			'#description'=>'',
			'#cols'=>40,
			'#rows'=>5,
			'#resizable'=>'false',
			'#default_value'=>'',
			'#weight'=>5,
	);
	$form['web_desc']['new_web_description']['format'] = filter_form(4,6,array('web_desc','new_web_description','format'));
  $form['web_desc']['new_web_description']['format']['#prefix']='<div style="display:none;">';
	$form['web_desc']['new_web_description']['format']['#suffix']='</div>';	
	$form['web_desc']['new_web_description']['Add']=array(
		'#type'=>'submit',
		'#value'=>'Add',
		'#name'=>'new_webdesc',
		'#prefix'=>'',
		'#suffix'=>'',
		'#weight'=>20,
		'#submit'=>array('nscc_schedule_crse_det_submit_add_webdesc'),
	);			


	$form['print_desc']=array(
		'#title'=>'Print Descriptions',
		'#type'=>'fieldset',
		'#description'=>'These descriptions will be exported to the print schedule.',
		//'#collapsible'=>TRUE,
	);
	db_set_active('class_schedule');
	$sql = "SELECT * from schedule.print_descriptions where course_id='%s' and eff_yrq >= (select COALESCE((select max(insct.eff_yrq) from schedule.print_descriptions as insct where insct.course_id='%s' and insct.eff_yrq <= '%s'),(select min(insct.eff_yrq) from schedule.print_descriptions as insct where insct.course_id='%s' and insct.eff_yrq > '%s'))) order by eff_yrq;";
	$result = db_query($sql,$course_id,$course_id,$current_yrq,$course_id,$current_yrq);
	db_set_active('default');
	while ($course = db_fetch_object($result)) {
		$form['print_desc'][$course->eff_yrq] = array(
			'#title'=>'Effective '.$course->eff_yrq.' ('._schedule_yrq_to_quarter($course->eff_yrq).')',
			'#type'=>'fieldset',
			'#description'=>'',
			'#collapsible'=>TRUE,
			'#collapsed'=>TRUE,
		);		
		$form['print_desc'][$course->eff_yrq]['print_description']=array(
				'#type'=>'textarea',
				'#description'=>'',
				'#cols'=>40,
				'#rows'=>2,
				'#resizable'=>'false',
				'#default_value'=>html_entity_decode($course->print_description),
				'#weight'=>5,
		);
		//$form['print_desc'][$course->eff_yrq]['format'] = filter_form(4,6,array('print_desc',$course->eff_yrq));
		$form['print_desc'][$course->eff_yrq]['Update']=array(
			'#type'=>'submit',
			'#value'=>'Update '.$course->eff_yrq,
			'#name'=>'print_desc_'.$course->eff_yrq,
			'#prefix'=>'',
			'#suffix'=>'',
			'#weight'=>20,
			'#submit'=>array('nscc_schedule_crse_det_submit_update_printdesc'),
		);			

	}
	$form['print_desc']['new_print_description'] = array(
		'#title'=>'New Print Description',
		'#type'=>'fieldset',
		'#description'=>'',
		'#collapsible'=>TRUE,
		'#collapsed'=>TRUE,
	);		
	$form['print_desc']['new_print_description']['eff_yrq']=array(
			'#title'=>'Effective yrq',
			'#type'=>'textfield',
			'#maxlength'=>4,
			'#size'=>4,
			'#description'=>'',
			'#default_value'=>'',
		);
	$form['print_desc']['new_print_description']['print_description']=array(
			'#type'=>'textarea',
			'#description'=>'',
			'#cols'=>40,
			'#rows'=>5,
			'#resizable'=>'false',
			'#default_value'=>'',
			'#weight'=>5,
	);
	//$form['print_desc']['new_print_description']['format'] = filter_form(4,6,array('print_desc','new_print_description'));
	$form['print_desc']['new_print_description']['Add']=array(
		'#type'=>'submit',
		'#value'=>'Add',
		'#name'=>'new_printdesc',
		'#prefix'=>'',
		'#suffix'=>'',
		'#weight'=>20,
		'#submit'=>array('nscc_schedule_crse_det_submit_add_printdesc'),
	);			

	$form['items']=array(
		'#title'=>'Item Details',
		'#type'=>'fieldset',
		'#description'=>'Here you can set custom tags and item descriptions for each section.',
		//'#collapsible'=>TRUE,
	);

	$tag_details_array = _nscc_schedule_get_tag_details();
	db_set_active('class_schedule');		
	$sql ="select distinct yrq from class_details where yrq>='%s' and course='%s' order by yrq asc;";
	$item_quarter_result = db_query($sql,$current_yrq,$course_id);
	db_set_active('default');
	while ($item_yrq = db_fetch_object($item_quarter_result)) {
		$form['items'][$item_yrq->yrq]=array(
			'#title'=>$item_yrq->yrq." ("._schedule_yrq_to_quarter($item_yrq->yrq).")",
			'#type'=>'fieldset',
			'#description'=>'',
			'#collapsible'=>TRUE,
			'#collapsed'=>TRUE,
		);

		db_set_active('class_schedule');
		$sql ="select cd.item,cd.tags,cld.description from (class_details as cd left join class_descriptions as cld ON cd.item=cld.item and cd.yrq=cld.eff_yrq) where cd.course='%s' and cd.yrq='%s';";
		$result = db_query($sql,$course_id,$item_yrq->yrq);
		db_set_active('default');
		while ($item = db_fetch_object($result)){
			$form['items'][$item_yrq->yrq][$item->item]=array(
				'#title'=>$item->item,
				'#type'=>'fieldset',
				'#description'=>'',
			);
			//tag multiselect
			$item_tags_array = explode(',',rtrim( ltrim($item->tags,'{'),'}' ) );
			$tag_options = array();
			$tag_defaults = array();
			foreach($tag_details_array as $tag_details){
				//watchdog('schdmng','tag_details: <pre>'.print_r($tag_details,true).'</pre>');
				if(in_array($tag_details->tag_id,$item_tags_array)){
					$tag_defaults[]=$tag_details->tag_id;
				}
				$tag_options[ $tag_details->tag_id ] = $tag_details->tag_abbr ;
				//$tag_options[]=array( $tag_details->tag_id => $tag_details->tag_abbr) ;
			}
			//watchdog('schdmng','tag_options: <pre>'.print_r($tag_options,true).'</pre>');
			$form['items'][$item_yrq->yrq][$item->item]['item_tags']=array(
				'#title'=>'Tags',
				'#type'=>'checkboxes',
				'#weight'=>8,
				'#description'=>'',
				'#size' => 5,
				'#multiple'=>true,
				'#options'=>$tag_options,
				'#default_value'=>$tag_defaults,		
			);

			//item desc			
			$form['items'][$item_yrq->yrq][$item->item]['item_description']=array(
				'#title'=>'Item Description',
				'#type'=>'textarea',
				'#description'=>'',
				'#cols'=>40,
				'#rows'=>2,
				'#resizable'=>'false',
				'#default_value'=>$item->description,
				'#weight'=>10,
			);
			//$form['items'][$item_yrq->yrq][$item->item]['format'] = filter_form(4,11,array('items',$item_yrq->yrq,$item->item));
			$form['items'][$item_yrq->yrq][$item->item]['Update']=array(
				'#type'=>'submit',
				'#value'=>'Update '.$item->item,
				'#name'=>$item_yrq->yrq . $item->item,
				'#prefix'=>'',
				'#suffix'=>'',
				'#weight'=>15,
				'#submit'=>array('nscc_schedule_crse_det_submit_update_item'),
			);			

		}	
	}

	return $form;
}

function nscc_schedule_course_details_form_validate($form,&$form_state){
	return true;
}

function nscc_schedule_crse_det_submit_update_title($form,&$form_state){
	//There's a database rule that converts inserts into updates for this table.
	$insert_sql="INSERT INTO schedule.class_titles (eff_yrq,course_id,title) VALUES ('%s','%s','%s');";
	$eff_yrq = substr($form_state['clicked_button']['#name'],6,4);
	$title = $form_state['values']['titles'][ $eff_yrq ]['title'];
	$course_id = $form_state['values']['course_id'];
	
	_checkadd_schedule_edit_db();
	db_set_active('schedule_edit');
	$result=db_query($insert_sql,$eff_yrq,$course_id,$title);
	db_set_active('default');
	if ($result){
		drupal_set_message('The title, effective YRQ '.$eff_yrq.', has been updated successfully.');
	} else {
		drupal_set_message('The title, effective YRQ '.$eff_yrq.', has NOT been updated successfully.');		
	}
 
	//drupal_set_message('Function: Update Title -- Target YRQ: '.$eff_yrq.' Target Course: '.$course_id.' New title: '.$title);	
 	//drupal_set_message('Update_title <pre>'.print_r($form_state,true).'</pre>');
}


function nscc_schedule_crse_det_submit_add_title($form,&$form_state){
	$insert_sql="INSERT INTO schedule.class_titles (eff_yrq,course_id,title) VALUES ('%s','%s','%s');";
	$eff_yrq = $form_state['values']['titles']['new_title']['eff_yrq'];
	$title = $form_state['values']['titles']['new_title']['title'];
	$course_id = $form_state['values']['course_id'];
	if(! $eff_yrq){
		form_set_error('eff_yrq', 'You must specify an effective YRQ');
	} else {
		_checkadd_schedule_edit_db();
		db_set_active('schedule_edit');
		$result=db_query($insert_sql,$eff_yrq,$course_id,$title);
		db_set_active('default');
		if ($result){
			drupal_set_message('The title, effective YRQ '.$eff_yrq.', has been added successfully.');
		} else {
			drupal_set_message('The title, effective YRQ '.$eff_yrq.', has NOT been added successfully.');		
		}
	 //drupal_set_message('Function: Add Title Target YRQ: '.$form_state['values']['titles']['new_title']['eff_yrq'].' New title: '.$form_state['values']['titles']['new_title']['title']);	
	 //drupal_set_message('Add_title <pre>'.print_r($form_state,true).'</pre>');
 }
}


function nscc_schedule_crse_det_submit_update_webdesc($form,&$form_state){
	//There's a database rule that converts inserts into updates for this table.
	$insert_sql="INSERT INTO schedule.web_descriptions (eff_yrq,course_id,web_description) VALUES ('%s','%s','%s');";
	$eff_yrq = substr($form_state['clicked_button']['#name'],9,4);
	$web_desc= check_markup($form_state['values']['web_desc'][ $eff_yrq ]['web_description'],4,FALSE);
	$course_id = $form_state['values']['course_id'];
	if(! $eff_yrq){
		form_set_error('eff_yrq', 'You must specify an effective YRQ');
	} else {
		_checkadd_schedule_edit_db();
		db_set_active('schedule_edit');
		$result=db_query($insert_sql,$eff_yrq,$course_id,$web_desc);
		db_set_active('default');
		if ($result){
			drupal_set_message('The web description, effective YRQ '.$eff_yrq.', has been updated successfully.');
		} else {
			drupal_set_message('The web description, effective YRQ '.$eff_yrq.', has NOT been updated successfully.');		
		}		
	}	
 //drupal_set_message('Function: Update WebDesc Target YRQ: '.$eff_yrq.' New webdesc: '.$web_desc);	
 //drupal_set_message('Update_webdesc <pre>'.print_r($form_state,true).'</pre>');
}

function nscc_schedule_crse_det_submit_add_webdesc($form,&$form_state){
	//There's a database rule that converts inserts into updates for this table.
	$insert_sql="INSERT INTO schedule.web_descriptions (eff_yrq,course_id,web_description) VALUES ('%s','%s','%s');";
	$eff_yrq = $form_state['values']['web_desc']['new_web_description']['eff_yrq'];
	$web_desc= check_markup($form_state['values']['web_desc']['new_web_description']['web_description'],4,FALSE);
	$course_id = $form_state['values']['course_id'];
	if(! $eff_yrq){
		form_set_error('eff_yrq', 'You must specify an effective YRQ');
	} else {
		_checkadd_schedule_edit_db();
		db_set_active('schedule_edit');
		$result=db_query($insert_sql,$eff_yrq,$course_id,$web_desc);
		db_set_active('default');
		if ($result){
			drupal_set_message('The web description, effective YRQ '.$eff_yrq.', has been added successfully.');
		} else {
			drupal_set_message('The web description, effective YRQ '.$eff_yrq.', has NOT been added successfully.');		
		}		
	}	
 //drupal_set_message('Function: Add Web Desc Target YRQ: '.$form_state['values']['web_desc']['new_web_description']['eff_yrq'].' New Web Desc: '.$form_state['values']['web_desc']['new_web_description']['web_description']);	
 //drupal_set_message('Add_webdesc <pre>'.print_r($form_state,true).'</pre>');
}
function nscc_schedule_crse_det_submit_update_printdesc($form,&$form_state){
	//There's a database rule that converts inserts into updates for this table.
	$insert_sql="INSERT INTO schedule.print_descriptions (eff_yrq,course_id,print_description) VALUES ('%s','%s','%s');";
	$eff_yrq = substr($form_state['clicked_button']['#name'],11,4);
	$print_desc= check_markup($form_state['values']['print_desc'][ $eff_yrq ]['print_description'],4,FALSE);
	$course_id = $form_state['values']['course_id'];
	if(! $eff_yrq){
		form_set_error('eff_yrq', 'You must specify an effective YRQ');
	} else {
		_checkadd_schedule_edit_db();
		db_set_active('schedule_edit');
		$result=db_query($insert_sql,$eff_yrq,$course_id,$print_desc);
		db_set_active('default');
		if ($result){
			drupal_set_message('The print description, effective YRQ '.$eff_yrq.', has been updated successfully.');
		} else {
			drupal_set_message('The print description, effective YRQ '.$eff_yrq.', has NOT been updated successfully.');		
		}		
	}	
 //drupal_set_message('Function: Update PrintDesc Target YRQ: '.$form_state['clicked_button']['#name'].' New printdesc: '.$form_state['values']['print_desc'][ $form_state['clicked_button']['#name'] ]['print_description']);	
 //drupal_set_message('Update_printdesc <pre>'.print_r($form_state,true).'</pre>');
}
function nscc_schedule_crse_det_submit_add_printdesc($form,&$form_state){
	//There's a database rule that converts inserts into updates for this table.
	$insert_sql="INSERT INTO schedule.print_descriptions (eff_yrq,course_id,print_description) VALUES ('%s','%s','%s');";
	$eff_yrq = $form_state['values']['print_desc']['new_print_description']['eff_yrq'];
	$print_desc= check_markup($form_state['values']['print_desc']['new_print_description']['print_description'],4,FALSE);
	$course_id = $form_state['values']['course_id'];
	if(! $eff_yrq){
		form_set_error('eff_yrq', 'You must specify an effective YRQ');
	} else {
		_checkadd_schedule_edit_db();
		db_set_active('schedule_edit');
		$result=db_query($insert_sql,$eff_yrq,$course_id,$print_desc);
		db_set_active('default');
		if ($result){
			drupal_set_message('The print description, effective YRQ '.$eff_yrq.', has been added successfully.');
		} else {
			drupal_set_message('The print description, effective YRQ '.$eff_yrq.', has NOT been added successfully.');		
		}		
	}	
 //drupal_set_message('Function: Add Print Desc Target YRQ: '.$form_state['values']['print_desc']['new_print_description']['eff_yrq'].' New Print Desc: '.$form_state['values']['print_desc']['new_print_description']['print_description']);	
 //drupal_set_message('add_printdesc <pre>'.print_r($form_state,true).'</pre>');
}

function nscc_schedule_crse_det_submit_update_item($form,&$form_state){
  $target_yrq = substr($form_state['clicked_button']['#name'],0,4);
  $target_item = substr($form_state['clicked_button']['#name'],4,4);
  $item_tags_array = array_intersect(array_keys($form_state['values']['items'][$target_yrq][$target_item]['item_tags']),array_values($form_state['values']['items'][$target_yrq][$target_item]['item_tags'])); 	
  $item_tags_array_serialized = '{'.implode(',',$item_tags_array).'}';	
  $item_description = $form_state['values']['items'][$target_yrq][$target_item]['item_description'];
  //There is a function in the database that updates multiple tables at once.
  $sql="SELECT class_tags_array_insert('%s','%s','%s','%s');";
  if(! $target_yrq || !$target_item){
		form_set_error('eff_yrq', 'You must specify a YRQ and item number');
	} else {
		_checkadd_schedule_edit_db();
		db_set_active('schedule_edit');
		$result=db_query($sql,$target_yrq,$target_item,$item_tags_array_serialized,$item_description);
		db_set_active('default');
		if ($result){
			drupal_set_message('The item details for item '.$target_item.', YRQ '.$target_yrq.', have been updated successfully.');
		} else {
			drupal_set_message('The item details for item '.$target_item.', YRQ '.$target_yrq.', have not been updated successfully.');
		}		
  }

 //drupal_set_message('Update Item Target YRQ: '.$target_yrq.' Target Item: '.$target_item.' Tags: '.print_r($item_tags_array,true).' Item Description: '.$item_description); 
 //drupal_set_message('Update_item <pre>'.print_r($form_state,true).'</pre>');
}

function nscc_schedule_course_taglist(){
 require_once('nscc_schedule.pages.inc');
 $course_tags_array=_nscc_schedule_get_course_tag_details();
 $header=array('Tag Name','Tag Abbrieviation','Operations');
 $rows=array();
 foreach($course_tags_array as $course_tag){
 	$rows[] = array( 'data'=>array($course_tag->tag_name,$course_tag->tag_abbr,l('Edit','manage/schedule/course_tags/edit/'.$course_tag->tag_id)));
 }	
 $statement = '<div class="nscc-schedule-manage-help-text">These tags apply to entire courses. Commonly these are things like degree distribution requirements.</div>'."\n";
 $addlink = '<div class="nscc-schedule-manage-add-link">'.l('Add','manage/schedule/course_tags/add').' a new course tag.</div>'."\n";	
 return $statement.theme('table',$header,$rows).$addlink;	
}

function nscc_schedule_item_taglist(){
 require_once('nscc_schedule.pages.inc');
 $item_tags_array=_nscc_schedule_get_tag_details();
 $header=array('Tag Name','Tag Abbrieviation','Operations');
 $rows=array();
 foreach($item_tags_array as $item_tag){
 	$rows[] = array( 'data'=>array($item_tag->tag_name,$item_tag->tag_abbr,l('Edit','manage/schedule/item_tags/edit/'.$item_tag->tag_id)));
 }	
 $statement = '<div class="nscc-schedule-manage-help-text">These tags apply to items or sections. These are only the custom item tags that must be manually assigned. There are other item tags, but they are automatically assigned based on HP3000 data, and defined in code.</div>'."\n";
 $addlink = '<div class="nscc-schedule-manage-add-link">'.l('Add','manage/schedule/item_tags/add').' a new item tag.</div>'."\n";	
 return $statement.theme('table',$header,$rows).$addlink;	
}



function nscc_schedule_define_item_tags_form($garbage,$tag_id){
  require_once('nscc_schedule.pages.inc');
	$item_tags_array=_nscc_schedule_get_tag_details();
	$tag_name=$item_tags_array[$tag_id]->tag_name; 
	$tag_abbr=$item_tags_array[$tag_id]->tag_abbr; 
	$tag_text=$item_tags_array[$tag_id]->tag_text;
	//drupal_set_message('<pre>'.print_r($item_tags_array,true).'</pre>'); 
	$form['tag_id']=array(
		'#type'=>'value',
		'#value'=>$tag_id,
	);
	$form['tag_abbr']=array(
		'#title'=>'Abbrieviation',
		'#type'=>'textfield',
		'#maxlength'=>5,
		'#size'=>6,
		'#description'=>'',
		'#default_value'=>$tag_abbr,
		'#weight'=>5,
		'#required'=>true,
	);
	$form['tag_name']=array(
		'#title'=>'Name',
		'#type'=>'textfield',
		'#maxlength'=>20,
		'#size'=>25,
		'#description'=>'',
		'#default_value'=>$tag_name,
		'#weight'=>10,
		'#required'=>true,
	);
	$form['tag_text']=array(
		'#title'=>'Text',
		'#type'=>'textarea',
		'#description'=>'',
		'#cols'=>40,
		'#rows'=>5,
		'#resizable'=>'false',
		'#default_value'=>$tag_text,
		'#weight'=>15,
		'#required'=>true,
	);
	$form['format'] = filter_form(4,16,array('format'));	
  $form['format']['#prefix']='<div style="display:none;">';
	$form['format']['#suffix']='</div>';	
	$form['Update']=array(
		'#type'=>'submit',
		'#value'=>'Update',
		'#prefix'=>'',
		'#suffix'=>'',
		'#weight'=>20,
	);
	$form['Delete_fieldset'] = array(
		'#type'=>'fieldset',
		'#title'=>'Delete',
		'#description'=>'I really want to delete this tag, and understand that there is <strong>NO</strong> way to undo this action.',
		'#collapsible'=>true,
		'#collapsed'=>true,
		'#weight'=>25,
	);
	$form['Delete_fieldset']['Delete']=array(
		'#type'=>'submit',
		'#value'=>'Delete',
		'#prefix'=>'',
		'#suffix'=>'',
		'#weight'=>30,
		'#submit'=>array('nscc_schedule_define_item_tags_delete_submit'),
	);			

	return $form;
}

function nscc_schedule_define_item_tags_form_validate($form,&$form_state){
 require_once('nscc_schedule.pages.inc');
	$item_tags_array=_nscc_schedule_get_tag_details();
	if (! $item_tags_array[ $form_state['values']['tag_id'] ] ){
		form_set_error('tag_id', 'Invalid Tag_ID: '.$form_state['values']['tag_id']);
		return false;
	}
}

function nscc_schedule_define_item_tags_form_submit($form,&$form_state){
	$tag_abbr = $form_state['values']['tag_abbr'];
	$tag_name = $form_state['values']['tag_name'];
	$tag_text = $form_state['values']['tag_text'];
	$tag_id   = $form_state['values']['tag_id'];
	$sql="UPDATE schedule.tag_details SET tag_abbr='%s', tag_name='%s', tag_text='%s'  where tag_id=%d;";
	_checkadd_schedule_edit_db();
	db_set_active('schedule_edit');
	$result=db_query($sql,$tag_abbr,$tag_name,$tag_text,$tag_id);
	db_set_active('default');
	if ($result){
		drupal_set_message('Tag '.$tag_name.' updated.');
	}
}

function nscc_schedule_define_item_tags_delete_submit($form,&$form_state){
	$tag_id   = $form_state['values']['tag_id'];
	$tag_name = $form_state['values']['tag_name'];
	$sql="DELETE FROM schedule.tag_details WHERE tag_id=%d;";
	_checkadd_schedule_edit_db();
	db_set_active('schedule_edit');
	$result=db_query($sql,$tag_id);
	db_set_active('default');
	if ($result){
		drupal_set_message('Tag '.$tag_name.' deleted.');
		$form_state['redirect']='manage/schedule/item_tags';	
	}
}


function nscc_schedule_add_item_tag_form(){
	//drupal_set_message('<pre>'.print_r($item_tags_array,true).'</pre>'); 
	$form['tag_abbr']=array(
		'#title'=>'Abbrieviation',
		'#type'=>'textfield',
		'#maxlength'=>5,
		'#size'=>6,
		'#description'=>'',
		'#default_value'=>$tag_abbr,
		'#weight'=>5,
		'#required'=>true,
	);
	$form['tag_name']=array(
		'#title'=>'Name',
		'#type'=>'textfield',
		'#maxlength'=>20,
		'#size'=>25,
		'#description'=>'',
		'#default_value'=>$tag_name,
		'#weight'=>10,
		'#required'=>true,
	);
	$form['tag_text']=array(
		'#title'=>'Text',
		'#type'=>'textarea',
		'#description'=>'',
		'#cols'=>40,
		'#rows'=>5,
		'#resizable'=>'false',
		'#default_value'=>$tag_text,
		'#weight'=>15,
		'#required'=>true,
	);
	$form['format'] = filter_form(4,16,array('format'));	
  $form['format']['#prefix']='<div style="display:none;">';
	$form['format']['#suffix']='</div>';	
	$form['Add']=array(
		'#type'=>'submit',
		'#value'=>'Add',
		'#prefix'=>'',
		'#suffix'=>'',
		'#weight'=>20,
	);			
	return $form;
}

function nscc_schedule_add_item_tag_form_submit($form,&$form_state){
	$tag_abbr = $form_state['values']['tag_abbr'];
	$tag_name = $form_state['values']['tag_name'];
	$tag_text = $form_state['values']['tag_text'];
	$sql="INSERT INTO schedule.tag_details (tag_abbr,tag_name,tag_text) VALUES ('%s','%s','%s');";
	_checkadd_schedule_edit_db();
	db_set_active('schedule_edit');
	$result=db_query($sql,$tag_abbr,$tag_name,$tag_text);
	db_set_active('default');
	if ($result){
		drupal_set_message('Tag '.$tag_name.' added.');
		$form_state['redirect']='manage/schedule/item_tags';
	}
}

function nscc_schedule_define_course_tags_form($garbage,$tag_id){
  require_once('nscc_schedule.pages.inc');
	$course_tags_array=_nscc_schedule_get_course_tag_details();
	$tag_name=$course_tags_array[$tag_id]->tag_name; 
	$tag_abbr=$course_tags_array[$tag_id]->tag_abbr; 
	$tag_text=$course_tags_array[$tag_id]->tag_text;
	//drupal_set_message('<pre>'.print_r($item_tags_array,true).'</pre>'); 
	$form['tag_id']=array(
		'#type'=>'value',
		'#value'=>$tag_id,
	);
	$form['tag_abbr']=array(
		'#title'=>'Abbrieviation',
		'#type'=>'textfield',
		'#maxlength'=>5,
		'#size'=>6,
		'#description'=>'',
		'#default_value'=>$tag_abbr,
		'#required'=>true,
		'#weight'=>5,
	);
	$form['tag_name']=array(
		'#title'=>'Name',
		'#type'=>'textfield',
		'#maxlength'=>20,
		'#size'=>25,
		'#description'=>'',
		'#default_value'=>$tag_name,
		'#required'=>true,
		'#weight'=>10,
	);
	$form['tag_text']=array(
		'#title'=>'Text',
		'#type'=>'textarea',
		'#description'=>'',
		'#cols'=>40,
		'#rows'=>5,
		'#resizable'=>'false',
		'#default_value'=>$tag_text,
		'#required'=>true,
		'#weight'=>15,
	);
	$form['format'] = filter_form(4,16,array('format'));	
  $form['format']['#prefix']='<div style="display:none;">';
	$form['format']['#suffix']='</div>';	
	$form['Update']=array(
		'#type'=>'submit',
		'#value'=>'Update',
		'#prefix'=>'',
		'#suffix'=>'',
		'#weight'=>20,
	);			
	$form['Delete_fieldset'] = array(
		'#type'=>'fieldset',
		'#title'=>'Delete',
		'#description'=>'I really want to delete this tag, and understand that there is <strong>NO</strong> way to undo this action.',
		'#collapsible'=>true,
		'#collapsed'=>true,
		'#weight'=>25,
	);
	$form['Delete_fieldset']['Delete']=array(
		'#type'=>'submit',
		'#value'=>'Delete',
		'#prefix'=>'',
		'#suffix'=>'',
		'#weight'=>30,
		'#submit'=>array('nscc_schedule_define_course_tags_delete_submit'),
	);			
	return $form;
}

function nscc_schedule_define_course_tags_form_validate($form,&$form_state){
 require_once('nscc_schedule.pages.inc');
	$course_tags_array=_nscc_schedule_get_course_tag_details();
	if (! $course_tags_array[ $form_state['values']['tag_id'] ] ){
		form_set_error('tag_id', 'Invalid Tag_ID: '.$form_state['values']['tag_id']);
		return false;
	}
}

function nscc_schedule_define_course_tags_form_submit($form,&$form_state){
	$tag_abbr = $form_state['values']['tag_abbr'];
	$tag_name = $form_state['values']['tag_name'];
	$tag_text = $form_state['values']['tag_text'];
	$tag_id   = $form_state['values']['tag_id'];
	$sql="UPDATE schedule.course_tag_details SET tag_abbr='%s', tag_name='%s', tag_text='%s'  where tag_id=%d;";
	_checkadd_schedule_edit_db();
	db_set_active('schedule_edit');
	$result=db_query($sql,$tag_abbr,$tag_name,$tag_text,$tag_id);
	db_set_active('default');
	if ($result){
		drupal_set_message('Tag '.$tag_name.' updated.');
	}
}

function nscc_schedule_define_course_tags_delete_submit($form,&$form_state){
	$tag_id   = $form_state['values']['tag_id'];
	$tag_name = $form_state['values']['tag_name'];
	$sql="DELETE FROM schedule.course_tag_details WHERE tag_id=%d;";
	_checkadd_schedule_edit_db();
	db_set_active('schedule_edit');
	$result=db_query($sql,$tag_id);
	db_set_active('default');
	if ($result){
		drupal_set_message('Tag '.$tag_name.' deleted.');
		$form_state['redirect']='manage/schedule/course_tags';	
	}
}


function nscc_schedule_add_course_tag_form(){
	//drupal_set_message('<pre>'.print_r($item_tags_array,true).'</pre>'); 
	$form['tag_abbr']=array(
		'#title'=>'Abbrieviation',
		'#type'=>'textfield',
		'#maxlength'=>5,
		'#size'=>6,
		'#description'=>'',
		'#default_value'=>$tag_abbr,
		'#required'=>true,
		'#weight'=>5,
	);
	$form['tag_name']=array(
		'#title'=>'Name',
		'#type'=>'textfield',
		'#maxlength'=>20,
		'#size'=>25,
		'#description'=>'',
		'#default_value'=>$tag_name,
		'#weight'=>10,
		'#required'=>true,
	);
	$form['tag_text']=array(
		'#title'=>'Text',
		'#type'=>'textarea',
		'#description'=>'',
		'#cols'=>40,
		'#rows'=>5,
		'#resizable'=>'false',
		'#default_value'=>$tag_text,
		'#required'=>true,
		'#weight'=>15,
	);
	$form['format'] = filter_form(4,16,array('format'));	
  $form['format']['#prefix']='<div style="display:none;">';
	$form['format']['#suffix']='</div>';	
	$form['Add']=array(
		'#type'=>'submit',
		'#value'=>'Add',
		'#prefix'=>'',
		'#suffix'=>'',
		'#weight'=>20,
	);			
	return $form;
}

function nscc_schedule_add_course_tag_form_submit($form,&$form_state){
	$tag_abbr = $form_state['values']['tag_abbr'];
	$tag_name = $form_state['values']['tag_name'];
	$tag_text = $form_state['values']['tag_text'];
	$sql="INSERT INTO schedule.course_tag_details (tag_abbr,tag_name,tag_text) VALUES ('%s','%s','%s');";
	_checkadd_schedule_edit_db();
	db_set_active('schedule_edit');
	$result=db_query($sql,$tag_abbr,$tag_name,$tag_text);
	db_set_active('default');
	if ($result){
		drupal_set_message('Tag '.$tag_name.' added.');
		$form_state['redirect']='manage/schedule/course_tags';
	}
}

function nscc_schedule_quarter_selector_course_tags_form(){
	$current_yrq =  _schedule_get_current_yrq();
	$url = ltrim(request_uri(),'/');
	$yrq_options = array();
	
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	$sql = "SELECT yd.yrq,count(ct.*) as count  FROM yrq_details yd LEFT JOIN schedule.course_tags ct ON (yd.yrq = ct.yrq) GROUP BY yd.yrq ORDER BY yrq DESC;";
	//watchdog('yrq_selector',"Current_yrq: $current_yrq, Url: $url");
	$result = db_query($sql);

	while ($quarter = db_fetch_object($result)) {
		//$quarter->title = '('.$quarter->yrq.') '; //.trim(_schedule_yrq_to_quarter($quarter->yrq));
		if($quarter->count == 0 ){
			$empty_indicator=' *';
			$empty_yrq_options[$quarter->yrq] =  '('.$quarter->yrq.') '.trim(_schedule_yrq_to_quarter($quarter->yrq));
		} else {
			$empty_indicator='';
		}
		$yrq_options[$quarter->yrq] =  '('.$quarter->yrq.') '.trim(_schedule_yrq_to_quarter($quarter->yrq)).$empty_indicator;
	}

	db_set_active('default');

	//watchdog('yrq_selector','<pre>'.print_r($yrq_options,true).'</pre>');
	
	$form['url']=array(
		'#type' => 'value',
		'#value' => $url,		
	);
	$form['yrq']=array(
		'#type'=>'select',
		'#weight'=>10,
		'#title'=>'Year/Quarter',
		'#description'=>'* Starred quarters have no assigned course tags.',
		'#size' => 1,
		'#multiple'=>false,
		'#default_value'=>$current_yrq,
		'#options'=>$yrq_options,		
	);
	$form['submit']=array(
		'#type'=>'submit',
		'#value'=>'Edit this Quarter',
		'#prefix'=>'',
		'#suffix'=>'',
		'#weight'=>20,
	);
	$form['copy_quarter']=array(
		'#type'=>'fieldset',
		'#title'=>'Copy to another Quarter',
		'#description'=>'Select an empty quarter below to fill from the quarter above.',
		'#collapsible'=>true,
		'#collapsed'=>true,
		'#weight'=>30,
	);
	$form['copy_quarter']['copy_target_yrq']=array(
		'#type'=>'select',
		'#weight'=>10,
		'#title'=>'Destination Year/Quarter',
		'#size' => 1,
		'#multiple'=>false,
		'#default_value'=>'',
		'#options'=>$empty_yrq_options,		
	);
	$form['copy_quarter']['copy_submit']=array(
		'#type'=>'submit',
		'#value'=>'Copy',
		'#prefix'=>'',
		'#suffix'=>'',
		'#weight'=>100,
		'#submit'=>array('nscc_schedule_quarter_selector_course_tags_form_copy_submit'),
	);

	return $form;
}


function nscc_schedule_quarter_selector_course_tags_form_validate($form,&$form_state){
  //watchdog('yrq_selector','Validate: source url: '.$form_state['values']['url']);
	return true;
}

function nscc_schedule_quarter_selector_course_tags_form_submit($form,&$form_state){
  $form_state['redirect'] = $form_state['values']['url'].'/'.$form_state['values']['yrq'];
  //watchdog('yrq_selector','SUBMIT: destination url: '.$form_state['redirect']);
}

function nscc_schedule_quarter_selector_course_tags_form_copy_submit($form,&$form_state){
	$src_quarter = $form_state['values']['yrq'];
	$dst_quarter = $form_state['values']['copy_target_yrq'];
	$source_quarter = trim(_schedule_yrq_to_quarter($src_quarter));
	$destination_quarter = trim(_schedule_yrq_to_quarter($dst_quarter));
	//dest,source
	$copy_sql = "INSERT INTO schedule.course_tags (yrq,course_id,tag_id) SELECT '%s',course_id,tag_id FROM schedule.course_tags WHERE yrq='%s';";
	_checkadd_schedule_edit_db();
	db_set_active('schedule_edit');
	$result=db_query($copy_sql,$dst_quarter,$src_quarter);
	if ($result){
		drupal_set_message("Copied $src_quarter($source_quarter) to $dst_quarter($destination_quarter).");
  	$form_state['redirect'] = $form_state['values']['url'].'/'.$form_state['values']['copy_target_yrq'];
	} else {
		form_set_error('url', 'There was an error copying the data: '.db_error());
	}
	db_set_active('default');
}

function nscc_schedule_course_tag_assignment($yrq){
  require_once('nscc_schedule.pages.inc');
  drupal_add_css(drupal_get_path('module', 'nscc_schedule') .'/nscc_schedule.manage.css','module','all',false);
  drupal_add_js(drupal_get_path('module', 'nscc_schedule').'/nscc_schedule.manage.js','module');
	$course_tags_array=_nscc_schedule_get_course_tag_details();
	$course_list_sql = "select * from schedule.total_courselist;";
	$course_tag_assignments_sql = "select * from schedule.course_tags_agg cta where cta.yrq='%s'  order by cta.course_id asc;";
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	$cta_result = db_query($course_tag_assignments_sql,$yrq);
	while ( $course = db_fetch_object($cta_result) ){
		$course_tags_per_course = explode(',', preg_replace('/\{|\}/','',$course->tags) );
		foreach($course_tags_per_course as $tag){
			$assignment_array[$course->course_id][$tag] = '1'; 
		}
	}
	$cl_result = db_query($course_list_sql);
	while ($course = db_fetch_object($cl_result)) {
		$course_id = preg_replace('/&/','sbctcsucks',$course->btrim);
		$course_table .= '<tr class="">';
		$course_table .= '<th class="course-column" id="'.$course_id.'_row">'.$course->btrim.'</th>';
		foreach($course_tags_array as $course_tag){
			$status_class="status-off";
			if( $assignment_array[ $course->btrim ][ $course_tag->tag_id ] == 1 ){
				$status_class="status-on";
			}
			$course_table .= '<td class="tag-column '.$status_class.'" id="'.$course_id.'__'.$course_tag->tag_id.'" title="'.$course->btrim.",".$course_tag->tag_abbr.'" headers="'.$course_id."_row ".$course_tag->tag_id.'_column">'.$course_tag->tag_abbr.'</td>';
		}
		$course_table .= '</tr>';
	}
	db_set_active('default');
	$course_table_header = '<table class="assign-course-tags"><thead><tr><th class="course-column">Course</th>';
	foreach($course_tags_array as $course_tag){
		$course_table_header .= '<th class="tag-column" id="'.$course_tag->tag_id.'_column">'.$course_tag->tag_abbr.'</th>';
	}
	$course_table_header .= '</tr></thead>';
	$course_table_header .= '<tbody>';	
	$course_table_footer = '</tbody></table>';
	
	$instructions_text = '<h2>Effective: '.trim(_schedule_yrq_to_quarter($yrq)).' ('.$yrq.')</h2><div class="assign-course-tag-instructions"><p>Green cells are assigned tags. White cells are unassigned. Click the cell to change state.</p></div>';
	$hidden_form = '<form id="hidden_form" method="post" action=""><input type="hidden" id="yrq" name="yrq" value="'.$yrq.'"></form>';
	$output = $instructions_text.$hidden_form.$course_table_header.$course_table.$course_table_footer;
	return $output;
}

function nscc_schedule_ajax_assign_course_tag(){
	$yrq = $_POST['yrq'];
	$course_id = $_POST['course_id'];
	$tag_id = $_POST['tag_id'];
	$target_status = $_POST['target_status'];
	$target_cell = $_POST['target_cell'];

	$json_array['yrq'] = $yrq;
	$json_array['course_id'] = $course_id;
	$json_array['tag_id'] = $tag_id;
	$json_array['target_status'] = $target_status;
	$json_array['target_cell'] = $target_cell;

	$tag_on_sql  = "INSERT INTO schedule.course_tags (yrq,course_id,tag_id) VALUES ('%s','%s',%d);";
	$tag_off_sql = "DELETE FROM schedule.course_tags where yrq='%s' and course_id='%s' and tag_id=%d;";
	
	if ($target_status == 'status-on'){
		$sql = $tag_on_sql;
	} else {
		$sql = $tag_off_sql;
	}
	$json_array['sql'] = $sql;
	_checkadd_schedule_edit_db();
	db_set_active('schedule_edit');
	$result = db_query($sql,$yrq,$course_id,$tag_id);
	if($result){
		$json_array['success'] = 1;
		$json_array['sql_error'] = db_error();
	}else{
		$json_array['success'] = 0;
		$json_array['sql_error'] = db_error();
	}
	db_set_active('default');
	//sleep(1);
	print drupal_json($json_array);
	exit();
}

function nscc_schedule_el_listing($yrq){
  drupal_add_js(drupal_get_path('module', 'nscc_schedule').'/nscc_schedule.manage.js','module');
  drupal_add_css(drupal_get_path('module', 'nscc_schedule') .'/nscc_schedule.manage.css','module','all',false);
  $page_header = '<h2>Effective '.$yrq.'('.trim(_schedule_yrq_to_quarter($yrq)).')</h2>';
	$el_list_sql = "SELECT cd.yrq,cd.item,cd.course,eid.oncampus_meetings from schedule.class_details cd left join schedule.elearning_item_details eid on (cd.item=eid.item and cd.yrq=eid.eff_yrq) where (cd.dl=true or cd.h_oc=true) and cd.yrq='%s' and cancelled=false order by course;";
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	$el_result = db_query($el_list_sql,$yrq); 	
	db_set_active('default');
	$el_header=array('Item','Course','On Campus Meetings Statement');
	while($el_details = db_fetch_object($el_result)){
		if(! $el_details->oncampus_meetings){
			$el_details->oncampus_meetings ='Add Meeting Statement';
		}
		$el_rows[] = array(
			'data'=>array(
				'<div class="item-cell">'.$el_details->item.'</div>',
				'<div class="course-cell">'.$el_details->course.'</div>',
				'<div class="ocm-cell editable" id="ocm-edit_'.$yrq.'_'.$el_details->item.'">'.$el_details->oncampus_meetings.'</div>'
			)
		);
	}
	$el_listing .= theme('table',$el_header,$el_rows,array('class'=>'el-details-table'));
	$el_listing = '<div class="el-listing">'.$el_listing."</div>\n";	
	$output = $page_header.$el_listing;
	return $output;

}

function nscc_schedule_el_details_update($yrq){
	$item = $_POST['item'];
	$ocm = $_POST['ocm'];	
	
	$el_update_sql = "insert into schedule.elearning_item_details values ('%s','%s','%s');";
	_checkadd_schedule_edit_db();
	db_set_active('schedule_edit');
	$result = db_query($el_update_sql,$yrq,$item,$ocm); 
	db_set_active('default');

	if($result){
		$json_array['success'] = 1;	
		$json_array['log_entry'] = 'Successfully Updated item '.$item.'.'; 
	}else{
		$json_array['success'] = 0;	
		$json_array['log_entry'] = 'Problem Updating item '.$item.': '.db_error(); 
	}
	print drupal_json($json_array);
	exit();
	
}

function nscc_schedule_is_listing($yrq){
  drupal_add_js(drupal_get_path('module', 'nscc_schedule').'/nscc_schedule.manage.js','module');
	$page_header = '<h2>Effective '.$yrq.'('.trim(_schedule_yrq_to_quarter($yrq)).')</h2>';
	$cs_listing  = '<h3>Coordinated Studies</h3>'; 
	$cs_list_sql = "select * from schedule.clusterlist where yrq='%s' order by class_cluster asc;";
	$unused_clusters_sql="select DISTINCT class_cluster from schedule.undescribed_clusterlist where yrq='%s' order by class_cluster asc;";
	
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	$cs_result = db_query($cs_list_sql,$yrq); 
	$unused_clusters_result = db_query($unused_clusters_sql,$yrq);
	db_set_active('default');
  $cs_header=array('Cluster ID','Section','Title','Edit');
	while($cluster = db_fetch_object($cs_result)){
		$cs_rows[] = array(
			'data'=>array(
				'&nbsp;&nbsp;&nbsp;'.$cluster->class_cluster,
				'&nbsp;&nbsp;'.$cluster->cluster_section,
				'&nbsp;&nbsp;'.$cluster->cluster_title,
				l('Edit','manage/schedule/is_details/'.$yrq.'/cs/'.trim($cluster->class_cluster)),
			)
		);
	}
	$unused_cluster_options='<option value="0">Choose...</option>';
	while($unused_cluster = db_fetch_object($unused_clusters_result)){
		$unused_cluster_options.='<option>'.$unused_cluster->class_cluster.'</option>';
	}
	
	$cs_rows[]=array(
		'data'=>array(
			'<select name="unused_clusters" id="unused-clusters">'.$unused_cluster_options.'</select>',
			'<input type="text" name="new_section" id="new-section" size="3" maxlength="4">',
			'<input type="text" name="new_title" id="new-title" size="50">',
			'<button name="add_cs_button" id="add-cs-button">Add</button>',
		)
	);
	//$cs_addlink =l('Add a New CS Course','manage/schedule/is_details/'.$yrq.'/cs/add',array('attributes'=>array('id'=>'add-new-cs-course')));
	$cs_listing .= theme('table',$cs_header,$cs_rows);
	$cs_listing = '<div class="cs-listing">'.$cs_listing."</div>\n";

	$lc_listing  = '<h3>Linked Classes</h3>'; 
	$lc_list_sql = "select * from schedule.is_link_details where eff_yrq='%s' order by link_id asc;";
	db_set_active('class_schedule');
	$lc_result = db_query($lc_list_sql,$yrq); 
	db_set_active('default');
	$lc_header=array('Link ID','Title','Edit');
	while($link = db_fetch_object($lc_result)){
		$lc_rows[]=array(
			'data'=>array(
				'&nbsp;&nbsp;'.$link->link_id,
				'&nbsp;&nbsp;'.$link->title,
				l('Edit','manage/schedule/is_details/'.$yrq.'/lc/'.trim($link->link_id)),
			)
		);
	}
	$lc_rows[]=array(
		'data'=>array(
			'<input type="text" name="new_link" id="new-link" size="3" maxlength="3">',
			'<input type="text" name="new_link_title" id="new-link-title" size="50">',
			'<button name="add_lc_button" id="add-lc-button">Add</button>',			
		)
	);
	//$lc_addlink =l('Add a New Linked Course','manage/schedule/is_details/'.$yrq.'/lc/add');
	$lc_listing .= theme('table',$lc_header,$lc_rows);
	$lc_listing = '<div class="lc-listing">'.$lc_listing."</div>\n";
	
	$output = $page_header.$cs_listing.$lc_listing;
	return $output;
};

function nscc_schedule_is_cs_add($yrq){
	$cluster_id = $_POST['unused_clusters'];
	$cluster_section = $_POST['new_section'];	
	$cluster_title = $_POST['new_title'];

	$sql="INSERT INTO schedule.is_cluster_details (eff_yrq,class_cluster,cluster_section,title,description,registration_reqs) VALUES ('%s','%s','%s','%s','','');";

	_checkadd_schedule_edit_db();
	db_set_active('schedule_edit');
	$result = db_query($sql,$yrq,$cluster_id,$cluster_section,$cluster_title); 
	db_set_active('default');

	if($result){
		$json_array['success'] = 1;	
		$json_array['redirect_to'] = '/cs/'.$cluster_id;
		$json_array['log_entry'] = 'Successfully added a new CS course.'; 
	}else{
		$json_array['success'] = 0;	
		$json_array['log_entry'] = 'Problem adding a CS course: '.db_error(); 
	}
	print drupal_json($json_array);
	exit();
		
}

function nscc_schedule_is_cs_delete_course($yrq,$cluster){
	$sql="DELETE FROM schedule.is_cluster_details WHERE eff_yrq='%s' AND class_cluster='%s';";
	_checkadd_schedule_edit_db();
	db_set_active('schedule_edit');
	$result = db_query($sql,$yrq,$cluster); 
	db_set_active('default');
	
	
	if($result){
		$json_array['success'] = 1;	
		$json_array['url_trim'] = '/cs/'.$cluster;
		$json_array['log_entry'] = 'Successfully deleted a new CS course.'; 
	}else{
		$json_array['success'] = 0;	
		$json_array['log_entry'] = 'Problem deleting a CS course: '.db_error(); 
	}
	print drupal_json($json_array);
	exit();

}


function nscc_schedule_is_cs_edit($yrq,$cluster){
  require_once('nscc_schedule.pages.inc');
  drupal_add_css(drupal_get_path('module', 'nscc_schedule') .'/nscc_schedule.manage.css','module','all',false);
  drupal_add_js(drupal_get_path('module', 'nscc_schedule').'/nscc_schedule.manage.js','module');
	drupal_add_js(drupal_get_path('module', 'nscc_schedule') .'/nscc_schedule.js');
	drupal_add_js(drupal_get_path('module', 'nscc_schedule') .'/tinymce/jscripts/tiny_mce/jquery.tinymce.js');
	$tag_details = _nscc_schedule_get_tag_details();
	$course_tag_details = _nscc_schedule_get_course_tag_details();
	$fees = _nscc_schedule_get_fee_tag_details($yrq);
  $output .="<div class=\"ajax-status\" id=\"ajax-status\"></div>";
	$output .="<div class=\"schedule-cs-listing\" id=\"cs-courses\"><ul>\n";		
	$course_details = _nscc_schedule_get_cluster_details($yrq,$cluster);
	if(!$course_details->title){$course_details->title = 'Course Title Here';}
	if(!$course_details->description){$course_details->description = 'Course Description Here';}
	if(!$course_details->registration_reqs){$course_details->registration_reqs = 'Registration Requirements Here';}	
	$output .= "<li class=\"schedule-cs-course\" id=\"cs_course_".$course_details->class_cluster."\">\n";
	$output .= "<h4 class=\"schedule-cs-course-title\"><span id=\"cluster-section\" class=\"editable\">".$course_details->cluster_section."</span>. <span id=\"cluster-title\" class=\"editable\">".check_plain($course_details->title)."</span></h4>\n";
	$output .= "<div id=\"cluster-description\" class=\"schedule-cs-course-desc editable\">".$course_details->description."</div>\n";
	$output .= "<div class=\"schedule-cs-course-reqs\"><h5>Enrollment Requirements</h5><div id=\"registration-regs\"class=\"editable\">".$course_details->registration_reqs."</div>\n";
	$output .= "<div class=\"schedule-cs-course-items\">\n<ul>\n";
	$items = _nscc_schedule_get_cluster_items($yrq,$cluster);
	if($items){
		foreach($items as $item){
			$output .= _nscc_schedule_item_out($item,$tag_details,$course_tag_details,$fees,'cs');
		}
	}
	$output .= "</ul>\n</div></div>";
	$output .= "</li>\n";
	$output .="</ul>\n";
	$output .='<button id="delete-cs-course" name="delete_cs_course">Delete This Entire Course</button>'; 
	$output .="</div>\n";
	
	return '<div class="schedule-data">'.$output.'</div>';
}

function nscc_schedule_is_lc_add($yrq){
	$link_id = $_POST['new_link'];	
	$link_title = $_POST['new_title'];
	//watchdog('add_lc','Got to add lc function');
	$sql="INSERT INTO schedule.is_link_details (eff_yrq,link_id,title) VALUES ('%s','%s','%s');";

	_checkadd_schedule_edit_db();
	db_set_active('schedule_edit');
	$result = db_query($sql,$yrq,$link_id,$link_title); 
	db_set_active('default');

	if($result){
		$json_array['success'] = 1;	
		$json_array['redirect_to'] = '/lc/'.$link_id;
		$json_array['log_entry'] = 'Successfully added a new Linked course.'; 
	}else{
		$json_array['success'] = 0;	
		$json_array['log_entry'] = 'Problem adding a Linked course: '.db_error(); 
	}
	//watchdog('add_lc','<pre>'.print_r($json_array,true).'</pre>');
	print drupal_json($json_array);
	exit();
}

function nscc_schedule_is_lc_delete_course($yrq,$link_id){
	$sql="DELETE FROM schedule.is_link_details WHERE eff_yrq='%s' AND link_id='%s';";
	_checkadd_schedule_edit_db();
	db_set_active('schedule_edit');
	$result = db_query($sql,$yrq,$link_id); 
	db_set_active('default');
	if($result){
		$json_array['success'] = 1;	
		$json_array['log_entry'] = 'Successfully deleted a Linked course.'; 
	}else{
		$json_array['success'] = 0;	
		$json_array['log_entry'] = 'Problem deleting a Linked course: '.db_error(); 
	}
	print drupal_json($json_array);
	exit();

}


function nscc_schedule_is_lc_edit($yrq,$link){
  require_once('nscc_schedule.pages.inc');
  drupal_add_css(drupal_get_path('module', 'nscc_schedule') .'/nscc_schedule.manage.css','module','all',false);
  drupal_add_js(drupal_get_path('module', 'nscc_schedule').'/nscc_schedule.manage.js','module');
	drupal_add_js(drupal_get_path('module', 'nscc_schedule') .'/nscc_schedule.js');
	drupal_add_js(drupal_get_path('module', 'nscc_schedule') .'/tinymce/jscripts/tiny_mce/jquery.tinymce.js');
	$tag_details = _nscc_schedule_get_tag_details();
	$course_tag_details = _nscc_schedule_get_course_tag_details();
	$fees = _nscc_schedule_get_fee_tag_details($yrq);
  $output .="<div class=\"ajax-status\" id=\"ajax-status\"></div>";
	$output .="<div class=\"schedule-link-listing\" id=\"lc-courses\"><ul>\n";
	$course_details = _nscc_schedule_get_link_details($yrq,$link);
	$output .= "<li class=\"schedule-lc-course\" id=\"lc_course_".rtrim($course_details->link_id)."\">\n";
	$output .= "<h4 id=\"link-title\" class=\"schedule-lc-course-title editable\">".check_plain($course_details->title)."</h4>\n";
	$output .= "<div id=\"link-description\" class=\"schedule-lc-course-desc editable\">".$course_details->description."</div>\n";
	$output .= "<div class=\"schedule-lc-course-reqs\"><h5>Enrollment Requirements</h5><div id=\"link-reg-reqs\" class=\"editable\">".$course_details->registration_reqs."</div>\n";
	$output .= "<div class=\"schedule-lc-course-items\" id=\"schedule-lc-course-items\">\n<ul class=\"deleteable\">\n";
	$items = _nscc_schedule_get_link_items($yrq,$link);
	if($items){
		foreach($items as $item){
			$output .= _nscc_schedule_item_out($item,$tag_details,$course_tag_details,$fees,'lc');
		}
	}
	$output .= "</ul>\n";
	$output .= "<div id=\"add-item-form-container\"><form id=\"add-item-form\" method=\"post\" action=\"\"><input type=\"hidden\" name=\"add-item-yrq\" id=\"add-item-yrq\" value=\"$yrq\"><input type=\"text\" size=\"4\" maxlength=\"4\" class=\"add-item-textbox\" id=\"add-item-textbox\" name=\"add-item-textbox\"><input type=\"button\" class=\"add-item-button\" id=\"add-item-button\" name=\"add-item-button\" value=\"Add Item to Link\"></form></div>";
	$output .="</div></div>";
	$output .= "</li>\n";
	$output .="</ul>\n";
	$output .='<button id="delete-lc-course" name="delete_lc_course">Delete This Entire Course</button>'; 
	$output .="</div>\n";

	return '<div class="schedule-data">'.$output.'</div>';
}

function nscc_schedule_is_cs_update_section($yrq,$cluster){
	$cluster_section = $_POST['section'];
	//do db stuff
	$sql = "UPDATE schedule.is_cluster_details set cluster_section='%s' WHERE eff_yrq='%s' AND class_cluster='%s';";
	_checkadd_schedule_edit_db();
	db_set_active('schedule_edit');
	$result = db_query($sql,$cluster_section,$yrq,$cluster); 
	db_set_active('default');
	if($result){
		$json_array['success'] = 1;	
		$json_array['new_section'] = $cluster_section;
		$json_array['log_entry'] = 'Successfully updated the Section Code.'; 
	}else{
		$json_array['success'] = 0;	
		$json_array['new_section'] = $cluster_section;
		$json_array['log_entry'] = 'Problem Updating the Section Code: '.db_error(); 
	}
	print drupal_json($json_array);
	exit();
}

function nscc_schedule_is_cs_update_title($yrq,$cluster){
	$cluster_title = $_POST['title'];
	//do db stuff
	$sql = "UPDATE schedule.is_cluster_details set title='%s' WHERE eff_yrq='%s' AND class_cluster='%s';";
	_checkadd_schedule_edit_db();
	db_set_active('schedule_edit');
	$result = db_query($sql,$cluster_title,$yrq,$cluster); 
	db_set_active('default');
	if($result){
	$json_array['success'] = 1;	
	$json_array['new_title'] = $cluster_title; 
	$json_array['log_entry'] = 'Successfully updated the Course Title'; 
	}else{
		$json_array['success'] = 0;	
		$json_array['new_section'] = $cluster_section;
		$json_array['log_entry'] = 'Problem Updating the Course Title: '.db_error(); 
	}
	print drupal_json($json_array);
	exit();
}
function nscc_schedule_is_cs_update_desc($yrq,$cluster){
	$cluster_desc = $_POST['description'];
	//do db stuff
	$sql = "UPDATE schedule.is_cluster_details set description='%s' WHERE eff_yrq='%s' AND class_cluster='%s';";
	_checkadd_schedule_edit_db();
	db_set_active('schedule_edit');
	$result = db_query($sql,$cluster_desc,$yrq,$cluster); 
	db_set_active('default');
	if($result){
		$json_array['success'] = 1;	
		$json_array['new_description'] = $cluster_desc; 
		$json_array['log_entry'] = 'Successfully updated the Course Description'; 
	}else{
		$json_array['success'] = 0;	
		$json_array['new_section'] = $cluster_desc;
		$json_array['log_entry'] = 'Problem Updating the Course Description: '.db_error(); 
	}

	print drupal_json($json_array);
	exit();
}
function nscc_schedule_is_cs_update_rr($yrq,$cluster){
	$cluster_rr = $_POST['reg_regs'];
	//do db stuff
	$sql = "UPDATE schedule.is_cluster_details set registration_reqs='%s' WHERE eff_yrq='%s' AND class_cluster='%s';";
	_checkadd_schedule_edit_db();
	db_set_active('schedule_edit');
	$result = db_query($sql,$cluster_rr,$yrq,$cluster); 
	db_set_active('default');
	if($result){
		$json_array['success'] = 1;	
		$json_array['new_reg_regs'] = $cluster_rr; 
		$json_array['log_entry'] = 'Successfully updated the Enrollment Requirements'; 
	}else{
		$json_array['success'] = 0;	
		$json_array['new_section'] = $cluster_rr;
		$json_array['log_entry'] = 'Problem Updating the Enrollment Requirements: '.db_error(); 
	}
	print drupal_json($json_array);
	exit();
}

function nscc_schedule_is_lc_update_title($yrq,$link){
	$link_title = $_POST['title'];
	//do db stuff
	$sql = "UPDATE schedule.is_link_details set title='%s' WHERE eff_yrq='%s' AND link_id='%s';";
	_checkadd_schedule_edit_db();
	db_set_active('schedule_edit');
	$result = db_query($sql,$link_title,$yrq,$link);
	db_set_active('default');
	if($result){
		$json_array['success'] = 1;	
		$json_array['new_title'] = $link_title; 
		$json_array['log_entry'] = 'Successfully updated the Link Title'; 
	}else{
		$json_array['success'] = 0;	
		$json_array['new_title'] = $link_title; 
		$json_array['log_entry'] = 'Problem Updating the Link Title: '.db_error(); 
	}
	print drupal_json($json_array);
	exit();
}
function nscc_schedule_is_lc_update_desc($yrq,$link){
	$link_desc = $_POST['description'];
	//do db stuff
	$sql = "UPDATE schedule.is_link_details set description='%s' WHERE eff_yrq='%s' AND link_id='%s';";
	_checkadd_schedule_edit_db();
	db_set_active('schedule_edit');
	$result = db_query($sql,$link_desc,$yrq,$link); 
	db_set_active('default');
	if($result){
		$json_array['success'] = 1;	
		$json_array['new_description'] = $link_desc; 
		$json_array['log_entry'] = 'Successfully updated the Link Description'; 
	}else{
		$json_array['success'] = 0;	
		$json_array['new_title'] = $link_desc; 
		$json_array['log_entry'] = 'Problem Updating the Link Description: '.db_error(); 
	}
	print drupal_json($json_array);
	exit();
}
function nscc_schedule_is_lc_update_rr($yrq,$link){
	$reg_regs = $_POST['reg_regs'];
	//do db stuff
	$sql = "UPDATE schedule.is_link_details set registration_reqs='%s' WHERE eff_yrq='%s' AND link_id='%s';";
	_checkadd_schedule_edit_db();
	db_set_active('schedule_edit');
	$result = db_query($sql,$reg_regs,$yrq,$link); 
	db_set_active('default');
	if($result){
		$json_array['success'] = 1;	
		$json_array['new_reg_regs'] = $reg_regs; 
		$json_array['log_entry'] = 'Successfully updated the Enrollment Requirements'; 
	}else{
		$json_array['success'] = 0;	
		$json_array['new_title'] = $reg_regs; 
		$json_array['log_entry'] = 'Problem Updating the Enrollment Requirements: '.db_error(); 
	}

	print drupal_json($json_array);
	exit();
}
function nscc_schedule_is_lc_remove_item($yrq,$link){
	$yrq_code = $_POST['yrq'];
	$item_num = $_POST['item'];
	//do db stuff
	$sql="DELETE FROM schedule.is_link_item_links WHERE eff_yrq='%s' AND link_id='%s' AND _class_itm_num='%s';";
	_checkadd_schedule_edit_db();
	db_set_active('schedule_edit');
	$result = db_query($sql,$yrq,$link,$item_num); 
	db_set_active('default');

	if($result){
		$json_array['success'] = 1;	
		$json_array['remove_item'] = 'item_'.$yrq_code.'_'.$item_num; 
		$json_array['log_entry'] = 'Successfully removed item '.$item_num.' from the Link'; 
	}else{
		$json_array['success'] = 0;	
		$json_array['log_entry'] = 'Problem Updating removing item: '.db_error(); 
	}
	print drupal_json($json_array);
	exit();
}

function nscc_schedule_is_lc_add_item($yrq,$link){
	$yrq_code = $_POST['yrq'];
	$item_num = $_POST['item'];
	//do db stuff
	$sql="INSERT INTO schedule.is_link_item_links (eff_yrq,link_id,_class_itm_num) VALUES ('%s','%s','%s');";
	_checkadd_schedule_edit_db();
	db_set_active('schedule_edit');
	$result = db_query($sql,$yrq,$link,$item_num); 
	db_set_active('default');

	if($result){
		require_once('nscc_schedule.pages.inc');
		$items = _nscc_schedule_get_link_items($yrq,$link);
		if($items){
			foreach($items as $item){
				$itemlist .= _nscc_schedule_item_out($item,$tag_details,$course_tag_details,$fees,'lc');
			}
		}
		$itemlist = $itemlist;
		$json_array['success'] = 1;	
		$json_array['add_item'] = 'item_'.$yrq_code.'_'.$item_num; 
		$json_array['new_item_list'] = $itemlist;
		$json_array['log_entry'] = 'Successfully added item '.$item_num.' to the Link';
	}else{
		$json_array['success'] = 0;	
		$json_array['log_entry'] = 'Problem Updating removing item: '.db_error(); 
	}

	print drupal_json($json_array);
	exit();
}