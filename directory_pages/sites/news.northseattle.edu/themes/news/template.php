<?php
// $Id$

/**
 * @file template.php
 * Theme override functions for NSCC News Site
 */



/**
 * Template preprocess: node
 *
 * Adds or alters variables available to the node-template.
 */
function phptemplate_preprocess_node(&$variables) {

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
  
  // Hide the listing of Sources for this node if module has determined this
  // user-account is not hork-enabled.
  if ($variables['hide_sources']) {
    $variables['taxonomy'] = false;
  }
}

