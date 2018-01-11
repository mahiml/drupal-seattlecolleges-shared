<?php
// $Id$

/**
 * @file template.php
 *
 * Theme override and template preprocessor functions for Library theme
 */




/**
 * Template preprocessor: page
 *
 * @see page.tpl.php
 */
function nscc_library_960_preprocess_page(&$variables) {
	$node = $variables['node'];
	switch ($node->type) {
		case 'page':
			// Replace title unset by 960 base theme.
			$variables['title'] = check_plain($node->title);
			
			// Title banner formatting.
			if ($node->field_image[0]['filesize'] > 0) {
				// For some reason height & width values don't appear to be included
				// in ImageField data-array, so we need to get the image properties
				// again, even though they could have easily been included by the
				// module. WTF?!
				$img_info = image_get_info($node->field_image[0]['filepath']);
				$banner['src'] = base_path() . check_plain($node->field_image[0]['filepath']);
				$banner['img'] = '<img src="' . $banner['src'] . '"';
				$banner['img'] .= $node->field_image[0]['data']['alt'] ? ' alt="' . check_plain($node->field_image[0]['data']['alt']) .'"' : '';
				$banner['img'] .= $node->field_image[0]['data']['title'] ? ' title="' . check_plain($node->field_image[0]['data']['title']) . '"' : '';
				$banner['img'] .= ' />';
				switch ($node->field_image_layout[0]['value']) {
					case 'Above Title' :
						$variables['content_banner_before'] = $banner['img'];
						break;
					case 'Below Title' :
						$variables['content_banner_after'] = $banner['img'];
						break;
					case 'Below Content' :
						$variables['content_banner_bottom'] = $banner['img'];
						break;
					case 'Behind Title' :
						if ($img_info['height']) {
							$title_color = $node->field_title_color[0]['value'] == 'Light' ? 'light' : 'dark';
							$variables['content_banner_behind']['wrapper_attr'] = drupal_attributes( array('style' => 'position:relative; height:' . $img_info['height'] . 'px;background:transparent url(' . $banner['src'] . ') bottom left no-repeat;overflow:hidden;') );
							$variables['content_banner_behind']['title_attr'] = drupal_attributes( array(
									'style' => 'position:absolute; bottom:0; left:0; margin:0; padding:6px; line-height:110%; width:100%;',
									'class' => 'title-color-' . $title_color
								));
						}
						break;
					case 'Instead of Title' :
						if ($img_info['height']) {
							$variables['content_banner_instead']['h1_attr'] = drupal_attributes( array('style' => 'position:relative;height:' . $img_info['height'] . 'px;'));
							$variables['content_banner_instead']['span_attr'] = drupal_attributes( array('style' => 'position:absolute;top:0;left:0;width:100%;height:100%;background:transparent url(' . $banner['src'] . ') top left repeat;'));
						}
						break;
				}
			}
			//watchdog('theme', 'Page vars: <pre>'.print_r($variables, true)."</pre>\n");
			break;
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
 * @see node-page.tpl.php
 */
function nscc_library_960_preprocess_node(&$variables) {
}
