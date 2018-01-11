<?php
// $Id$

/**
 * @file node-ed_fund_success_story.tpl.php
 *
 * Theme implementation to display a single slide for the NSCC front page slideshow feature.
 *
 * Available variables:
 * - $title: the (sanitized) title of the node.
 * - $content: Node body or teaser depending on $teaser flag.
 * - $picture: The authors picture of the node output from
 *   theme_user_picture().
 * - $date: Formatted creation date (use $created to reformat with
 *   format_date()).
 * - $links: Themed links like "Read more", "Add new comment", etc. output
 *   from theme_links().
 * - $name: Themed username of node author output from theme_user().
 * - $node_url: Direct url of the current node.
 * - $terms: the themed list of taxonomy term links output from theme_links().
 * - $submitted: themed submission information output from
 *   theme_node_submitted().
 *   $slide_link_attr: attributes for <a> wrapping slide content.
 *   $photo: primary image for slide (themed).
 *   $content_attr: attributes for the text-content container.
 *   $slide_navigation: slide-order indicators and sequence controls (themed).
 *
 * Other variables:
 * - $node: Full node object. Contains data that may not be safe.
 * - $type: Node type, i.e. story, page, blog, etc.
 * - $comment_count: Number of comments attached to the node.
 * - $uid: User ID of the node author.
 * - $created: Time the node was published formatted in Unix timestamp.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *   teaser listings.
 * - $id: Position of the node. Increments each time it's output.
 *
 * Node status variables:
 * - $teaser: Flag for the teaser state.
 * - $page: Flag for the full page state.
 * - $promote: Flag for front page promotion state.
 * - $sticky: Flags for sticky post setting.
 * - $status: Flag for published status.
 * - $comment: State of comment settings for the node.
 * - $readmore: Flags true if the teaser content of the node cannot hold the
 *   main body content.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 */
?>
<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?>">
	<h3><?php print $display_title; ?></h3>
	<?php if ($description): ?>
		<div class="description">
			<?php print $description; ?>
		</div>
	<?php endif; ?>
	<?php if ($statement): ?>
		<div class="testimonial-quote">
			<?php if ($photo): ?>
				<div class="photo">
					<?php print $photo; ?>
					<?php print $caption; ?>
				</div>
			<?php endif; ?>
			<blockquote class="testimony">
				<?php print $statement; ?>
			</blockquote>
		</div>
		<div class="testimonial-name"><?php print $quotee; ?></div>
		<div class="testimonial-job-title"><?php print $success_type; ?></div>
	<?php endif; ?>
</div>
