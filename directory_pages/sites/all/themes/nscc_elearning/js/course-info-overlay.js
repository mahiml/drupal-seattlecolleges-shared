// Dependencies: jQuery library (should be included by core automatically)

$(function(){
	$('.course-details[href]').click(function(){
		var elem = $(this);
		var url = 'https://northseattle.edu' + $(this).attr('href') + '/json';
		//var url = $(this).attr('href') + '/json';
		$.getJSON(url, null, function(data, status) {
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
					quarters += separator + '<a href="https://northseattle.edu/'+obj.path+'">' + obj.title + '</a>';
				}
				quarters = (quarters) ? '<p class="schedule-quarters">Currently scheduled for: '+quarters+'</p>' : '';
			}
			
			courseInfo = '<h2>'+data.course+'—'+data.title+'</h2>'
					+ '<p class="course-description">'+data.description+'</p>'
					+ '<p class="course-credits">'+data.credits+' credits</p>';
			courseInfo = (taglist) ? courseInfo + taglist : courseInfo;
			courseInfo = (quarters) ? courseInfo + quarters : courseInfo;

			var panel = $('<div id="' + elem.attr('id') + '-flyout" class="schedule-data course-info-flyout overlay-flyout">' + courseInfo + '</div>');
			//Insert into DOM
			$('body').append('<div id="fade-background">&nbsp;</div>');
			$('body').append(panel);
			$('#fade-background').height($('body').outerHeight()).width($('body').outerWidth());
			$('#fade-background').click(function(){ $('.overlay-flyout').remove(); $(this).remove(); return true;});
			panel.show().vCenter();
			var leftmargin = ($(window).width() - $('#' + elem.attr('id') + '-flyout').width())/2;
			panel.css({'left':leftmargin, 'display':'block'});
			panel.bind('click',function(){$(this).remove(); $('#fade-background').remove(); return true;});
		});
		return false;
	});
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
