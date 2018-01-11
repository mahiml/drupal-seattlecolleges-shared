<?php
// $Id$

/**
 * @file instructor-for-sidebar.tpl.php
 *
 * Theme implementation to display an Instructor node in the sidebar of a Course page.
 *
 * Available variables:
 * - $name: Sanitized name of instructor (i.e. node title).
 * - $bio: Sanitized excerpt from bio (i.e. node teaser).
 * - $photo: The instructor's picture.
 * - $links: Themed links like "Read more", "Add new comment", etc. output
 *	  from theme_links().
 * - $node_url: Direct url of the current node.
 * - $classes: CSS classes for the node wrapper.
 *
 * Other variables:
 * - $instructor: Full instructor (node) object. Contains data that may not be safe.
 * - $type: Node type, i.e. story, page, blog, etc.
 *
 * Node status variables:
 * - $promote: Flag for front page promotion state.
 * - $sticky: Flags for sticky post setting.
 * - $status: Flag for published status.
 * - $comment: State of comment settings for the node.
 *
 * @see HOOK_preprocess_instructor-for-sidebar()
 */
?>
<!-- Instructor Info -->
<div id="node-<?php print $instructor->nid; ?>" class="<?php print $classes; ?>">
	<h3>
		<?php print $photo; ?>
		<?php print $name; ?>
	</h3>
	<?php if ($bio): ?>
		<div class="bio">
			<?php print $bio; ?>
		</div>
	<?php endif; ?>
	<?php if ($links): ?>
		<div class="links">
			<?php print $links; ?>
		</div>
	<?php endif; ?>
</div>
