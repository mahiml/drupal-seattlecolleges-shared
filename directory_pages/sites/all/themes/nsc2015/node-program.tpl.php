<?php
// $Id$

/**
 * @file node-program.tpl.php
 *
 * Theme implementation to display a Program node
 *
 * Program nodes are not intended to be displayed alone in a page. They are mainly
 * used as node-references to tie meta-information about a program to actual program
 * information (i.e. Program-Page nodes) pages.
 * This template provides theming structure for the display of relevent Program
 * meta-information (contact info, etc.) in context with the actual Program-Page content.
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
 * - $mgr: themed Program coordinator's name (from his/her profile, sanitized) as a link to profile.
 * - $mgr_title: Program coordinator's title/role vis-a-vis this Program.
 * - $email: Program coordinator's email address (from his/her profile, sanitized).
 * - $phone: Program coordinator's phone (from his/her profile, sanitized).
 * - $division_info: themed meta-content about the org-unit managing this Program (sanitized).
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
  <h2><?php print $title; ?></h2>
  <dl>
    <dt><?php print $mgr_title; ?></dt>
    <dd><?php print $mgr; ?></dd>
<?php if ($email): ?>
    <dd><?php print $email; ?></dd>
<?php endif; ?>
<?php if ($phone): ?>
    <dd><?php print $phone; ?></dd>
<?php endif; ?>
  </dl>

<?php if($contact2):?>
  <dl>
    <dt><?php print $contact2_title; ?></dt>
    <dd><?php print $contact2; ?></dd>
<?php if ($contact2_email): ?>
    <dd><?php print $contact2_email; ?></dd>
<?php endif; ?>
<?php if ($contact2_phone): ?>
    <dd><?php print $contact2_phone; ?></dd>
<?php endif; ?>
  </dl>
<?php endif;?>

</div>
<?php if ($division_info): ?>
  <?php print $division_info; ?>
<?php endif; ?>
<?php if ($feed):?>
	<?php print $feed;?>
<?php endif;?> 	
<?php if($related_people_link): ?>
  <?php print $related_people_link; ?>
<?php endif;?> 	
	
