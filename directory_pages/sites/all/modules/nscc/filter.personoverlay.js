// Dependencies: jQuery library (should be included by core automatically)

Drupal.behaviors.nscc_person_overlay = function(context) {
	$("span.person-overlay > a").each(function(index){
			var element = $(this);
			var fullurl = element.attr("href");
			var uname = fullurl.replace(/^\/users\//,'');	
			$(this).data("uname",uname);
			$.getJSON('https://people.northseattle.edu/ajax/profile_popup/'+uname, null, function(data, status) {
				element.data("profile",data);
			});
	});
	$("span.person-overlay > a").click(function(){
			if(typeof $(this).data("profile").uname === 'undefined'){
				return true;
			} else {	
				render_person_popup($(this).data("profile"));
				return false;
			}	
	});
};

function render_person_popup(profile){
	
	var fullname = '<h2 class="full-name">';
	if(typeof profile.fullname !== undefined){
		fullname = fullname + profile.fullname;
	}
	fullname = fullname + '</h2>';
	
	var job_title;
	if(typeof profile.job_title !== undefined){
		job_title = '<div class="person-job-title">'+profile.job_title+'</div>';
	}
	var picture;
	
	if(typeof profile.picture !== undefined){
		picture = '<img class="person-picture" src="/'+profile.picture+'" title="portrait" alt="portrait">';
	}
	
	var contact_block='<ul class="person-contact-block">';
	if(typeof profile.phone !== undefined){
		contact_block = contact_block + '<li class="phone">Phone: '+profile.phone+'</li>';
	}	
	if(typeof profile.email !== undefined){
		contact_block = contact_block + '<li class="email">Email: <a class="email link-email" href="mailto:'+profile.email+'">'+profile.email+'</a></li>';
	}	
	if(typeof profile.office !== undefined){
		contact_block = contact_block + '<li class="office">Office: '+profile.office+'</li>';
	}	
	if(typeof profile.office_hours !== undefined){
		contact_block = contact_block + '<li class="office-hours">Hours: '+profile.office_hours+'</li>';
	}		
	contact_block = contact_block + '</ul>';
	
	var more_info_link = '<div class="person-more-info-link"><a href="https://people.northseattle.edu/users/'+profile.uname+'">More Info</a></div>';
	
	var panel_content = fullname+job_title + picture + contact_block + more_info_link;
	var panel = $('<div class="person-overlay-panel course-info-flyout overlay-flyout">'+panel_content+'</div>');
	$('body').append('<div id="fade-background"></div>');
	$('#fade-background').height($('body').outerHeight()).width($('body').outerWidth());
	$('#fade-background').click(function(){ $('.person-overlay-panel').remove(); $(this).remove(); return true;});
	$('body').append(panel);
	panel.show().vCenter();
	
	var leftmargin = ($(window).width() - panel.width())/2;
	panel.css({'left':leftmargin, 'display':'block',});
	panel.bind('click',function(){$(this).remove(); $('#fade-background').remove(); return true;});
}

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
