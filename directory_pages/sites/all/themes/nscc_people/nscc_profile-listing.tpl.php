<?php
// $Id$

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

<?php //print '<!-- Dump: '.$dump_var.'-->'; ?>
<div class="nscc-profile_list-item" id="list-profile-<?php print $acct_name; ?>">
  <h2><?php print $name; ?></h2>
  <?php if ($job_title): ?>
    <div class="job-title"><?php print $job_title; ?></div>
  <?php endif; ?>
  <?php print $picture; ?>
  <?php if ($nscc_profile['nscc_profile_departments']) :?>
    <div class="depts"><?php print $nscc_profile['nscc_profile_departments']->value; ?></div>
  <?php endif; ?>
  <?php if ($contacts): ?>
    <div class="contacts"><?php print $contacts; ?></div>
  <?php endif; ?>
</div>
