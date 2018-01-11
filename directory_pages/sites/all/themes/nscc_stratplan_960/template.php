<?php
// $Id$

/**
 * @file template.php
 *
 * Theme override and template preprocessor functions for nscc_stratplan_960 theme.
 */





/**
 * HOOK Theme
 *
 * Registers theming hooks for content built by this module.
function nscc_stratplan_theme($existing, $type, $theme, $path) {
	return array(
		'core_theme_objectives' => array(
			'arguments' => array('objectives' => null),
		),
	);
}
 */





/**
 * Theme function: Core Theme Objectives
 *
 * Formats a list of Objective 
function theme_core_theme_objectives($objectives) {
	if (is_array($objectives) && $objectives][0]['nid'] > 0) {
	
	}
	watchdog('stratplan theme', 'CT Objectives: <pre>'.print_r($objectives, true)."</pre>\n");
}
 */





/**
 * Page Template Preprocessor
 */
function nscc_stratplan_960_preprocess_page(&$variables) {
	$node = $variables['node'];
	
	// Front page mods
	if ($variables['is_front']) {
		unset($variables['title']);	// suppresses title (not needed for front page)
	}


	// Node-specific page mods
	switch ($node->type) {

		// Page: Core-Theme node
		case 'core_theme':
			$variables['head_title'] = 'Core Theme '.$node->field_report_index[0]['view'].': '.$variables['head_title'];
			$variables['title'] = $variables['title'].' <span class="core-theme-id">(Core Theme '.$node->field_report_index[0]['view'].')</span>';
			break;


		// Page: Objective node
		case 'ct_objective':
			$variables['head_title'] = 'Objective '.$node->field_report_index[0]['view'].': '.$variables['head_title'];
			$variables['title'] = $variables['title'].' <span class="objective-id">(Objective '.$node->field_report_index[0]['view'].')</span>';
			break;


		// Page: Indicator node
		case 'ct_indicator':
			$variables['head_title'] = 'Indicator '.$node->field_report_index[0]['view'].': '.$variables['head_title'];
			$variables['title'] = $variables['title'].' <span class="indicator-id">(Indicator '.$node->field_report_index[0]['view'].')</span>';
			break;
	}


	// Ensure any mods to $head, $scripts, and $styles make it to output.
	$variables['scripts'] = drupal_get_js();
	$variables['styles'] = drupal_get_css();
	$variables['head'] = drupal_get_html_head();

	//watchdog('theme', 'Page vars: <pre>'.print_r($variables, true)."</pre>\n");
}





/**
 * Node Template Preprocessor
 */
function nscc_stratplan_960_preprocess_node(&$variables) {
	$node = $variables['node'];

	switch ($node->type) {


		// Page node
		case 'page':
			break;


		// Story node
		case 'story':
			break;


		// Forum (Topic) node
		case 'forum':
			break;


		// Core-Theme node
		case 'core_theme':
			if ($variables['page']) {
				$variables['content'] = $variables['field_detail_description'][0]['view'];	// use detailed desc for page view.
			} else {
				$variables['content'] = $variables['field_short_description'][0]['view'];	// use abbr desc for list/teaser view.
			}
			foreach ($variables['field_related_objectives'] as $key => $vals) {
				$index_val = _nscc_stratplan_960_fetch_report_index($vals['nid']);
				if ($index_val) {
					$objectives[$key] = "<li><span class=\"objective-number\">$index_val</span> ${vals['view']}</li>";
					$variables['node']->field_related_objectives[$key]['report_index'] = $index_val;	// may as well stash it in the node itself while we're at it.
				}
			}
			$variables['related_objectives'] = $objectives ? '<ol class="related-objectives-list">'.implode("\n", $objectives).'</ol>' : '';
			break;


		// Indicator node
		case 'ct_indicator':
			break;


		// Objective node
		case 'ct_objective':
			foreach ($variables['field_o_related_indicators'] as $key => $vals) {
				$index_val = _nscc_stratplan_960_fetch_report_index($vals['nid']);
				if ($index_val) {
					$indicators[$key] = "<li><span class=\"indicator-number\">$index_val</span> ${vals['view']}</li>";
					$variables['node']->field_o_related_indicators[$key]['report_index'] = $index_val;
				}
			}
			$variables['related_indicators'] = $indicators ? '<ol class="related-indicators-list">'.implode("\n", $indicators).'</ol>' : '';
			//watchdog('theme', 'Node vars: <pre>'.print_r($variables, true)."</pre>\n");
			break;


		// Initiative node
		case 'initiative':
			break;

	}
	//watchdog('theme', 'Node vars: <pre>'.print_r($variables, true)."</pre>\n");
}





/**
 * Block Template Preprocessor
 */
function nscc_stratplan_960_preprocess_block(&$variables) {
	//$block = $variables['block'];
	//watchdog('theme', 'Block vars: <pre>'.print_r($variables, true)."</pre>\n");
}





/**
 * Views Template Preprocessor: Core-Theme field (block 1)
 * Adds additional info to field-formatting template for block-1 which is used as
 * site's sidebar menu.
 */
function nscc_stratplan_960_preprocess_views_view_field__core_themes__block_1__title(&$variables) {
	$field = $variables['field'];
	$node_path = $field->options['alter']['path'];
	$link_text = $field->original_value;
	$options = array(
		'attributes' => array(
			'class' => 'core-theme-menu-link',
		),
	);
	$output = l($link_text, $node_path, $options);
	$variables['output'] = $output ? $output : $variables['output'];
}





/**
 * Views Template Preprocessor: Core-Theme field (block 2)
 * Adds additional info to field-formatting template for block-2 which is used on
 * site's front page.
 */
function nscc_stratplan_960_preprocess_views_view_field__core_themes__block_2__title(&$variables) {
	$field = $variables['field'];
	//watchdog('stratplan theme', 'views item (title): <pre>'.print_r($variables, true)."</pre>\n");
	//watchdog('stratplan theme', 'views item (title) field: <pre>'.print_r($field, true)."</pre>\n");
	$node_path = $field->options['alter']['path'];
	$link_text = $field->original_value;
	//$path_alias = drupal_get_path_alias($node_path);
	$output = l($link_text, $node_path, array('attributes'=>array('class'=>'core-theme-link')));
	$variables['output'] = $output ? $output : $variables['output'];
}





/**
 * Views Template Preprocessor: Initiative field (block 1)
 * Adds additional info to field-formatting template for block-1 which is used as
 * site's sidebar menu.
 */
function nscc_stratplan_960_preprocess_views_view_field__initiative__block_1__title(&$variables) {
	$field = $variables['field'];
	$node_path = $field->options['alter']['path'];
	$link_text = $field->original_value;
	$options = array(
		'attributes' => array(
			'class' => 'initiative-menu-link',
		),
	);
	$output = l($link_text, $node_path, $options);
	$variables['output'] = $output ? $output : $variables['output'];
}





/**
 * Helper function: Fetches report index value for specified NID
 */
function _nscc_stratplan_960_fetch_report_index($nid) {
	$sql = "SELECT field_report_index_value FROM {content_field_report_index} where nid = %d";
	$val = db_result(db_query($sql, $nid));
	//watchdog('stratplan theme', "Report index: NID=$nid Val=$val");
	return $val;
}