<?php
// $Id$

/**
 * @file template.php
 *
 * Theme override and template preprocessor functions for NSCC-960 and derivitive themes
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
function nscc_elearning_breadcrumb($breadcrumb) {
	global $meta_breadcrumb;
	$sitename = variable_get('site_name', null);
	$site_home = l(ucwords($sitename), '<front>');
	$delimiter = ' <img alt="" src="' . _path_to_theme_asset('imgs/bullet-crumb.png') . '"/> ';
	//  $nscc_home = l('NSCC', 'http://northseattle.edu/', array('attributes'=>array('title'=>'NSCC Homepage')));
	$nscc_home = l('NSC', 'https://northseattle.edu/', array('attributes'=>array('title'=>'NSC Homepage'))); //after cutover
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
		if($sitename=='NSC'){
			if(preg_match('/>Home</', $breadcrumb[0]) ){
				//$breadcrumb[0] = $nscc_home; // for after rollout
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
function nscc_elearning_node_submitted($node) {
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
function nscc_elearning_comment_submitted($comment) {
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
function nscc_elearning_menu_local_tasks() {
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
function nscc_elearning_menu_local_task($link, $active = FALSE) {
  if (! $active || arg(0) == 'admin') { return "<li>$link</li>\n"; }
  if (strpos($link, 'View') === false && strpos($link, 'Edit') === false) { return "<li class=\"active\">$link</li>\n"; }
}





/**
 * Template preprocessor: search-block-form
 *
 * @see search-block-form.tpl.php
 */
function nscc_elearning_preprocess_search_block_form(&$variables) {
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
function nscc_elearning_preprocess_page(&$variables) {
	$node = $variables['node'];
	
	// Extend template suggestions to account for existence of page-templates for custom node-types.
	if ($node->type != '') {
	 $variables['template_files'][] = 'page-node-' . $node->type;
	}
	 
	// Append college abbr to <title>.
	$variables['head_title'] .= strpos($variables['head_title'], '| NSC') === true ? '' : ' | NSC';
	
	// Force IE (7,8,9) to use its most standards-compliant rendering mode, and
	// the Chrome-frame plugin, if available.
	drupal_set_html_head('<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />');
	
	// Add CSS gradient correction for IE9+
	$ie9_gradient_fix = <<<IE9_GRADIENT_FIX

<!--[if gte IE 9]>
  <style type="text/css">
    .gradient {
       filter: none;
    }
  </style>
<![endif]-->
IE9_GRADIENT_FIX;
	drupal_set_html_head($ie9_gradient_fix);
	
	// Add Columnizer script. Used as needed for browsers that do not support
	// those CSS3 Layout Module capabilities.
	drupal_add_js('sites/all/themes/nscc_960/js/autocolumn.min.js','theme');

	// Add styles for admin and content manager interfaces as needed.
	if (arg(0) == 'admin' || arg(0) == 'manage' || (arg(0) == 'node' && arg(1) == 'add') || arg(2) == 'edit' || arg(2)=='delete' || arg(2)=='revisions') {
		$admin_styles_path = substr(_path_to_theme_asset('css/global-admin.css'),1);	//substr() strips leading slash;
		drupal_add_css($admin_styles_path, 'theme', 'all', false);		// FALSE fixes problem with css consolidation and caching.
		$variables['css']['all']['theme'][$admin_styles_path] = 1;	// drupal_get_css() seems to fail w/out this. Bug?
		//watchdog('theme', "Adding admin css file: $admin_styles_path <pre>Vars: \n".print_r($variables,true));
	}


	// Node-specific mods.
	if ($node) {
		switch(true) {
			// Front Page(s)

			case ($node->type == 'front_page'):
				//callouts
				$callout_text = '<div id="home-callouts">';
				for ($i = 1; $i <=3; $i++) {
							$field = 'field_fp_callout_'.$i;
							$noderef = $node->$field;
							$nid = $noderef[0]['nid'];
							if ($nid > 0) {
									$callout_node = node_load($nid, null, true);
									$callout_node->callout_fp_position = $i;
									$callouts[$i] = theme('node', $callout_node);
							}			 
						}
				if (!empty($callouts)) { $callout_text .= implode("\n", $callouts); }
				$callout_text .= '</div>';
				$variables['frontpage_callouts']=$callout_text;
				break;	
	
			// NavIndex page
			case ($node->type == 'nav_index') :
				unset($variables['title']); // suppresses default content title.
				$promo = node_load($node->field_fp_promo[0]['nid']);
				$themed_promo = check_markup($promo->body, $promo->format, false);
				$variables['right'] = !empty($variables['right']) ? $themed_promo . $variables['right'] : $themed_promo;
				break;
		
		
			// Procedure, & any other page
			case ( preg_match('/procedure/',$node->type) ) :
			case ( preg_match('/^page/',$node->type) ) :
				// Title banner
				if ($node->field_image[0]['filesize'] > 0) {
					$variables['title_banner'] = theme('image',
						$node->field_image[0]['filepath'],
						check_plain($node->field_image[0]['data']['alt']),
						check_plain($node->field_image[0]['data']['title']),
						array( 'class' => 'title-banner' ),
						false
					);
					$title_color = check_plain($node->field_title_color[0]['value']);
					$variables['title_banner'] .= _format_banner_title(trim($node->title), $title_color, true);
					unset($variables['title']);
				}
				//watchdog('theming', 'Page/proc vars: <pre>'.print_r($variables, true)."</pre>\n");
				break;
		}
	}

	// Breadcrumb
	$variables['breadcrumb'] = theme('breadcrumb', drupal_set_breadcrumb($breadcrumb));

	// Meta Breadcrumb
	global $meta_breadcrumb;
	if(preg_match('/<meta name=\"breadcrumb\"/',$variables['head'])){
		$variables['head'] = preg_replace('/<meta name=\"breadcrumb\" content=\".*\">\n/',"<meta name=\"breadcrumb\" content=\"$meta_breadcrumb\">\n",$variables['head']);
	} else {
		$variables['head'].="<meta name=\"breadcrumb\" content=\"$meta_breadcrumb\" />\n";
	}

	//Site verification. Only needed on site home pages.
	if ($variables['is_front'] === true) {
		$variables['head'] = drupal_set_html_head(drupal_get_html_head()
			. '<meta name="google-site-verification" content="B0AsmoFuPpN3S6kiJONTkIV1YZUFDJ0haAqhX2tZ7_8" />' . "\n"
			. '<meta name="y_key" content="06e0f8a70794511c" />' . "\n"
			. '<meta name="msvalidate.01" content="EDD9918CFF3255DF3A2107ADE297AB14" />'
		);
	}

	// Ensure any mods to $head, $scripts, and $styles make it to output.
	$variables['scripts'] = drupal_get_js();
	$variables['styles'] = drupal_get_css();
	$variables['head'] = drupal_get_html_head();
}




/**
 * Template preprocessor: node
 *
 * @see node.tpl.php
 * @see node-callout.tpl.php
 * @see node-division.tpl.php
 * @see node-nav-index.tpl.php
 * @see node-page.tpl.php
 * @see node-program.tpl.php
 */
function nscc_elearning_preprocess_node(&$variables) {
  $node = $variables['node'];
  
  // Specific Node-Type handling
  switch(true) {
    
    // node: Navigation Index
    case ($node->type == 'nav_index') :
      $variables['index_title'] = check_plain($node->title);
      $variables['nav_index_content'] = $node->content['body']['#value'];
      
      // Theme the available callouts for this Nav-Index.
      for ($i = 1; $i <=3; $i++) {
        $field = 'field_callout_'.$i;
        $noderef = $node->$field;
        $nid = $noderef[0]['nid'];
        if ($nid > 0) {
          $callout_node = node_load($nid, null, true);
          $callout_node->callout_position = $i;
          $callouts[$i] = theme('node', $callout_node);
        }      
      }
      if (!empty($callouts)) { $variables['callouts'] = implode("\n", $callouts); }
      break;
    
    
    // node: Callout
    case ($node->type == 'callout') :
      $variables['callout_title'] = check_plain($node->title);
      $variables['callout_content'] = $node->body;
      $variables['classes'] .= ($variables['nodeblock']) ? ' callout callout-column' : ' callout grid-3';
      switch($node->callout_position) {
        case 1:
          $variables['classes'] .= ' alpha callout-left';
          break;
        case 2:
          $variables['classes'] .= ' callout-mid';
          break;
        case 3:
          $variables['classes'] .= ' omega callout-right';
          break;
      }      
      // Inline style for background.
      $img_path = $node->field_callout_bg_graphic[0]['filepath'];
      $variables['callout_styles'] = ' style="background: rgb(223, 232, 234)';
      if ($img_path) {
        $variables['callout_styles'] .= ' url('.base_path().$img_path.') bottom right no-repeat';
      }
      $variables['callout_styles'] .= ';"' ;
      //watchdog('theme', 'Callout vars: <pre>'.print_r($variables, true)."</pre>\n");
      break;

		// node: fp_slide
		case ($node->type =='fp_slide') :
			//$variables['slide_link_attr'] = drupal_attributes(array('href'=>check_url($node->field_fp_slide_link[0]['url']),'title'=>$node->title)); 
			$link_qs = (! empty($node->field_fp_slide_link[0]['query'])) ? '?'.$node->field_fp_slide_link[0]['query'] : '';
			$variables['slide_link_attr'] = drupal_attributes(array('href'=>check_url($node->field_fp_slide_link[0]['url']).$link_qs,'title'=>$node->title)); 
			//$variables['photo'] = $node->field_fp_slide_photo[0]['view'];
			$variables['photo'] = ($node->field_fp_slide_photo[0]['filesize'] > 0) ? theme('image',$node->field_fp_slide_photo[0]['filepath'],$node->field_fp_slide_photo[0]['data']['alt'], $node->field_fp_slide_photo[0]['data']['title']) : '';
			$colorpath = _path_to_theme_asset('imgs/slidecolor-'.strtolower($node->field_fp_slide_bg_color[0]['value']).'.png');
			$variables['classes'] .= ' fp_slide';
			$variables['content_attr'] = drupal_attributes(array('style'=>'background: transparent url('.$colorpath.') top right no-repeat','class'=>'fp_slide-content'));
			$variables['content']	 =	check_markup($node->body,$node->format);
			$variables['slide_navigation'] = ''; //later will have stuff
			//if ($GLOBALS['user']->uid == 4) { watchdog('main theme', 'Slide node vars: <pre>'.print_r($variables, true)."</pre>\n"); }
			break;	 

		// node: Minifaq
 		case($node->type == 'minifaq') :
    	drupal_add_js('sites/all/themes/nscc_960/js/minifaq-accordion.js','theme');
			$variables['content'] = '';
    	if (!empty($node->field_intro_text[0]['value'])){
    		$variables['content'] = '<div class="minifaq-intro">'."\n";
    		$variables['content'] .= check_markup($node->field_intro_text[0]['value'],$node->field_intro_text[0]['format'],false)."\n";
    		$variables['content'] .= '</div>'."\n";
    	}
    	$variables['content'] .= '<div class="minifaq-accordion">'."\n";
			$faqs = $node->field_faq_entries;
			foreach($faqs as $current_faq){
				$variables['content'] .= '<h3 class="question"><a href="#">'.check_plain($current_faq['value']['field_question'][0]['value'])."</a></h3>\n";
				$variables['content'] .= '<div class="answer">'.check_markup($current_faq['value']['field_answer'][0]['value'],$current_faq['value']['field_answer'][0]['format'],false)."</div>\n";
			}
			$variables['content'] .= "</div> <!-- end accordian-->\n";			
			break;
		 
     
    // node: Procedure
    case ($node->type == 'procedure'):
    	switch($node->field_proc_display_mode[0]['value']){
			default:
    		case 'Tabs':
					jq_add('tabs');
					drupal_add_js('sites/all/themes/nscc_960/js/procedure-tab.js','theme');
					$steps = $node->field_step;
					$stepindex = 1;
					foreach($steps as $current_step){
						if ($stepindex > 1){
							if($stepindex > 2){
								$step_body_output .="\n\n<span class=\"prev_span tab_nav_span\">Previous</span>\n";
								$step_body_output .="\n\n<a href=\"#tabs-".($stepindex - 2)."\" class=\"prev_link tab_nav_link\">Previous</a>\n";
							}
							$step_body_output .="<span class=\"next_span tab_nav_span\">Next</span>\n";
							$step_body_output .="<a href=\"#tabs-".($stepindex)."\" class=\"next_link tab_nav_link\">Next</a>\n<div class=\"clearfix\">&nbsp;</div></div><!-- tab_body -->\n\n";
						}
						if(strlen($current_step['value']['field_step_title'][0]['value'])>=4){
							$width_class = 'w';
						} else {
							$width_class='';
						}
						$step_list_output .= '<li><a class="'.$width_class.'" href="#tabs-'.$stepindex.'" title="'.check_plain($current_step['value']['field_step_ttip'][0]['value']).'">'.check_plain($current_step['value']['field_step_title'][0]['value'])."</a></li>\n";
						$step_body_output .= '<div class="tab_body" id="tabs-'.$stepindex.'">'.check_markup($current_step['value']['field_step_body'][0]['value'],$current_step['value']['field_step_body'][0]['format'],false);
						$stepindex++;
					}
					$step_list_output .='</ol>';
					$step_body_output .="\n\n<span class=\"prev_span tab_nav_span\">Previous</span>\n";
					$step_body_output .="\n\n<a href=\"#tabs-".($stepindex - 2)."\" class=\"prev_link tab_nav_link\">Previous</a><div class=\"clearfix\">&nbsp;</div></div><!-- tab_body -->\n";
		
					$step_output .= '<div id="tabs"><ol class="procedure_steps" id="procedure_steps">'."\n";
					$step_output .= $step_list_output . '<div class="panes">'.$step_body_output."</div><!-- panes-->\n\n</div><!-- tabs -->\n";
		
					if($node->field_intro[0]['value']){
						$variables['content'] .= check_markup($node->field_intro[0]['value'],$node->field_intro[0]['format'],false);
					}
					$variables['content'] .= $step_output;
				break;

    		case 'Accordion':
					drupal_add_js('sites/all/themes/nscc_960/js/procedure-accordion.js','theme');
					$steps = $node->field_step;
					$stepindex = 1;
					foreach($steps as $current_step){
						$step_output .= '<h3 class="procedure-accordian-step-title">'.check_plain($current_step['value']['field_step_title'][0]['value']).'</h3>';
						$step_output .= '<div class="procedure-accordian-step-body">'.check_markup($current_step['value']['field_step_body'][0]['value'],$current_step['value']['field_step_body'][0]['format'],false).'</div>';
					}
					if($node->field_intro[0]['value']){
						$variables['content'] .= check_markup($node->field_intro[0]['value'],$node->field_intro[0]['format'],false);
					}
					$variables['content'] .= '<div class="procedure-accordion">'.$step_output.'</div>';					
    		break;
			}
    	break;
      
     
    // node: Page, and friends
    /*
    case ( preg_match('/^page/',$node->type) ) :
    	//jq_add('expose');
    	//drupal_add_js(path_to_theme().'/js/expose-test.js', 'theme');
     switch(true) {

        // Generic page w/ banner graphic
        case $node->field_image[0]['filesize'] > 0 :
          // Extract just the node's body-value and sanitize it.
          $variables['content'] = check_markup($node->content['body']['#value'], $node->format, false);
          break;
      }
     */
    case ($node->type == 'page'):
    	//Embedded calendar
    	if (!empty($variables['field_ical_url'][0]['url'])) {
    		$variables['calendar'] = _format_calendar($variables['field_ical_url'][0]['url']);
    		$variables['content'] = $variables['calendar'];
    	}
    	//watchdog('theme', 'Page vars: <pre>'.print_r($variables, true)."</pre>\n");
      break;
  }
}




/**
 *	Template preprocessor: Block
 */
function nscc_elearning_preprocess_block(&$variables) {
	//watchdog('theme', 'Block vars: <pre>'.print_r($variables, true)."</pre>\n");
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
function nscc_elearning_preprocess_content_field(&$variables) {
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
function nscc_elearning_filefield_file($file) {
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
function nscc_elearning_username($object) {

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
 * @see nscc_960_breadcrumb, nscc_960_preprocess_page
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
 *	Helper function: Formats a title for use in the graphical content-banner
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
 * Helper function: Embeded calendar
 * Returns an HTML snippet suitable for inclusion in node/page content to embed
 * a Google calendar.
 * @return String Snippet of HTML to generate Google calendar embed.
 */
function _format_calendar($url, $embed_type='default'){
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
			case 'agenda_embed_section':
					if( preg_match('/^http:\/\/www.google.com\/calendar\/ical\/(northseattle\.edu_.+group\.calendar\.google\.com)\/public\/basic\.ics$/',$url,$matches) ){
						return '<div class="embedded_calendar"><iframe src="https://www.google.com/calendar/hosted/northseattle.edu/embed?showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=AGENDA&amp;height=300&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src='.$matches[1].'&amp;color=%23AB8B00&amp;ctz=America%2FLos_Angeles" style=" border-width:0 " width="460" height="480" frameborder="0" scrolling="no"></iframe></div>'; 
					}
					break;
			case 'agenda_embed_committee':
					if( preg_match('/^http:\/\/www.google.com\/calendar\/ical\/(northseattle\.edu_.+group\.calendar\.google\.com)\/public\/basic\.ics$/',$url,$matches) ){
						return '<div class="embedded_calendar"><iframe src="https://www.google.com/calendar/hosted/northseattle.edu/embed?showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=AGENDA&amp;height=300&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src='.$matches[1].'&amp;color=%23AB8B00&amp;ctz=America%2FLos_Angeles" style=" border-width:0 " width="300" height="400" frameborder="0" scrolling="no"></iframe></div>'; 
					}
					break;
			case 'monthview_embed':
					if( preg_match('/^http:\/\/www.google.com\/calendar\/ical\/(northseattle\.edu_.+group\.calendar\.google\.com)\/public\/basic\.ics$/',$url,$matches) ){
						return '<div class="embedded_calendar"><iframe src="https://www.google.com/calendar/hosted/northseattle.edu/embed?showTitle=0&amp;showCalendars=0&amp;showTz=0&amp;height=500&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src='.$matches[1].'&amp;color=%23AB8BFF&amp;ctz=America%2FLos_Angeles" style=" border-width:0 " width="460" height="540" frameborder="0" scrolling="no"></iframe></div>'; 
					}
					break;
			case 'monthview_embed_section':
			case 'default':
					if( preg_match('/^http:\/\/www.google.com\/calendar\/ical\/(northseattle\.edu_.+group\.calendar\.google\.com)\/public\/basic\.ics$/',$url,$matches) ){
						return '<div class="embedded_calendar"><iframe src="https://www.google.com/calendar/hosted/northseattle.edu/embed?showTitle=0&amp;showCalendars=0&amp;showTz=0&amp;height=500&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src='.$matches[1].'&amp;color=%23AB8BFF&amp;ctz=America%2FLos_Angeles" style=" border-width:0 " width="460" height="540" frameborder="0" scrolling="no"></iframe></div>'; 
					}
					break;
			case 'monthview_embed_program':
					if( preg_match('/^http:\/\/www.google.com\/calendar\/ical\/(northseattle\.edu_.+group\.calendar\.google\.com)\/public\/basic\.ics$/',$url,$matches) ){
						return '<div class="embedded_calendar"><iframe src="https://www.google.com/calendar/hosted/northseattle.edu/embed?showTitle=0&amp;showCalendars=0&amp;showTz=0&amp;height=500&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src='.$matches[1].'&amp;color=%23AB8BFF&amp;ctz=America%2FLos_Angeles" style=" border-width:0 " width="540" height="540" frameborder="0" scrolling="no"></iframe></div>'; 
					}
					break;
			case 'agenda_embed_3col':
					if( preg_match('/^http:\/\/www.google.com\/calendar\/ical\/(northseattle\.edu_.+group\.calendar\.google\.com)\/public\/basic\.ics$/',$url,$matches) ){
						return '<div class="embedded_calendar"><iframe src="https://www.google.com/calendar/hosted/northseattle.edu/embed?showTitle=0&amp;showNav=0&amp;showDate=1&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=AGENDA&amp;height=300&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src='.$matches[1].'&amp;color=%23AB8B00&amp;ctz=America%2FLos_Angeles" style="border-width:0" width="220" height="400" frameborder="0" scrolling="no"></iframe></div>'; 
					}
					break;
		}
	}
}
