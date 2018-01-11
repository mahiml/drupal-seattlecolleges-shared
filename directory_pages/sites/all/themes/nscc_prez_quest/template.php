<?php
// $Id$

/**
 * @file template.php
 *
 * Theme overrides & preprocessors for PrezQuest
 */


/**
 * Theme override: node-submitted info
 *
 * @param $node Node object for which the submitted meta-data is to be themed
 * @return String Output-ready node meta-info
 */
function nscc_prez_quest_node_submitted($node) {
  // Only show for specified nodes.
//  watchdog('Theme', 'Node submitted func');
  switch($node->type) {
    case 'blog':
    case 'forum':
    case 'story':
      return t('@datetime',
        array(
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
function nscc_prez_quest_comment_submitted($comment) {
//  watchdog('Theme', 'comment submitted func');
  return t('@datetime',
    array(
      '@datetime' => format_date($comment->timestamp, 'custom', 'M jS Y g:ia'),
    ));
}

