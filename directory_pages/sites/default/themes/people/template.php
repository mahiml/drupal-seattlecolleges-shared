<?php
// $Id$

/**
 * @file
 * Theme override and template preprocessor functions for NSCC People profiles
 */



/**
 * Theme override: breadcrumb
 *
 * @param $breadcrumb Array pre-rendered link-elements for breadcrumb
 * @return String Output-ready breadcrumb
 */
function phptemplate_breadcrumb($breadcrumb) {
  if (! empty($breadcrumb)) {
  
    // Replace default 'Home' link.
    $breadcrumb[0] = l('People', '<front>');

    // Prepend link to main NSCC homepage.
    $opts['attributes'] = array('title'=>'NSCC Homepage');
    $nscc_home = l('NSCC', 'http://www.northseattle.edu/', $opts);
    array_unshift($breadcrumb, $nscc_home);

    return implode(' » ', $breadcrumb);
  }
}



/**
 * Template preprocess: page
 *
 * Adds tab-navigation so visitor can switch between user's profile and blog
 * when accessing an nscc profile. 
 */
function phptemplate_preprocess_page(&$variables) {
  switch(arg(0)) {
  
    
    case 'blog' :
      // Format title of blog-entries list. Exclude User/1.
      if (arg(1) > 1 && $name = _nscc_get_nscc_profile_full_name(arg(1))) {
        $pg_title = t("!username's Blog", array('!username' => $name));
        $variables['head_title'] = $pg_title . ' | ' . $variables['site_name'];
        $breadcrumb = array(null, l($name, 'user/' . check_plain(arg(1))));  // 1st item will always be replaced by theme function.
        $variables['breadcrumb'] = theme('breadcrumb', $breadcrumb);
      }
      
    
    case 'user' :
      // Also, suppress content-title for both blog entries-list and profile.
      unset($variables['title']);
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
        $variables['head_title'] = check_plain($node->title) . " | $name | " . $variables['site_name'];
      }
      break;
  }
  
  /* Dump page variables (Dev Only)
  $variables['dump_var'] = print_r($variables, 1)."\narg(0) = ".arg(0)."\narg(1) = ".arg(1);
  */
}



/**
 * Template preprocess: user-profile
 *
 * Tweaks, alters, reformats, and/or suppresses user-profile data before its final output.
 */
function phptemplate_preprocess_user_profile(&$variables) {
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

  /* Dump page variables (Dev Only)
  $variables['dump_var'] = print_r($variables, 1)."\narg(0) = ".arg(0)."\narg(1) = ".arg(1);
  */
}



/**
 * Template preprocess: user-profile-category
 *
 * Adds or alters variables available to the profile-category template,
 * and conditionally selects specialized category template as apropos.
 */
function phptemplate_preprocess_user_profile_category(&$variables) {

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
function phptemplate_preprocess_user_profile_item(&$variables) {
  switch ($variables['element']['#title']) {
    case 'Title' :
    case 'First Name' :
    case 'Middle Name or Initials' :
    case 'Last Name' :
    case 'Degrees' :
    case 'Email Address' :
    case 'Phone Number' :
    case 'IM' :
    case 'Office' :
    case 'Office Hours' :
    case 'Mailstop' :
    case 'Public Calendar URL' :
    case 'Job Title' :
      $variables['template_file'] = 'people-profile-hcard-item';
      break;
  }
}



/**
 * Template preprocess: nscc-profile-listing
 *
 * Preps template variables used for displaying lists of abbreviated user-profiles.
 */
function phptemplate_preprocess_nscc_profile_listing(&$variables) {
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
    $variables['picture'] = '<div class="picture"><a href="' . $base_path . 'users/'. $variables['acct_name'] . '">' . $img . '</a></div>';
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
  
  

  /* Dump page variables (Dev Only)
  $variables['dump_var'] = print_r($variables, 1)."\narg(0) = ".arg(0)."\narg(1) = ".arg(1);
  */
}



/**
 * Template preprocess: block
 *
 * Preps specific blocks for theme output.
 */
function phptemplate_preprocess_block(&$variables) {
  $block = $variables['block'];
  if ($variables['is_front'] && $block->region == 'content') {
    $variables['template_files'][] = 'people-front-main-block';
  }
}



/**
 * Template preprocess: node
 *
 * Preps output for node templates.
 */
function phptemplate_preprocess_node(&$variables) {
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
}



/**
 * Theme override: username
 *
 * Overrides core theme function to replace system-username with human-friendly
 * name (first last) from nscc_profile, if available; otherwise, use system-username.
 * @param Object The thing (Node, User) for which we need the associated person's name
 * @return String Output-ready name of person associated with the object
 */
function phptemplate_username($object) {

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
 * Helper function: theme_username override
 *
 * Builds a full name (first last) from the data in the nscc_profiles table for the specified user ID.
 * @param int User ID for which we want the names
 * @return String Full name of user associated with the specified ID upon success; FALSE otherwise
 */
function _nscc_get_nscc_profile_full_name($uid) {
  $query = <<<NAME_QUERY
select (
  select v.value
  from {nscc_profile_values} v
  where v.fid=23 and v.uid=%d
)
|| ' ' ||
(
  select v.value
  from {nscc_profile_values} v
  where v.fid=24 and v.uid=%d
);
NAME_QUERY;
  $result = db_result(db_query($query, $uid, $uid));
  $name = trim($result);
  return empty($name) ? false : $name;
}



