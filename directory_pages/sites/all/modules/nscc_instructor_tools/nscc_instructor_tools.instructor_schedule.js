// $Id: nscc_instructor_tools.instructor_schedule.js,v 1.2 2007/12/08 14:06:22 goba Exp $

Drupal.behaviors.nscc_instructor_tools_inst_class_sched_block = function(context) {

	/**
	* Bindings for the next and previous quarter buttons
	* in the instructor class schedule block.
	*/
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

Drupal.behaviors.nscc_instructor_tools_picker_page = function(context) {

		$("#inst_class_picker_p_yrq").bind('click',function (){$("#instructor_picker_quarter_display").addClass('throbber');$.get('/ajax/instructor_tools/class_picker/' + $("#picker_instructor").val() +'/' + $('#picker_prev_yrq').val(),null,fill_picker);unthrob_picker();return false;});
		$('#inst_class_picker_n_yrq').bind('click',function (){$("#instructor_picker_quarter_display").addClass('throbber');$.get('/ajax/instructor_tools/class_picker/' + $("#picker_instructor").val() +'/' + $('#picker_next_yrq').val(),null,fill_picker);unthrob_picker();return false;});


		var fill_picker = function(data){
			var result = Drupal.parseJson(data);
			
			$("#instructor_picker_quarter_display").html(result['instructor_class_picker']);
			$("#instructor_picker_quarter_display").fadeIn('normal');
			if(result['hide_prev']){
				$("#inst_class_picker_p_yrq").hide();
			}else{
				$("#inst_class_picker_p_yrq").show();
			}	
			if(result['hide_next']){
				$("#inst_class_picker_n_yrq").hide();
			}else{
				$("#inst_class_picker_n_yrq").show();
			}

		}

		function unthrob_picker(){
			$("#instructor_picker_quarter_display").removeClass('throbber');
		}

};	

Drupal.behaviors.nscc_instructor_tools_details_form = function(context) {

	$("#add_student").css('display', 'none');
	$("#edit-move-destination-wrapper").css('display', 'none');
	$("#edit-enrollment-reason-wrapper").css('display', 'none');
	$("#edit-enrollment-reason-other-wrapper").css('display', 'none');
	$('#edit-enr-trans-existing').css('display', 'none');

	//alert("Action Value is: "+$("#edit-enrollment-action").val());
	setupform( $("#edit-enrollment-action") );

	//these set the roster to be pretty and clickable and stuff
	$("a.roster-mailto").click(function(event){
			event.stopPropagation();
	});
	$(".roster-entry, .waitlist-entry").hover(function(){
		$(this).addClass("active");
	},
	function(){
		$(this).removeClass("active");
	});
	//try to stop clicking on textboxes propogating to checkbox
	$("div#not-waitlist-add").click(function(event){
			event.stopPropagation();
	});	
	$("div#not-waitlist-add input").click(function(event){
			event.stopPropagation();
	});	

	$(".roster-entry, .waitlist-entry").click(function(){
		$(this).toggleClass("selected-student");
		var target_checkbox = $(this).find('.form-checkbox');
		if($(this).hasClass('selected-student')){
			target_checkbox.attr('checked','checked');
			target_checkbox.val(1);
			if(target_checkbox.attr('id')=='edit-waiter-new'){
				$("div#not-waitlist-add").show();
			}
		} else {
			target_checkbox.removeAttr('checked');
			target_checkbox.val(0);
			if(target_checkbox.attr('id')=='edit-waiter-new'){
				$("div#not-waitlist-add").hide();
			}
		}
	});
	/*
	$(".roster-entry .form-checkbox").click(function(event){
			event.stopPropagation();
			alert('clicked on: '+$(this).attr('id'));
			$(this).closest('tr.waitlist-entry, tr.roster-entry').click();
	});
	*/
	$('div#not-waitlist-add').click(function(){
		event.stopPropagation();
	});


	$("#edit-enrollment-action").change(function() {
		setupform($(this));
	});


	function setupform(enrollment_action){
		var reason_options='';
		switch(enrollment_action.val()){
			case '':
				$('table.roster').show();
				$("#add_student").hide();
				$("#edit-move-destination-wrapper").hide();
				$("#edit-enrollment-reason-wrapper").hide();
				$('#edit-enr-trans-existing').val('Submit');
				$('#edit-enr-trans-existing').hide();
			break;
			case 'add':
				reason_options = '<option value="">Specify a reason for this action</option><option value="overload">Overload</option><option value="permission">Permission</option><option value="prereq">Approved Prerequisite</option><option value="other">Other...</option>';
				$('table.roster').hide();
				$("#add_student").show();
				$("#edit-enrollment-reason").html(reason_options);
				$("#edit-enrollment-reason-wrapper").show();
				$('#edit-enr-trans-existing').val( ucfirst(enrollment_action.val())+' this Student');
				$('#edit-enr-trans-existing').show();
			break;
			case 'drop':
				reason_options = '<option value="">Specify a reason for this action</option><option value="no-show">Non-attendance</option><option value="other">Other...</option>';
				$('table.roster').show();
				$("#add_student").hide();
				$("#edit-enrollment-reason").html(reason_options);
				$("#edit-enrollment-reason-wrapper").show();
				$("#edit-move-destination-wrapper").hide();
				$('#edit-enr-trans-existing').val('Drop these Students');
				$('#edit-enr-trans-existing').show();
			break;
			case 'audit':
			case 'credit':
				reason_options = '<option value="">Specify a reason for this action (Optional)</option><option value="other">Other...</option>';
				$('table.roster').show();
				$("#add_student").hide();
				$("#edit-enrollment-reason").html(reason_options);
				$("#edit-enrollment-reason-wrapper").show();
				$("#edit-move-destination-wrapper").hide();
				$('#edit-enr-trans-existing').val('Update these Students');
				$('#edit-enr-trans-existing').show();
			break;
			case 'move':
				reason_options = '<option value="">Specify a reason for this action</option><option value="split">Class has split</option><option value="new_section">New Section Opened</option><option value="other">Other...</option>';
				$('table.roster').show();
				$("#add_student").hide();
				$("#edit-move-destination-wrapper").show();
				$("#edit-enrollment-reason-wrapper").hide();
				$("#edit-enrollment-reason").html(reason_options);
				$('#edit-enr-trans-existing').val('Transfer these Students');
				$('#edit-enr-trans-existing').show();
			break;
		}

	}

	$("#edit-move-destination").change(function() {
		switch($(this).val()){
			case '':
				$("#edit-enrollment-reason-wrapper").hide();
			break;
			default:
			 $("#edit-enrollment-reason-wrapper").show();
		}
	});

	$("#edit-enrollment-reason").change(function() {
		switch($(this).val()){
			case 'other':
				$("#edit-enrollment-reason-other-wrapper").show();
			break;
			default:
			 $("#edit-enrollment-reason-other-wrapper").hide();
		}
	});


	function ucfirst(str) {
			var firstLetter = str.substr(0, 1);
			return firstLetter.toUpperCase() + str.substr(1);
	}
	
};

Drupal.behaviors.nscc_instructor_enr_trans_form = function(context) {

	$('div.enr-trans-subform-deny').hide();

	$('#edit-deny').click( function(){ $('div.enr-trans-subform-deny').show(); return false;} );
	$('#edit-deny-cancel').click( function(){	$('div.enr-trans-subform-deny').hide(); return false;} );
	
};
