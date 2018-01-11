<?php
// $Id$

/**
 * @file template.php
 *
 * Theme override and template preprocessor functions for Student Leadership site.
 */





/**
 *	Implementation of HOOK_theme()
 *
 *	This is here mainly to register the comment-form theming function.
 *	@see zen_theme()
 */
function nscc_student_leadership_theme(&$existing, $type, $theme, $path) {
	$hooks = zen_theme($existing, $type, $theme, $path);	//ensure supertheme functions are registered.
	$hooks['comment_form'] = array(
		'arguments' => array('form' => null),
	);
	return $hooks;
}




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
function nscc_student_leadership_breadcrumb($breadcrumb) {
	global $meta_breadcrumb;
	$sitename = variable_get('site_name', null);
	$site_home = l(ucwords($sitename), '<front>');
	$delimiter = ' <img alt="" src="' . base_path().path_to_theme().'/imgs/bullet-crumb.png" /> ';
	$nscc_home = l('NSC', 'https://northseattle.edu/', array('attributes'=>array('title'=>'NSC Homepage')));
	$prod_home = l('NSC', 'https://prod.northseattle.edu', array('attributes'=>array('title'=>'NSC Homepage')));
	$rel_prod_home = l('NSC', '/', array('attributes'=>array('title'=>'NSC Homepage')));
	$stupid_core_prod_home = l('Home', '/');

	if(empty($breadcrumb)){

		if ($sitename == 'NSC') {
			$breadcrumb = array($nscc_home);
		} else{
			$breadcrumb = array($nscc_home,$site_home);
		}		

	} else {
		//non-empty incoming breadcrumb	
		//clear out the stupid core sillyness
		if ($sitename == 'NSC') {
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
	
		if($sitename == 'NSC') {
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
function nscc_student_leadership_node_submitted($node) {
  // Only show for specified nodes.
  switch($node->type) {
    case 'blog' :
    case 'forum' :
    case 'story' :
    	/*	SAC requested suppression of author names - code retained for reference
      return t('@datetime - !username',
        array(
          '!username' => theme('username', $node),
          '@datetime' => format_date($node->created, 'custom', 'M jS Y g:ia'),
        ));
		*/
		//return t('@datetime', array('@datetime' => format_date($node->created, 'custom', 'M jS Y g:ia')));
		return t('@datetime', array('@datetime' => date('D, j M Y', $node->created)));
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
function nscc_student_leadership_comment_submitted($comment) {
	//watchdog('theme', 'Comment <pre>'.print_r($comment, true)."</pre>\n");
	/*	SAC requested suppression of author names - code retained for reference
	return t('@datetime - !username',
		array(
			'!username' => theme('username', $comment),
			'@datetime' => format_date($comment->timestamp, 'custom', 'M jS Y g:ia'),
		));
	*/
	return t('@datetime', array('@datetime' => date('D, j M Y - g:ia', $comment->timestamp)));
}





/**
 * Theme override: menu-local-tasks list
 *
 * Replaces class-attributes of primary local-tasks menus so they can be styled
 * differently. The rest of the code is cribbed from core.
 * @return String Output-ready list of links
 */
function nscc_student_leadership_menu_local_tasks() {
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
function nscc_student_leadership_menu_local_task($link, $active = FALSE) {
  if (! $active || arg(0) == 'admin') { return "<li>$link</li>\n"; }
  if (strpos($link, 'View') === false && strpos($link, 'Edit') === false) { return "<li class=\"active\">$link</li>\n"; }
}





/**
 *	Theme override: comment form
 *
 *	Modifies comment form labeling and user-instructions.
 *	@return string Rendered comment form
 */
function nscc_student_leadership_comment_form($form) {
	$form['_author']['#title'] = t('Comment from');
	$form['_author']['#description'] = t('To encourage free discussion your name will not be publicly displayed. However, we know who you are so keep things civil. Be aware that disciplinary actions may result from inappropriateness, threats, and violations of college policies.');
	return drupal_render($form);
}





/**
 * Theme override: CCK/FileField
 *
 * Overrides module function in filefield/filefield_formatter.inc to theme a generic single file.
 *
 * @param Array The file-item to be themed
 * @return String Output-ready file link with additional meta-data in a container.
 */
function nscc_student_leadership_filefield_file($file) {
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
function nscc_student_leadership_username($object) {

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
 * Theme override: "more" link
 *
 * Overrides core theme function to have (somewhat) better control of the "more"
 *	link that appears after some content items. Used here mainly to modify the
 *	one generated by Aggregator module.
 *
 * @param string URL the link should point to
 *	@param string Text to use for the link's title attribute
 * @return String Themed link
 *	@see theme_more_link()
 */
function nscc_student_leadership_more_link($url, $title) {
	if (stripos($url, 'aggregator') !== false) { return ''; }	//suppress "more" link inserted by Aggregator in blocks.
	return '<div class="more-link">' . t('<a href="@link" title="@title">more</a>', array('@link' => check_url($url), '@title' => $title)) . '</div>';
}





/**
 * Template preprocessor: search-block-form
 *
 * @see search-block-form.tpl.php
 */
function nscc_student_leadership_preprocess_search_block_form(&$variables) {
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
function nscc_student_leadership_preprocess_page(&$variables) {

	$node = $variables['node'];
	
	// Add admin/editor UI styles as needed.
	// This seems convoluted, but drupal_add_css() alone fails to load stylesheet.
	// Code was cribbed from http://drupal.org/node/225868
	if (arg(0) == 'admin' || (arg(0) == 'node' && arg(2) == 'edit')) {
		$admin_css = path_to_theme('nscc_student_leadership') .'/css/nscc_student_leadership-admin.css';
		drupal_add_css($admin_css, 'theme', 'all', false);
		$variables['css']['all']['theme'][$admin_css] = 1;	// <- this seems to be the critical part.
		$variables['styles'] = drupal_get_css();
	}

	// Extend template suggestions to account for existence of page-templates for custom node-types.
	if (! empty($node->type)) {
		$variables['template_files'][] = 'page-node-' . $node->type;
	}
	
	// Append college abbr to <title>.
	$variables['head_title'] .= strpos($variables['head_title'], '| NSC') === true ? '' : ' | NSC';
	
	// Force IE (7,8,9) to use its most standards-compliant rendering mode.
	//$variables['head'] .= '<meta http-equiv="X-UA-Compatible" content="IE=edge">' . "\n";
	//watchdog('ie-testing', 'Vars: <pre>'.print_r($variables, true)."</pre>");
	
	
	// Node-specific mods.
	if ($node) {
		switch ($node->type) {


			case 'club' :
				break;


			case 'page' :
				break;


			case 'slide' :
				break;


			case 'story' :
				break;


			case 'student_leader' :
				unset($variables['title']);	// suppress Drupal's standard title; handled by node template.
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

	// Front page mods.
	if ($variables['is_front'] === true) {
	
		// Search engine site verifications.
		$variables['head'] = drupal_set_html_head(drupal_get_html_head()
			. '<meta name="google-site-verification" content="B0AsmoFuPpN3S6kiJONTkIV1YZUFDJ0haAqhX2tZ7_8" />' . "\n"
			. '<meta name="y_key" content="06e0f8a70794511c" />' . "\n"
			. '<meta name="msvalidate.01" content="EDD9918CFF3255DF3A2107ADE297AB14" />'
		);

		unset($variables['title']);	// suppress Drupal's standard title for front page node.
	}
	//watchdog('theme', 'Page preprocess: <pre>'.print_r($variables, true)."</pre>\n");
	//watchdog('theme', 'Menu Active Trail: <pre>'.print_r(menu_get_active_trail(), true)."</pre>\n");
	//watchdog('theme', 'Menu Item: <pre>'.print_r(menu_get_item(),true)."</pre>\n");
}





/**
 * Template preprocessor: node
 *
 * @see node.tpl.php
 * @see node-slide.tpl.php
 *	@see node-story.tpl.php
 * @see node-student_leader.tpl.php
 */
function nscc_student_leadership_preprocess_node(&$variables) {
	$breadcrumb = drupal_get_breadcrumb();	//node mods will alter as needed.
	$node = $variables['node'];
	
	switch($node->type) {


		case 'club' :
			$club_links[] = (! empty($variables['field_email'][0]['email'])) ? '<li>'.l($variables['field_email'][0]['email'], 'mailto:'.$variables['field_email'][0]['email'], array('external'=>true, 'attributes'=>array('class'=>'email contact-link'))).'</li>' : '';
			if (! empty($variables['field_club_url'][0]['value'])) {
				$url = (strpos('http', $variables['field_club_url'][0]['value']) !== false) ? $variables['field_club_url'][0]['value'] : 'http://'.$variables['field_club_url'][0]['value'];
				$club_links[] = '<li>'.l($url, $url, array('external'=>true, 'attributes'=>array('class'=>'url'))).'</li>';
			}
			
			$variables['club_links'] = (!empty($club_links)) ? '<ul>'.implode("\n", $club_links)."</ul>\n" : '';
			
			$cal = _format_calendar($variables['field_club_calendar'][0]['value'], 'agenda_embed_sidebar');
			$variables['calendar_embed'] = ($cal) ? '<h2>Upcoming Events</h2>'.$cal : '';

			$variables['description'] = check_markup($node->content['body']['#value'], $node->format, false);
			break;


		case 'page' :
			// Embed calendar in node content if URL and mode have been specified,
			// and the node is being built for page-rendering.
			if (! (empty($variables['field_calendar_url'][0]['url']) || empty($variables['field_cal_default_view'][0]['value'])) && $variables['page']) {
				$variables['content'] .= _format_calendar($variables['field_calendar_url'][0]['url'], $variables['field_cal_default_view'][0]['value']);
			}
			//watchdog('theme', 'Node vars: <pre>'.print_r($variables, true)."</pre>\n");
			break;


		case 'program' :
			break;


		case 'slide' :
			$variables['slide_link_attr'] = drupal_attributes(array('href'=>check_url($variables['field_slide_link'][0]['url']), 'title'=>$node->title)); 
			$variables['photo'] = $variables['field_slide_photo'][0]['view'];
			$colorpath = base_path().path_to_theme().'/imgs/slidecolor-'.strtolower($node->field_slide_bgcolor[0]['value']).'.png';
			$variables['classes'] .= ' slide';
			$variables['content_attr'] = drupal_attributes(array('style'=>'background: transparent url('.$colorpath.') top right no-repeat','class'=>'slide-content'));
			$variables['content']	 =	check_markup($node->body, $node->format);
			$variables['slide_navigation'] = ''; //later will have stuff
			break;	 


		case 'student_leader' :
			$variables['leader_name'] = $node->title;
			$variables['classes'] = !empty($variables['classes']) ? $variables['classes'].' vcard' : 'vcard';
			$variables['photo_caption'] = check_plain($variables['field_photo'][0]['data']['description']);
			$variables['bio'] = check_markup($node->content['body']['#value'], $node->format, false);
			$email_addr = check_plain($variables['field_email'][0]['email']);
			$variables['email_addr'] = l($email_addr, "mailto:$email_addr", array('absolute'=>true, 'attributes'=>array('class'=>'email')));

			// List of roles for this SL
			$roles = array();
			$rcount = count($variables['field_member_type']);
			while($rcount > 0) {
				$role = $variables['field_member_type'][$rcount-1];
				if (! empty($role['view'])) {
					$rname = $role['view'];
					
					// Format as link to corresponding list-page generated by Views module.
					switch ($role['value']) {
						case 'sac':
							$rname = '<a href="/sac-members-list" title="List of SAC members">'.$role['view'].'</a>';
							break;
						case 'fee_board':
							$rname = '<a href="/fee-board-members" title="List of Fee Board members">'.$role['view'].'</a>';
							break;
						case 'cabinet':
							$rname = '<a href="/cabinet-members" title="List of Cabinet members">'.$role['view'].'</a>';
							break;
						case 'arts_lectures':
							$rname = '<a href="/arts-lectures-members" title="List of Arts &amp; Lectures Board members">'.$role['view'].'</a>';
							break;
						case 'research_advoc':
							$rname = '<a href="/research-advocacy-members" title="List of Research &amp; Advocacy Committee members">'.$role['view'].'</a>';
							break;
					}
					if ($rcount == 1) {
						$roles[] = '<li class="role">'.$rname.'</li>';
					} else {
						$roles[] = '<li class="role">'.$rname.',</li>';
					}
				}
				$rcount--;
			}
			if (count($roles) > 0) {
				$variables['roles'] = '<ul>'.implode("\n", $roles).'</ul>';
			}

			// Template vars when rendered by a View
			if ($variables['view']->name == 'people_lists') {
				unset($variables['links']);

				// Append "more…" link to bio.
				if ( !empty($variables['bio']) ) {
					$variables['full_bio_link'] = '<p>'.l('more…', $variables['path'], array('attributes'=>array('title'=>'Full biography for '.$variables['title'], 'class'=>'full-bio-link more-link'), 'alias'=>true)).'</p>';
				}

				// Photo formatting
				if ($variables['field_photo'][0]['filesize'] > 0) {
					$variables['photo_img'] = theme(
						'imagecache',
						'2col',
						$variables['field_photo'][0]['filepath'],
						$variables['field_photo'][0]['data']['alt'],
						$variables['field_photo'][0]['data']['title'],
						array('class'=>'photo'),
						true
					);
				} else {
					$variables['photo_img'] = theme(
						'imagecache',
						'2col',
						path_to_theme().'/imgs/no-photo-available.png',
						'No photo available',
						'',
						array('class'=>'photo'),
						true
					);
				}
				//watchdog('theme', 'People list node (vars): <pre>'.print_r($variables, true)."</pre>\n");

			// Template vars when rendered by Core
			} else {
				$variables['position'] = $variables['field_title'][0]['view'];
				if ($variables['field_photo'][0]['filesize'] > 0) {
					$variables['photo_img'] = theme(
							'imagecache',
							'3col',
							$variables['field_photo'][0]['filepath'],
							$variables['field_photo'][0]['data']['alt'],
							$variables['field_photo'][0]['data']['title'],
							array('class'=>'photo'),
							true
					);
				} else {
					$variables['photo_img'] = theme(
						'imagecache',
						'3col',
						path_to_theme().'/imgs/no-photo-available.png',
						'No photo available',
						'',
						array('class'=>'photo'),
						true
					);
				}
			}
			//watchdog('theme', 'Functionary node preprocess (vars): <pre>'.print_r($variables, true)."</pre>\n");
			break;


		case 'story' :
			if (! $variables['is_front']) {
				$breadcrumb[] = l('Articles', 'articles', array('alias'=>true, 'attributes'=>array('title'=>'Articles and Reports')));
			}
			//watchdog('theme', 'Node preprocess (vars): <pre>'.print_r($variables, true)."</pre>\n");
			//watchdog('theme', 'Breadcrumb: <pre>'.print_r($breadcrumb, true)."</pre>\n");
			break;


	}
	drupal_set_breadcrumb($breadcrumb);
	//watchdog('theme', 'Node preprocess (vars): <pre>'.print_r($variables, true)."</pre>\n");
}





/**
 * Template preprocessor: block
 *
 * @see block.tpl.php
 */
function nscc_student_leadership_preprocess_block(&$variables) {
	$block = $variables['block'];
	
	switch ($block->module) {
		case 'aggregator' :
			// Aggregator inserts a "more" link after it themes a feed block, but
			// does not expose a method to suppress or alter it conveniently. We are
			// suppressing it in the theme-override for more_link(), but we want a
			// "subscribe" link instead that points to news rather than Aggregator's
			// standard listing page. So, we retrieve the feed URL and build it here.
			if (preg_match('/(\d+)/', $block->delta, $match)) {
				$feed_url = null;
				$result = db_query('SELECT * FROM {aggregator_feed} WHERE fid = %d', $match[1]);
				while ($record = db_fetch_object($result)) {
					$feed_url = $record->url;
				}
				$variables['feed_url'] = $feed_url;
				$variables['subscribe_link'] = l('Subscribe', $feed_url, array('external' => true, 'attributes' => array('class' => 'link-rss rss feed')));
				$variables['edit_links'] = $variables['subscribe_link'];
			}
			//watchdog('theme', 'Block vars: <pre>'.print_r($variables, true)."</pre>\n");
			break;
	}
	//watchdog('theme', 'Block vars: <pre>'.print_r($block, true)."</pre>\n");
}





/**
 *	Template preprocessor: comment
 *
 *	@see comment.tpl.php
 */
function nscc_student_leadership_preprocess_comment(&$variables) {
	$comment = $variables['comment'];
	$variables['date'] = theme('comment_submitted', $comment);
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
function nscc_student_leadership_preprocess_content_field(&$variables) {
	$field = $variables['field'];	// field meta-data
	$items = $variables['items'];	// field content
	$node = $variables['node'];
	
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
			//watchdog('theme cck', $field['field_name']. " vals:\n<pre>" . print_r($items, true) . '</pre>');
			break;
	}
}





/**
 *	Template preprocessor: Forum icon
 *
 *	Replaces standard icons used to indicate topic-status with nicer ones.
 *	@see forum-icon.tpl.php
 */
function nscc_student_leadership_preprocess_forum_icon(&$variables) {
	$icon['path'] = path_to_theme().'/imgs/icons/silk/';
	
	switch ($variables['icon']) {

		case 'closed' :
			$icon['path'] .= 'email_delete.png';
			$icon['title'] = 'Discussion closed';
			$icon['alt'] = 'Status: closed';
			break;

		case 'hot' :
			$icon['path'] .= 'comments.png';
			$icon['title'] = 'Hot topic';
			$icon['alt'] = 'Status: hot';
			break;

		case 'hot-new' :
			$icon['path'] .= 'comments_orange.png';
			$icon['title'] = 'Hot new topic';
			$icon['alt'] = 'Status: new, hot';
			break;

		case 'new' :
			$icon['path'] .= 'new.png';
			$icon['title'] = 'New topic';
			$icon['alt'] = 'Status: new';
			break;

		case 'sticky' :
			$icon['path'] .= 'flag_green.png';
			$icon['title'] = 'Important';
			$icon['alt'] = 'Status: important';
			break;

		default :
			$icon['path'] .= 'email.png';
			$icon['title'] = 'Discussion open';
			$icon['alt'] = 'Status: open';

	}

	$icon['view'] = theme('image', $icon['path'], $icon['alt'], $icon['title']);
	$variables['icon'] = $icon;
}





/**
 *	Template preprocessor: Views table
 *
 *	Adds additional classes to specific Views rendered as tables.
 */
function nscc_student_leadership_preprocess_views_view_table(&$variables) {
	$view = $variables['view'];

	switch ($view->name) {

		case 'articles' :
			$classes = 'table-plain articles-listing';
			$variables['class'] = ! empty($variables['class']) ? $variables['class'] . " $classes" : $classes;
			break;

	}
	//watchdog('theme', 'Views table vars: <pre>'.print_r($variables, true)."</pre>\n");
}





/**
 *	Template preprocessor: Views list
 *
 *	Adds additional classes to specific Views rendered as lists.
 */
function nscc_student_leadership_preprocess_views_view_list(&$variables) {
	$view = $variables['view'];

	switch ($view->name) {
	
		case 'people_lists' :
			$classes = 'item-list functionary-list';
			$variables['list_classes'] = ! empty($variables['list_classes']) ? $variables['list_classes'] . " $classes" : $classes;
			//watchdog('theme', 'Views list preproc vars <pre>'.print_r($variables, true)."</pre>\n");
			break;
	
	}
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
 * @see nscc_student_leadership_breadcrumb, nscc_student_leadership_preprocess_page
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
 * Cribbed from php.net doc
 * @return String
 */
function format_file_size($bytes) {
	if ($bytes <= 0) { return false; }
	$units = array(" B", " KB", " MB", " GB", " TB", " PB", " EB", " ZB", " YB");
	return (round($bytes/pow(1024, ($i = floor(log($bytes, 1024))))) . $units[$i]);
}





/**
 *	Helper function: Title banner
 *
 *	Formats a title for use in the graphical title-banner
 *	@return string 
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
 *	Helper function: Embeded calendar
 *
 *	Creates a preconfigured calendar embed for the specified NetID calendar ICAL URL
 *	@param string URL to the ICAL variant of the Google-hosted NetID calendar to embed
 *	@param string Embed configuration option
 *	@return string Output-ready HTML snippet
 */
function _format_calendar($url,$embed_type='default'){
	if(check_url($url)){
		switch($embed_type){

			case 'subscribe_link':
				return l('Subscribe to Calendar',preg_replace("/^http:\/\//",'webcal://',$url));	
				break;

			case 'agenda_embed':
				if( preg_match('/^http:\/\/www.google.com\/calendar\/ical\/(northseattle\.edu_.+group\.calendar\.google\.com)\/public\/basic\.ics$/',$url,$matches) ){
					return '<div class="embedded_calendar"><iframe src="https://www.google.com/calendar/hosted/northseattle.edu/embed?showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=AGENDA&amp;height=300&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src='.$matches[1].'&amp;color=%23AB8B00&amp;ctz=America%2FLos_Angeles" style=" border-width:0 " width="540" height="480" frameborder="0" scrolling="no"></iframe></div>'; 
				}
				break;

			case 'agenda_view_default':
				if( preg_match('/^http:\/\/www.google.com\/calendar\/ical\/(northseattle\.edu_.+group\.calendar\.google\.com)\/public\/basic\.ics$/',$url,$matches) ){
					return '<div class="embedded_calendar"><iframe src="https://www.google.com/calendar/hosted/northseattle.edu/embed?mode=AGENDA&amp;showCalendars=0&amp;height=480&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src='.$matches[1].'&amp;color=%23AB8B00&amp;ctz=America%2FLos_Angeles" style=" border-width:0 " width="540" height="480" frameborder="0" scrolling="no"></iframe></div>'; 
				}
				break;

			case 'agenda_embed_sidebar':
				if( preg_match('/^http:\/\/www.google.com\/calendar\/ical\/(northseattle\.edu_.+group\.calendar\.google\.com)\/public\/basic\.ics$/',$url,$matches) ){
					return '<div class="embedded_calendar"><iframe src="https://www.google.com/calendar/hosted/northseattle.edu/embed?showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=AGENDA&amp;height=300&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src='.$matches[1].'&amp;color=%23AB8B00&amp;ctz=America%2FLos_Angeles" style=" border-width:0 " width="300" height="400" frameborder="0" scrolling="no"></iframe></div>'; 
				}
				break;

			case 'monthview_embed':
				if( preg_match('/^http:\/\/www.google.com\/calendar\/ical\/(northseattle\.edu_.+group\.calendar\.google\.com)\/public\/basic\.ics$/',$url,$matches) ){
					return '<div class="embedded_calendar"><iframe src="https://www.google.com/calendar/hosted/northseattle.edu/embed?showTitle=0&amp;showCalendars=0&amp;showTz=0&amp;height=500&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src='.$matches[1].'&amp;color=%23AB8BFF&amp;ctz=America%2FLos_Angeles" style=" border-width:0 " width="460" height="540" frameborder="0" scrolling="no"></iframe></div>'; 
				}
				break;

			case 'month_view_default':
				if( preg_match('/^http:\/\/www.google.com\/calendar\/ical\/(northseattle\.edu_.+group\.calendar\.google\.com)\/public\/basic\.ics$/',$url,$matches) ){
					return '<div class="embedded_calendar"><iframe src="https://www.google.com/calendar/hosted/northseattle.edu/embed?showCalendars=0&amp;height=480&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src='.$matches[1].'&amp;color=%23AB8BFF&amp;ctz=America%2FLos_Angeles" style=" border-width:0 " width="540" height="480" frameborder="0" scrolling="no"></iframe></div>'; 
				}
				break;

			case 'week_view_default':
				if( preg_match('/^http:\/\/www.google.com\/calendar\/ical\/(northseattle\.edu_.+group\.calendar\.google\.com)\/public\/basic\.ics$/',$url,$matches) ){
					return '<div class="embedded_calendar"><iframe src="https://www.google.com/calendar/hosted/northseattle.edu/embed?mode=WEEK&amp;showCalendars=0&amp;height=480&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src='.$matches[1].'&amp;color=%23AB8BFF&amp;ctz=America%2FLos_Angeles" style="border-width:0;" width="540" height="480" frameborder="0" scrolling="no"></iframe></div>'; 
				}
				break;

			case 'monthview_embed_program':
				if( preg_match('/^http:\/\/www.google.com\/calendar\/ical\/(northseattle\.edu_.+group\.calendar\.google\.com)\/public\/basic\.ics$/',$url,$matches) ){
					return '<div class="embedded_calendar"><iframe src="https://www.google.com/calendar/hosted/northseattle.edu/embed?showTitle=0&amp;showCalendars=0&amp;showTz=0&amp;height=500&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src='.$matches[1].'&amp;color=%23AB8BFF&amp;ctz=America%2FLos_Angeles" style=" border-width:0 " width="540" height="540" frameborder="0" scrolling="no"></iframe></div>'; 
				}
				break;

			case 'default' :
			default :
				return false;
		}
	}
	return false;
}
