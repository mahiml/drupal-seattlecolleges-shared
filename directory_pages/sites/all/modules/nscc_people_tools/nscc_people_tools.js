
/**
 * Accordion behaviors for tools menus
 */
Drupal.behaviors.nscc_tools_menu = function(context) {
	var tool_group_triggers = $('.menu-group-title');
	tool_group_triggers.toggle(
		function(){
			$(this).addClass('closed').siblings().slideUp('fast');
		},
		function(){
			$(this).removeClass('closed').siblings().slideDown('fast');
		}
	);
	tool_group_triggers.click();
};