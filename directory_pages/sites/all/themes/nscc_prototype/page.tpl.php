<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language; ?>" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>">

<head>
  <title><?php print $head_title ?></title>
  <?php print $head; ?>
  <?php print $styles; ?>
  <?php print $scripts; ?>
</head>

<body class="<?php print $body_classes; ?>">
  <div id="page-wrapper">
    <div id="header" class="region region-header">
      <div id="logo"><img src="<?php print base_path().path_to_theme() ?>/imgs/logo-main.png" alt="North Seattle Community College" /></div>
      <?php if ($toolbox): ?> 
        <div id="toolbox" class="region region-toolbox">
          <?php print $toolbox; ?>
        </div>
      <?php endif; ?>
      <?php print $header; ?>
    </div>    
    <div class="clear">&nbsp;</div>
    
    <?php if ($campus_alert): ?>
      <div id="campus-alert" class="region region-campus_alert">
        <?php print $campus_alert; ?>
      </div>
    <?php endif; ?>
    
    <div id="navigation">
      <?php print $global_navigation; ?>
    </div>
    
    <?php if ($breadcrumb || $quicklinks): ?>
    <div class="container_12">
      <div class="grid_12">
        <?php print $breadcrumb; ?>
        <?php print $quicklinks; ?>
      </div>  
      <div class="clear">&nbsp;</div>
    </div>
    <?php endif; ?>
  
    <div class="container_12">
      <?php if ($left): ?>
        <div id="side-nav" class="region region-left grid_3">
          <?php print $left; ?>
        </div>
      <?php endif; ?>
      
      <?php if ($left && $right): ?>
        <div id="main-column" class="grid_6">
      <?php elseif (! ($left || $right)): ?>
        <div id="main-column" class="grid_12">
      <?php else: ?>
        <div id="main-column" class="grid_9">
      <?php endif; ?>
        <?php if ($content_leader): ?>
          <div id="content-leader" class="region region-content-leader">
            <?php print $content_leader; ?>
          </div>
        <?php endif; ?>
        <?php if ($people_header): ?>
          <div id="people-header" class="region region-people-header">
            <?php print $people_header; ?>
          </div>
        <?php endif; ?>
        <div class="region region-main">
          <?php if ($content_top): ?>
            <div id="content-kicker">
              <?php print $content_top; ?>
            </div>
          <?php endif; ?>
      
          <?php if ($title || $feed_icons): ?>
            <div id="content-title">
              <h1><?php print $title; ?></h1>
            <?php if ($feed_icons): ?>
              <div class="feeds">
                <?php print $feed_icons; ?>
              </div>
            <?php endif; ?>
            </div>
          <?php endif; ?>
      
      
          <?php if ($tabs || $help || $messages): ?>
            <div class="content-header">
            <?php print $messages; ?>
            <?php if ($tabs): ?>
              <div class="tabs"><?php print $tabs; ?></div>
            <?php endif; ?>
            <?php print $help; ?>
            </div>
          <?php endif; ?>
          
          <?php print $content; ?>
          
          <?php if ($feed_icons): ?>
            <div class="feeds">
            <?php if ($title) {
                print "        <p>Subscribe to the <em>$title</em> feed: $feed_icons</p>";
              } else {
                print "        <p>Subscribe to this feed: $feed_icons</p>";
              }
              print '      </div>';
            ?>
          <?php endif; ?>
          
          <?php if ($content_bottom): ?>
            <div id="content-footer">
              <?php print $content_bottom; ?>
            </div>
          <?php endif; ?>
          </div>
          <?php if ($content_follower): ?>
            <div id="content-follower" class="region region-content-follower">
              <?php print $content_follower; ?>
            </div>
          <?php endif; ?>
        </div>      
      <?php if($right): ?>
        <div id="side-column1" class="region region-right grid_3">
          <?php print $right; ?>
        </div>
      <?php endif; ?>
      </div>
    <div class="clear">&nbsp;</div>
    
    <div class="container_12 region region-footer" id="footer">
      <?php print $footer; ?>
      <div class="grid_4 region region-footer-left">
        <?php print $footer_left; ?>
      </div>
      <div class="grid_3 region region-footer-mid-left">
        <?php print $footer_mid_left; ?>
      </div>
      <div class="grid_3 region region-footer-mid-right">
        <?php print $footer_mid_right; ?>
      </div>
      <div class="grid_2 region region-footer-right">
        <?php print $footer_right; ?>
      </div>
      <div class="clear">&nbsp;</div>
      
      <div class="grid_12" id="meta-footer">
        <p>©2009 North Seattle Community College <span>|</span> <a href="#">Disclaimer</a> <span>|</span> <a href="#">About This Site</a> <span>|</span> <a href="#">Contact</a></p>
      </div>
      <div class="clear">&nbsp;</div>
    </div><!-- close container_12 -->
  </div><!-- close page-wrapper -->
<?php //print '<!-- Dump: '.$dump.' -->';?>
<?php print $closure ?>
</body>
</html>