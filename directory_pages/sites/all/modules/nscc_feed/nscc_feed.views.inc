<?php
// $Id: nscc_feed.views.inc,v 1.236.2.3 2009/01/12 10:09:19 goba Exp $

/**
 * @file
 * Views API callbacks for the nscc_feed module.
 */

/**
* Implementation of hook_views_data().
*/

function nscc_feed_views_data(){
	$data['nscc_feed']['table']['group'] = t('NSCC Feed');
	$data['nscc_feed']['table']['base'] = array(
		'field'=>'feedid',
		'title' => t('NSCC Feed'),
		'help' => t('NSCC Feed associates with nodes to build custom feeds.'),
		'weight' => 0
	);
	$data['nscc_feed']['table']['join']['node'] = array(
		'left_table'=>'nscc_feed_content',
		'left_field'=>'feedid',
		'field'=>'feedid',
	);
	$data['nscc_feed_content']['table']['group'] = t('NSCC Feed');
	$data['nscc_feed_content']['table']['join']['node'] = array(
		'left_field' =>'nid',
		'field'=>'nid',
	);
	$data['nscc_feed_content']['association_date'] = array(
		'title'=>t('Feed Association Date'),
		'help'=>t('The Date content was associated with the feed.'),
		'field'=> array(
			'title'=>t('Feed Association Date'),
			'handler'=> 'views_handler_field_date',
		),
		'sort'=> array(
			'title'=>t('Feed Association Date'),
			'handler'=>'views_handler_sort_date',
		),	
	);
	$data['nscc_feed']['feedid'] = array(
		'title'=>t('Feed ID'),
		'help'=>t('The Feed ID'),
		'argument'=> array(
			'title'=>T('Feed'),
			'handler'=> 'views_handler_argument_numeric',
		),	
	);
	$data['nscc_feed']['feedname'] = array(
		'title'=>t('Feed Name'),
		'help'=>t('The Feed Name'),
		'field'=> array(
			'title'=>T('Feed Name'),
			'handler'=> 'views_handler_field_string',
		),	
		'argument'=> array(
			'title'=>T('Feed Name'),
			'handler'=> 'views_handler_argument_string',
		),	
		'filter'=> array(
			'title'=>T('Feed Name'),
			'handler'=> 'views_handler_filter_string',
		),	

	);
	return $data;
}
