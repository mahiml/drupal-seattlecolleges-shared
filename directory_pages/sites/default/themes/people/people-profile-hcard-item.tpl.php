<?php
// $Id$

/**
 * @file people-profile-hcard-item.tpl.php
 * Theme implementation to present specific profile items formatted with hCard markup.
 *
 * This template is used render each of the special directory-information fields
 * built by nscc_profile.module for the account being accessed. The output from
 * this template is aggregated into a special category template.
 *
 * @see people-profile-hcard.tpl.php
 *      for the parent markup. Implemented as an unordered-list.
 * @see user-profile.tpl.php
 *      where all items and categories are collected and printed out.
 *
 * Available variables:
 * - $title: Field title for the profile item as set by nscc_profile.module form.
 * - $value: Value for the profile item.
 *
 * @see template_preprocess_user_profile_item()
 */
?>
<?php if ($title == 'Email Address') : ?>
  <li><?php print $title; ?>: <a class="email" href="mailto:<?php print $value; ?>"><?php print $value; ?></a></li>
<?php endif; ?>
<?php if ($title == 'Phone Number') : ?>
  <li><?php print $title; ?>: <span class="tel"><?php print $value; ?></span></li>
<?php endif; ?>
<?php if ($title == 'IM') : ?>
  <li><abbr title="Instant Message"><?php print $title; ?></abbr>: <?php print $value; ?></li>
<?php endif; ?>
<?php if ($title == 'Mailstop') : ?>
  <li><?php print $title; ?>: <?php print $value; ?></li>
<?php endif; ?>
<?php if ($title == 'Public Calendar URL') : ?>
  <li><?php print $title; ?>: <?php print $value; ?></li>
<?php endif; ?>
<?php if ($title == 'Office') : ?>
  <li><?php print $title; ?>: <?php print $value; ?></li>
<?php endif; ?>
<?php if ($title == 'Office Hours') : ?>
  <li><?php print $title; ?>: <?php print $value; ?></li>
<?php endif; ?>
