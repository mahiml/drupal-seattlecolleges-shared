<?php
// $Id$

/**
 * @file course-sections.tpl.php
 *
 * Theme implementation to display all classes/sections of a specificed course-node
 * for inclusion in the course-details and instructor-bio pages.
 *
 * @see HOOK_preprocess_course_sections()
 */
?>
<!-- Course Sections -->
<div class="<?php print $classes; ?>">
	<?php if ($course_link): ?>
		<h3><?php print $course_link; ?></h3>
		<?php print $description; ?>
		<?php if ($sections_heading): ?>
			<h4><?php print $sections_heading; ?></h4>
		<?php endif; ?>
	<?php elseif ($sections_heading): ?>
		<h3><?php print $sections_heading; ?></h3>
	<?php endif; ?>
	<?php print $sections; ?>
	<?php if($enrollable): ?>
	<?php print $enroll_link; ?>
	<?php endif; ?>	
</div>
