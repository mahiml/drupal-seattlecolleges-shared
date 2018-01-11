<?php
// $Id: nscc_profile-listing.tpl.php,v 1.2 2007/08/07 08:39:35 goba Exp $

/**
 * @file nscc_profile-listing.tpl.php
 * Default theme implementation for displaying a user and their profile data
 * for member listing pages.
 *
 * @see nscc_profile-wrapper.tpl.php
 *      where all the data is collected and printed out.
 *
 * Available variables:
 * - $picture: Image configured for the account linking to the users page.
 * - $name: User's account name linking to the users page.
 * - $nscc_profile: Keyed array of all profile fields that are set as visible
 *   in member list pages (configured by site administrators). It also needs
 *   to have a value in order to be present.
 *
 * Each $field in $nscc_profile contains:
 * - $field->title: Title of the profile field.
 * - $field->value: Value of the profile field.
 * - $field->type: Type of the profile field, i.e., checkbox, textfield,
 *   textarea, selection, list, url or date.
 *
 * Since $nscc_profile is keyed, a direct print of the field is possible. Not
 * all accounts may have a value for a profile so do a check first. If a field
 * of "last_name" was set for the site, the following can be used.
 *
 *  <?php if (isset($nscc_profile['last_name'])): ?>
 *    <div class="field last-name">
 *      <?php print $nscc_profile['last_name']->title; ?>:<br />
 *      <?php print $nscc_profile['last_name']->value; ?>
 *    </div>
 *  <?php endif; ?>
 *
 * @see template_preprocess_nscc_profile_listing()
 */
?>

<!-- profile list item: <?php print $tester; ?> -->
<div class="nscc_profile-list-item">
  <?php if ($picture) { print $picture; } ?>

  <div class="name">
    <?php print $name; ?>
  </div>

  <?php foreach ($nscc_profile as $field) : ?>
    <div class="field">
      <?php print $field->value; ?>
    </div>
  <?php endforeach; ?>

</div>
