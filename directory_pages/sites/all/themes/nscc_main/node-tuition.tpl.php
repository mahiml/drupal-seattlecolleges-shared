<?php
// $Id: node.tpl.php,v 1.1 2009/06/26 00:33:39 duvien Exp $

/**
 * @file node-tuition.tpl.php
 *
 * Theme implementation to display a tuition node.
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
 * - $resident_tuition_rows: Themed table rows of resident tuition amounts.
 * - $nonresident_tuition_rows: Themed table rows of non-resident tuition amounts.
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
 * - $edit_mode: Flags true when editing the node.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 */

/* Node Dump (DEV ONLY) 
print '<!-- Vars Dump: ';
print $varsdump;
print " -->\n";
*/
?>
<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?>"><div class="node-inner">

  <?php if (!$page): ?>
    <h2 class="title">
      <a href="<?php print $node_url; ?>" title="<?php print $title ?>"><?php print $title; ?></a>
    </h2>
  <?php endif; ?>

  <?php if ($unpublished): ?>
    <div class="unpublished"><?php print t('Unpublished'); ?></div>
  <?php endif; ?>

  <div class="content">
	<?php if ($edit_mode): ?>
  	<?php print $content; ?>
	<?php else: ?>
		<div class="tuition-group" id="resident-tuition">
			<h2>Resident Tuition</h2>
		<?php if ($resident_tuition_rows): ?>
			<table class="tuition-table resident-tuition-table" summary="Tuition for state residents">
				<thead>
					<tr>
						<th>Credits</th>
						<th>Academic</th>
						<th>Career</th>
						<th>HS Completion</th>
					</tr>
				</thead>
				<tbody>
				<?php print $resident_tuition_rows; ?>
				</tbody>
			</table>
		<?php endif; ?>
		<?php if ($node->field_res_notes[0]['view']): ?>
			<div class="tuition-notes resident-tuition-notes">
				<?php print $node->field_res_notes[0]['view']; ?>
			</div>
		<?php endif; ?>
		</div>
		
		<div class="tuition-group" id="non-resident-tuition">
			<h2>Non-Resident Tuition</h2>
		<?php if ($nonresident_tuition_rows): ?>
			<table class="tuition-table nonresident-tuition-table" summary="Tuition for non-residents">
				<thead>
				<tr>
					<th>Credits</th>
					<th>Academic</th>
					<th>Career</th>
					<th>eLearning</th>
					<th>WA HS Graduate</th>
					<th>Refugee</th>
					<th>HS Completion</th>
				</tr>
				</thead>
				<tbody>
				<?php print $nonresident_tuition_rows; ?>
				</tbody>
			</table>
		<?php endif; ?>
		<?php if ($node->field_nr_notes[0]['view']): ?>
			<div class="tuition-notes non-resident-tuition-notes">
				<?php print $node->field_nr_notes[0]['view']; ?>
			</div>
		<?php endif; ?>
		</div>
		
		<div class="tuition-group" id="special-programs-tuition">
			<h2>Special Programs Tuition</h2>
		<?php if ($parent_ed_amt ||	$abe_amt || $esl_amt || $ged_amt ||	$seniors_amt): ?>
			<table class="tuition-table special-programs-tuition-table" summary="Tuition for special programs">
				<thead>
				<tr>
					<th>Program</th>
					<th>Cost</th>
				</tr>
				</thead>
				<tbody>
				<?php if ($parent_ed_amt): ?>
					<tr><td>Parent Education</td><td><?php print $parent_ed_amt; ?> per credit</td></tr>
				<?php endif; ?>
				<?php if ($abe_amt): ?>
					<tr><td>Adult Basic Education (ABE)</td><td><?php print $abe_amt; ?> per quarter</td></tr>
				<?php endif; ?>
				<?php if ($esl_amt): ?>
					<tr><td>English as a Secondary Language (ESL)</td><td><?php print $esl_amt; ?> per quarter</td></tr>
				<?php endif; ?>
				<?php if ($ged_amt): ?>
					<tr><td>General Educational Development (GED) Preparation</td><td><?php print $ged_amt; ?> per quarter</td></tr>
				<?php endif; ?>
				<?php if ($seniors_amt): ?>
					<tr><td>Washington Seniors 60+</td><td><?php print $seniors_amt; ?> per class (limit 2)</td></tr>
				<?php endif; ?>
				</tbody>
			</table>
		<?php endif; ?>
		<?php if ($node->field_sp_notes[0]['view']): ?>
			<div class="tuition-notes non-resident-tuition-notes">
				<?php print $node->field_sp_notes[0]['view']; ?>
			</div>
		<?php endif; ?>
		</div>
<?php endif; ?>
  </div>

  <?php print $links; ?>

</div></div> <!-- /node-inner, /node -->