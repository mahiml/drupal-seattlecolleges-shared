<?php
// $Id$

/**
 * @file node-course.tpl.php
 *
 * Theme implementation to display a Continuing Ed Course node.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 */
?>
<!-- Course Info -->
<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?>">
	<div class="node-inner">
		<?php if (!$page): ?>
			<h2><a href="<?php print $node_url; ?>" title="<?php print $title ?>"><?php print $title; ?></a></h2>
		<?php endif; ?>
		<?php if ($unpublished): ?>
			<div class="unpublished"><?php print t('Unpublished'); ?></div>
		<?php endif; ?>
		<?php if ($categories_list): ?>
			<div class="meta">
				<?php print $categories_list; ?>
			</div>
		<?php endif; ?>
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
			<?php if ($syllabus): ?>
				<div class="syllabus">
					<?php print $syllabus; ?>
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
		<?php if ($scheduled_classes): ?>
			<div class="scheduled-classes">
				<h2>Scheduled Classes</h2>
				<?php print $scheduled_classes; ?>
			</div>
		<?php endif; ?>
		<?php if ($links): ?>
			<div class="links">
				<?php print $links; ?>
			</div>
		<?php endif; ?>
	</div>
</div>