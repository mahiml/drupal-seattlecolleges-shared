<?php
// $Id$

/**
 * @file people-profile-hcard.tpl.php
 * Theme implementation to present a specific profile category (Me) with hCard markup.
 *
 * Profile items will be output through the $profile_items variable.
 *
 * @see user-profile-hcard-item.tpl.php
 *      where each profile item is rendered.
 * @see user-profile.tpl.php
 *      where all items and categories are collected and printed out.
 *
 * Available variables:
 * - $title: Category title for the group of items.
 * - $profile_items: All the items for the group rendered through the profile-item template
 * - $attributes: HTML attributes. Usually renders classes.
 *
 * @see phptemplate_preprocess_user_profile_category()
 */
?>

<?php print "<div$attributes>"; ?>

<?php if ($title) : ?>
  <h2><?php print $title; ?></h2>
<?php endif; ?>
  <ul>
    <?php print $profile_items; ?>
  </ul>
</div>