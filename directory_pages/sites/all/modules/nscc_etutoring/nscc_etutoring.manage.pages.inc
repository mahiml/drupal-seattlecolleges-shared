<?php
// $Id: nscc_etutoring.admin.pages.inc,v 1.2 2007/12/08 14:06:22 goba Exp $

/**
 * @file
 * Admin page callbacks for the nscc_etutoring module.
 */


/**
 * Menu callback
 */
function nscc_etutoring_manage_page(){
	$content = "Empty menu item\n";
	return $content;
}



/**
 * Menu callback
 */
function nscc_etutoring_admin() {
	$content = "Eventually, there will be content here.\n";
	$content .="<h3>In the meantime, here's the nscc_etutoring admin functions:</h3>\n";
	$content .="<ul>\n";
	$content .="<li>".l('View an association','manage/nscc_etutoring/show')."</li>\n";
	$content .="<li>".l('Add a new batch file','manage/nscc_etutoring/addbatch')."</li>\n";
	$content .="</ul>\n";
	return $content;
}

/**
 * Menu callback
 */
function nscc_etutoring_view_assoc() {
	return drupal_get_form('nscc_etutoring_view_assocform');
}

/**
 * Menu callback
 */
function nscc_etutoring_addbatch() {
	return drupal_get_form('nscc_etutoring_addbatchform');
}

function nscc_etutoring_view_assocform(){
	$form['message'] = array(
		'#type'=>'markup',
		'#value'=>'<p>Only fill out ONE field below, to do otherwise is just silly.</p>'
	);
	$form['sid'] = array(
		'#type' => 'textfield',
		'#title' => t('SID'),
		'#size' => 9,
		'#description' => t('An SID to find etutoring info for')
	);
	$form['et_uname'] = array(
		'#type' => 'textfield',
		'#title' => t('E-tutoring Username'),
		'#size' => 12,
		'#description' => t('An E-tutoring username to find info (including related SID) for')
	);	
	$form['submit'] = array(
		'#type' => 'submit',
		'#value' => t('Submit')
	);
	return $form;
}

function nscc_etutoring_view_assocform_validate($form,&$form_state){
	if(!$form_state['values']['sid'] && !$form_state['values']['et_uname']){
		form_set_error('message', t('You\'re being silly, cut it out.'));
	}
	if($form_state['values']['sid'] && $form_state['values']['et_uname']){
		form_set_error('message', t('You\'re being silly, cut it out.'));
	}
	if($form_state['values']['sid'] && !preg_match('/^\d\d\d\d\d\d\d\d\d$/',$form_state['values']['sid']) ){
		form_set_error('sid', t('You apparently want to look up someone by SID, but have submitted a bogus SID'));
	} 
	if($form_state['values']['et_uname'] && !preg_match('/^nscc\d+$/',$form_state['values']['et_uname']) ){
		form_set_error('et_uname', t('You apparently want to look up someone by etutoring username, but have submitted a bogus username'));
	} 
}

function nscc_etutoring_view_assocform_submit($form,&$form_state){
	$sid_sql = "SELECT * FROM {nscc_etutoring_accounts} WHERE sid='%s';";
	$et_uname_sql = "SELECT * FROM {nscc_etutoring_accounts} WHERE et_uname='%s';";
	if($form_state['values']['et_uname']){
		$result = db_query($et_uname_sql,$form_state['values']['et_uname']);
	} 	
	if($form_state['values']['sid']){
		$result = db_query($sid_sql,$form_state['values']['sid']);
	} 	
  	error_log("\n--------------------------------------------",3,"/var/tmp/etutlog.txt");
  	error_log(print_r($result,TRUE)."\n",3,"/var/tmp/etutlog.txt");
	if($result){
		while($data = db_fetch_object($result)){
			$output  .= "<table><tr><td>row</td><td>sid</td><td>fname</td><td>lname</td><td>email</td><td>uname</td><td>password</td></tr>\n";
			$output  .= "<tr><td>{$data->etutor_record_id}</td><td>{$data->sid}</td><td>{$data->et_fname}</td><td>{$data->et_lname}</td><td>{$data->et_email}</td><td>{$data->et_uname}</td><td>{$data->et_password}</td></tr></table><hr>\n";
		} 
		if($output){
			drupal_set_message($output);
		} else {
			drupal_set_message('No matching records found.');
		}
	}else{
		drupal_set_message(t('Database error.'));
	}
}


function nscc_etutoring_addbatchform(){
	$form['#attributes']['enctype'] = 'multipart/form-data';
	$form['batch_file'] = array(
		'#type' => 'file',
		'#title' => t('upload batch file'),
		'#size' => 48,
		'#description' => t('A upload batch file of the etutoring-prescribed format, as tab-delimited .txt.')
	);
	$form['link_to_file'] = array(
		'#type'=>'markup',
		'#value'=>'<p>You can download a blank Excel template file from <a href="http://facweb.northseattle.edu/sbayne/etutoring_upload.xlsx">here</a></p>'
	);
	$form['filecontents'] = array('#type' => 'value', '#value' => NULL);
	$form['submit'] = array(
		'#type' => 'submit',
		'#value' => t('Submit')
	);
	return $form;
}

function nscc_etutoring_addbatchform_validate($form,&$form_state){
	$file = file_save_upload('batch_file');
     if (!$file) {
        form_set_error('batch_file', t('File upload failed.'));
      }
      else {
      	if($file->filemime != 'text/plain'){
	        form_set_error('batch_file', t('Not a text file'));
	        file_delete($file->filepath);
			return;
		}
      	$file_contents = file_get_contents($file->filepath);

      	$file_contents = preg_replace('/\r/','',$file_contents);
      	$file_lines    = split("\n",$file_contents);
  		
      	$firstline = "FirstName	LastName	Email	Username	Password";
      	if( $firstline != $file_lines[0] ){
	        form_set_error('batch_file', t('This file is not formatted correctly.(bogus header line)<br>:'.$file_lines[0].':<br>:'.$firstline.':'));
	        file_delete($file->filepath);
			return;
      	}
      	unset($file_lines[0]);
      	$line_index = 1;
      	foreach($file_lines as $current_line){
      		if(preg_match('/nscc/',$current_line)){
	      		if(! preg_match('/^nscc\d+\tnscc\d+\tnscc\d+@example.com\tnscc\d+\t.+$/',rtrim($current_line))){
			        form_set_error('batch_file', t('This file is not formatted correctly.(error in line %lineno)'."<br>:".$current_line.":",array('%lineno'=>$line_index)));
			        file_delete($file->filepath);
					return;
      			}
      		}	
      		$line_index++;
      	}
      	//basic validation achieved. now to actually import the data.
		$insert_sql = "INSERT INTO {nscc_etutoring_accounts} (et_fname,et_lname,et_email,et_uname,et_password) VALUES ('%s','%s','%s','%s','%s');";
		$line_index = 1;
      	foreach($file_lines as $current_line){
      		if(preg_match('/nscc/',$current_line)){
	      		$fields = split("\t",$current_line);
   		   		if(! db_query($insert_sql,$fields[0],$fields[1],$fields[2],$fields[3],$fields[4])){
			        form_set_error('batch_file', t('Problem importing this file (error in line %lineno)'."<br>".$current_line,array('%lineno'=>$line_index)));
			        file_delete($file->filepath);
      			}
			}
      	}
      	
	  	error_log("\n--------------------------------------------",3,"/var/tmp/etutlog.txt");
	  	error_log("\n".print_r($file_lines,TRUE)."\n",3,"/var/tmp/etutlog.txt");
        //form_set_value('filecontents', file($file->filepath), $form_state);
        file_delete($file->filepath);
      }      
}

function nscc_etutoring_addbatchform_submit($form,&$form_state){
	drupal_set_message(t('Batch Uploaded. If you haven\'t already, you still have to upload the batch to etutoring.org.'));
}
