// $Id: nscc_profile.instructor_Schedule.js,v 1.2 2007/12/08 14:06:22 goba Exp $

/**
* Bindings for the next and previous quarter buttons
* in the instructor class schedule block.
*/
Drupal.behaviors.nscc_profile_inst_class_sched_block = function(context) {
		$("#inst_class_sched_p_yrq").bind('click',function (){$("#instructor_schedule_quarter_display").addClass('throbber');$.get('/ajax/instructor_class_schedule/' + $("#class_instructor").val() +'/' + $('#class_prev_yrq').val(),null,grab_block);update_popup_links();return false;});
		$('#inst_class_sched_n_yrq').bind('click',function (){$("#instructor_schedule_quarter_display").addClass('throbber');$.get('/ajax/instructor_class_schedule/' + $("#class_instructor").val() +'/' + $('#class_next_yrq').val(),null,grab_block);update_popup_links();return false;});
	
		var grab_block = function(data){
			var result = Drupal.parseJson(data);
			
			$("#instructor_schedule_quarter_display").html(result['instructor_class_schedule']);
			$("#instructor_schedule_quarter_display").fadeIn('normal');
			if(result['hide_prev']){
				$("#inst_class_sched_p_yrq").hide();
			}else{
				$("#inst_class_sched_p_yrq").show();
			}	
			if(result['hide_next']){
				$("#inst_class_sched_n_yrq").hide();
			}else{
				$("#inst_class_sched_n_yrq").show();
			}
		}

		function update_popup_links(){
			$("#instructor_schedule_quarter_display").removeClass('throbber');
		}

};