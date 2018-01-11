<?php
// $Id$

/**
 * @file template.php
 *
 * Theme override and template preprocessor functions peculiar to NSCC People profiles
 */



/**
 * Template preprocess: page
 *
 * Adds tab-navigation so visitor can switch between user's profile and blog
 * when accessing an nscc profile. 
 */
function nscc_people_preprocess_page(&$variables) {

	// Add styles for admin and content manager interfaces as needed.
	if (arg(0) == 'admin' || arg(0) == 'manage' || arg(2) == 'edit' || arg(2)=='delete') {
		drupal_add_css(path_to_theme().'/css/people-admin.css', 'theme');
		$admin_accessed = 'true';
	} else {
		$variables['template_files'][] = 'page';
	}
	
	// Page-type mods
	switch(arg(0)) {  
	
		case 'blog' :
			// Format title of blog-entries list. Exclude User/1.
			if (arg(1) > 1 && $name = _nscc_get_nscc_profile_full_name(arg(1))) {
				$pg_title = t("!username's Blog", array('!username' => $name));
				$variables['head_title'] = $pg_title . ' | ' . $variables['site_name'];
				$breadcrumb = array(null, l($name, 'user/' . check_plain(arg(1))));  // 1st item will always be replaced by theme function.
				$variables['breadcrumb'] = theme('breadcrumb', $breadcrumb);
			}
			unset($variables['title']);
			break;
	
	
		case 'user' :
			unset($variables['title']);
			
			// Disabled/blocked account?
			if (!arg(2) && $variables['content'] === 'You are not authorized to access this page.') {
				$variables['content'] = '<div class="inactive-account warning">'
					.	'<p>'
					.	t('This account is currently inactive.')
					.	'</p><p>'
					.	t('The information found here is for archival purposes and may no longer be accurate.')
					.	'</p>'
					.	'</div>';
				$variables['head_title'] = 'Inactive Account | People | NSC';
			}
			break;


		case 'node' :
			// Replace username with real name in breadcrumb when accessing individual blog entries.
			if (! empty($variables['node'])) {
				$node = $variables['node'];
				$name = check_plain($node->name);
				if ($name = _nscc_get_nscc_profile_full_name($node->uid)) {
					$breadcrumb = array(null, l($name, 'users/'.$node->name));  // 1st item will always be replaced by theme function.
					$variables['breadcrumb'] = theme('breadcrumb', $breadcrumb);
				}
				$variables['head_title'] = check_plain($node->title);
				$variables['head_title'] .= !empty($name) ? " | $name | " : ' | ';
				$variables['head_title'] .= $variables['site_name'];
				// Append college abbr to <title>.
				$variables['head_title'] .= strpos($variables['head_title'], '| NSC') === true ? '' : ' | NSC';
			}
			break;
	
	
		case 'tools' :
			$variables['template_files'][] = 'page-tools-simple';
			$variables['template_files'][] = 'page-tools';
			//watchdog('theme', 'Tools page vars: <pre>'.print_r($variables, true)."</pre>\n");
			break;
	
	}

	$variables['styles'] = drupal_get_css();
	//$variables['scripts'] = drupal_get_js();
	//watchdog('people theme', 'People page vars: <pre>'.print_r($variables, true)."</pre>\n");
}



/**
 * Template preprocess: user-profile
 *
 * Tweaks, alters, reformats, and/or suppresses user-profile data before its final output.
 */
function nscc_people_preprocess_user_profile(&$variables) {
  $acct = $variables['account'];  // User object for profile being built.
  
  // Suppress account-history content from profile output. It will just cause undue confusion.
  unset($variables['profile']['summary']);
  
  // Suppress user's photo from inclusion in main content area.
  //It is already output in a block by the nscc_profile module.
  unset($variables['profile']['user_picture']);
  
  // Suppress directory info in main content area since the nscc_profile module
  // already outputs that info in a block below the user's photo.
  unset($variables['profile']['Me']);

  // Change page & content titles if there is a first or last name.
  if (!empty($acct->nscc_profile_last_name) || !empty($acct->nscc_profile_first_name)) {
    $full_name = check_plain($acct->nscc_profile_last_name);
    $full_name = !empty($acct->nscc_profile_middle_name)
      ? check_plain($acct->nscc_profile_middle_name) . ' ' . $full_name
      : $full_name;
    $full_name = check_plain($acct->nscc_profile_first_name) . ' ' . $full_name;
    $full_name .= !empty($acct->nscc_profile_degrees)
      ? ' <span class="degrees">' . check_plain($acct->nscc_profile_degrees) . '</span>'
      : '';
    $full_name = !empty($acct->nscc_profile_title)
      ? '<span class="title">' . check_plain($acct->nscc_profile_title) . '</span> ' . $full_name
      : $full_name;
    drupal_set_title($full_name);
  }

  // Rebuild template's content-output variable for theme-engine processing.
  $variables['user_profile'] = implode($variables['profile']);
  //watchdog('theme', 'Profile vars: <pre>'.print_r($variables,true)."</pre>\n");
}



/**
 * Template preprocess: user-profile-category
 *
 * Adds or alters variables available to the profile-category template,
 * and conditionally selects specialized category template as apropos.
 */
function nscc_people_preprocess_user_profile_category(&$variables) {

  // Add custom attributes to category container element.
  $variables['attributes'] = '';
  $css_class = 'profile-category';
  if (!empty($variables['element']['#title'])) {
    $css_class .= ' ' . $css_class .'_' . str_replace(' ', '-', strtolower(check_plain($variables['element']['#title'])));

    // Use special template for directory info to properly group hCard-encoded items.
    if ($variables['element']['#title'] == 'Me') {
      $variables['template_file'] = 'people-profile-hcard';
      $css_class .= ' vcard';
    }
  }
  if(isset($variables['element']['#attributes']['class'])) {
    $variables['element']['#attributes']['class'] .= ' ' . $css_class;
  } else {
    $variables['element']['#attributes']['class'] = $css_class;
  }
  $variables['attributes'] = drupal_attributes($variables['element']['#attributes']);
  $variables['element']['template_file_name'] = $variables['template_file'];
}



/**
 * Template preprocess: user-profile-item
 *
 * Adds or alters variables available to the profile-items template,
 * and conditionally selects specialized item template as apropos.
 *
 */
function nscc_people_preprocess_user_profile_item(&$variables) {

  // Suppress output of particular profile fields.
  switch ($variables['element']['#title']) {
    case 'Job Title' :
      $variables['suppressed'] = true;
      break;
  }
}



/**
 * Template preprocess: nscc-profile-listing
 *
 * Preps template variables used for displaying lists of abbreviated user-profiles.
 */
function nscc_people_preprocess_nscc_profile_listing(&$variables) {
  $acct = $variables['account'];
  $variables['acct_name'] = check_plain($acct->name);
  
  // Replace account-name with user's real name, if available.
  if (!empty($acct->nscc_profile_last_name) || !empty($acct->nscc_profile_first_name)) {
    $full_name = check_plain($acct->nscc_profile_last_name) . ', ' . check_plain($acct->nscc_profile_first_name);
    if(!empty($acct->nscc_profile_middle_name)) {
      $full_name .= ' ' . check_plain($acct->nscc_profile_middle_name);
    }
    $variables['name'] = l($full_name, 'users/'.$variables['acct_name'],array('html'=>true));
  }
  
  // Add user's job title, if available.
  if (!empty($acct->nscc_profile_job_title)) {
    $variables['job_title'] = check_plain($acct->nscc_profile_job_title);
  }
  
  
  // Replace account-picture with preset from ImageCache, if available.
  if (module_exists('imagecache') && !empty($acct->picture)) {
    $img = theme('imagecache', 'userlist_thumbnail', $acct->picture, $full_name, $full_name);
//    $variables['picture'] = '<div class="picture"><a href="' . $base_path . 'users/'. $variables['acct_name'] . '">' . $img . '</a></div>';
    $variables['picture'] = '<div class="picture"><a href="' . base_path() . 'users/'. $variables['acct_name'] . '">' . $img . '</a></div>';
  }
  
  // Add abbreviated directory info, if available.
  $contact_items = array();
  foreach($variables['fields'] as $obj) {
    switch ($obj->name) {
      case 'nscc_profile_email_address' :
      case 'nscc_profile_phone' :
      case 'nscc_profile_im_address' :
        if (!empty($obj->value)) {
          $label = preg_match('/(\w+)(\s*\w*)*/', $obj->title, $matches) ? check_plain($matches[1]) : check_plain($obj->title);  // First word is adequate.
          $val = check_plain($obj->value);
          $contact_items[] = "<li><span class=\"label label-$label\">$label:</span> $val </li>\n";
        }
        break;
      default :
        // ignore other fields.
    }
  }
  if (!empty($contact_items)) {
    $variables['contacts'] = '<ul>' . implode("\n", $contact_items) . "</ul>\n";
  }
}



/**
 * Template preprocess: node
 *
 * Preps output for node templates.
 */
function nscc_people_preprocess_node(&$variables) {
  $node = $variables['node'];  
  switch($node->type) {  
  
    case 'blog' :
      // Reformat link to author's blog to display their real name, if the link-item exists.
      $name = _nscc_get_nscc_profile_full_name($node->uid);
      $name = (! $name) ? $node->name : $name;
      if ($node->links['blog_usernames_blog']) {
        if (module_exists('pathauto')) { $path = 'blogs/' . $node->name; }
        else { $path = 'blog/' . $node->uid; }
        
        $node->links['blog_usernames_blog'] = array(
          'title' => t("!username's blog", array('!username' => $name)),
          'href' => $path,
          'attributes' => array('title' => t("Read !username's latest blog entries.", array('!username' => $name)))
        );        
        $variables['links'] = theme('links', $node->links);
      }
      break;
  }
  //watchdog('theme', 'Node vars: <pre>'.print_r($variables, true)."</pre>\n");
}
