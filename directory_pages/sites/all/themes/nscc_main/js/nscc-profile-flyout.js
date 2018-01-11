$(function() { 
 $('.testimonials .profile').css('cursor','pointer').attr('title','See the full story');
 $('.testimonials .profile').bind('click',function(){
		var nid_matches = $(this).attr('id').match(/profile-nid-(\d+)/);
		$.post(
			'/ajax/profile',
			{profile_nid: nid_matches[1]},
			function(data){
				//console.log('<div id="full-profile-flyout-'+nid_matches[1]+'" class="full-profile-flyout">'+data.profile+'</div>');
				$('body').append('<div id="fade-background">&nbsp;</div>');
				$('body').append('<div id="full-profile-flyout-'+nid_matches[1]+'" class="full-profile-flyout flyout">'+data.profile+'</div>');
				$('#fade-background').height($('body').outerHeight()).width($('body').outerWidth());
				$('#fade-background').click(function(){ $('.flyout').remove(); $(this).remove();return true;});
				//$('#fade-background').show();
				$('#full-profile-flyout-'+nid_matches[1]).show().vCenter();
				var leftmargin = ($(window).width() - $('#full-profile-flyout-'+nid_matches[1]).width())/2;
				$('#full-profile-flyout-'+nid_matches[1]).css('left',leftmargin);
				$('#full-profile-flyout-'+nid_matches[1]).bind('click',function(){$(this).remove(); $('#fade-background').remove(); return true;});
			},
			"json"
		);		
 });
 
 // Disable default behavior of more-link, but allow event to be handled by profile container per above.
 $('.testimonials .profile .more-link a').click(function(e){e.preventDefault();});
});


//custom centering funtion as jquery plugin
(function($) {
  $.fn.vCenter = function(options) {
    var pos = {
      sTop : function() {
        return window.pageYOffset
        || document.documentElement && document.documentElement.scrollTop
        ||  document.body.scrollTop;
      },
      wHeight : function() {
        return window.innerHeight
        || document.documentElement && document.documentElement.clientHeight
        || document.body.clientHeight;
      }
    };
    return this.each(function(index) {
      if (index == 0) {
        var $this = $(this);
        var elHeight = $this.height();
        var elTop = pos.sTop() + (pos.wHeight() / 2) - (elHeight / 2);
        if(elTop<10){ elTop=10; }
        $this.css({
          position: 'absolute',
          margin: '0 auto',
          top: elTop
        });
      }
    });
  };
 
})(jQuery); // end plugin
 