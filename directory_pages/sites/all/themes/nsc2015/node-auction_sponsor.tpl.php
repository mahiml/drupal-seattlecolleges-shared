<?php
// $Id$
/**
 * @file views-view-row-node--auctions--page-2.tpl.php
 * Views template to display a single auction sponsor node.
 *
 * @ingroup views_templates
 */
?>
<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?>">
	<?php if ($sponsor_title) : ?>
	<h3><?php print $sponsor_title ?></h3>
	<?php endif; ?>
	<?php if ($sponsor_logo) { print $sponsor_logo; } ?>
</div>