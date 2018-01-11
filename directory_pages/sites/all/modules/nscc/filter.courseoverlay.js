// Dependencies: jQuery library (should be included by core automatically)

Drupal.behaviors.nscc_schedule_course_overlay = function(context) {
	
		
	$(window).load(function(){
		//create data cache
		var coursecache = {}; 
		var courselist = new Array();
		//iterate over span.course-overlay
		$('span.course-overlay').each(function(index){
				var element = $(this);
				var course = $(this).text();
				var urlcourse = course.replace(/\s+/,'');
				courselist.push(urlcourse);
				//add empty placeholder to cache
				coursecache[urlcourse] = "empty";
				//convert to link and add click handler
				var link = $('<a class="course-overlay" title="Course Details" href="#">'+course+'</a>');
				element.empty();
				element.append(link);
				link.click(function(){ handle_course_popup(urlcourse,link); return false; });
		});
		//update data cache
		$(window).data("course-cache",coursecache);
	});

} //end behavior

function handle_course_popup(course,elem){
		var data = $(window).data("course-cache")[course];
		if (data == 'empty'){
			start_throbbing();
			//console.log(course+' is not loaded yet.');
			var courseurl = course.replace(/&/,'@@@');
			var url = 'https://resources.northseattle.edu/catalog/course/'+courseurl+'/json';
			$.getJSON(url, null, function(data, status) {
				$(window).data("course-cache")[course] = data;
				//console.log("Click-Cached: "+course+":"+$(window).data("course-cache")[course].title);
				stop_throbbing();
				render_course_popup(course);
			});			
		} else {
				render_course_popup(course);
		}
}

function render_course_popup(course){
		var data = $(window).data("course-cache")[course];
		
		var arrTags = (data.tags != null) ? $(data.tags) : null;
		var arrQtrs = (data.quarters != null) ? $(data.quarters) : null;
		var taglist = quarters = courseInfo = '';

		if (arrTags != null) {
			for (var i = 0; i < arrTags.length; i++) {
				var obj = arrTags[i];
				var separator = (i > 0) ? ' ' : '';
				taglist += separator + '<li class="schedule-tag"><abbr title="'+obj.tag_text+'">' + obj.tag_abbr + '</abbr></li>';
			}
			taglist = (taglist) ? '<ul class="schedule-taglist">'+taglist+'</ul><div class="clearfix">&nbsp;</div>' : '';
		}
		if (arrQtrs) {
			for (var i = 0; i < arrQtrs.length; i++) {
				var obj = arrQtrs[i];
				var separator = (i > 0) ? ', ' : '';
				quarters += separator + '<a href="https://resources.northseattle.edu/'+obj.path+'">' + obj.title + '</a>';
			}
			quarters = (quarters) ? '<p class="schedule-quarters">Currently scheduled for: '+quarters+'</p>' : '';
		}
			
		courseInfo = '<h2>'+data.course+' - '+data.title+'</h2>'
				+ '<p class="course-description">'+data.description+'</p>'
				+ '<p class="course-credits">'+data.credits+' credits</p>';
		courseInfo = (taglist) ? courseInfo + taglist : courseInfo;
		courseInfo = (quarters) ? courseInfo + quarters : courseInfo;

		var panel = $('<div id="' + $(this).attr('id') + '-flyout" class="schedule-data course-info-flyout overlay-flyout">' + courseInfo + '</div>');	
		//Insert into DOM
		$('body').append('<div id="fade-background">&nbsp;</div>');
		$('body').append(panel);
		$('#fade-background').height($('body').outerHeight()).width($('body').outerWidth());
		$('#fade-background').click(function(){ $('.overlay-flyout').remove(); $(this).remove(); return true;});
		panel.show().vCenter();
		var leftmargin = ($(window).width() - panel.width())/2;
		panel.css({'left':leftmargin, 'display':'block'});
		panel.bind('click',function(){$(this).remove(); $('#fade-background').remove(); return true;});
}

function start_throbbing(){
		$('body').append('<div id="fade-background" class="throbber-overlay">&nbsp;</div>');
		$('#fade-background').height($('body').outerHeight()).width($('body').outerWidth());
}

function stop_throbbing(){
	$('#fade-background').remove();
} 


//custom centering function as jquery plugin
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
