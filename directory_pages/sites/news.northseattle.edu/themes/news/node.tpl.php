<!-- Node -->
<div id="node-<?php print $node->nid; ?>" class="node <?php print $zebra; ?>-node<?php if ($sticky) { print ' sticky'; } ?><?php if (!$status) { print ' node-unpublished'; } ?>">
  <?php if ($page == 0): ?>
    <h2><a href="<?php print $node_url ?>" title="<?php print $title ?>"><?php print $title ?></a></h2>
  <?php endif; ?>
  <?php if ($submitted): ?>
    <p class="submitted"><?php print $submitted; ?></p>
  <?php endif; ?>

  <div class="content">
  <?php if ($node->field_picture[0]['filesize']): ?>
    <?php if ($node->teaser): ?>
      <div class="teaser-photo">
    <?php elseif ($node->body): ?>
      <div class="full-photo">
    <?php endif; ?>
      <?php print $node->field_picture[0]['view']; ?>
      <?php if (!empty($node->field_attribution[0]['view'])): ?>
        <p class="photo-attribution"><?php print $node->field_attribution[0]['view']; ?></p>
      <?php endif; ?>
      <?php if (!empty($node->field_picture[0]['data']['description'])): ?>
        <p class="photo-caption"><?php print $node->field_picture[0]['data']['description']; ?></p>
      <?php endif; ?>
    </div>
  <?php endif; ?>
  <?php print $node->content['body']['#value']; ?>
  </div>

  <?php if ($links): ?>
    <div class="links"><?php print $links; ?></div>
  <?php endif; ?>
  <?php if ($taxonomy): ?>
    <div class="terms"><span class="links-label">Source:</span> <?php print $terms ?></div>
  <?php endif; ?>
  <?php if ($nscc_feeds_links): ?>
    <div class="nscc-feeds-links"><span class="links-label">Appears in:</span> <?php print $nscc_feeds_links ?></div>
  <?php endif; ?>
  <?php if ($node->content['nscc_feed_picker']): ?>
    <div class="feed-picker">
      <h2>Hork This <?php print ucfirst($node->type); ?></h2>
      <?php print $node->content['nscc_feed_picker']['#value']; ?>
    </div>
  <?php endif; ?>
</div>
<!-- /Node -->
