// $Id: nscc_schedule.manage.js,v 1.2 2007/12/08 14:06:22 goba Exp $

/**
* Bindings for the assign course tags table
* 
*/
Drupal.behaviors.nscc_schedule_course_tag_assignment = function(context) {
	
	$('table.assign-course-tags tbody tr').hover(
		function(){$(this).addClass('fancyhighlight');},
		function(){$(this).removeClass('fancyhighlight');}
	);
	

	$('table.assign-course-tags tbody tr td.tag-column').click(
		function(){
			if($(this).hasClass('status-working')){
				alert('Working');
			} else {
				$(this).addClass('status-working');
				if ($(this).hasClass('status-off')){
					$(this).removeClass('status-off');
					var status_goal_str = 'status-on';
				}
				if ($(this).hasClass('status-on')){
					$(this).removeClass('status-on');
					var status_goal_str = 'status-off';
				}	
				var yrq_code = $('#yrq').val();
				var target_cell_id = $(this).attr('id');
				var cell_id_array = target_cell_id.split('__'); 
				var tag_code = cell_id_array[1];
				var course_code = cell_id_array[0].replace(/sbctcsucks/,'&');			
				$.post('/manage/schedule/ajax_assign_course_tag',
					{ yrq: yrq_code, target_cell: target_cell_id, tag_id: tag_code, course_id: course_code, target_status: status_goal_str  },
					function(data){
						var Response = Drupal.parseJson(data);
						//alert(data);
						if(Response.success == 1){
							//alert("responding target:"+Response.target_cell);
							$('#'+Response.target_cell).removeClass('status-working');
							$('#'+Response.target_cell).addClass(Response.target_status);
						} else {
							alert('Oopsie!\nError:'+ Response.sql_error+'\nOn sql:'+Response.sql+'\nYrq:'+Response.yrq+'\nCourse_id:'+Response.course_id+'\nTag_id:'+Response.tag_id);
						}
					}				
				);
			}	
		}
	);

	$('#cluster-section').click(
		function(){
			if ($(this).hasClass('editable')){
				$(this).removeClass('editable');
				var cluster_section = $(this).text();
				$(this).empty();
				$(this).html('<input type="text" size="3" maxlength="3" name="cluster-section-input" id="cluster-section-input" value="'+cluster_section+'">');
				$('#cluster-section-input').focus();
				$('#cluster-section-input').blur(function(){
					var proposed_section = $(this).val();
					if(cluster_section != proposed_section){
						$('#ajax-status').removeClass('error');
						$('#ajax-status').addClass('working');
						$('#ajax-status').text('Updating the Section Code');
						$.post( document.URL + '/ajax_update_section',
							{ section: proposed_section },
							function(data){
								$('#ajax-status').removeClass('working');
								var Response = Drupal.parseJson(data);
								if(Response.success == 1){
									$('#cluster-section').addClass('editable');
									$('#cluster-section').empty();
									$('#cluster-section').text(Response.new_section);
									$('#ajax-status').text(Response.log_entry);
								} else {
									$('#cluster-section').empty();
									$('#cluster-section').text(cluster_section);
									$('#cluster-section').addClass('editable');
									$('#ajax-status').addClass('error');
									$('#ajax-status').text(Response.log_entry);
								}
							}				
						);
					} else {
						$('#cluster-section').addClass('editable');
						$('#cluster-section').empty();
						$('#cluster-section').text(cluster_section);
					}	
				});
			}
		}
	);
	$('#cluster-title').click(
		function(){
			if ($(this).hasClass('editable')){
				$(this).removeClass('editable');
				var cluster_title = $(this).text();
				$(this).empty();
				$(this).html('<input type="text" size="60" maxlength="200" name="cluster-title-input" id="cluster-title-input" value="'+cluster_title+'">');
				$('#cluster-title-input').focus();
				$('#cluster-title-input').blur(function(){
					var proposed_title = $(this).val();
					if(cluster_title != proposed_title){
						$('#ajax-status').removeClass('error');
						$('#ajax-status').addClass('working');
						$('#ajax-status').text('Updating the Course Title');
						$.post( document.URL + '/ajax_update_title',
							{ title: proposed_title },
							function(data){
								$('#ajax-status').removeClass('working');
								var Response = Drupal.parseJson(data);
								if(Response.success == 1){
									$('#cluster-title').addClass('editable');
									$('#cluster-title').empty();
									$('#cluster-title').text(Response.new_title);
									$('#ajax-status').text(Response.log_entry);
								} else {
									$('#cluster-title').addClass('editable');
									$('#cluster-title').empty();
									$('#cluster-title').text(cluster_title);
									$('#ajax-status').addClass('error');
									$('#ajax-status').text(Response.log_entry);
								}
							}				
						);
					} else {
						$('#cluster-title').addClass('editable');
						$('#cluster-title').empty();
						$('#cluster-title').text(cluster_title);
					}
				});
			}
		}
	);
	$('#cluster-description').click(
		function(){
			if ($(this).hasClass('editable')){
				$(this).removeClass('editable');
				var cluster_description = $(this).html();
				$(this).empty();
				$(this).html('<div><textarea rows="5" cols="80" name="cluster-description-input" id="cluster-description-input">'+cluster_description+'</textarea>');
				$('#cluster-description-input').focus();
				$('#cluster-description-input').tinymce({
					script_url : '/sites/all/modules/nscc_schedule/tinymce/jscripts/tiny_mce/tiny_mce.js',
					theme : "advanced",
					plugins : "inlinepopups,paste",
					dialog_type : "modal",
					paste_auto_cleanup_on_paste : true,
					theme_advanced_toolbar_location : "top",
          theme_advanced_toolbar_align : "left",
          theme_advanced_statusbar_location : "bottom",
          theme_advanced_resizing : true,
          theme_advanced_buttons1 : "bold,italic,underline,|,bullist,numlist,|,link,unlink,|,pasteword,code",
          theme_advanced_buttons2 : "",
          theme_advanced_buttons3 : "",
          theme_advanced_buttons4 : "",
          theme_advanced_path : false,
          apply_source_formatting : true,
          //content_css : "/sites/all/themes/nscc_960/css/tiny-mce.css",
				});
				$(this).prepend('<a class="update-button" id="update-cluster-description" "href="javascript:;" >Update Course Description</a>');
				$('#update-cluster-description').click(function(event){
					event.stopPropagation();
					var proposed_description = $('#cluster-description-input').val();
					$('#cluster-description-input').tinymce().hide();
					if(cluster_description != proposed_description){
						$('#ajax-status').removeClass('error');
						$('#ajax-status').addClass('working');
						$('#ajax-status').text('Updating the Course Description');
						$.post(	document.URL+'/ajax_update_desc',
							{description: proposed_description},
							function (data){
								$('#ajax-status').removeClass('working');
								var Response = Drupal.parseJson(data);
								if(Response.success == 1){
									$('#cluster-description').addClass('editable');
									$('#cluster-description').empty();
									$('#cluster-description').html(Response.new_description);
									$('#ajax-status').text(Response.log_entry);
								} else {
									$('#cluster-description').addClass('editable');
									$('#cluster-description').empty();
									$('#cluster-description').html(cluster_description);
									$('#ajax-status').addClass('error');
									$('#ajax-status').text(Response.log_entry);
								}
							}
						);		
					} else {
						$('#cluster-description').addClass('editable');
						$('#cluster-description').empty();
						$('#cluster-description').html(cluster_description);
					}
				});
			}
		}
	);
	
	$('#registration-regs').click(
		function(){
			if ($(this).hasClass('editable')){
				$(this).removeClass('editable');
				var old_reg_regs = $(this).html();
				$(this).empty();
				$(this).html('<textarea rows="5" cols="80" name="registration-regs-input" id="registration-regs-input">'+old_reg_regs+'</textarea>');
				$('#registration-regs-input').focus();
				$('#registration-regs-input').tinymce({
					script_url : '/sites/all/modules/nscc_schedule/tinymce/jscripts/tiny_mce/tiny_mce.js',
					theme : "advanced",
					plugins : "inlinepopups,paste",
					dialog_type : "modal",
					paste_auto_cleanup_on_paste : true,
					theme_advanced_toolbar_location : "top",
          theme_advanced_toolbar_align : "left",
          theme_advanced_statusbar_location : "bottom",
          theme_advanced_resizing : true,
          theme_advanced_buttons1 : "bold,italic,underline,|,bullist,numlist,|,link,unlink,|,pasteword,code",
          theme_advanced_buttons2 : "",
          theme_advanced_buttons3 : "",
          theme_advanced_buttons4 : "",
          theme_advanced_path : false,
          apply_source_formatting : true,
          //content_css : "/sites/all/themes/nscc_960/css/tiny-mce.css",
				});
				$(this).prepend('<a class="update-button" id="update-cluster-reg-regs" "href="javascript:;" >Update Enrollment Requirements</a>');
				$('#update-cluster-reg-regs').click(function(event){
					event.stopPropagation();
					var proposed_rr = $('#registration-regs-input').val();
					$('#registration-regs-input').tinymce().hide();
					if(old_reg_regs != proposed_rr){
						$('#ajax-status').removeClass('error');
						$('#ajax-status').addClass('working');
						$('#ajax-status').text('Updating the Enrollment Requirements');
						$.post(	document.URL+'/ajax_update_rr',
							{ reg_regs: proposed_rr },
							function (data){
								$('#ajax-status').removeClass('working');
								var Response = Drupal.parseJson(data);
								if(Response.success == 1){
									$('#registration-regs').addClass('editable');
									$('#registration-regs').empty();
									$('#registration-regs').html(Response.new_reg_regs);
									$('#ajax-status').text(Response.log_entry);
								} else {
									$('#registration-regs').addClass('editable');
									$('#registration-regs').empty();
									$('#registration-regs').html(old_reg_regs);
									$('#ajax-status').addClass('error');
									$('#ajax-status').text(Response.log_entry);
								}
							}
						);		
					} else {
						$('#registration-regs').addClass('editable');
						$('#registration-regs').empty();
						$('#registration-regs').html(old_reg_regs);
					}
				});
				
			}
		}
	);
	
	
	$('#link-title').click(
		function(){
			if ($(this).hasClass('editable')){
				$(this).removeClass('editable');
				var link_title = $(this).text();
				$(this).empty();
				$(this).html('<input type="text" size="60" maxlength="200" name="link-title-input" id="link-title-input" value="'+link_title+'">');
				$('#link-title-input').focus();
				$('#link-title-input').blur( function(){
					var proposed_title = $(this).val();
					if(link_title != proposed_title){
						$('#ajax-status').removeClass('error');
						$('#ajax-status').addClass('working');
						$('#ajax-status').text('Updating the Link Title');
						$.post( document.URL + '/ajax_update_title',
							{ title: proposed_title },
							function(data){
								$('#ajax-status').removeClass('working');
								var Response = Drupal.parseJson(data);
								if(Response.success == 1){
									$('#link-title').addClass('editable');
									$('#link-title').empty();
									$('#link-title').text(Response.new_title);
									$('#ajax-status').text(Response.log_entry);
								} else {
									$('#link-title').addClass('editable');
									$('#link-title').empty();
									$('#link-title').text(link_title);
									$('#ajax-status').addClass('error');
									$('#ajax-status').text(Response.log_entry);
								}
							}				
						);
					} else {
						$('#link-title').addClass('editable');
						$('#link-title').empty();
						$('#link-title').text(link_title);
					}
				});
			}
		}
	);
	$('#link-description').click(
		function(){
			if ($(this).hasClass('editable')){
				$(this).removeClass('editable');
				var link_description = $(this).html();
				$(this).empty();
				$(this).html('<div><textarea rows="5" cols="80" name="link-description-input" id="link-description-input">'+link_description+'</textarea>');
				$('#link-description-input').focus();
				$('#link-description-input').tinymce({
					script_url : '/sites/all/modules/nscc_schedule/tinymce/jscripts/tiny_mce/tiny_mce.js',
					theme : "advanced",
					plugins : "inlinepopups,paste",
					dialog_type : "modal",
					paste_auto_cleanup_on_paste : true,
					theme_advanced_toolbar_location : "top",
          theme_advanced_toolbar_align : "left",
          theme_advanced_statusbar_location : "bottom",
          theme_advanced_resizing : true,
          theme_advanced_buttons1 : "bold,italic,underline,|,bullist,numlist,|,link,unlink,|,pasteword,code",
          theme_advanced_buttons2 : "",
          theme_advanced_buttons3 : "",
          theme_advanced_buttons4 : "",
          theme_advanced_path : false,
          apply_source_formatting : true,
          //content_css : "/sites/all/themes/nscc_960/css/tiny-mce.css",
				});
				$(this).prepend('<a class="update-button" id="update-link-description" "href="javascript:;" >Update Link Description</a>');
				$('#update-link-description').click(function(event){
					event.stopPropagation();
					var proposed_description = $('#link-description-input').val();
					$('#link-description-input').tinymce().hide();
					if(link_description != proposed_description){
						$('#ajax-status').removeClass('error');
						$('#ajax-status').addClass('working');
						$('#ajax-status').text('Updating the Link Description');
						$.post(	document.URL+'/ajax_update_desc',
							{description: proposed_description},
							function (data){
								$('#ajax-status').removeClass('working');
								var Response = Drupal.parseJson(data);
								if(Response.success == 1){
									$('#link-description').addClass('editable');
									$('#link-description').empty();
									$('#link-description').html(Response.new_description);
									$('#ajax-status').text(Response.log_entry);
								} else {
									$('#link-description').addClass('editable');
									$('#link-description').empty();
									$('#link-description').html(link_description);
									$('#ajax-status').addClass('error');
									$('#ajax-status').text(Response.log_entry);
								}
							}
						);		
					} else {
						$('#link-description').addClass('editable');
						$('#link-description').empty();
						$('#link-description').html(link_description);
					}
				});

			}
		}
	);
	
  $('#link-reg-reqs').click(
		function(){
			if ($(this).hasClass('editable')){
				$(this).removeClass('editable');
				var link_reg_regs = $(this).html();
				$(this).empty();
				$(this).html('<textarea rows="5" cols="80" name="link-reg-reqs-input" id="link-reg-reqs-input">'+link_reg_regs+'</textarea>');
				$('#link-reg-reqs-input').focus();
				
				$('#link-reg-reqs-input').tinymce({
					script_url : '/sites/all/modules/nscc_schedule/tinymce/jscripts/tiny_mce/tiny_mce.js',
					theme : "advanced",
					plugins : "inlinepopups,paste",
					dialog_type : "modal",
					paste_auto_cleanup_on_paste : true,
					theme_advanced_toolbar_location : "top",
          theme_advanced_toolbar_align : "left",
          theme_advanced_statusbar_location : "bottom",
          theme_advanced_resizing : true,
          theme_advanced_buttons1 : "bold,italic,underline,|,bullist,numlist,|,link,unlink,|,pasteword,code",
          theme_advanced_buttons2 : "",
          theme_advanced_buttons3 : "",
          theme_advanced_buttons4 : "",
          theme_advanced_path : false,
          apply_source_formatting : true,
          //content_css : "/sites/all/themes/nscc_960/css/tiny-mce.css",
				});
				$(this).prepend('<a class="update-button" id="update-link-reg_regs" "href="javascript:;" >Update Enrollment Requirements</a>');
				$('#update-link-reg_regs').click(function(event){
					event.stopPropagation();
					var proposed_rr = $('#link-reg-reqs-input').val();
					$('#link-reg-reqs-input').tinymce().hide();
					if(link_reg_regs != proposed_rr){
						$('#ajax-status').removeClass('error');
						$('#ajax-status').addClass('working');
						$('#ajax-status').text('Updating the Enrollment Requirements');
						$.post(	document.URL+'/ajax_update_rr',
							{ reg_regs: proposed_rr },
							function (data){
								$('#ajax-status').removeClass('working');
								var Response = Drupal.parseJson(data);
								if(Response.success == 1){
									$('#link-reg-reqs').addClass('editable');
									$('#link-reg-reqs').empty();
									$('#link-reg-reqs').html(Response.new_reg_regs);
									$('#ajax-status').text(Response.log_entry);
								} else {
									$('#link-reg-reqs').addClass('editable');
									$('#link-reg-reqs').empty();
									$('#link-reg-reqs').html(link_reg_regs);
									$('#ajax-status').addClass('error');
									$('#ajax-status').text(Response.log_entry);
								}
							}
						);		
					} else {
						$('#link-reg-reqs').addClass('editable');
						$('#link-reg-reqs').empty();
						$('#link-reg-reqs').html(link_reg_regs);
					}
				});

			}
		}
	);
	function bind_items(){
		$('ul.deleteable > li').click(
			function(event){
				var item_li_id = $(this).attr('id');
				//nb: item_li_id = 'item_'+yrq+'_'+item_num
				id_match = /item_(\w\w\w\w)_(\d\d\d\d)/g;
				var matches = id_match.exec(item_li_id);
				var yrq_code = matches[1];
				var item_num = matches[2];
				//alert('yrq: '+yrq_code+'\nitem_num: '+item_num);
				$('#ajax-status').removeClass('error');
				$('#ajax-status').addClass('working');
				$('#ajax-status').text('Removing Item '+item_num+' from the Link');
				$.post(
					document.URL + '/ajax_remove_item',
					{ yrq: yrq_code, item: item_num},
					function(data){
						var Response = Drupal.parseJson(data);
						$('#ajax-status').removeClass('working');
						if(Response.success == 1){
							$('#ajax-status').text(Response.log_entry);
							$('#'+Response.remove_item).fadeOut();
						}else{
							$('#ajax-status').addClass('error');
							$('#ajax-status').text(Response.log_entry);
						}	
					}
				);
			}
		);
	}
	bind_items();
	
	$('#add-item-button').click(
		function(event){
			var yrq_code = $('#add-item-yrq').val();
			var add_item = $('#add-item-textbox').val();
			$('#ajax-status').removeClass('error');
			$('#ajax-status').addClass('working');
			$('#ajax-status').text('Adding Item '+add_item+' to the Link');
			$.post(
				document.URL + '/ajax_add_item',
				{ yrq: yrq_code, item: add_item},
				function(data){
					var Response = Drupal.parseJson(data);
					$('#ajax-status').removeClass('working');
					if(Response.success == 1){
						//$('#schedule-lc-course-items > ul.deleteable').slideUp();
						$('#schedule-lc-course-items > ul.deleteable').html(Response.new_item_list);
						//$('#schedule-lc-course-items > ul.deleteable').slideDown();
						bind_items();
						$('#add-item-textbox').val('');
						$('#ajax-status').text(Response.log_entry);
					}else{
						$('#ajax-status').addClass('error');
						$('#ajax-status').text(Response.log_entry);
					}	
				}
			);			
		}
	);

	$('#add-cs-button').click(
		function(event){
			if($('#unused-clusters').val()==0 || $('#new-section').val()=='' ||$('#new-title').val()=='' ){
				alert('Cluster, Section, and Title are required to add a new course');
			} else {
				//post addition
				$.post(
					document.URL + '/ajax_add_cs_course',
					{unused_clusters: $('#unused-clusters').val(), new_section: $('#new-section').val(), new_title: $('#new-title').val() },
					function(data){
						var Response = Drupal.parseJson(data);
						if(Response.success == 1){
							var destination = document.URL + Response.redirect_to;
							window.location.href = destination;
						}else{
							alert(Response.log_entry);
						}	
					}
				);
			}				
			return false;
		}
	);

	$('#delete-cs-course').click(
		function(event){
			$.post(
				document.URL+'/ajax_delete_course',
				{},
				function(data){
					var Response = Drupal.parseJson(data);
					if(Response.success == 1){
							var destination = document.URL + '/../..';
							window.location.href = destination;						
					}else{
						alert(Response.log_entry);
					}	
				}
			);
		}
	);

	$('#add-lc-button').click(
		function(event){
			if($('#new-link').val()=='' ||$('#new-link-title').val()=='' ){
				alert('Link ID and Title are required to add a new linked course');
			} else {
				//post addition
				$.post(
					document.URL + '/ajax_add_lc_course',
					{new_link: $('#new-link').val(), new_title: $('#new-link-title').val() },
					function(data){
						var Response = Drupal.parseJson(data);
					  if(Response.success == 1){
							var destination = document.URL + Response.redirect_to;
							window.location.href = destination;
						}else{
							alert(Response.log_entry);
						}	
					}
				);
			}				
			return false;
		}
	);

	$('#delete-lc-course').click(
		function(event){
			$.post(
				document.URL+'/ajax_delete_course',
				{},
				function(data){
					var Response = Drupal.parseJson(data);
					if(Response.success == 1){
							var destination = document.URL + '/../..';
							window.location.href = destination;						
					}else{
						alert(Response.log_entry);
					}	
				}
			);
		}
	);

	$('div.ocm-cell').click(
		function(event){
			if ($(this).hasClass('editable')){
				$(this).removeClass('editable');
				var target_ocm_div = $(this);
				var old_ocm = $(this).text();
				$(this).html('<input type="text" size="60" maxlength="200" name="ocm-input" id="ocm-input" value="'+old_ocm+'">');
				$('#ocm-input').focus();
				$('#ocm-input').blur(
					function(){
						var proposed_ocm = $(this).val();
						var ocm_cell_id = target_ocm_div.attr('id');
						var cell_id_array = ocm_cell_id.split('_'); 
						var yrq_code = cell_id_array[1];
						var item_code = cell_id_array[2];
						$('#ajax-status').removeClass('error');
						$('#ajax-status').addClass('working');
						$('#ajax-status').text('Updating the On Campus Meeting for item '+item_code+'...');
						if(old_ocm != proposed_ocm){
								//post and retrieve change
							$.post( 
								document.URL + '/ajax_update',
								{ item: item_code, ocm: proposed_ocm },
								function(data){
									$('#ajax-status').removeClass('working');
									var Response = Drupal.parseJson(data);
									if(Response.success == 1){
										target_ocm_div.addClass('editable');
										target_ocm_div.empty();
										target_ocm_div.text(proposed_ocm);
										$('#ajax-status').text(Response.log_entry);
									} else {
										target_ocm_div.addClass('editable');
										target_ocm_div.empty();
										target_ocm_div.text(old_ocm);
										$('#ajax-status').addClass('error');
										$('#ajax-status').text(Response.log_entry);
									}				
								}
							);
						} else{
							target_ocm_div.addClass('editable');
							target_ocm_div.empty();
							target_ocm_div.text(old_ocm);
						}
					}
				);
			}	
		}
	);


};