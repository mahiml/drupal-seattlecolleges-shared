// $Id: nscc_schedule.js,v 1.2 2007/12/08 14:06:22 goba Exp $

/**
* Bindings for the open and close button
* for each item.
*/
Drupal.behaviors.nscc_schedule_tags_controls = function(context) {
		//expand
		$("li.schedule-item").find('li.expand-button').bind('click',function (){
			$(this).parent('ul').parent('div').hide('fast',function(){
					$(this).parents('li.schedule-item').find('div.schedule-tags-expanded').slideDown('fast');
				});
		});
		//collapse
		$("li.schedule-item").find('li.collapse-button').bind('click',function (){	
			$(this).parent('ul').parent().slideUp('normal',function(){
				$(this).parents('li.schedule-item').find('div.schedule-tags-collapsed').show('fast');
			});
			return false;
		});
		//expand/collapse toggle on click anywhere on the item.
		$("ul.expandable li.schedule-item").bind('click',function (){
		if($(this).children('div.schedule-tags-expanded').css('display') == 'none'){
				$(this).children('div.schedule-tags-collapsed').hide('fast',function(){
						$(this).parents('li.schedule-item').find('div.schedule-tags-expanded').slideDown('fast');
				});
		}	else {
				$(this).children('div.schedule-tags-expanded').slideUp('fast',function(){
						$(this).parents('li.schedule-item').find('div.schedule-tags-collapsed').show('fast');
				});
		}	
		});
		//$("li.schedule-item").hover(function(){$(this).addClass('highlight')},function(){$(this).removeClass('highlight')});
	
	$('.schedule-itemlist>li:nth-child(even)').css('background-color', 'rgb(245,245,245)');
	$('.schedule-itemlist>li:nth-child(odd)').css('background-color', 'white');
	$('.schedule-itemlist>li:nth-child(even)').hover(function(){$(this).css({ 'background-color':'rgb(238,255,191)','-webkit-box-shadow':'0px 2px 6px #80C000','-moz-box-shadow':'0px 2px 6px #80C000' } );},function(){$(this).css({'background-color':'rgb(245,245,245)','-webkit-box-shadow':'0 0 0 #000','-moz-box-shadow':'0 0 0 #000' });});  
	$('.schedule-itemlist>li:nth-child(odd)').hover(function(){$(this).css({ 'background-color':'rgb(238,255,191)','-webkit-box-shadow':'0px 2px 6px #80C000','-moz-box-shadow':'0px 2px 6px #80C000' });},function(){$(this).css({'background-color':'white','-webkit-box-shadow':'0 0 0 #000','-moz-box-shadow':'0 0 0 #000' });});  
  
  $('span.arranged-hide-button').css('display','inline');
  $('span.arranged-hide-button').bind('click', function(){
  	$('li.tag_arranged').toggle('slow');
  });
	$('span.arranged-hide-button').toggle(function(){$(this).html('Show Them');},function(){$(this).html('Hide Them');});

	// Time-search toggler
	$('#nscc-schedule-search-form input[name=time_preset]:radio').bind('click', function(e) {
		switch($(this).val()) {
			case 'custom':
				$('.daywrapper').show('fast');
				break;
			default:
				$('.daywrapper').hide('fast');
		}
	});

	$('.status-button').bind('click',function(){
		var arg_regexp = new RegExp('item_status_(\\w+)_(\\w+)_button');
		matches = arg_regexp.exec( $(this).attr('id') );
		output_target = $(this).parent('td.sched-status').children("span.status-output");
		var yrq=matches[1];
		var item=matches[2];
		$.post(
		'/schedule/service/'+yrq+'/itemstatus/'+item,
		{},
		function(data){
			status_update(data,yrq,item,output_target);
			//var status_response = Drupal.parseJson(data);
		},
		'json'
		);
		//$(this).parent('td.sched_status').children("span.status_output").html("yrq:"+matches[1]+"item:"+matches[2]);
		return false;
	});
	
	/*============================ run down the status buttons, filling initial status.*/
	$(window).load(function(){
		$('.status-button').each(function(){
			var arg_regexp = new RegExp('item_status_(\\w+)_(\\w+)_button');
			matches = arg_regexp.exec( $(this).attr('id') );
			output_target = $(this).parent('td.sched-status').children("span.status-output");
			var yrq=matches[1];
			var item=matches[2];
			get_status_remotely(yrq,item,output_target);
		});
  });
  
	function get_status_remotely(yrq,item,output_target){
		$.post(
		'/schedule/service/'+yrq+'/itemstatus/'+item,
		{},
		function(data){
			//alert('getting_status_remotely: '+yrq+','+item);
			status_update(data,yrq,item,output_target);
		},
		'json'
		);		
	}

	function status_update(data,yrq,item,output_target){
			if(data.error_code != 0){
				//alert(data.error_msg);
			}	else {
				var output_message = '';
				var waitlist_count = data.wlcount;
				if(data.status == 'X ' || data.status == 'X'){
					output_message = 'Cancelled';
					output_class = 'item-status-cancelled';
					$('li#item_'+yrq+'_'+item).slideUp('slow');						
				}else{
					if (waitlist_count >0){
								if (parseInt(data.wlcount) >= parseInt(data.wlcapacity)){
									output_message = 'Waitlist: FULL' + ' as of ' + data.as_of;
								} else {
									output_message = 'Waitlist: '+ waitlist_count + ' as of ' + data.as_of;
								}
								output_class = 'item-status-closed';
					} else {
						switch(data.status){
							case "Y ":
							case "Y":
								if(data.wlswitchon == "Y"){
									output_message = 'Waitlist: 0'+ ' as of ' + data.as_of;
								}else{
									output_message = 'Full'+ ' as of ' + data.as_of;
								}
								output_class = 'item-status-closed';
							break;

							case "  ":
							case "":
								if(data.seats>0){
									if(data.seats==1){
										output_message = 'Only '+data.seats+' seat left'+ ' as of ' + data.as_of;
									} else {
										output_message = data.seats+' seats left' + ' as of ' + data.as_of;
									}
								} else {
								 
									output_message = 'Open';
								}
								output_class = 'item-status-open';						
								$('li#item_'+yrq+'_'+item).slideDown('slow');						
							break;

							case "R ":
							case "R":
								if( waitlist_count==0){
									if(data.seats>0){
										if(data.seats==1){
											output_message = 'Only '+data.seats+' seat left'+ ' as of ' + data.as_of;
										} else {
											output_message = data.seats+' seats left'+ ' as of ' + data.as_of;
										}
									} else {
											//no seats available
											output_message = 'Open';
									}
								} else {
									//waitlist exists
									output_message = 'Open';
								}	
								output_class = 'item-status-open';
								$('li#item_'+yrq+'_'+item).slideDown('slow');						
							break;

							case "X ":
							case "X":
								output_message = 'Cancelled';
								output_class = 'item-status-cancelled';
								$('li#item_'+yrq+'_'+item).slideUp('slow');						
							break;
						}
					}	
				}
				output_target.html(output_message);
				//output_target.attr('title','As of ' + data.as_of);
				$('li#item_'+yrq+'_'+item).removeClass('item-status-closed item-status-open item-status-cancelled item-status-unchecked').addClass(output_class);				
				$(output_target).parent().children("a.status-button").fadeOut();
			}
			
	}
	
	
	//$('li.schedule-item').hover(function(){ $(this).fadeTo('0',1);},function(){if( $(this).hasClass('item-status-closed') ){ $(this).fadeTo('0',.5);}  });
	
	// Minimap flyout
	var mm_trigger = $('.sched_loc a');
	mm_trigger.parent().parent().hoverIntent({
		timeout: 300,
		over: function(event) {
			var trigger = $(this);
			var room = $(this).children().children('a').html();
			var style = 'position:absolute;top:' + (trigger.position().top - 86) + 'px;left:' + (trigger.position().left + trigger.children('span').children('a').width()) + 'px;z-index:10000;padding:12px 12px 12px 40px;background:transparent url(/sites/all/themes/nscc_960/imgs/bg-minimap-schedule.png) top left no-repeat;width:185px;height:196px;';
			$.get('/minimap/' + room, function(data) {
					trigger.children('span').after('<div class="minimap-tooltip" style="'+style+'"><a href="/locator/locate/' + room + '">' + data + '</a><p><a href="/locator/locate/' + room + '">See ' + room + ' on big map</a></p></div>');
			});
		},
		out: function(event) {
			$(this).children('.minimap-tooltip').remove();
		}
	});
	
	// Instructor Photo flyout
	$('.sched_instructor a.instructor-has-image').hoverIntent({
		timeout: 300,
		over: function(event) {
			var trigger = $(this);
			var user = $(this).attr('href').match(/people\.northseattle\.edu\/users\/(\w+)/);
			if (user != null) {
				$.get('/schedule/ajax/instructor/imageurl/' + user[1], function(data) {
					var style = 'top:' + (trigger.position().top - 48) + 'px;left:' + (trigger.position().left + trigger.width() + 24) + 'px;z-index:10000;';
					var tooltip = $('<div class="instructor-photo-tooltip" style="' + style + '"><div class="tooltip-content"><div class="t"></div><a href="' + trigger.attr('href') + '">' + data + '</a></div><div class="b"><div></div></div></div>').appendTo(trigger).hide();
					tooltip.show();
				});
			}
		},
		out: function(event) {
			$(this).children('div').remove();
		}
	});
};