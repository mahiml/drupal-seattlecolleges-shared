<?php
// $Id$

/**
 * @file node-club.tpl.php
 *
 * Theme implementation to display a Club node.
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
 * - $club_links: Themed list of links to committee resources.
 * - $description: Themed information describing the purpose/function of the committee.
 * - $calendar_embed: Themed Google calendar of committee events.
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
	<div class="node-inner">
  <?php if (!$page): ?>
    <h2 class="title">
      <a href="<?php print $node_url; ?>" title="<?php print $title ?>"><?php print $title; ?></a>
    </h2>
  <?php endif; ?>
  <?php if ($unpublished): ?>
    <div class="unpublished"><?php print t('Unpublished'); ?></div>
  <?php endif; ?>
		<div class="content">
			<?php if ($club_links || $calendar_embed) : ?>
				<div class="grid-5 alpha">
					<?php print $description; ?>
				</div>
				<div class="grid-4 omega">
					<?php if ($club_links) : ?>
						<div class="block club-links">
							<h2>Club Links</h2>
							<?php print $club_links; ?>
						</div>
					<?php endif; ?>
					<?php if ($calendar_embed) : ?>
						<div class="block calendar-embed">
							<?php print $calendar_embed; ?>
						</div>
					<?php endif; ?>
				</div>
			<?php else: ?>
				<div class="grid-9 alpha omega">
					<?php print $description; ?>
				</div>
			<?php endif; ?>
			<div class="clearfix">&nbsp;</div>
		</div>
		<?php print $links; ?>
	</div>
</div>