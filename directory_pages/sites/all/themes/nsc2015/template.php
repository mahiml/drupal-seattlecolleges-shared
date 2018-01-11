<?php
// $Id$

/**
 * @file template.php
 *
 * Theme override and template preprocessor functions for NSCC main website theme
 */



/**
 * Template preprocessor: page
 *
 * @see page.tpl.php
 */
function nsc2015_preprocess_page(&$variables) {
	global $meta_breadcrumb;
	$breadcrumb = drupal_get_breadcrumb();	//node mods will alter as needed.


	// Add styles for admin and content manager interfaces as needed.
	if (arg(0) == 'admin' || arg(0) == 'manage' || arg(2) == 'edit' || arg(2)=='delete' || arg(2)=='revisions') {
		drupal_add_css(path_to_theme().'/css/nsc2015-admin.css', 'theme');
	}
	
	
	// Add iOS icon tags
	switch (arg(0)) {
		case 'schedule':
			$ios_tags[] = '<link rel=" apple-touch-icon-precomposed" href="'.base_path().path_to_theme().'/imgs/ios/iphone-sched-pre.png" />';
			$ios_tags[] = '<link rel="a apple-touch-icon-precomposed" sizes="72x72" href="'.base_path().path_to_theme().'/imgs/ios/ipad-sched-pre.png" />';
			$ios_tags[] = '<link rel="apple-touch-icon-precomposed" sizes="114x114" href="'.base_path().path_to_theme().'/imgs/ios/iphone4-sched-pre.png" />';
			drupal_set_html_head(implode("\n", $ios_tags));
		break;
		
		default:
			$ios_tags[] = '<link rel="apple-touch-icon-precomposed" href="'.base_path().path_to_theme().'/imgs/ios/iphone-pre.png" />';
			$ios_tags[] = '<link rel="apple-touch-icon-precomposed" sizes="72x72" href="'.base_path().path_to_theme().'/imgs/ios/ipad-pre.png" />';
			$ios_tags[] = '<link rel="apple-touch-icon-precomposed" sizes="114x114" href="'.base_path().path_to_theme().'/imgs/ios/iphone4-pre.png" />';
			drupal_set_html_head(implode("\n", $ios_tags));
	}
	

	// Node-specific mods.
	$node = $variables['node'];
	if ($node) {
		switch($node->type) {

			// Front
			case 'front_page' :
				//promo
				$promo_noderef = $node->field_fp_promo;
				$promo_node = node_load($promo_noderef[0]['nid'],null,true);
				$variables['featured_promos_end'] .= "<div id='promo-home' class='grid-3'>\n".$promo_node->body."</div>\n";
		
				//callouts
				$callout_text = '<div id="home-callouts">';
				for ($i = 1; $i <=4; $i++) {
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


			// Ad Frame
			case 'ad_frame' :
				//promo
				$promo_noderef = $node->field_fp_promo;
				$promo_node = node_load($promo_noderef[0]['nid'],null,true);
				if($promo_node->body){
					$variables['promo'] .= "<div id=\"promo-home\">\n".$promo_node->body."</div>\n";
				}
				//callouts
				$field = 'field_callout_1';
				$noderef = $node->$field;
				$nid = $noderef[0]['nid'];
				if ($nid > 0) {
						$callout_node = node_load($nid, null, true);
						$callout_node->callout_fp_position = 1;
						$variables['first_callout'] = theme('node', $callout_node);
				}			 
				$field = 'field_callout_3';
				$noderef = $node->$field;
				$nid = $noderef[0]['nid'];
				if ($nid > 0) {
						$callout_node = node_load($nid, null, true);
						$callout_node->callout_fp_position = 4;
						$variables['last_callout'] = theme('node', $callout_node);
				}			 
				//testimonial
				if($node->field_testi[0]){
					$variables['testimonial'] = '<div class="testimonials">';
					$output_node = node_load($node->field_testi[0]['nid'],null,true);
					if ($output_node->type == 'testimonial'){
						 $variables['testimonial'] .= _nsc2015_testimonial($output_node);
					}
					$variables['testimonial'] = '</div>';
				}
				//related_links
				if ($node->field_related_links[0]['url']){
					$variables['related_links'] = "<div class=\"related-info-links\"><h3>Related Info</h3>\n<ul>\n";
					foreach($node->field_related_links as $current_related_link){
						$variables['related_links'].="<li>".l($current_related_link['title'],$current_related_link['url'])."</li>\n";
					}
					$variables['related_links'] .= "</ul></div>\n";
				}
				//feed
				if (!empty($node->field_feed[0]['feed_field_url'])){
					$feed_item = $node->field_feed[0];
				  $feed_item['nid'] = $node->nid;
 				  $feed_item['#delta'] = 0;
 				  $feed_settings = array();
  				$feed_data = _feed_field_content($node->nid, $feed_item, $settings);
  				$variables['feed'] .= "<div class=\"news-headlines\">\n";
					if($feed_data){
						$variables['feed'] .= "<h3>What's New</h3>\n";
						foreach ($feed_data as $row) {
							$variables['feed'] .= '<div class="feed-wrapper">';
							$variables['feed'] .= '<div class="feed-title">'.l($row['title'], $row['link']).'</div>';
							$variables['feed'] .= '</div>';
						}
  				}
					$variables['right'] .= "</div>\n";
				}
				//contact
				if($node->field_contact_box[0]['value']){
  				$variables['contact_box'] = check_markup($node->field_contact_box[0]['value'],$node->field_contact_box[0]['format'],false);				
				}
				//content
				$procedure_node = node_load($node->field_content[0]['nid'],null,true);
				if (arg(0) == 'node' && arg(2) == 'edit'){
					//$variables['content'] .= theme('node',$procedure_node,false,true);
				} else{
					$variables['content'] = theme('node',$procedure_node,false,true);
				}
				break;

			// Program (info) page
			case 'page_program' :
			case 'page_program_calendar' :
				if ( !(empty($node->field_redirect_url[0][url])) && arg(2) != "edit"){
					//watchdog("themetest","0:".arg(0)." 1:".arg(1)." 2:".arg(2));
					header('Location: ' . $node->field_redirect_url[0][url], TRUE, 302);
				}

				// Program contact info
				if ($node->field_program[0]['nid'] > 0) {
					$pgm = node_load($node->field_program[0]['nid'], null, true);
					$div = node_load($pgm->field_program_division[0]['nid'], null, true);
					$variables['program_meta'] = theme('node', $pgm, null, true) . theme('node', $div, null, true);
				}
				
				// Program banner - check for program home page status and handle title accordingly.
				if($node->field_hide_title[0]['value']){
					unset($variables['title']);
					$promote_banner = true;
				} else {
					$promote_banner=false;
				}
				if ($pgm->field_program_banner[0]['filesize'] > 0) {
					$variables['program_banner'] = theme('image',
						$pgm->field_program_banner[0]['filepath'],
						check_plain($pgm->field_program_banner[0]['data']['alt']),
						check_plain($pgm->field_program_banner[0]['data']['title']),
						array('class' => 'program-banner'),
						false
					);
					$title_color = check_plain($pgm->field_title_color[0]['value']);
					$title_text = $pgm->field_prog_type[0]['value'] == 1
						? trim($pgm->title) . ' Department'
						: trim($pgm->title) . ' Program';
					$variables['program_banner'] .= _format_banner_title($title_text, $title_color, $promote_banner);
				}
	
				//left column
				$variables['left'] = _nsc2015_program_menu($node)._nsc2015_transfer_degreeslist($node)._nsc2015_program_awardslist($node).$variables['left'];

				//right column
				if ($pgm->field_related_links[0]['url']){
					$variables['right'] = "<div class=\"related-info-links\"><h3>Related Info</h3>\n<ul>\n";
					foreach($pgm->field_related_links as $pgm_related_link){
						$variables['right'].="<li>".l($pgm_related_link['title'],$pgm_related_link['url'])."</li>\n";
					}
					$variables['right'] .= "</ul></div>\n";
				}
				//feed goes here
				if (!empty($pgm->field_feed[0]['feed_field_url'])){					
					$variables['right'] .= "<div class=\"news-headlines\"><h3>What's New</h3>\n";
					$feed_item = $pgm->field_feed[0];
				  $feed_item['nid'] = $pgm->nid;
 				  $feed_item['#delta'] = 0;
 				  $feed_settings = array();
  				$feed_data = _feed_field_content($pgm->nid, $feed_item, $settings);
  				foreach ($feed_data as $row) {
    				$variables['right'] .= '<div class="feed-wrapper">';
  					$variables['right'] .= '<div class="feed-title">'.l($row['title'], $row['link']).'</div>';
  					$variables['right'] .= '</div>';
  				}
					$variables['right'] .= "</div>\n";
				}
				$variables['right'] .= _nsc2015_program_testimonials($node);

				//calendar 
				if(!empty($pgm->field_program_calendar[0]['url'])){
					_format_calendar($pgm->field_program_calendar[0]['url'],'subscribe_link');
				}
				
				//breadcrumb mod
				$parent_breadcrumbs = _get_parent_breadcrumb($pgm->field_parent[0]['nid']);
				if (!empty($parent_breadcrumbs) && is_array($parent_breadcrumbs)) {
					$breadcrumb = array_merge($breadcrumb, $parent_breadcrumbs);
				}
				//$variables['content']	 =	check_markup($node->body,$node->format);

				switch($node->type) {

					case 'page_program' :
						if (!(arg(0) == 'node' && arg(2) == 'edit' || arg(2)=='delete' || arg(2)=='revisions' || arg(2)=='translate')){
							if ($node->field_alt_node[0]['nid']){
								$alt_node = node_load($node->field_alt_node[0]['nid'],null,true);
								$leader   = !empty($node->field_alt_node_leader[0]['value']) ? '<div class="alt-node-leader">'.check_markup($node->field_alt_node_leader[0]['value'],$node->field_alt_node_leader[0]['format'],false)."</div>\n" : '';
								$follower = !empty($node->field_alt_node_follower[0]['value']) ? '<div class="alt-node-follower">'.check_markup($node->field_alt_node_follower[0]['value'],$node->field_alt_node_follower[0]['format'],false)."</div>\n" : '';
								$node_links = !empty($node->links) ? '<div class="node-links">'.theme('links',$node->links).'</div>' : '';
								$variables['content'] = $leader.theme('node',$alt_node,false,true).$node_links.$follower;
							}
						}
					break;
					
					case 'page_program_calendar' :
					  $variables['right']='';
						if (!(arg(0) == 'node' && arg(2) == 'edit' || arg(2)=='delete')){
							$calendar_mode = $node->field_prog_cal_mode[0]['value'] ? $node->field_prog_cal_mode[0]['value']:'monthview_embed_program';
							$variables['content'] = !empty($node->field_calendar_blurb[0]['value']) ? '<div class="calendar-blurb">'.check_markup($node->field_calendar_blurb[0]['value'])."</div>\n" : ''; 
							$variables['content'] .= '<div id="embedded-google-calendar-wrapper">'._format_calendar($node->field_prog_calendar_url[0]['url'],$calendar_mode)."</div>\n";
						}
					break;
				}				
				$variables['scripts'] = drupal_get_js();	// ensures all req js gets included.
				break;


			// Section, Scholarship, Work Study, etc. pages
			case 'page_section' :
			case 'scholarship' :
			case 'wkstudy_job':
			case 'section_calendar':
			case 'tuition' :
			case 'policy' :
			case 'term' :
			case 'storm_team' :
			case 'storm_player' :
			case 'storm_game' :
			case 'storm_schedule' :
			case 'section_auction' :
			case 'auction_package' :
			case 'auction_sponsor' :
			case 'fs_weekly_menu' :
				switch($node->type) {

					case 'scholarship' :
						$section = node_load(373, null, true);
						$section_homepage = node_load($section->field_section_home[0]['nid']);
						if (!empty($node->field_url[0]['view'])) {
							//$variables['title'] = l($node->title, $node->field_url[0]['url'], array('attributes' => array('title' => 'Scholarship details from sponsor')));
							$variables['title'] = l($node->title, $node->field_url[0]['display_url'], array('attributes' => array('title' => 'Scholarship details from sponsor'), 'external' => true));
							//watchdog('prod theme', 'Scholarship page vars (preproc):<pre>'.print_r($variables, true)."</pre>\n");
						}
						break;
						
					case 'wkstudy_job' :
						$section = node_load(586, null, true);
						$section_homepage = node_load($section->field_section_home[0]['nid']);
						break;
					
					case 'tuition' :
						$section = node_load(690, null, true);
						$section_homepage = node_load($section->field_section_home[0]['nid']);
						$variables['template_files'][] = 'page-node-page_section';
						break;

					case 'policy' :
						$section = node_load(853, null, true);
						$section_homepage = node_load($section->field_section_home[0]['nid']);
						$variables['template_files'][] = 'page-node-page_section';
						break;

					case 'term' :
						$section = node_load(853, null, true);
						$section_homepage = node_load($section->field_section_home[0]['nid']);
						$variables['template_files'][] = 'page-node-page_section';
						break;

					case 'fs_weekly_menu':
						$section = node_load(1579, null, true);
						$section_homepage = node_load($section->field_section_home[0]['nid']);
						$variables['template_files'][] = 'page-node-page_section';
						
						// Replace page titles with something that includes the menu dates.
						$week_start = strtotime($node->field_fs_wm_date[0]['value']);
						$week_end = strtotime('+4 days', $week_start);
						$variables['title'] = 'Cafeteria Menu: '.date('D, M j',$week_start).'—'.date('D, M j', $week_end);
						$title = explode(' | ', $variables['head_title']);
						array_shift($title);	// removes old node-title set by core from front of array
						array_unshift($title, date('D, j M Y', $week_start).'-'.date('D, j M Y', $week_end), 'Cafeteria Menu'); // prepends our new title
						$variables['head_title'] = implode(' | ', $title);
						//watchdog('theme', 'FS Menu Page Vars: <pre>'.print_r($variables,true)."</pre>\n");
						break;

					case 'storm_team' :
					case 'storm_player' :
					case 'storm_game':
					case 'storm_schedule':
//						$section = ($node->field_player_gender[0]['value'] == 'Female') ? node_load(1746, null, true) : node_load(1747, null, true);
						$section = node_load(1073, null, true);
						$section_homepage = node_load($section->field_section_home[0]['nid']);
						$variables['template_files'][] = 'page-node-page_section';
						break;
					
					case 'auction_package' :
					case 'auction_sponsor' :
						$auction = node_load($node->field_related_auction[0]['nid'], null, true);
						$node->field_section = $auction->field_section;
						//fallthrough to next for templating and section-branding.
					case 'section_auction' :
						$variables['template_files'][] = 'page-node-page_section';
						//fallthrough to default for section-branding.
					default :
						if ($node->field_section[0]['nid'] > 0) {
							$section = node_load($node->field_section[0]['nid'], null, true);
							//watchdog('calembtest','<pre>'.print_r($section,true).'</pre>');
							$section_homepage = node_load($section->field_section_home[0]['nid']);
						}
				}
				if($node->type=='section_calendar'){
					$variables['template_files'][]='page-node-page_section';
					//watchdog('calembtest','Var Dump: <pre>'.print_r($variables,true).'</pre>');					
				}
				
				// Others get a banner graphic
				else {
					// Adjust content-title if this is the section's home page.
					if($node->field_hide_title[0]['value']){
						unset($variables['title']);
						$promote_banner = true;
					} else {
						$promote_banner=false;
						//$variables['title'] = check_plain($node->title);
					}
					if ($section->field_program_banner[0]['filesize'] > 0) {
						$variables['section_banner'] = theme('image',
							$section->field_program_banner[0]['filepath'],
							check_plain($section->field_program_banner[0]['data']['alt']),
							check_plain($section->field_program_banner[0]['data']['title']),
							array('class' => 'title-banner'),
							false
						);
						$title_color = check_plain($section->field_title_color[0]['value']);				
						$variables['section_banner'] .= _format_banner_title(trim($section->title), $title_color, $promote_banner);
					}
				}
				

				//Left column
				
				//section menu
				$variables['left'] = _nsc2015_section_menu($node).$variables['left'];

				//promo
				if ($node->field_fp_promo[0]['nid'] > 0) {
					$promo_node = node_load($node->field_fp_promo[0]['nid'], null, true);
					if($promo_node->body){
						$variables['left'] .= "<div id=\"promo-home\">\n".$promo_node->body."</div>\n";
					}
				}

				//callouts 1 and 2
				$field = 'field_section_co_1';
				$noderef = $section->$field;
				$nid = $noderef[0]['nid'];
				if ($nid > 0) {
						$callout_node = node_load($nid, null, true);
						$callout_node->callout_fp_position = 5;
						//$variables['first_callout'] = theme('node', $callout_node);
						$variables['left'] .= theme('node', $callout_node);
				}			 

				$field = 'field_section_co_2';
				$noderef = $section->$field;
				$nid = $noderef[0]['nid'];
				if ($nid > 0) {
						$callout_node = node_load($nid, null, true);
						$callout_node->callout_fp_position = 5;
						//$variables['first_callout'] = theme('node', $callout_node);
						$variables['left'] .= theme('node', $callout_node);
				}

				//Add bball rosters to left column as needed.
				$variables['left'] .= ($section->nid == 1073) ? views_embed_view('teams', 'block_3') : '';
/*	Disabled gender subsections - delete this pending review
				switch ($section->nid) {
					case 1746 :
						$variables['left'] .= views_embed_view('teams', 'block_1');
						break;
					case 1747 :
						$variables['left'] .= views_embed_view('teams', 'block_2');
						break;
				}
*/				

				//Right column

				// Contact box
				if($section->field_contact_box[0]['value']){
  				$variables['right'] .= '<div class="contact-info"><h2>' . check_plain($section->title) . ' Contacts</h2>'.check_markup($section->field_contact_box[0]['value'],$section->field_contact_box[0]['format'],false);
					if(module_exists('nscc_locator') && $section->field_contact_room[0]['value']){
							$sector_node = _nscc_locator_get_sector_by_room($section->field_contact_room[0]['value']);
							$src_url = "/".$sector_node->field_minimap[0]['filepath'];
							$alt_text = $sector_node->field_sector_description[0]['value'];
							$loc_desc = check_plain($section->field_contact_room[0]['value']);
							$variables['right'] .= <<<CONTACT_LOCATION

	<div class="room">
		<h3>Location:</h3>
		<div class="location-description">$loc_desc ($alt_text)</div>
		<div class="location-img">
			<img class="locator-minimap" src="$src_url" alt="$alt_text" title="$alt_text" />
		</div>
	</div>
CONTACT_LOCATION;
					}
      				$variables['right'] .= "</div>\n";				
				}
				
				//callouts 3 and 4
				$field = 'field_section_co_3';
				$noderef = $section->$field;
				$nid = $noderef[0]['nid'];
				if ($nid > 0) {
						$callout_node = node_load($nid, null, true);
						$callout_node->callout_fp_position = 5;
						//$variables['first_callout'] = theme('node', $callout_node);
						$variables['right'] .= theme('node', $callout_node);
				}			 

				$field = 'field_section_co_4';
				$noderef = $section->$field;
				$nid = $noderef[0]['nid'];
				if ($nid > 0) {
						$callout_node = node_load($nid, null, true);
						$callout_node->callout_fp_position = 5;
						//$variables['first_callout'] = theme('node', $callout_node);
						$variables['right'] .= theme('node', $callout_node);
				}
				
				// Auction sponsors (Edfund)
				if ($node->type == 'section_auction') {
					$sponsorships = _theme_auction_sponsorships($node->field_auction_sponsorship);
					if ($sponsorships) {
						$variables['right'] .= '<div id="auction-sponsors-list"><h2>Event Sponsors</h2>';
						foreach ($sponsorships as $sponsor) {
							$variables['right'] .= $sponsor['value']['field_sponsor'][0]['view'];
						}
						$variables['right'] .= '</div>';
					}
					/*	*** REFACTORED - view is now obsolete.
					else {
						$variables['right'] .= '<h2>Event Sponsors</h2>' . views_embed_view('auctions', 'page_2', $node->nid);
					}
					*/
					//watchdog('theme', 'Auction vars: <pre>'.print_r($variables, true)."</pre>\n");
				}
				
				// Related info links
				if ($section->field_related_links[0]['url']){
					$variables['right'] .= "<div class=\"related-info-links\"><h3>Related Info</h3>\n<ul>\n";
					foreach($section->field_related_links as $section_related_link){
						$variables['right'].="<li>".l($section_related_link['title'],$section_related_link['url'])."</li>\n";
					}
					$variables['right'] .= "</ul></div>\n";
				}

				// Resources links
				if ($section->field_resources[0]['url']){
					$variables['right'] .= "<div class=\"related-info-links\"><h3>Resources</h3>\n<ul>\n";
					foreach($section->field_resources as $section_related_link){
						$variables['right'].="<li>".l($section_related_link['title'],$section_related_link['url'])."</li>\n";
					}
					$variables['right'] .= "</ul></div>\n";
				}

				// News feed
				if (!empty($section->field_feed[0][feed_field_url])){
					$variables['right'] .= "<div class=\"news-headlines\"><h3>What's New</h3>\n";
					$feed_item = $section->field_feed[0];
				  $feed_item['nid'] = $section->nid;
 				  $feed_item['#delta'] = 0;
 				  $feed_settings = array();
  				$feed_data = _feed_field_content($section->nid, $feed_item, $settings);
  				foreach ($feed_data as $row) {
    				$variables['right'] .= '<div class="feed-wrapper">';
  					$variables['right'] .= '<div class="feed-title">'.l($row['title'], $row['link']).'</div>';
  					$variables['right'] .= '</div>';
  				}
  				$variables['right'] .= '<div class="feed-subscribe">'.l("Subscribe to our Feed",$section->field_feed[0][feed_field_url] ).'</div>';
					$variables['right'] .= "</div>\n";
				}
				$variables['right'] .= _nsc2015_program_testimonials($node);

				//calendar 
				if(!empty($section->field_section_calendar[0]['url'])){
					_format_calendar($section->field_section_calendar[0]['url'],'subscribe_link');
				}

				// Scholarship or Work Study metadata should replace standard right-column items.
				if ($node->type == 'scholarship' || $node->type == 'wkstudy_job') {
					switch ($node->type) {
						case 'scholarship' :
							if ($node->field_sch_due[0]['view'] || $node->field_url[0]['view'] || $node->field_sch_app[0]['view']) {
								$scholar_meta[] = '<div class="scholarship-meta">';
								$scholar_meta[] = '<ul>';
								$scholar_meta[] = !empty($node->field_sch_due[0]['view']) ? '<li><h3>Application Due Date</h3><span class="scholarship-deadline">'.date('D, M j, Y', strtotime($node->field_sch_due[0]['value'])).'</span></li>' : '';
								$scholar_meta[] = !empty($node->field_url[0]['view']) ? '<li><h3>Scholarship Details</h3> '.$node->field_url[0]['view'].'</li>' : '';
								//$scholar_meta[] = !empty($node->field_sch_app[0]['view']) ? '<li><h3>Application Form</h3> '.$node->field_sch_app[0]['view'].'</li>' : '';	//error in path for ['view']
								$scholar_meta[] = ($node->field_sch_app[0]['filesize'] > 0) ? '<li><h3>Application Form</h3> '.l($node->field_sch_app[0]['filename'], 'https://northseattle.edu/'.$node->field_sch_app[0]['filepath']).'</li>' : '';
								$scholar_meta[] = '</ul>';
								$scholar_meta[] = '</div>';
								$sidebar[] = implode("\n", $scholar_meta);
							}
							if ($node->field_contact_box[0]['view']) {
								$sidebar[] = '<div class="scholarship-contact contact-info">' . $node->field_contact_box[0]['view'] . '</div>';
							}
							break;
						case 'wkstudy_job' :
							//Sidebar: WS meta
							$pay = !empty($node->field_min_pay[0]['value']) ? '$' . number_format($node->field_min_pay[0]['value'], 2) : '';
							$pay .= !empty($node->field_max_pay[0]['value']) ? ' - $' . number_format($node->field_max_pay[0]['value'], 2) : '';
							$ws_meta[] = "<li><label>Pay:</label> $pay</li>";
							$ws_meta[] = $node->field_on_off_campus[0]['value'] == 0 ? '<li><label>Location:</label> On Campus</li>' : '<li><label>Location:</label> Off Campus</li>';
							$ws_meta[] = !empty($node->field_ac_year[0]['view']) ? '<li><label>Year:</label> ' . $node->field_ac_year[0]['view'] . '</li>' : '';
							$ws_meta[] = !empty($node->field_duration_type[0]['view']) ? '<li><label>Duration:</label> ' . $node->field_duration_type[0]['view'] . '</li>' : '';
							$ws_meta[] = !empty($node->field_exp_hours[0]['view']) ? '<li><label>Hours:</label> ' . $node->field_exp_hours[0]['view'] . '</li>' : '';
							$ws_meta[] = !empty($node->field_start[0]['value']) ? '<li><label>Start:</label> ' . date('M j, Y', strtotime($node->field_start[0]['value'])) . '</li>' : '';
							$ws_meta[] = !empty($node->field_end[0]['value']) ? '<li><label>End:</label> ' . date('M j, Y', strtotime($node->field_end[0]['value'])) . '</li>' : '';
							if (!empty($ws_meta)) {
								$ws_meta[] = '</ul></div>';
								array_unshift($ws_meta, '<div class="work-study-meta"><ul>');
								$sidebar[] = implode("\n", $ws_meta);
							}

							//Sidebar: WS contact
							$ws_empl[] = !empty($node->field_ws_dept[0]['view']) ? '<span class="org">' . $node->field_ws_dept[0]['view'] . '</span>' : '';
							$ws_empl[] = !empty($node->field_ws_building[0]['view']) ? '<span class="building">' . $node->field_ws_building[0]['view'] . '</span>' : '';
							$ws_empl[] = !empty($node->field_ws_room[0]['view']) ? '<span class="room">' . $node->field_ws_room[0]['view'] . '</span>' : '';
							$ws_empl[] = !empty($node->field_emp_name[0]['view']) ? '<span class="org">' . $node->field_emp_name[0]['view'] . '</span>' : '';
//							$ws_empl[] = !empty($node->field_irs_fein[0]['view']) ? '<span class="fein">' .$node->field_irs_fein[0]['view'] . '</span>' : '';
							$ws_empl_adr[] = !empty($node->field_emp_street[0]['view']) ? '<span class="street-address">' . $node->field_emp_street[0]['view'] . '</span>' : '';
							$ws_empl_adr[] = !empty($node->field_emp_city[0]['view']) ? '<span class="locality">' . $node->field_emp_city[0]['view'] . '</span>,' : '';
							$ws_empl_adr[] = !empty($node->field_emp_state[0]['view']) ? '<span class="region">' . $node->field_emp_state[0]['view'] . '</span>' : '';
							if (!empty($node->field_emp_zip[0]['view']) && !empty($node->field_emp_zip2[0]['view'])) {
								$ws_empl_adr[] = '<span class="postal-code">' . $node->field_emp_zip[0]['view'] . '-' . $node->field_emp_zip2[0]['view'] . '</span>';
							} elseif (!empty($node->field_emp_zip[0]['view'])) {
								$ws_empl_adr[] = '<span class="postal-code">' . $node->field_emp_zip[0]['view'] . '</span>';
							}
							$ws_empl[] = !empty($ws_empl_adr) ? '<span class="adr">' . implode("\n", $ws_empl_adr) . '</span>' : '';
							$ws_empl[] = (!empty($node->field_emp_link[0]['url']) && valid_url($node->field_emp_link[0]['url'], true)) ? '<span class="email">' . l('Web site', $node->field_emp_link[0]['url'], array('attributes' => array('title' => check_plain($node->field_emp_link[0]['url'])))) . '</span>' : '';
							$ws_contact[] = !empty($node->field_emp_contact[0]['view']) ? '<span class="fn">' . $node->field_emp_contact[0]['view'] . '</span>' : '';
							$ws_contact[] = !empty($node->field_em_email[0]['view']) ? '<span class="email">' . $node->field_em_email[0]['view'] . '</span>' : '';
							$ws_contact[] = !empty($node->field_emp_phone[0]['value']) ? '<span class="tel"><span class="value">' . _format_phone_num($node->field_emp_phone[0]['value']) . '</span> <span class="type">voice</span></span>' : '';
							$ws_contact[] = !empty($node->field_emp_fax[0]['value']) ? '<span class="tel"><span class="value">' . _format_phone_num($node->field_emp_fax[0]['value']) . '</span> <span class="type">fax</span></span>' : '';
							if (!empty($ws_empl) || !empty($ws_contact)) {
								$sidebar[] = '<div class="work-study-contact contact-info vcard">';
								$sidebar[] = !empty($ws_empl) ? '<p>' . implode("\n", $ws_empl) . '</p>' : '';
								$sidebar[] = !empty($ws_contact) ? '<p>' . implode("\n", $ws_contact) . '</p>' : '';
								$sidebar[] = '</div>';
							}
							break;
					}
					$variables['right'] = !empty($sidebar) ? implode("\n", $sidebar) : $variables['right'];	//build right column - fixes odd error msg when saving.
				}
				
				//breadcrumb mod
				$parent_breadcrumbs = _get_parent_breadcrumb($section->field_parent[0]['nid']);
				if (!empty($parent_breadcrumbs) && is_array($parent_breadcrumbs)) {
					$breadcrumb = array_merge($breadcrumb, $parent_breadcrumbs);
				}


				// Content
				if (!(arg(0) == 'node' && arg(2) == 'edit' || arg(2)=='delete' || arg(2)=='revisions' || arg(2)=='translate')){
					if ($node->field_alt_node[0]['nid']){
						$alt_node = node_load($node->field_alt_node[0]['nid'],null,true);
						$leader   = !empty($node->field_alt_node_leader[0]['value']) ? '<div class="alt-node-leader">'.check_markup($node->field_alt_node_leader[0]['value'],$node->field_alt_node_leader[0]['format'],false)."</div>\n" : '';
						$follower = !empty($node->field_alt_node_follower[0]['value']) ?'<div class="alt-node-leader">'.check_markup($node->field_alt_node_follower[0]['value'],$node->field_alt_node_follower[0]['format'],false)."</div>\n" : '';
						$node_links = !empty($node->links) ? '<div class="node-links">'.theme('links',$node->links).'</div>' : '';
						$variables['content'] = $leader.theme('node',$alt_node,false,true).$node_links.$follower;
					}
					if ($node->type == 'scholarship') {
						//Remove redundant info on single-scholarship page.
						unset($node->field_sch_due);
						unset($node->field_url);
						unset($node->field_sch_app);
						unset($node->field_contact_box);
						$variables['content'] = theme('node',$node,false,true);
					}
					if ($node->type == 'section_calendar'){
						$calendar_mode = $node->field_section_display_mode[0]['value'] ? $node->field_section_display_mode[0]['value']:'monthview_embed_section';
						$variables['content'] = !empty($node->field_calendar_blurb[0]['value']) ? '<div class="calendar-blurb">'.check_markup($node->field_calendar_blurb[0]['value'])."</div>\n" : ''; 
						$variables['content'] .= '<div id="embedded-google-calendar-wrapper">'._format_calendar($node->field_page_calendar_url[0]['url'],$calendar_mode)."</div>\n";
					}
					if ($node->type == 'section_auction') {
						$variables['content'] .= '<h2>Auction Items</h2>'.views_embed_view('auctions', 'page_1', $node->nid);
					}
				}
				break;


			// Section Home Page
			case 'section_home_page' :
				if ($node->field_section[0]['nid'] > 0) {
					$section = node_load($node->field_section[0]['nid'], null, true);
					//$section_homepage = node_load($section->field_section_home[0]['nid']);
					//watchdog('theme', 'section node: <pre>'.print_r($section,true)."</pre>\n");
				}
				
				// Slideshow
				switch ($section->nid) {
					case 1710:	// Edfund
						$variables['slideshow'] = views_embed_view('Frontpage_slideshow', 'block_4');
						break;
				}

				// Section menu
				$variables['left'] = _nsc2015_section_menu($node).$variables['left'];

				// Promo
				if ($node->field_fp_promo[0]['nid'] > 0) {
					$promo_node = node_load($node->field_fp_promo[0]['nid'], null, true);
					if($promo_node->body){
						$variables['left'] .= "<div id=\"promo-home\">\n".$promo_node->body."</div>\n";
					}
				}

				// Callouts 1 and 2
				$field = 'field_section_co_1';
				$noderef = $section->$field;
				$nid = $noderef[0]['nid'];
				if ($nid > 0) {
						$callout_node = node_load($nid, null, true);
						$callout_node->callout_fp_position = 5;
						//$variables['first_callout'] = theme('node', $callout_node);
						$variables['left'] .= theme('node', $callout_node);
				}
				$field = 'field_section_co_2';
				$noderef = $section->$field;
				$nid = $noderef[0]['nid'];
				if ($nid > 0) {
						$callout_node = node_load($nid, null, true);
						$callout_node->callout_fp_position = 5;
						//$variables['first_callout'] = theme('node', $callout_node);
						$variables['left'] .= theme('node', $callout_node);
				}

				// News feed
				if (!empty($section->field_feed[0][feed_field_url])){
					$feed_title = empty($section->field_feed[0]['feed_field_title']) ? "What's New" : check_plain($section->field_feed[0]['feed_field_title']);
					$variables['left'] .= "<div class=\"news-headlines\"><h3>$feed_title</h3>\n";
					$feed_item = $section->field_feed[0];
					$feed_item['nid'] = $section->nid;
					$feed_item['#delta'] = 0;
					$feed_settings = array();
					$feed_data = _feed_field_content($section->nid, $feed_item, $settings);
					foreach ($feed_data as $row) {
						$variables['left'] .= '<div class="feed-wrapper">';
						$variables['left'] .= '<div class="feed-title">'.l($row['title'], $row['link']).'</div>';
						$variables['left'] .= '</div>';
					}
					$variables['left'] .= '<div class="feed-subscribe">'.l("Subscribe to our Feed",$section->field_feed[0][feed_field_url] ).'</div>';
					$variables['left'] .= "</div>\n";
				}

				// Testimonials, et al.
				$variables['right'] .= _nsc2015_program_testimonials($node);
				
				//callouts 3 and 4
				$field = 'field_section_co_3';
				$noderef = $section->$field;
				$nid = $noderef[0]['nid'];
				if ($nid > 0) {
						$callout_node = node_load($nid, null, true);
						$callout_node->callout_fp_position = 5;
						//$variables['first_callout'] = theme('node', $callout_node);
						$variables['right'] .= theme('node', $callout_node);
				}
				$field = 'field_section_co_4';
				$noderef = $section->$field;
				$nid = $noderef[0]['nid'];
				if ($nid > 0) {
						$callout_node = node_load($nid, null, true);
						$callout_node->callout_fp_position = 5;
						//$variables['first_callout'] = theme('node', $callout_node);
						$variables['right'] .= theme('node', $callout_node);
				}

				// Contact box
				if($section->field_contact_box[0]['value']){
  				$variables['right'] .= '<div class="contact-info"><h2>' . check_plain($section->title) . ' Contacts</h2>'.check_markup($section->field_contact_box[0]['value'],$section->field_contact_box[0]['format'],false);
					if(module_exists('nscc_locator') && $section->field_contact_room[0]['value']){
							$sector_node = _nscc_locator_get_sector_by_room($section->field_contact_room[0]['value']);
							$src_url = "/".$sector_node->field_minimap[0]['filepath'];
							$alt_text = $sector_node->field_sector_description[0]['value'];
							$loc_desc = check_plain($section->field_contact_room[0]['value']);
							$variables['right'] .= <<<CONTACT_LOCATION

	<div class="room">
		<h3>Location:</h3>
		<div class="location-description">$loc_desc ($alt_text)</div>
		<div class="location-img">
			<img class="locator-minimap" src="$src_url" alt="$alt_text" title="$alt_text" />
		</div>
	</div>
CONTACT_LOCATION;
					}
					$variables['right'] .= "</div>\n";				
				}

				// Breadcrumb
				$parent_breadcrumbs = _get_parent_breadcrumb($section->field_parent[0]['nid']);
				if (!empty($parent_breadcrumbs) && is_array($parent_breadcrumbs)) {
					$breadcrumb = array_merge($breadcrumb, $parent_breadcrumbs);
				}
				
				// Use section-title for page and content.
				$variables['title'] = drupal_set_title(check_plain($section->title));
				$title = explode(' | ', $variables['head_title']);
				array_shift($title);
				array_unshift($title, $variables['title']);
				$variables['head_title'] = implode(' | ', $title);


				//watchdog('theme', 'section_home_page vars: <pre>'.print_r($variables,true)."</pre>\n");
				break;


			// Dept Group page
			case 'dept_group' :

				//Title banner
				if ($node->field_image[0]['filesize'] > 0) {
					unset($variables['title']);	// supresses duplicate title
					$variables['title_banner'] = theme('image',
						$node->field_image[0]['filepath'],
						check_plain($node->field_image[0]['data']['alt']),
						check_plain($node->field_image[0]['data']['title']),
						array('class' => 'section-banner'),
						false
					);
					$title_color = check_plain($node->field_title_color[0]['value']);				
					$variables['title_banner'] .= _format_banner_title(trim($node->title), $title_color, true);
				}

				//left sidebar
				$variables['left'] = _nsc2015_dept_group_heirarchy_menu($node) . $variables['left'];

				//news feed
				$variables['right'] .= ! empty($node->field_feed[0]['view']) ? $node->field_feed[0]['view'] : '';

				if($node->field_contact_box[0]['value']){
  				$variables['right'] .= '<div class="contact-info"><h2>' . check_plain($node->title) . ' Contacts</h2>'.check_markup($node->field_contact_box[0]['value'],$node->field_contact_box[0]['format'],false)."</div>\n";				
				}

				//related info
				if ($node->field_related_links[0]['url']){
					$variables['right'] .= "<div class=\"related-info-links\"><h3>Related Info</h3>\n<ul>\n";
					foreach($node->field_related_links as $related_link){
						$variables['right'].="<li>${related_link['view']}</li>\n";
					}
					$variables['right'] .= "</ul></div>\n";
				}

				//testimonials
				if ($node->field_testimonials[0]['nid'] > 0 || $node->field_testimonials2[0]['nid'] > 0) {
					$variables['right'] .= _nsc2015_program_testimonials($node);
				}
				
				//breadcrumb mod
				$parent_breadcrumbs = _get_parent_breadcrumb($node->field_parent[0]['nid']);
				if (!empty($parent_breadcrumbs) && is_array($parent_breadcrumbs)) {
					$breadcrumb = array_merge($breadcrumb, $parent_breadcrumbs);
				}
				break;


			// Division (info) page
			case 'page_division' :
				// Extract division meta-content & assign to meta-sidebar ($division_meta)
				if ($node->field_program_division[0]['nid'] > 0) {
					$div = node_load($node->field_program_division[0]['nid'], null, true);
					$variables['division_meta'] = theme('node', $div, null, true);
				}

				// Division banner - check for division home page status and handle title accordingly.
				if ($div->field_division_banner[0]['filesize'] > 0) {
					$variables['division_banner'] = theme('image',
						$div->field_division_banner[0]['filepath'],
						check_plain($div->field_division_banner[0]['data']['alt']),
						check_plain($div->field_division_banner[0]['data']['title']),
						array('class' => 'division-banner'),
						false
					); 
					$title_color = check_plain($div->field_title_color[0]['value']);
					$variables['division_banner'] .= _format_banner_title(trim($div->title) . ' Division', $title_color, $promote_banner);
				}

				//breadcrumb mod
				$parent_breadcrumbs = _get_parent_breadcrumb($div->field_parent[0]['nid']);
				if (!empty($parent_breadcrumbs) && is_array($parent_breadcrumbs)) {
					$breadcrumb = array_merge($breadcrumb, $parent_breadcrumbs);
				}

				// Stubs
				$variables['left'] = !empty($variables['left']) ? $variables['left'] : '<p>{Menu}</p>';	 // stub
				$variables['right'] = !empty($variables['right']) ? $variables['right'] : '<p>{Related Info}</p>'; //stub
				$variables['division_meta'] =!empty($variables['division_meta']) ? $variables['division_meta'] : '<p>{Contact Info}</p>';	//stub
				break;

				
			// Proftech Degree & Certificate curricula
			case 'certificate' :
			case 'degree_proftech' :
				$variables['template_files'][] = 'page-curriculum-proftech';
				
				// Left sidebar
				$variables['left'] = _nsc2015_program_menu($node)._nsc2015_program_awardslist($node) . $variables['left'];
	
				// Extract program-coordinator meta-content & assign to meta-sidebar ($program_meta)
				if ($node->field_cert_program[0]['nid'] > 0) {
					$pgm = node_load($node->field_cert_program[0]['nid'], null, true);
					$div = node_load($pgm->field_program_division[0]['nid'], null, true);
					$variables['program_meta'] = theme('node', $pgm, null, true) . theme('node', $div, null, true);
				}
				
				// Extract program banner, if available, and assign to tempate variable ($program_banner)
				if ($pgm->field_program_banner[0]['filesize'] > 0) {
					$variables['program_banner'] = theme('image',
						$pgm->field_program_banner[0]['filepath'],
						check_plain($pgm->field_program_banner[0]['data']['alt']),
						check_plain($pgm->field_program_banner[0]['data']['title']),
						array('class' => 'program-banner'),
						false
					);
					$title_color = check_plain($pgm->field_title_color[0]['value']);				
					$variables['program_banner'] .= _format_banner_title(trim($pgm->title).' Program', $title_color);
				}
	
				// Breadcrumb mod
				$parent_breadcrumbs = _get_parent_breadcrumb($pgm->field_parent[0]['nid']);
				if (!empty($parent_breadcrumbs) && is_array($parent_breadcrumbs)) {
					$breadcrumb = array_merge($breadcrumb, $parent_breadcrumbs);
				}

				// Fix multicolumn-deficient browsers.
				drupal_add_js(path_to_theme().'/js/multicol-curriculum.js', 'theme');
				
				break;


			case 'degree_transfer' :
			case 'degree_nontrad' :
				// Fix multicolumn-deficient browsers.
				drupal_add_js(path_to_theme().'/js/multicol-curriculum.js', 'theme');
				break;

			/* Overview - [verify content type removed prior to delete]
			case 'overview' :
				if ($node->field_program_banner[0]['filesize'] > 0) {
					unset($variables['title']);
					$variables['overview_banner'] = theme('image',
						$node->field_program_banner[0]['filepath'],
						check_plain($node->field_program_banner[0]['data']['alt']),
						check_plain($node->field_program_banner[0]['data']['title']),
						array('class' => 'overview-banner'),
						false
					);
					$title_color = check_plain($node->field_title_color[0]['value']);				
					$variables['overview_banner'] .= _format_banner_title(trim($node->title) . ' Programs', $title_color, true);
				}

				//right column
				if ($node->field_ov_related_links[0]['url']) {
					$variables['right'] = "<div><h3>Related Info</h3>\n<ul>\n";
					foreach($node->field_ov_related_links as $ov_related_link){
						$variables['right'].="<li>".$ov_related_link['view']."</li>\n";
					}
					$variables['right'] .= "</ul></div>\n";
				}

				//profile teasers & testimonials
				$variables['right'] .= _nscc_main_program_testimonials($node);
				
				//breadcrumb mod
				$parent_breadcrumbs = _get_parent_breadcrumb($node->field_parent[0]['nid']);
				if (!empty($parent_breadcrumbs) && is_array($parent_breadcrumbs)) {
					$breadcrumb = array_merge($breadcrumb, $parent_breadcrumbs);
				}
				break;
			*/


			case 'orientation_page' :
				unset($variables['title']);	//page title handled by node template.
				drupal_add_js('sites/all/libraries/modernizr/modernizr', 'core');
				drupal_add_js('sites/all/libraries/json2/json2.min.js', 'core');
				drupal_add_js('sites/all/libraries/jquery-cookie/jquery.cookie.js', 'core');
				if (module_exists('nscc_orientation')) {
					$module_path = drupal_get_path('module', 'nscc_orientation');
					drupal_add_js('sites/all/libraries/flowplayer/flowplayer-3.2.11.min.js', 'module');
					drupal_add_js("$module_path/nscc_orientation.multimedia.js", 'theme');
					drupal_add_css("$module_path/nscc_orientation.css", 'theme');
				}
				//watchdog('Theme', 'Page vars: <pre>'.print_r($variables, true)."</pre>\n");
				break;
		}
		//Ensure breadcrumb is set for template.
		$variables['breadcrumb'] = theme('breadcrumb', drupal_set_breadcrumb($breadcrumb));


	// Non-node page preprocessing.
	} else {
		//watchdog('theme', 'No Node vars: <pre>'.print_r($variables,true)."</pre>\n");
	}


	// Remove college abbr from end of document title that was appended by base theme (reset to standard core construction).
	$title = explode(' | ', $variables['head_title']);
	array_pop($title);
	$variables['head_title'] = implode(' | ', $title);


	// Meta breadcrumb
	
	if(preg_match('/<meta name=\"breadcrumb\"/',$variables['head'])){
		$variables['head'] = preg_replace('/<meta name=\"breadcrumb\" content=\".*\">\n/',"<meta name=\"breadcrumb\" content=\"$meta_breadcrumb\">\n",$variables['head']);
	}else {
		//$variables['head'].="<meta name=\"breadcrumb\" content=\"$meta_breadcrumb\">\n";
		drupal_set_html_head("<meta name=\"breadcrumb\" content=\"$meta_breadcrumb\" />");
	}

	//$variables['head'] = drupal_set_html_head("<meta name=\"breadcrumb\" content=\"$meta_breadcrumb\" />");
	//drupal_set_html_head("<meta name=\"breadcrumb\" content=\"$meta_breadcrumb\" />");	//suspected of causing duplicate meta-breadcrumb in SERP.
				
				
	// Ensure any mods to $head, $scripts, and $styles make it to output.
	$variables['scripts'] = drupal_get_js();
	$variables['styles'] = drupal_get_css() . $variables['conditional_styles'];
	$variables['head'] = drupal_get_html_head();
	//watchdog('Theme', 'Page vars: <pre>'.print_r($variables, true)."</pre>\n");
}



/**
 *	Helper function: loose function to build pseudomenus for site section pages
 */
function _nsc2015_section_menu(&$node){
	switch ($node->type) {
		case 'scholarship' : $section_nid = 373; break;
		case 'wkstudy_job' : $section_nid = 586; break;
		case 'policy' :
		case 'term' : $section_nid = 853; break;
		case 'storm_team' :
		case 'storm_player' :
		case 'storm_game' :
//			$section_nid = ($node->field_player_gender[0]['value'] == 'Female') ? 1746 : 1747;
			$section_nid = 1073;
			break;
		case 'auction_package' :
		case 'auction_sponsor' :
			$auction = node_load($node->field_related_auction[0]['nid'], null, true);
			$section_nid = $auction->field_section[0]['nid'];
//		case 'section_auction' : $section_nid = 1710;
			break;
		case 'fs_weekly_menu' : $section_nid = 1579; break;
		default : $section_nid = $node->field_section[0]['nid'];
 	}
	$section_node = node_load($section_nid);
	$count = db_result(db_query('select count(*) from sqlview_prod_section_menus where section_nid=%d;',$section_nid));
	if($count){	
	 $result = db_query('select * from sqlview_prod_section_menus where section_nid=%d;',$section_nid);
	 if ($result){
		$output = '<div class="block block-menu"><ul class="menu">'."\n";
		$first = true;
		$index=0;
		while($row = db_fetch_object($result)){
			$li_classes = 'leaf ';
			if($row->related_nid == $node->nid){
				$a_classes ='active ';
			} else {
				$a_classes = '';
			}
			if($first){
				$li_classes .='first ';
				$first = false;
			}
			if(($index == $count-1)  && !($section_node->field_assoc_tid[0]['value'] > 0 && $section_nid != 690)){
				$li_classes .='last ';
			}
			if(preg_match('/^Home --/',$row->title)){
				$title = 'Section Home';
			} else {
				$title = $row->title;
			}
			$output .= '	 <li class="'.$li_classes.'"><a href="/'.$row->dst.'" title="'.check_plain($title).'" class="'.$a_classes.'">'.check_plain($title).'</a></li>'."\n";	
			$index++;
		}
		// Add fee table link if tuition section.
		if($section_nid==690){
				$li_classes .='last ';
				$output .= '	 <li class="'.$li_classes.'">'.l('Fee Table','tuition-fees/fee-table')."</li>\n";
		}
		//related people link
		if($section_node->field_assoc_tid[0]['value'] > 0){
				$li_classes .='last ';
				$output .= '	 <li class="'.$li_classes.'">'.l('Staff','https://people.northseattle.edu/profile/nscc_profile_departments/'.$section_node->field_assoc_tid[0]['value'])."</li>\n";
		}
		$output .= '</ul></div>'."\n";
		return $output;
	 }
	}	
}



/**
* Loose function to create program-related menus on page_program's and awards pages.
*/
function _nsc2015_program_menu(&$node){
 if($node->field_cert_program[0]['nid']){
 	$program_nid = $node->field_cert_program[0]['nid'];	
 } else {
 	$program_nid = $node->field_program[0]['nid'];	
 }
 $program_node = node_load($program_nid);
 $local_graduation = false;
 $count = db_result(db_query('select count(*) from sqlview_prod_program_menus where program_nid=%d;',$program_nid));
 if($count){	
	 $result = db_query('select * from sqlview_prod_program_menus where program_nid=%d;',$program_nid);
	 if ($result){
		$output = '<div class="block block-menu"><ul class="menu">'."\n";
		$first = true;
		$index=0;
		while($row = db_fetch_object($result)){
			$li_classes = 'leaf ';
			if($row->related_nid == $node->nid){
				$a_classes ='active ';
			} else {
				$a_classes = '';
			}
			if($first){
				$li_classes .='first ';
				$first = false;
			}
			if(($index == $count-1) && !($program_node->field_assoc_tid[0]['value'] > 0) && ($local_graduation)){
				$li_classes .='last ';
			}
			if(preg_match('/^Home --/',$row->title)){
				$title = 'Program Home';
			} else {
				$title = $row->title;
			}
			$output .= '	 <li class="'.$li_classes.'"><a href="/'.$row->dst.'" title="'.check_plain($title).'" class="'.$a_classes.'">'.check_plain($title).'</a></li>'."\n";	
			if (rtrim(check_plain($title)) == 'Graduation'){
				$local_graduation = true;
			}
			$index++;
		}
		if(! $local_graduation ){
			if( !($program_node->field_assoc_tid[0]['value'] > 0) ){
				$li_classes .='last ';
			}
			$output .= '	 <li class="'.$li_classes.'">'.l('Graduation','graduation')."</li>\n";
		}

		//related people link
		if($program_node->field_assoc_tid[0]['value'] > 0){
				$li_classes .='last ';
				$output .= '	 <li class="'.$li_classes.'">'.l('Faculty & Staff','https://people.northseattle.edu/profile/nscc_profile_departments/'.$program_node->field_assoc_tid[0]['value'])."</li>\n";
		}
		$output .= '</ul></div>'."\n";
		return $output;
	 }
	}	
}



/**
* Loose function to create program-related menus on page_program's and awards pages.
*/
function _nsc2015_program_awardslist(&$node){
 if($node->field_cert_program[0]['nid']){
 	$program_nid = $node->field_cert_program[0]['nid'];	
 } else {
 	$program_nid = $node->field_program[0]['nid'];	
 }
 $count = db_result(db_query('select count(*) from sqlview_prod_program_awards where program_nid=%d;',$program_nid));
 if($count){	
	 $result = db_query('select * from sqlview_prod_program_awards where program_nid=%d;',$program_nid);
	 if ($result){
		$output = '<div class="block block-menu"><ul class="menu">'."\n";
		$first = true;
		$index=0;
		while($row = db_fetch_object($result)){
			$li_classes = 'leaf ';
			if($row->related_nid == $node->nid){
				$a_classes .='active ';
			} else {
				$a_classes = '';
			}
			if($first){
				$li_classes .='first ';
				$first = false;
			}
			if($index == $count-1 ){
				$li_classes .='last ';
			}
			$title = $row->title;
			$output .= '	 <li class="'.$li_classes.'"><a href="/'.$row->dst.'" title="'.check_plain($title).'" class="'.$a_classes.'">'.check_plain($title).'</a></li>'."\n";	
			$index++;
		}
		$output .= '</ul></div>'."\n";
		return $output;
	 }
	}	
}


/**
* Loose function to create list related transfer degrees on department/program pages.
*/
function _nsc2015_transfer_degreeslist(&$node){
 if($node->field_cert_program[0]['nid']){
 	$program_nid = $node->field_cert_program[0]['nid'];	
 } else {
 	$program_nid = $node->field_program[0]['nid'];	
 }
 $count = db_result(db_query('select count(*) from {content_field_t_deg} tdeg where tdeg.nid = %d;',$program_nid));
 if($count){	
	 $result = db_query("select n.nid,n.title,alias.dst from {node} n join {content_field_t_deg} tdeg on (tdeg.field_t_deg_nid = n.nid) join {url_alias} alias ON ('node/'::text || n.nid::text) = alias.src::text where tdeg.nid = %d;",$program_nid);
	 if ($result){
		$output = '<div class="block block-menu"><ul class="menu">'."\n";
		$first = true;
		$index=0;
		while($row = db_fetch_object($result)){
			$li_classes = 'leaf ';
			if($row->related_nid == $node->nid){
				$a_classes .='active ';
			} else {
				$a_classes = '';
			}
			if($first){
				$li_classes .='first ';
				$first = false;
			}
			if($index == $count-1 ){
				$li_classes .='last ';
			}
			$title = $row->title;
			$output .= '	 <li class="'.$li_classes.'"><a href="/'.$row->dst.'" title="'.check_plain($title).'" class="'.$a_classes.'">'.check_plain($title).'</a></li>'."\n";	
			$index++;
		}
		$output .= '</ul></div>'."\n";
		return $output;
	 }
	}	


}




/**
 *	Helper function: builds hierarchical menu for a specific node.
 */
function _nsc2015_dept_group_heirarchy_menu($node){
	$output = '<div class="block block-menu"><ul class="menu">'."\n";
	/* handled in breadcrumb
	if($node->field_parent[0]['nid']){
		$parent_node = node_load($node->field_parent[0]['nid'], null, true);
		$output .= '     <li class="leaf first"><a href="">Up</a></li>'."\n";
		$first_taken = true;
	}
	*/
	foreach($node->field_children as $child_ref){
			$child_node = node_load($child_ref['nid'],null,true);
			if($first_taken){
				$li_classes = "leaf ";
			} else {
				$li_classes = "leaf first";
				$first_taken = true;
			}
			switch(true){
				case ($child_node->type == 'program') :
					$output .= '     <li class="leaf"><a href="'.check_plain($child_node->field_home_page_url[0]['value']).'">'.check_plain($child_node->title)."</a></li>\n";			
					break;
				case ($child_node->type == 'dept_group') :
					$output .= '     <li class="leaf"><a href="'.drupal_get_path_alias('node/'.check_plain($child_node->nid),'').'">'.check_plain($child_node->title)."</a></li>\n";			
					break;
			}
	}
	$output .= '</ul></div>'."\n";
	return $output;
}



/**
 *	Helper function: builds a testimonials/profiles container for specified node.
 */
function _nsc2015_program_testimonials(&$node){
	if($node->field_testimonials[0] || $node->field_testimonials2[0]){
		drupal_add_js('sites/all/themes/nsc2015/js/nscc-profile-flyout.js','theme');
		$output = '<div class="testimonials">';
		if($node->field_testimonials[0]){
					$output_node = node_load($node->field_testimonials[0]['nid'],null,true);
					if ($output_node->type == 'testimonial'){
						$output .= _nsc2015_testimonial($output_node);
					}
					if ($output_node->type == 'profile'){
						$output .= _nsc2015_profile($output_node);
					}
					if ($output_node->type == 'employer_expectations'){
						$output .= _nsc2015_emp_exp($output_node);
					}
					if ($output_node->type == 'ed_fund_success_story') {
						$output_node->render_style = 'sidebar';
						$output .= theme('node', $output_node);
					}
			}
		if($node->field_testimonials2[0]){
					$output_node = node_load($node->field_testimonials2[0]['nid'],null,true);
					if ($output_node->type == 'testimonial'){
						$output .= _nsc2015_testimonial($output_node);
					}
					if ($output_node->type == 'profile'){
						$output .= _nsc2015_profile($output_node);
					}
					if ($output_node->type == 'employer_expectations'){
						$output .= _nsc2015_emp_exp($output_node);
					}
					if ($output_node->type == 'ed_fund_success_story') {
						$output_node->render_style = 'sidebar';
						$output .= theme('node', $output_node);
					}
		}
		$output .="</div>\n";
		return $output;
	}
}



/**
 *	Helper function: builds a testimonial from the specified node.
 */
function _nsc2015_testimonial(&$testimonial_node){
	//watchdog('Testimonial', 'Testimonial: <pre>'.print_r($testimonial_node, true)."</pre>\n");
	if (!empty($testimonial_node->field_testimonial_photo[0]['filepath'])) {
			$photo ='<div class="testimonial-photo"><a href="/'.drupal_get_path_alias("node/".$testimonial_node->nid).'"><img src="/'.$testimonial_node->field_testimonial_photo[0]['filepath'].'" alt="portrait" /></a></div>';
	} elseif ($testimonial_node->field_testimonial_netid[0]['uid'] >= 2 ) {
			$witness = user_load($testimonial_node->field_testimonial_netid[0]['uid']);
			//watchdog('Testimonial', 'Witness: UID:'.$testimonial_node->field_testimonial_netid[0]['uid']."\n<pre>".print_r($witness, true)."</pre>\n");
			$photo = !empty($witness->picture) ? '<div class="testimonial-photo"><a href="/'.drupal_get_path_alias("node/".$testimonial_node->nid).'"><img src="/'.$witness->picture.'" alt="portrait" /></a></div>' : '';
	}
	if($testimonial_node->field_testimony[0]['value']){
		$testimony = check_markup($testimonial_node->field_testimony[0]['value'],$testimonial_node->field_testimony[0]['format'],false);
	}	
	$job_title = check_plain($testimonial_node->field_testimonial_job_title[0]['value']);
	if($testimonial_node->field_testimonial_netid[0]['uid']>=2){
		$full_name = _nscc_get_nscc_profile_full_name($testimonial_node->field_testimonial_netid[0]['uid']);
	}else{
		$full_name = check_plain($testimonial_node->field_testimonial_fullname[0]['value']);
	}
//	$title = '<h3>' . check_plain($testimonial_node->title) . "</h3>\n";
//	$title = "<h3>Word Is…</h3>\n";
	$output .= '<div class="testimonial">';
	$output .= "<h3>Kudos</h3>\n";
	$output .= $photo; 
	$output .= '<div class="testimonial-quote"><blockquote class="testimony">'.$testimony.'</blockquote></div>'."\n";
	$output .= '<div class="testimonial-name"> —'.check_plain($full_name)."</div>\n";
	$output .= '<div class="testimonial-job-title">'.$job_title."</div>\n";
	$output .= "</div>\n";
	return $output;
}



/**
 *	Helper function: builds a testimonial from the specified node.
 */
function _nsc2015_emp_exp(&$employer_expectations_node){
	
	if($employer_expectations_node->field_testimonial_photo[0]['filepath']){
			$photo ='<div class="testimonial-photo"><a href="/'.drupal_get_path_alias("node/".$employer_expectations_node->nid).'"><img src="/'.$$employer_expectations_node->field_testimonial_photo[0]['filepath'].'" alt="portrait" /></a></div>';
	} else {
		if($employer_expectations_node->field_testimonial_netid[0]['uid']>=2){
			$witness = user_load($employer_expectations_node->field_testimonial_netid[0]['uid']);
			$photo ='<div class="testimonial-photo"><a href="/'.drupal_get_path_alias("node/".$employer_expectations_node->nid).'"><img src="/'.$witness->picture.'" alt="portrait" /></a></div>';
		}
	}
	if($employer_expectations_node->field_testimony[0]['value']){
		$testimony = check_markup($employer_expectations_node->field_testimony[0]['value'],$employer_expectations_node->field_testimony[0]['format'],false);
	}	
	$job_title = check_plain($employer_expectations_node->field_testimonial_job_title[0]['value']);
	if($employer_expectations_node->field_testimonial_netid[0]['uid']>=2){
		$full_name = _nscc_get_nscc_profile_full_name($employer_expectations_node->field_testimonial_netid[0]['uid']);
	}else{
		$full_name = check_plain($employer_expectations_node->field_testimonial_fullname[0]['value']);
	}
	$output .= '<div class="testimonial emp-exp">';
	$output .= "<h3>Employer Expectations</h3>\n";
	$output .= $photo; 
	$output .= '<div class="testimonial-quote"><blockquote class="testimony">'.$testimony.'</blockquote></div>'."\n";
	$output .= '<div class="testimonial-name"> —'.check_plain($full_name)."</div>\n";
	$output .= '<div class="testimonial-job-title">'.$job_title."</div>\n";
	$output .= "</div>\n";
	return $output;
}



/**
 *	Helper function: builds a profile from the specified node.
 */
function _nsc2015_profile(&$profile_node){
	
	if($profile_node->field_testimonial_photo[0]['filepath']){
			//$photo ='<div class="testimonial-photo"><a href="/'.drupal_get_path_alias("node/".$profile_node->nid).'"><img src="/'.$profile_node->field_testimonial_photo[0]['filepath'].'" alt="portrait" /></a></div>';
			$photo ='<div class="testimonial-photo"><img src="/'.$profile_node->field_testimonial_photo[0]['filepath'].'" alt="portrait" /></div>';
	} else {
		if($profile_node->field_testimonial_netid[0]['uid']>=2){
			$profilee = user_load($profile_node->field_testimonial_netid[0]['uid']);
			if($profilee->picture){
				//$photo ='<div class="testimonial-photo"><a href="/'.drupal_get_path_alias("node/".$profile_node->nid).'"><img src="/'.$profilee->picture.'" alt="portrait" /></a></div>';
				$photo ='<div class="testimonial-photo"><img src="/'.$profilee->picture.'" alt="portrait" /></div>';
			}
		}
	}
	if($profile_node->field_prof_teaser[0]['value']){
		$profile_teaser = check_markup($profile_node->field_prof_teaser[0]['value'],$profile_node->field_prof_teaser[0]['format'],false);
		$profile_teaser .= ' <p class="more-link">' . l('More…', 'node/'.$profile_node->nid, array('attributes' => array('title' => 'Read the full story'))) . '</p>';
	}
	$job_title = check_plain($profile_node->field_testimonial_job_title[0]['value']);
	if($profile_node->field_testimonial_netid[0]['uid']>=2){
		$full_name = _nscc_get_nscc_profile_full_name($profile_node->field_testimonial_netid[0]['uid']);
	}else{
		$full_name = $profile_node->field_testimonial_fullname[0]['value'];
	}
	$title = '<h3>' . check_plain($profile_node->title) . "</h3>\n";
	$output .= '<div id="profile-nid-'.$profile_node->nid.'" class="profile">';
	$output .= $title;
	$output .= $photo; 
	$output .= '<div class="profile-name">'.check_plain($full_name)."</div>\n";
	$output .= '<div class="profile-job-title">'.$job_title."</div>\n";
	$output .= '<div class="profile_teaser">'.$profile_teaser.'</div>'."\n";
	$output .= "</div>\n";
	return $output;
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
function nsc2015_preprocess_node(&$variables) {
	$node = $variables['node'];
	
	// Specific Node-Type handling
	switch(true) {


		// node: callout
		case ($node->type == 'callout') :
			//$variables['callout_title'] = check_plain($node->title);
			$variables['callout_title'] = check_plain($node->field_co_display_title[0]['value']);
			$variables['callout_content'] = $node->body;
			$variables['classes'] .= ' callout grid-3';
			switch($node->callout_fp_position) {
				case 1:
					$variables['classes'] .= ' alpha callout-left';
					break;
				case 2:
					$variables['classes'] .= ' callout-mid';
					break;
				case 3:
					$variables['classes'] .= ' callout-mid';
					break;
				case 4:
					$variables['classes'] .= ' omega callout-right';
					break;
				case 5:
					$variables['classes'] = ' alpha callout callout-column omega ';
					break;

			}			 
			// Inline style for background.
			$img_path = $node->field_callout_bg_graphic[0]['filepath'];
			$variables['callout_styles'] = ' style="background: rgb(223, 232, 234)';
			if ($img_path) {
				$variables['callout_styles'] .= ' url('.base_path().$img_path.') bottom right no-repeat';
			}
			$variables['callout_styles'] .= ';"' ;
			//watchdog('main theme', 'Callout vars: <pre>'.print_r($variables, true)."</pre>\n");
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


		// node: adm_slide
		case ($node->type =='adm_slide') :
			$variables['slide_link_attr'] = drupal_attributes(array('href'=>check_url($node->field_fp_slide_link[0]['url']),'title'=>$node->title)); 
			$variables['photo'] = $node->field_fp_slide_photo[0]['view'];
			$colorpath = _path_to_theme_asset('imgs/slidecolor-adm-'.strtolower($node->field_fp_slide_bg_color[0]['value']).'.png');
			$variables['classes'] .= ' adm_slide';
			$variables['content_attr'] = drupal_attributes(array('style'=>'background: transparent url('.$colorpath.') top right no-repeat','class'=>'adm_slide-content'));
			$variables['content']	 =	check_markup($node->body,$node->format);
			$variables['slide_navigation'] = ''; //later will have stuff
			break;	 

		
		// node: Locator POI	
		case ($node->type =='locator_poi'):
				$variables['related_link'] = l($node->field_poi_rel_link[0]['title'],$node->field_poi_rel_link[0]['url']);
				if($node->field_poi_photo[0]['filepath']){
					$variables['photo'] = '<img class="locator-poi-photo" src="/'.$node->field_poi_photo[0]['filepath'].'" title="'.$node->field_poi_photo[0]['data']['title'].'" alt="'.$node->field_poi_photo[0]['data']['title'].'" width="" height="">';
				}
				if(!empty($node->field_bd_gpurpose[0]['value'])){			
					$variables['location_desc'] = check_markup($node->field_poi_location_desc[0]['value'],$node->field_poi_location_desc[0]['format']);
				}
				$variables['description'] = $node->field_poi_desc[0]['value'];								
			break;

		// node: Locator PK	
		case ($node->type =='locator_pk'):
				$variables['related_link'] = l($node->field_poi_rel_link[0]['title'],$node->field_poi_rel_link[0]['url']);
				if($node->field_poi_photo[0]['filepath']){
					$variables['photo'] = '<img class="locator-poi-photo" src="/'.$node->field_poi_photo[0]['filepath'].'" title="'.$node->field_poi_photo[0]['data']['title'].'" alt="'.$node->field_poi_photo[0]['data']['title'].'" width="" height="">';
				}
				if(!empty($node->field_bd_gpurpose[0]['value'])){			
					$variables['location_desc'] = check_markup($node->field_poi_location_desc[0]['value'],$node->field_poi_location_desc[0]['format']);
				}
				$variables['description'] = $node->field_poi_desc[0]['value'];								
			break;


		// node: Locator Building Details
		case ($node->type =='locator_building_details'):
				//field_bd_abbr,field_bd_gpurpose,field_bd_photo
				$variables['abbr'] = check_plain($node->field_bd_abbr[0]['value']);
				if(!empty($node->field_bd_gpurpose[0]['value'])){			
					$variables['gpurpose'] = check_markup($node->field_bd_gpurpose[0]['value'],$node->field_bd_gpurpose[0]['format']);
				}
				if($node->field_bd_photo[0]['filepath']){
					$variables['photo'] = '<img class="locator-bd-photo" src="/'.$node->field_bd_photo[0]['filepath'].'" title="'.$node->field_bd_photo[0]['data']['title'].'" alt="'.$node->field_bd_photo[0]['data']['title'].'" >';
				}
				//$variables['content'] = '<pre>'.print_r($node,true).'</pre>';												
			break;


		// Locator Parking Zone
		case ($node->type =='locator_parking_zone'):
			// field_parking_cat,field_parking_desc,field_parking_rules
				$variables['description'] = check_plain($node->field_parking_desc[0]['value']);
				if(!empty($node->field_parking_rules[0]['value'])){
					$variables['rules'] = check_markup($node->field_parking_rules[0]['value'],$node->field_parking_rules[0]['format']);
				}	
			break;


		// node: Program (and depts)
		case ($node->type == 'program') :
			$node_title_suffix = ($node->field_prog_type[0]['value'] == 1) ? 'Department' : 'Program';	// title suffix to qualify pgm vs. dept
			$variables['template_files'][] = 'node-program';
			$variables['title'] = check_plain($node->title) . ' ' . $node_title_suffix;
		
			//primary contact name
			if (!empty($node->field_coord_altname[0]['value'])) {
				$variables['mgr'] = check_plain($node->field_coord_altname[0]['value']);
			} else {
				$coordinator = user_load($node->field_program_coordinator[0]['uid']);
				$variables['mgr'] = l(_nscc_get_nscc_profile_full_name($coordinator->uid), '/people.northseattle.edu/users/'.$coordinator->name, array('attributes' => array('title' => 'Contact and profile info'), 'alias' => true,));
				if ($coordinator->status !== 1) {
					//notify PIO of blocked user
				}
			}
			
			//primary contact label
			if (empty($node->field_coord_title[0]['value'])) {
				$variables['mgr_title'] = "$node_title_suffix Contact";
			} else {
				$variables['mgr_title'] = ucwords(check_plain($node->field_coord_title[0]['value']));
			}

			//primary contact email
			if (!empty($node->field_coord_altemail[0]['value'])) {
				$variables['email'] =  l(t('email'), 'mailto:'.$node->field_coord_altemail[0]['value']);
			} elseif (empty($node->field_coord_altname[0]['value']) && !empty($coordinator->nscc_profile_email_address)) {
				$variables['email'] =  l(t('email'), 'mailto:'.$coordinator->nscc_profile_email_address);
			} else {
				$variables['email'] =  '';
			}
			
			//primary contact phone
			if (!empty($node->field_coord_altphone[0]['value'])) {
				$variables['phone'] = _format_phone_num($node->field_coord_altphone[0]['value']);
			}	elseif (empty($node->field_coord_altname[0]['value']) && !empty($coordinator->nscc_profile_phone)) {
				$variables['phone'] = _format_phone_num($coordinator->nscc_profile_phone);
			} else {
				$variables['phone'] = '';
			}
			
			//2nd contact?
			if (!empty($node->field_contact_2_altname[0]['value']) || !empty($node->field_contact_2[0]['uid'])) {
				
				//2nd contact name
				if (!empty($node->field_contact_2_altname[0]['value'])) {
					$variables['contact2'] = check_plain($node->field_contact_2_altname[0]['value']);
				} else {
					$contact2 = user_load($node->field_contact_2[0]['uid']);
					$variables['contact2'] = l(_nscc_get_nscc_profile_full_name($contact2->uid), '/people.northseattle.edu/users/'.$contact2->name, array('attributes' => array('title' => 'Contact and profile info'), 'alias' => true,));
					if ($contact2->status !== 1) {
						//notify PIO of blocked user
					}
				}
				
				//2nd contact label
				if (empty($node->field_contact_2_title[0]['value'])) {
					$variables['contact2_title'] = "$node_title_suffix Contact";
				} else {
					$variables['contact2_title'] = ucwords(check_plain($node->field_contact_2_title[0]['value']));
				}
				
				//2nd contact email
				if (!empty($node->field_contact_2_altemail[0]['value'])) {
					$variables['contact2_email'] = l(t('email'), 'mailto:'.$node->field_contact_2_altemail[0]['value']);
				} elseif (empty($node->field_contact_2_altname[0]['value']) && !empty($contact2->nscc_profile_email_address)) {
					$variables['contact2_email'] = l(t('email'), 'mailto:'.$contact2->nscc_profile_email_address);
				} else {
					$variables['contact2_email'] = '';
				}
				
				//2nd contact phone
				if (!empty($node->field_contact_2_altphone[0]['value'])) {
					$variables['contact2_phone'] = _format_phone_num($node->field_contact_2_altphone[0]['value']);
				} elseif (empty($node->field_contact_2_altname[0]['value']) && !empty($contact2->nscc_profile_phone)) {
					$variables['contact2_phone'] = _format_phone_num($contact2->nscc_profile_phone);
				} else {
					$variables['contact2_phone'] = '';
				}
			}
			
			//news feed
			$variables['feed'] = "<div>\n".$node->field_feed[0]['view']."\n</div>\n";
			//watchdog('theme', 'Program vars: <pre>'.print_r($variables, true)."</pre>\n");
			break;


		//node: Department Group
		case ($node->type == 'dept_group') :
			if (($node->field_testimonials[0]['nid'] > 0) || ($node->field_testimonials2[0]['nid'] > 0)) {
				drupal_add_js('sites/all/themes/nscc_main/js/nscc-profile-flyout.js','theme');
			}
			break;


		//node: Division
		case ($node->type == 'division') :
			$variables['template_files'][] = 'node-division';
			$variables['title'] = check_plain($node->title);
			if(module_exists('nscc_locator')){
				$variables['room'] = check_plain($node->field_division_office_loc[0]['value']);
				$variables['room'] .= nscc_locator_get_minimap_by_room(check_plain($node->field_division_office_loc[0]['value']));      
			} else {
				$variables['room'] = check_plain($node->field_division_office_loc[0]['value']);
			}
			$variables['map'] = ''; // stub
			$variables['phone'] = _format_phone_num($node->field_division_phone[0]['value']); //check_plain($node->field_division_phone[0]['value']);
			$variables['fax'] = _format_phone_num($node->field_division_fax[0]['value']); //check_plain($node->field_division_fax[0]['value']);
			$variables['tty'] = _format_phone_num($node->field_division_tty[0]['value']); //check_plain($node->field_division_tty[0]['value']);
			//$variables['email'] = check_plain($node->field_division_email[0]['value']);
			$variables['email'] = l('email', 'mailto:'.$node->field_division_email[0]['value'], array('external'=>true));
			$variables['hours'] = check_plain($node->field_division_office_hours[0]['value']);
			$variables['mail_title'] = check_plain($node->title) . ' Division';
			$variables['mailstop'] = check_plain($node->field_division_mailstop[0]['value']);
			$dean = user_load($node->field_division_dean[0]['uid']);
			$variables['mgr'] = l(_nscc_get_nscc_profile_full_name($dean->uid), '/people.northseattle.edu/users/'.$dean->name, array('attributes' => array('title' => 'Contact and profile info'), 'alias' => true,));
			if ($dean->status !== 1) {
				//Notify PIO of blocked user
				$mail_params['users'][] = $dean;
				$mail_params['problem_node'] = $node->title . ' Division';
				$mail_params['node_path'] = 'node/'.$node->nid;
				//drupal_mail('prod', 'invalid-contact', $mailto, $GLOBALS['language'], $mail_params);
			}
			$variables['mgr_title'] = 'Dean';  // may want to add a field to the node for this one, if needed.
			//watchdog('theme', 'Division vars: <pre>'.print_r($variables, true)."</pre>\n");
			break;


		// node: Certificate
		case ($node->type == 'certificate'):
		// node: Prof/Tech Degree 
		case ($node->type == 'degree_proftech'):
			$variables['template_files'][] = 'node-certificate';
			$variables['description'] = !empty($node->field_cert_description[0]['value']) ? check_markup($node->field_cert_description[0]['value'], $node->field_cert_description[0]['format'], false) : '';
			$variables['objectives'] = !empty($node->field_transfer_objectives[0]['value']) ? check_markup($node->field_transfer_objectives[0]['value'], $node->field_transfer_objectives[0]['format'], false) : '';
			$variables['prereqs'] = !empty($node->field_cert_prerequisites[0]['value']) ? check_markup($node->field_cert_prerequisites[0]['value'], $node->field_cert_prerequisites[0]['format'], false) : '';
			$variables['curriculum'] = !empty($node->field_cert_curriculum[0]['value']) ? check_markup($node->field_cert_curriculum[0]['value'], $node->field_cert_curriculum[0]['format'], false) : '';
			$variables['sequence'] = !empty($node->field_cert_sequence[0]['value']) ? check_markup($node->field_cert_sequence[0]['value'], $node->field_cert_sequence[0]['format'], false):'';
			$variables['sequence_type'] = !empty($node->field_cert_sequence_type[0]['value']) ? ucwords(check_plain($node->field_cert_sequence_type[0]['value'])) . ' ' : '';
			$variables['elective_groups'] = !empty($node->field_cert_elective_groups[0]['value']) ? check_markup($node->field_cert_elective_groups[0]['value'], $node->field_cert_elective_groups[0]['format'], false) : '';
			//$variables['notes'] = !empty($node->content['body']['#value']) ?check_markup($node->content['body']['#value'],$node->format, false):'';
			$variables['notes'] = $node->content['body']['#value'];
			$variables['eff_yrq'] = _schedule_yrq_to_quarter($node->field_cert_eff_yrq[0]['value']);
			$variables['sbctc_title'] = check_plain($node->field_cert_off_title[0]['value']);
			$variables['epc_code'] = check_plain($node->field_cert_epc_code[0]['value']);
			$variables['cip_code'] = check_plain($node->field_cert_cip_code[0]['value']);
			
			//total credits
			$variables['total_credits'] = check_plain($node->field_min_credits[0]['value']);
			if (!empty($node->field_max_credits[0]['value'])) {
				$variables['total_credits'] .= ' - ' . check_plain($node->field_max_credits[0]['value']);
			}
			break;
    
    
		// node: Transfer Degree
		case ($node->type == 'degree_transfer'):

			//SBCTC meta
			$variables['epc_code'] = !empty($node->field_transfer_prog_code[0]['view']) ? $node->field_transfer_prog_code[0]['view'] : '';
			$variables['eff_yrq'] = !empty($node->field_transfer_eff_yrq[0]['value']) ? _schedule_yrq_to_quarter($node->field_transfer_eff_yrq[0]['value']) : '';
			
			//breadcrumb mod
			$bc = drupal_get_breadcrumb();
			$bc[] = l(t('Degrees'), 'degrees');
			drupal_set_breadcrumb($bc);
			break;


		// node: Testimonial
		case ($node->type == 'testimonial'):
			if ($node->field_testimonial_photo[0]['filepath']) {
				$variables['photo'] ='<img src="/'.$node->field_testimonial_photo[0]['filepath'].'" alt="portrait" />';
			} else {
				if ($node->field_testimonial_netid[0]['uid']>=2) {
					$witness = user_load($node->field_testimonial_netid[0]['uid']);
					if ($witness->picture) {
						$variables['photo'] ='<img src="/'.$witness->picture.'" alt="portrait" />';
					}
				}
			}
			if ($node->field_testimonial_bio[0]['value']) {
				$variables['bio'] = check_markup($node->field_testimonial_bio[0]['value'],$node->field_testimonial_bio[0]['format'],false);
			}
			if ($node->field_testimony[0]['value']) {
				$variables['testimony'] = check_markup($node->field_testimony[0]['value'],$node->field_testimony[0]['format'],false);
			}
			$variables['job_title'] = check_plain($node->field_testimonial_job_title[0]['value']);
			if ($node->field_testimonial_netid[0]['uid']>=2) {
				$variables['full_name'] = _nscc_get_nscc_profile_full_name($node->field_testimonial_netid[0]['uid']);
			} else {
				$variables['full_name'] = check_plain($node->field_testimonial_fullname[0]['value']);
			}
			break;


		// node: Integrated Studies Testimonial
		case ($node->type =='testimonial_is'):
			$variables['page'] = false;	// DEV ONLY
			$variables['quote'] = $variables['field_testimony'][0]['view'];
			$variables['quotee_title'] = $variables['field_testimonial_job_title'][0]['view'];
			$variables['node_photo'] = $variables['field_testimonial_photo'][0]['view'];
			$variables['quotee_name'] = $variables['field_testimonial_fullname'][0]['view'];

			if ($node->field_testimonial_netid[0]['uid'] > 1) {
				if ( $quotee = user_load($node->field_testimonial_netid[0]['uid']) ) {
					$variables['quotee_name'] = theme('username', $quotee);
					$variables['quotee_title'] = empty($variables['quotee_title']) ? check_plain($quotee->nscc_profile_job_title) : $variables['quotee_title'];					
					if ( empty($variables['node_photo']) && $quotee->picture ) {
						$alt = check_plain($quotee->nscc_profile_first_name.' '.$quotee->nscc_profile_last_name);
						$variables['node_photo'] = theme('imagecache', 'sidebar-2col', $quotee->picture, $alt);
					}
				}
			}
			//watchdog('theming', 'vars: <pre>'.print_r($variables,true)."</pre>\n");
			break;


		// node: Committee Overview
		case ($node->type == 'committee_overview'):
			if(check_url($node->field_minutes_url[0]['url'])){
				$links_content .= '<li>'.$node->field_minutes_url[0]['view'].'</li>';
			}
			if(check_url($node->field_calendar_url[0]['url'])){
				$links_content .= '<li>'._format_calendar($node->field_calendar_url[0]['url'],'subscribe_link').'</li>';
				$variables['calendar_embed'] = _format_calendar($node->field_calendar_url[0]['url'],'agenda_embed_committee');
			}
			if(check_url($node->field_news_feed_url[0]['url'])){
				$links_content .= '<li>'.$node->field_news_feed_url[0]['view'].'</li>';
			}
			if(check_url($node->field_other_website_url[0]['url'])){
				$links_content .= '<li>'.$node->field_other_website_url[0]['view'].'</li>';
			}
			if($links_content){
				$variables['committee_links']='<div class="committee_links"><h2>Links</h2><ul>'.$links_content."</ul></div>\n";
			}
			
			$internal_memberships='';
			$external_memberships='';
			foreach ($node->field_committee_members as $current_member) {
				if ($current_member['value']['field_member'][0]['uid']) {
					$member_user = user_load($current_member['value']['field_member'][0]['uid']);
					$internal_memberships .= '<li class="committee_membership"><span class="member-constituency">'.check_plain($current_member['value']['field_constituency'][0]['value']).'</span> <a class="member_name" href="/users/'.$member_user->name.'" title="View user profile.">'._nscc_get_nscc_profile_full_name($member_user->uid).'</a><span class="member_position">'.$current_member['value']['field_position'][0]['value'].'</span>'."</li>\n";
				}
			}
			foreach ($node->field_outside_members as $current_member) {
				if ($current_member['value']['field_member_name'][0]['value']) {
					$external_memberships.= '<li class="committee_membership"><span class="member-constituency">'.check_plain($current_member['value']['field_constituency'][0]['value']).'</span><span class="member_name">'.check_plain($current_member['value']['field_member_name'][0]['value']).'</span><span class="member_position">'.check_plain($current_member['value']['field_position'][0]['value']).'</span>'."</li>\n";
				}
			}
			if($internal_memberships){
				$internal_memberships = '<div class="internal_members"><ul>'.$internal_memberships.'</ul></div>';
			}
			if($external_memberships){
				$external_memberships = '<div class="external_members"><ul>'.$external_memberships.'</ul></div>';
			}
			if($internal_memberships || $external_memberships){
				$variables['memberlist'] = '<div class="memberlist"><h2>Members:</h2>'."$internal_memberships\n$external_memberships</div>\n";
			}
			if($node->content['body']['#value']){
				$variables['description'] = check_markup($node->content['body']['#value'],$node->format,false);
			}
			
			//technical contact
			$author = nscc_960_username($node);
			$variables['technical_contact'] = "<div class=\"technical-contact\"><p>Missing &amp; erroneous committee information should be reported to $author.</p></div>\n";
			
			//breadcrumb mod
			$bc = drupal_get_breadcrumb();
			$bc[] = l(t('Committees'), 'committees');
			drupal_set_breadcrumb($bc);
			break;


		// node: Tuition
		case ($node->type == 'tuition') :
			$tuit_rows = _build_tuition_table_rows($node);
			$variables['resident_tuition_rows'] = implode('', $tuit_rows['res']);
			$variables['nonresident_tuition_rows'] = implode('', $tuit_rows['nonres']);
			$variables['parent_ed_amt'] = sprintf('$%01.2f', $node->field_pe_credit[0]['value']);
			$variables['abe_amt'] = sprintf('$%01.2f', $node->field_abe_quarter[0]['value']);
			$variables['esl_amt'] = sprintf('$%01.2f', $node->field_esl_quarter[0]['value']);
			$variables['ged_amt'] = sprintf('$%01.2f', $node->field_ged_quarter[0]['value']);
			$variables['seniors_amt'] =sprintf('$%01.2f', $node->field_sen_class[0]['value']);
			$variables['edit_mode'] = (arg(0) == 'node' && arg(2) == 'edit') ? true : false;
			break;


		// node: Fee
		case ($node->type == 'fee') :
			$variables['edit_mode'] = (arg(0) == 'node' && arg(2) == 'edit') ? true : false;
			$variables['target_display'] = $node->target_display;
			$variables['fee_title'] = $node->title." (".$node->field_fee_code[0]['value'].")";
			$variables['purpose'] = check_markup($node->field_fee_purpose[0]['value'],$node->field_fee_purpose[0]['format'], false);
			$variables['levied'] = check_markup($node->field_fee_levied[0]['value'],$node->field_fee_levied[0]['format'], false);
			$variables['cost'] = check_markup($node->field_cost_statement[0]['value'],$node->field_cost_statement[0]['format'], false);
			$variables['fee_code'] = !empty($node->field_fee_code[0]['value']) ? check_plain($node->field_fee_code[0]['value']) : '';
			break;


		// node: Profile
		case ($node->type == 'profile') :
			if ($node->field_testimonial_netid[0]['uid'] > 1) {
				// Use NetID profile data.
				$profile_user = user_load($node->field_testimonial_netid[0]['uid']);
				$variables['profile_subject_name'] = check_plain($profile_user->nscc_profile_first_name . ' ' . $profile_user->nscc_profile_last_name);
				$variables['profile_subject_degrees'] = check_plain($profile_user->nscc_profile_degrees);
				$variables['profile_subject_title'] = check_plain($profile_user->nscc_profile_job_title);
				$variables['profile_subject_photo'] = !empty($profile_user->picture) ? '<img src="'.base_path().$profile_user->picture.'" alt="'.$variables['profile_subject_name'].'" />':'';
				$variables['profile_subject_name'] = l($variables['profile_subject_name'],'https://people.northseattle.edu/users/'.$profile_user->name);
			} else {
				// Use node data.
				$variables['profile_subject_name'] = !empty($node->field_testimonial_fullname[0]['value']) ? check_plain($node->field_testimonial_fullname[0]['value']) : '';
				$variables['profile_subject_title'] = !empty($node->field_testimonial_job_title[0]['value']) ? check_plain($node->field_testimonial_job_title[0]['value']) : '';
				$variables['profile_subject_photo'] = ($node->field_testimonial_photo[0]['filesize'] > 0) ? '<img src="'.base_path().$node->field_testimonial_photo[0]['filepath'].' alt="'.$variables['profile_subject_name'].'" />' : '';
			}
			$variables['edit_mode'] = (arg(0) == 'node' && arg(2) == 'edit') ? true : false;			
			$variables['content'] = !empty($node->field_prof_full[0]['value']) ? check_markup($node->field_prof_full[0]['value'], $node->field_prof_full[0]['format'], false) : '';
			break;


		// node: EdFund Success Story
		case ($node->type == 'ed_fund_success_story') :
			$variables['display_title'] = check_plain($variables['field_display_title'][0]['value']);
			$variables['description'] = !empty($variables['field_edss_desc'][0]['value'])
				? check_markup($variables['field_edss_desc'][0]['value'], $variables['field_edss_desc'][0]['format'], false)
				: '';
			$variables['statement'] = !empty($variables['field_statement'][0]['value'])
				? check_markup($variables['field_statement'][0]['value'], $variables['field_statement'][0]['format'], false)
				: '';
			$variables['caption'] = check_plain($variables['field_caption'][0]['value']);
			$variables['quotee'] = '&#151;'.check_plain($variables['field_edss_name'][0]['value']);
			$variables['success_type'] = ucwords(check_plain($variables['field_edss_type'][0]['value']));
			if ($variables['field_testimonial_photo'][0]['filesize'] > 0) {
				if ($node->render_style == 'sidebar') {
					$variables['photo'] = theme(
						'imagecache',
						'col1',
						$variables['field_testimonial_photo'][0]['filepath'],
						$variables['field_testimonial_photo'][0]['alt'],
						$variables['field_testimonial_photo'][0]['title']
					);
				} else {
					$variables['photo'] = theme(
						'image',
						$variables['field_testimonial_photo'][0]['filepath'],
						$variables['field_testimonial_photo'][0]['alt'],
						$variables['field_testimonial_photo'][0]['title']
					);
				}
			}
			if (!empty($variables['statement'])) {
				$variables['classes'] .= ' testimonial';
			}
			//watchdog('theme', 'EF SS vars: <pre>'.print_r($variables, true)."<\pre>\n");
			break;


		// node: Ed Fund Board Member Bio
		case ($node->type == 'ed_fund_board_member') :
			$variables['board_position'] = $variables['field_board_pos'][0]['view'];
			if ($variables['field_board_member_photo'][0]['filesize'] > 0) {
				$variables['photo'] = theme('image', $variables['field_board_member_photo'][0]['filepath'], $variables['field_board_member_photo'][0]['data']['alt'], $variables['field_board_member_photo'][0]['data']['title']);
				$variables['photo_caption'] = $variables['field_photo_caption'][0]['view'];
			}
			//watchdog('theme', 'EF Board <pre>'.print_r($variables, true)."<\pre>\n");
			break;


		// node: Fine Art Award
		case ($node->type == 'degree_nontrad') :
			$variables['edit_mode'] = (arg(0) == 'node' && arg(2) == 'edit') ? true : false;
			
			//Worksheet file attachment
			if ($node->field_transfer_worksheet[0]['filesize'] > 0) {
				$filename = $node->field_transfer_worksheet[0]['filename'];
				$filepath = $node->field_transfer_worksheet[0]['filepath'];
				$filesize = '<span class="file-size">('. format_file_size($node->field_transfer_worksheet[0]['filesize']) . ')</span>';	//see: nscc_960/template.php
				$filedesc = !empty($node->field_transfer_worksheet[0]['data']['description']) ? '<p class="file-description">' . check_plain($node->field_transfer_worksheet[0]['data']['description']) . '</p>' : '';
				$link = l($filename, $filepath);
				$icon = module_exists('filefield') ? theme_filefield_icon($node->field_transfer_worksheet[0]) : '';
				$variables['worksheet_file'] = "<div class=\"filefield-file\">$icon$link $filesize$filedesc</div>";
			}
			
			//Requirements file attachment
			if ($node->field_transfer_reqs[0]['filesize'] > 0) {
				$filename = $node->field_transfer_reqs[0]['filename'];
				$filepath = $node->field_transfer_reqs[0]['filepath'];
				$filesize = '<span class="file-size">(' . format_file_size($node->field_transfer_reqs[0]['filesize']) . ')</span>';	//see: nscc_960/template.php
				$filedesc = !empty($node->field_transfer_reqs[0]['data']['description']) ? '<p class="file-description">' . check_plain($node->field_transfer_reqs[0]['data']['description']) . '</p>' : '';
				$link = l($filename, $filepath);
				$icon = module_exists('filefield') ? theme_filefield_icon($node->field_transfer_reqs[0]) : '';
				$variables['requirements_file'] = "<div class=\"filefield-file\">$icon$link $filesize$filedesc</div>";
			}
			
			//Sanitized node body
			if (!empty($node->content['body']['#value'])) {
				//$variables['node_body'] = check_markup($node->content['body']['#value'], $node->format, false);
				$variables['node_body'] = $variables['content'];
				//watchdog('theme', 'FA Vars: <pre>'.print_r($variables, true)."</pre>\n");
			}
			
			//Learning Outcomes (objectives)
			$variables['objectives'] = !empty($node->field_transfer_objectives[0]['value']) ? check_markup($node->field_transfer_objectives[0]['value'], $node->field_transfer_objectives[0]['format'], false) : '';
			
			//Procedurify the Advising Steps CCK/FlexiField items, if needed.
			if (!empty($node->field_advising_steps)) {
				jq_add('tabs');
				drupal_add_js('sites/all/themes/nscc_960/js/procedure-tab.js','theme');
				$steps = $node->field_advising_steps;
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
				
				$variables['advising_procedure'] .= $step_output;
			}
			
			//SBCTC meta
			$variables['epc_code'] = !empty($node->field_transfer_prog_code[0]['view']) ? $node->field_transfer_prog_code[0]['view'] : '';
			$variables['eff_yrq'] = !empty($node->field_transfer_eff_yrq[0]['value']) ? _schedule_yrq_to_quarter($node->field_transfer_eff_yrq[0]['value']) : '';
			
			//breadcrumb mod
			$bc = drupal_get_breadcrumb();
			$bc[] = l(t('Degrees'), 'degrees');
			drupal_set_breadcrumb($bc);
			break;
    
    
		// node: Storm Team (basketball)
		case ($node->type == 'storm_team') :
			// team highlights
			$variables['team_highlights'] = !empty($node->content['body']['#value']) ? check_markup($node->content['body']['#value'], $node->format, false) : '';
					
			// schedule
			$variables['team_schedule'] = views_embed_view('storm_games', 'block_1', $node->nid);
			
			// players
			if (! empty($node->field_players)) {
				$variables['player_tbl_attr'] = ' summary="'.$node->title.' Players"';
				$player_rows = array();
				foreach ($node->field_players as $player) {
					$player_node = node_load($player['nid'], null, true);
					if ($player_node !== false) {
						$tbl_row[] = '<tr>';
						$tbl_row[] = '<td class="player-number">' . check_plain($player_node->field_number[0]['value']) . '</td>';
						$tbl_row[] = '<td class="player-name">' . l($player_node->title,'node/'.$player_node->nid, array('attributes' => array('title' => 'Player details'))) . '</td>';
						if (! empty($player_node->field_player_position)) {
							$position = array();
							foreach($player_node->field_player_position as $pos_item) {
								$position[] = ($pos_item['value'] == 'Point Guard')
								? '<abbr title="Point Guard">PG</abbr>'
								: '<abbr title="' . check_plain($pos_item['value']) . '">' . substr($pos_item['value'], 0, 1) . '</abbr>';
							}
							$positions = implode(', ', $position);
						}
						$tbl_row[] = "<td class=\"player-position\">$positions</td>";
						$tbl_row[] = '<td class="player-height">' . check_plain($player_node->field_player_height[0]['value']) . '</td>';
						$tbl_row[] = (!empty($player_node->field_player_year[0]['value']))
						? '<td class="player-year"><abbr title="' . check_plain($player_node->field_player_year[0]['value']) . '">' . substr($player_node->field_player_year[0]['value'], 0, 1) . '</abbr></td>'
						: '<td>&nbsp;</td>';
						$tbl_row[] = '<td class="player-hs">' . check_plain($player_node->field_player_hs[0]['value']) . '</td>';
						$tbl_row[] = '</tr>';
						$player_rows[] = implode('', $tbl_row);
						unset($tbl_row);	// prevents player dupes
					}
				}
				$variables['player_tbl_rows'] = implode("\n", $player_rows);
				$variables['player_tbl_attr'] = ' class="team-roster" summary="' . check_plain($node->title) . ' roster"';
			}
			
			// staff
			if (!empty($node->field_storm_team_staff)) {
				$staff_list = array();
				foreach ($node->field_storm_team_staff as $staffer) {
					$staffer_node = node_load($staffer['value']['field_team_staff'][0]['nid'], null, true);
					//					watchdog('team-staffer', 'Node: <pre>'.print_r($staffer_node,1)."</pre>\n");
					if ($staffer_node !== false) {
						$staffer_name = check_plain($staffer_node->title);
						$staffer_role = check_plain($staffer['value']['field_storm_position'][0]['value']);
						$staffer_bio = !empty($staffer_node->field_staff_bio[0]['value']) ? check_markup($staffer_node->field_staff_bio[0]['value'], $staffer_node->field_staff_bio[0]['format'], false) : '';
						$staffer_photo = ($staffer_node->field_staff_photo[0]['filesize'] > 0) ? "\n<img src=\"" . base_path() . $staffer_node->field_staff_photo[0]['filepath'] . "\" alt=\"$staffer_name, $staffer_role\" />" : '';
						$staff_list[] = <<<STAFFER_INFO
						<div class="storm-staffer">
						<h3>$staffer_photo
						<span class="storm-staffer-name">$staffer_name</span>
						<span class="storm-staffer-role">$staffer_role</span>
						</h3>
						<div class="storm-staffer-bio">$staffer_bio</div>	
						</div>
STAFFER_INFO;
					}
				}
				$variables['team_staff'] = implode("\n", $staff_list);
			}
			
			// tabbed panels
			if ($variables['team_highlights'] || $variables['team_schedule'] || $variables['player_tbl_rows'] || $variables['team_staff']) {
				jq_add('tabs');
				drupal_add_js('sites/all/themes/nscc_960/js/tabbed-panels.js', 'theme');
				$tabs_list[] = '<ul class="tab-items">';
				if (!empty($variables['team_highlights'])) {
					$variables['team_panel_attr'] = ' id="tab-1" class="tab-body"';
					$variables['sched_panel_attr'] = ' id="tab-2" class="tab-body"';
					$variables['player_panel_attr'] = ' id="tab-3" class="tab-body"';
					$tabs_list[] = '<li><a href="#tabs-1" class="w current">Highlights</a></li>';
					$tabs_list[] = '<li><a href="#tabs-2" class="w">Schedule</a></li>';
					$tabs_list[] = '<li><a href="#tabs-3" class="w">Players</a></li>';
					if (!empty($variables['team_staff'])) {
						$variables['staff_panel_atrr'] =' id="tabs-4" class="tab-body"' ;
						$tabs_list[] = '<li><a href="#tabs-4" class="w">Staff</a></li>';
					}
				} else {
					$variables['sched_panel_attr'] = ' id="tab-1" class="tab-body"';
					$variables['player_panel_attr'] = ' id="tab-2" class="tab-body"';
					$tabs_list[] = '<li><a href="#tabs-1" class="w current">Schedule</a></li>';
					$tabs_list[] = '<li><a href="#tabs-2" class="w">Players</a></li>';
					if (!empty($variables['team_staff'])) {
						$tabs_list[] = '<li><a href="#tabs-3" class="w">Staff</a></li>';
						$variables['staff_panel_atrr'] =' id="tabs-3" class="tab-body"' ;
					}
				}
				$tabs_list[] = '</ul>';
				$variables['tabs_list'] = implode("\n", $tabs_list);
				unset($tabs_list);	//cleanup
			}
			break;


		// node: Storm Player (basketball)
		case ($node->type == 'storm_player') :
			$variables['player_bio'] = !empty($node->field_player_bio[0]['value']) ? check_markup($node->field_player_bio[0]['value'], $node->field_player_bio[0]['format'], false) : '';
			$variables['player_photo'] = ($node->field_player_photo[0]['filesize'] > 0)	? '<img class="player_photo" src="' . base_path() . $node->field_player_photo[0]['filepath'] . '" alt="' . check_plain($node->title) . '" />' : '';
			$variables['player_year'] = check_plain($node->field_player_year[0]['value']);
			$variables['player_height'] = check_plain($node->field_player_height[0]['value']);
			$variables['player_num'] = check_plain($node->field_number[0]['value']);
			$variables['player_hs'] = check_plain($node->field_player_hs[0]['value']);
			$variables['position_label_suffix'] = (count($node->field_player_position) > 1) ? 's' : '';
			foreach ($node->field_player_position as $pos) {
				$player_pos[] = check_plain($pos['value']);
			}
			$variables['player_position'] = implode(', ', $player_pos);
			unset($player_pos);	// cleanup
			break;


		// node: Storm Game (basketball)
		case ($node->type == 'storm_game') :
			$game_info[] = '<li class="game-matchup">' . $node->field_storm_team[0]['view'] . ' ' . t('vs.') . ' ' . $node->field_game_opponent[0]['view'] . '</li>';
			$game_info[] = !empty($node->field_game_date[0]['view'])
			? '<li class="game-date"><label>When</label> ' . $node->field_game_date[0]['view'] . ' ' . $node->field_game_time[0]['view'] . '</li>'
			: '<li class="game-date"><label>When</label> <abbr title="To Be Determined">TBD</abbr></li>';
			$game_info[] = !empty($node->field_game_loc[0]['view'])
			? '<li class="game-location"><label>Where</label> ' . $node->field_game_loc[0]['view'] . '</li>'
			: '<li class="game-location"><label>Where</label> <abbr title="To Be Determined">TBD</abbr></li>';
			
			$data_container_classes[] = 'game-data';
			$data_container_classes[] = strtolower($node->field_game_type[0]['view']) . '-game';
			$data_container_classes[] = !empty($node->field_home_game[0]['value']) ? 'home-game' : 'away-game';
			if (isset($node->field_points_storm[0]['value']) && isset($node->field_points_opponent[0]['value'])) {
				$game_info[] = '<li class="final-score"><label>Final Score</label> ' . check_plain($node->field_points_storm[0]['value']) . ' - ' . check_plain($node->field_points_opponent[0]['value']) . '</li>';
				switch (true) {
					case (intval($node->field_points_storm[0]['value']) > intval($node->field_points_opponent[0]['value'])) :
						$data_container_classes[] = 'win';
						break;
					case (intval($node->field_points_storm[0]['value']) > intval($node->field_points_opponent[0]['value'])) :
						$data_container_classes[] = 'loss';
						break;
					default :
						$data_container_classes[] = 'draw';
				}
			}
			
			$variables['data_container_attr'] = ' class="' .  chop(implode(' ', $data_container_classes)) . '"';
			$variables['game_content'] = !empty($node->content['body']['#value']) ? check_markup($node->content['body']['#value'], $node->format, false) : '';
			$variables['game_info'] = !empty($game_info) ? '<ul>' . implode("\n", $game_info) . '</ul>' : '';
			unset($data_container_classes);
			unset($game_info);
			break;


		// node: Food Service Item
		case ($node->type == 'fs_item') :
			$variables['desc_wrapper_attr'] = !empty($node->field_fs_description[0]['view']) ? ' class="catering-item-description"' : '';
			$variables['nutr_facts_wrapper_attr'] = !empty($node->field_fs_nutrition_info[0]['view']) ? ' class="catering-item-nutrition-facts"' : '';
			$variables['ingred_wrapper_attr'] = !empty($node->field_fs_ingredients[0]['view']) ? ' class="catering-item-ingredients"' : '';
			foreach ($node->field_fs_diet as $diet_type) {
				if (empty($diet_type['view'])) {
					continue;
				}
				$diet_list[] = "<li>${diet_type['view']}</li>";
			}
			$variables['diet_info'] = !empty($diet_list) ? implode("\n", $diet_list) : '';
			unset($diet_list);
			break;
		
		
		// node: Food Service Weekly Menu (cafeteria)
		case ($node->type == 'fs_weekly_menu') :
			// See nscc_main_preprocess_content_field() for theming of individual items.
			//watchdog('theme', 'FS Menu Vars:<pre>'.print_r($variables,1)."</pre>\n");
			break;


		// node: Auction Sponsor (EdFund)
		case ($node->type == 'auction_sponsor') :
			if (isset($node->view)) {
				//Special theming for Views listing.
				$variables['node_styles'] = '';
				if ($node->field_sponsor_logo[0]['filesize'] > 0) {
					$logo = $node->field_sponsor_logo[0];
					if (module_exists('imagecache')) {
						$variables['sponsor_logo'] = theme('imagecache', 'sidebar-2col', $logo['filepath'], $logo['data']['alt']);
					}
				} else {
					$variables['sponsor_title'] = $node->title;
				}
				if ($node->field_sponsor_url[0]['url']) {
					$link_attr['title'] = $node->title . ' Web site';
					$link_attr['rel'] ='nofollow';
					if ($variables['sponsor_logo']) {
						$variables['sponsor_logo'] = l($variables['sponsor_logo'], $node->field_sponsor_url[0]['url'], array('html'=>true, 'attributes'=>$link_attr));
					} else {
						$link_attr['style'] = 'display:block;height:80px;';
						$variables['sponsor_title'] = l($node->title, $node->field_sponsor_url[0]['url'], array('attributes'=>$link_attr));
					}
				}
			} else {
				//Standard node template for standalone (preview) rendering.
				$variables['template_files'][] = 'node';
			}
			//watchdog('auction', 'Sponsor node: <pre>'.print_r($node, true)."</pre>\n");		
			break;


		/*/ node: Auction Package
		case ($node->type == 'auction_package') :
			watchdog('auction', 'Auction Pkg vars: <pre>'.print_r($variables, true)."</pre>\n");
			break;
		*/


		// node: Policy
		case ($node->type == 'policy') :
			break;

		
		// node: Term
		case ($node->type == 'term') :
			break;


		// node: Orientation Page
		case ($node->type == 'orientation_page') :

			// Theme the list of topics (FlexiField nodes) for this node.
			foreach ($variables['field_orientation_topics'] as $topic_key => $topic_val) {
				$topics[] = _theme_orientation_topic($topic_val, $topic_key);
			}
			if (! empty($topics)) {
				$variables['topics'] = implode("\n", $topics);
			}

			// Build list of related links.
			foreach ($variables['field_orientation_links'] as $link_data) {
				if (! empty($link_data['view'])) {
					$related_links[] = '<li>'.$link_data['view'].'</li>';
				}
			}
			if (! empty($related_links)) {
				$variables['orientation_related_links'] = "<ul class=\"related-links-list\">\n";
				$variables['orientation_related_links'] .= implode("\n", $related_links);
				$variables['orientation_related_links'] .= "</ul>\n";
			}
			//watchdog('theme', 'Orientation Page vars: <pre>'.print_r($variables, true)."</pre>\n");
			break;


		// node: page
		case ( preg_match('/^page/',$node->type) ) :
			switch(true) {
				// page_division
				case $node->field_program_division[0]['nid'] > 0:
					// Extract just the node's body-value and sanitize it.
					$variables['content'] = check_markup($node->content['body']['#value'], $node->format, false);
					break;
				
				// page_program
				case $node->field_program[0]['nid'] > 0:
					//watchdog('theme', 'Program Page node: <pre>'.print_r($variables, true)."</pre>\n");
					// Extract just the node's body-value and sanitize it.
					// commented, because it screwed up the course() filter. 
					//$variables['content'] = check_markup($node->content['body']['#value'], $node->format, false);
					$variables['content'] = $node->content['body']['#value'];
					break;
			}
			//watchdog('theme', 'Page node: <pre>'.print_r($variables, true)."</pre>\n");
			break;
	}
}



/**
 * Template preprocessor: block
 *
 * @see block.tpl.php
 * @see block-news_headlines.tpl.php
 */
function nsc2015_preprocess_block(&$variables) {
	$block = $variables['block'];
	$variables['block_id_attr'] = "block-{$block->module}-{$block->delta}";
	$variables['block_title'] = $block->subject ? $block->subject : '';
	
	// Special block-specific treatments.
	switch($block->bid) {
		
		// Homepage News Headlines
		case 54 :
			$variables['title_attr'] = ' class="title grid-2"';
			$variables['content_attr'] = ' class="content grid-8"';
			$variables['more_link_attr'] = ' class="more-news-at-north grid-2"';
			break;

		// Highlight Message
		case 534 :
			$class_attr = explode(' ', $variables['classes']);
			$class_attr[] = 'highlight-message';
			$class_attr[] = 'grid-12';
			$variables['classes'] = implode(' ', $class_attr);
			break;
	}
	//watchdog('theme','Block vars: <pre>'.print_r($variables, true)."</pre>\n");
}



/**
 * Template preprocessor: committee view table
 */
function nsc2015_preprocess_views_view_table__committees(&$variables) {
	$variables['class'] .= ' committees-listing';
}



/**
 * Template preprocessor: Food Services Current Menu Block (block_1)
 */
function nsc2015_preprocess_views_view__food_services__block_1(&$variables) {
	//watchdog('theme', 'FS Block 1 vars: <pre>'.print_r($variables,true)."</pre>\n");
}



/**
 * Template preprocessor: CCK fields
 */
function nsc2015_preprocess_content_field(&$variables) {
	$node = $variables['node'];
	$field = $variables['field'];	// field meta-data
	$items = $variables['items'];	// field content

	// Custom field-handling per node type
	switch ($node->type) {
		case 'overview' :
			switch ($variables['field_name']) {
				case 'field_discipline_desc_t' :
				case 'field_nscc_advantage_t' :
				case 'field_benefits_t' :
				case 'field_pathways_t' :
					$variables['template_files'][] = 'content-field-overview-title';
					$variables['overview_field_title'] = $variables['items'][0]['view'];
					break;
			}
			break;

		// Food Service Weekly Menu
		case 'fs_weekly_menu' :
			switch (true) {

				// Daily Items
				case (strpos($field['field_name'], '_items') !== false) :
					$variables['template_files'][] = 'cck-field-fs-item';
					foreach ($items as $delta => $item) {
						if ($item['empty']) { continue; }
						$item_node = node_load($item['nid'],null,true);
						if (! $item_node->status) { continue; }
						$items[$delta]['path'] = $node->path;
						$items[$delta]['node_path'] = base_path().$item_node->path;
						$items[$delta]['node_title'] = check_plain($item_node->title);
						if ($item_node->field_fs_photo[0]['filesize'] > 0) {
							$items[$delta]['img'] = theme(
								'imagecache',
								'col1',
								$item_node->field_fs_photo[0]['filepath'],
								$item_node->title
							);
						} else {
							$items[$delta]['img'] = theme(
								'imagecache',
								'col1',
								_path_to_theme_asset('imgs/nopic-fs-item.png'),
								'No photo available'
							);
						}
						
						// CSS classes for the item.
						$css_classes[] = 'fs-item';
						$css_classes[] = 'grid-1';
						$css_classes[] = ($delta+1)%2 ? 'odd' : 'even';
						if ($delta == 0) {
							$css_classes[] = 'alpha';
							$css_classes[] = 'first';
						} elseif ($delta == count($items)-1) {
							$css_classes[] = 'omega';
							$css_classes[] = 'last';
						}
						$items[$delta]['css_classes'] = $css_classes;
						$items[$delta]['class_attr'] = implode(' ', $css_classes);
						unset($css_classes);
						//watchdog('theme', 'fsnode: <pre>'.print_r($item_node,true)."</pre>\n");
					}
					//watchdog('theme-cck', 'Daily Item Field:<pre>'.print_r($field,true)."</pre>\nDaily Item Items:<pre>".print_r($items,true)."</pre>\nDaily Item vars:<pre>".print_r($variables,true)."</pre>\n");
					$variables['items'] = $items;
					break;

				// Daily Title
				case (strpos($field['field_name'], '_title') !== false) :
					$variables['template_files'][] = 'cck-field-fs-daily-title';
					//watchdog('theme-cck', 'Daily Title Field:<pre>'.print_r($field,true)."</pre>\nDaily Title Items:<pre>".print_r($items,true)."</pre>\nDaily Title vars:<pre>".print_r($variables,true)."</pre>\n");
					break;
			}
			//watchdog('theme', 'FS Field Vars:<pre>'.print_r($field,true)."</pre>\nFS Menu Items:<pre>".print_r($items,true)."</pre>\nFS Menu Field vars:<pre>".print_r($variables,true)."</pre>\n");
			break;

	}

	// Work-study(?) position-count grammatic-formatter
	if ($field['field_name'] == 'field_num_pos') {
		foreach($items as $key => $val) {
			$variables['items'][$key]['view'] = '<p>' . check_plain($val['value']) . ' available position';
			$variables['items'][$key]['view'] .= $val['value'] > 1 ? 's' : '';
			$variables['items'][$key]['view'] .= '</p>';
		}
	}
}



/**
 *	Helper function: Recursively build breadcrumb links to parent nodes.
 */
function _get_parent_breadcrumb($nid, &$links = array()) {
	if ($nid > 0 && !array_key_exists($nid, $links)) {
		$node = node_load($nid);
		$parent_nid = $node->field_parent[0]['nid'];
		if (!empty($parent_nid)) {
			_get_parent_breadcrumb($node->field_parent[0]['nid'], $links);
			switch ($node->type) {
				case 'dept_group' :
					$links[$nid] = l(t($node->title), $GLOBALS['base_url'].'/'.$node->path, array('alias'=>true));
					break;
				case 'section' :
					$home = node_load($node->field_section_home[0]['nid']);
					$links[$nid] = l(t($node->title), $GLOBALS['base_url'].'/'.$home->path, array('alias'=>true));
					break;
			}
		} else {
			switch ($node->type) {
				case 'nav_index' :
					if (!empty($node->field_nav_index_alt_url[0]['url'])) {
						$links[$nid] = l(t($node->title), $node->field_nav_index_alt_url[0]['url'], array('absolute'=>true));
					} else {
						$links[$nid] = l(t($node->title), $GLOBALS['base_url'].'/'.$node->path, array('alias'=>true));
					}
				case 'dept_group' :
					$links[$nid] = l(t($node->title), $GLOBALS['base_url'].'/'.$node->path, array('alias'=>true));
					break;
				case 'section' :
					$home = node_load($node->field_section_home[0]['nid']);
					$links[$nid] = l(t($node->title), $GLOBALS['base_url'].'/'.$home->path, array('alias'=>true));
					break;
			}
		}
	}
	return array_values($links);
}



/**
 *	Helper function: Calculates amounts and builds tuition table rows for specified tuition node.
 *	@returns Array
 */
function _build_tuition_table_rows($node) {
	for ($i = 1; $i <=25; $i++) {
		$rows['res'][$i] = "\n\t<tr>";
		$rows['nonres'][$i] = "\n\t<tr>";
		if ($i <= 10) {
			$rows['res'][$i] .= "\n\t\t<td>$i</td>"
					. '<td>$' . number_format($node->field_res_acad_few[0]['value'] * $i, 2) . '</td>'
					. '<td>$' . number_format($node->field_res_voc_few[0]['value'] * $i, 2) . '</td>'
					. '<td>$' . number_format($node->field_res_hs_few[0]['value'] * $i, 2) . '</td>';
			$rows['nonres'][$i] .= "\n\t\t<td>$i</td>"
					. '<td>$' . number_format($node->field_nr_acad_few[0]['value'] * $i, 2) . '</td>'
					. '<td>$' . number_format($node->field_nr_voc_few[0]['value'] * $i, 2) . '</td>'
					. '<td>$' . number_format($node->field_nr_el_few[0]['value'] * $i, 2) . '</td>'
					. '<td>$' . number_format($node->field_nr_wg_few[0]['value'] * $i, 2) . '</td>'
					. '<td>$' . number_format($node->field_nr_ref_few[0]['value'] * $i, 2) . '</td>'
					. '<td>$' . number_format($node->field_nr_hs_few[0]['value'] * $i, 2) . '</td>';
		} elseif ($i <= 18) {
			$rows['res'][$i] .= "\n\t\t<td>$i</td>"
				. '<td>$' . number_format($node->field_res_acad_med[0]['value'] * ($i - 10) + $node->field_res_acad_few[0]['value'] * 10, 2) . '</td>'
				. '<td>$' . number_format($node->field_res_voc_med[0]['value'] * ($i - 10) + $node->field_res_voc_few[0]['value'] * 10, 2) . '</td>'
				. '<td>$' . number_format($node->field_res_hs_med[0]['value'] * ($i - 10) + $node->field_res_hs_few[0]['value'] * 10, 2) . '</td>';
			$rows['nonres'][$i] .= "\n\t\t<td>$i</td>"
					. '<td>$' . number_format($node->field_nr_acad_med[0]['value'] * ($i - 10) + $node->field_nr_acad_few[0]['value'] * 10, 2) . '</td>'
					. '<td>$' . number_format($node->field_nr_voc_med[0]['value'] * ($i - 10) + $node->field_nr_voc_few[0]['value'] * 10, 2) . '</td>'
					. '<td>$' . number_format($node->field_nr_el_med[0]['value'] * ($i - 10) + $node->field_nr_el_few[0]['value'] * 10, 2) . '</td>'
					. '<td>$' . number_format($node->field_nr_wg_med[0]['value'] * ($i - 10) + $node->field_nr_wg_few[0]['value'] * 10, 2) . '</td>'
					. '<td>$' . number_format($node->field_nr_ref_med[0]['value'] * ($i - 10) + $node->field_nr_ref_few[0]['value'] * 10, 2) . '</td>'
					. '<td>$' . number_format($node->field_nr_hs_med[0]['value'] * ($i - 10) + $node->field_nr_hs_few[0]['value'] * 10, 2) . '</td>';
		} else {
			$rows['res'][$i] .= "\n\t\t<td>$i</td>"
				. '<td>$' . number_format($node->field_res_acad_lots[0]['value'] * ($i - 18) + $node->field_res_acad_med[0]['value'] * 8 + $node->field_res_acad_few[0]['value'] * 10, 2) . '</td>'
				. '<td>$' . number_format($node->field_res_voc_lots[0]['value'] * ($i - 18) + $node->field_res_voc_med[0]['value'] * 8 + $node->field_res_voc_few[0]['value'] * 10, 2) . '</td>'
				. '<td>$' . number_format($node->field_res_hs_lots[0]['value'] * ($i - 18) + $node->field_res_hs_med[0]['value'] * 8 + $node->field_res_hs_few[0]['value'] * 10, 2) . '</td>';
			$rows['nonres'][$i] .= "\n\t\t<td>$i</td>"
					. '<td>$' . number_format($node->field_nr_acad_lots[0]['value'] * ($i - 18) + $node->field_nr_acad_med[0]['value'] * 8 + $node->field_nr_acad_few[0]['value'] * 10, 2) . '</td>'
					. '<td>$' . number_format($node->field_nr_voc_lots[0]['value'] * ($i - 18) + $node->field_nr_voc_med[0]['value'] * 8 + $node->field_nr_voc_few[0]['value'] * 10, 2) . '</td>'
					. '<td>$' . number_format($node->field_nr_el_lots[0]['value'] * ($i - 18) + $node->field_nr_el_med[0]['value'] * 8 + $node->field_nr_el_few[0]['value'] * 10, 2) . '</td>'
					. '<td>$' . number_format($node->field_nr_wg_lots[0]['value'] * ($i - 18) + $node->field_nr_wg_med[0]['value'] * 8 + $node->field_nr_wg_few[0]['value'] * 10, 2) . '</td>'
					. '<td>$' . number_format($node->field_nr_ref_lots[0]['value'] * ($i - 18) + $node->field_nr_ref_med[0]['value'] * 8 + $node->field_nr_ref_few[0]['value'] * 10, 2) . '</td>'
					. '<td>$' . number_format($node->field_nr_hs_lots[0]['value'] * ($i - 18) + $node->field_nr_hs_med[0]['value'] * 8 + $node->field_nr_hs_few[0]['value'] * 10, 2) . '</td>';		
		}
		$rows['res'][$i] .= '</tr>';
		$rows['nonres'][$i] .= '</tr>';
	}
	return $rows;
}



/**
 *	Helper function: Auction sponsors theming
 */
function _theme_auction_sponsorships($sponsorships) {
	if (! is_array($sponsorships) || empty($sponsorships[0]['value'])) { return false; }
	foreach($sponsorships as &$sponsorship) {
		$snode = node_load($sponsorship['value']['field_sponsor'][0]['nid'], null, true);
		$snode->view = true;	// triggers custom theming via node preprocessor.
		$sponsorship['value']['field_sponsor'][0]['node'] = $snode;
		$sponsorship['value']['field_sponsor'][0]['view'] = theme('node', $sponsorship['value']['field_sponsor'][0]['node']);
	}
	//reset($sponsorships);
	usort($sponsorships, '_compare_auction_sponsors');
	//watchdog('theme', 'sponsorships: <pre>'.print_r($sponsorships, true)."</pre>\n");
	return $sponsorships;
}



/**
 *	Helper function: compares auction sponsors by donation amount (desc) and sponsor name (asc).
 *
 * @return int -1, 1, or 0 if $a should come before, after, or same place as $b repectively.
 */
function _compare_auction_sponsors($a, $b) {
	$a_amt = $a['value']['field_sponsor_donation'][0]['value'];
	$b_amt = $b['value']['field_sponsor_donation'][0]['value'];
	if ($a_amt == $b_amt) {
		$a_node = $a['value']['field_sponsor'][0]['node'];
		$b_node = $b['value']['field_sponsor'][0]['node'];
		return strcasecmp($a_node->title, $b_node->title);
	}
	return ($a_amt > $b_amt) ? -1 : 1;
}





/**
 *	Helper function: themes the specified Orientation Topic (Flexifield)
 *	@param Array - the orientation_topic data to be themed
 *	@param Int - Index position in the original field list.
 * @return String - Output-ready topic
 */
function _theme_orientation_topic($topic, $ordinal) {
	//watchdog('theme', 'Orientation Topic: <pre>'.print_r($topic,true)."</pre>\n");
	if ( empty($topic)) { return ''; }

	// Sanitize text fields
	$title = check_plain($topic['value']['field_topic_title'][0]['value']);
	$title_attrs = ' class="orientation-topic-title"';
	$content = !empty($topic['value']['field_body_text'][0]['value']) ? check_markup($topic['value']['field_body_text'][0]['value'], $topic['value']['field_body_text'][0]['format'], false) : '';
	$css_title = strtolower(trim($topic['value']['field_topic_title'][0]['value']));
	$css_title = preg_replace('/\W+/', '', $css_title);
	//$css_title = preg_replace('/\s+/', '-', $css_title);
	$wrapper_attrs = " id=\"topic-$css_title\"";
	$wrapper_attrs .= ($topic['field_relates_to_quiz']['value'] > 0) ? ' class="orientation-topic quiz-answer"' : ' class="orientation-topic"';
	$content_attrs = ' class="orientation-topic-content"';
	
	// Format video embed if files have been provided.
	//watchdog('theme', 'Videos? '.!empty($topic['value']['field_or_video']));
	if ( !empty($topic['value']['field_or_video'])) {
		foreach ($topic['value']['field_or_video'] as $file_data) {
			if (empty($file_data) || $file_data['filesize'] < 1) { continue; }

			$file_pathinfo = pathinfo($file_data['filepath']);
			
			// Drupal doesn't know about webm yet (see: http://api.drupal.org/api/drupal/includes%21file.inc/function/file_get_mimetype/6)
			// so enable the following line if we need the correct MIME type.
			//$file_data['filemime'] = strtolower($file_pathinfo['extension']) == 'webm' ? 'video/webm' : $file_data['filemime'];

			// Copying file data into an array keyed by extension to make building
			// the required markup structure easier.
			$video_files[strtolower($file_pathinfo['extension'])] = $file_data;
			//watchdog('theme', 'Video path: '.print_r($file_pathinfo, true));
		}
	}
	
	// Transcript file?
	$transcript_url = ($topic['value']['field_video_transcript'][0]['filesize'] > 0) ? check_plain($topic['value']['field_video_transcript'][0]['filepath']) : '';
		
	// Build the markup as HTML5 w/ fallback flash player. We use the VfE technique
	// (see: http://camendesign.com/code/video_for_everybody) to ensure they are
	// available to javascript-less UAs. Note that we need to have an MP4 version
	// to make this work correctly using Flowplayer.
	if ( !empty($video_files['mp4']) ) {
		$css_id = $css_title;	//strtolower($title);

		// If an image is associated with this topic, we'll use it as the poster.
		$poster_path = ($topic['value']['field_or_picture'][0]['filesize'] > 0) ? check_plain($topic['value']['field_or_picture'][0]['filepath']) : '';
		$poster_attr =  $poster_path ? ' poster="/'.$poster_path.'"' : '';
		
		//$flashvars = "config={'clip':{'url':'/{$video_files['mp4']['filepath']}', 'autoPlay':false, 'autoBuffering':true}}";
		$flashvars = $poster_path
				? "config={'playlist':[{'url':'/$poster_path','autoPlay':false,'autoBuffering':true},{'url':'/{$video_files['mp4']['filepath']}','autoPlay':false,'autoBuffering':true}]}"
				: "config={'clip':{'url':'/{$video_files['mp4']['filepath']}','autoPlay':false,'autoBuffering':true}}";
		//watchdog('theme', 'flowplayer config: '.$flashvars);

		$video_embed = '<div id="'.$css_id.'-video-wrapper" class="video-wrapper orientation-topic-media">'
							. "<video controls=\"controls\" preload=\"none\" width=\"460\" height=\"259\" id=\"$css_id-video\"$poster_attr>";	// IE (9,10): poster wont display if we preload video data
		$video_embed .= '<source src="/'.$video_files['mp4']['filepath'].'" type="video/mp4" />';
		$video_embed .= $video_files['webm']['filesize'] > 0 ? '<source src="/'.$video_files['webm']['filepath'].'" type="video/webm" />' : '';
		$video_embed .= $video_files['ogv']['filesize'] > 0 ? '<source src="/'.$video_files['ogv']['filepath'].'" type="video/ogg" />' : '';
		$video_embed .= '<object type="application/x-shockwave-flash" data="/sites/all/libraries/flowplayer/flowplayer-3.2.12.swf" width="460" height="259" id="'.$css_id.'-fplayer">'
							. '<param name="movie" value="/sites/all/libraries/flowplayer/flowplayer-3.2.12.swf">'
							. '<param name="flashvars" value="'.$flashvars.'">'
							. '</object>'
							. '</video>';
		$video_embed .= '<p class="video-download-links">Problem with this video? Try: ';
		$video_embed .= l('MP4', $video_files['mp4']['filepath']);
		$video_embed .= $video_files['webm']['filesize'] > 0 ? ', '.l('WebM', $video_files['webm']['filepath']) : '';
		$video_embed .= $video_files['ogv']['filesize'] > 0 ? ', '.l('Ogg', $video_files['ogv']['filepath']) : '';
		$video_embed .= $transcript_url ? ', or '.l('transcript', $transcript_url) : '';
		$video_embed .= '.</p></div>';

	// Otherwise, theme the photo if there is one of those.
	} elseif ($topic['value']['field_or_picture'][0]['filesize'] > 0) {
		if (module_exists('imagecache')) {
			$photo = theme(
				'imagecache',
				'col6',
				$topic['value']['field_or_picture'][0]['filepath'],
				$topic['value']['field_or_picture'][0]['data']['alt'],
				null,	//title attr
				null	//other attrs
			);
		} else {
			$photo = theme(
				'image',
				$topic['value']['field_or_picture'][0]['filepath'],
				$topic['value']['field_or_picture'][0]['data']['alt'],
				null,	//title attr
				null	//other attrs
			);
		}
		$photo = "<div class=\"orientation-topic-media\">$photo</div>";
	}

	return <<<THEMED_TOPIC
<section{$wrapper_attrs}>
	<h2{$title_attrs}>$title</h2>
	<div{$content_attrs}>
		$photo
		$video_embed
		<div class="orientation-topic-copy">
			$content
		</div>
		<div class="clearfix">&nbsp;</div>
	</div>
</section>
THEMED_TOPIC;
}
