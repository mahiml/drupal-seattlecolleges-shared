<?php
// $Id$

/**
 * @file node-fs_item.tpl.php
 *
 * Theme implementation to display a Catering/Food-service Item node.
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
<!-- Catering Item -->
<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?>">
	<div class="node-inner">
		<?php if (!$page): ?>
			<h2 class="title">
				<a href="<?php print $node_url; ?>" title="<?php print $title ?>"><?php print $title; ?></a>
			</h2>
			<?php if ($unpublished): ?>
				<div class="unpublished"><?php print t('Unpublished'); ?></div>
			<?php endif; ?>
			<div class="content">
				<?php print $content; ?>
			</div>
		<?php else: ?>
			<div class="content">
				<?php if ($node->field_fs_description[0]['view'] || $node->field_fs_photo[0]['view']): ?>
					<div<?php print $desc_wrapper_attr; ?>>
						<?php print $node->field_fs_photo[0]['view']; ?>
						<?php print $node->field_fs_description[0]['view']; ?>
					</div>
				<?php endif; ?>
				<?php if ($node->field_fs_nutrition_info[0]['view']): ?>
					<div<?php print $nutr_facts_wrapper_attr; ?>>
						<h2>Nutrition Facts</h2>
						<?php print $node->field_fs_nutrition_info[0]['view']; ?>
					</div>
				<?php endif; ?>
				<?php if ($diet_info): ?>
					<div<?php print $diet_info_wrapper_attr; ?>>
						<h2>Dietary Info</h2>
						<p>This catering item adheres to the general conventions of the following dietary standards.</p>
						<ul>
							<?php print $diet_info; ?>
						</ul>
					</div>
				<?php endif; ?>
				<?php if ($node->field_fs_ingredients[0]['view']): ?>
					<h2>Ingredients</h2>
					<div<?php print $ingred_wrapper_attr; ?>>
						<?php print $node->field_fs_ingredients[0]['view']; ?>
					</div>
				<?php endif; ?>
				<?php print $clearfix_div; ?>
			</div>
		<?php endif; ?>
		<?php print $links; ?>
	</div>
</div>