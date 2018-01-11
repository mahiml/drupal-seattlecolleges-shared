<?php
// $Id: forum-icon.tpl.php,v 1.3 2007/12/20 09:35:09 goba Exp $

/**
 * @file forum-icon.tpl.php
 * Display an appropriate icon for a forum post.
 *
 * Available variables:
 * - $new_posts: Indicates whether or not the topic contains new posts.
 * - $icon: Array of icon image data; use $icon['view'] for themed image.
 *
 * @see template_preprocess_forum_icon()
 * @see theme_forum_icon()
 */
?>
<?php if ($new_posts): ?>
  <a name="new">
<?php endif; ?>

<?php print $icon['view']; ?>

<?php if ($new_posts): ?>
  </a>
<?php endif; ?>
