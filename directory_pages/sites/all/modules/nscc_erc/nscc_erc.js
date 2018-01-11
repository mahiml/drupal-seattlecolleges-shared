Drupal.behaviors.nscc_erc_readerboard_request = function(context) {
	$("#edit-event-name").change(function(){
			var target_text = $("#edit-event-name").val().substr(0,16);
			var target_text = trim(target_text);
			$("#edit-line-1").val(target_text);
			update_preview_row(1);
	});
	$("#edit-event-date-month").change(function(){
		prefill_date();
	});
	$("#edit-event-date-day").change(function(){
		prefill_date();
	});
	$("#edit-event-date-year").change(function(){
		prefill_date();
	});

	$("#edit-line-1").keyup(function(){update_preview_row(1);});
	$("#edit-line-2").keyup(function(){update_preview_row(2);});
	$("#edit-line-3").keyup(function(){update_preview_row(3);});

	$('#nscc-erc-readerboard-form').submit(function(e) {
		if ($(this).attr('submitted') == 'submitted') {
			e.preventDefault();
			e.stopPropagation();
			return false;
		} else {
			$('#edit-send-request').replaceWith('<p class="form-submit-working">Working, please wait…</p>');
			$(this).attr('submitted', 'submitted');
		}
	});



	function prefill_date(){
		var target_date = new Date($("#edit-event-date-year").val(),$("#edit-event-date-month").val() - 1 ,$("#edit-event-date-day").val(),null,null,null,null);
		$("#edit-line-2").val(target_date.toString().substr(0,10) );
		update_preview_row(2);
	}

	function update_preview_row(row){
		var linetext = $("#edit-line-"+row).val();
		var linelength = linetext.length;
		var output="";
		for( index=0;index<linelength;index++){
 				$("#r"+row+"c"+(index+1)).text(linetext.substr(index,1).toUpperCase());
		}
		for(cleanindex = index; cleanindex<16;cleanindex++){
 				$("#r"+row+"c"+(cleanindex+1)).text(" ");			
		}	
	}

	function trim(s){
		var l=0; var r=s.length -1;
		while(l < s.length && s[l] == ' '){
			l++; 
		}
		while(r > l && s[r] == ' '){
			r-=1;
		}
		return s.substring(l, r+1);
	}

};