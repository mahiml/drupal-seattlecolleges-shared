/**
 * Fixes multicolumn layout deficiency in certain browsers
 *
 * Depends on the Columnizer jQuery plugin. Both scripts should only be included for those
 * browsers that do not support CSS3 layout module.
 */

$(function(){

	if ( $.browser.msie ) {
		$('.node-type-degree-certificate .courselist-by-tag').columnize({
			columns: 5,
			buildOnce: true,
			lastNeverTallest: true
		});
		$('.node-type-degree-proftech .courselist-by-tag').columnize({
			columns: 5,
			buildOnce: true,
			lastNeverTallest: true
		});
		$('.node-type-degree-transfer .courselist-by-tag').columnize({
			columns: 10,
			buildOnce: true,
			lastNeverTallest: true
		});
		$('.node-type-degree-nontrad .courselist-by-tag').columnize({
			columns: 10,
			buildOnce: true,
			lastNeverTallest: true
		});
	}
});