$(function() {
	var qr_overlay = $('#qrcode_overlay');
	var qrAddr_trigger = $('#qrAddr-overlay-trigger');
	var qrAddr_isOpen = false;	//visibility status flag.
	$('#wikipedia-entry-qr').attr('target','_new');	//QR wikipedia entry should open in new window.
	
	// Move the overlay element in the DOM to someplace where it won't be affected by any other positioned ancestors so it can be correctly centered in the viewport.
	qr_overlay.css({'cursor':'pointer', 'text-align':'center'}).attr('title', 'Close QR').remove();
	$('body #container').after(qr_overlay);
	
	qrAddr_trigger.click(function(e) {
		var w = $(window);
		var top = Math.max((w.height() - qr_overlay.outerHeight()) / 2, 0) + w.scrollTop();
		var left = Math.max((w.width() - qr_overlay.outerWidth()) / 2, 0);
		qr_overlay.css({'top':top, 'left':left, 'position':'absolute'});
		if (!qrAddr_isOpen) {
			qr_overlay.fadeIn();
			qrAddr_isOpen = true;
			$(this).attr('title', 'Close QR');
		} else {
			qr_overlay.fadeOut();
			qrAddr_isOpen = false;
			$(this).attr('title', 'See larger QR');
		}
	}).css('cursor', 'pointer').attr('title', 'See larger QR');
	
	qr_overlay.click(function() {
		$(this).fadeOut();
		qrAddr_isOpen = false;
		qrAddr_trigger.attr('title', 'See larger QR');
	});
});