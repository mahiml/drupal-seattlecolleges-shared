<?php
// $Id$

/**
 * @file node-certificate.tpl.php
 *
 * Theme implementation to display a Certificate or Prof/Tech Degree node.
 *
 * Available variables:
 * - $title: the (sanitized) title of the node.
 * - $content: Node body or teaser depending on $teaser flag.
 * - $picture: The authors picture of the node output from
 *   theme_user_picture().
 * - $date: Formatted creation date (use $created to reformat with
 *   format_date()).
 * - $links: Themed links like "Read more", "Add new comment", etc. output
 *   from theme_links().
 * - $name: Themed username of node author output from theme_user().
 * - $node_url: Direct url of the current node.
 * - $terms: the themed list of taxonomy term links output from theme_links().
 * - $submitted: themed submission information output from
 *   theme_node_submitted().
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
 * @see nscc_960_preprocess_node()
 * @see nscc_main_preprocess_node()
  */
?>
<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?>">
  <?php if ($unpublished): ?>
    <div class="unpublished"><?php print t('Unpublished'); ?></div>
  <?php endif; ?>

  <?php if ($submitted): ?>
    <div class="meta">
      <?php if ($submitted): ?>
        <div class="submitted">
          <?php print $submitted; ?>
        </div>
      <?php endif; ?>
    </div>
  <?php endif; ?>
  <div class="content">
  <?php if ($description): ?>
  	<div class="description">
  		<?php print $description; ?>
  	</div>
  <?php endif; ?>
  <?php if ($objectives): ?>
  	<div class="objectives">
  		<h2>Learning Outcomes</h2>
  		<?php print $objectives; ?>
  	</div>
  <?php endif; ?>
  <?php if ($prereqs): ?>
    <div class="prerequisites">
      <h2>Prerequisites</h2>
      <?php print $prereqs; ?>
    </div>
  <?php endif; ?>
    <div class="curriculum">
      <h2>Curriculum</h2>
      <?php print $curriculum; ?>
      <p class="total-credits">
        Total Credits: <span class="amount"><?php print $total_credits; ?></span>
        <span class="caveats">(excluding prerequisites)</span>
      </p>
    </div>
  <?php if ($sequence): ?>
    <div class="sequence">
      <h2><?php print $sequence_type; ?>Sequence</h2>
      <?php print $sequence; ?>
    </div>
  <?php endif; ?>
  <?php if ($elective_groups): ?>
  	<div class="elective-groups">
  		<h2>Electives</h2>
  		<?php print $elective_groups; ?>
  	</div>
  <?php endif; ?>
  <?php if ($notes): ?>
    <div class="notes">
      <h2>Notes</h2>
      <?php print $notes; ?>
    </div>
  <?php endif; ?>
    <div class="sbctc_meta">
      <p>
        Effective beginning: <span class="effective-quater"><?php print $eff_yrq; ?></span><br />
        <span class="official-title"><?php print $sbctc_title; ?></span><br />
        <span class="epc-code"><?php print $epc_code; ?></span> / <span class="cip-code"><?php print $cip_code; ?></span>
      </p>
    </div>
  </div>
  <?php print $links; ?>
</div>
