<?php
// $Id$

/**
 * @file node-ed_fund_board_member.tpl.php
 *
 * Theme implementation to display an EdFund board-member node on the main NSCC website.
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
 * - $profile_subject_name: Sanitized full name of the profiled person.
 * - $profile_subject_degrees: Sanitized degrees/honoraria from profiled person's NSCC profile data, if applicable.
 * - $profile_subject_title: Sanitized job title for profiled person.
 * - $profile_subject_photo: Themed <img> for profiled person's photo.
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
 * - $edit_mode: Flags true when the node is being rendered for editing.
 *
 * @see {theme}_preprocess_node()
 */
?>
<!-- Ed Fund Board Member Node -->
<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?>">
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
		<?php if ($photo): ?>
			<div class="board-member-photo grid-3 omega">
				<?php print $photo; ?>
				<?php if ($photo_caption): ?>
					<p class="photo-caption"><?php print $photo_caption; ?></p>
				<?php endif; ?>
			</div>
		<?php endif; ?>
		<?php if (!$page): ?>
			<h2 class="title"><?php print $title; ?></h2>
		<?php endif; ?>
		<?php if ($board_position): ?>
			<p class="edfund-board-role"><?php print $board_position; ?></p>
		<?php endif; ?>
		<div class="content edfund-board-bio">
			<?php print $content; ?>
		</div>
		<?php print $links; ?>
	</div>
</div>