<?php
// $Id$

/**
 * @file template.php
 *
 * Theme override and template preprocessor functions for Coops site.
 */




/**
 * Theme override: breadcrumb
 *
 * Builds breadcrumb for all pages (front included) that includes link to front
 * page of main NSCC site and current subsite if not already included in default
 * breadcrumb built by core.
 *
 * @param $breadcrumb Array pre-rendered link-elements for breadcrumb
 * @return String Output-ready breadcrumb
 */
function nscc_coops_breadcrumb($breadcrumb) {
	global $meta_breadcrumb;
	$sitename = variable_get('site_name', null);
	$site_home = l(ucwords($sitename), '<front>');
	$delimiter = ' <img alt="" src="' . base_path().path_to_theme().'/imgs/bullet-crumb.png" /> ';
	$nscc_home = l('NSCC', 'https://northseattle.edu/', array('attributes'=>array('title'=>'NSCC Homepage')));
	$prod_home = l('NSCC', 'https://prod.northseattle.edu', array('attributes'=>array('title'=>'NSCC Homepage')));
	$rel_prod_home = l('NSCC', '/', array('attributes'=>array('title'=>'NSCC Homepage')));
	$stupid_core_prod_home = l('Home', '/');

	if(empty($breadcrumb)){

		if ($sitename == 'NSCC') {
			$breadcrumb = array($nscc_home);
		} else{
			$breadcrumb = array($nscc_home,$site_home);
		}		

	} else {
		//non-empty incoming breadcrumb	
		//clear out the stupid core sillyness
		if ($sitename == 'NSCC') {
			if(preg_match('/>Home</', $breadcrumb[0]) ){
				$breadcrumb[0] = $nscc_home;
			}
		} else {
			if(preg_match('/>Home</', $breadcrumb[0]) ){
				$breadcrumb[0] = $site_home;
			}	
			if($breadcrumb[0] != $nscc_home){
				array_unshift($breadcrumb,$nscc_home);
			}
		}
	}

	$breadcrumb = drupal_set_breadcrumb($breadcrumb);

	// Meta breadcrumb for search engine
	if ($sitename) {
	
		if($sitename == 'NSCC') {
			$insert_sitename = '';
		} elseif ($sitename == 'News & Events') {
			$insert_sitename = 'news.';
		} else {
			$insert_sitename = strtolower($sitename).'.';
		}
		$pattern = '/(href="\/)/';
		$replacement = 'href="https://' . $insert_sitename . 'northseattle.edu/';
//		$replacement = ($sitename != 'NSCC') ? 'href="http://' . $sitename . 'northseattle.edu${1}"' : 'href="http://northseattle.edu${1}"';	// USE THIS REPLACEMENT AFTER CUTOVER.
		$meta_breadcrumb = array();
		for ($i = 0; $i < count($breadcrumb); $i++) {
			//if ($i === 0) { continue; }	// skip nscc home link
			$meta_breadcrumb[$i] = preg_replace($pattern, $replacement, $breadcrumb[$i]);
		}
		$meta_breadcrumb = htmlentities(implode($delimiter, $meta_breadcrumb), ENT_QUOTES);
	}

	return '<div id="breadcrumbs"><p>' . implode($delimiter, $breadcrumb) . "</p></div>\n";
}




/**
 * Theme override: node-submitted info
 *
 * @param $node Node object for which the submitted meta-data is to be themed
 * @return String Output-ready node meta-info
 */
function nscc_coops_node_submitted($node) {
  // Only show for specified nodes.
  switch($node->type) {
    case 'blog':
    case 'forum':
      return t('@datetime - !username',
        array(
          '!username' => theme('username', $node),
          '@datetime' => format_date($node->created, 'custom', 'M jS Y g:ia'),
        ));
      break;
    default:
      return '';
  }
}




/**
 * Theme override: comment-submitted info
 *
 * @param $comment The comment object for which the submitted meta-data is to be themed
 * @return String Output-ready comment meta-info
 */
function nscc_coops_comment_submitted($comment) {
  return t('@datetime - !username',
    array(
      '!username' => theme('username', $comment),
      '@datetime' => format_date($comment->timestamp, 'custom', 'M jS Y g:ia'),
    ));
}




/**
 * Theme override: menu-local-tasks list
 *
 * Replaces class-attributes of primary local-tasks menus so they can be styled
 * differently. The rest of the code is cribbed from core.
 * @return String Output-ready list of links
 */
function nscc_coops_menu_local_tasks() {
  $output = '';

  if ($primary = menu_primary_local_tasks()) {
    if (arg(0) == 'admin') {
      $output .= "<ul class=\"tabs primary clear-block\">\n". $primary ."</ul>\n";
    } else {
      $output .= "<ul class=\"primary-local-tasks\">\n". $primary ."</ul>\n";
    }
  }
  if ($secondary = menu_secondary_local_tasks()) {
    $output .= "<ul class=\"tabs secondary clear-block\">\n". $secondary ."</ul>\n";
  }

  return $output;
}




/**
 * Theme override: menu-local-task item
 *
 * Suppresses output of the active task item from the local-tasks list.
 * @return String Output-ready list-item
 */
function nscc_coops_menu_local_task($link, $active = FALSE) {
  if (! $active || arg(0) == 'admin') { return "<li>$link</li>\n"; }
  if (strpos($link, 'View') === false && strpos($link, 'Edit') === false) { return "<li class=\"active\">$link</li>\n"; }
}





/**
 * Template preprocessor: search-block-form
 *
 * @see search-block-form.tpl.php
 */
function nscc_coops_preprocess_search_block_form(&$variables) {
  $form_submit = $variables['form']['submit'];
  $variables['search']['submit'] = '<input type="image" class="searchbutton" src="'
    . base_path()
    . $variables['directory']
    . '/imgs/button-search.png" id="'
    . check_plain($form_submit['#id']) . '" value="'
    . check_plain($form_submit['#value']) . '" name="'
    . check_plain($form_submit['#name']) . '" />';
}





/**
 * Template preprocessor: page
 *
 * @see page.tpl.php
 */
function nscc_coops_preprocess_page(&$variables) {

	$node = $variables['node'];
	
	// Add admin/editor UI styles as needed.
	// This seems convoluted, but drupal_add_css() alone fails to load stylesheet.
	// Code was cribbed from http://drupal.org/node/225868
	if (arg(0) == 'admin' || (arg(0) == 'node' && arg(2) == 'edit')) {
		$admin_css = drupal_get_path('theme', 'nscc_coops') .'/css/nscc_coops-admin.css';
		drupal_add_css($admin_css, 'theme', 'all', false);
		$variables['css']['all']['theme'][$admin_css] = 1;	// <- this seems to be the critical part.
		$variables['styles'] = drupal_get_css();
	}

	// Extend template suggestions to account for existence of page-templates for custom node-types.
	if (! empty($node->type)) {
		$variables['template_files'][] = 'page-node-' . $node->type;
	}
	
	// Append college abbr to <title>.
	$variables['head_title'] .= strpos($variables['head_title'], '| NSCC') === true ? '' : ' | NSCC';
	
	// Force IE (7,8,9) to use its most standards-compliant rendering mode.
	//$variables['head'] .= '<meta http-equiv="X-UA-Compatible" content="IE=edge">' . "\n";
	//watchdog('ie-testing', 'Vars: <pre>'.print_r($variables, true)."</pre>");
	
	
	// Node-specific mods.
	if ($node) {
		switch ($node->type) {


			case 'functionary' :
				break;


			case 'page' :
				if (! empty($node->field_page_supplement)) {
					foreach ($node->field_page_supplement as $sup_field) {
						$variables['right'] .= $sup_field['view'];
					}
				}
				break;


			case 'program' :
				$variables['template_files'][] = 'page-node-school';
				$school = node_load($node->field_rel_school[0]['nid'], null, true);
				
				// School banner heading
				$variables['banner'] = false;
				if ($school->field_header_img[0]['filesize'] > 0) {
					$variables['banner'] = theme('image',
						$school->field_header_img[0]['filepath'],
						check_plain($school->field_header_img[0]['data']['alt']),
						check_plain($school->field_header_img[0]['data']['title']),
						array('class' => 'school-banner'),
						false
					);
					$title_color = 'light'; //check_plain($pgm->field_title_color[0]['value']);
					$title_text = trim($school->title);
					$variables['banner'] .= _format_banner_title($title_text, $title_color);
				}
				
				// Programs tabs list for the school
				$variables['program_nav'] = _get_school_programs_list($school->nid, $node);
				
				// Sidebar: eligibility info
				if (! empty($node->field_eligibility[0]['value'])) {
					$elig_content = $node->field_eligibility[0]['view'];
					$right_col[] = "<div id=\"program-eligibility\" class=\"block program-block\"><h2>Eligibility</h2>\n$elig_content</div>\n";
				}
				
				// Sidebar: inquiry info
				if (! empty($node->field_inquiries[0]['value'])) {
					$inq_content = $node->field_inquiries[0]['view'];
					$right_col[] = "<div id=\"program-inquiries\" class=\"block program-block\"><h2>Inquiries</h2>\n$inq_content</div>\n";
				}
				
				// Sidebar: teachers & parent coordinators
				foreach ($node->field_teachers as $functionary) {
					if ($functionary['nid'] > 1) {
						$fnode = node_load($functionary['nid'], null, true);
						$fnode->sidebar_format = true;
						$right_col[] = theme('node', $fnode);
					}
				}
				
				// Sidebar: school address
				$right_col[] = _format_contact_block($school);
				$variables['right'] = (!empty($right_col)) ? implode("\n", $right_col) : false;
				
				// Render content for editor form
				if (arg(0) != 'node' && arg(2) != 'edit') {
					$variables['content'] = check_markup($node->content['body']['#value'], $node->format, false);
				}
				break;

			case 'resource' :
				break;


			case 'school' :
				$right_col[] = _format_contact_block($node);
				$right_col[] = _format_enrollement_block($node);
				$right_col[] = $variables['right'];
				$variables['right'] = (!empty($right_col)) ? implode("\n", $right_col) : false;
				
				// Banner heading
				$variables['banner'] = false;
				if ($node->field_header_img[0]['filesize'] > 0) {
					$variables['banner'] = theme('image',
						$node->field_header_img[0]['filepath'],
						check_plain($node->field_header_img[0]['data']['alt']),
						check_plain($node->field_header_img[0]['data']['title']),
						array('class' => 'school-banner'),
						false
					);
					$title_color = 'light'; //check_plain($pgm->field_title_color[0]['value']);
					$title_text = trim($node->title);
					$promote_banner = true;
					$variables['banner'] .= _format_banner_title($title_text, $title_color, $promote_banner);
					unset($variables['title']);
				}

				// Programs tabs list
				$variables['program_nav'] = _get_school_programs_list($node->nid, $node);

				// Render content for editor form
				if (arg(0) != 'node' && arg(2) != 'edit') {
					$variables['content'] = check_markup($node->content['body']['#value'], $node->format, false);
				}
				break;
			case 'story' :
				break;
		}
	}
	
	// Breadcrumb
	$variables['breadcrumb'] = theme('breadcrumb', drupal_set_breadcrumb($breadcrumb));
	
	// Meta Breadcrumb
	global $meta_breadcrumb;
	if (preg_match('/<meta name=\"breadcrumb\"/',$variables['head'])) {
		$variables['head'] = preg_replace('/<meta name=\"breadcrumb\" content=\".*\">\n/',"<meta name=\"breadcrumb\" content=\"$meta_breadcrumb\">\n",$variables['head']);
	} else {
		$variables['head'].="<meta name=\"breadcrumb\" content=\"$meta_breadcrumb\" />\n";
	}
	
	//Google site verification. Only needed on site home pages.
	if ($variables['is_front'] === true) {
		$variables['head'] = drupal_set_html_head(drupal_get_html_head() . '<meta name="google-site-verification" content="B0AsmoFuPpN3S6kiJONTkIV1YZUFDJ0haAqhX2tZ7_8" />');
	}
	watchdog('theme', 'Page preprocess: <pre>'.print_r($variables, true)."</pre>\n");
}




/**
 * Template preprocessor: node
 *
 * @see node.tpl.php
 * @see node-page.tpl.php
 * @see node-program.tpl.php
 */
function nscc_coops_preprocess_node(&$variables) {
	$node = $variables['node'];
	
	switch($node->type) {

		case 'functionary' :
			$variables['role'] = ucwords(check_plain($variables['field_role'][0]['value']));
			
			// Photo
			if ($variables['field_photo'][0]['filesize'] > 0) {
				$img_path = $variables['field_photo'][0]['filepath'];
				$img_alt = $variables['field_photo'][0]['data']['alt'];
				$img_title = $variables['field_photo'][0]['data']['title'];
				$img_preset = ($node->sidebar_format) ? 'sidebar-4col' : 'main-5col';
				$variables['photo'] = theme('imagecache', $img_preset, $img_path, $img_alt, $img_title);
			}
			
			$variables['phone'] = _format_phone_num($variables['field_phone'][0]['value']);
			$variables['email'] = valid_email_address($variables['field_email'][0]['value']) ? $variables['field_email'][0]['value'] : false;
			$variables['bio'] = ($node->sidebar_format) ? $node->teaser : check_markup($node->content['body']['#value'], $node->format ,false);
			break;

		case 'page' :
			break;

		case 'program' :
			break;

		case 'resource' :
			break;

		case 'school' :
			break;

		case 'story' :
			break;
	}
	//watchdog('theme', 'Node reprocess: <pre>'.print_r($variables, true)."</pre>\n");
}




/**
 * Template preprocessor: CCK field
 *
 * The $variables array contains the following arguments:
 * - $node
 * - $field
 * - $items
 * - $teaser
 * - $page
 *
 * @see field.tpl.php
 * @see cck-filefield.tpl.php
 */
function nscc_coops_preprocess_content_field(&$variables) {
	$field = $variables['field'];	// field meta-data
	$items = $variables['items'];	// field content
	
	switch ($field['type']) {
		case 'filefield' :
			$variables['template_files'][] = 'cck-filefield';
			break;
		case 'text' :
			if ($field['field_name'] == 'field_emp_phone' || $field['field_name'] == 'field_emp_fax') {
				foreach($items as $key => $values) {
					$variables['items'][$key]['view'] = _format_phone_num($values['value']);
				}
			}
			break;
		case 'email' :
//			watchdog('theme cck', $field['field_name']. " vals:\n<pre>" . print_r($items, true) . '</pre>');
			break;
	}
}




/**
 * Theme override: CCK/FileField
 *
 * Overrides module function in filefield/filefield_formatter.inc to theme a generic single file.
 *
 * @param Array The file-item to be themed
 * @return String Output-ready file link with additional meta-data in a container.
 */
function nscc_coops_filefield_file($file) {
  // Views may call this function with a NULL value, return an empty string.
  if (empty($file['fid'])) {
    return '';
  }

  $path = $file['filepath'];
  $url = file_create_url($path);
  $icon = theme('filefield_icon', $file);

  // Set options as per anchor format described at
  // http://microformats.org/wiki/file-format-examples
  // TODO: Possibly move to until I move to the more complex format described 
  // at http://darrelopry.com/story/microformats-and-media-rfc-if-you-js-or-css
  $options = array(
    'attributes' => array(
      'type' => $file['filemime'] . '; length=' . $file['filesize'],
    ),
  );
  
  $formatted_filesize = format_file_size($file['filesize']);
  $file_desc = !empty($file['data']['description']) ? '<p class="file-description">' . check_plain($file['data']['description']) . '</p>' : '';

  return '<div class="filefield-file">' . $icon . l($file['filename'], $url, $options) . ' <span class="file-size" title="' . number_format($file['filesize']) . ' bytes">(' . $formatted_filesize . ')</span>' . $file_desc . '</div>';
}




/**
 * Theme override: username
 *
 * Overrides core theme function to replace system-username with human-friendly
 * name (first last) from nscc_profile, if available; otherwise, use system-username.
 *
 * @param Object The thing (Node, User) for which we need the associated person's name
 * @return String Output-ready name of person associated with the object
 * @see _nscc_get_nscc_profile_full_name
 */
function nscc_coops_username($object) {

  $name = '';

  if ($object->uid && $object->name) {

    // If profile names are available, use them.
    if ($object->nscc_profile_last_name) {
      $name = check_plain($object->nscc_profile_last_name);
      if ($object->nscc_profile_first_name) {
        $name = check_plain($object->nscc_profile_first_name) . ' ' . $name;
      }
    }
    
    // Otherwise, get a full name from DB.
    elseif (! $name = _nscc_get_nscc_profile_full_name($object->uid)) {
    
      // Fall back to system-username if lookup fails.
      $name = $object->name;

      // Shorten the system-username when it is too long or it will break many tables.
      if (drupal_strlen($name) > 20) { $name = drupal_substr($name, 0, 15) .'...'; }
    }

    // Build link if current user has permission to access user's profile; otherwise, use plain text.
    if (user_access('access user profiles')) {
      $output = l($name, 'users/'. $object->name, array('attributes' => array('title' => t('View user profile.'))));
    } else { $output = check_plain($name); }
  }
  else if ($object->name) {
    // Sometimes modules display content composed by people who are
    // not registered members of the site (e.g. mailing list or news
    // aggregator modules). This clause enables modules to display
    // the true author of the content.
    if (!empty($object->homepage)) {
      $output = l($object->name, $object->homepage, array('attributes' => array('rel' => 'nofollow')));
    } else { $output = check_plain($object->name); }

    $output .= ' ('. t('not verified') .')';
  }
  else { $output = check_plain(variable_get('anonymous', t('Anonymous'))); }

  return $output;
}




/**
 * Helper function: username override
 *
 * Builds a full name (first last) from the data in the nscc_profiles table for the specified user ID.
 *
 * @param int User ID for which we want the names
 * @return String Full name of user associated with the specified ID upon success; FALSE otherwise
 * @see phptemplate_username
 */
function _nscc_get_nscc_profile_full_name($uid) {
  $query = <<<NAME_QUERY
select (
  select v.value
  from people_nscc_profile_values v
  where v.fid=23 and v.uid=%d
)
|| ' ' ||
(
  select v.value
  from people_nscc_profile_values v
  where v.fid=24 and v.uid=%d
);
NAME_QUERY;
  $result = db_result(db_query($query, $uid, $uid));
  $name = trim($result);
  return empty($name) ? false : $name;
}




/**
 * Helper function: theme-asset path
 *
 * Climbs (sub)theme hierarchy looking for the specified file. Alleviates need for each sub-theme to keep its own copy of common assets (e.g. breadcrumb delimiter graphic).
 *
 * @param String Path to the asset relative to theme-directory in which the asset lives
 * @param String Theme item (i.e. registry key) whose theme-paths array is to be examined for specifed asset, default = 'page'
 * @return String complete path (including base_path) to the specified asset.
 * @see nscc_coops_breadcrumb, nscc_coops_preprocess_page
 */
function _path_to_theme_asset($filepath, $reg_key = 'page') {
  if (! $filepath) { return ''; } // bailout if nothing to search for.
  
  $reg = theme_get_registry();
  $theme_paths = $reg[$reg_key]['theme paths'];
  $fullpath = '';
  
  foreach (array_reverse($theme_paths) as $path) {
    $fullpath = $path . '/' . $filepath;
    if (file_exists($fullpath)) {
      return base_path() . $fullpath;
      break;
    }
  }  
  return $fullpath;
}




/**
 * Helper function: Phone number formatting
 *
 * @return String phone # formatted as (AAA) PPP-NNNN xE
 */
function _format_phone_num($mixed_num) {
	$digits = preg_replace('/\D+/', '', $mixed_num);
	$num_digits = strlen($digits);
	switch (true) {
		case $num_digits == 7 :
			return '(206) ' . substr($digits, 0, 3) . '-' . substr($digits, 3);
			break;
		case $num_digits == 10 :
			return '(' . substr($digits, 0, 3) . ') ' . substr($digits, 3, 3) . '-' . substr($digits, 6);
			break;
		case $num_digits > 10 :
			if (strpos($digits, 0) !== 0 && strpos($digits, 1) !== 0) {
				return  '(' . substr($digits, 0, 3) . ') ' . substr($digits, 3, 3) . '-' . substr($digits, 6, 4) . ' x' . substr($digits, 10);
			} else {
				return check_plain($mixed_num);
			}
			break;
		default :
			return check_plain($mixed_num);
	}
}




/**
 * Helper function: File size formatting
 *
 * Cribbed from php doc
 *
 * @return String
 */
function format_file_size($bytes) {
	if ($bytes <= 0) { return false; }
	$units = array(" B", " KB", " MB", " GB", " TB", " PB", " EB", " ZB", " YB");
	return (round($bytes/pow(1024, ($i = floor(log($bytes, 1024))))) . $units[$i]);
}




/**
 *	Helper function: Formats a title for use in the graphical title-banner
 */
function _format_banner_title($title, $color,$promote_banner = false) {
	if($promote_banner){
		$tag = 'h1';
	} else {
		$tag='p';
	}
	$out = '<'.$tag.' class="banner-title-text';
	$out .= !empty($color) ? ' title-color-' . strtolower($color) : '';
	$out .= '">'. check_plain($title) . "</$tag>\n";
	return $out;
}




/**
 *	Helper function: Formats the contact info fields of a School-node into a
 *	pseudoblock for use in the right sidebar of the page.
 *
 *	@param object Node whose fields are to be formatted
 *	@return string HTML formatted output of field data
 */
function _format_contact_block($node) {
	$block_id = strtolower(str_replace(' ', '-', $node->title)).'-contact';
	$heading = (!empty($node->content['group_contact']['group']['#title'])) ? '<h2>'.htmlentities($node->content['group_contact']['group']['#title'], ENT_QUOTES, 'UTF-8', false)."</h2>\n" : '';
	
	// Address
	$adr[] = !empty($node->field_street[0]['value']) ? '<span class="street-address">'.check_markup(nl2br($node->field_street[0]['value']), $node->format, false).'</span>' : '';
	$adr[] = !empty($node->field_locality[0]['value']) ? '<span class="locality">'.check_plain($node->field_locality[0]['value']).'</span>': '';
	$adr[] = !empty($node->field_region[0]['value']) ? '<abbr class="region" title="'.check_plain($node->field_region[0]['value']).'">'.check_plain($node->field_region[0]['value']).'</abbr>': '';
	$adr[] = !empty($node->field_postal_code[0]['value']) ? '<span class="postal-code">'.check_plain($node->field_postal_code[0]['value']).'</span>' : '';
	$address = implode("\n", $adr);
	
	// Pseudoblock
	$block[] = "<div id=\"$block_id\" class=\"block vcard\">\n";
	$block[] = $heading;
	$block[] = '<span class="fn">'.$node->title."</span>\n";
	$block[] = !empty($address) ? "<div class=\"adr\">$address</div>\n" : '';
	$block[] = !empty($node->field_phone[0]['value']) ? '<span class="tel">'._format_phone_num($node->field_phone[0]['value'])."</span>\n" : '';
	$block[] = "</div>\n";
	
	return implode("\n", $block);
}




/**
 *	Helper function: Formats the enrollment info fields of a School-node into a
 *	pseudoblock for use in the right sidebar of the page.
 *
 *	@param object Node whose fields are to be formatted.
 *	@return string HTML formatted output of field data
 */
function _format_enrollement_block($node) {
	$block_id = strtolower(str_replace(' ', '-', $node->title)).'-enrollment';
	$heading = (!empty($node->content['group_enrollment']['group']['#title'])) ? '<h2>'.htmlentities($node->content['group_enrollment']['group']['#title'], ENT_QUOTES, 'UTF-8', false)."</h2>\n" : '';
	$enrollment[] = ($node->field_enrolled[0]['value'] > 0) ? '<li>'.check_plain($node->field_enrolled[0]['value']).' enrolled</li>' : '<li>No enrollments</li>';
	$enrollment[] = ($node->field_openings[0]['value'] > 0) ? '<li>'.check_plain($node->field_openings[0]['value']).' openings</li>' : '<li>Full</li>';
	$enrollment[] = ($node->field_waitlist_length[0]['value'] != 'None') ? '<li>'.check_plain($node->field_waitlist_length[0]['value']).' waitlist</li>' : '<li>No waitlist</li>';
	
	// Pseudoblock
	$block[] = "<div id=\"$block_id\" class=\"block enrollment-info\">\n";
	$block[] = $heading;
	$block[] = '<ul>'.implode("\n", $enrollment)."</ul>\n";
	$block[] = "</div>\n";
	
	return implode("\n", $block);
}




/**
 *	Helper function: Extracts select data for all (published) Programs associated
 *	with the specified school and formats results as an HTML list classed for use
 *	as navigation tabs.
 *
 * @param int The node-id of a School
 * @param object Node currently being rendered
 *	@return string HTML block if items are retrieved; FALSE otherwise
 */
function _get_school_programs_list($school_nid, $node) {
	$sql = <<<PGM_QUERY
		SELECT
			node.nid as nid,
			node.title as title,
			program.field_prog_type_value as program_type,
			url.src as path,
			url.dst as path_alias
		FROM
			devcoops_node node
			JOIN devcoops_content_type_program program
				ON node.nid::integer = program.nid::integer
			JOIN devcoops_content_type_school school
				ON school.nid::integer = program.field_rel_school_nid::integer
			JOIN devcoops_url_alias url
				ON ('node/'::text || program.nid::text) = url.src::text
		WHERE
			school.nid = %d
			AND node.status = %d
		ORDER BY
			program.field_tab_order_value asc
PGM_QUERY;
	$result = db_query($sql, $school_nid, 1);
	if ($result) {
		$list = array();
		while ($row = db_fetch_object($result)) {
			$text = '<span class="tab">'.ucwords($row->program_type).'</span>';
			$atts['html'] = true;
			$atts['title'] = $row->title;
			$link = l($text, $row->path, $atts);
			$list[] = ($row->nid == $node->nid) ? "<li class=\"active\">$link</li>" : "<li>$link</li>";
		}
		if (!empty($list)) {
			// Prepend link to the school - load the school node if needed.
			$school = ($school_nid == $node->nid) ? $node : node_load($school_nid, null, true);
			$text = '<span class="tab">Our School</span>';
			$atts['html'] = true;
			$atts['title'] = $school->title;
			$link = l($text, $school->path, $atts);
			$item = ($school_nid == $node->nid) ? "<li class=\"active\">$link</li>" : "<li>$link</li>";
			array_unshift($list, $item);
			
			// Wrap the items in list markup.
			array_unshift($list, '<div class="tabs"><ul class="clear-block tabs primary">');
			$list[] = '</ul></div>';
		}
		return implode("\n", $list);
	}
	return false;
}