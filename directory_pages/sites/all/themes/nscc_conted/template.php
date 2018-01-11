<?php
// $Id$

/**
 * @file template.php
 *
 * Theme override and template preprocessor functions for Conted site.
 */





/**
 * Implementation of HOOK_theme().
 */
function nscc_conted_theme(&$existing, $type, $theme, $path) {
	$hooks = zen_ninesixty_theme($existing, $type, $theme, $path);
	$hooks['instructor_for_sidebar'] = array(
		'template' => 'instructor-for-sidebar',
		'arguments' => array('instructor' => null),
	);
	$hooks['course_sections'] = array(
		'template' => 'course-sections',
		'arguments' => array(
			'course' => null,
			'sections_only' => null
		),
	);
	$hooks['class_section_hcal'] = array(
		'template' => 'class-section-hcal',
		'arguments' => array(
			'class' => null,
		),
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
function nscc_conted_breadcrumb($breadcrumb) {
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
function nscc_conted_node_submitted($node) {
	//watchdog('ce theme', 'node: <pre>'.print_r($node,true)."</pre>\n");
	// Only show for specified nodes.
	switch($node->type) {
		case 'blog' :
		case 'forum' :
		case 'story' :
			$author = ($node->field_auth_name_override[0]['value']) ? check_plain($node->field_auth_name_override[0]['value']) : theme('username', $node);
			$posted = date('M jS Y g:ia', $node->created);
			$updated = ($node->created !== $node->changed) ? date('M jS Y g:ia', $node->changed) : '';
			if ($updated) {
				return t('@posted — !author (revised: @updated)', array(
					'!author' => $author,
					'@posted' => $posted,
					'@updated' => $updated,
				));
			} else {
				return t('@posted — !author', array(
					'!author' => $author,
					'@posted' => $posted,
				));
			}
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
function nscc_conted_comment_submitted($comment) {
  return t('@datetime - !username',
	array(
	  '!username' => theme('username', $comment),
	  '@datetime' => date('M jS Y g:ia', $comment->timestamp),
	));
}





/**
 * Theme override: menu-local-tasks list
 *
 * Replaces class-attributes of primary local-tasks menus so they can be styled
 * differently. The rest of the code is cribbed from core.
 * @return String Output-ready list of links
 */
function nscc_conted_menu_local_tasks() {
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
function nscc_conted_menu_local_task($link, $active = FALSE) {
  if (! $active || arg(0) == 'admin') { return "<li>$link</li>\n"; }
  if (strpos($link, 'View') === false && strpos($link, 'Edit') === false) { return "<li class=\"active\">$link</li>\n"; }
}





/**
 * Theme override: CCK/FileField
 *
 * Overrides module function in filefield/filefield_formatter.inc to theme a generic single file.
 *
 * @param Array The file-item to be themed
 * @return String Output-ready file link with additional meta-data in a container.
 */
function nscc_conted_filefield_file($file) {
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
function nscc_conted_username($object) {
	$name = '';
	if ($object->uid && $object->name) {

		// If profile names are available, use them.
		if ($object->nscc_profile_last_name) {
			$name = check_plain($object->nscc_profile_last_name);
			if ($object->nscc_profile_first_name) {
				$name = check_plain($object->nscc_profile_first_name) . ' ' . $name;
			}

		// Otherwise, get a full name from DB.
		} elseif (! $name = _nscc_get_nscc_profile_full_name($object->uid)) {
	
			// Fall back to system-username if lookup fails.
			$name = $object->name;
	
			// Shorten the system-username when it is too long or it will break many tables.
			if (drupal_strlen($name) > 20) {
				$name = drupal_substr($name, 0, 15) .'…';
			}
		}
	
		// Build link if current user has permission to access user's profile; otherwise, use plain text.
		if (user_access('access user profiles')) {
			$output = l($name, 'users/'. $object->name, array('attributes' => array('title' => t('View user profile.'))));
		} else {
			$output = check_plain($name);
		}

	} else if ($object->name) {
		// Sometimes modules display content composed by people who are
		// not registered members of the site (e.g. mailing list or news
		// aggregator modules). This clause enables modules to display
		// the true author of the content.
		if (!empty($object->homepage)) {
			$output = l($object->name, $object->homepage, array('attributes' => array('rel' => 'nofollow')));
		} else {
			$output = check_plain($object->name);
		}
		$output .= ' ('. t('not verified') .')';

	} else {
		$output = check_plain(variable_get('anonymous', t('Anonymous')));
	}
	
	return $output;
}





/**
 * Template preprocessor: page
 *
 * @see page.tpl.php
 * @see page-front.tpl.php
 */
function nscc_conted_preprocess_page(&$variables, $hook) {

	global $meta_breadcrumb;
	$breadcrumb = drupal_get_breadcrumb();
	$node = $variables['node'];
	//$addl_head_elems = array();
	$head_elems = explode("\n", drupal_get_html_head());
	//watchdog('ce theme', 'Initial Head elements:<pre>'.print_r($head_elems,true)."</pre>\n");
	
	// Add admin/editor UI styles as needed.
	// This seems convoluted, but drupal_add_css() alone fails to load stylesheet.
	// Code was cribbed from http://drupal.org/node/225868
	if (arg(0) == 'admin' || (arg(0) == 'node' && arg(2) == 'edit') || (arg(0) == 'node' && arg(1) == 'add')) {
		$admin_css = drupal_get_path('theme', 'nscc_conted') .'/css/nscc_conted-admin.css';
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
	//$addl_head_elems[] = '<meta http-equiv="X-UA-Compatible" content="IE=edge">';
	$head_elems[] = '<meta http-equiv="X-UA-Compatible" content="IE=edge">';
	//watchdog('ie-testing', 'Vars: <pre>'.print_r($variables, true)."</pre>");
	
	
	// Node-specific mods.
	if ($node) {
		switch ($node->type) {


			case 'page' :
				break;


			case 'story' :
				break;


			case 'course' :
				
				// Sidebar - scheduled classes
				//foreach ($node->ce_course_items as $class) {
				//	//TODO: theme each class for sidebar display: dates, time, location, days, session-count
				//	$sched_classes[] = theme('class_for_sidebar', $class);
				//}
				//if (! empty($sched_classes)) {
				//	$sched_classes = implode("\n", $sched_classes);
				//	$variables['right'] .= "<div class=\"scheduled-classes\"><h2>Classes</h2>\n$sched_classes</div>";
				//	$variables['layout'] = 'both';
				//}
				
				// Sidebar - instructors
				foreach ($node->field_instructors as $instr) {
					$instr_node = node_load($instr['nid']);
					$instructors[] = theme('instructor_for_sidebar', $instr_node);
					//watchdog('ce theme', 'Instructor node (pg sidebar): <pre>'.print_r($instr_node, true)."</pre>\n" );
				}
				if (! empty($instructors)) {
					$heading = (count($instructors) > 1) ? '<h2>Instructors</h2>' : '<h2>Instructor</h2>';
					$instructors = implode("\n", $instructors);
					$variables['right'] .= "<div class=\"course-instructors\">$heading\n$instructors</div>";
					$variables['layout'] = 'both';
				}
				
				//watchdog('ce theme', 'Course page vars: <pre>'.print_r($variables, true)."</pre>\n");
				break;
		}
	}


	// Breadcrumb (exclude from front page)
	$variables['breadcrumb'] = (!$variables['is_front']) ? theme('breadcrumb', drupal_set_breadcrumb($breadcrumb)) : '';


	// Meta Breadcrumb
	//$addl_head_elems[] = "<meta name=\"breadcrumb\" content=\"$meta_breadcrumb\" />";
	$head_elems[] = "<meta name=\"breadcrumb\" content=\"$meta_breadcrumb\" />";


	// Front page uniqification
	if ($variables['is_front'] === true) {
		$variables['slideshow'] = views_embed_view('slideshow', 'default');
		$variables['sched_promo'] = theme('node', _get_schedule_promo());
		//$variables['course_categories'] = _get_fp_categories();
		//$variables['course_changes'] = $course_changes->execute_display('block_1');
		//$variables['course_changes'] = views_embed_view('course_changes', 'block_1');
		//$variables['latest_articles'] = views_embed_view('conted_news', 'block_1');
		$variables['latest_articles'] = views_embed_view('blog_archive', 'block_1');
		
		// Social network badge links
		$soc_nets[] = '<li><a href=" https://www.facebook.com/learnatnorth" title="Visit us on Facebook" rel="nofollow"><img src="'._path_to_theme_asset('imgs/logo-fb.jpg').'" alt="Facebook logo"></a></li>';
		$soc_nets[] = '<li><a href="https://twitter.com/learnatnorth" title="Follow us on Twitter" rel="nofollow"><img src="'._path_to_theme_asset('imgs/logo-twitter.png').'" alt="Twitter logo" /></a></li>';
		$soc_nets[] = '<li><a href="http://pinterest.com/learnatnorth/" title="Follow us on Pinterest" rel="nofollow"><img src="'._path_to_theme_asset('imgs/logo-pt.png').'" alt="Pinterest logo" /></a></li>';
		$soc_nets[] = '<li><a href="https://instagram.com/learnatnorth/" title="Follow us on Instagram" rel="nofollow"><img src="'._path_to_theme_asset('imgs/logo-instagram.png').'" alt="Instagram logo" /></a></li>';
		$variables['social_net_links'] = '<ul class="social-networks-list">'.implode("\n", $soc_nets).'</ul>';

		// Newsletter subscription
		$variables['newsletter'] = _nscc_conted_newsletter_info();

		// Head tag mods.
		$head_elems[] = '<meta name="google-site-verification" content="B0AsmoFuPpN3S6kiJONTkIV1YZUFDJ0haAqhX2tZ7_8" />';
		$head_elems[] = '<meta name="y_key" content="06e0f8a70794511c" />';
		$head_elems[] = '<meta name="msvalidate.01" content="EDD9918CFF3255DF3A2107ADE297AB14" />';
		$head_elems[] = '<meta name="p:domain_verify" content="1dfc811790a2fdb7a7014a5512e44099" />';
		$head_elems[] = '<meta name="description" content="Continuing Education offers the North Seattle community non-credit classes for fun, personal enrichment, and professional development." />';

		
		unset($variables['title']);	// suppress Drupal's standard title for front page node.
	}

	// Modify layout-related body-classes
	if ($variables['layout'] == both) {
		$variables['body_classes_array'] = array_diff($variables['body_classes_array'], array('one-sidebar', 'sidebar-left'));
		$variables['body_classes_array'][] = 'two-sidebars';
		$variables['body_classes'] = implode(' ', $variables['body_classes_array']);
	}

	// Rebuild $head, $scripts & $styles to ensure all files and settings are
	// correctly included. Without these calls, programmatic mods done during final
	// theming (e.g. script & CSS settings for Views content) may be missing from
	// final rendering.
	$variables['scripts'] = drupal_get_js();
	$variables['styles'] = drupal_get_css() . $variables['conditional_styles'];
	//$variables['head'] = drupal_set_html_head(drupal_get_html_head() . implode("\n", $addl_head_elems));
	foreach ($head_elems as &$value) {
		$value = trim($value);
	}
	//watchdog('ce theme', 'Final Head elements:<pre>'.print_r($head_elems,true)."</pre>\n");
	$variables['head'] = drupal_set_html_head(implode("\n", array_unique($head_elems)));

	//watchdog('ce theme', 'Page preprocess: <pre>'.print_r($variables, true)."</pre>\n");
	//watchdog('theme', "Meta BC: $meta_breadcrumb");
	//watchdog('ce theme', "q= {$_GET['q']}");
}





/**
 * Template preprocessor: node
 *
 * @see node.tpl.php
 * @see node-page.tpl.php
 * @see node-program.tpl.php
 */
function nscc_conted_preprocess_node(&$variables) {
	$node = $variables['node'];
	
	switch($node->type) {

		case 'course' :
			$variables['description'] = $variables['body'];
			$variables['supplies'] = !empty($variables['field_supplies'][0]['view']) ? $variables['field_supplies'][0]['view'] : '';
			$variables['books'] = !empty($variables['field_textbooks'][0]['view']) ? $variables['field_textbooks'][0]['view'] : '';
			$variables['syllabus'] = '';	//todo
			$variables['notes'] = '';	//todo
			$variables['video'] = '';	//todo
			$variables['scheduled_classes'] = theme('course_sections', $node, true);
			foreach ($variables['ce_categories'] as $category) {
				if ($category['view']) {
					$cats[] = "<dd>{$category['view']}</dd>";
				}
			}
			if (is_array($cats)) {
				$variables['categories_list'] = "<dl class=\"course-categories-list\">\n<dt>Categories</dt>" . implode("\n", $cats) . '</dl>';
			}
			//watchdog('ce theme', 'Course vars (node preproc): <pre>'.print_r($variables, true)."</pre>\n");
			break;


		case 'category' :
			break;


		case 'instructor' :
			if ($node->field_photo[0]['filesize'] > 0) {
			   $variables['photo'] = module_exists('imagecache')
			   	? theme('imagecache', 'col5-280px', $node->field_photo[0]['filepath'], $node->title, '', array('class'=>'instructor-photo'))
			   	: theme('image', $node->field_photo[0]['filepath'], $node->title, '', array('class'=>'instructor-photo'));
			}

			if (!empty($node->field_instructor_misc[0]['value'])) {
				$misc_items = array_map('trim',explode("\n", $node->field_instructor_misc[0]['value']));
				$misc = array();
				foreach ($misc_items as $key=>$item) {
					//watchdog('theme', "misc item $key: $item\n");
					$protocol = strpos($item, 'http') === false ? false : true;
					if (valid_email_address($item)) {
						$misc[] = '<li>'.l($item,"mailto:$item",array('external'=>true)).'</li>';
					} elseif (valid_url($item, $protocol)) {
						$url = $protocol ? $item : 'http://'.$item;
						$misc[] = '<li>'.l($item, $url, array('external'=>true,'absolute'=>true)).'</li>';
					} else {
						$misc[] = '<li>'.check_plain($item).'</li>';
					}
				}
				if (!empty($misc)) {
					$variables['misc_items'] = '<ul>'.implode("\n", $misc).'</ul>';
				}
			}
			
			if (! empty($node->classes_taught)) {
				foreach ($node->classes_taught as $course) {
					if ($course_node = node_load($course['course_nid'])) {
						 $themed_courses[] = theme('course_sections', $course_node);
					}
				}
				$variables['courses'] = empty($themed_courses) ? '' : implode("\n", $themed_courses);
			}
			//watchdog('ce theme', 'Instructor node: <pre>'.print_r($variables, true)."</pre>\n");
			break;


		case 'page' :
			break;


		case 'schedule_promo' :
			$cover = $node->field_sched_cover_img[0];
			$pdf = $node->field_sched_pdf_url[0];
			$url = $node->field_sched_web_url[0];
			
			if ($cover['filesize'] > 0) {
				$variables['cover_img'] = theme('image', $cover['filepath'], $cover['data']['alt'], $cover['data']['title'], array('id'=>'sched-promo-img'));
			}

			if (!empty($url['url'])) {
				$variables['online_link'] = l('Online Listing', $url['url'], array('external'=>true, 'attributes'=> array('class'=>'link-web link-schedule','id'=>'schedule-promo-web-link')));
			}
			
			if (!empty($pdf['url'])) {
				$variables['pdf_link'] = l('PDF Version', $pdf['url'], array('external'=>true, 'attributes'=>array('class'=>'link-pdf','id'=>'schedule-promo-pdf-link')));
			}
			
			$variables['email_link'] = <<<EMAIL_LINK
<a href="mailto:conted@seattlecolleges.edu?subject=Mail me your printed schedule&body=I would like to receive your quarterly schedule by mail. Please send it to the following address.">Paper Copy</a>
EMAIL_LINK;
			break;


		case 'slide' :
			//$tgt_url = $variables['field_slide_link'][0]['url'];	// missing querystring (and frag-id presumably)
			$tgt_url = $variables['field_slide_link'][0]['display_url'];	// seems to have full URL (w/ all suffix components)
			$variables['slide_link_attr'] = drupal_attributes(array('href'=>check_url($tgt_url), 'title'=>$node->title)); 
			$variables['photo'] = $variables['field_slide_photo'][0]['view'];
			$colorpath = base_path().path_to_theme().'/imgs/slidecolor-'.strtolower($node->field_slide_bgcolor[0]['value']).'.png';
			$variables['classes'] .= ' slide';
			$variables['content_attr'] = drupal_attributes(array('style'=>'background: transparent url('.$colorpath.') top right no-repeat','class'=>'slide-content'));
			$variables['content'] =	check_markup($node->body, $node->format);
			$variables['slide_navigation'] = ''; //later will have stuff
			break;	 


		case 'story' :
			//watchdog('ce theme', 'Blog vars (node preproc) <pre>'.print_r($variables, true)."</pre>\n");
			break;


		case 'video' :
			break;

	}
	//watchdog('theme', 'Node preprocess: <pre>'.print_r($variables, true)."</pre>\n");
}





/**
 * Template Preprocessor: Block
 */
function nscc_conted_preprocess_block(&$variables) {
	$block = $variables['block'];
	switch ($block->bid) {

		// Categories for front page
		case 115:
			$variables['classes'] = (empty($variables['classes'])) ? 'front-page-categories' : $variables['classes'] . ' front-page-categories';
			//watchdog('ce theme', 'Categories Block vars: <pre>'.print_r($variables, true)."</pre>\n");
			if (is_array($block->content)) {

				// Remove `new` from column calculations. ContEd dept doesn't want it displayed.
				//$newcat = $block->content['new'];
				unset($block->content['new']);

				// Calculate column widths for categories.
				$catcount = count($block->content);
				$catcol = floor(960 / $catcount - 20);
				//watchdog('ce theme', "Cats=$catcount Col=$catcol");

				// Build list of links for each category.
				foreach ($block->content as $cat => $subcat) {
					$links = array();
					foreach ($subcat as $sc_val) {
						//if ($cat != 'new') {
							//$url_title = urlize_category_title($sc_val['title']);
							$links[] = "<li><a href=\"/courses/{$sc_val['urlized_title']}\">{$sc_val['title']}</a></li>";
						//}
					}
					//$id = ($cat == 'new') ? ' id="new-classes-category"' : '';
					$id = ' id="' . preg_replace('/\W+|_+/', '-', strtolower($cat)) . '-classes-category"';
					$html[] = "<div class=\"course-category\" style=\"width:{$catcol}px;\"$id>";
					$html[] = '<h2>'.ucwords($cat).'</h2>';
					//if ($cat == 'new') {
					//	$num_classes = $subcat['num_classes'];
					//	$html[] = '<p>'.t('We have %count new classes this quarter! !link', array('%count'=>$num_classes,'!link'=>l('More info…', 'courses/'.$subcat['urlized_title'], array('attributes'=>array('class'=>'more-link'))))).'</p>';
					//} else {
						$html[] = !empty($links) ? '<ul>'.implode("\n", $links).'</ul>' : '';
					//}
					$html[] = '</div>';
				}
				$html[] = '<div class="clearfix">&nbsp;</div>';
				$variables['block']->content = implode("\n", $html);
			}
			break;

		// Newsletter subscription form
		//case 125:
		//	$variables['template_files'][] = 'block-newsletter-subscribe';
		//	//watchdog('ce theme', 'Categories Block vars: <pre>'.print_r($variables, true)."</pre>\n");
		//	break;
	}
}





/**
 * Template preprocessor: course-sections
 *
 * Renders all classes/sections of the specificed course-node for inclusion in
 * the course-details and instructor-bio pages.
 * @see course-sections.tpl.php
 */
function nscc_conted_preprocess_course_sections(&$variables, $hook) {
	$node = $variables['course'];
	$variables['enrollable'] = false;
	foreach ($node->ce_course_items as $class) {
		//watchdog('ce theme', 'Call section-hcal theming');
		//check for start dates passed
		if(strtotime($class['start_date']) >= time() && _nscc_conted_is_yrq_open($class['term'])){
			$variables['enrollable'] = true;
		}
		//check for enrollment open passed
		$class['course_node_format'] = $node->format;
		$sections[] = theme('class_section_hcal', $class);		
	}
	$variables['sections_heading'] = (count($sections) > 1) ? 'Sections' : '';
	$variables['sections'] = (count($sections) > 0) ? '<div class="course-sections">'.implode("\n", $sections).'</div>' : '';
	$variables['enroll_link'] = l('Enroll Now', "http://www.campusce.net/NSCC/course/course.aspx?C={$node->field_ce_course_id[0]['value']}", array('external' => true, 'attributes' => array('class' => 'enroll-link')));
	$variables['course_link'] = ($variables['sections_only']) ? '' : l($node->title, $node->path, array('attributes' => array('title' => 'Course details'), 'alias' => true));
	$variables['description'] = ($variables['sections_only']) ? '' : check_markup($node->body, $node->format, false);
	$variables['classes'] .= 'course-schedule-info';
	//watchdog('ce theme', 'Course-sections vars (preproc): <pre>'.print_r($variables, true)."</pre>\n");
}





/**
 * Template preprocessor: class-section-hcal
 *
 * Renders a single class-section using hcal microformat
 * @see class-section-hcal.tpl.php
 * @see http://microformats.org/wiki/hcalendar
 */
function nscc_conted_preprocess_class_section_hcal(&$variables, $hook) {
	$class = $variables['class'];
	$start = strtotime($class['start_date']);
	$end = strtotime($class['end_date']);

	$variables['days'] = check_plain($class['days']);
	$variables['sessions'] = ($class['num_sessions'] == 1) ? '1 session' : $class['num_sessions'].' sessions';
	$variables['time'] = _nscc_conted_compact_time($start) . '–' . _nscc_conted_compact_time($end);
	$variables['dtstart'] = date('c', $start);
	$variables['start'] = date('M j', $start);
	$variables['dtend'] = date('c', $end);
	$variables['end'] = date('M j', $end);
	$variables['tuition'] = sprintf('$%01.2f', $class['tuition']);
	$variables['class_note'] = ($class['course_node_format']) ? check_markup($class['class_web_comments'], $class['course_node_format'], false) : check_plain($class['class_web_comments']);
	$variables['schedule_note'] = !empty($class['sched_notes']) ? check_plain($class['sched_notes']) : '';
	$variables['location_name'] = check_plain($class['location_name']);
	$variables['location_desc'] = check_plain($class['location_description']);
	$variables['location_addr'] = trim(check_plain(strip_tags(html_entity_decode($class['location_address'], ENT_NOQUOTES))));
	$variables['location_city'] = trim(check_plain(strip_tags(html_entity_decode($class['location_city'], ENT_NOQUOTES))));
	$variables['location_state'] = trim(check_plain(strip_tags(html_entity_decode($class['location_state'], ENT_NOQUOTES))));
	$variables['location_zip'] = trim(check_plain(strip_tags(html_entity_decode($class['location_zip'], ENT_NOQUOTES))));
	$variables['location_room'] = check_plain($class['location_room']);
	$variables['location_bldg_code'] = check_plain($class['location_building_code']);
	$variables['location_bldg_name'] = check_plain($class['location_building_name']);
	$variables['yrq_msg'] = check_plain(_nscc_conted_get_yrq_msg($class['term']));
	if( $start < time() ){
		$variables['start_msg'] = "This class is already in session. Please <a href=\"https://continuinged.northseattle.edu/contact-us\">call</a> or <a href=\"mailto://conted@seattlecolleges.edu\">email</a> the Continuing Education office for possible late registration.";
	}

	if (empty($class['location_map_url'])) {
		if ($variables['location_name'] === 'Main Campus') {
			// Build link to NSCC wayfinder for on-campus locations.
			if (preg_match('/.*(\d{4}\w?).*/', $variables['location_room'], $matches)) {
				$variables['map_link'] = l('Map', "https://northseattle.edu/locator/locate/{$matches[1]}", array('external'=>true, 'attributes'=>array('title'=>'Class location on campus map')));
			}
		} else {
			// Build link to Google map for off-campus locations.
			$map_url = empty($variables['location_zip']) ? '' : $variables['location_zip'];
			$map_url = empty($variables['location_state']) ? '' : $variables['location_state'] . " $map_url";
			$map_url = empty($variables['location_city']) ? '' : $variables['location_city'] . " $map_url";
			$map_url = empty($variables['location_addr']) ? '' : $variables['location_addr'] . " $map_url";
			if ($map_url) {
				$map_url = urlencode($map_url);
				$variables['map_link'] = l('Map', "https://maps.google.com/maps?q=$map_url", array('external'=>true, 'attributes'=>array('title'=>'Class location on map')));
			}
		}
	} else {
		$variables['map_link'] = l('Map', $class['map_url'], array('external'=>true, 'attributes'=>array('title'=>'Class location on map')));
	}
	//watchdog('ce theme', 'Class hcal vars (preproc):<pre>'.print_r($variables, true)."</pre>\n");
}



function _nscc_conted_get_yrq_msg($yrq){
	$message = '';
	$sql = "select field_schedule_msg_value message from {content_type_quarter} where field_yrq_code_value='%s';";
	$message = db_result(db_query($sql, $yrq));
	return $message;
}

function _nscc_conted_is_yrq_open($yrq){
	$sql = "SELECT count(*) FROM {content_type_quarter} WHERE to_timestamp(field_reg_start_date_value,'YYYY-MM-DDTHH:MI:SS') < now() AND field_yrq_code_value='%s';";
	return db_result(db_query($sql,$yrq));
}

/**
 * Template preprocessor: search-block-form
 *
 * @see search-block-form.tpl.php
 */
function nscc_conted_preprocess_search_block_form(&$variables) {
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
 * Template preprocessor: Instructor profile for sidebar display
 * @see instructor_for_sidebar.tpl.php
 */
function nscc_conted_preprocess_instructor_for_sidebar(&$variables) {
	$instr = $variables['instructor'];
	$more_link = '<p class="more-link">'.l('More…', $instr->path, array('attributes'=>array('title'=>'Instructor\'s full bio'),'alias'=>true)).'</p>';
	$variables['classes'] = 'sidebar-profile';
	$variables['name'] = check_plain($instr->title);
	$variables['bio'] = $instr->teaser ? check_markup($instr->teaser, $instr->format, false).$more_link : '';
	//$variables['links'] = check_plain($instr->field_instructor_misc[0]['value']); //currently plain-text, but probably should be HTML (links, etc.)
	if ($instr->field_photo[0]['filesize'] > 0) {
		if (module_exists('imagecache')) {
			$variables['photo'] = theme('imagecache', 'col3-160px',
				$instr->field_photo[0]['filepath'],
				$instr->field_photo[0]['alt'],
				$instr->field_photo[0]['title'],
				array('class' => 'instructor-photo')
			);
		}
	}
	//watchdog('ce theme', 'Sidebar profile: <pre>'.print_r($variables, true)."</pre>\n");
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
function nscc_conted_preprocess_content_field(&$variables) {
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
 * @see nscc_conted_breadcrumb, nscc_conted_preprocess_page
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
				return	'(' . substr($digits, 0, 3) . ') ' . substr($digits, 3, 3) . '-' . substr($digits, 6, 4) . ' x' . substr($digits, 10);
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
 *	Helper function: Schedule Promo loader
 *
 *	Identifies and loads the most recent schedule_promo node for theming.
 *	@return obj A fully-populated node object upon success; FALSE otherwise.
 */
function _get_schedule_promo() {
	$sql = "SELECT nid FROM {node} WHERE type = 'schedule_promo' AND status > 0 ORDER BY created DESC LIMIT 1";
	return node_load(db_result(db_query($sql)));
}





/**
 * Helper function: Formats a time using 12-hour compact notation
 *
 * @param int optional Unix timestamp to use for formatting; default = now.
 * @returm string Formatted time value.
 */
function _nscc_conted_compact_time($timestamp) {
	$timestamp = $timestamp ? $timestamp : time();
	$dt = getdate($timestamp);
	if ($dt['hours'] >= 13) {
		$time = ($dt['minutes']) ? sprintf('%d:%dpm',$dt['hours']-12,$dt['minutes']) : sprintf('%dpm',$dt['hours']-12);
	} else if ($dt['hours'] == 12) {
		$time = ($dt['minutes']) ? sprintf('%d:%dpm',$dt['hours'],$dt['minutes']) : sprintf('%dpm',$dt['hours']);
	} else {
		$time = ($dt['minutes']) ? sprintf('%d:%dam',$dt['hours'],$dt['minutes']) : sprintf('%dam',$dt['hours']);
	}
	return $time;
}





/**
 * Helper function: Builds newsletter info link for front page footer.
 *
 * @return string
 */
function _nscc_conted_newsletter_info() {
	return <<<EMAIL_NEWSLETTER_INFO
<a href="/email-newsletter">Subscribe to our newsletter</a>
EMAIL_NEWSLETTER_INFO;
}
