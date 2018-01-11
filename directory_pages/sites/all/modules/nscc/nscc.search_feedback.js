$(function() {

	 $('input#edit-solution-yn-0').click(function(){
			$.post(
				'/ajax/nsccsearchfeedback',
				$("#nscc-search-feedback-form").serialize(),
				function(data){
					returnJson = Drupal.parseJson(data);
					if(returnJson.return_code){
						$('div#block-nscc-12 div.block-inner div.content').html('<div class="nscc-search-feedback-form-response true-response"><h2 class="nscc-search-feedback-form-title">SmartAlec SearchPoint</h2><p>Thank you!</p><p>We appreciate your help improving our search function.</p><div class="clearfix">&nbsp;</div></div>');
						setTimeout(function(){$('div.nscc-search-feedback-form-response').fadeOut();},6000);
					} else {
						//alert(returnJson.return_message);
					}	
				}
			);	
	 });
	 $('input#edit-solution-yn-1').click(function(){
			$.post(
				'/ajax/nsccsearchfeedback',
				$("#nscc-search-feedback-form").serialize(),
				function(data){
					returnJson = Drupal.parseJson(data);
					if(returnJson.return_code){
						$('div#block-nscc-12 div.block-inner div.content').html('<div class="nscc-search-feedback-form-response false-response"><h2 class="nscc-search-feedback-form-title">SmartAlec SearchPoint</h2> <p>We\'re sorry our search robot failed you. It will be forcibly &quot;improved&quot; based on your input.</p><p>Please make use of our <a href="/contact">Contact Form</a> to ask your specific question.</p><div class="clearfix">&nbsp;</div></div>');
						setTimeout(function(){$('div.nscc-search-feedback-form-response').fadeOut();},10000);
					} else {
						//alert(returnJson.return_message);
					}	
				}
			);	
	});
	$('input#edit-solution-yn-2').click(function(){
		$.post(
			'/ajax/nsccsearchfeedback',
			$("#nscc-search-feedback-form").serialize(),
			function(data){
				returnJson = Drupal.parseJson(data);
				if(returnJson.return_code){
					$('#block-nscc-12').fadeOut('fast', function(){
						//$(this).remove();
					});
				} else {
					console.log(returnJson.return_message);
				}
			}
		);
	});

});