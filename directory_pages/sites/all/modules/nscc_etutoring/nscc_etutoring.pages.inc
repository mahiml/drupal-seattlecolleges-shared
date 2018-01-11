<?php
// $Id: nscc_etutoring.pages.inc,v 1.2 2007/12/08 14:06:22 goba Exp $

/**
 * @file
 * User page callbacks for the nscc_etutoring module.
 */

/**
*	Menu callback;
*/
function nscc_etutoring_associate(){
	return drupal_get_form('nscc_etutoring_assocform');
}

function nscc_etutoring_done(){
	return <<<end_of_blurb
<p>Now that you have signed up, you can:</p> 
<ul class="actionlist">
<li><span class="verb">Go</span> to eTutoring.org</li> 
<li><span class="verb">Click</span> on Login Now!</li>
<li><span class="verb">Select</span> Northwest eTutoring Consortium</li>
<li><span class="verb">Choose</span> North Seattle Community College</li>
<li><span class="verb">Type</span> Your Username</li> 
<li><span class="verb">Enter</span> Your Password</li>
<li><span class="verb">Hit</span> the &quot;Sign In&quot; button</li>
<li><span class="verb">Start</span> eTutoring!</li> 
</ul>
<div class="warning">
<p>Once again, before you're allowed to use this service, eTutoring.org will ask you to activate your account.</p> 
<p><strong>NSCC strongly advises putting random numbers into student identification field during this activation process.</strong></p> 
<p>We cannot make any guarantees regarding the security of this service.</p>  
</div>
end_of_blurb;
}

function nscc_etutoring_assocform(){
	$etutoring_desc = <<<end_of_blurb
<p>Online tutoring is available to all students enrolled at North Seattle Community College 
through the eTutoring.org website. Students can get assistance in a variety of subject areas 
including math, English, accounting, Spanish, and much more.</p>
<p>To receive your user name and password for instant access to eTutoring.org, complete the registration form below.</p>  
<p>For technical support, please contact the NSCC eLearning Support Center at 527-3738 or 
<a href="mailto:distance@sccd.ctc.edu">distance@sccd.ctc.edu</a>. 
For questions or comments about tutoring related issues, please contact <a href="/users/dtarker">Daniel Tarker</a>, 
Director of the Loft Writing Center, at 526-0164 or <a href="mailto:dtarker@sccd.ctc.edu">dtarker@sccd.ctc.edu</a>.</p> 
end_of_blurb;

	$scary_warning = <<<end_of_blurb
<div class="warning">
<h2>Privacy Alert</h2>
<p>When you log onto the eTutoring.org site, you will be asked to provide your student identification (SID) number when activating your account.</p> 
<p><strong>North Seattle Community College strongly advises students not to share their personal SID numbers.</strong></p>
<p>It is not required in this case. You may enter any random number (other than your personal numbers) into that field during the activation process. This will not affect your account in any way.</p> 
end_of_blurb;


	global $user;
	$form['etutoring_description'] = array(
		'#type' => 'markup',
		'#value' => $etutoring_desc
	);
	if ($user->uid > 1 && !_is_admin_user($user)){
		$form['netid_uname'] = array(
			'#type' => 'value',
			'#required'=> true,
			'#value' => $user->name
		);
		$form['sid'] = array(
			'#type' => 'value',
			'#value' => ''
		);
		$form['lname'] = array(
			'#type' => 'value',
			'#value' => ''
		);
		$form['assoc_type'] = array(
			'#type' => 'value',
			'#required'=> true,
			'#value' => 'netid'
		);
	} else {
		$form['netid_uname'] = array(
			'#type' => 'value',
			'#value' => ''
		);
		$form['sid'] = array(
			'#type' => 'textfield',
			'#title' => 'SID',
			'#required'=> true,
			'#size' => 9,
			'#description'=> t('Enter your Student ID number') 
		);
		$form['lname'] = array(
			'#type' => 'textfield',
			'#title' => 'Last Name',
			'#required'=> true,
			'#size' => 20,
			'#description'=> t('Enter your Last Name (as it appears in your registration application)') 
		);
		$form['assoc_type'] = array(
			'#type' => 'value',
			'#value' => 'sid'
		);
	}
	$form['privacy_warning'] = array(
		'#type' => 'markup',
		'#value' => $scary_warning
	);
	$form['privacy_ack'] = array(
		'#type'=> 'checkbox',
		'#title' => 'Yes',
		'#required'=> true,
		'#description' => 'I have read the important details on NSCC\'s eTutoring program and have read and understand the above Privacy Alert.',
		'#suffix'=>"</div>",
	);
	$form['submit'] = array(
		'#type' => 'submit',
		'#value' => 'Set Up My Etutoring Account'
	);
	return $form;
}

function nscc_etutoring_assocform_validate($form,&$form_state){
	//required text fields take care of themselves, apparently checkboxes don't
	
	if(!$form_state['values']['privacy_ack']){
			form_set_error('privacy_ack', t('You must indicate that you have read and understood our Privacy Alert'));
			return;
	}

	watchdog('etutoring','Assoc type: '.$form_state['values']['assoc_type']);
	switch($form_state['values']['assoc_type']){
		case 'netid':
			//get sid from netid
			db_set_active('etutoring_extract');
			$auth_entry = db_fetch_object(db_query("SELECT * FROM etutoring_extract WHERE uname='%s';",$form_state['values']['netid_uname']));
			db_set_active('default');
			if(!$auth_entry){
				form_set_error('netid_uname', t('There was some kind of database error!'));
				return;
			}
			$form_state['values']['sid'] = $auth_entry->uname;
			break;
						
		case 'sid':
			//make sure sid is non-looney
			if($form_state['values']['sid'] && !preg_match('/^\d\d\d\d\d\d\d\d\d$/',$form_state['values']['sid']) ){
				form_set_error('sid', t('Valid SID\'s are nine digits.'));
				return;
			} 
			//confirm sid/lastname
			db_set_active('etutoring_extract');
			$auth_entry = db_fetch_object(db_query("SELECT * FROM etutoring_extract WHERE sid=%d AND fullname ~* '^%s.*';",$form_state['values']['sid'],$form_state['values']['lname']));
			db_set_active('default');
			if(!$auth_entry){
				form_set_error('sid', t('That is either an incorrect SID, or that SID doesn\'t go with that last name.'));
				return;
			}
			break;
	}

	
	//check to see if that sid already has an account
	if(db_result(db_query("select count(sid) from {nscc_etutoring_accounts} where sid='%s';",$form_state['values']['sid']))){
		drupal_set_message(t('You already have an etutoring account.'),'error');
		return;
	}

	$get_next_row_id_sql = "SELECT nextval('itservices_nscc_etutoring_accounts_free_seq');";
	if (! $row_id = db_result(db_query($get_next_row_id_sql)) ){
		drupal_set_message(t('Database error getting next account.'),'error');
		return;
	}
	watchdog('etutoring','Row ID: '.$row_id);

	$result = db_query("UPDATE {nscc_etutoring_accounts} set sid='%s' WHERE etutor_record_id=%d;",$form_state['values']['sid'],$row_id);
	if(!$result){
		drupal_set_message(t('Database error associating sid.'),'error');
		return;
	}

}

function nscc_etutoring_assocform_submit($form,&$form_state){
	$et_entry = db_fetch_object(db_query("SELECT * FROM {nscc_etutoring_accounts} WHERE sid='%s';",$form_state['values']['sid']));
	if($et_entry){
		drupal_set_message('<p><strong>You may wish to print this page.</strong></p><p>Your etutoring username is: '.$et_entry->et_uname.'</p><p>Your initial etutoring password is: '.$et_entry->et_password.'</p>');
		$form_state['redirect'] = 'nscc_etutoring/done';
	} else {
		drupal_set_message(t('Database error fetching etutoring account.'),'error');
	}
	
}

?>