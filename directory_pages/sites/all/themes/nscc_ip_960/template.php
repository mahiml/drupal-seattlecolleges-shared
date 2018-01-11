<?php
// $Id$

/**
 * @file template.php
 *
 * Theme override and template preprocessor functions for nscc_ip_960 theme.
 */




/**
 *		Node Preprocessor
 */
function nscc_ip_960_preprocess_node(&$variables) {
	$node = $variables['node'];

	switch ($node->type) {

		//Slide
		case 'fp_slide':
			$variables['slide_link_attr'] = drupal_attributes(array('href'=>check_url($node->field_fp_slide_link[0]['url']),'title'=>$node->title)); 
			$variables['photo'] = $node->field_fp_slide_photo[0]['view'];
			$colorpath = _path_to_theme_asset('imgs/slidecolor-'.strtolower($node->field_fp_slide_bg_color[0]['value']).'.png');
			$variables['classes'] .= ' fp_slide';
			$variables['content_attr'] = drupal_attributes(array('style'=>'background: transparent url('.$colorpath.') top right no-repeat','class'=>'fp_slide-content'));
			$variables['content']	 =	check_markup($node->body,$node->format);
			$variables['slide_navigation'] = ''; //later will have stuff
			break;

		//Callout
		case 'callout':
			$variables['callout_title'] = check_plain($node->title);
			$variables['callout_url'] = $variables['field_callout_destination'][0]['value'];
			$variables['callout_content'] = check_markup($variables['field_callout_text'][0]['value'],$variables['field_callout_text'][0]['format'],false);
			$variables['classes'] = str_replace('callout', 'ip-callout', $variables['classes']);
			switch ($node->callout_fp_position) {
				case 1: $variables['classes'] .= ' alpha'; break;
				case 3: $variables['classes'] .= ' omega'; break;
			}
			
			// Inline style for background.
			$img_path = $node->field_callout_bg_graphic[0]['filepath'];
			if ($img_path) {
			  $variables['callout_styles'] .= 'style="background: url('.base_path().$img_path.') bottom right no-repeat;"';
			} else {
				unset($variables['callout_styles']);
			}
      //watchdog('theme', 'Callout vars: <pre>'.print_r($variables, true)."</pre>\n");
	}
	//watchdog('theme', 'Node vars: <pre>'.print_r($variables, true)."</pre>\n");
}




/**
 *		Page Preprocessor
 */
function nscc_ip_960_preprocess_page(&$variables) {
	$node = $variables['node'];
	
	switch ($node->type) {

		// front_page
		case 'front_page':
			// Theme the callouts
			for ($i = 1; $i <=3; $i++) {
				$field = 'field_callout_'.$i;
				$noderef = $node->$field;
				$nid = $noderef[0]['nid'];
				if ($nid > 0) {
					$callout_node = node_load($nid, null, true);
					$callout_node->callout_fp_position = $i;
					$callouts[$i] = theme('node', $callout_node);
				}			 
			}
			if (!empty($callouts)) {
				$variables['frontpage_callouts'] = implode("\n", $callouts);
			}
			
			// News headlines
			$variables['left'] .= '<div class="news-headlines"><h2>News</h2>'.views_embed_view('ip_news', 'block_1').'</div>';
			break;
	}
	$variables['footer_mid_left'] = !empty($variables['footer_mid_left'])
		? $variables['footer_mid_left']
		: '<img src="/sites/all/themes/nscc_ip_960/imgs/ib_bldg.jpg" alt="Daisies on the roof plaza" />';
	$variables['footer_mid_right'] = !empty($variables['footer_mid_right'])
		? $variables['footer_mid_right']
		: '<img src="/sites/all/themes/nscc_ip_960/imgs/pe_courtyard.jpg" alt="Courtyard stairs by the Wellness Center" />';
	$variables['footer_right'] = !empty($variables['footer_right'])
		? $variables['footer_right']
		: '<h2>Agents Info</h2>';
	//watchdog('theme', 'Page vars: <pre>'.print_r($variables, true)."</pre>\n");
}




/**
 *		Block Preprocessor
 */
function nscc_ip_960_preprocess_block(&$variables) {
	$block = $variables['block'];
	
	$variables['classes'] .= !empty($block->subject)
		? ' block-' . check_plain(strtolower(preg_replace('/\s+/', '-', $block->subject)))
		: '';
	//watchdog('theme', 'Block vars: <pre>'.print_r($variables, true)."</pre>\n");
}