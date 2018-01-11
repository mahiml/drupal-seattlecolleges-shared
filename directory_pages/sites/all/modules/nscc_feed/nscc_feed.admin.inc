<?php
// $Id: nscc_feed.admin.inc,v 1.236.2.3 2009/01/12 10:09:19 goba Exp $

/**
 * @file
 * Administrative page callbacks for the nscc_feed module.
 */

/**
 * Menu callback: Generate a form to add/edit/delete an nscc_feed.
 *
 * @ingroup forms
 * @see nscc_feed_validate()
 * @see nscc_feed_submit()
 */
function nscc_feed(&$form_state, $arg = NULL) {
  $feedid = arg(4);
  if ($feedid) {
    // Display the edit feed form.
    $feed = db_fetch_object(db_query('SELECT * FROM {nscc_feed} WHERE feedid = %d', $feedid));
    $form['feedname'] = array(
      '#type' => 'textfield',
      '#title' => t('Feed name'),
      '#default_value' => $feed->feedname,
      '#size' => 32,
      '#required' => TRUE,
      '#maxlength' => 32,
      '#description' => t('The name for this feed.'),
    );
    $form['feedid'] = array(
      '#type' => 'value',
      '#value' => $feedid,
    );
    $form['submit'] = array(
      '#type' => 'submit',
      '#value' => t('Save Feed'),
    );
    $form['delete'] = array(
      '#type' => 'submit',
      '#value' => t('Delete Feed'),
    );
  }
  else {
    $form['feedname'] = array(
      '#type' => 'textfield',
      '#size' => 32,
      '#maxlength' => 32,
    );
    $form['submit'] = array(
      '#type' => 'submit',
      '#value' => t('Add Feed'),
    );
    $form['#submit'][] = 'nscc_feed_submit';
    $form['#validate'][] = 'nscc_feed_validate';
  }
  return $form;
}

/**
 * Validate nscc_feed_edit_form submissions.
 */
function nscc_feed_validate($form, &$form_state){
  if ($form_state['values']['feedname']) {
    if ($form_state['values']['op'] == t('Save Feed')) {
      if (db_result(db_query("SELECT COUNT(*) FROM {nscc_feed} WHERE feedname = '%s' AND feedid != %d", $form_state['values']['feedname'], $form_state['values']['feedid']))) {
        form_set_error('feedname', t('The feed name %name already exists. Please choose another feed name.', array('%name' => $form_state['values']['feedname'])));
      }
    }
    else if ($form_state['values']['op'] == t('Add Feed')) {
      if (db_result(db_query("SELECT COUNT(*) FROM {nscc_feed} WHERE feedname = '%s'", $form_state['values']['feedname']))) {
        form_set_error('feedname', t('The feed name %name already exists. Please choose another feed name.', array('%name' => $form_state['values']['feedname'])));
      }
    }
  }
  else {
    form_set_error('feedname', t('You must specify a valid feed name.'));
  }
}

/**
 * Process nscc_feed_edit_form submissions.
 */
function nscc_feed_submit($form, &$form_state) {
  if ($form_state['values']['op'] == t('Save Feed')) {
    db_query("UPDATE {nscc_feed} SET feedname = '%s' WHERE feedid = %d", $form_state['values']['feedname'], $form_state['values']['feedid']);
    drupal_set_message(t('The feed has been renamed.'));
  }
  else if ($form_state['values']['op'] == t('Delete Feed')) {
    db_query('DELETE FROM {nscc_feed} WHERE feedid = %d', $form_state['values']['feedid']);
    db_query('DELETE FROM {nscc_feed_acl} WHERE feedid = %d', $form_state['values']['feedid']);
    // Update the nodes who have this feed set:
    db_query('DELETE FROM {nscc_feed_content} WHERE feedid = %d', $form_state['values']['feedid']);

    drupal_set_message(t('The feed has been deleted.'));
  }
  else if ($form_state['values']['op'] == t('Add Feed')) {
    db_query("INSERT INTO {nscc_feed} (feedname) VALUES ('%s')", $form_state['values']['feedname']);
    drupal_set_message(t('The feed has been added.'));
  }
  $form_state['redirect'] = 'admin/content/feeds';
  return;
}

/**
 * Theme the new-feed form.
 *
 * @ingroup themeable
 */
function theme_nscc_feed_new_feed($form) {
  $header = array(t('Name'), array('data' => t('Operations'), 'colspan' => 2));
  $feed_array = nscc_feeds();
  if ($feed_array){	
  	foreach (nscc_feeds() as $feedid => $feedname) {
    	$edit_permissions = l(t('edit permissions'), 'admin/content/feeds/feed_permissions/'. $feedid);
    	$rows[] = array($feedname, l(t('edit feed'), 'admin/content/feeds/edit/'. $feedid), $edit_permissions);
  	}
  }	
  $rows[] = array(drupal_render($form['feedname']), array('data' => drupal_render($form['submit']), 'colspan' => 2));

  $output = drupal_render($form);
  $output .= theme('table', $header, $rows);

  return $output;
}


/**
 * Menu callback: Generate a form to add/edit/delete role permissions for an nscc_feed.
 *
 * @ingroup forms
 * @see nscc_feed_permission_form_validate()
 * @see nscc_feed_permission_form_submit()
 */
function nscc_feed_permissions_form(&$form_state, $arg = NULL) {
  $feedid = arg(4);
  if ($feedid) {
    //drupal_set_message(t('Editing permissions for feed '.$feedid)); 	
 	$result = db_query('SELECT r.rid, r.name FROM {role} r ORDER BY r.name',$feedid);
 	while ($role = db_fetch_object($result)){
 		$roles[$role->rid] = array('role_name'=>$role->name);
 	}
 	$default_values=array();
 	$result = db_query('SELECT rid,feedid from {nscc_feed_acl} where feedid=%d',$feedid);
 	while ($role_perm = db_fetch_object($result)){
		$default_values[] = $role_perm->rid;
 	}
    foreach ($roles as $role => $role_array) {
   		$options[$role] = t($role_array['role_name']);
   }
  $form['roles'] = array('#type' => 'checkboxes','#options' => $options,'#default_value'=> $default_values);
  $form['feedid'] = array('#type' => 'value','#value'=>$feedid);
  $form['submit'] = array('#type' => 'submit', '#value' => t('Save permissions'));
  $form['#submit'] = array('nscc_feed_permissions_form_submit');
  $form['#validate'] = array('nscc_feed_permissions_form_validate');

  return $form;

  } else {
    drupal_set_message(t('You must specify a feed to set permissions for.')); 	
  }
}

/**
 * Validate nscc_feed_permission_form submissions.
 */
function nscc_feed_permissions_form_validate($form, &$form_state){
//no validation yet.
}

/**
 * Process nscc_feed_permission_form submissions.
 */
function nscc_feed_permissions_form_submit($form, &$form_state) {
  db_query("DELETE FROM {nscc_feed_acl} WHERE feedid = %d", $form_state['values']['feedid']);
  foreach(array_filter($form_state['values']['roles']) as $rid){
	db_query("INSERT into {nscc_feed_acl} VALUES(%d,%d)",$form_state['values']['feedid'],$rid);
  }
  drupal_set_message(t('The feed permissions have been saved.'));
  $form_state['redirect'] = 'admin/content/feeds';
  return;
}

