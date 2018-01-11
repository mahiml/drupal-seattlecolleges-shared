<?php
// $Id$

/**
 * @file node-testimonial_is.tpl.php
 *
 * Theme implementation to display an Integrated Studies Testimonial node.
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
<!-- Integrated Studies Testimonial -->
<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?>" style="width:380px;">
	<?php if (!$page): ?>
		<?php if ($unpublished): ?>
			<div class="unpublished"><?php print t('Unpublished'); ?></div>
		<?php endif; ?>
			<div class="node-inner">
				<div class="content">
					<?php if ($quote): ?>
						<h2><?php print $title ?></h2>
						<?php if ($node_photo || $submitted): ?>
							<div class="node-meta node-photo">
							<?php print $node_photo; ?>
							<?php print $node_photo_caption; ?>
							<?php if ($submitted): ?>
								<div class="meta">
										<div class="submitted">
										<?php print $submitted; ?>
										</div>
								</div>
							<?php endif; ?>
							</div>	
						<?php endif; ?>
						<div class="is-testimonial-quote">
							<blockquote>
								<?php print $quote; ?>
							</blockquote>
							<cite>
								<span class="quotee-name"><?php print $quotee_name; ?></span>
								<span class="quotee-title"><?php print $quotee_title; ?></span>
							</cite>
						</div>
					<?php endif; ?>
					</div>
			</div>
		<?php print $links; ?>

	<?php else: ?>
	<div class="node-inner">
		<?php if ($unpublished): ?>
			<div class="unpublished"><?php print t('Unpublished'); ?></div>
		<?php endif; ?>
		<?php if ($submitted): ?>
			<div class="meta">
				<?php if ($submitted): ?>
					<div class="submitted">
						<?php print $submitted; ?>
					</div>
				<?php endif; ?>
			</div>
		<?php endif; ?>
		<div class="content">
			<?php print $content; ?>
		</div>
		<?php print $links; ?>
	</div>
	<?php endif; ?>
</div>