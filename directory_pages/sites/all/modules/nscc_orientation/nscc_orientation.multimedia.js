// Depends on jQuery, Modernizr, jQuery-cookie, Flowplayer API, and json2.js

Drupal.behaviors.nscc_orientation_multimedia = function(context) {

	// Videos played and last topics accessed will be tracked using JSON stored
	// in a cookie to minimize user annoyance.
	var or_curr_node = window.location.pathname.substr(window.location.pathname.lastIndexOf('/')+1).toLowerCase();
	var or_state = $.cookie('nscc_orientation');
	or_state = or_state ? JSON.parse($.cookie('nscc_orientation')) : {};


	// Clear the state-tracking cookie when user signs out of orientation.
	$('#-nscc-orientation-sid-form #edit-modify').click(function(){
		$.removeCookie('nscc_orientation', {path:'/'});
		or_state = {};
	});


	// Add graphical progress indicators to tabs.
	$('.tabs .completed .tab').append('<img src="/sites/all/themes/nscc_960/imgs/icons/tickmark.png" class="status-icon" alt="Completed" />');


	// Mulitcolumn polyfill for IE.
	//if ( !Modernizr.csscolumns ) {	// The build that enables this causes unacceptably slow load for IE7/XP
	if ($.browser.msie && $.browser.version < 10) {	// not ideal but faster than Modernizr test.
		var relatedLinksList = $('.related-links-list');
		relatedLinksList.columnize({
			columns: 3,
			buildOnce: true,
			lastNeverTallest: true
		});
		if ($.browser.version < 9) {
			relatedLinksList.css('height','1%');	// trigger `hasLayout` fix.
		}
	}


	// Interactive behaviors for orientation topics
	var mediaItems = $('.orientation-topic-media');
	var topics =$('.orientation-topic');
	var currTopic = topics.eq(0);

	topics.each(function(index){
		$(this).addClass('collapsed').children('.orientation-topic-content').hide();
	});
	
	// If <video> is not supported in this UA, replace them with flowplayer.
	if (! Modernizr.video) {

		// Flowplayer API functions are only available when embedding via its API
		// (see http://flowplayer.org/demos/installation/alternate/index.html) so
		// we need to do this swap of the in-markup players with ones embedded via
		// the API.
		$('video').each(function(index){

			// Extract <param> values from markup and prep for flowplayer config.
			var swf_url = $(this).children('object').children('param[name=movie]').attr('value');
			var player_config = $(this).children('object').children('param[name=flashvars]').attr('value').substr(7).replace(/'/g, '');	//strip 'config=' and single-quotes from attr value.
			player_config = player_config.replace(/url\:\s*(.+?)(,|},)/g, 'url:"$1"$2');	//add double-quotes around URL values.
			player_config = player_config.replace(/\\/, '');	//strips escape chrs from configs
			player_config = eval("("+player_config+")");	//convert configs to an object (flowplayer requirement).
			//player_config = JSON.parse(player_config);
			//player_config = jQuery.parseJSON(player_config);
			
			// Create replacement element & transfer attr values from the <video>
			var replacement = document.createElement('div');
			replacement.id = $(this).attr('id');
			replacement.className = 'video';
			replacement.style.width = $(this).attr('width')+'px';
			replacement.style.height = $(this).attr('height')+'px';
			replacement.style.display = 'block';

			// Swap DOM elements, install flowplayer in replacement.
			$(this).replaceWith(replacement);
			$f(replacement, swf_url, player_config);
		});
	}

	// Topic details display toggler - only one open at a time.
	$('.orientation-topic-title').click(function(){
		var trigger = $(this);
		var vid = trigger.siblings().children().children('video,div.video');
		
		// Store currently active topic for this section (tab) of orientation
		var topic_id = trigger.parent().attr('id');
		or_state[or_curr_node] = topic_id.replace(/\s+/,'-');
		
		// Display details container and corresponding media item, if hidden.
		if(trigger.parent().hasClass('collapsed')) {
			pauseVideos();
			trigger.parent().removeClass('collapsed');
			trigger.parent().siblings().children('.orientation-topic-content').slideUp(250, function(){
				trigger.siblings('.orientation-topic-content').slideDown(250, function(){
				
					// Only play video the first time this topic is triggered. We use
					// a domain-scoped session cookie for tracking this.
					if (vid.size() > 0) {
						var vidsrc = '';
						if (Modernizr.video) {
							var vid_elem = vid.get(0);
							vidsrc = vid.get(0).currentSrc;
						} else {
							var fp = vid.flowplayer(0);
							var plist = fp.getPlaylist();
							var clip = plist[plist.length - 1];
							var vidsrc = clip.url;
						}
						vidsrc = (vidsrc) ? vidsrc.substr(vidsrc.lastIndexOf('/')+1) : '';	// omit path; just need filename+ext
						if (!or_state || !vidsrc || !or_state[vidsrc]) {
							playVideo(vid);
							if (vidsrc) {
								or_state[vidsrc] = true;
								$.cookie('nscc_orientation', JSON.stringify(or_state), {path:'/'});
							}
						}
					}
				});
			});
			trigger.parent().siblings('.orientation-topic').addClass('collapsed');
			$.cookie('nscc_orientation', JSON.stringify(or_state), {path:'/'});

		// Otherwise, hide details container and media item.
		} else {
			trigger.siblings('.orientation-topic-content').slideUp(250);
			trigger.parent().addClass('collapsed');
			pauseVideos();
		}
	});


	// Play video
	function playVideo(vid) {
		pauseVideos();
		if (Modernizr.video) {
			vid = vid.get(0);
			if (vid.currentTime == 0) {
				vid.play();
			}
		} else {
			var fplayer = vid.flowplayer(0);
			if (fplayer) {
				var plist = fplayer.getPlaylist();
				var clip = fplayer.getClip(plist.length - 1);
				var pstate = fplayer.getState();
				
				switch (fplayer.getState()) {
					case -1 :	// unloaded
						fplayer.load();
					case 0 :		// loaded
					case 1 :		// unstarted
					case 2 :		// buffering
						fplayer.play(clip.index);
						break;
					case 4 :		// paused
						//fplayer.resume();
						//break;
					case 3 :		// playing
					case 5 :		// ended
						// noop
						break;
				}
			}
		}
	}
	
	
	// Pause video
	function pauseVideos() {
		if (Modernizr.video) {
			$('video').each(function(){
				var velem = $(this).get(0);
				if (! velem.paused) {
					velem.pause();
				}
				//$(this).get(0).pause();
			});
		} else {
			$f('*').each(function(){
				this.pause();
			});
		}
	}


	// Trigger last active topic for this section on page load, or the 1st one if
	// user's not been here yet. 
	$(window).load(function(){
		if (or_state && or_state[or_curr_node]) {
			var trigger = '#'+or_state[or_curr_node]+' .orientation-topic-title';
			$(trigger).click();
		} else {
			$('.orientation-topic-title').eq(0).click();
		}
	});
};