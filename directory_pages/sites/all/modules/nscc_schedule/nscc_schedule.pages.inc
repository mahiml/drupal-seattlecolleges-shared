<?php
// $Id: nscc_schedule.pages.inc,v 0.5 2009/12/08 14:06:22 goba Exp $

/**
 * @file
 * page callbacks for the nscc_schedule module.
 */

function nscc_schedule_landing_page(){
	//load up the array of yrqs
	$yrq_array[]=_schedule_get_current_yrq();
	$yrq_array[]=_schedule_get_next_yrq(_schedule_get_current_yrq(),true);
	$yrq_array[]=_schedule_get_next_yrq(_schedule_get_next_yrq(_schedule_get_current_yrq(),true),true);
	$yrq_index=0;
	
	$today = strtotime(date('M j, Y',time()));
	$output="<h1>Class Schedules &amp; Academic Calendar Dates</h1>";
	foreach($yrq_array as $index => $yrq){
		$quarter_details = _schedule_get_quarter_details($yrq);
		$qtr_start = date('M j, Y', _schedule_hpdate_to_date($quarter_details->first_day_yrq));
		$qtr_end = date('M j, Y', _schedule_hpdate_to_date($quarter_details->last_day_yrq));
		switch(substr($quarter_details->yrq,3,1)){
			case '1':
				$finals_path = "schedule/".$yrq."/finals";
				$season_class = 'summer-season';
				break;
			case '2':
				$finals_path = "schedule/".$yrq."/finals";
				$season_class = 'fall-season';
				break;
			case '3':
				$finals_path = "schedule/".$yrq."/finals";
				$season_class = 'winter-season';
				break;
			case '4':			
				$finals_path = "schedule/".$yrq."/finals";
				$season_class = 'spring-season';
				break;
		}

    $pdf_path = "http://webshares.northseattle.edu/College%20publications/Class%20schedules/schedule_".$yrq.".pdf";
		//$finals_path = "schedule/".$yrq."/finals";
		$alpha_omega_class='';
		if($index==0){ $alpha_omega_class = ' alpha';}
		if($index==2){ $alpha_omega_class = ' omega';}
		$output .= '<div class="quarter-details-panel grid-3 '.$season_class.$alpha_omega_class.'">'; 
		$output .= '<h2 class="quarter-title">'._schedule_yrq_to_quarter($quarter_details->yrq).'</h2>';
		$output .= "<p class=\"quarter-start-end\">$qtr_start - $qtr_end</p>";
		if($quarter_details->published == 't'){
		$output .= l('See Class Schedule','schedule/'.$quarter_details->yrq,array('attributes'=>array('class'=>'schedule-button')));
		//$output .= l('Download Schedule PDF',$pdf_path,array('attributes'=>array('class'=>'pdf-download'))) ."<br>";
			if ($finals_path){
				$output .= l('See Finals Schedule',$finals_path,array('attributes'=>array('class'=>'finals-schedule')));
			}
		}
		$output .= '<div class="quarter-events">';
		$qtr_events = array();
		$qtr_events = _schedule_get_quarter_events($yrq);
		$event_old_class = 'next-event future-event';
		foreach($qtr_events as $event) {
			if($event['dtstart'] < $today){
				$event_old_class ='past-event'; 
			} else {
				if($event_old_class == 'past-event'){
					$event_old_class = 'next-event future-event'; 
				} else {
					$event_old_class ='future-event'; 
				}
			}
			$output .= "      <div class=\"quarter-event $event_old_class\"><div class=\"event-date\">" . date('M j, Y', $event['dtstart']) . "</div><div class=\"event-detail\">";
		
			// Title should link to more info if event has URL.
			if(isset($event['url']) && ! empty($event['url'])){
				$output .= '<a href="' . $event['url'] . '">' . $event['summary'] . '</a>';
			} elseif (isset($event['attach']) && ! empty($event['attach'])) {
				$output .= '<a href="' . $event['attach'] . '">' . $event['summary'] . '</a>';
			} else {
				$output .=  $event['summary'];
			}
			if (isset($event['description']) && $event['description'] ) { $output .= ' &#151; ' . $event['description']; }
			$output .= "</div></div>\n";
		}			

		$output .= '</div>'; 		//end events
		$output .= '</div>'; 		//end quarter-details
		$yrq_index++;	
	}
	$output .= '<div class="clearfix">&nbsp;</div>';
	return $output;
}


/**
 *	Print export: standard version
 */
function nscc_schedule_export($yrq=NULL){
	if(!$yrq){
		$yrq = _schedule_get_next_yrq(_schedule_get_current_yrq(),true);
	}
	$tag_details = _nscc_schedule_get_tag_details();
	$course_tag_details = _nscc_schedule_get_course_tag_details();
  drupal_set_header('Content-Type: text/plain; charset=utf-8');
	$out =new XMLWriter();
	$out->openURI('php://output');
	$out->setIndent(false);
	$out->startDocument('1.0','UTF-8');
	/*$out->text("<?whitespace-handling use-tags?>\n");*/
	$out->startElement('Class_Schedule');
	//$out->writeAttribute('yrq',$yrq);
	$out->writeAttribute('xmlns:aid',"http://ns.adobe.com/AdobeInDesign/CS/");

	$sample_out = new XMLWriter();
	$sample_out->openMemory(); 
	$sample_out->setIndent(false);
	$sample_out->text("\n");
	$sample_out->startElement('department');	
	$sample_out->writeElement('department-title',"Sample Department\n");
	//$sample_out->writeElement('department-abbr',"SMPL\n");
	$sample_out->writeElement('department-blurb',"This is an example department, solely for making indesigne templates.\n");
	$sample_out->startElement('course');	
//	$sample_out->writeElement('course_no',"SMPL&100");
//	$sample_out->writeElement('course_title',"\tSampling in Sample Samples\n");
	$sample_out->writeElement('course_no',"SMPL&100\t");	// Does moving tab location improve import for designer?
	$sample_out->writeElement('course_title',"Sampling in Sample Samples\n");
	$sample_out->writeElement('course_description',"Sampling has significant benefits. For example, there is example example, and sample, and such like.\n");
	$sample_out->startElement('item');	
	$sample_out->writeElement('cs_meets_line',"8888 This section is part of a Coordinated Studies course. Please see the Integrated Studies section.\n");
	$sample_out->writeElement("distance_meets_line","8888\tSMPL&100.01\t5\teLearning\t\t\tSample,S\n");							
	$sample_out->writeElement("primary_meets_line","8888\tSMPL&100.01\t5\t4444B\tDaily\t24:00-24:50\tSample,S\n");		
	$sample_out->writeElement('ami_meets_line',"\tAdditionally, meets\t4444B\tDaily\t24:00-24:50\n");
	$sample_out->writeElement('tag_list',"N Dates eL Perm el/OC\n");
	//$sample_out->writeElement('tag','N ');
	//$sample_out->writeElement('tag','Dates ');
	//$sample_out->writeElement('tag','eL ');
	//$sample_out->writeElement('tag','Perm ');
	//$sample_out->writeElement('tag','el/OC ');
	//$sample_out->endElement();//sample tag list
	$sample_out->writeElement('item_desc_statement',"This section will focus on Sampling.\n");
	$sample_out->writeElement('date_statement',"Special Dates: This class starts on Jan 2, 2010 and ends on Dec 31, 2010.\n");
	$sample_out->writeElement('link_statement',"This class can also be taken as part of a Linked Course: \"Linked Sampling\". Please see the Integrated Studies section.\n");
	$sample_out->writeElement('www_statement',"Class Web Site: http://example.com\n");
	$sample_out->writeElement('elearning_statement',"This class has recommended orientation on example date in example room.\n");
	$sample_out->endElement();//sample item
	//$sample_out->text("\n");
	$sample_out->endElement();//sample course
	$sample_out->endElement();//sample department
	//$sample_out->text("\n");
	$out->writeRaw($sample_out->outputMemory(true));
	$sample_out->flush();
	unset($sample_out);


	$departments = _nscc_schedule_get_deptlist($yrq);
	foreach($departments as $department ){
		$out->startElement('department');
		//$out->writeAttribute('title',rtrim($department->title));
		//$out->writeAttribute('abbr',rtrim($department->abbr));
		$out->writeElement('department-title',rtrim($department->title)."\n");
		//$out->writeElement('department-abbr',rtrim($department->abbr)."\n");
		$dept_details = _nscc_schedule_get_dept_details(rtrim($department->abbr));
		if($dept_details->blurb){
			$out->writeElement('department-blurb',rtrim( _nscc_schedule_blurb_converter($dept_details->blurb) )."\n");
//	Suppress empty elem per designer's request.
//		} else {
//			$out->writeElement('department-blurb');
		}
		$courses = _nscc_schedule_get_courses_of_dept($yrq,trim($department->abbr));
		if($courses){
			foreach($courses as $course){
				$items = _nscc_schedule_get_items_of_course_for_print($yrq,$course);
				$item_out = new XMLWriter();
				$item_out->openMemory(); 
				$item_out->setIndent(false);

				foreach($items as $item){
				
					$statements = array();
					
					$item_out->startElement('item');

					// Proper casing of data per designer's request.
					$item_days = trim($item->days);
					switch ($item_days) {
						case 'DAILY' :
							$item_days = 'Daily';
							break;
						case 'ARRANGED' :
						case 'ARR' :
							$item_days = 'Arr';
							break;
					}
					$item_loc = trim($item->loc);
					switch ($item_loc) {
						case 'OFF' :
							$item_loc = 'Off';
							break;
						case 'ARRANGED' :
						case 'ARR' :
							$item_loc = 'Arr';
							break;
					}
					$item_times = str_ireplace('ARR', 'Arr', nscc_schedule_format_times(trim($item->times)));
						
					//primary meets_line
					if($item->cs == 't'){
							$cluster_details = _nscc_schedule_get_cluster_details($yrq,$item->class_cluster);
							//$item_out->startElement('cs_meets_line');
							//$item_out->writeElement('item_number',trim($item->item));
							//$item_out->writeElement('cs_text','This section is part of a Coordinated Studies course. Please see the Integrated Studies section.');
							//$item_out->endElement();//end of meets line
							
							$item_out->writeElement('cs_meets_line',trim($item->item)."\tThis section is part of a Coordinated Studies course. See the Integrated Studies section.\n");
					}else{
						if($item->dl == 't' || $item->h_oc == 't'){
							if($item->instructor_full_name){
								$item_out->writeElement("distance_meets_line",trim($item->item). "\t".trim($item->course).".".trim($item->section)."\t".$item->credits."\teLearning\t\t\t".$item->instructor_full_name."\n");							
							} else {
								$item_out->writeElement("distance_meets_line",trim($item->item). "\t".trim($item->course).".".trim($item->section)."\t".$item->credits."\teLearning\t\t\t".$item->instructor."\n");							
							}

						} else {
							if($item->instructor_full_name){
								$item_out->writeElement("primary_meets_line",trim($item->item). "\t".trim($item->course).".".trim($item->section)."\t".$item->credits."\t".$item_loc."\t".$item_days."\t".$item_times."\t".$item->instructor_full_name."\n");		
							} else {
								if(trim($item->instructor)=='STAFF'){
									$item_out->writeElement("primary_meets_line",trim($item->item). "\t".trim($item->course).".".trim($item->section)."\t".$item->credits."\t".$item_loc."\t".$item_days."\t".$item_times."\tStaff\n");
								} else {
									$item_out->writeElement("primary_meets_line",trim($item->item). "\t".trim($item->course).".".trim($item->section)."\t".$item->credits."\t".$item_loc."\t".$item_days."\t".$item_times."\t".$item->instructor."\n");
								}
							}							
						}
					
						$amis = _nscc_schedule_get_ami($yrq,$item->item);
						if($amis){
							foreach($amis as $ami){
							
								// Proper casing of data per designer's request.
								$ami_days = trim($ami->days);
								$ami_loc = trim($ami->loc);
								if ($ami_days == 'DAILY') { $ami_days = 'Daily'; }
								switch ($ami_loc) {
									case 'OFF' :
										$ami_loc = 'Off';
										break;
									case 'ARRANGED' :
									case 'ARR' :
										$ami_loc = 'Arr';
										break;
								}
								$ami_times = str_ireplace('ARR', 'Arr', nscc_schedule_format_times(trim($ami->times)));

								//$item_out->writeElement('ami_meets_line',"\tAdditionally, meets\t".trim($ami->loc)."\t".trim($ami->days)."\t".nscc_schedule_format_times(trim($ami->times))."\n");
								$item_out->writeElement('ami_meets_line',"Additionally, meets\t".$ami_loc."\t".$ami_days."\t".$ami_times."\n");	// removed 1st tab per designer's request to correct alignment problems
							}
						}
					}
					//add tags here
					//$item_out->startElement('tag_list');
					//builtin tags
					$tag_list = '';
					if($item->common_course == 't'){
						$tag_list .="CCN ";
					}
					if($item->cs=='t'){
						$tag_list .="CS ";
						//$item_out->writeElement('tag','CS ');
					}
					if($item->day_or_night=='t'){
						$tag_list .="N ";
						//$item_out->writeElement('tag','N ');
					}
					if($item->start_date != 0 || $item->end_date !=0){
						$tag_list .="Dates ";
						//$item_out->writeElement('tag','Dates ');
						$statements['dates'] = 'Special Dates: This class starts on '.date('M j, Y', _schedule_hpdate_to_date($item->start_date)).' and ends on '.date('M j, Y', _schedule_hpdate_to_date($item->end_date)).'.'."\n";
					}
					if($item->permission_required == 't'){
						$tag_list .="Perm ";
						//$item_out->writeElement('tag','Perm ');
					}
					if($item->url != NULL){
						$tag_list .="WWW ";
						//$item_out->writeElement('tag','WWW ');
						$statements['www'] = "Class Web Site: ".$item->url."\n";
					}					
					if($item->dl=='t'){
						$tag_list .="eL ";
						//$item_out->writeElement('tag','eL ');
						if(trim($item->oncampus_meetings)){
							$statements['elearning'] = trim($item->oncampus_meetings)."\n";
						}	
					}
					if($item->h=='t'){
						$tag_list .="eL/OC ";					
						//$item_out->writeElement('tag','eL/OC ');
					}
					if($item->lc=='t'){
						$tag_list .="LC ";
						//$item_out->writeElement('tag','LC ');
						$link_details = _nscc_schedule_get_link_details($yrq,$item->link_id);
						$statements['lc'] ="This class can also be taken as part of a Linked Course: \"".$link_details->title."\". Please see the Integrated Studies section.\n";
					}
					//generic tags
					if($item->tags){
						$tagslist = preg_replace('/\{|\}/','',$item->tags);
						$tags_array = explode(' ',$tagslist);
						foreach($tags_array as $tag_id){
							if($tag_details[$tag_id]->tag_abbr != 'CS' && $tag_details[$tag_id]->tag_abbr != 'LC' && $tag_details[$tag_id]->tag_abbr != 'W'){
								$tag_list .=$tag_details[$tag_id]->tag_abbr." ";
								//$item_out->writeElement('tag',$tag_details[$tag_id]->tag_abbr." ");
							}							
						}					
					}
					if($item->course_tags){
						$tagslist = preg_replace('/\{|\}/','',$item->course_tags);
						$tags_array = explode(' ',$tagslist);
						foreach($tags_array as $tag_id){
								$tag_list .=$course_tag_details[$tag_id]->tag_abbr." ";
								//$item_out->writeElement('tag',$course_tag_details[$tag_id]->tag_abbr." ");
						}					
					}
	
					//fees
					if(trim($item->fee1) && trim($item->fee1) !='**' ){
						$tag_list .= '$'.$item->fee1." ";
						///$item_out->writeElement('tag','$'.$item->fee1." ");
					}
					if(trim($item->fee2) && trim($item->fee2) !='**' ){
						$tag_list .= '$'.$item->fee2." ";
						//$item_out->writeElement('tag','$'.$item->fee2." ");
					}
					
					if(rtrim($tag_list,", ")){
						//$item_out->text("\n"); //added for indesign to prevent spurious line breaks.
						//$item_out->writeElement('tag_list',rtrim($tag_list,", ")."\n");
					}	
					//$item_out->endElement(); //end of tag_list
					if(trim($tag_list)){
						$item_out->writeElement('tag_list',$tag_list."\n");
					}
					
					//statements go here
					if($item->description){
						$item_out->writeElement('item_desc_statement',rtrim($item->description)."\n");
					}
					if($statements['dates']){
						$item_out->writeElement('date_statement',$statements['dates']);
					}
					if($statements['lc']){
						$item_out->writeElement('link_statement',$statements['lc']);
					}
					if($statements['www']){
						$item_out->writeElement('www_statement',$statements['www']);
					}
					if($statements['elearning']){
						$item_out->writeElement('elearning_statement',$statements['elearning']);
					}
					$item_out->endElement();//end of item					
				}

			
				//assemble and append the course
				$out->startElement('course');
				//$out->startElement('course_title_line');
				//$out->writeElement('course_no',rtrim($course));
				$out->writeElement('course_no',rtrim($course)."\t");	// tab inserted after course no. to see if it improves the consistency of spacing for designer's template merge.
				//$out->text("\t"); //added for indesign to prevent spurious line breaks.
				//$out->writeElement('course_title',"\t".rtrim($item->title)."\n");
				$out->writeElement('course_title',rtrim($item->title)."\n");	// tab moved to course no. to see if it improves the consistency of spacing for designer's template merge.
				//$out->endElement();//course title line
				if($item->print_description){
					$out->writeElement('course_description',html_entity_decode(rtrim($item->print_description))."\n");
//	Suppress empty elem per designer's request.
//				} else {
//					$out->writeElement('course_description');
				}				
				$out->writeRaw($item_out->outputMemory(true));
				$item_out->flush();
				unset($item_out);
				$out->endElement();//course
				//$out->text("\n"); //added for indesign to prevent spurious line breaks.
			}
		} 
		$out->endElement();//department
	}
	
	$out->endElement();//schedule
	$out->endDocument();
		
}



/**
 *	Print export: abbridged version
 */
function nscc_schedule_export_abbr($yrq=NULL) {
	if(!$yrq){
		$yrq = _schedule_get_next_yrq(_schedule_get_current_yrq(),true);
	}
	$tag_details = _nscc_schedule_get_tag_details();
	$course_tag_details = _nscc_schedule_get_course_tag_details();
  drupal_set_header('Content-Type: text/plain; charset=utf-8');
	$out =new XMLWriter();
	$out->openURI('php://output');
	$out->setIndent(false);
	$out->startDocument('1.0','UTF-8');
	$out->startElement('Class_Schedule');
	$out->writeAttribute('xmlns:aid',"http://ns.adobe.com/AdobeInDesign/CS/");

	$sample_out = new XMLWriter();
	$sample_out->openMemory(); 
	$sample_out->setIndent(false);
	$sample_out->text("\n");
	$sample_out->startElement('department');	
	$sample_out->writeElement('department-title',"Sample Department\n");
	$sample_out->startElement('course');	
	$sample_out->writeElement('course_no',"SMPL&100\t");	// Moving tab location improves import for designer.
	$sample_out->writeElement('course_title',"Sampling in Sample Samples\n");
	$sample_out->startElement('item');	
	$sample_out->writeElement('cs_meets_line',"8888 This section is part of a Coordinated Studies course. Please see the Integrated Studies section.\n");
	$sample_out->writeElement("distance_meets_line","8888\tSMPL&100.01\t5\teLearning\t\t\tSample,S\n");							
	$sample_out->writeElement("primary_meets_line","8888\tSMPL&100.01\t5\t4444B\tDaily\t24:00-24:50\tSample,S\n");		
	$sample_out->writeElement('ami_meets_line',"\tAdditionally, meets\t4444B\tDaily\t24:00-24:50\n");
	$sample_out->endElement();//sample item
	$sample_out->endElement();//sample course
	$sample_out->endElement();//sample department
	$out->writeRaw($sample_out->outputMemory(true));
	$sample_out->flush();
	unset($sample_out);


	$departments = _nscc_schedule_get_deptlist($yrq);
	foreach($departments as $department ){
		$out->startElement('department');
		$out->writeElement('department-title',rtrim($department->title)."\n");
//		$dept_details = _nscc_schedule_get_dept_details(rtrim($department->abbr));
//		if($dept_details->blurb){
//			$out->writeElement('department-blurb',rtrim($dept_details->blurb)."\n");
//	Suppress empty elem per designer's request.
//		} else {
//			$out->writeElement('department-blurb');
//		}
		$courses = _nscc_schedule_get_courses_of_dept($yrq,trim($department->abbr));
		if($courses){
			foreach($courses as $course){
				$items = _nscc_schedule_get_items_of_course_for_print($yrq,$course);
				$item_out = new XMLWriter();
				$item_out->openMemory(); 
				$item_out->setIndent(false);

				foreach($items as $item){
					$statements = array();
					$item_out->startElement('item');

					// Proper casing of data per designer's request.
					$item_days = trim($item->days);
					switch ($item_days) {
						case 'DAILY' :
							$item_days = 'Daily';
							break;
						case 'ARRANGED' :
						case 'ARR' :
							$item_days = 'Arr';
							break;
					}
					$item_loc = trim($item->loc);
					switch ($item_loc) {
						case 'OFF' :
							$item_loc = 'Off';
							break;
						case 'ARRANGED' :
						case 'ARR' :
							$item_loc = 'Arr';
							break;
					}
					$item_times = str_ireplace('ARR', 'Arr', nscc_schedule_format_times(trim($item->times)));
						
					//primary meets_line
					if($item->cs == 't'){
							$cluster_details = _nscc_schedule_get_cluster_details($yrq,$item->class_cluster);
							$item_out->writeElement('cs_meets_line',trim($item->item)."\tThis section is part of a Coordinated Studies course. See the Integrated Studies section.\n");
					}else{
						if($item->dl == 't' || $item->h_oc == 't'){
							if ($item->instructor_full_name) {
								$item_out->writeElement("distance_meets_line",
										trim($item->item) . "\t"
										. trim($item->course) . "."
										. trim($item->section) . "\t"
										. $item->credits . "\teLearning\t\t\t"
										. $item->instructor_full_name . "\n"
									);
							} else {
								$item_out->writeElement("distance_meets_line",
										trim($item->item) . "\t"
										. trim($item->course) . "."
										. trim($item->section) . "\t"
										. $item->credits . "\teLearning\t\t\t"
										. $item->instructor . "\n"
									);							
							}
						} else {
							if ($item->instructor_full_name) {
								$item_out->writeElement("primary_meets_line",
										trim($item->item) . "\t"
										. trim($item->course) . "."
										. trim($item->section) . "\t"
										. $item->credits . "\t"
										. $item_loc . "\t"
										. $item_days . "\t"
										. $item_times . "\t"
										. $item->instructor_full_name . "\n"
									);		
							} else {
								if (trim($item->instructor)=='STAFF') {
									$item_out->writeElement("primary_meets_line",
											trim($item->item) . "\t"
											. trim($item->course) . "."
											. trim($item->section) . "\t"
											. $item->credits . "\t"
											. $item_loc . "\t"
											. $item_days . "\t"
											. $item_times . "\tStaff\n"
										);
								} else {
									$item_out->writeElement("primary_meets_line",
											trim($item->item) . "\t"
											. trim($item->course) . "."
											. trim($item->section) . "\t"
											. $item->credits . "\t"
											. $item_loc . "\t"
											. $item_days . "\t"
											. $item_times . "\t"
											. $item->instructor . "\n"
										);
								}
							}							
						}
					
						$amis = _nscc_schedule_get_ami($yrq,$item->item);
						if ($amis) {
							foreach ($amis as $ami) {
							
								// Proper casing of data per designer's request.
								$ami_days = trim($ami->days);
								$ami_loc = trim($ami->loc);
								if ($ami_days == 'DAILY') { $ami_days = 'Daily'; }
								switch ($ami_loc) {
									case 'OFF' :
										$ami_loc = 'Off';
										break;
									case 'ARRANGED' :
									case 'ARR' :
										$ami_loc = 'Arr';
										break;
								}
								$ami_times = str_ireplace('ARR', 'Arr', nscc_schedule_format_times(trim($ami->times)));
								$item_out->writeElement('ami_meets_line',
										"Additionally, meets\t"
										. $ami_loc . "\t"
										. $ami_days . "\t"
										. $ami_times . "\n"
									);
							}
						}
					}
/*
					//add tags here
					//$item_out->startElement('tag_list');
					//builtin tags
					$tag_list = '';
					if($item->common_course == 't'){
						$tag_list .="CCN ";
					}
					if($item->cs=='t'){
						$tag_list .="CS ";
						//$item_out->writeElement('tag','CS ');
					}
					if($item->day_or_night=='t'){
						$tag_list .="N ";
						//$item_out->writeElement('tag','N ');
					}
					if($item->start_date != 0 || $item->end_date !=0){
						$tag_list .="Dates ";
						//$item_out->writeElement('tag','Dates ');
						$statements['dates'] = 'Special Dates: This class starts on '.date('M j, Y', _schedule_hpdate_to_date($item->start_date)).' and ends on '.date('M j, Y', _schedule_hpdate_to_date($item->end_date)).'.'."\n";
					}
					if($item->permission_required == 't'){
						$tag_list .="Perm ";
						//$item_out->writeElement('tag','Perm ');
					}
					if($item->url != NULL){
						$tag_list .="WWW ";
						//$item_out->writeElement('tag','WWW ');
						$statements['www'] = "Class Web Site: ".$item->url."\n";
					}					
					if($item->dl=='t'){
						$tag_list .="eL ";
						//$item_out->writeElement('tag','eL ');
						if(trim($item->oncampus_meetings)){
							$statements['elearning'] = trim($item->oncampus_meetings)."\n";
						}	
					}
					if($item->h=='t'){
						$tag_list .="eL/OC ";					
						//$item_out->writeElement('tag','eL/OC ');
					}
					if($item->lc=='t'){
						$tag_list .="LC ";
						//$item_out->writeElement('tag','LC ');
						$link_details = _nscc_schedule_get_link_details($yrq,$item->link_id);
						$statements['lc'] ="This class can also be taken as part of a Linked Course: \"".$link_details->title."\". Please see the Integrated Studies section.\n";
					}
					//generic tags
					if($item->tags){
						$tagslist = preg_replace('/\{|\}/','',$item->tags);
						$tags_array = explode(' ',$tagslist);
						foreach($tags_array as $tag_id){
							if($tag_details[$tag_id]->tag_abbr != 'CS' && $tag_details[$tag_id]->tag_abbr != 'LC' && $tag_details[$tag_id]->tag_abbr != 'W'){
								$tag_list .=$tag_details[$tag_id]->tag_abbr." ";
								//$item_out->writeElement('tag',$tag_details[$tag_id]->tag_abbr." ");
							}							
						}					
					}
					if($item->course_tags){
						$tagslist = preg_replace('/\{|\}/','',$item->course_tags);
						$tags_array = explode(' ',$tagslist);
						foreach($tags_array as $tag_id){
								$tag_list .=$course_tag_details[$tag_id]->tag_abbr." ";
								//$item_out->writeElement('tag',$course_tag_details[$tag_id]->tag_abbr." ");
						}					
					}
	
					//fees
					if(trim($item->fee1) && trim($item->fee1) !='**' ){
						$tag_list .= '$'.$item->fee1." ";
						///$item_out->writeElement('tag','$'.$item->fee1." ");
					}
					if(trim($item->fee2) && trim($item->fee2) !='**' ){
						$tag_list .= '$'.$item->fee2." ";
						//$item_out->writeElement('tag','$'.$item->fee2." ");
					}
					
					if(rtrim($tag_list,", ")){
						//$item_out->text("\n"); //added for indesign to prevent spurious line breaks.
						//$item_out->writeElement('tag_list',rtrim($tag_list,", ")."\n");
					}	
					//$item_out->endElement(); //end of tag_list
					if(trim($tag_list)){
						$item_out->writeElement('tag_list',$tag_list."\n");
					}
					
					//statements go here
					if($item->description){
						$item_out->writeElement('item_desc_statement',rtrim($item->description)."\n");
					}
					if($statements['dates']){
						$item_out->writeElement('date_statement',$statements['dates']);
					}
					if($statements['lc']){
						$item_out->writeElement('link_statement',$statements['lc']);
					}
					if($statements['www']){
						$item_out->writeElement('www_statement',$statements['www']);
					}
					if($statements['elearning']){
						$item_out->writeElement('elearning_statement',$statements['elearning']);
					}
*/
					$item_out->endElement();
				} //end item
			
				//assemble and append the course
				$out->startElement('course');
				$out->writeElement('course_no',rtrim($course) . "\t");	// tab inserted after course no. to improve consistency of spacing for designer's template merge.
				$out->writeElement('course_title',rtrim($item->title)."\n");	// tab moved to course no. to improve consistency of spacing for designer's template merge.
//				if($item->print_description){
//					$out->writeElement('course_description',rtrim($item->print_description)."\n");
//				}				
				$out->writeRaw($item_out->outputMemory(true));
				$item_out->flush();
				unset($item_out);
				$out->endElement();	//end course
			}
		} 
		$out->endElement();	//end department
	}
	
	$out->endElement();	//end schedule
	$out->endDocument();
}

function _nscc_schedule_blurb_converter($blurb){
	$output = str_replace('&nbsp;',' ',$blurb);
	$output = str_replace('<p>','',$output);
	$output = str_replace('</p>',"\n",$output);
	return strip_tags($output);	
}


//============================================================================
function nscc_schedule_export_item($yrq,$item_id){
  $yrq = strtoupper(urldecode($yrq));
	$item_id = urldecode($item_id);
	$tag_details = _nscc_schedule_get_tag_details();
	$course_tag_details = _nscc_schedule_get_course_tag_details();
	$fees = _nscc_schedule_get_fee_tag_details($yrq);
	
	$item = _nscc_schedule_get_item($yrq,$item_id);
	$item_out =new XMLWriter();
	$item_out->openURI('php://output');
	$item_out->setIndent(true);
	$item_out->startDocument('1.0','UTF-8');
	/*$out->text("<?whitespace-handling use-tags?>\n");*/
	$item_out->startElement('item');
	$item_out->writeElement('item_number',trim($item->item));
	$item_out->writeElement('course',$item->course);
	$item_out->writeElement('course_title',$item->title);
	$item_out->writeElement('course_description',$item->web_description);
							
	//primary meets_line
	if($item->cs == 't'){
			$cluster_details = _nscc_schedule_get_cluster_details($yrq,$item->class_cluster);
			$item_out->startElement('meets_line');
			$item_out->writeAttribute('meets_type','cs');
			$message = "<p>This section is <b>only</b> available as part of the <b>Coordinated Studies</b> course <a href=\"https://northseattle.edu/schedule/".$yrq."/alternative/IS#cs_course_".$cluster_details->class_cluster."\">".$cluster_details->cluster_section.". ".$cluster_details->title."</a>.</p>\n";
			$item_out->writeElement('message',$message);
			$item_out->endElement();//end of cs meets line
	}else{
		if($item->dl == 't'){
			$item_out->startElement('meets_line');
			$item_out->writeAttribute('meets_type','el');
			$item_out->writeElement('item_number',trim($item->item));
			$item_out->writeElement('course_section',trim($item->course).".".trim($item->section));
			$item_out->writeElement('credits',$item->credits);
			$item_out->writeElement('message',"eLearning");
			if($item->instructor_full_name){
				$item_out->writeElement('instructor',$item->instructor_full_name);
			} else {
				$item_out->writeElement('instructor',$item->instructor);
			}
			$instructor_list = _nscc_schedule_get_additional_instructors($yrq,$item_id);
			if($instructor_list){
				foreach($instructor_list as $additional_instructor){
					if( trim(strtolower($additional_instructor->instructor)) != trim(strtolower($item_details->instructor)) ){
						if($item->instructor_full_name){
							$item_out->writeElement('instructor',$additional_instructor->instructor_full_name);
						} else {
							$item_out->writeElement('instructor',$additional_instructor->instructor);
						}
					}
				}	
			}
			$item_out->endElement();
		} else {
			$item_out->startElement('meets_line');
			$item_out->writeAttribute('meets_type','primary');
			$item_out->writeElement('item_number',trim($item->item));
			$item_out->writeElement('course_section',trim($item->course).".".trim($item->section));
			$item_out->writeElement('credits',$item->credits);
			$item_out->writeElement('room',trim($item->loc));
			$item_out->writeElement('days',trim($item->days));
			$item_out->writeElement('times',nscc_schedule_format_times(trim($item->times)));
			if($item->instructor_full_name){
				$item_out->writeElement('instructor',$item->instructor_full_name);
			} else {
				$item_out->writeElement('instructor',$item->instructor);
			}
			$item_out->endElement();
			$instructor_list = _nscc_schedule_get_additional_instructors($yrq,$item);
			if($instructor_list){
				foreach($instructor_list as $additional_instructor){
					if( trim(strtolower($additional_instructor->instructor)) != trim(strtolower($item_details->instructor)) ){
						if($item->instructor_full_name){
							$item_out->writeElement('instructor',$additional_instructor->instructor_full_name);
						} else {
							$item_out->writeElement('instructor',$additional_instructor->instructor);
						}
					}
				}	
			}
		}
	
		$amis = _nscc_schedule_get_ami($yrq,$item->item);
		if($amis){
			foreach($amis as $ami){
				$item_out->startElement('meets_line');
				$item_out->writeAttribute('meets_type','also');
				$item_out->writeElement('message',"Additionally, meets");
				$item_out->writeElement('room',trim($ami->loc));
				$item_out->writeElement('days',trim($ami->days));
				$item_out->writeElement('times',nscc_schedule_format_times(trim($ami->times)));
				$item_out->endElement();
			}
		}
	}
	//add tags here
	$item_out->startElement('tag_list');
	//builtin tags
	$tag_list = '';
	if($item->cs=='t'){
		$tag_list .="CS, ";
		$item_out->writeElement('tag','CS');
	}
	if($item->day_or_night=='t'){
		$tag_list .="N, ";
		$item_out->writeElement('tag','N');
	}
	if($item->start_date != 0 || $item->end_date !=0){
		$tag_list .="Dates, ";
		$item_out->writeElement('tag','Dates');
		$statements['dates'] = 'Special Dates: This class starts on '.date('M j, Y', _schedule_hpdate_to_date($item->start_date)).'and ends on '.date('M j, Y', _schedule_hpdate_to_date($item->end_date)).'.'."\n";
	}
	if($item->permission_required == 't'){
		$tag_list .="Perm, ";
		$item_out->writeElement('tag','Perm');
	}
	if($item->url != NULL){
		$tag_list .="WWW, ";
		$item_out->writeElement('tag','WWW');
		$statements['www'] = "Class Web Site: ".$item->url."\n";
	}					
	if($item->dl=='t'){
		$tag_list .="eL, ";
		$item_out->writeElement('tag','eL');
		$statements['elearning'] = trim($item->oncampus_meetings)."\n";
	}
	if($item->h=='t'){
		$tag_list .="eL/OC, ";					
		$item_out->writeElement('tag','eL/OC');
		if(trim($item->oncampus_meetings)){
			$statements['elearning'] = trim($item->oncampus_meetings)."\n";
		}
	}
	if($item->lc=='t'){
		$tag_list .="LC, ";
		$item_out->writeElement('tag','LC');
		$link_details = _nscc_schedule_get_link_details($yrq,$item->link_id);
		$statements['lc'] ="This class can also be taken as part of a Linked Course: \"".$link_details->title."\". See the Integrated Studies section.\n";
	}
	//generic tags
	if($item->tags){
		$tagslist = preg_replace('/\{|\}/','',$item->tags);
		$tags_array = explode(',',$tagslist);
		foreach($tags_array as $tag_id){
			if($tag_details[$tag_id]->tag_abbr != 'CS' && $tag_details[$tag_id]->tag_abbr != 'LC' && $tag_details[$tag_id]->tag_abbr != 'W'){
				$tag_list .=$tag_details[$tag_id]->tag_abbr.", ";
				$item_out->writeElement('tag',$tag_details[$tag_id]->tag_abbr);
			}							
		}					
	}
	if($item->course_tags){
		$tagslist = preg_replace('/\{|\}/','',$item->course_tags);
		$tags_array = explode(',',$tagslist);
		foreach($tags_array as $tag_id){
				$tag_list .=$course_tag_details[$tag_id]->tag_abbr.", ";
				$item_out->writeElement('tag',$course_tag_details[$tag_id]->tag_abbr);
		}					
	}

	//fees
	if(trim($item->fee1) && trim($item->fee1) !='**' ){
		$tag_list .= '$'.$item->fee1.", ";
		$item_out->writeElement('tag','$'.$item->fee1);
	}
	if(trim($item->fee2) && trim($item->fee2) !='**' ){
		$tag_list .= '$'.$item->fee2.", ";
		$item_out->writeElement('tag','$'.$item->fee2);
	}
	
	if(rtrim($tag_list,", ")){
		//$item_out->text("\n"); //added for indesign to prevent spurious line breaks.
		//$item_out->writeElement('tag_list',rtrim($tag_list,", ")."\n");
	}	
	$item_out->endElement(); //end of tag_list

	//statements go here
	if($item->description){
		$item_out->writeElement('item_desc_statement',rtrim($item->description)."\n");
	}
	if($statements['dates']){
		$item_out->writeElement('date_statement',$statements['dates']);
	}
	if($statements['lc']){
		$item_out->writeElement('link_statement',$statements['lc']);
	}
	if($statements['www']){
		$item_out->writeElement('www_statement',$statements['www']);
	}
	if($statements['elearning']){
		$item_out->writeElement('elearning_statement',$statements['elearning']);
	}

	$item_out->endElement(); //end_item
	$item_out->endDocument();
}

//proxy the single item service
//========================================================
function nscc_schedule_service_itemstatus($yrq,$item_id){
	$url = "https://apps.seattlecolleges.edu/dataservice/classservices.asmx/GetJSONItemStatus";
	//$url = "https://apps.seattlecolleges.edu/webservice/sms/classdata.asmx/GetClassStatusJson";
	$post_fields = array('ColCode'=>"063",'yrq'=>$yrq,'item'=>$item_id);
	$http_response = http_post_fields($url,$post_fields);
	if($http_response){
		$response = http_parse_message($http_response);
		//if ($item_id=='3800'||$item_id=='3804'){watchdog('sched_3800','<pre>'.print_r($response,true).'</pre>');}
		preg_match('/<string.+>(.+)<\/string>$/',$response->body,$matches);
		print $matches[1];
		//watchdog('sched_test','old matches <pre>'.$matches[1].'</pre>');
	} else {
		print "";
	}
}

function nscc_schedule_instructor_image_url($instructor){
	$clean_instructor = trim(strtolower(urldecode($instructor)));
	$image_path = _nscc_schedule_get_instructor_image($clean_instructor);
	$image_html = '<img alt="Instructor Picture" src="/'.$image_path.'">';
	print $image_html;
}


function nscc_schedule_search_results($yrq=NULL,$query_id=NULL){
	if(!$yrq){
		$yrq = _schedule_get_current_yrq();
	}
	if(!$query_id){
		drupal_goto("schedule/$yrq");
		return;
	}
	$target_sql = preg_replace("/\'\'/","'",db_result(db_query("select query_string from {nscc_schedule_saved_queries} where query_id=%d;",$query_id)));
	if(! $target_sql){
		drupal_set_message("Oops! your search has expired. Re-enter your criteria and try again.");
		drupal_goto("schedule/$yrq");
	}
	
	//add yrq back in
	$target_sql = preg_replace("/wd.eff_yrq<='.{4}'/","wd.eff_yrq<='".$yrq."'",$target_sql);
	$target_sql = preg_replace("/WHERE/","WHERE (cd.yrq='".$yrq."') AND " ,$target_sql);
	$target_sql = preg_replace("/AND\s+AND/","AND" ,$target_sql);
	
	
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	$items_array = array();
	$result = db_query($target_sql);
	while($item = db_fetch_object($result)){
		$items_array[] = $item;
	}
	db_set_active('default');
	
	if(count($items_array) < 1 ){
		drupal_set_message("No classes matching your criteria were found.");
		drupal_goto("schedule/$yrq");
		return;
	}
	

	$tag_details = _nscc_schedule_get_tag_details();
	$course_tag_details = _nscc_schedule_get_course_tag_details();
	$fees = _nscc_schedule_get_fee_tag_details($yrq);
	foreach($items_array as $item){
		if(trim($item->days) == 'ARRANGED'){
			$time_count++;
		}
		$output .= _nscc_schedule_item_out($item,$tag_details,$course_tag_details,$fees,'search');
	}
	$output .="</ul></div>\n";


	if(preg_match('/bw.item/',$target_sql) && $time_count > 0){
			$time_count_statement = "  <b>$time_count</b> matched because they have no specific time (generally eLearning or &quot;to be arranged&quot; classes).<span class=\"arranged-hide-button\" style=\"display:none;\">Hide Them</span>";		
	}
	$count_statement ="<div class=\"schedule-count-statement\"><p>There are <b>".count($items_array)."</b> classes matching your search.$time_count_statement</p></div>\n";
	$output = "<div class=\"schedule-data\">\n<h2>Search Results</h2>\n".$count_statement."<ul class=\"items-found\">\n".$output;

	drupal_add_js(drupal_get_path('module', 'nscc_schedule') .'/nscc_schedule.js');
	return $output;
}


//============================================================================
function nscc_schedule_display_item($yrq,$item_id){
  $yrq = strtoupper(urldecode($yrq));
	$item_id = urldecode($item_id);
	
	$item_details = _nscc_schedule_get_item($yrq,$item_id);
	//watchdog('sched-item', 'YRQ= '.$yrq.' item= '.$item_id.'<pre>'.print_r($item_details,true).'</pre>');
	$output .= "<div class=\"schedule-data\"><h2>".htmlentities($item_details->course, ENT_QUOTES, 'UTF-8', false).".".$item_details->section."</h2><ul>\n";
	$output .= _nscc_schedule_item_out($item_details,_nscc_schedule_get_tag_details(),_nscc_schedule_get_course_tag_details(),_nscc_schedule_get_fee_tag_details($yrq),'alone');
	$output .= "</ul></div>\n";
	drupal_add_js(drupal_get_path('module', 'nscc_schedule') .'/nscc_schedule.js');
	return $output;
}


//============================================================================
function nscc_schedule_display_course($yrq,$course_id){
  $yrq = strtoupper(urldecode($yrq));
	$course_id = _nscc_schedule_ds_decode(strtoupper(urldecode($course_id)));
	$tag_details = _nscc_schedule_get_tag_details();
	$course_tag_details = _nscc_schedule_get_course_tag_details();
	$fees = _nscc_schedule_get_fee_tag_details($yrq);
	$output .= "<div class=\"schedule-data\"><h2>".htmlentities(check_plain($course_id), ENT_QUOTES, 'UTF-8', false)."</h2><ul>\n";
	$output .= _nscc_schedule_course_out($yrq,$course_id,$tag_details,$course_tag_details,$fees);
	$output .= "</ul></div>\n";
	drupal_add_js(drupal_get_path('module', 'nscc_schedule') .'/nscc_schedule.js');
 	return "$output";
}

//============================================================================
function nscc_schedule_catalog_display_course($course_id, $format = 'html') {
	$course_id = _nscc_schedule_ds_decode(strtoupper(urldecode($course_id)));
	$course_catalog_details = _nscc_schedule_get_catalog_course($course_id);

	if ($course_catalog_details) {
		switch ($format) {
			case 'json' : drupal_json($course_catalog_details);
				break;
			default :	
				
				return '<pre>'.print_r($course_catalog_details,true).'</pre>';	//TODO: themed output for page-display.
		}

	} else {
		//$output = '<div class="schedule-data">No such course was found in our catalog.</div>';
		$err = new stdClass();
		$err->error_msg = "$course_id was not found in our catalogue.";
		switch ($format) {
			case 'json' : drupal_json($err);
				break;
			default: return "<div class=\"messages error-message\"><p>$err->msg</p>\n</div>";
		}
	}	
}

//============================================================================
function nscc_schedule_catalog_display_courses($format = 'html') {
	//$course_id = _nscc_schedule_ds_decode(strtoupper(urldecode($course_id)));
	//get course_array from $_REQUEST
	$course_array = json_decode($_REQUEST['courses']);
	//watchdog('cat_courses','post: <pre>'.print_r($_POST,true).'</pre>');
	//watchdog('cat_courses','course_array: <pre>'.print_r($course_array,true).'</pre>');
	if($course_array){
		$course_catalog_details = _nscc_schedule_get_catalog_courses($course_array);
	}
	if ($course_catalog_details) {
		switch ($format) {
			case 'json' : drupal_json($course_catalog_details);
				break;
			default :	
				
				return '<pre>'.print_r($course_catalog_details,true).'</pre>';	//TODO: themed output for page-display.
		}

	} else {
		//$output = '<div class="schedule-data">No such course was found in our catalog.</div>';
		$err = new stdClass();
		$err->error_msg = "Problem cataloging courses.";
		switch ($format) {
			case 'json' : drupal_json($err);
				break;
			default: return "<div class=\"messages error-message\"><p>$err->msg</p>\n</div>";
		}
	}	
}


//============================================================================
function nscc_schedule_display_courselist($yrq){

	if(!$yrq){
		$yrq = _schedule_get_current_yrq();
	}
	
  $alphabet = array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
  $initials_array = _nscc_schedule_get_course_initials(strtoupper($yrq));
  $jumpletters = "<ul class=\"schedule-jump-letters\">";
  foreach($alphabet as $initial){
    $jumpletters .= '<li>';
    if(in_array($initial,$initials_array)){
      $jumpletters .= "<a href=\"#$initial\">$initial</a>";
    } else {
      $jumpletters .=" $initial ";
    }
    $jumpletters .= '</li>';
  }
  $jumpletters .= "</ul>\n";
	
	
	$courses = _nscc_schedule_get_courselist(strtoupper($yrq));
	foreach($courses as $course ){
    $current_letter = substr($course->course,0,1);
    if($current_letter != $last_letter){
      $courselist .= "<li class=\"schedule-jump-letter-target\"><h3 id=\"$current_letter\">$current_letter</h3></li>\n";
      $last_letter = $current_letter;
    }
		$courselist .="<li class=\"schedule-course-list-item\"><span class=\"schedule-course-id\"><a href=\"/schedule/$yrq/course/".urlencode(_nscc_schedule_ds_encode(strtoupper($course->course)))."\">".htmlentities(check_plain($course->course), ENT_QUOTES, 'UTF-8', false)."</a></span> <span class=\"schedule-course-title\">".htmlentities(check_plain($course->title), ENT_QUOTES, 'UTF-8', false)."</span></li>\n";
	}
	
	return "<div class=\"schedule-data\"><h2>All Courses</h2><div class=\"schedule-index\">$jumpletters</div><ul class=\"schedule-alpha-list courselist\">\n$courselist</ul></div>\n";	
}

//============================================================================
function nscc_schedule_display_dept($yrq,$dept_id){

	if(!$yrq){
		$yrq = _schedule_get_current_yrq();
	}
	
	$dept_id = rtrim($dept_id);
	
	$dept_details = _nscc_schedule_get_dept_details($dept_id);
	$tag_details = _nscc_schedule_get_tag_details();
	$course_tag_details = _nscc_schedule_get_course_tag_details();
	$fees = _nscc_schedule_get_fee_tag_details($yrq);

	$courses = _nscc_schedule_get_courses_of_dept($yrq,$dept_id);
	if($courses){
		foreach($courses as $course){
			$courselist .= _nscc_schedule_course_out($yrq,$course,$tag_details,$course_tag_details,$fees);
		}
	} else {
		$error_msg = "<p>There are no classes currently scheduled this quarter in the ".check_plain($dept_details->title)." department.</p>\n";
	}
	drupal_add_js(drupal_get_path('module', 'nscc_schedule') .'/nscc_schedule.js');
	return "<div class=\"schedule-data\"><h2>Classes of the ".check_plain($dept_details->title)." Department</h2>\n$error_msg<ul class=\"schedule-department courselist\">\n$courselist</ul></div>\n";
}

//============================================================================
function nscc_schedule_display_alt($yrq,$alt_id){
	if(!$yrq){
		$yrq = _schedule_get_current_yrq();
	}
	switch($alt_id){
		case 'IS':
			$output .= "<h2>Integrated Studies</h2>\n";
			$cs_courses = _nscc_schedule_get_clusterlist($yrq);
			$linked_courses = _nscc_schedule_get_linklist($yrq);
			$tag_details = _nscc_schedule_get_tag_details();
			$course_tag_details = _nscc_schedule_get_course_tag_details();
			$fees = _nscc_schedule_get_fee_tag_details($yrq);
		  $output .= "<div><p>Individual courses combined (<a href=\"/schedule/$yrq/alternative/IS#cs-courses\" title=\"Coordinated Studies Classes\">Coordinated Studies</a>) or linked (<a href=\"/schedule/$yrq/alternative/IS#lc-courses\" title=\"Linked Classes\">Linked Classes</a>) into one integrated learning experience organized around a central theme or question rather than a particular academic discipline. Additional information about the program is available from the <a href=\"https://northseattle.edu/programs/integrated-studies\">Integrated Studies website</a>.</p></div>\n";
  		$output .="<div>These classes associated with these courses are tagged as <span class=\"schedule-tag\" title=\"Coordinated Studies\">CS</span> or <span class=\"schedule-tag\" title=\"Linked Course\">LC</span> in this schedule.</div>\n";

			
			if($cs_courses){
				$output .="<div class=\"schedule-cs-listing\" id=\"cs-courses\">\n\t<h3>Coordinated Studies (Coordinated Courses)</h3>\n";
				$output .="<div class=\"\">Regardless of which specific courses they register for, all students learn together in the scheduled class periods. Students fulfill the AA degree requirements met by the classes in which they register.</div>\n";
				$output .="<ul>\n";
				foreach($cs_courses as $course){
					
					$course_details = _nscc_schedule_get_cluster_details($yrq,$course);
					$output .= "<li class=\"schedule-cs-course\" id=\"cs_course_".$course_details->class_cluster."\">\n";
					$output .= "<h4 class=\"schedule-cs-course-title\">".$course_details->cluster_section.". ".check_plain($course_details->title)."</h4>\n";
					$output .= "<div class=\"schedule-cs-course-desc\">".$course_details->description."</div>\n";
					$output .= "<div class=\"schedule-cs-course-reqs\"><h5>Enrollment Requirements</h5>".$course_details->registration_reqs."\n";
					$output .= "<div class=\"schedule-cs-course-items\">\n<ul class=\"expandable\">\n";
					$items = _nscc_schedule_get_cluster_items($yrq,$course);
					if($items){
						foreach($items as $item){
							$output .= _nscc_schedule_item_out($item,$tag_details,$course_tag_details,$fees,'cs');
						}
					}
					$output .= "</ul>\n</div></div>";
					$output .= "</li>\n";
				}
				$output .="</ul>\n</div>\n";
			}
			if($linked_courses){
				$output .="<div class=\"schedule-link-listing\" id=\"lc-courses\">\n\t<h3>Linked Classes</h3>\n";
				$output .="<div class=\"\">In these linked classes, students take two separate classes designed to connect their learning in each discipline around a central question or theme.</div>\n";
				$output .="<ul>\n";
				foreach($linked_courses as $course){
					$course_details = _nscc_schedule_get_link_details($yrq,$course);
					$output .= "<li class=\"schedule-lc-course\" id=\"lc_course_".rtrim($course_details->link_id)."\">\n";
					$output .= "<h4 class=\"schedule-lc-course-title\">".check_plain($course_details->title)."</h4>\n";
					$output .= "<div class=\"schedule-lc-course-desc\">".$course_details->description."</div>\n";
					$output .= "<div class=\"schedule-lc-course-reqs\"><h5>Enrollment Requirements</h5>".$course_details->registration_reqs."\n";
					$output .= "<div class=\"schedule-lc-course-items\">\n<ul class=\"expandable\">\n";
					$items = _nscc_schedule_get_link_items($yrq,$course);
					if($items){
						foreach($items as $item){
							$output .= _nscc_schedule_item_out($item,$tag_details,$course_tag_details,$fees,'lc');
						}
					}
					$output .= "</ul>\n</div></div>";
					$output .= "</li>\n";
					
				}
				$output .="</ul>\n</div>\n";
			}
			break;
	}

	drupal_add_js(drupal_get_path('module', 'nscc_schedule') .'/nscc_schedule.js');
	return "<div class=\"schedule-data\">$output</div>\n";
}

//============================================================================
function nscc_schedule_display_deptlist($yrq){

	if(!$yrq){
		$yrq = _schedule_get_current_yrq();
	}
	
  $alphabet = array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
  $initials_array = _nscc_schedule_get_dept_initials(strtoupper($yrq));
  $jumpletters = "<ul class=\"schedule-jump-letters\">";
  foreach($alphabet as $initial){
    $jumpletters .= '<li>';
    if(in_array($initial,$initials_array)){
      $jumpletters .= "<a href=\"#$initial\">$initial</a>";
    } else {
      $jumpletters .=" $initial ";
    }
    $jumpletters .= '</li>';
  }
  $jumpletters .= "</ul>\n";
	
	
	$departments = _nscc_schedule_get_deptlist(strtoupper($yrq));
	foreach($departments as $department ){
    $current_letter = substr($department->title,0,1);
    if($current_letter != $last_letter){
      $deptlist .= "<li class=\"schedule-jump-letter-target\"><h3 id=\"$current_letter\">$current_letter</h3></li>\n";
      $last_letter = $current_letter;
    }
		$deptlist .="<li class=\"schedule-department-list-item\"><span class=\"schedule-department-title\"><a href=\"/schedule/$yrq/dept/".urlencode(_nscc_schedule_ds_encode(strtoupper(rtrim($department->abbr))))."\">".htmlentities(check_plain($department->title), ENT_QUOTES, 'UTF-8', false)."</a></span> <span class=\"schedule-dept-abbr\">(".check_plain($department->abbr).")</span></li>\n";
	}
	
	return "<div class=\"schedule-data\"><h2>All Departments</h2><div class=\"schedule-index\">$jumpletters</div><ul class=\"schedule-alpha-list deptlist\">\n$deptlist</ul></div>\n";	
}

//============================================================================
function nscc_schedule_display_instructorlist($yrq){

	if(!$yrq){
		$yrq = _schedule_get_current_yrq();
	}
	
  $alphabet = array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
  $initials_array = _nscc_schedule_get_instructor_initials(strtoupper($yrq));
  $jumpletters = "<ul class=\"schedule-jump-letters\">";
  foreach($alphabet as $initial){
    $jumpletters .= '<li>';
    if(in_array($initial,$initials_array)){
      $jumpletters .= "<a href=\"#$initial\">$initial</a>";
    } else {
      $jumpletters .=" $initial ";
    }
    $jumpletters .= '</li>';
  }
  $jumpletters .= "</ul>\n";
	
	
	$instructors = _nscc_schedule_get_instructorlist(strtoupper($yrq));
	foreach($instructors as $instructor ){
    $current_letter = substr($instructor->sort_column,0,1);
    if($current_letter != $last_letter){
      $instructorlist .= "<li class=\"schedule-jump-letter-target\"><h3 id=\"$current_letter\">$current_letter</h3></li>\n";
      $last_letter = $current_letter;
    }
    $instructor->instructor = rtrim($instructor->instructor);
    if(!preg_match('/CANCEL\s+\d/',$instructor->instructor)){
			if(!$instructor->fullname){
				$instructor->fullname = $instructor->instructor;
				$instructorlist .="<li class=\"schedule-instructor-list-item\"><a href=\"/schedule/$yrq/instructor/".urlencode($instructor->instructor)."\">".$instructor->fullname."</a></li>\n";
			} else {
				$instructorlist .="<li class=\"schedule-instructor-list-item\"><a href=\"https://people.northseattle.edu/users/".strtolower($instructor->instructor)."\">".$instructor->fullname."</a></li>\n";
			}
		}
	}	
	return "<div class=\"schedule-data\"><h2>All Instructors</h2><div class=\"schedule-index\">$jumpletters</div><ul class=\"schedule-alpha-list instructorlist\">\n$instructorlist</ul></div>\n";	
}

//============================================================================
function nscc_schedule_display_instructor($yrq,$instructor_id){
	drupal_add_js(drupal_get_path('module', 'nscc_schedule') .'/nscc_schedule.js');
	if(!$yrq){
		$yrq = _schedule_get_current_yrq();
	}
	$items = _nscc_schedule_get_instructor_classes(strtoupper($yrq),strtoupper(urldecode($instructor_id)));
	$tag_details  = _nscc_schedule_get_tag_details();
	$course_tag_details = _nscc_schedule_get_course_tag_details();
	$fees = _nscc_schedule_get_fee_tag_details($yrq);

	foreach($items as $item){
		$itemlist .= _nscc_schedule_item_out($item,$tag_details,$course_tag_details,$fees,'alone');
	}
	$itemlist = "<ul class=\"schedule-itemlist expandable\">\n$itemlist\n</ul>\n";
	

	return "<div class=\"schedule-data\"><h2>Classes taught by ".$instructor_id."</h2>$itemlist</div>\n";	
}

//============================================================================
function nscc_schedule_display_altindex($yrq){
		
	$output =  "<ul class=\"schedule-alt-modes\">\n";

	$output .= "<li><h3>Continuing Education Classes</h3><div><p>Non-credit personal-enrichment classes including basic computer skills, fitness &amp; health, finance, and other topics. Registration and additional detailed information is available from the <a href=\"http://www.learnatnorth.org/\">Continuing Education website</a>.</p></div>\n";
	$output .= "<div>These classes are not listed in this schedule.</div></li>\n";	

  $output .= "<li><h3>Distance / eLearning classes</h3><div><p>Credit courses taught primarily or completely online. Some may also include an on-campus component, weekly television broadcasts, <abbr title=\"Interactive Television\">ITV</abbr>, videocassettes, <abbr title=\"Compact Discs\">CDs</abbr>, <abbr title=\"Digital Versatile Disks\">DVDs</abbr>, and other video media. System requirements, courseware login instructions, and additional detailed information is available from the <a href=\"http://www.virtualcollege.org/\">Distance Learning website</a>.</p>\n";
  $output .= "<p>If you are a non-resident student enrolled in elearning classes, you may be eligible for discounted tuition. See the <a href=\"https://northseattle.edu/policies/non-resident-elearning-tuition-rate\">non-resident elearning tuition rate policy</a>.</p></div>\n";
  $output .= "<div>These classes are tagged as <span class=\"button\" title=\"Distance Learning\">DL</span> or <span class=\"button\" title=\"Distance Learning/On Campus\">DL/OC</span> in this schedule.</div></li>\n";

  $output .= "<li><h3>Integrated Studies</h3><div><p>Individual courses combined (<a href=\"/schedule/$yrq/alternative/IS#cs-courses\" title=\"Coordinated Studies Classes\">Coordinated Studies</a>) or linked (<a href=\"/schedule/$yrq/alternative/IS#lc-courses\" title=\"Linked Classes\">Linked Classes</a>) into one integrated learning experience organized around a central theme or question rather than a particular academic discipline. Additional information about the program is available from the <a href=\"https://northseattle.edu/programs/integrated-studies\">Integrated Studies website</a>.</p></div>\n";
  $output .="<div>These classes are tagged as <span class=\"button\" title=\"Coordinated Studies\">CS</span> or <span class=\"button\" title=\"Linked Course\">LC</span> in this schedule.</div></li>\n";

	$output .= "</ul>\n";
	return "<div class=\"schedule-data\"><h2>Alternative Learning Techniques</h2>\n $output </div>\n";	
}


//============================================================================
function _nscc_schedule_course_out($yrq,$course_id,$tag_details,$course_tag_details,$fees){
	$items = _nscc_schedule_get_items_of_course($yrq,$course_id);
	foreach($items as $item){
		$itemlist .= _nscc_schedule_item_out($item,$tag_details,$course_tag_details,$fees,'incourse');
	}
	$itemlist = "<ul class=\"schedule-itemlist expandable\">\n$itemlist\n</ul>\n";

	$url_course = urlencode(_nscc_schedule_ds_encode($item->course));
//	$url_course = urlencode(_nscc_schedule_ds_encode($item->course), ENT_QUOTES, 'UTF-8', false);
//	$clean_course = preg_replace('/&/','&amp;',$item->course);
	$clean_course = htmlentities($item->course, ENT_QUOTES, 'UTF-8', false);
		//$description = _nscc_schedule_get_class_description($yrq,$item->item);
	$html_course_title = htmlentities(check_plain($item->title), ENT_QUOTES, 'UTF-8', false);
	//$html_course_desc = htmlspecialchars($item->web_description);
	$html_course_desc = check_markup($item->web_description,1);
	
	$output  = "<li class=\"schedule-course\" id=\"course_".$yrq."_".$course_id."\"><div>\n<span class=\"schedule-course-id\">$clean_course</span> \n";
	$output .= "<span class=\"schedule-course-title\">$html_course_title</span>\n</div>\n";
	$output .= "<div class=\"schedule-course-desc\">$html_course_desc</div>\n";
	$output .= $itemlist;
	$output .="</li>\n";
	return $output;
}

//============================================================================
function _nscc_schedule_item_out($item_details,$tags,$course_tags,$fees,$format='alone'){
  $yrq = $item_details->yrq;
  $item = $item_details->item;
	$tag_classes='';
	$human_yrq = trim(_schedule_yrq_to_quarter($yrq));	// e.g. 'Winter 2011'

	//details
	$url_course = urlencode(_nscc_schedule_ds_encode($item_details->course));
//	$clean_course = preg_replace('/&/','&amp;',$item_details->course);
	$clean_course = htmlentities($item_details->course, ENT_QUOTES, 'UTF-8', false);
	$course_string = '<td class="sched_course" colspan="2"><span title="Course"><a href="/schedule/'.$yrq.'/course/'.$url_course.'">'.$clean_course.".".$item_details->section."</a></span></td>";
	//$section_credit_string = '<td class="sched_section"><span title="Section">'."</span></td>\n".'<td class="sched_credits"><span title="Credits">'.$item_details->credits."</span></td>";
	$section_credit_string = '<td class="sched_credits"><span title="Credits">'.$item_details->credits."</span></td>";
	$days_string = $item_details->days;
	if(trim($days_string) == 'ARRANGED'){
		$tag_classes .= ' tag_arranged ';
	}
	$times_string = nscc_schedule_format_times(trim($item_details->times));	
	if( $item_details->instructor_message && ! preg_match('/^\s$/',html_entity_decode($item_details->instructor_message)) ){
		$instructor_message = '<h5 class="description_subtitle">A Message From the Instructor:</h5>'.$item_details->instructor_message;
	}	else {
		$instructor_message='';
	}

	//room locator
	if ($item_details->loc != 'ARR' && $item_details->loc != 'OFF' && $item_details->loc != 'OC'){
		$location_string = "<td class=\"sched_loc\"><span title=\"Location\"><a href=\"http://northseattle.edu/locator/locate/".$item_details->loc."\">".$item_details->loc."</a></span></td>";
	} else {
		if($item_details->dl == 't'){
 				if ($item_details->dl_em=='t') {
						$location_string = "<td class=\"sched_loc\"><span title=\"eMeet\">Scheduled Online Meetings</span></td>";
						//$days_string = "-";
						//$times_string = "-";
						$alternate_location_string = "<td class=\"sched_loc\" colspan=\"3\"><span title=\"eMeet\">Scheduled Online Meetings, Expand for Details</span></td>";			
			} else {
				$location_string = "<td class=\"sched_loc\"><span title=\"Distance Learning\">eLearning</span></td>";
				$days_string = "-";
				$times_string = "-";
				$alternate_location_string = "<td class=\"sched_loc\"><span title=\"Distance Learning\">eLearning</span></td>\n\t\t<td class=\"sched_days\"><span title=\"Meeting Days\">$days_string</span></td>\n\t\t<td class=\"sched_times\"><span title=\"Meeting Time\">$times_string</span></td>";			
      }
		} else if ($item_details->h_oc=='t') {
			$location_string = "<td class=\"sched_loc\"><span title=\"On Campus\">Several On-Campus Meetings</span></td>";
			$days_string = "-";
			$times_string = "-";
			$alternate_location_string = "<td class=\"sched_loc\" colspan=\"3\"><span title=\"Hybrid Class\">Several On-Campus Meetings, Expand for Details</span></td>";			
		} else {
			$location_string = "<td class=\"sched_loc\"><span title=\"Location\">{$item_details->loc}</span></td>";
		}
	}

	//ami string
	$ami_detail_array = _nscc_schedule_get_ami($yrq,$item);
	$ami_output='';
	if($ami_detail_array){
		$ami_rows = array();
		if($format!='cs'){
			$message_colspan='3';
			if ($item_details->cs == 't' && $format=='search'){
				$message_colspan='4';
			}
		}else {
			$message_colspan='4';
		}
		foreach($ami_detail_array as $record){
			$ami_output .="\n\t<tr>\n\t\t<td class=\"sched_ami_message\" colspan=\"$message_colspan\">Additionally, meets</td>";
			$ami_output .="\n\t\t<td class=\"sched_loc\"><span title=\"Also Meets in Location\"><a href=\"http://northseattle.edu/locator/locate/".$record->loc."\">".$record->loc."</a></span></td>";
			$ami_output .="\n\t\t<td class=\"sched_days\"><span title=\"Also Meets on Days\">".$record->days."</span></td>";
			$ami_output .="\n\t\t<td class=\"sched_times\"><span title=\"Also Meets at Time\">".nscc_schedule_format_times(trim($record->times))."</span></td>";
			$ami_output .="\n\t\t<td class=\"sched_instructor\"></td>";
			$ami_output .="\n\t</tr>\n";
		}
	}

	//instructor link(s)
	if (rtrim($item_details->instructor) == 'STAFF'){
		$tag_classes .= ' tag_staff ';
		$instructor_link = $item_details->instructor;
	} else {	
		if($item_details->instructor_full_name){
			$instructor_image = _nscc_schedule_get_instructor_image(trim(strtolower($item_details->instructor)));
			if($instructor_image){
				$instructor_link = "<a class=\"instructor-has-image\" href=\"https://people.northseattle.edu/users/".trim(strtolower($item_details->instructor))."\">".$item_details->instructor_full_name."</a>";
			}else{
				$instructor_link = "<a href=\"https://people.northseattle.edu/users/".trim(strtolower($item_details->instructor))."\">".$item_details->instructor_full_name."</a>";
			}
		}else{
			$instructor_link = "<a href=\"/schedule/".$item_details->yrq."/instructor/".$item_details->instructor."\">".$item_details->instructor."</a>";
		}
	}
	$instructor_list = _nscc_schedule_get_additional_instructors($yrq,$item);
	if($instructor_list){
		foreach($instructor_list as $additional_instructor){
			if( trim(strtolower($additional_instructor->instructor)) != trim(strtolower($item_details->instructor)) ){
				if($additional_instructor->instructor_full_name){
					$instructor_image = _nscc_schedule_get_instructor_image(trim(strtolower($additional_instructor->instructor)));
					if($instructor_image){
						$instructor_link .=  ' &amp; '."<a class=\"instructor-has-image\" href=\"https://people.northseattle.edu/users/".trim(strtolower($additional_instructor->instructor))."\">".$additional_instructor->instructor_full_name."</a>";
					}else{
						$instructor_link .=  ' &amp; '."<a href=\"https://people.northseattle.edu/users/".trim(strtolower($additional_instructor->instructor))."\">".$additional_instructor->instructor_full_name."</a>";
					}
				}else{
					$instructor_link .=  ' &amp; '."<a href=\"/schedule/".$item_details->yrq."/instructor/".$additional_instructor->instructor."\">".$additional_instructor->instructor."</a>";
				}
			}	
		}
	}


	//tags output
	//specific tags
	//Description
	//$description = _nscc_schedule_get_class_description($yrq,$item);
	$html_course_title = htmlspecialchars($item_details->title);
	$html_course_desc = empty($item_details->web_description) ? '' : check_markup($item_details->web_description,1,FALSE);
	$html_item_desc = empty($item_details->description) ? '' : check_markup($item_details->description,1);
	
	//Integrated studies tag
	if($item_details->is =='t'){
		$tag_classes .= ' tag_is ';
		$tags_collapsed .= "<li><span class=\"button\" title=\"Integrated Studies\">IS</span></li>";
		$tags_output .="<li class=\"schedule-tag\"><span class=\"button\" title=\"Integrated Studies\" >IS</span>";
		$tags_output .="<div class=\"body\"><h4>Integrated Studies</h4>";
		$tags_output .="<p>This class satisfies the Integrated Studies requirement for AA/AS degrees. <a href=\"/programs/integrated-studies\">Learn more about Integrated Studies.</a></p></div></li>\n";
	}
	//coordinated studies tag
	if($item_details->cs == 't'){
		$tag_classes .= ' tag_cs ';
		$cluster_details = _nscc_schedule_get_cluster_details($yrq,$item_details->class_cluster);
		if($format !='cs'){
			$tags_collapsed .= "<li><span class=\"button\" title=\"Coordinated Studies\">CS</span></li>";
			$tags_output .="<li class=\"schedule-tag\"><span class=\"button\" title=\"Coordinated Studies\" >CS</span>";
			$tags_output .="<div class=\"body\"><h4>Coordinated Studies</h4>";
			$tags_output .="<p>This section is <b>only</b> available as part of the <b>Coordinated Studies</b> course <a href=\"/schedule/".$yrq."/alternative/IS#cs_course_".$cluster_details->class_cluster."\">".$cluster_details->cluster_section.". ".$cluster_details->title."</a>.</p></div></li>\n";
			//$ami_output="";
		} else {
			$tags_collapsed .= "<li><span class=\"button\" title=\"Coordinated Studies\">CS</span></li>";
			$tags_output .="<li class=\"schedule-tag\"><span class=\"button\" title=\"Coordinated Studies\" >CS</span>";
			$tags_output .="<div class=\"body\"><h4>Coordinated Studies</h4>";
			$tags_output .="<p>This section is <b>only</b> available as part of this <b>Coordinated Studies</b> course.</p></div></li>\n";
		}
		$html_cs_item_title = $html_course_title;
		$html_course_title = "<a href=\"/schedule/".$yrq."/alternative/IS#cs_course_".$cluster_details->class_cluster."\">".htmlspecialchars($cluster_details->cluster_section . " . " .$cluster_details->title)."</a>";
		$course_string = '<td class="sched_course"><span title="Course">'.$clean_course.'</span></td>';
		$section_credit_string = "<td class=\"sched_section\">&nbsp;</td>\n<td class=\"sched_section\">&nbsp;</td>\n";
		if($format=='cs'){
			$section_credit_string = '<td class="sched_credits"><span title="Credits">'.$item_details->credits."</span></td>";
    }
		$html_course_desc = $cluster_details->description;
		
	}
	
	//Night class
	if ($item_details->day_or_night =='N'){
		$tag_classes .= ' tag_n ';
		$tags_collapsed .= "<li><span class=\"button\" title=\"Night Class\">N</span></li>";
		$tags_output .="<li class=\"schedule-tag\"><span class=\"button\" title=\"Night Class\" >N</span>";
		$tags_output .="<div class=\"body\"><h4>Night Class</h4>";
		$tags_output .="<p>This is a Evening/Night Class</p></div></li>\n";
	}

	//dates tag
	if ($item_details->start_date != 0 || $item_details->end_date != 0){
		$tag_classes .= ' tag_dates ';
		$dt_starts = date('M j, Y', _schedule_hpdate_to_date($item_details->start_date));
		$dt_ends = date('M j, Y', _schedule_hpdate_to_date($item_details->end_date));
		$tags_collapsed .= "<li><span class=\"button\" title=\"Special Dates\">Dates</span></li>";
		$tags_output .="<li class=\"schedule-tag\"><span class=\"button\" title=\"Special Dates\">Dates</span>";
		$tags_output .="<div class=\"body\"><h4>Special Dates</h4>";
		$tags_output .="<p>Class starts: $dt_starts</p><p>Class ends: $dt_ends</p></div></li>\n";
	}
	//cancelled tag
	if($item_details->cancelled == 't'){
		$tag_classes .= ' tag_x ';
		$tags_collapsed .= "<li><span class=\"button\" title=\"Cancelled\">X</span></li>";
		$tags_output .="<li class=\"schedule-tag\"><span class=\"button\" title=\"Cancelled\" >X</span>";
		$tags_output .="<div class=\"body\"><h4>Cancelled</h4>";
		$tags_output .="<p>This class has been canceled.</p></div></li>\n";				
	}
	//permission tag
	if($item_details->permission_required == 't'){
		$tag_classes .= ' tag_perm ';	
		$tags_collapsed .= "<li><span class=\"button\" title=\"Permission Required\">Perm</span></li>";
		$tags_output .="<li class=\"schedule-tag\"><span class=\"button\" title=\"Permission Required\" >Perm</span>";
		$tags_output .="<div class=\"body\"><h4>Permission Required</h4>";
		$tags_output .="<p>This class requires an <b>Entry Code</b> to register. See the division to get one.</p></div></li>\n";						
	}
	//registration not allowed tag
	if($item_details->registration_allowed == 'f'){
		$tag_classes .= ' tag_rd ';
		$tags_collapsed .= "<li><span class=\"button\" title=\"Registration not permitted\">RD</span></li>";
		$tags_output .="<li class=\"schedule-tag\"><span class=\"button\" title=\"Registration not permitted\" >RD</span>";
		$tags_output .="<div class=\"body\"><h4>Registration not permitted</h4>";
		$tags_output .="<p>Registration is not permitted for this class.</p></div></li>\n";						
	}
	//www tag
	if($item_details->url != NULL){
		$tag_classes .= ' tag_www ';	
		$tags_collapsed .= "<li><span class=\"button\" title=\"Class Web Site\">WWW</span></li>";
		$tags_output .="<li class=\"schedule-tag\"><span class=\"button\" title=\"Class Web Site\" >WWW</span>";
		$tags_output .="<div class=\"body\"><h4>Class Web Site</h4>";
		$tags_output .="<p><a href=\"".$item_details->url."\">".$item_details->url."</a></p></div></li>\n";						
	}
	//conted tag
	if($item_details->conted == 't'){
		$tag_classes .= ' tag_ce ';
		$tags_collapsed .= "<li><span class=\"button\" title=\"Continuing Education class\">CE</span></li>";
		$tags_output .="<li class=\"schedule-tag\"><span class=\"button\" title=\"Community Education Class\" >CE</span>";
		$tags_output .="<div class=\"body\"><h4>Community Education Class</h4>";
		$tags_output .="<p>This is a Community Education class. Often, other institutions refer to this as &quot;Continuing Education.&quot; To register, go to the <a href=\"http://www.learnatnorth.org\">Community Education website</a>.</p></div></li>\n";						
	}
	
	//common course number
	if($item_details->common_course == 't'){
		$tag_classes .= ' tag_ccn ';
		$tags_collapsed .= "<li><span class=\"button\" title=\"Common Course Number\">CCN</span></li>";
		$tags_output .="<li class=\"schedule-tag\"><span class=\"button\" title=\"Common Course Number\" >CCN</span>";
		$tags_output .="<div class=\"body\"><h4>Common Course Number</h4>";
		$tags_output .="<p>This class is part of the <strong>Common Course Numbering</strong> system, which indicates that it's essentially equivalent at all Community Colleges in Washington. If this class is part of a series, it is strongly recommended that you complete the entire series at North Seattle Community College.</p></div></li>\n";						
	}
	//Self Paced
	if($item_details->sp == 't'){
		$tag_classes .= ' tag_sp ';
		$tags_collapsed .= "<li><span class=\"button\" title=\"Self-Paced\">SP</span></li>";
		$tags_output .="<li class=\"schedule-tag\"><span class=\"button\" title=\"Self-Paced\" >SP</span>";
		$tags_output .="<div class=\"body\"><h4>Self-Paced</h4>";
		$tags_output .="<p>Students follow a checklist of assignments and tasks, and can choose when they come in (within open hours) to take tests, to see a demonstration of procedures and to practice/test the hands-on procedures.</p></div></li>\n";						
	}

	
	//distance
	if($item_details->dl=='t'){
			if ($item_details->dl_ol =='t'){
				$tag_classes .= " tag_el_ol ";						
				$dl_type_text='This is a <b>FULLY ONLINE</b> class.  It is taught entirely online but may include exams to be proctored on campus or elsewhere.  It will require use of a computer with certain minimum system requirements.  All campus computers meet or exceed these requirements.';
			}
			if ($item_details->dl_itv =='t'){
				$tag_classes .= " tag_el_itv ";
				$dl_type_text='This class is taught live at multiple locations by one instructor via Interactive Television or Web Communication technologies.';
			}
			if ($item_details->dl_em =='t'){
				$tag_classes .= " tag_el_em ";
				$dl_type_text='This is a <b>fully online</b> e-learning class that includes live (synchronous) online meetings.  Students will need a computer with audio, and a microphone.  Webcam optional.';
			}

		if($item_details->oncampus_meetings){
			$oncampus_meeting_text = "<p class=\"schedule-oncampus-meetings\">".$item_details->oncampus_meetings."</p>";
		} else {
			$oncampus_meeting_text = "<p class=\"schedule-oncampus-meetings\">No on-campus meetings are scheduled at this time.</p>";
		}	
		$tag_classes .= " tag_el ";
		$tags_collapsed .= "<li><span class=\"button\" title=\"eLearning\">eL</span></li>";
		$tags_output .="<li class=\"schedule-tag\"><span class=\"button\" title=\"eLearning\" >eL</span>";
		$tags_output .="<div class=\"body\"><h4>eLearning/Distance Learning</h4>";
		$tags_output .="<p>$dl_type_text</p>$oncampus_meeting_text<p>For general information about eLearning classes and technical support, see the <a href=\"http://virtualcollege.org\">eLearning website</a>.</p></div></li>\n";						
	}
	
	//dl/oc
	if($item_details->h == 't'){	
		if ($item_details->h_oc =='t') {
			$tag_classes .= " tag_h_oc ";
			$h_class_type='This class is taught partially online and partially face-to-face on campus.  Some classes are "primarily online" and require only a few on-campus meetings.  Other classes are "hybrids" meaning that they are taught mostly on-campus but have online learning components that have replaced less than half of the on-campus meetings.';
		}
		if ($item_details->h_we =='t') {
  		$tag_classes .= " tag_h_we ";
			$h_class_type='This class has a normal, full schedule of on-campus meetings supplemented with online components which may include web activities and discussion rooms.  It will require use of a computer with certain minimum system requirements.  All campus computers meet or exceed these requirements.';
		}
		if($item_details->oncampus_meetings){
			$oncampus_meeting_text = "<p class=\"schedule-oncampus-meetings\">".$item_details->oncampus_meetings."</p>";
		} else {
			//$oncampus_meeting_text = "<p class=\"schedule-oncampus-meetings\">No on-campus meetings are scheduled at this time.</p>";
			$oncampus_meeting_text = '';
		}	
	
		$tag_classes .= " tag_el_oc ";
		$tags_collapsed .= "<li><span class=\"button\" title=\"eLearning/On Campus\">eL/OC</span></li>";
		$tags_output .="<li class=\"schedule-tag\"><span class=\"button\" title=\"eLearning/On Campus\" >eL/OC</span>";
		$tags_output .="<div class=\"body\"><h4>eLearning/On Campus</h4>";
		$tags_output .="<p>$h_class_type</p>$oncampus_meeting_text<p>For general information about eLearning classes and technical support, see the <a href=\"http://virtualcollege.org\">eLearning website</a>.</p></div></li>\n";											
	}

	//linked course
	if($format !='lc'){
		if($item_details->lc=='t'){
			$link_details = _nscc_schedule_get_link_details($yrq,$item_details->link_id);
			$tag_classes .= " tag_lc ";
			$tags_collapsed .= "<li><span class=\"button\" title=\"Linked Course\">LC</span></li>";
			$tags_output .="<li class=\"schedule-tag\"><span class=\"button\" title=\"Linked Course\" >LC</span>";
			$tags_output .="<div class=\"body\"><h4>Linked Course</h4>";
			$tags_output .="<p>This class can also be taken as part of a <b>Linked Course</b>, <a href=\"/schedule/".$yrq."/alternative/IS#lc_course_".$item_details->link_id."\">".$link_details->title."</a> to satisfy Integrated Studies requirements.</p></div></li>\n";						
		}
	} else {
		if($item_details->lc=='t'){
			$tag_classes .= " tag_lc ";
			$tags_collapsed .= "<li><span class=\"button\" title=\"Linked Course\">LC</span></li>";
			$tags_output .="<li class=\"schedule-tag\"><span class=\"button\" title=\"Linked Course\" >LC</span>";
			$tags_output .="<div class=\"body\"><h4>Linked Course</h4>";
			$tags_output .="<p>This class can be taken as part of this <b>Linked Course</b> to satisfy Integrated Studies requirements.</p></div></li>\n";						
		}
	}
			
	//staff
	if(rtrim($item_details->instructor) =='STAFF'){
		$tag_classes .= " tag_staff ";
		$tags_collapsed .= "<li><span class=\"button\" title=\"STAFF Instructor\">STAFF</span></li>";
		$tags_output .="<li class=\"schedule-tag\"><span class=\"button\" title=\"STAFF Instructor\" >STAFF</span>";
		$tags_output .="<div class=\"body\"><h4>STAFF Instructor</h4>";
		$tags_output .="<p>This class does not yet have a specific instructor assigned.</p></div></li>\n";						
	}

	//generic tags
	if ($item_details->tags){
		$tagslist = preg_replace('/\{|\}/','',$item_details->tags);
		$tags_array = explode(',',$tagslist);
		foreach($tags_array as $tag_id){
			if($tags[$tag_id]->tag_abbr != 'CS' && $tags[$tag_id]->tag_abbr != 'LC'){	
				$tag_classes .= " tag_".$tags[$tag_id]->tag_abbr." ";
				$tags_collapsed .= "<li><span class=\"button\" title=\"".$tags[$tag_id]->tag_name."\" >".$tags[$tag_id]->tag_abbr."</span></li>";
				$tags_output .="<li class=\"schedule-tag\"><span class=\"button\" title=\"".$tags[$tag_id]->tag_name."\" >".$tags[$tag_id]->tag_abbr."</span>";
				$tags_output .="<div class=\"body\"><h4>".$tags[$tag_id]->tag_name."</h4>";
				$tags_output .="<p>".$tags[$tag_id]->tag_text."</p></div></li>\n";
			}
		}
	}

	//course tags
	if ($item_details->course_tags){
		$tagslist = preg_replace('/\{|\}/','',$item_details->course_tags);
		$tags_array = explode(',',$tagslist);
		foreach($tags_array as $tag_id){
			$tag_classes .= " tag_".$course_tags[$tag_id]->tag_abbr." ";
			$tags_collapsed .= "<li><span class=\"button\" title=\"".$course_tags[$tag_id]->tag_name."\" >".$course_tags[$tag_id]->tag_abbr."</span></li>";
			$tags_output .="<li class=\"schedule-tag\"><span class=\"button\" title=\"".$course_tags[$tag_id]->tag_name."\" >".$course_tags[$tag_id]->tag_abbr."</span>";
			$tags_output .="<div class=\"body\"><h4>".$course_tags[$tag_id]->tag_name."</h4>";
			$tags_output .="<p>".$course_tags[$tag_id]->tag_text."</p></div></li>\n";
		}
	}
	//autoreg tag
	if ( trim($item_details->auto_reg_link) ){
		$tag_classes .=" tag_auto_reg_link ";
		$tags_collapsed .= "<li><span class=\"button\" title=\"Automatic Registration Linked\">ARL:".$item_details->auto_reg_link."</span></li>";
		$tags_output .="<li class=\"schedule-tag\"><span class=\"button\" title=\"Automatic Registration Linked\" >ARL:".$item_details->auto_reg_link."</span>";
		$tags_output .="<div class=\"body\"><h4>Automatic Registration Linked to Item ".$item_details->auto_reg_link."</h4>";
		$tags_output .="<p>If you enroll in this class, you will also be enrolled in item ".$item_details->auto_reg_link.", and any class it is linked to in turn.</p></div></li>\n";						
	}

	//fee tags
	if(trim($item_details->fee1) && trim($item_details->fee1) !='**' ){
				if (trim($item_details->fee1) == 'SO'){
					$tag_classes .= " tag_\$".$item_details->fee1." ";
					$tags_collapsed .= "<li><span class=\"button\" title=\"".$item_details->fee1." fee\">\$".$item_details->class_fee_amount."</span></li>";
					$tags_output .="<li class=\"schedule-tag\"><span class=\"button\" title=\"".$item_details->fee1." fee\" >\$".$item_details->class_fee_amount."</span>";
					$tags_output .="<div class=\"body\"><h4>".$item_details->class_fee_amount." Fee</h4>";
					$tags_output .="<p><b>Instead of standard tuition</b>, this class has a cost of ".$item_details->class_fee_amount."</p></div></li>\n";
				} else {
					$tag_classes .= " tag_\$".$item_details->fee1." ";
					$tags_collapsed .= "<li><span class=\"button\" title=\"".$item_details->fee1." fee\">\$".$item_details->fee1."</span></li>";
					$tags_output .="<li class=\"schedule-tag\"><span class=\"button\" title=\"".$item_details->fee1." fee\" >\$".$item_details->fee1."</span>";
					if ($fees[$item_details->fee1]){
						$tags_output .=	"<div class=\"body\">".$fees[$item_details->fee1]['fee_node']."</div></li>\n";
					} else {		
						$tags_output .="<div class=\"body\"><h4>".$item_details->fee1." Fee</h4>";
						$tags_output .="<p>This class requires the ".$item_details->fee1." fee</p></div></li>\n";
					}
				}
	}
	if(trim($item_details->fee2) && trim($item_details->fee2) !='**' ){
				if (trim($item_details->fee2) == 'SO'){
					$tag_classes .= " tag_\$".$item_details->fee2." ";
					$tags_collapsed .= "<li><span class=\"button\" title=\"".$item_details->fee2." fee\">\$".$item_details->class_fee_amount."</span></li>";
					$tags_output .="<li class=\"schedule-tag\"><span class=\"button\" title=\"".$item_details->fee2." fee\" >\$".$item_details->class_fee_amount."</span>";
					$tags_output .="<div class=\"body\"><h4>".$item_details->class_fee_amount." Fee</h4>";
					$tags_output .="<p><b>Instead of standard tuition</b>, this class has a cost of ".$item_details->class_fee_amount."</p></div></li>\n";
				} else {
					$tag_classes .= " tag_\$".$item_details->fee2." ";
					$tags_collapsed .= "<li><span class=\"button\" title=\"".$item_details->fee2." fee\">\$".$item_details->fee2."</span></li>";
					$tags_output .="<li class=\"schedule-tag\"><span class=\"button\" title=\"".$item_details->fee2." fee\" >\$".$item_details->fee2."</span>";
					if ($fees[$item_details->fee2]){
						$tags_output .=	"<div class=\"body\">".$fees[$item_details->fee2]['fee_node']."</div></li>\n";
					} else {		
						$tags_output .="<div class=\"body\"><h4>".$item_details->fee2." Fee</h4>";
						$tags_output .="<p>This class requires the ".$item_details->fee2." fee</p></div></li>\n";
					}
				}
	}

	$status_button_id = 'item_status_'.$item_details->yrq."_".$item_details->item."_button";
	$status_output_id = 'item_status_'.$item_details->yrq."_".$item_details->item."_output";
	
	
	// Registration Status
	$reg_close_timestamp = _nscc_schedule_dumbdate_to_unix_timestamp($item_details->reg_close_date) + 86400; //day stored in HP + 1 day.
	$now_timestamp = time();
	if($reg_close_timestamp >= $now_timestamp){
  	$status_string = "<td class=\"sched-status\"><a id=\"$status_button_id\" class=\"status-button\" title=\"Get Real-Time Class Status.\" href=\"\">Status:</a> <span id=\"$status_output_id\" class=\"status-output\">Unchecked</span></td>\n\t\t";
  } else {
	  $next_quarter=_schedule_get_next_yrq($yrq);
  	if($next_quarter){
	  	$next_human_yrq = _schedule_yrq_to_quarter($next_quarter);
  		$status_string = "<td class=\"sched-status\"><span class=\"registration-closed-message\" title=\"$human_yrq Registration Closed\">Registration Closed for this Quarter.<br><a href=\"/".preg_replace("/$yrq/",$next_quarter,drupal_get_path_alias($_GET['q']))."\">Check $next_human_yrq.</a></span></td>\n\t\t";	  	
  	} else {
  		$status_string = "<td class=\"sched-status\"><span class=\"registration-closed-message\" title=\"$human_yrq Registration Closed\">$human_yrq Registration Closed</span></td>\n\t\t";
		}
  }
  switch($format){
  	case 'alone':
  
				if ($html_course_desc || $html_item_desc || $instructor_message){
					$tags_collapsed = "<li><span class=\"button\" title=\"Description\">Desc</span></li>".$tags_collapsed;
					$desc_output ="<li class=\"schedule-tag\"><span class=\"button\" title=\"Description\" >Desc</span>";
					$desc_output .="<div class=\"body\"><h4>Description</h4>";
					$desc_output .="\t<div class=\"desc_content\">\n\t<div class=\"course_description\">{$html_course_desc}</div>\n\t<div class=\"item_description\">{$html_item_desc}</div>\n\t<div class=\"instructor_message\">{$instructor_message}</div>\n</div>\n</div>\n</li>\n";
					$tags_output  = $desc_output.$tags_output;
				}

				if($tags_collapsed){
					$tags_collapsed = "<div class=\"schedule-tags-collapsed\" style=\"display: none;\"><ul> $tags_collapsed <li class=\"expand-button\">Expand</li></ul></div>\n";
				}
				$tags_output = $tags_collapsed."<div class=\"schedule-tags-expanded\"><ul class=\"schedule-taglist\">\n".$tags_output."<li class=\"collapse-button\">Collapse</li></ul></div>\n";

  			//build complete item-output
  			$output ="<li class=\"schedule-item item-status-unchecked $tag_classes\" id=\"item_".$item_details->yrq."_".$item_details->item."\"><table>\n\t<tr>\n\t\t<td class=\"sched_item_num\" rowspan=\"2\"><span title=\"Item Number\"> $item_details->item </span></td>\n\t\t<td class=\"course_title\" colspan=\"7\"><span title=\"Course Title\"> $html_course_title </span></td>\n\t</tr>";
        if($alternate_location_string){
        		$output .="\n\t<tr>\n\t\t$course_string\n\t\t$section_credit_string\n\t\t$alternate_location_string\n\t\t<td class=\"sched_instructor\"><span title=\"Instructor\">$instructor_link</span></td>\n\t\t$status_string</tr>";
        } else {
        		$output .="\n\t<tr>\n\t\t$course_string\n\t\t$section_credit_string\n\t\t$location_string\n\t\t<td class=\"sched_days\"><span title=\"Meeting Days\">$days_string</span></td>\n\t\t<td class=\"sched_times\"><span title=\"Meeting Time\">$times_string</span></td>\n\t\t<td class=\"sched_instructor\"><span title=\"Instructor\">$instructor_link</span></td>\n\t\t$status_string</tr>";
        }
        $output .= $ami_output;
      	$output .="\n</table>\n$tags_output\n</li>\n";

		break;

  	case 'search':
  
				if ($html_course_desc || $html_item_desc || $instructor_message){
					//$tags_collapsed = "<li><span class=\"button\" title=\"Description\">Desc</span></li>".$tags_collapsed;
					//$desc_output ="<li class=\"schedule-tag\"><span class=\"button\" title=\"Description\" >Desc</span>";
					//$desc_output .="<div class=\"body\"><h4>Description</h4>";
					$desc_output .="\t<div class=\"desc_content\">\n\t<div class=\"course_description\">{$html_course_desc}</div>\n\t<div class=\"item_description\">{$html_item_desc}</div>\n\t<div class=\"instructor_message\">{$instructor_message}</div>\n</div>\n";
					//$tags_output  = $desc_output.$tags_output;
				}

				if($tags_collapsed){
					$tags_collapsed = "<div class=\"schedule-tags-collapsed\"><ul> $tags_collapsed <li class=\"expand-button\">Expand</li></ul></div>\n";
				}
				if($item_details->cs =='t'){
					$tags_output = $tags_collapsed."<div class=\"schedule-tags-expanded\" style=\"display: none;\"><ul class=\"schedule-taglist\">\n".$tags_output."<li class=\"collapse-button\">Collapse</li></ul></div>\n";
				} else {
					$tags_output = $desc_output.$tags_collapsed."<div class=\"schedule-tags-expanded\" style=\"display: none;\"><ul class=\"schedule-taglist\">\n".$tags_output."<li class=\"collapse-button\">Collapse</li></ul></div>\n";
				}
  			//build complete item-output
		 		$course_string = '<td class="sched_course"><span title="Course"><a href="/schedule/'.$yrq.'/course/'.$url_course.'">'.$clean_course.".".$item_details->section."</a></span></td>";
				$dept_string = "<span class=\"schedule-search-department\" title=\"Department\"><a href=\"/schedule/$yrq/dept/".trim(preg_replace('/&/','',$item_details->dept))."\">".trim(preg_replace('/&/','',$item_details->dept))."</a></span>";
 				$output ="<li class=\"schedule-item item-status-unchecked  $tag_classes\" id=\"item_".$item_details->yrq."_".$item_details->item."\"><table>\n\t<tr>\n\t\t<td class=\"sched_item_num\" rowspan=\"2\"><span title=\"Item Number\"> $item_details->item </span></td>\n\t\t<td class=\"course_title\" colspan=\"7\"><span title=\"Course Title\"> $html_course_title </span> $dept_string</td>\n\t</tr>";
        if($alternate_location_string){
        		$output .="\n\t<tr>\n\t\t$course_string\n\t\t$section_credit_string\n\t\t$alternate_location_string\n\t\t<td class=\"sched_instructor\"><span title=\"Instructor\">$instructor_link</span></td>\n\t\t$status_string</tr>";
        } else {
        		$output .="\n\t<tr>\n\t\t$course_string\n\t\t$section_credit_string\n\t\t$location_string\n\t\t<td class=\"sched_days\"><span title=\"Meeting Days\">$days_string</span></td>\n\t\t<td class=\"sched_times\"><span title=\"Meeting Time\">$times_string</span></td>\n\t\t<td class=\"sched_instructor\"><span title=\"Instructor\">$instructor_link</span></td>\n\t\t$status_string</tr>";
        }
      $output .= $ami_output;
      	$output .="\n</table>\n$tags_output\n</li>\n"; 

		break;

		case 'incourse':
  
				if ($html_item_desc || $instructor_message){
					$tags_collapsed = "<li><span class=\"button\" title=\"Description\">Desc</span></li>".$tags_collapsed;
					$desc_output ="<li class=\"schedule-tag\"><span class=\"button\" title=\"Item Description\" >Desc</span>";
					$desc_output .="<div class=\"body\"><h4>Description</h4>";
					$desc_output .="\t<div class=\"desc_content\"><div class=\"item_description\">{$html_item_desc}</div>\n\t<div class=\"instructor_message\">{$instructor_message}</div>\n</div>\n</div>\n</li>\n";
					$tags_output  = $desc_output.$tags_output;
				}
				if($tags_collapsed){
					$tags_collapsed = "<div class=\"schedule-tags-collapsed\"><ul> $tags_collapsed <li class=\"expand-button\">Expand</li></ul></div>\n";
				}
				$tags_output = $tags_collapsed."<div class=\"schedule-tags-expanded\" style=\"display: none;\"><ul class=\"schedule-taglist\">\n".$tags_output."<li class=\"collapse-button\">Collapse</li></ul></div>\n";

  			//build complete item-output
				if($item_details->cs == 't'){
						$output ="<li class=\"schedule-item item-status-unchecked  $tag_classes\" id=\"item_".$item_details->yrq."_".$item_details->item."\"><table>\n\t<tr>\n\t\t<td class=\"sched_item_num\"><span title=\"Item Number\"> $item_details->item </span></td>";
						$output .="\n\t\t<td colspan=\"7\"><p>This section is <b>only</b> available as part of <a href=\"/schedule/".$yrq."/alternative/IS#cs_course_".$cluster_details->class_cluster."\">".$cluster_details->cluster_section.". ".$cluster_details->title."</a></p></td>\n\t</tr>";
						$ami_output = '';//cleared in course listing.
				}else{
						$course_string = '<td class="sched_course"><span title="Course">'.$clean_course.".".$item_details->section."</span></td>";
  					$output ="<li class=\"schedule-item $tag_classes\" id=\"item_".$item_details->yrq."_".$item_details->item."\"><table>\n\t<tr>\n\t\t<td class=\"sched_item_num\"><span title=\"Item Number\"> $item_details->item </span></td>";
        		if($alternate_location_string){
        			$output .="\n\t\t$course_string\n\t\t$section_credit_string\n\t\t$alternate_location_string\n\t\t<td class=\"sched_instructor\"><span title=\"Instructor\">$instructor_link</span></td>\n\t\t$status_string</tr>";
        		} else {
        			$output .="\n\t\t$course_string\n\t\t$section_credit_string\n\t\t$location_string\n\t\t<td class=\"sched_days\"><span title=\"Meeting Days\">$days_string</span></td>\n\t\t<td class=\"sched_times\"><span title=\"Meeting Time\">$times_string</span></td>\n\t\t<td class=\"sched_instructor\"><span title=\"Instructor\">$instructor_link</span></td>\n\t\t$status_string</tr>";
        		}
				}
        $output .= $ami_output;
      	$output .="\n</table>\n$tags_output\n</li>\n";

		break;

		case 'cs':
  
				if ($html_item_desc || $instructor_message){
					$tags_collapsed = "<li><span class=\"button\" title=\"Description\">Desc</span></li>".$tags_collapsed;
					$desc_output ="<li class=\"schedule-tag\"><span class=\"button\" title=\"Item Description\" >Desc</span>";
					$desc_output .="<div class=\"body\"><h4>Description</h4>";
					$desc_output .="\t<div class=\"desc_content\"><div class=\"item_description\">{$html_item_desc}</div>\n\t<div class=\"instructor_message\">{$instructor_message}</div>\n</div>\n</div>\n</li>\n";
					$tags_output  = $desc_output.$tags_output;
				}
				if($tags_collapsed){
					$tags_collapsed = "<div class=\"schedule-tags-collapsed\"><ul> $tags_collapsed <li class=\"expand-button\">Expand</li></ul></div>\n";
				}
				$tags_output = $tags_collapsed."<div class=\"schedule-tags-expanded\" style=\"display: none;\"><ul class=\"schedule-taglist\">\n".$tags_output."<li class=\"collapse-button\">Collapse</li></ul></div>\n";

  			//build complete item-output
  			$output ="<li class=\"schedule-item item-status-unchecked  $tag_classes\" id=\"item_".$item_details->yrq."_".$item_details->item."\"><table>\n\t<tr>\n\t\t<td class=\"sched_item_num\" rowspan=\"2\"><span title=\"Item Number\"> $item_details->item </span></td>\n\t\t<td class=\"course_title\" colspan=\"7\"><span title=\"Course Title\"> $html_cs_item_title </span></td>\n\t</tr>";
				//$output ="<li class=\"schedule-item\" id=\"item_".$item_details->yrq."_".$item_details->item."\"><table>\n\t<tr>\n\t\t<td class=\"sched_item_num\"><span title=\"Item Number\"> $item_details->item </span></td>";
        if($alternate_location_string){
        		$output .="\n\t<tr>\n\t\t$course_string\n\t\t$section_credit_string\n\t\t$alternate_location_string\n\t\t<td class=\"sched_instructor\"><span title=\"Instructor\">$instructor_link</span></td>\n\t\t$status_string</tr>";
        } else {
        		$output .="\n\t<tr>\n\t\t$course_string\n\t\t$section_credit_string\n\t\t$location_string\n\t\t<td class=\"sched_days\"><span title=\"Meeting Days\">$days_string</span></td>\n\t\t<td class=\"sched_times\"><span title=\"Meeting Time\">$times_string</span></td>\n\t\t<td class=\"sched_instructor\"><span title=\"Instructor\">$instructor_link</span></td>\n\t\t$status_string</tr>";
        }
        $output .= $ami_output;
      	$output .="\n</table>\n$tags_output\n</li>\n";

		break;
		case 'lc':
  
				if ($html_item_desc || $instructor_message){
					$tags_collapsed = "<li><span class=\"button\" title=\"Description\">Desc</span></li>".$tags_collapsed;
					$desc_output ="<li class=\"schedule-tag\"><span class=\"button\" title=\"Item Description\" >Desc</span>";
					$desc_output .="<div class=\"body\"><h4>Description</h4>";
					$desc_output .="\t<div class=\"desc_content\"><div class=\"item_description\">{$html_item_desc}</div>\n\t<div class=\"instructor_message\">{$instructor_message}</div>\n</div>\n</div>\n</li>\n";
					$tags_output  = $desc_output.$tags_output;
				}
				if($tags_collapsed){
					$tags_collapsed = "<div class=\"schedule-tags-collapsed\"><ul> $tags_collapsed <li class=\"expand-button\">Expand</li></ul></div>\n";
				}
				$tags_output = $tags_collapsed."<div class=\"schedule-tags-expanded\" style=\"display: none;\"><ul class=\"schedule-taglist\">\n".$tags_output."<li class=\"collapse-button\">Collapse</li></ul></div>\n";
				$course_string = '<td class="sched_course"><span title="Course"><a href="/schedule/'.$yrq.'/course/'.$url_course.'">'.$clean_course.".".$item_details->section."</a></span></td>";

  			//build complete item-output
  			$output ="<li class=\"schedule-item item-status-unchecked  $tag_classes\" id=\"item_".$item_details->yrq."_".$item_details->item."\"><table>\n\t<tr>\n\t\t<td class=\"sched_item_num\" rowspan=\"2\"><span title=\"Item Number\"> $item_details->item </span></td>\n\t\t<td class=\"course_title\" colspan=\"7\"><span title=\"Course Title\"> $html_course_title </span></td>\n\t</tr>";
				//$output ="<li class=\"schedule-item\" id=\"item_".$item_details->yrq."_".$item_details->item."\"><table>\n\t<tr>\n\t\t<td class=\"sched_item_num\"><span title=\"Item Number\"> $item_details->item </span></td>";
        if($alternate_location_string){
        		$output .="\n\t<tr>\n\t\t$course_string\n\t\t$section_credit_string\n\t\t$alternate_location_string\n\t\t<td class=\"sched_instructor\"><span title=\"Instructor\">$instructor_link</span></td>\n\t\t$status_string</tr>";
        } else {
        		$output .="\n\t<tr>\n\t\t$course_string\n\t\t$section_credit_string\n\t\t$location_string\n\t\t<td class=\"sched_days\"><span title=\"Meeting Days\">$days_string</span></td>\n\t\t<td class=\"sched_times\"><span title=\"Meeting Time\">$times_string</span></td>\n\t\t<td class=\"sched_instructor\"><span title=\"Instructor\">$instructor_link</span></td>\n\t\t$status_string</tr>";
        }
        $output .= $ami_output;
      	$output .="\n</table>\n$tags_output\n</li>\n";

		break;

	}
  return $output;
}

//============================================================================
function nscc_schedule_search_form($mysterious_array,$yrq=null){
	//watchdog('schedule_test','nscc_schedule_search_form called.');
	drupal_add_js(drupal_get_path('module', 'nscc_schedule') .'/nscc_schedule.js');

	if(!$yrq){
		$yrq = _schedule_get_current_yrq();
	}
	$form['yrq'] = array(
		'#type' => 'value',
		'#value' => $yrq ,
	);
	$form['schedule_blather']= array(
		'#type'=> 'markup',
		'#value'=>'<div class="schedule-intro">
<p>This is the official <abbr title="North Seattle Community College">NSCC</abbr> quarterly class schedule. Current information about all academic and career training classes offered this quarter can be found here, including eLearning and Integrated Studies sections. Schedules for other quarters can be accessed using the quarter navigation links above. Non-credit community and continuing education offerings are not listed here; see <a href="http://www.learnatnorth.org/">Continuing Education</a> for information about those classes.</p>
<p>This schedule is currently informational only. To enroll in classes, please continue to use the existing system to <a href="https://sccdweb.sccd.ctc.edu/seanor/webreg/waci221.html">register for classes</a> until that functionality is available here.</p>
</div>
<div class="schedule-browse-links">
<div class="grid-3 alpha"><a class="schedule-browse browse-depts" href="'.$yrq.'/dept"><span class="glir"></span>Browse by Department</a></div>
<div class="grid-3"><a class="schedule-browse browse-instructors" href="'.$yrq.'/instructor"><span class="glir"></span>Browse by Instructor</a></div>
<div class="grid-3 omega"><a class="schedule-browse browse-courses" href="'.$yrq.'/course"><span class="glir"></span>Browse By Course</a></div>
<div class="clearfix">&nbsp;</div>
</div>
<div class="schedule-search-form">
<h2>Advanced Search</h2>
<div class="schedule-search-instructions">
<p>It is also possible to search for classes that meet various criteria using the schedule search form below. Transfer degree requirements, credit amounts, and other attributes can be specified to limit the results to only those classes that meet your needs. You can even specify the days and times you are available to find those classes that fit within your schedule.</p>
</div>'
	);

  $form['times'] = array(
  	'#type'=>'fieldset',
		'#prefix'=>'<div class="">',
		'#suffix'=>'</div>',
		'#weight'=>5,
		'#title'=>'Times',
		'#description'=>'Select the times you are available.',
  );
  $form['times']['time_preset'] = array(
  	'#type'=>'radios',
		'#prefix'=>'<div class="time-preset-radios">',
		'#suffix'=>'</div>',
		'#weight'=>10,
		'#title'=>'',
		'#options'=> array(
				'any'=>t('No time restriction'),
				'days'=>t('Days'),
				'nights'=>t('Nights'),
				'weekends'=>t('Weekends'),
				'custom'=>t('Custom'),
			),
		'#description'=>'',
		'#default_value'=>'any',
  );
  
	$hours_options = array(
		'000000100000000000000000' =>'  6:00 am',
		'000000010000000000000000' =>'  7:00 am',
		'000000001000000000000000' =>'  8:00 am',
		'000000000100000000000000' =>'  9:00 am',
		'000000000010000000000000' =>'10:00 am',
		'000000000001000000000000' =>'11:00 am',
		'000000000000100000000000' =>'12:00 pm',
		'000000000000010000000000' =>'  1:00 pm',
		'000000000000001000000000' =>'  2:00 pm',
		'000000000000000100000000' =>'  3:00 pm',
		'000000000000000010000000' =>'  4:00 pm',
		'000000000000000001000000' =>'  5:00 pm',
		'000000000000000000100000' =>'  6:00 pm',
		'000000000000000000010000' =>'  7:00 pm',
		'000000000000000000001000' =>'  8:00 pm',
		'000000000000000000000100' =>'  9:00 pm',
		'000000000000000000000010' =>'10:00 pm',
		'000000000000000000000010' =>'11:00 pm',
	);
	$form['times']['daywrapper_start'] = array(
		'#value'=>'<div class="daywrapper" style="display:none;">',
		'#weight'=>15,		
	);  
  $form['times']['mon'] = array(
		'#type'=>'select',
		'#prefix'=>'<div class="grid-1 alpha">',
		'#suffix'=>'</div>',
		'#weight'=>20,
		'#title'=>'Mon',
		'#description'=>'',
		'#size' => 18,
		'#multiple'=>true,
		'#options'=>$hours_options,
  );
  $form['times']['tue'] = array(
		'#type'=>'select',
		'#prefix'=>'<div class="grid-1">',
		'#suffix'=>'</div>',
		'#weight'=>30,
		'#title'=>'Tue',
		'#description'=>'',
		'#size' => 18,
		'#multiple'=>true,
		'#options'=>$hours_options,
  );
  $form['times']['wed'] = array(
		'#type'=>'select',
		'#prefix'=>'<div class="grid-1">',
		'#suffix'=>'</div>',
		'#weight'=>40,
		'#title'=>'Wed',
		'#description'=>'',
		'#size' => 18,
		'#multiple'=>true,
		'#options'=>$hours_options,
  );
  $form['times']['thu'] = array(
		'#type'=>'select',
		'#prefix'=>'<div class="grid-1">',
		'#suffix'=>'</div>',
		'#weight'=>50,
		'#title'=>'Thu',
		'#description'=>'',
		'#size' => 18,
		'#multiple'=>true,
		'#options'=>$hours_options,
  );
  $form['times']['fri'] = array(
		'#type'=>'select',
		'#prefix'=>'<div class="grid-1">',
		'#suffix'=>'</div>',
		'#weight'=>60,
		'#title'=>'Fri',
		'#description'=>'',
		'#size' => 18,
		'#multiple'=>true,
		'#options'=>$hours_options,
  );
  $form['times']['sat'] = array(
		'#type'=>'select',
		'#prefix'=>'<div class="grid-1">',
		'#suffix'=>'</div>',
		'#weight'=>70,
		'#title'=>'Sat',
		'#description'=>'',
		'#size' => 18,
		'#multiple'=>true,
		'#options'=>$hours_options,
  );
  $form['times']['sun'] = array(
		'#type'=>'select',
		'#prefix'=>'<div class="grid-1 omega">',
		'#suffix'=>'</div>',
		'#weight'=>80,
		'#title'=>'Sun',
		'#description'=>'',
		'#size' => 18,
		'#multiple'=>true,
		'#options'=>$hours_options,
  );
	$form['times']['daywrapper_end'] = array(
		'#value'=>'</div>',		
		'#weight'=>85,		
	);  

	$form['credits'] = array(
		'#type'=>'select',
		'#prefix'=>'<div class="grid-3">',
		'#suffix'=>'</div>',
		'#weight'=>20,
		'#title'=>'Credits',
		'#description'=>'Choose multiple options by using the Ctrl-key (Command-key for Mac) while selecting.',
		'#size' => 8,
		'#multiple'=>true,
		'#options'=>array(
									'a' => t('Any number of credits'),
									'0'  => t('No-Credit Classes'),
									'1'  => t('1 Credit Classes'),
									'2'  => t('2 Credit Classes'),
									'3'  => t('3 Credit Classes'),
									'4'  => t('4 Credit Classes'),
									'5'  => t('5 Credit Classes'),
									'm'  => t('More than 5 Credits'),
								),
		'#default_value'=>'a',
	);

	$tag_options['any'] = 'Any Attribute';
	$tag_options['cc']  = 'Common Course';
	$tag_options['cs']  = 'Coordinated Studies';
	$tag_options['dl']  = 'eLearning';
	$tag_options['h']   = 'eLearning/On Campus';
	//$tag_options['ce']  = 'Community Education';
	$tag_options['is']  ='Integrated Studies';
	$tag_options['lc']  ='Linked Class';
  $tags = _nscc_schedule_get_tag_details_by_yrq($yrq);
  foreach($tags as $tag){
  	$tag_options["item_".$tag->tag_id]=$tag->tag_name;
  }	
  $tags = _nscc_schedule_get_course_tag_details_by_yrq($yrq);
  foreach($tags as $tag){
  	$tag_options["course_".$tag->tag_id]=$tag->tag_name;
  }	
	$form['tags'] = array(
		'#type'=>'select',
		'#prefix'=>'<div class="grid-3 alpha">',
		'#suffix'=>'</div>',
		'#weight'=>10,
		'#title'=>'Class attributes',
		'#description'=>'Choose multiple options by using the Ctrl-key (Command-key for Mac) while selecting.',
		'#size' => 8,
		'#multiple'=>true,
		'#options'=>$tag_options,
		'#default_value'=>'any',
	);

	$dept_options['any']='Any Department';
	$departments = _nscc_schedule_get_deptlist($yrq);		
	foreach($departments as $department){
		$dept_title = trim($department->title);
		if(strlen($dept_title)>=25){
			$dept_title = substr($dept_title,0,22)."...";
		}
		$dept_options[trim($department->abbr)] = $dept_title." (".trim($department->abbr).")";
	}
	$form['departments'] = array(
		'#type'=>'select',
		'#prefix'=>'<div class="grid-3 omega">',
		'#suffix'=>'</div>',
		'#weight'=>30,
		'#title'=>'Departments',
		'#description'=>'Choose multiple options by using the Ctrl-key (Command-key for Mac) while selecting.',
		'#size' => 8,
		'#multiple'=>true,
		'#options'=>$dept_options,
		'#default_value'=>'any',
	);


	$form['submit'] = array(	
		'#type'=>'submit',
		'#value'=>'Search!',
		'#prefix'=>'<div class="clearfix"></div>',
		'#suffix'=>'',
		'#weight'=>100,
	);
	$form['ending-blather']=array(
		'#type'=>'markup',
		'#value'=>'</div>',
 		'#weight'=>110,
	);								

	return $form;
}
//============================================================================
function nscc_schedule_search_form_validate($form,&$form_state){
	return true;
}
//============================================================================
function nscc_schedule_search_form_submit($form,&$form_state){
	$param_array = array();
	$from_clause='';
	$where_clause='';
	$special_tag_where_clause='AND cd.cancelled=false ';
	
	/*//yrq
	if ($form['yrq']){
		$where_clause.="AND (cd.yrq='".$form['yrq']['#value']."') ";
		//$where_clause.="AND (yrq='%s') ";
		$param_array[] = $form['yrq']['#value'];
	}
	*/
	//tags
	foreach( $form_state['values']['tags'] as $tag=>$tag_id){
			switch($tag_id){
							case 'any':
							break;
							case 'dl':
								$special_tag_where_clause.='AND cd.dl=true ';
							break;

							case 'h':
								$special_tag_where_clause.='AND cd.h=true ';
							break;
							
							case 'ce':
								$special_tag_where_clause.='AND cd.conted=true ';
							break;

							case 'cc':
								$special_tag_where_clause.='AND cd.common_course=true ';
							break;
							
							case 'cs':
								$special_tag_where_clause.='AND cd.cs=true ';
							break;

							case 'is':
								$special_tag_where_clause.='AND cd.is=true ';
							break;
							
							case 'lc':
								$special_tag_where_clause.='AND cd.lc=true ';
							break;
							
							case 'x':
								$special_tag_where_clause=preg_replace('/^AND cd.cancelled=false /','AND cd.cancelled=true ',$special_tag_where_clause);
							break;
							
							default:
								if(preg_match('/^item_/',$tag_id)){
									$tag_id = preg_replace('/^item_/','',$tag_id);
									$tag_where_clause.="OR '".$tag_id."' = ANY (cd.tags) ";
									$param_array[] = $tag_id;	
								}
								if(preg_match('/^course_/',$tag_id)){
									$tag_id = preg_replace('/^course_/','',$tag_id);
									$tag_where_clause.="OR '".$tag_id."' = ANY (cd.course_tags) ";
									$param_array[] = $tag_id;	
								}
			}

	}	
	if($tag_where_clause){
		$where_clause.=preg_replace('/^OR /','AND (',$tag_where_clause);
		$where_clause.=") ";
	}

	//departments
	$dept_where_clause = '';				
	foreach( $form_state['values']['departments'] as $dept=>$dept_id){
		switch($dept_id){
				case 'any':
				break;
				default:
					$dept_where_clause.="OR ( cd.dept='".$dept_id."' OR cd.dept='".$dept_id."'||'&')";
					//$dept_where_clause.="OR ( cd.dept='%s' OR cd.dept='%s'||'&')";
					$param_array[] = $dept_id;	
					$param_array[] = $dept_id;	
		}
	}	
	if($dept_where_clause){
		$where_clause.=preg_replace('/^OR /','AND (',$dept_where_clause);
		$where_clause.=") ";
  }
 
  //credits
	$credit_where_clause = '';				
	foreach( $form_state['values']['credits'] as $foo=>$credits){
		switch($credits){
				case 'a':
				break;
				case 'm':
						$credit_where_clause.="OR cd.credits>5 ";
				break;
				default:
						$credit_where_clause.="OR cd.credits=$credits ";
						//$credit_where_clause.="OR cd.credits=%d ";
						$param_array[] = $credits;	
		}
	}	
	if($credit_where_clause){
		$where_clause.=preg_replace('/^OR /','AND (',$credit_where_clause);
		$where_clause.=") ";
	}

  //times
  $time_join_statement = '';
  if($form_state['values']['time_preset'] != 'any'){
  	switch($form_state['values']['time_preset']){

  		case 'days':
				$target_bitmask  = '111111111111111100000000111111111111111100000000111111111111111100000000111111111111111100000000111111111111111100000000000000000000000000000000000000000000000000000000';
  		break;

  		case 'nights':
				$target_bitmask  = '000000000000000011111111000000000000000011111111000000000000000011111111000000000000000011111111000000000000000011111111000000000000000000000000000000000000000000000000';
  		break;

  		case 'weekends':
				$target_bitmask  = '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111111111111111111111111111111111111111111111111';
  		break;

  		case 'custom':
				$monday_bitmask    = '000000000000000000000000';
				if(isset($form_state['values']['mon'])){
					foreach($form_state['values']['mon'] as $hour){
						$monday_bitmask = $monday_bitmask | $hour;
					}
				}
				$tuesday_bitmask   = '000000000000000000000000';
				if(isset($form_state['values']['tue'])){
					foreach($form_state['values']['tue'] as $hour){
						$tuesday_bitmask = $tuesday_bitmask | $hour;
					}
				}
				$wednesday_bitmask = '000000000000000000000000';
				if(isset($form_state['values']['wed'])){
					foreach($form_state['values']['wed'] as $hour){
						$wednesday_bitmask = $wednesday_bitmask | $hour;
					}
				}
				$thursday_bitmask  = '000000000000000000000000';
				if(isset($form_state['values']['thu'])){
					foreach($form_state['values']['thu'] as $hour){
						$thursday_bitmask = $thursday_bitmask | $hour;
					}
				}
				$friday_bitmask    = '000000000000000000000000';
				if(isset($form_state['values']['fri'])){
					foreach($form_state['values']['fri'] as $hour){
						$friday_bitmask = $friday_bitmask | $hour;
					}
				}
				$saturday_bitmask  = '000000000000000000000000';
				if(isset($form_state['values']['sat'])){
					foreach($form_state['values']['sat'] as $hour){
						$saturday_bitmask = $saturday_bitmask | $hour;
					}
				}
				$sunday_bitmask    = '000000000000000000000000';
				if(isset($form_state['values']['sun'])){
					foreach($form_state['values']['sun'] as $hour){
						$sunday_bitmask = $sunday_bitmask | $hour;
					}
				}
				$target_bitmask = $monday_bitmask.$tuesday_bitmask.$wednesday_bitmask.$thursday_bitmask.$friday_bitmask.$saturday_bitmask.$sunday_bitmask;				
  		break;
  	}
  	$target_string= "B'$target_bitmask'";
		$where_clause .= ' AND ( bw.week_map & ( ~ '.$target_string.' ) = B\'000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000\' ) ';
		$time_join_statement = 'join binary_week as bw on (cd.yrq = bw.yrq and cd.item=bw.item)';
	}

	$where_clause = preg_replace('/^AND /','',$where_clause.' '.$special_tag_where_clause);	
	$sql ="SELECT  cd.*, c_wd.desc_yrq, wd2.web_description, cld.description from class_details as cd right join (select max(wd.eff_yrq) as desc_yrq, wd.course_id from web_descriptions as wd where wd.eff_yrq<='".$form['yrq']['#value']."' group by wd.course_id) as c_wd on (cd.course = c_wd.course_id) left join web_descriptions as wd2 on (wd2.eff_yrq = c_wd.desc_yrq and wd2.course_id = c_wd.course_id) left join class_descriptions as cld on (cd.item=cld.item and cd.yrq=cld.eff_yrq) ".$time_join_statement;
	$sql .= ' WHERE ' .$where_clause .' order by cd.course asc,21=any(cd.tags) desc,cd.item asc;';

	$query_record = new stdClass();
	$query_record->saved_date = time();
	global $user;
	$query_record->uid = $user->uid;
	$query_record->query_string = pg_escape_string($sql);
	drupal_write_record('nscc_schedule_saved_queries',$query_record);
	//drupal_set_message("Form_state: ".print_r($form_state,true));
	//drupal_set_message("query_id: ".print_r($query_record->query_id,true));
	//drupal_set_message("params: ".print_r($param_array,true));
	//drupal_set_message("target: ".print_r($target_bitmask,true));
	$cache_spice = rand(385,32462);
	$form_state['redirect'] = "schedule/".$form['yrq']['#value']."/search/".$query_record->query_id."?".$cache_spice;

}



//============================================================================
function _nscc_schedule_get_items_of_course($yrq,$course_id){
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	$items_array = array();
	
	//$sql="SELECT * from class_details where yrq='%s' and course='%s' and cancelled=false order by dl asc,21 = any(tags) desc,day_or_night asc;";
	$sql = "select cd.*, c_wd.desc_yrq, wd2.web_description, cld.description from class_details as cd left join (select max(wd.eff_yrq) as desc_yrq, wd.course_id from web_descriptions as wd where wd.eff_yrq<='%s' group by wd.course_id) as c_wd on (cd.course = c_wd.course_id) left join web_descriptions as wd2 on (wd2.eff_yrq = c_wd.desc_yrq and wd2.course_id = c_wd.course_id) left join class_descriptions as cld on (cd.item=cld.item and cd.yrq=cld.eff_yrq) where cd.yrq='%s' and cd.course='%s' and cd.cancelled=false order by dl asc,21 = any(tags) desc,day_or_night asc,cd.section asc;";
	$result = db_query($sql,$yrq,$yrq,$course_id);

	while($item = db_fetch_object($result)){
		$items_array[] = $item;
	}

	db_set_active('default');
	return $items_array;
}

//============================================================================
function _nscc_schedule_get_quarters_course_is_taught($course_id) {
	$current_yrq = _schedule_get_current_yrq();
	$encoded_course_id = _nscc_schedule_ds_encode($course_id);

	_checkadd_schedule_db();
	db_set_active('class_schedule');
	$sql = "SELECT DISTINCT cd.yrq FROM schedule.class_details AS cd WHERE cd.yrq >= '%s' AND cd.course='%s' AND cd.cancelled=false ORDER BY cd.yrq asc;";
	//watchdog('cat_course',"Current_yrq: $current_yrq, Course: $course_id");
	$result = db_query($sql,$current_yrq,$course_id);

	while ($quarter = db_fetch_object($result)) {
		$quarter->title = trim(_schedule_yrq_to_quarter($quarter->yrq));
		$quarter->path = "schedule/$quarter->yrq/course/$encoded_course_id";
		$quarters_array[] = $quarter;
	}

	db_set_active('default');
	return $quarters_array;
}

//============================================================================
function _nscc_schedule_get_catalog_course($course_id) {
	$current_yrq = _schedule_get_current_yrq();
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	//$sql = "SELECT c_d.course AS course, COALESCE(get_class_title(c_wd.desc_yrq,c_d.course),c_d.title::character varying) AS title, c_d.credits AS credits, cta.tags AS tags, wd2.web_description AS description FROM ( (SELECT \"replace\"(raw_course_d.course_id::text, ' '::text, ''::text)::character varying AS course,raw_course_d.cr AS credits,raw_course_d.course_title AS title  FROM raw_course_d) AS c_d LEFT JOIN ( (SELECT max(wd.eff_yrq) AS desc_yrq, wd.course_id FROM web_descriptions AS wd WHERE wd.eff_yrq<='%s' GROUP BY wd.course_id) AS c_wd LEFT JOIN web_descriptions AS wd2 ON (wd2.eff_yrq = c_wd.desc_yrq AND wd2.course_id = c_wd.course_id) ) ON c_d.course = c_wd.course_id ) LEFT JOIN ( (SELECT max(ct.yrq) AS yrq,ct.course_id FROM course_tags AS ct WHERE ct.yrq<='%s' GROUP BY ct.course_id) as ct_1 LEFT JOIN course_tags_agg as cta USING (course_id,yrq) ) ON 	c_d.course = cta.course_id WHERE	c_d.course = '%s';";
	$sql = "SELECT c_d.course AS course, COALESCE(get_class_title(c_wd.desc_yrq,c_d.course),c_d.title::character varying) AS title, c_d.credits AS credits, cta.tags AS tags, wd2.web_description AS description FROM ( (SELECT replace(raw_course_d.course_id::text, ' '::text, ''::text)::character varying AS course,raw_course_d.cr AS credits,raw_course_d.course_title AS title  FROM raw_course_d where replace(raw_course_d.course_id::text, ' '::text, ''::text)::character varying='%s') AS c_d LEFT JOIN ( (SELECT max(wd.eff_yrq) AS desc_yrq, wd.course_id FROM web_descriptions AS wd WHERE wd.eff_yrq<='%s' and wd.course_id = '%s' GROUP BY wd.course_id) AS c_wd LEFT JOIN (select * from web_descriptions where course_id='%s' ) AS wd2 ON (wd2.eff_yrq = c_wd.desc_yrq AND wd2.course_id = c_wd.course_id) ) ON c_d.course = c_wd.course_id ) LEFT JOIN ( (SELECT max(ct.yrq) AS yrq,ct.course_id FROM course_tags AS ct WHERE ct.yrq<='%s' GROUP BY ct.course_id) as ct_1 LEFT JOIN course_tags_agg as cta USING (course_id,yrq) ) ON 	c_d.course = cta.course_id WHERE	c_d.course = '%s';";
	$result = db_query($sql,$course_id,$current_yrq,$course_id,$course_id,$current_yrq,$course_id);
	$course_catalog_entry = db_fetch_object($result);

	if ($course_catalog_entry !== false) {
		$course_tags = _nscc_schedule_get_course_tag_details();
		$quarters_array = _nscc_schedule_get_quarters_course_is_taught($course_id);
		$course_catalog_entry->quarters = $quarters_array;
		if (! empty($course_catalog_entry->tags)) {
			$tag_ids = explode(',', substr($course_catalog_entry->tags, 1, -1));
			foreach ($tag_ids as $tag_id) {
				$tags[] = $course_tags[$tag_id];
			}
			$course_catalog_entry->tags = $tags;
		}
	}
	
	db_set_active('default');
	return $course_catalog_entry;
}

//============================================================================
function _nscc_schedule_get_catalog_courses($course_array) {
	$current_yrq = _schedule_get_current_yrq();
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	//$sql = "SELECT c_d.course AS course, COALESCE(get_class_title(c_wd.desc_yrq,c_d.course),c_d.title::character varying) AS title, c_d.credits AS credits, cta.tags AS tags, wd2.web_description AS description FROM ( (SELECT \"replace\"(raw_course_d.course_id::text, ' '::text, ''::text)::character varying AS course,raw_course_d.cr AS credits,raw_course_d.course_title AS title  FROM raw_course_d) AS c_d LEFT JOIN ( (SELECT max(wd.eff_yrq) AS desc_yrq, wd.course_id FROM web_descriptions AS wd WHERE wd.eff_yrq<='%s' GROUP BY wd.course_id) AS c_wd LEFT JOIN web_descriptions AS wd2 ON (wd2.eff_yrq = c_wd.desc_yrq AND wd2.course_id = c_wd.course_id) ) ON c_d.course = c_wd.course_id ) LEFT JOIN ( (SELECT max(ct.yrq) AS yrq,ct.course_id FROM course_tags AS ct WHERE ct.yrq<='%s' GROUP BY ct.course_id) as ct_1 LEFT JOIN course_tags_agg as cta USING (course_id,yrq) ) ON 	c_d.course = cta.course_id WHERE	c_d.course = '%s';";
	//$sql = "SELECT c_d.course AS course, COALESCE(get_class_title(c_wd.desc_yrq,c_d.course),c_d.title::character varying) AS title, c_d.credits AS credits, cta.tags AS tags, wd2.web_description AS description FROM ( (SELECT replace(raw_course_d.course_id::text, ' '::text, ''::text)::character varying AS course,raw_course_d.cr AS credits,raw_course_d.course_title AS title  FROM raw_course_d where replace(raw_course_d.course_id::text, ' '::text, ''::text)::character varying='%s') AS c_d LEFT JOIN ( (SELECT max(wd.eff_yrq) AS desc_yrq, wd.course_id FROM web_descriptions AS wd WHERE wd.eff_yrq<='%s' and wd.course_id = '%s' GROUP BY wd.course_id) AS c_wd LEFT JOIN (select * from web_descriptions where course_id='%s' ) AS wd2 ON (wd2.eff_yrq = c_wd.desc_yrq AND wd2.course_id = c_wd.course_id) ) ON c_d.course = c_wd.course_id ) LEFT JOIN ( (SELECT max(ct.yrq) AS yrq,ct.course_id FROM course_tags AS ct WHERE ct.yrq<='%s' GROUP BY ct.course_id) as ct_1 LEFT JOIN course_tags_agg as cta USING (course_id,yrq) ) ON 	c_d.course = cta.course_id WHERE	c_d.course = '%s';";
	$sql = "select * from (select max(eff_yrq) as yrq,course from schedule.catalog where eff_yrq <='%s' group by course) as cy join (select * from schedule.catalog where course in ";
	$sql .="('".implode("','",$course_array)."') ";
	$sql .=") as cat on (cy.yrq = cat.eff_yrq and cy.course = cat.course);";
	$result = db_query($sql,$current_yrq);
	
	$course_tags = _nscc_schedule_get_course_tag_details();
	while($course_catalog_entry = db_fetch_object($result)){
		$course_catalog_entry->quarters = _nscc_schedule_get_quarters_course_is_taught($course_catalog_entry->course);
		if (! empty($course_catalog_entry->tags)) {
			$tag_ids = explode(',', substr($course_catalog_entry->tags, 1, -1));
			foreach ($tag_ids as $tag_id) {
				$tags[] = $course_tags[$tag_id];
			}
			$course_catalog_entry->tags = $tags;
		}	
		$course_catalog_array[$course_catalog_entry->course] = $course_catalog_entry;	
	}
	db_set_active('default');
	return $course_catalog_array;
}




//============================================================================
function _nscc_schedule_get_items_of_course_for_print($yrq,$course_id){
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	$items_array = array();
	
	$sql = "select cd.*, c_pd.desc_yrq, pd2.print_description, cld.description from class_details as cd left join (select max(pd.eff_yrq) as desc_yrq, pd.course_id from print_descriptions as pd where pd.eff_yrq<='%s' group by pd.course_id) as c_pd on (cd.course = c_pd.course_id) left join print_descriptions as pd2 on (pd2.eff_yrq = c_pd.desc_yrq and pd2.course_id = c_pd.course_id) left join class_descriptions as cld on (cd.item=cld.item and cd.yrq=cld.eff_yrq) where cd.yrq='%s' and cd.course='%s' and cd.cancelled=false order by dl asc,21 = any(tags) desc,day_or_night asc,cd.section asc;";
	$result = db_query($sql,$yrq,$yrq,$course_id);

	while($item = db_fetch_object($result)){
		$items_array[] = $item;
	}

	db_set_active('default');
	return $items_array;
}


//============================================================================
function _nscc_schedule_get_item($yrq,$item){
	_checkadd_schedule_db();
	db_set_active('class_schedule');

//	$sql="SELECT * from schedule.class_details where yrq='%s' and item='%s';";
  $sql = "select cd.*, c_wd.desc_yrq, wd2.web_description, cld.description from class_details as cd right join (select max(wd.eff_yrq) as desc_yrq, wd.course_id from web_descriptions as wd where wd.eff_yrq<='%s' group by wd.course_id) as c_wd on (cd.course = c_wd.course_id) left join web_descriptions as wd2 on (wd2.eff_yrq = c_wd.desc_yrq and wd2.course_id = c_wd.course_id) left join class_descriptions as cld on (cd.item=cld.item and cd.yrq=cld.eff_yrq) where cd.yrq='%s' and cd.item='%s' and cd.cancelled=false;";
	$result = db_query($sql,$yrq,$yrq,$item);
	$item_details=db_fetch_object($result);

	db_set_active('default');
	return $item_details;
}


//============================================================================
function _nscc_schedule_get_ami($yrq,$item){
	_checkadd_schedule_db();
	db_set_active('class_schedule');

	$sql="SELECT * from schedule.also_meets_in where yrq='%s' and item='%s' order by times;";
	$result = db_query($sql,$yrq,$item);
	while($record = db_fetch_object($result)){
		$ami_detail_array[] = $record;
	}

	db_set_active('default');
	return $ami_detail_array;
}

//============================================================================
function _nscc_schedule_get_additional_instructors($yrq,$item){
	_checkadd_schedule_db();
	db_set_active('class_schedule');

	$sql="SELECT DISTINCT additional_instructor as instructor,instructor_full_name from schedule.additional_instructor where yrq='%s' and item='%s';";
	$result = db_query($sql,$yrq,$item);
	while($record = db_fetch_object($result)){
		$additional_instructors[] = $record;
	}

	db_set_active('default');
	return $additional_instructors;
}





//============================================================================
function _nscc_schedule_get_class_description($yrq,$item){
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	$sql = "select cd.title,wd.web_description,cld.description from (class_details as cd left join web_descriptions as wd on (cd.course = wd.course_id and wd.eff_yrq<=cd.yrq)) left join class_descriptions as cld ON (cd.item=cld.item and cd.yrq=cld.eff_yrq) where cd.yrq='%s' and cd.item='%s' ORDER BY wd.eff_yrq DESC limit 1;";
	$result = db_query($sql,$yrq,$item);
	$class_desc = db_fetch_object($result);
	db_set_active('default');
	return $class_desc;
}



//============================================================================
//loads up array with all extant tags
function _nscc_schedule_get_tag_details(){
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	$tag_detail_array = array();
	$tags_array = array();
	
	$sql='SELECT * from schedule.tag_details order by tag_name;';
	$result = db_query($sql);

	while($record = db_fetch_object($result)){
		$tags_array[$record->tag_id] = $record;
	}

	db_set_active('default');
	return $tags_array;
}

//============================================================================
//loads up array with all extant course tags
function _nscc_schedule_get_course_tag_details() {
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	$tag_detail_array = array();
	$tags_array = array();
	
	$sql='SELECT * from schedule.course_tag_details order by tag_name;';
	$result = db_query($sql);

	while($record = db_fetch_object($result)){
		$tags_array[$record->tag_id] = $record;
	}

	db_set_active('default');
	return $tags_array;
}

//============================================================================
//loads up array with fee details
function _nscc_schedule_get_fee_tag_details($yrq){
	$sql  = "SELECT nid, fees.field_fee_code_value as fee_code ";
	$sql .= "FROM {content_type_fee} AS fees ";
	$sql .= "JOIN (SELECT field_fee_code_value, max(field_fee_first_quarter_value) AS field_fee_first_quarter_value  FROM {content_type_fee} WHERE field_fee_first_quarter_value <= '%s' GROUP BY field_fee_code_value) AS applicable_fees ";
	$sql .= "USING (field_fee_code_value,field_fee_first_quarter_value) ";
	$sql .= "WHERE (fees.field_fee_last_quarter_value IS NULL OR fees.field_fee_last_quarter_value ='' OR fees.field_fee_last_quarter_value >= '%s');";
	
	$result = db_query($sql,$yrq,$yrq);
	while($record = db_fetch_object($result)){
		$fee_node = node_load($record->nid,null,true);
		$fee_node->target_display = 'schedule';
		$themed_node = theme('node',$fee_node);
		//watchdog('fee details',print_r($fee_node,true));
		$fees_array[$record->fee_code] = array(	'fee_code'=>$record->fee_code,
																						'fee_nid'=>$record->nid,
																						'fee_node'=>$themed_node	
																		);
	}
	return $fees_array;
}


//============================================================================
//loads up array with tags in use for a given quarter
function _nscc_schedule_get_tag_details_by_yrq($yrq){
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	$tag_detail_array = array();
	$tags_array = array();
	
	$sql="select distinct tgd.* from class_tags as ct join tag_details as tgd using (tag_id) where ct.yrq='%s' order by tag_name;";
	$result = db_query($sql,$yrq);

	while($record = db_fetch_object($result)){
		$tags_array[$record->tag_id] = $record;
	}

	db_set_active('default');
	return $tags_array;
}

//============================================================================
//loads up array with course tags in use for a given quarter
function _nscc_schedule_get_course_tag_details_by_yrq($yrq){
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	$tag_detail_array = array();
	$tags_array = array();
	
	$sql="select distinct tgd.* from course_tags as ct join course_tag_details as tgd using (tag_id) where ct.yrq='%s' order by tag_name;";
	$result = db_query($sql,$yrq);

	while($record = db_fetch_object($result)){
		$tags_array[$record->tag_id] = $record;
	}

	db_set_active('default');
	return $tags_array;
}


//============================================================================
function _nscc_schedule_get_cluster_details($yrq,$cluster_id){
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	
	$sql="select DISTINCT * from schedule.is_cluster_details where eff_yrq='%s' and class_cluster='%s' order by class_cluster asc;";
	$result = db_query( $sql,$yrq,$cluster_id );
	$cluster_details = db_fetch_object($result);
	
	db_set_active('default');
	return $cluster_details;
}

//============================================================================
function _nscc_schedule_get_cluster_items($yrq,$cluster_id){
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	
	$sql="SELECT * from class_details where yrq='%s' and class_cluster='%s';";
	$result = db_query( $sql,$yrq,$cluster_id );
	while($item = db_fetch_object($result)){
		$items_array[] = $item;
	}

	db_set_active('default');
	return $items_array;
}

//============================================================================
function _nscc_schedule_get_clusterlist($yrq){
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	
	$sql="select * from schedule.clusterlist where yrq='%s' order by cluster_section asc;";
	$result = db_query( $sql,$yrq);
	while($cluster = db_fetch_object($result)){
		$clusters_array[] = $cluster->class_cluster;
	}

	db_set_active('default');
	return $clusters_array;
}


//============================================================================
function _nscc_schedule_get_link_details($yrq,$link_id){
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	
	$sql="select ild.eff_yrq,rtrim(ild.link_id) as link_id,ild.title,ild.description,ild.registration_reqs from schedule.is_link_details as ild where eff_yrq='%s' and link_id='%s';";
	$result = db_query( $sql,$yrq,$link_id );
	$link_details = db_fetch_object($result);
	
	db_set_active('default');
	return $link_details;
}

//============================================================================
function _nscc_schedule_get_link_items($yrq,$link_id){
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	
	$sql="SELECT * from class_details as cd join is_link_item_links as ilil on cd.yrq=ilil.eff_yrq and cd.item=ilil._class_itm_num where cd.yrq='%s' and ilil.link_id='%s';";
	$result = db_query( $sql,$yrq,$link_id );
	while($item = db_fetch_object($result)){
		$items_array[] = $item;
	}

	db_set_active('default');
	return $items_array;
}

//============================================================================
function _nscc_schedule_get_linklist($yrq){
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	
	$sql="select * from schedule.is_link_details where eff_yrq='%s' order by link_id asc;";
	$result = db_query( $sql,$yrq);
	while($link = db_fetch_object($result)){
		$links_array[] = $link->link_id;
	}

	db_set_active('default');
	return $links_array;
}


//============================================================================
function _nscc_schedule_get_courselist($yrq){
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	$courses = array();
	
	$sql="SELECT course_id as course,course_title as title from schedule.courselist_nc where yrq='%s' and not course_id like 'CSS%';";
	$result = db_query( $sql,$yrq);
	while($course = db_fetch_object($result)){
		$courses[]=$course;
	}
	
	db_set_active('default');
	return $courses;
}


//============================================================================
function _nscc_schedule_get_course_initials($yrq){
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	$courses = array();
	
	$sql="select distinct substring(schedule.courselist.course_id from 1 for 1) as initial from schedule.courselist where schedule.courselist.yrq='%s' order by initial;";
	$result = db_query( $sql,$yrq);
	while($initial = db_fetch_object($result)){
		$initials[]=$initial->initial;
	}
	
	db_set_active('default');
	return $initials;
}

//============================================================================
function _nscc_schedule_get_deptlist($yrq){
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	$departments = array();
	
	$sql="SELECT DISTINCT case when trim(trailing ' ' from sdt.dept_abbr) like '%&' then trim(trailing '&' from trim(trailing ' ' from sdt.dept_abbr)) else sdt.dept_abbr end as abbr,dept_title as title from schedule.deptlist as sdt where yrq='%s' and not dept_abbr='CSS' order by dept_title;";
	$result = db_query( $sql,$yrq);
	while($dept = db_fetch_object($result)){
		$departments[]=$dept;
	}
	
	//Special cases fix by Luv Sharma
	foreach($departments as $department ){
		if(substr($department->abbr,0,4)==='NUTR'){
			$department->title='Nutrition';
		}
		if(substr($department->abbr,0,3)==='HSC'){
			$department->title='High School 21+';
		}
		if(substr($department->abbr,0,3)==='ECE' && substr($department->abbr,0,4)!='ECED'){
			$department->title='Early Care Education';
		}
		if(substr($department->abbr,0,3)==='EDT'){
			$department->title='Emergency Department Tech';
		}
	}
	
	usort($departments, "cmp");
	
	db_set_active('default');
	return $departments;
}

function cmp($a, $b){
	return strcmp($a->title,$b->title);
}

//============================================================================
function _nscc_schedule_get_dept_initials($yrq){
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	$courses = array();
	
	$sql="select distinct substring(schedule.deptlist.dept_title from 1 for 1) as initial from schedule.deptlist where schedule.deptlist.yrq='%s' and not schedule.deptlist.dept_abbr='CSS' order by initial;";
	$result = db_query( $sql,$yrq);
	while($initial = db_fetch_object($result)){
		$initials[]=$initial->initial;
	}
	
	db_set_active('default');
	return $initials;
}

//============================================================================
function _nscc_schedule_get_instructorlist($yrq){
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	$instructors = array();
	
	$sql="SELECT il.instructor,snl.lname || ', ' || substring(snl.fname from 1 for 1) as fullname, upper(coalesce(snl.lname,il.instructor)) as sort_column from schedule.instructorlist as il left join schedule.netid_name_lookup as snl on lower(il.instructor) = lower(snl.netid_uname) where not il.instructor is null and il.instructor ~* '^[A-Z]' and not il.instructor LIKE 'CANCELLED%' and yrq='%s' order by sort_column asc;";
	$result = db_query( $sql,$yrq);
	while($instructor = db_fetch_object($result)){
		$instructors[]=$instructor;
	}
	
	db_set_active('default');
	return $instructors;
}

//============================================================================
function _nscc_schedule_get_instructor_classes($yrq,$instructor){
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	$courses = array();
	
	//$sql="SELECT * from class_details where yrq='%s' and rtrim(upper(instructor))=rtrim(upper('%s')) and cancelled=false order by course asc, 21 = any(tags) desc,day_or_night asc;";
  $sql="select cd.*, c_wd.desc_yrq,	wd2.web_description, cld.description from class_details as cd right join (select max(wd.eff_yrq) as desc_yrq, wd.course_id from web_descriptions as wd where wd.eff_yrq<='%s' group by wd.course_id) as c_wd on (cd.course = c_wd.course_id) left join web_descriptions as wd2 on (wd2.eff_yrq = c_wd.desc_yrq and wd2.course_id = c_wd.course_id) left join class_descriptions as cld on (cd.item=cld.item and cd.yrq=cld.eff_yrq) where yrq='%s' and rtrim(upper(instructor))=rtrim(upper('%s')) and cancelled=false order by course asc, 21 = any(tags) desc,day_or_night asc;";
	$result = db_query( $sql,$yrq,$yrq,$instructor);
	while($course = db_fetch_object($result)){
		$courses[]=$course;
	}
	
	db_set_active('default');
	return $courses;
}

//============================================================================
function _nscc_schedule_get_instructor_initials($yrq){
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	$courses = array();
	
	$sql="SELECT substring(upper(coalesce(snl.lname,il.instructor)) from 1 for 1) as initial from schedule.instructorlist as il left join schedule.netid_name_lookup as snl on lower(il.instructor) = lower(snl.netid_uname) where not il.instructor is null and il.instructor ~* '^[A-Z]' and not il.instructor LIKE 'CANCELLED%' and yrq='%s' order by initial asc;";
	$result = db_query( $sql,$yrq);
	while($initial = db_fetch_object($result)){
		$initials[]=$initial->initial;
	}
	
	db_set_active('default');
	return $initials;
}

//============================================================================
function _nscc_schedule_get_instructor_image($instructor){
	$sql = "SELECT picture FROM people_users where name='%s';";
	$picture_path = db_result(db_query($sql,$instructor));
	//watchdog('schedule','Image for "'.$instructor.'" is "'.$picture_path.'".');
	return $picture_path;
}



//============================================================================
function _nscc_schedule_get_dept_details($dept_id){
	_checkadd_schedule_db();
	db_set_active('class_schedule');

	$sql="SELECT dept_div as dept, title as title, dean as dean, blurb as blurb from schedule.dept_details where dept_div='%s';";
	$result = db_query($sql,$dept_id);
	$dept_details=db_fetch_object($result);

	db_set_active('default');
	return $dept_details;
}

//============================================================================
function _nscc_schedule_get_courses_of_dept($yrq,$dept_id){
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	$courses = array();
	
	if($dept_id==='ABE'){
		$sql="SELECT DISTINCT course from class_details where yrq='%s' and (dept='%s' or dept='%s'||'&' or dept='GED' or dept='GED'||'&' or dept='HSC' or dept='HSC'||'&') and cancelled=false order by course asc;";
	}
	
	else{		
		$sql="SELECT DISTINCT course from class_details where yrq='%s' and (dept='%s' or dept='%s'||'&') and cancelled=false order by course asc;";
	}
	
	$result = db_query( $sql,$yrq,$dept_id,$dept_id);
	while($course = db_fetch_object($result)){
		$courses[]=$course->course;
	}
	
	db_set_active('default');
	return $courses;
}

//============================================================================
function _nscc_schedule_get_items_of_dept($yrq,$dept_id){
	_checkadd_schedule_db();
	db_set_active('class_schedule');
	$classes = array();
	
	$sql="SELECT * from class_details where yrq='%s' and (dept='%s' or dept='%s'||'&') and cancelled=false order by course asc;";
	$sql = "select cd.*, c_wd.desc_yrq,	wd2.web_description, cld.description from class_details as cd right join (select max(wd.eff_yrq) as desc_yrq, wd.course_id from web_descriptions as wd where wd.eff_yrq<='%s' group by wd.course_id) as c_wd on (cd.course = c_wd.course_id) left join web_descriptions as wd2 on (wd2.eff_yrq = c_wd.desc_yrq and wd2.course_id = c_wd.course_id) left join class_descriptions as cld on (cd.item=cld.item and cd.yrq=cld.eff_yrq) where yrq='%s' and (dept='%s' or dept='%s'||'&') and cancelled=false order by course asc, 21 = any(tags) desc,day_or_night asc;";
	$result = db_query( $sql,$yrq,$yrq,$dept_id,$dept_id);
	while($class = db_fetch_object($result)){
		$classes[]=$class;
	}
	
	db_set_active('default');
	return $classes;
}

/****		Moved these to nscc_schedule.module to resolve scope issue w/ title callback.
//============================================================================
function _nscc_schedule_ds_decode($cipher){
	$plain = preg_replace('/@@@/','&',$cipher);
	return $plain;
}


//============================================================================
function _nscc_schedule_ds_encode($plain){
	$cipher = preg_replace('/&/','@@@',$plain);
	return $cipher;
}
*/

//============================================================================
function nscc_schedule_format_times($time_input){
	$time_output = preg_replace('/\s/','',$time_input);
	$time_output = preg_replace('/(\d\d)(\d\d)([A,P])-(\d\d)(\d\d)([A,P])/','$1:$2$3-$4:$5$6',$time_output);
	$time_output = preg_replace('/0(\d):(\d\d)([A,P])-0(\d):(\d\d)([A,P])/','$1:$2$3-$4:$5$6',$time_output);
	$time_output = preg_replace('/0(\d):(\d\d)([A,P])-(\d\d):(\d\d)([A,P])/','$1:$2$3-$4:$5$6',$time_output);
	$time_output = preg_replace('/(\d\d):(\d\d)([A,P])-0(\d):(\d\d)([A,P])/','$1:$2$3-$4:$5$6',$time_output);
	if(preg_match('/^\-$/',$time_output)){
		$time_output='';
	}
	return $time_output;
}

//============================================================================
function _nscc_schedule_dumbdate_to_unix_timestamp($dumbdate){
	$datestr = str_pad($dumbdate,8,'200',STR_PAD_LEFT);
	//watchdog('schedule','Datestr: '.$datestr);
	$datestr = preg_replace('/^(\d\d\d\d)(\d\d)(\d\d)$/','$3-$2-$1',$datestr);
	$timestamp = strtotime($datestr);
	return $timestamp;
}



