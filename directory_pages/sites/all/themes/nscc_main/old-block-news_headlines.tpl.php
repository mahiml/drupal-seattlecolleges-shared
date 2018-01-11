<?php
// $Id$

/**
 * @file block-news_template-front.tpl.php
 *
 * Theme implementation to display the NSCC Homepage news headlines block.
 *
 * Available variables:
 * - $block->subject: Block title.
 * - $block->content: Block content.
 * - $block->module: Module that generated the block.
 * - $block->delta: This is a numeric id connected to each module.
 * - $block->region: The block region embedding the current block.
 * - $classes: A set of CSS classes for the DIV wrapping the block.
     Possible values are: block-MODULE, region-odd, region-even, odd, even,
     region-count-X, and count-X.
 *
 * Helper variables:
 * - $block_zebra: Outputs 'odd' and 'even' dependent on each block region.
 * - $zebra: Same output as $block_zebra but independent of any block region.
 * - $block_id: Counter dependent on each block region.
 * - $id: Same output as $block_id but independent of any block region.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * @see template_preprocess()
 * @see template_preprocess_block()
 * @see nscc_main_preprocess_news_template_front()
 */
?>
<div id="<?php print $block_id_attr; ?>" class="<?php print $classes; ?>">
  <div class="block-inner">
  <?php if ($block_title): ?>
    <h2<?php print $title_attr; ?>><a href="//news.northseattle.edu" title="NSCC news and events"><span></span><?php print $block_title; ?></a></h2>
  <?php endif; ?>
    <div<?php print $content_attr; ?>>
      <?php print $block->content; ?>
    </div>
    <div<?php print $more_link_attr; ?>>
      <a href="//news.northseattle.edu" title="NSCC news and events">
        <img src="/sites/all/themes/nscc_main/imgs/btn-morenews.png" alt="Read more news and features..." />
      </a>
    </div>
    <?php print $edit_links; ?>
  </div>
</div>
