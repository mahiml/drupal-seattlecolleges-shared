<?php
// $Id$

/**
 * @file node-division.tpl.php
 *
 * Theme implementation to display a Division
 *
 * Division nodes are not intended to be displayed alone in a page. They are mainly
 * used as node-references to tie meta-information about a division to actual division
 * information (i.e. Division-Page nodes) pages.
 * This template provides theming structure for the display of relevent Division
 * meta-information (contact info, etc.) in context with the actual Division-Page content.
 *
 * Available variables:
 * - $title: the (sanitized) title of the node.
 * - $content: Node body or teaser depending on $teaser flag.
 * - $picture: The authors picture of the node output from theme_user_picture().
 * - $date: Formatted creation date (use $created to reformat with format_date()).
 * - $links: Themed links like "Read more", "Add new comment", etc. output from theme_links().
 * - $name: Themed username of node author output from theme_user().
 * - $node_url: Direct url of the current node.
 * - $terms: the themed list of taxonomy term links output from theme_links().
 * - $submitted: themed submission information output from theme_node_submitted().
 * - $mgr: themed dean/manager's name (from his/her profile, sanitized) as a link to profile.
 * - $mgr_title: dean/manager's title/role vis-a-vis this Division (sanitized).
 * - $room: primary room/door number for the division offices (sanitized).
 * - $map: graphic indicating campus-relative location of division offices.
 * - $phone: primary division phone (sanitized).
 * - $fax: primary division fax (sanitized).
 * - $tty: primary division TTY (sanitized).
 * - $email: primary division email address (sanitized).
 * - $hours: division office hours (sanitized).
 * - $mail_title: modified $title for use in postal address (sanitized).
 * - $mailstop: division mailstop (sanitized).
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
 * @see nscc_960_preprocess_node
 */
?>
<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?>">
<?php if ($title): ?>
  <h2><?php print $title; ?> Division</h2>
<?php endif; ?>
  <dl>
    <dt>Location</dt>
    <dd><?php print $room; ?></dd>
    <dd><?php print $map; ?></dd>
    <dt>Division Contacts</dt>
<?php if ($email): ?>
    <dd><?php print $email; ?></dd>
<?php endif; ?>
    <dd><?php print $phone; ?></dd>
<?php if ($fax): ?>
    <dd><?php print $fax; ?> (fax)</dd>
<?php endif; ?>
<?php if ($tty): ?>
    <dd><?php print $tty; ?> (tty)</dd>
<?php endif; ?>
<?php if ($hours): ?>
    <dt>Hours</dt>
    <dd><?php print $hours; ?></dd>
<?php endif; ?>
    <dt>Mailing Address</dt>
    <dd>NSC <?php print $mail_title; ?></dd>
    <dd>9600 College Way N</dd>
<?php if ($mailstop): ?>
    <dd><?php print $mailstop; ?></dd>
<?php endif; ?>
    <dd>Seattle, WA 98103</dd>
    <dt><?php print $mgr_title; ?></dt>
    <dd><?php print $mgr; ?></dd>
  </dl>
</div>