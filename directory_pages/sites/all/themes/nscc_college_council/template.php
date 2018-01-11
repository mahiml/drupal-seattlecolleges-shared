<?php
// $Id$

/**
 * @file template.php
 *
 * Theme override and template preprocessor functions for NSCC College Council website theme
 */



/**
 * Template preprocessor: page
 *
 * @see page.tpl.php
 */
function nscc_college_council_preprocess_page(&$variables) {
	if ($variables['is_front']) {
		$variables['title'] = 'College Council';
	}
	//watchdog('cc theme', 'Page vars: <pre>'.print_r($variables, true)."</pre>\n");
}




/**
 * Template preprocessor: node
 *
 * @see node.tpl.php
 */
function nscc_college_council_preprocess_node(&$variables) {
	$node = $variables['node'];

	switch ($node->type) {

		// Node: minutes
		case 'minutes' :
			//watchdog('cc theme', 'Minutes vars: <pre>'.print_r($variables, true)."</pre>\n");
			$variables['content'] = $variables['teaser'] ? $variables['field_synopsis'][0]['view'] : $variables['content'];
			$variables['submitted'] = date('M jS Y h:ia', $variables['created']);
			$variables['submitted'] .= ($variables['created'] !== $variables['changed']) ? ' (updated '.date('M jS Y h:ia', $variables['changed']).')': '';
			break;

	}
	//watchdog('cc theme', 'Node vars: <pre>'.print_r($variables, true)."</pre>\n");
}





/**
 * Template preprocessor: block
 *
 * @see block.tpl.php
 */
function nscc_college_council_preprocess_block(&$variables) {
	$block = $variables['block'];
	$variables['block_id_attr'] = "block-{$block->module}-{$block->delta}";
	//watchdog('cc theme', 'Block vars: <pre>'.print_r($variables, true)."</pre>\n");
}
