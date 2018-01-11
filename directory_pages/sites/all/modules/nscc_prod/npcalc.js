/*		Behavioral enhancements for Net Price Calculator		*/

Drupal.behaviors.net_price_calculator = function(context) {
	var report = $('#npcalc-results');
	var form = $('#npcalc-form');
	var ack = $('#edit-caveat-ack');
	var noticeLegend = ack.parents('fieldset');
	var btnReset = $('<button type="button" id="btn-reset">New Estimate</button>');
	var toggleFieldsets = function(){
		if (ack.is(':checked')) {
			$('fieldset').not(':visible, :first').fadeIn('fast', function(){
				$('#edit-submit').show('fast', function(){
					noticeLegend.fadeOut('slow', function(){
						$('#edit-age').focus();
					});
				});
			});
		}
	};

	if (report.length > 0) {
		btnReset.click(function(){
			report.parent().fadeOut('slow', function(){
				form.fadeIn('slow', function(){
					if (ack.is(':checked')) {
						toggleFieldsets();
					}
					btnReset.hide();
				});
			});
		});
		form.hide();
		form.parent().after(btnReset);
		//$('.messages').removeAttr('class');
	}

	$('#edit-caveat-ack').click(toggleFieldsets);	
	$('fieldset').filter(':not(:first)').hide();
	$('#edit-submit').hide();
	toggleFieldsets();
}