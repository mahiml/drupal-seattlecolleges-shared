<?php
// $Id$

/**
 * @file template.php
 *
 * Theme override and template preprocessor functions for NSCC-960 News Theme
 */



/**
 * Template preprocess: node
 *
 * Adds or alters variables available to the node-template.
 */
function nscc_news_preprocess_node(&$variables) {
  $node = $variables['node'];

  // Picture for this node?
  if ($node->field_picture[0]['filesize']) {
    $pic_file = $node->field_picture[0]['filepath'];
    $pic_alt = check_plain($node->field_picture[0]['data']['alt']);
    $pic_title = check_plain($node->field_picture[0]['data']['title']);
    $img = $node->field_picture[0]['view'];
        
    // Optimize via ImageCache, if possible.
    if (module_exists('imagecache')) {
      if ($variables['is_front']) { $ic_filter = 'frontpage_article'; }
      else if ($variables['teaser']) { $ic_filter = 'news-teaser'; }
      if ($ic_filter) { $img = theme('imagecache', $ic_filter, $pic_file, $pic_alt, $pic_title); }
    }
    $variables['node_picture'] = $img;
  }
  
  
  // Event date?
  if ($node->field_date[0]['view']) {
    $variables['event_date'] =  $node->field_date[0]['view'];
    $variables['event_date_class'] = $variables['teaser'] ? 'event-date-teaser' : 'event-date';
  }

	// Event location?
	if ($node->field_location[0]['value']) {
		$variables['event_location'] = $node->field_location[0]['view'];
		$variables['event_location_class'] = $variables['teaser'] ? 'event-location-teaser' : 'event-location';
	}
  
  
  // Attached files?
  $variables['file_attachments'] = $node->content['files']['#value'] ? $node->content['files']['#value'] : '';


  // Build list of links to output-feeds that are currently horking this node.
  if ($variables['nscc_feed_list']) {
    $url = base_path() . 'nscc_feed/';
    $feeds = $variables['nscc_feed_list'];
    $list[] = '<ul class="links inline">';
    foreach($feeds as $feed) {
      $list[] = '<li><a href="' . $url . str_replace(' ', '-', check_plain(trim($feed))) . '/">' . $feed . '</a></li>';
    }
    $list[] = '</ul>';
    $variables['nscc_feeds_links'] = implode("\n", $list);
  }
	$variables['post_date']=date("F jS, Y  \a\\t H:i:s",$node->revision_timestamp);
	$variables['hork_date']='';
  //watchdog('get_dates',"Node: \n<pre>".print_r($node,true)."</pre>");
  
  
	// Hide the listing of Sources for this node if module has determined this user-account is not hork-enabled.
	if ($variables['hide_sources']) { $variables['taxonomy'] = false; }
}



/**
 * Template preprocess: page
 *
 * Adds or alters variables available to the page-template.
 */
function nscc_news_preprocess_page(&$variables) {
	$variables['head_title'] = check_plain($variables['head_title']);
	$variables['breadcrumb'] = theme('breadcrumb', drupal_set_breadcrumb($breadcrumb));
	global $meta_breadcrumb;
	if(preg_match('/<meta name=\"breadcrumb\"/',$variables['head'])){
		$variables['head'] = preg_replace('/<meta name=\"breadcrumb\" content=\".*\">\n/',"<meta name=\"breadcrumb\" content=\"$meta_breadcrumb\">\n",$variables['head']);
	}else {
		$variables['head'].="<meta name=\"breadcrumb\" content=\"$meta_breadcrumb\" />\n";
	}
}