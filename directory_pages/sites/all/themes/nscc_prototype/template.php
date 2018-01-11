<?php
// $Id$

/**
 * @file
 * Theme override and template preprocessor functions for NSCC Prototype theme
 */


// Site-specific theme functions and template preprocessors.
switch(variable_get('site_name', null)) {

  case 'News &amp; Events' :
    include_once dirname(__FILE__) . '/news.inc.php';
    break;
  
  default :
  
}


/**
 * Theme override: breadcrumb
 *
 * @param $breadcrumb Array pre-rendered link-elements for breadcrumb
 * @return String Output-ready breadcrumb
 */
function phptemplate_breadcrumb($breadcrumb) {

  // No breadcrumb on NSCC home page.
//  if (variable_get('is_front', false) && variable_get('site_name', null) == 'North Seattle Community College') {
//    return $breadcrumb;
//  }

  $html = '<div id="breadcrumbs"><p>';

  // Build link to main NSCC homepage.
  $opts['attributes'] = array('title'=>'NSCC Homepage');
  $nscc_home = l('NSCC', 'http://www.northseattle.edu/', $opts);

  // Alter standard Drupal breadcrumb.
  if (! empty($breadcrumb)) {
  
    // Replace default 'Home' link.
    $sitename = ucwords(variable_get('site_name', null));
    if ($sitename) { $breadcrumb[0] = l($sitename, '<front>'); }

    // Prepend NSCC homepage link.
    array_unshift($breadcrumb, $nscc_home);

    // Rebuild breadcrumb array.
    $delimiter = ' <img alt="" src="' . base_path() . path_to_theme() . '/imgs/bullet-crumb.png"/> ';
    $html .= implode($delimiter, $breadcrumb);
  }
  else { $html .= $nscc_home; }
  $html .= "</p></div>\n";
  return $html;
}






/**
 * Template preprocessor: search-block-form.tpl.php.
 *
 * @see search-block-form.tpl.php
 */
function phptemplate_preprocess_search_block_form(&$variables) {
  $form_submit = $variables['form']['submit'];
  $variables['search']['submit'] = '<input type="image" class="searchbutton" src="'
    . base_path()
    . $variables['directory']
    . '/imgs/button-search.png" id="'
    . check_plain($form_submit['#id']) . '" value="'
    . check_plain($form_submit['#value']) . '" name="'
    . check_plain($form_submit['#name']) . '" />';
// $variables['dump'] = print_r($variables,1);
}





/**
 * Template preprocessor: page
 *
 * @see page.tpl.php
 */
function phptemplate_preprocess_page(&$variables) {
  $variables['dump'] = print_r($variables, 1);
}