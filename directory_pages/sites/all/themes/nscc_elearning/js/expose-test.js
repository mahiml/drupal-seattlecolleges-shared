$(function() { 

	// perform exposing for the clicked element 
	var exposed = $("#expose-test").expose({
				api: true,
				maskId: 'expose_mask',
				zIndex: 2000,
				opacity: 0.6,
				onBeforeLoad: function(event){
					this.getExposed().show();
					this.getExposed().addClass('exposed');
					},
				onBeforeClose: function(event){
					this.getExposed().hide();
					this.getExposed().removeClass('exposed');
					},
								
	});

 
    // assign a click event to the exposed element, using normal jQuery coding 
    $("#expose-trigger").click(function() { 
 					exposed.load();
    }); 
});