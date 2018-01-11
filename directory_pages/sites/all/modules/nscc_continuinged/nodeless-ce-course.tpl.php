<?php

/**
 * @file nodeless-ce-course.tpl.php
 *
 * Theme implementation to display an individual Continuing Ed course that has
 * no corresponding Drupal node.
 *
 * Available variables:
 * - $title: the (sanitized) title of the class.
 * - $class_img: A themed photo or graphic associated with this class.
 * - $sessions: The number of distinct meeting times for this class.
 * - $days: Formatted string indicating class meeting days (e.g. 'Mo Th Sa').
 * - $time: Formatted class meeting time (e.g. '6:30pm - 9pm').
 * - $dates: Formatted start & end dates for the class.
 * - $description: Themed description-content for this class.
 * - $supplies:
 * - $books:
 * - $notes:
 * - $video:
 * - $links: Themed links like "Read more", "Add new comment", etc.
 * - $class_url: Direct url for the class details page.
 * - $terms: the themed list of taxonomy term links.
 *
 * Other variables:
 * - $class: Array of CE class data. May not be safe for direct output.
 * - $type: Node type, i.e. story, page, blog, etc.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *	  teaser listings.
 *
 * Node status variables:
 * - $teaser: Flag for the teaser state.
 * - $status: Flag for published status.
 * - $readmore: Flags true if the teaser content of the node cannot hold the
 *	  main body content.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 */
?>
<div id="<?php print $id_attr; ?>" class="<?php print $class_attr; ?>">
	<?php if ($create_node_url): ?>
		<div class="messages warning missing-node-warning">
			<p>This course does not have a proper page in the Continuing Education site, so the information presented here is limited to the data available from the CampusCE system. To provide richer information, please use the following link to create the Drupal page for this course.</p>
			<a href="<?php print $create_node_url; ?>" class="add-course-node">Setup Page</a>
		</div>
	<?php endif; ?>
	<?php if ($teaser): ?>
		<h2><a href="<?php print $class_url ?>"><?php print $title ?></a></h2>
		<?php print $class_img ?>
	<?php endif; ?>
	<div class="meta">
		<?php print $sessions; ?>
		<?php print $days; ?>
		<?php print $time; ?>
		<?php print $dates; ?>
	</div>
	<div class="content">
		<?php print $description ?>
		<?php if ($supplies): ?>
			<div class="supplies">
				<?php print $supplies; ?>
			</div>
		<?php endif; ?>
		<?php if ($books): ?>
			<div class="books">
				<?php print $books; ?>
			</div>
		<?php endif; ?>
		<?php if ($notes): ?>
			<div class="notes">
				<?php print $notes; ?>
			</div>
		<?php endif; ?>
		<?php if ($video): ?>
			<div class="video-wrapper">
				<?php print $video; ?>
			</div>
		<?php endif; ?>
	</div>
	<?php if ($links): ?>
		<div class="links">
			<?php print $links; ?>
		</div>
	<?php endif; ?>
</div>