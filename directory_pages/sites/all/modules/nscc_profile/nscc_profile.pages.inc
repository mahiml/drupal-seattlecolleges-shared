<?php
// $Id: nscc_profile.pages.inc,v 1.2 2007/12/08 14:06:22 goba Exp $

/**
 * @file
 * User page callbacks for the nscc_profile module.
 */

/**
 * Menu callback; display a list of user information.
 */
function nscc_profile_browse() {
  // Ensure that the path is converted to 3 levels always.
  list(, $name, $value) = array_pad(explode('/', $_GET['q'], 3), 3, '');

  $field = db_fetch_object(db_query("SELECT DISTINCT(fid), type, title, page, visibility FROM {nscc_profile_fields} WHERE name = '%s'", $name));

  if ($name && $field->fid) {
    // Only allow browsing of fields that have a page title set.
    if (empty($field->page)) {
      drupal_not_found();
      return;
    }
    // Do not allow browsing of private and hidden fields by non-admins.
    if (!user_access('administer users') && ($field->visibility == PROFILE_PRIVATE || $field->visibility == PROFILE_HIDDEN)) {
      drupal_access_denied();
      return;
    }

    // Compile a list of fields to show.
    $fields = array();
    $result = db_query('SELECT name, title, type, weight, page FROM {nscc_profile_fields} WHERE fid != %d AND visibility = %d ORDER BY weight', $field->fid, PROFILE_PUBLIC_LISTINGS);
    while ($record = db_fetch_object($result)) {
      $fields[] = $record;
    }

    // Determine what query to use:
    $arguments = array($field->fid);
    switch ($field->type) {
      case 'checkbox':
        $query = 'v.value = 1';
        break;
      case 'textfield':
      case 'selection':
        $query = "v.value = '%s'";
        $arguments[] = $value;
        break;
      case 'list':
        $query = "(v.value='%s' or v.value LIKE '%s,%%' or v.value like '%%,%s' or v.value like '%%,%s,%%')";
        $arguments[] = $value;
        $arguments[] = $value;
        $arguments[] = $value;
        $arguments[] = $value;
        break;
      default:
        drupal_not_found();
        return;
    }

    // Extract the affected users:
    $result = pager_query("SELECT u.uid, u.access FROM {users} u INNER JOIN {nscc_profile_values} v ON u.uid = v.uid inner join (select * from {nscc_profile_values} v2 where v2.fid=24) as lastname on u.uid=lastname.uid WHERE v.fid = %d AND $query AND u.access != 0 AND u.status != 0 ORDER BY lastname.value ASC", 10, 0, NULL, $arguments);

    $content = '';
    while ($account = db_fetch_object($result)) {
      $account = user_load(array('uid' => $account->uid));
      $nscc_profile = _nscc_profile_update_user_fields($fields, $account);
      $content .= theme('nscc_profile_listing', $account, $nscc_profile);
    }
    $output = theme('nscc_profile_wrapper', $content);
    $output .= theme('pager', NULL, 20);

    if ($field->type == 'selection' || $field->type == 'list' || $field->type == 'textfield') {
      $title = strtr(check_plain($field->page), array('%value' => theme('placeholder', $value)));
    }
    else {
      $title = check_plain($field->page);
    }
	
	// title override for departments -- they are actually taxonomy term ID's, so we get the term name.
	if ($name == 'nscc_profile_departments'){
	  $department_name = db_result(db_query('select name from {term_data} as td where td.tid = %d',$value));	
      $title = strtr(check_plain($field->page), array('%value' => theme('placeholder', $department_name)));
	}	

    drupal_set_title($title);
    return $output;
  }
  else if ($name && !$field->fid) {
    drupal_not_found();
  }
  else {
    // Compile a list of fields to show.
    $fields = array();
    $result = db_query('SELECT name, title, type, weight, page FROM {nscc_profile_fields} WHERE visibility = %d ORDER BY category, weight', PROFILE_PUBLIC_LISTINGS);
    while ($record = db_fetch_object($result)) {
      $fields[] = $record;
    }

    // Extract the affected users:
    //$result = pager_query('SELECT u.uid, u.access FROM {users} u inner join (select * from {nscc_profile_values} v2 where v2.fid=24) as lastname on u.uid=lastname.uid WHERE u.uid > 1 AND u.status != 0 AND u.access != 0 ORDER BY lastname.value ASC', 10, 0, NULL);
   $result = pager_query('SELECT u.uid, u.access FROM {users} u inner join (select * from {nscc_profile_values} v2 where v2.fid=24) as lastname on u.uid=lastname.uid inner join (select * from {nscc_profile_values} v3 where v3.fid=23) as firstname on u.uid=firstname.uid WHERE u.uid > 1 AND u.status != 0 AND u.access != 0 ORDER BY lastname.value ASC, firstname.value ASC', 10, 0, NULL);

    $content = '';
    $old_initial = '';
    while ($account = db_fetch_object($result)) {
      $account = user_load(array('uid' => $account->uid));
      $nscc_profile = _nscc_profile_update_user_fields($fields, $account);
      if($content == ''){
      	$top_name = $account->nscc_profile_last_name;
      }	
      $bottom_name = $account->nscc_profile_last_name;
      $new_initial = substr($bottom_name,0,1);
      if($new_initial!=$old_initial){
      		if($div_started){
				$content .= "</div>\n";
      		}
			$content .= '<div class="nscc-profile_letter-divider"><a id="letter_'.strtolower($new_initial).'" name="letter_'.strtolower($new_initial).'" class="index-anchor">'.strtoupper($new_initial).'</a>'."\n";
			$div_started=true;
      }
      $old_initial = $new_initial;
      $content .= theme('nscc_profile_listing', $account, $nscc_profile);
    }
    $content .= "</div>\n"; // ends the last letter grouping
    $output = theme('nscc_profile_wrapper', $content);
    $output .= theme('pager', NULL, 10);

    drupal_set_title(t("A-Z People Listing <span class=\"range\">(from $top_name to $bottom_name)</span>"));


    return $output;
  }
}

function nscc_profile_usernamesearch() {
	drupal_set_title(t('Search Result'));
	$search_text = arg(2); //the text to search for
	$query_offset = arg(3); //where to start the query
	$num_entries = 20; //number of entries per page

    $fields = array();
    $result = db_query('SELECT name, title, type, weight, page FROM {nscc_profile_fields} WHERE visibility = %d ORDER BY category, weight', PROFILE_PUBLIC_LISTINGS);
    while ($record = db_fetch_object($result)) {
      $fields[] = $record;
    }
	
	$monster_sql = "SELECT DISTINCT u.uid AS uid,lnames.lname AS lname FROM {users} u JOIN (SELECT uid,value AS fname FROM {nscc_profile_values} WHERE fid=23) fnames USING (uid) JOIN (SELECT uid,value AS lname FROM {nscc_profile_values} WHERE fid=24) lnames USING (uid) 
					WHERE 
						u.uid > 1 AND
						u.status = 1 AND
						( LOWER(u.name) LIKE LOWER('%%%s%%') OR 
						LOWER(fnames.fname) LIKE LOWER('%%%s%%') OR 
						LOWER(lnames.lname) LIKE LOWER('%%%s%%') OR 
						LOWER(lnames.lname || ', ' || fnames.fname) LIKE LOWER('%%%s%%') )
					ORDER BY lname ASC";
	watchdog('nscc_profile', 'finding '.$search_text);				
    $result = pager_query($monster_sql, $num_entries, 0, NULL, $search_text, $search_text, $search_text, $search_text );

	$content = '';
    while ($account = db_fetch_object($result)) {
      $account = user_load(array('uid' => $account->uid));
      $nscc_profile = _nscc_profile_update_user_fields($fields, $account);
      $content .= theme('nscc_profile_listing', $account, $nscc_profile);
    }
    $output = theme('nscc_profile_wrapper', $content);
    $output .= theme('pager', NULL, $num_entries);
	
	
	return $output;
}


/**
 * Callback to allow autocomplete of profile text fields.
 */
function nscc_profile_autocomplete($field, $string) {
  $matches = array();
  if (db_result(db_query("SELECT COUNT(*) FROM {nscc_profile_fields} WHERE fid = %d AND autocomplete = 1", $field))) {
    $result = db_query_range("SELECT value FROM {nscc_profile_values} WHERE fid = %d AND LOWER(value) LIKE LOWER('%s%%') GROUP BY value ORDER BY value ASC", $field, $string, 0, 10);
    while ($data = db_fetch_object($result)) {
      $matches[$data->value] = check_plain($data->value);
    }
  }

  drupal_json($matches);
}

/**
* Callback to allow autocomplete of first/last/user name
*/

function nscc_profile_usersearch_autocomplete($string = '') {
  $matches = array();
  if ($string) {
    $result = db_query_range("SELECT distinct fnames.fname || ' ' || lnames.lname as full_name FROM {users} u join (select uid,value as fname from {nscc_profile_values} where fid=23) fnames using (uid) join (select uid,value as lname from {nscc_profile_values} where fid=24) lnames using (uid) WHERE u.status=1 AND (LOWER(u.name) like LOWER('%%%s%%') OR LOWER(fnames.fname) like LOWER('%%%s%%') OR LOWER(lnames.lname) LIKE LOWER('%%%s%%'))", $string, $string, $string, 0, 10);
    while ($name = db_fetch_object($result)) {
      $matches[$name->full_name] = check_plain($name->full_name);
    }
  }

  drupal_json($matches);
}

function nscc_profile_orglist(){

	$vid = 1;  // Set the vid to the vocabulary id of the vocabulary you wish to list the terms from
	$pole = array();
	$terms = taxonomy_get_tree($vid);
	$topterms = taxonomy_get_tree($vid, 0, -1, 1);
	foreach ( $topterms as $topterm ) {
  		$toppole[]=Array (l($topterm->name, "profile/nscc_profile_departments/$topterm->tid"), $topterm->depth,  $topterm->tid)  ;
	}
	$disclaimer = "This is intended as a search index to locate people, not necessarily a true organization chart.";

	$output = '<div id="orgchart-disclaimer" class="grid-12 alpha omega">'.$disclaimer."</div>\n";
	$output .='<div id="orgchart-left-half" class="org-units grid-6 alpha">'."\n";
	$output .=_orglist_box($toppole[0][2]);
	$output .="</div>\n".'<div id="orgchart-right-half" class="org-units grid-6 omega">'."\n";
	$output .=_orglist_box($toppole[1][2]);
	$output .=_orglist_box($toppole[3][2]);
	$output .=_orglist_box($toppole[2][2]);
	$output .="</div>\n";
	return $output;
}

function _orglist_box($box_top_tid){
	$vid = 1;  // Set the vid to the vocabulary id of the vocabulary you wish to list the terms from
	$pole = array();
	$subterms = taxonomy_get_tree($vid, $box_top_tid, -1, null);
	$titleterm = taxonomy_get_term($box_top_tid);

	foreach ( $subterms as $subterm ) {
  		$pole[]=Array (l($subterm->name, "profile/nscc_profile_departments/$subterm->tid"), $subterm->depth,  $subterm->tid );
	}

	$output .= "<div class=\"\">\n<h2 class=\"\">".$titleterm->name."</h2>\n";	
	$output .= "<p class=\"description\">".$titleterm->description."</p>\n";
	$output .= "\n<p class=\"office-hq\">".l($titleterm->name.' (staff)', "profile/nscc_profile_departments/$titleterm->tid")."</p>\n";
	$depth = -1;
	foreach ($pole as $list) {
    	if ($list[1] > $depth) $output .= "\n<ul>\n";
    	if ($list[1] == $depth) $output .= "</li>\n";
    	if ($list[1] < $depth) {
       		for ($i=$list[1]; $i<$depth; $i++){
         		$output .= "\n</li></ul>\n";
       		}
       		$output .="</li>\n";
    	}

    	$output .= "\t<li>$list[0]";
    	$depth=$list[1];
	}
	$output .= "</li>\n</ul>\n";
	$output .= "</div>\n";
	return $output;
}



