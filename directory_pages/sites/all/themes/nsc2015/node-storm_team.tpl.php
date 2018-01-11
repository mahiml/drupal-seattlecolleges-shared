<?php
// $Id: node.tpl.php,v 1.1 2009/06/26 00:33:39 duvien Exp $

/**
 * @file node-storm_team.tpl.php
 *
 * Theme implementation to display a Storm Team node.
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
<!-- Storm Team -->
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
		<div class="content tabbed-container">
			<?php if (!$page) : ?>
				<?php print $content; ?>
			<?php else : ?>
				<?php if ($tabs_list) : ?>
					<?php print $tabs_list; ?>
					<div class="panes">
				<?php endif; ?>
				<?php if ($team_highlights) : ?>
					<div<?php print $team_panel_attr; ?>>
						<h2>Team Highlights</h2>
						<?php print $team_highlights; ?>
					</div>
				<?php endif; ?>
				<?php if ($team_schedule) : ?>
				<div<?php print $sched_panel_attr; ?>>
					<h2>Schedule</h2>
					<?php print $team_schedule; ?>
				</div>
				<?php endif; ?>
				<?php if ($player_tbl_rows) : ?>
				<div<?php print $player_panel_attr; ?>>
					<h2>Players</h2>
					<table<?php print $player_tbl_attr; ?>>
						<thead>
							<tr>
								<th class="player-number"><abbr title="Number">No.</abbr></th>
								<th class="player-name">Player</th>
								<th class="player-position"><abbr title="Positions">Pos.</abbr></th>
								<th class="player-height"><abbr title="Height">Ht.</abbr></th>
								<th class="player-year"><abbr title="Academic Year">Yr.</abbr></th>
								<th class="player-hs">High School</th>
							</tr>
						</thead>
						<tbody><?php print $player_tbl_rows; ?></tbody>
					</table>
				</div>
				<?php endif; ?>
				<?php if ($team_staff) : ?>
				<div<?php print $staff_panel_atrr; ?>>
					<h2>Staff</h2>
					<?php print $team_staff; ?>
				</div>
				<?php endif; ?>
				<?php if ($tabs_list) { print '</div>'; } ?>
			<?php endif; ?>
		</div>
		<?php print $links; ?>
	</div>
</div>