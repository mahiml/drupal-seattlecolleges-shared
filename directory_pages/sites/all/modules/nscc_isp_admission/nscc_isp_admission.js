

// Utility: Determines CC type based on ISO/IEC 7812 standards.
function getCCType(pan) {
	if (pan.match(/^(?:34|37)\d{13}$/)) { return 'American Express'; }
	if (pan.match(/^(?:6011\d{12}|65\d{14}|64[4-9]\d{13})$/)) { return 'Discover'; }
	if (pan.length == 16 && pan.substr(0, 6) >= 622126 && pan.substr(0, 6) <= 622925) { return 'Discover'; }
	if (pan.match(/^30[0-5]\d{11}$/)) { return 'Diners Club'; }
	if (pan.match(/^(?:2014|2149)\d{11}$/)) { return 'Diners Club'; }
	if (pan.length == 16 && pan.substr(0, 4) >= 3528 && pan.substr(0, 4) <= 3589) { return 'JCB'; }
	if (pan.match(/^5[1-5]\d{14}$/)) { return 'MasterCard'; }
	if (pan.match(/^36\d{12}$/)) { return 'Diners Club'; }
	if (pan.match(/^4\d{15}$/)) { return 'Visa'; }
	return 'Indeterminate';
}

// Helper: Validate CC number, determine type, and add indicator.
function checkCCNum(elem) {
	elem.nextAll('img').remove();
	var imgPath = '/sites/all/modules/nscc_isp_admission/imgs/';
	var ccType  = 'Not Accepted';
	var ccImg = 'cc-logos/indeterminate.png';
	var sum = 0;
	var mul = 1;
	var digit = null;
	var tproduct = 0;
	var pan = elem.val();
	var validPan = false;
	pan = pan.replace(/\D+/g, '');
	if (pan.length <= 19 && pan.length >= 12) {
		ccType = getCCType(pan);
		ccType == 'Indeterminate' ? 'Not Accepted' : ccType;
		ccImg = ccType.toLowerCase();
		ccImg = 'cc-logos/' + ccImg.replace(/\s/, '-') + '.png';
		for (var i = 0; i < pan.length; i++) {
			digit = pan.substring(pan.length - i - 1, pan.length - i);
			tproduct = parseInt(digit, 10) * mul;
			if (tproduct >= 10) {
				sum += (tproduct % 10) + 1;
			} else {
				sum += tproduct;
			}
			if (mul == 1) {
				mul++;
			} else {
				mul--;
			}
		}
		validPan = (sum % 10 == 0);
		if (validPan === true) {
			elem.after('<img src="'+imgPath+ccImg+'" alt="'+ccType+'" title="'+ccType+'" class="status-icon card-type" /><img src="'+imgPath+'accept.png" alt="valid" class="status-icon valid-cc-num" title="Valid card number" />');
			return true;
		} else {
			elem.after('<img src="'+imgPath+ccImg+'" alt="'+ccType+'" title="'+ccType+'" class="status-icon card-type" /><img src="'+imgPath+'error.png" alt="invalid" class="status-icon invalid-cc-num" title="Invalid card number" />');
		}
	} else {
		elem.after('<img src="'+imgPath+ccImg+'" alt="'+ccType+'" title="'+ccType+'" class="status-icon card-type" /><img src="'+imgPath+'error.png" alt="invalid" class="status-icon invalid-cc-num" title="Invalid card number" />');
	}
	return false;
}



$(function(){

	// Home country fields
	if ($('#edit-home-country-code').val() != '++') {
		$('#edit-home-country-wrapper').hide(0, function(){
			$('#edit-home-country').attr('disabled','disabled');
		});
	}
	$('#edit-home-country-code').change(function(e){
		if ($(this).val() == '++') {
			$('#edit-home-country-wrapper').slideDown('fast', function(){
				$('#edit-home-country').removeAttr('disabled').focus();
			});
		} else {
			$('#edit-home-country-wrapper').slideUp('fast', function(){
				$('#edit-home-country').val('').attr('disabled','disabled');
			});
		}
	});

	// Birth country fields
	if ($('#edit-birth-country-code').val() != '++') {
		$('#edit-birth-country-wrapper').hide(0, function(){
			$('#edit-birth-country').attr('disabled','disabled');
		});
	}
	$('#edit-birth-country-code').change(function(e){
		if ($(this).val() == '++') {
			$('#edit-birth-country-wrapper').slideDown('fast', function(){
				$('#edit-birth-country').removeAttr('disabled').focus();
			});
		} else {
			$('#edit-birth-country-wrapper').slideUp('fast', function(){
				$('#edit-birth-country').val('').attr('disabled','disabled');
			});
		}
	});

	// Citizen country fields
	if ($('#edit-citizen-country-code').val() != '++') {
		$('#edit-citizen-country-wrapper').hide(0, function(){
			$('#edit-citizen-country').attr('disabled','disabled');
		});
	}
	$('#edit-citizen-country-code').change(function(e){
		if ($(this).val() == '++') {
			$('#edit-citizen-country-wrapper').slideDown('fast', function(){
				$('#edit-citizen-country').removeAttr('disabled').focus();
			});
		} else {
			$('#edit-citizen-country-wrapper').slideUp('fast', function(){
				$('#edit-citizen-country').val('').attr('disabled','disabled');
			});
		}
	});

	// Agency country fields (agents)
	if ($('#edit-agency-country-code').val() != '++') {
		$('#edit-agency-country-wrapper').hide(0, function(){
			$('#edit-agency-country').attr('disabled', 'disabled');
		});
	}
	$('#edit-agency-country-code').change(function(e){
		if ($(this).val() == '++') {
			$('#edit-agency-country-wrapper').slideDown('fast', function(){
				$('#edit-agency-country').removeAttr('disabled').focus();
			});
		} else {
			$('#edit-agency-country-wrapper').slideUp('fast', function(){
				$('#edit-agency-country').val('').attr('disabled','disabled');
			});
		}
	});

	// Legal disputes fields (agents)
	if ($('#edit-legal-disputes').not(':checked')) {
		$('#edit-legal-disputes-details-wrapper').hide(0, function(){
			$('#edit-legal-disputes-details').attr('disabled', 'disabled');
		});
	}
	$('#edit-legal-disputes').click(function(){
		if ($(this).is(':checked')) {
			$('#edit-legal-disputes-details-wrapper').slideDown('fast', function(){
				$('#edit-legal-disputes-details').removeAttr('disabled').focus();
			});
		} else {
			$('#edit-legal-disputes-details-wrapper').slideUp('fast', function(){
				$('#edit-legal-disputes-details').val('').attr('disabled', 'disabled');
			});
		}
	});

	// Returning applicant fields
	if ($('#edit-application-type').val() != 'returning') {
		$('#edit-applicant-sid-wrapper').hide(0, function(){
			$('#edit-applicant-sid').attr('disabled', 'disabled');
		});
	}
	$('#edit-application-type').change(function(){
		if ($(this).val() == 'returning') {
			$('#edit-applicant-sid-wrapper').slideDown('fast', function(){
				$('#edit-applicant-sid').removeAttr('disabled').focus();
			});
		} else {
			$('#edit-applicant-sid-wrapper').slideUp('fast', function(){
				$('#edit-applicant-sid').val('').attr('disabled', 'disabled');
			});
		}
	});

	// Applicant in USA
	if (! $('#edit-in-usa').is(':checked')) {
		$('#edit-curr-usa-school-wrapper').hide(0, function(){
			$('#edit-curr-usa-school').attr('disabled', 'disabled');
		});		
		$('#edit-curr-visa-type-code-wrapper').hide(0, function(){
			$('#edit-curr-visa-type-code').attr('disabled', 'disabled');
		});
	}
	$('#edit-in-usa').click(function(){
		if ($(this).is(':checked')) {
			$('#edit-curr-usa-school-wrapper').slideDown('fast', function(){
				$('#edit-curr-visa-type-code-wrapper').slideDown('fast', function(){
					$('#edit-curr-usa-school').removeAttr('disabled').focus();
					$('#edit-curr-visa-type-code').removeAttr('disabled');
				});
			});
		} else {
			$('#edit-curr-usa-school').val('').attr('disabled', 'disabled');
			$('#edit-curr-visa-type-code').val('---').attr('disabled', 'disabled');
			$('#edit-curr-visa-type-code-wrapper').slideUp('fast', function(){
				$('#edit-curr-usa-school-wrapper').slideUp('fast');
			});
		}
	});

	
	// Exec field-value replicators (agents)
	$('#edit-same-as-exec').click(function(){
		var execFname = $('#edit-exec-fname');
		var execLname = $('#edit-exec-lname');
		var execTitle = $('#edit-exec-title');
		var execPhone = $('#edit-exec-phone');
		var execMobile = $('#edit-exec-mobile');
		var execFax = $('#edit-exec-fax');
		var execEmail = $('#edit-exec-email');
		var contFname = $('#edit-contact-fname');
		var contLname = $('#edit-contact-lname');
		var contTitle = $('#edit-contact-title');
		var contPhone = $('#edit-contact-phone');
		var contMobile = $('#edit-contact-mobile');
		var contFax = $('#edit-contact-fax');
		var contEmail = $('#edit-contact-email');
		if ($(this).is(':checked')) {
			contFname.val(execFname.val()).attr('disabled', 'disabled');
			contLname.val(execLname.val()).attr('disabled', 'disabled');
			contTitle.val(execTitle.val()).attr('disabled', 'disabled');
			contPhone.val(execPhone.val()).attr('disabled', 'disabled');
			contMobile.val(execMobile.val()).attr('disabled', 'disabled');
			contFax.val(execFax.val()).attr('disabled', 'disabled');
			contEmail.val(execEmail.val()).attr('disabled', 'disabled');
			execFname.bind('change.fname', function(){ contFname.val(execFname.val()); });
			execLname.bind('change.lname', function(){ contLname.val(execLname.val()); });
			execTitle.bind('change.title', function(){ contTitle.val(execTitile.val()); });
			execPhone.bind('change.phone', function(){ contPhone.val(execPhone.val()); });
			execMobile.bind('change.mobile', function() { contMobile.val(execMobile.val()); });
			execFax.bind('change.fax', function() { contFax.val(execFax.val()); });
			execEmail.bind('change.email', function() { contEmail.val(execEmail.val()); });
		} else {
			contFname.val('').removeAttr('disabled').focus();
			contLname.val('').removeAttr('disabled');
			contTitle.val('').removeAttr('disabled');
			contPhone.val('').removeAttr('disabled');
			contMobile.val('').removeAttr('disabled');
			contFax.val('').removeAttr('disabled');
			contEmail.val('').removeAttr('disabled');
			execFname.unbind('change.fname');
			execLname.unbind('change.lname');
			execTitle.unbind('change.title');
			execPhone.unbind('change.phone');
			execMobile.unbind('change.mobile');
			execFax.unbind('change.fax');
			execEmail.unbind('change.email');
		}
	});
	
	
	// CC Addr-value replicators
	$('#edit-cc-use-perm-addr').click(function(){
		var permStreet = $('#edit-home-street-addr');
		var permCity = $('#edit-home-locality');
		var permState = $('#edit-home-region');
		var permZip = $('#edit-home-postal-code');
		var permEmail = $('#edit-student-email');
		var ccStreet = $('#edit-cc-street-addr');
		var ccCity = $('#edit-cc-locality');
		var ccState = $('#edit-cc-region');
		var ccZip = $('#edit-cc-postal-code');
		var ccEmail = $('#edit-cc-email');
		if ($(this).is(':checked')) {
			ccStreet.val(permStreet.val());	//.attr('disabled', 'disabled');
			ccCity.val(permCity.val());	//.attr('disabled', 'disabled');
			//ccState.val(permState.val()).attr('disabled', 'disabled');
			ccZip.val(permZip.val());	//.attr('disabled', 'disabled');
			ccEmail.val(permEmail.val());
			$('#edit-cc-country-code').val($('#edit-home-country-code option:selected').val());	//.attr('disabled', 'disabled');
			//permStreet.bind('change.street_cc', function(){ ccStreet.val(permStreet.val()); });
			//permCity.bind('change.city_cc', function(){ ccCity.val(permCity.val()); });
			//permState.bind('change.state_cc', function(){ ccState.val(permState.val()); });
			//permZip.bind('change.zip_cc', function(){ ccZip.val(permZip.val()); });
			//permEmail.bind('change.email_cc', function(){ ccEmail.val(permEmail.val()); });
			//$('#edit-home-country-code').bind('change.country_cc', function(){ $('#edit-cc-country-code').val($('#edit-home-country-code option:selected').val()); });
		} else {
			//ccStreet.removeAttr('disabled').focus();
			ccStreet.focus();
			//ccCity.removeAttr('disabled');
			//ccState.removeAttr('disabled');
			//ccZip.removeAttr('disabled');
			//ccEmail.removeAttr('disabled');
			//$('#edit-cc-country-code').removeAttr('disabled');
			//permStreet.unbind('change.street_cc');
			//permCity.unbind('change.city_cc');
			//permState.unbind('change.state_cc');
			//permZip.unbind('change.zip_cc');
			//permEmail.unbind('change.email_cc');
			//$('#edit-home-country-code').unbind('change.country_cc');
		}
	});


	// Pay now option
	if (! $('#edit-payment-options-paynow').is(':checked')) {
		$('.paynow-info').hide(0, function(){
			//$('.paynow-info input').attr('disabled','disabled');
			$('.paynow-info input, .paynow-info textarea, .paynow-info select').attr('disabled','disabled');
		});
	}
	$('#edit-payment-options-paynow').click(function() {
		$('.paylater-info').slideUp('fast', function() {
			$('.paynow-info input, .paynow-info textarea, .paynow-info select').removeAttr('disabled');
			$('.paynow-info').slideDown('fast', function() {
				$('#edit-cc-number').bind('change.ccnum', function() {
					checkCCNum($(this));
				}).focus();

				//cc num check via Luhn algorithm
				/*
				$('#edit-cc-number').bind('change.ccnum', function() {
					$(this).nextAll('img').remove();
					var imgPath = '/sites/all/modules/nscc_isp_admission/imgs/';
					var ccType  = 'Not Accepted';
					var ccImg = 'cc-logos/indeterminate.png';
					var sum = 0;
					var mul = 1;
					var digit = null;
					var tproduct = 0;
					var pan = $(this).val();
					var validPan = false;
					pan = pan.replace(/\D+/g, '');
					if (pan.length <= 19 && pan.length >= 12) {
						ccType = getCCType(pan);
						ccType == 'Indeterminate' ? 'Not Accepted' : ccType;
						ccImg = ccType.toLowerCase();
						ccImg = 'cc-logos/' + ccImg.replace(/\s/, '-') + '.png';
						for (var i = 0; i < pan.length; i++) {
							digit = pan.substring(pan.length - i - 1, pan.length - i);
							tproduct = parseInt(digit, 10) * mul;
							if (tproduct >= 10) {
								sum += (tproduct % 10) + 1;
							} else {
								sum += tproduct;
							}
							if (mul == 1) {
								mul++;
							} else {
								mul--;
							}
						}
						validPan = (sum % 10 == 0);
						if (validPan === true) {
							$(this).after('<img src="'+imgPath+ccImg+'" alt="'+ccType+'" title="'+ccType+'" class="status-icon card-type" /><img src="'+imgPath+'accept.png" alt="valid" class="status-icon valid-cc-num" title="Valid card number" />');
						} else {
							$(this).after('<img src="'+imgPath+ccImg+'" alt="'+ccType+'" title="'+ccType+'" class="status-icon card-type" /><img src="'+imgPath+'error.png" alt="invalid" class="status-icon invalid-cc-num" title="Invalid card number" />');
						}
					} else {
						$(this).after('<img src="'+imgPath+ccImg+'" alt="'+ccType+'" title="'+ccType+'" class="status-icon card-type" /><img src="'+imgPath+'error.png" alt="invalid" class="status-icon invalid-cc-num" title="Invalid card number" />');
					}
				}).focus();
				*/
			});
		});
	});


	// Pay later option
	if (! $('#edit-payment-options-paylater').is(':checked')) {
		$('.paylater-info').hide(0);
	}
	$('#edit-payment-options-paylater').click(function(){
		$('#edit-cc-number').unbind('change.ccnum').nextAll('img').remove();;
		$('.paynow-info').slideUp('fast', function(){
			$('.paynow-info input, .paynow-info textarea, .paynow-info select').val('').attr('disabled','disabled');
			//$('.paynow-info :checkbox').removeAttr('checked');
			$('.paynow-info :checkbox').val('1').removeAttr('checked');	//reset value since it gets wiped out by prior line.
			$('.paynow-info input').unbind('change.street_cc');
			$('.paynow-info input').unbind('change.city_cc');
			$('.paynow-info input').unbind('change.state_cc');
			$('.paynow-info input').unbind('change.zip_cc');
			$('.paynow-info input').unbind('change.email_cc');
			$('#edit-home-country-code').unbind('change.country_cc');
			$('.paylater-info').slideDown('fast');
		});
	});


	// Trap duplicate submits. Also ensure CC fields are not disabled on submit
	// to preserve data if rebuild is needed.
	$('#nscc-isp-admission-form').submit(function(e) {
		if ($(this).attr('submitted') == 'submitted') {
			e.preventDefault();
			e.stopPropagation();
			return false;
		} else {
			$('.paynow-info input, .paynow-info textarea, .paynow-info select').removeAttr('disabled');
			//$('#edit-submit').attr('disabled','disabled');
			$('#edit-submit').replaceWith('<p class="form-submit-working">Working, please wait…</p>');
			$(this).attr('submitted', 'submitted');
		}
	});
	
});
