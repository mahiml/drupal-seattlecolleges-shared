<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language; ?>" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>">

<head>
  <title><?php print $head_title ?></title>
  <?php print $head; ?>
  <?php print $styles; ?>
  <?php print $scripts; ?>
	<script type="text/javascript">
	//<![CDATA[
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-20951475-1']);
  _gaq.push(['_setDomainName', '.northseattle.edu']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); 
    ga.type = 'text/javascript'; 
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; 
    s.parentNode.insertBefore(ga, s);
  })();
  //]]>
	</script>
</head>

<body class="<?php print $body_classes; ?>">
  <div id="container">
    <div id="header" class="region region-header">
      <div id="logo">
        <a href="//northseattle.edu/" title="College Homepage">
          <img src="/sites/all/themes/nscc_960/imgs/logo-main.png" alt="North Seattle Community College" />
        </a>
      </div>
    <?php print $header; ?>
    </div>    
    
    <div id="navigation">
      <?php print $global_navigation; ?>
    </div>
    
  <?php if ($campus_alert): ?>
    <div id="campus-alert" class="region region-campus_alert">
      <?php print $campus_alert; ?>
    </div>
  <?php endif; ?>
    
  <?php if ($breadcrumb || $quicklinks): ?>
    <div class="container-12 region region-quicklinks">
    <?php if ($quicklinks): ?>
      <div class="grid-9">
      <?php print $breadcrumb; ?>
      </div>
      <div class="grid-3">
      <?php print $quicklinks; ?>
      </div>
    <?php else: ?>
      <div class="grid-12">
        <?php print $breadcrumb; ?>
      </div>
    <?php endif; ?> 
      <div class="clearfix">&nbsp;</div>
    </div>
  <?php endif; ?>
  
    <div class="container-12 content-area">
    <?php if ($left): ?>
      <div id="side-nav" class="region region-left grid-3">
        <?php print $left; ?>
      </div>
    <?php endif; ?>
      
    <?php if ($left && $right): ?>
      <div id="main-column" class="grid-6">
    <?php elseif (! ($left || $right)): ?>
      <div id="main-column" class="grid-12">
    <?php else: ?>
      <div id="main-column" class="grid-9">
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
          <?php if ($title): ?>
            <h1><?php print $title; ?></h1>
          <?php endif; ?>
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
      <div id="side-column1" class="region region-right grid-3">
        <?php print $right; ?>
      </div>
    <?php endif; ?>
      <div class="clearfix">&nbsp;</div>
    </div>
    <div id="footer" class="region region-footer container-12">
    <?php if ($footer || $footer_left || $footer_mid_left || $footer_mid_right || $footer_right): ?>
    <?php if ($footer_left): ?>
      <div class="grid-4 region region-footer-left">
        <?php print $footer_left; ?>
      </div>
    <?php endif; ?>
    <?php if ($footer_mid_left): ?>
      <div class="grid-3 region region-footer-mid-left">
        <?php print $footer_mid_left; ?>
      </div>
    <?php endif; ?>
    <?php if ($footer_mid_right): ?>
      <div class="grid-3 region region-footer-mid-right">
        <?php print $footer_mid_right; ?>
      </div>
    <?php endif; ?>
    <?php if ($footer_right): ?>
      <div class="grid-2 region region-footer-right">
        <?php print $footer_right; ?>
      </div>
    <?php endif; ?>
      <div class="clearfix">&nbsp;</div>
      <?php print $footer; ?>
  <?php endif; ?>
      <div class="clearfix">&nbsp;</div>
    </div>

    <?php if ($toolbox): ?>
      <div id="toolbox" class="region region-toolbox">
        <?php print $toolbox; ?>
      </div>
    <?php endif; ?>

		<?php if ($navigation_panels): ?>
			<div id="navigation-panels" class="region navigation-panels container-12">
				<?php print $navigation_panels; ?>
			</div>
		<?php endif; ?>

  </div><!-- close page-wrapper -->
<?php print $closure ?>
</body>
</html>