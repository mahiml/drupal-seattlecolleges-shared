<?php
// $Id$

/**
 * @file node.tpl.php
 *
 * Theme implementation to display a fee node.
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
 * - $fee_title: themed node title with fee-code - ex: Title (code)
 * - $fee_code: sanitized fee code value.
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
 * - $edit_mode: Flags true when editing the node.
 * - $target_display: string indicating the context in which the fee is being displayed.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 *
 *
 * Removed this from line 78 to avoid bad formatting:
 * <div class="unpublished"><?php print t('Unpublished'); ?></div>
 */
?>
<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?>">

<?php if ($node->nid): ?>
	

	<?php if ($target_display == 'schedule'): ?>
	
	<h4><?php print $fee_title; ?></h4>
	<div class="fee-detail fee-cost">
		<?php print $cost; ?>
	</div>
	<div class="fee-detail fee-purpose">
		<?php print $purpose; ?>
	</div>
	<div class="fee-detail fee-levied">
		<?php print $levied; ?>
	</div>

<?php else: ?>

	<div class="node-inner"<?php if (!empty($fee_code)) {print ' id="' . $fee_code . '-fee"'; }?>>
		<?php if ($unpublished): ?>
			
		<?php endif; ?>
	
		<?php if ($node->target_display == 'fee_table'): ?>
			<?php if ($edit_mode): ?>
				<div class="content">
					<?php print $content; ?>
				</div>
			<?php else: ?>
				<div class="fee_info grid-6 alpha">
					<h2 class="title"><?php print $fee_title; ?></h2>
					<div class="fee-detail">
						<?php print $purpose; ?>
						<?php print $levied; ?>
					</div>
				</div>
				<div class="fee-detail fee-cost grid-3 omega">
					<?php print $cost; ?>
				</div>
				<div class="clearfix">&nbsp;</div>
			<?php endif; ?>
		<?php elseif (!$page): ?>
			<h2 class="title"><a href="<?php print $node_url; ?>" title="<?php print $title ?>"><?php print $title; ?></a></h2>
		<?php else: ?>
		<div class="content">
			<?php print $content; ?>
		</div>
		<?php endif; ?>
		<?php print $links; ?>
	</div>

<?php endif; ?>

	<?php endif; ?>
</div>